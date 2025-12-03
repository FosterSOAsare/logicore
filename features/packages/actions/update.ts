"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import Package from "@/lib/db/models/package.model";
import { packageFormSchema, PackageFormValues } from "../schemas";

export type STATUS =
  | "Pending"
  | "Shipment Created"
  | "Departed Facility"
  | "In Transit"
  | "Arrived at Facility"
  | "Customs Hold"
  | "Customs Cleared"
  | "Arrived at Destination"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

const PERCENTAGES = {
  "In Transit": 50,
  "Arrived at Destination": 0,
  "Customs Hold": 20,
  "Customs Cleared": 30,
  Cancelled: 0,
};

export async function updatePackage(
  trackingId: string,
  data: PackageFormValues
) {
  try {
    const validatedFields = packageFormSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    await connectToDatabase();

    const {
      receiverName,
      receiverEmail,
      receiverPhone,
      receiverAddress,
      originLocation,
      destinationLocation,
      destinationDate,
      weight,
      dimensions,
      items,
      value,
      carrier,
      service,
      stops,
    } = validatedFields.data;

    // Let's fetch the package first to get existing dates.
    const existingPackage = await Package.findOne({ trackingId });
    if (!existingPackage) return { error: "Package not found" };

    existingPackage.receiver = {
      name: receiverName,
      email: receiverEmail,
      phone: receiverPhone,
      address: receiverAddress,
    };
    existingPackage.origin = {
      location: originLocation,
      date: existingPackage.origin.date ?? new Date().toISOString(),
      time: existingPackage.origin.time ?? new Date().toISOString(),
    };
    existingPackage.destination = {
      location: destinationLocation,
      date: destinationDate,
    };
    existingPackage.details = {
      weight,
      dimensions,
      items,
      value,
    };
    existingPackage.carrier = carrier;
    existingPackage.service = service;

    // Rebuild planned route
    existingPackage.plannedRoute = [
      {
        id: "origin",
        location: originLocation,
        isActive: true,
        date: existingPackage.origin.date,
      },
      ...stops.map((stop, index) => ({
        id: `stop-${index + 1}`,
        location: stop.location,
        isActive: false,
      })),
      {
        id: "dest",
        location: destinationLocation,
        date: destinationDate,
      },
    ] as any;

    await existingPackage.save();
    revalidatePath(`/xfa/admin/packages/${trackingId}`);
    revalidatePath("/xfa/admin/packages");

    return { success: true };
  } catch (error) {
    console.error("Failed to update package:", error);
    return { error: "Failed to update package. Please try again." };
  }
}

export async function updateTracker(trackingId: string, status: string) {
  try {
    await connectToDatabase();

    const pkg = await Package.findOne({ trackingId });
    if (!pkg) return { error: "Package not found" };

    // Find current active stop (first non-completed)
    let currentStopIndex = pkg.plannedRoute.findIndex(
      (s: any) => s.isActive === true
    );

    // If all are completed,throw an error
    if (currentStopIndex === -1) {
      throw new Error("The provided trackerId has been completed");
    }

    const currentStop = pkg.plannedRoute[currentStopIndex];

    pkg.status = status as STATUS;

    // Set status of current item

    // Add to timeline
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let description = status;
    if (status === "Departed Origin")
      description = "Departed from origin facility";
    else if (status === "Arrived at Destination")
      description = "Arrived at destination facility";
    else if (status === "In Transit")
      description = `In transit to next facility`;
    else if (status === "Arrived at Facility")
      description = `Arrived at ${currentStop.location}`;
    else if (status === "Customs Cleared")
      description = "Customs clearance processing complete";
    else if (status === "Out for Delivery")
      description = "Package is out for delivery";
    else if (status === "Delivered")
      description = "Package delivered successfully";

    pkg.timeline.unshift({
      status: status,
      location: currentStop.location,
      date: dateStr,
      time: timeStr,
      completed: true,
      current: true,
    });

    // // Mark previous current event as not current
    if (pkg.timeline.length > 1) {
      pkg.timeline[1].current = false;
    }

    const stepPerc =
      Math.round((100 / (pkg.plannedRoute.length - 1)) * 100) / 100;

    if (pkg.progress !== 100) {
      let percCompleted = currentStopIndex * stepPerc;
      const innerPerc =
        (PERCENTAGES[pkg.status as keyof typeof PERCENTAGES] as number) || 0;
      percCompleted = innerPerc
        ? percCompleted + (innerPerc / 100) * stepPerc
        : percCompleted;

      pkg.progress = percCompleted;
    }

    await pkg.save();

    revalidatePath(`/xfa/admin/packages/${trackingId}`);
    revalidatePath("/xfa/admin/packages");

    return { success: true };
  } catch (error) {
    console.error("Failed to update tracker:", error);
    return { error: "Failed to update tracker. Please try again." };
  }
}
export async function advancePackageStep(trackingId: string) {
  try {
    await connectToDatabase();
    const pkg = await Package.findOne({ trackingId });
    if (!pkg) return { error: "Package not found" };
    // Find current active stop (first non-completed)
    const currentStopIndex = pkg.plannedRoute.findIndex(
      (s: any) => s.isActive === true
    );
    if (currentStopIndex === -1) {
      return { error: "Package route already completed" };
    }
    // Check if there is a next stop
    const nextStopIndex = currentStopIndex + 1;
    if (nextStopIndex < pkg.plannedRoute.length) {
      const nextStop = pkg.plannedRoute[nextStopIndex];
      const isLastStop = nextStopIndex === pkg.plannedRoute.length - 1;

      // Mark current stop as notActive and the next one as active
      pkg.plannedRoute[currentStopIndex].isActive = false;
      pkg.plannedRoute[nextStopIndex].isActive = true;

      // Update package status
      const newStatus = isLastStop
        ? "Arrived at Destination"
        : "Arrived at Facility";
      pkg.status = newStatus;
      // Add to timeline
      const now = new Date();
      pkg.timeline.unshift({
        status: newStatus,
        location: nextStop.location,
        date: now.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        completed: true,
        current: true,
      });
      // Mark previous current event as not current
      if (pkg.timeline.length > 1) {
        pkg.timeline[1].current = false;
      }
    } else {
      // Here the button won't show arrived as but rather mark as delivered
    }
    // Update progress
    const stepPerc =
      Math.round((100 / (pkg.plannedRoute.length - 1)) * 100) / 100;
    const perc = stepPerc * nextStopIndex;
    pkg.progress = perc;

    await pkg.save();
    revalidatePath(`/xfa/admin/packages/${trackingId}`);
    revalidatePath("/xfa/admin/packages");
    return { success: true };
  } catch (error) {
    console.error("Failed to advance package step:", error);
    return { error: "Failed to advance package step. Please try again." };
  }

  // return { success: true };
}
