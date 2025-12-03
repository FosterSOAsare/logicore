"use server";

import connectToDatabase from "@/lib/db/connect";
import Package, { IPackage } from "@/lib/db/models/package.model";

interface GetPackagesParams {
  query?: string;
  status?: string;
}

// Helper to calculate progress based on status
// This ensures consistency regardless of the number of timeline events
const calculateProgress = (status: string): number => {
  const statusMap: Record<string, number> = {
    Pending: 0,
    "Shipment Created": 5,
    "Picked Up": 15,
    "Departed Origin": 25,
    "In Transit": 45, // Shows progress between Origin (0) and Out for Delivery (66)
    Customs: 55,
    "Customs Hold": 55,
    "Arrived at Destination": 80,
    "Out for Delivery": 90,
    Delivered: 100,
    Cancelled: 0,
  };

  return statusMap[status] ?? 20; // Default to 20% if status is unknown but active
};

export async function getPackages({
  query = "",
  status = "All",
}: GetPackagesParams = {}) {
  try {
    await connectToDatabase();

    const filter: any = {};

    if (status && status !== "All") {
      filter.status = { $regex: new RegExp(`^${status}$`, "i") };
    }

    if (query) {
      filter.$or = [
        { trackingId: { $regex: query, $options: "i" } },
        { "receiver.name": { $regex: query, $options: "i" } },
      ];
    }

    const packages = await Package.find(filter).sort({ createdAt: -1 }).lean();

    return packages.map((pkg: any) => ({
      id: pkg.trackingId,
      receiver: pkg.receiver.name,
      origin: pkg.origin.location,
      destination: pkg.destination.location,
      estimatedDelivery: pkg.destination.date,
      status: pkg.status,
      date: pkg.origin.date,
      type: pkg.service,
      weight: pkg.details.weight,
      _id: pkg._id.toString(),
      progress: pkg.progres,
    }));
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    return [];
  }
}

export async function getPackageById(id: string) {
  try {
    await connectToDatabase();

    const pkg = await Package.findOne({ trackingId: id }).lean();

    if (!pkg) return null;

    return {
      ...pkg,
      id: pkg.trackingId,
      _id: (pkg as any)._id.toString(),
      createdAt: (pkg as any).createdAt?.toString(),
      updatedAt: (pkg as any).updatedAt?.toString(),
      // Use the dynamic calculation here too
      progress: pkg.progress,
      timeline: (pkg as any).timeline?.map((event: any) => ({
        ...event,
        _id: event._id ? event._id.toString() : undefined,
      })),
      plannedRoute: (pkg as any).plannedRoute?.map((stop: any) => ({
        ...stop,
        _id: stop._id ? stop._id.toString() : undefined,
      })),
    };
  } catch (error) {
    console.error(`Failed to fetch package ${id}:`, error);
    return null;
  }
}
