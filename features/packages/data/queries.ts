// Server-side data access for packages.
// Deliberately NOT a "use server" file: exports here must never become
// publicly callable Server Action endpoints.
import type { Document, QueryFilter, Types } from "mongoose";
import connectToDatabase from "@/lib/db/connect";
import Package, {
  IPackage,
  IRouteStop,
  ITimelineEvent,
} from "@/lib/db/models/package.model";
import { requireAdmin } from "@/lib/auth/session";

interface GetPackagesParams {
  query?: string;
  status?: string;
}

type WithObjectId<T> = T & { _id?: Types.ObjectId };

// Shape of a package returned by `.lean()`: plain fields, no Document methods
type LeanPackage = Omit<
  IPackage,
  keyof Document | "timeline" | "plannedRoute"
> & {
  _id: Types.ObjectId;
  timeline: WithObjectId<ITimelineEvent>[];
  plannedRoute: WithObjectId<IRouteStop>[];
};

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function serializePackage(pkg: LeanPackage) {
  return {
    ...pkg,
    id: pkg.trackingId,
    _id: pkg._id.toString(),
    createdAt: pkg.createdAt?.toString(),
    updatedAt: pkg.updatedAt?.toString(),
    progress: pkg.progress,
    timeline: pkg.timeline?.map((event) => ({
      ...event,
      _id: event._id ? event._id.toString() : undefined,
    })),
    plannedRoute: pkg.plannedRoute?.map((stop) => ({
      ...stop,
      _id: stop._id ? stop._id.toString() : undefined,
    })),
  };
}

/**
 * Admin only: list packages, including receiver details.
 */
export async function getPackages({
  query = "",
  status = "All",
}: GetPackagesParams = {}) {
  await requireAdmin();

  try {
    await connectToDatabase();

    const filter: QueryFilter<IPackage> = {};

    if (status && status !== "All") {
      filter.status = { $regex: new RegExp(`^${escapeRegex(status)}$`, "i") };
    }

    if (query) {
      const safeQuery = escapeRegex(query.slice(0, 100));
      filter.$or = [
        { trackingId: { $regex: safeQuery, $options: "i" } },
        { "receiver.name": { $regex: safeQuery, $options: "i" } },
      ];
    }

    const packages = await Package.find(filter)
      .sort({ createdAt: -1 })
      .lean<LeanPackage[]>();

    return packages.map((pkg) => ({
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
      progress: pkg.progress,
    }));
  } catch (error) {
    console.error("Failed to fetch packages:", error);
    return [];
  }
}

/**
 * Admin only: full package record, including receiver details.
 */
export async function getPackageById(id: string) {
  await requireAdmin();

  try {
    await connectToDatabase();

    const pkg = await Package.findOne({
      trackingId: String(id),
    }).lean<LeanPackage>();
    if (!pkg) return null;

    return serializePackage(pkg);
  } catch (error) {
    console.error(`Failed to fetch package ${id}:`, error);
    return null;
  }
}

/**
 * Public: only the fields the tracking page displays.
 * Receiver contact details and declared value are never sent to the browser.
 */
export async function getPublicTracking(trackingId: string) {
  try {
    await connectToDatabase();

    const pkg = await Package.findOne({
      trackingId: String(trackingId),
    }).lean<LeanPackage>();
    if (!pkg) return null;

    const full = serializePackage(pkg);

    return {
      id: full.id,
      status: full.status,
      progress: full.progress,
      service: full.service,
      carrier: full.carrier,
      origin: full.origin,
      destination: full.destination,
      details: {
        weight: full.details.weight,
        items: full.details.items,
      },
      timeline: full.timeline,
      plannedRoute: full.plannedRoute,
    };
  } catch (error) {
    console.error(`Failed to fetch tracking for ${trackingId}:`, error);
    return null;
  }
}
