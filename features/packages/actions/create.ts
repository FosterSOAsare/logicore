"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import Package, { IPackage } from "@/lib/db/models/package.model";
import { packageFormSchema, PackageFormValues } from "../schemas";

function generateTrackingId() {
  const prefix = "LGC";
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit number
  return `${prefix}-${randomNum}`;
}

export async function createPackage(data: PackageFormValues) {
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

    const trackingId = generateTrackingId();
    const now = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const timeNow = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newPackage = await Package.create({
      trackingId,
      status: "Pending",
      progress: 0,
      carrier,
      service,
      receiver: {
        name: receiverName,
        email: receiverEmail,
        phone: receiverPhone,
        address: receiverAddress,
      },
      origin: {
        location: originLocation,
        date: now,
        time: timeNow,
      },
      destination: {
        location: destinationLocation,
        date: destinationDate,
      },
      details: {
        weight,
        dimensions,
        items,
        value,
      },
      timeline: [
        {
          status: "Shipment Created",
          location: originLocation,
          date: now,
          time: timeNow,
          completed: true,
          current: true,
        },
      ],
      plannedRoute: [
        {
          id: "origin",
          location: originLocation,
          isActive: true,
          date: now,
        },
        ...stops.map((stop, index) => ({
          id: `stop-${index + 1}`,
          location: stop.location,
        })),
        {
          id: "dest",
          location: destinationLocation,
          date: destinationDate,
        },
      ],
    } as IPackage);

    revalidatePath("/xfa/admin/packages");
    return { success: true, id: newPackage.trackingId };
  } catch (error) {
    console.error("Failed to create package:", error);
    return { error: "Failed to create package. Please try again." };
  }
}
