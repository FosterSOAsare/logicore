import { STATUS } from "@/features/packages/actions/update";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReceiver {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ILocation {
  location: string;
  date: string; // Storing as string for display flexibility, or Date if strict
  time?: string;
}

export interface IPackageDetails {
  weight: string;
  dimensions: string;
  items: number;
  value: string;
}

export interface ITimelineEvent {
  status: string;
  location: string;
  date: string;
  time?: string;
  completed: boolean;
  current?: boolean;
  icon?: string; // To store which icon to render
}

export interface IRouteStop {
  id: string;
  location: string;
  isActive: boolean;
  date?: string; // Expected or Actual date
}

export interface IPackage extends Document {
  trackingId: string;
  status: STATUS;
  progress: number; // 0-100
  carrier: string;
  service: string;
  receiver: IReceiver;
  origin: ILocation;
  destination: ILocation;
  details: IPackageDetails;
  timeline: ITimelineEvent[];
  plannedRoute: IRouteStop[];
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema: Schema = new Schema(
  {
    trackingId: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: [
        "Pending",
        "Shipment Created",
        "Departed Facility",
        "In Transit",
        "Arrived at Facility",
        "Customs Hold",
        "Customs Cleared",
        "Arrived at Destination",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
      index: true,
    },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    carrier: { type: String, default: "Logicore Logistics" },
    service: { type: String, default: "Standard Freight" },

    receiver: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },

    origin: {
      location: { type: String, required: true },
      date: { type: String, required: true },
      time: { type: String },
    },

    destination: {
      location: { type: String, required: true },
      date: { type: String, required: true },
    },

    details: {
      weight: { type: String, required: true },
      dimensions: { type: String, required: true },
      items: { type: Number, required: true },
      value: { type: String, required: true },
    },

    timeline: [
      {
        status: { type: String, required: true },
        location: { type: String, required: true },
        date: { type: String, required: true },
        time: { type: String },
        completed: { type: Boolean, default: false },
        current: { type: Boolean, default: false },
        icon: { type: String },
      },
    ],

    plannedRoute: [
      {
        id: { type: String, required: true }, // e.g., "stop-1", "stop-2"
        location: { type: String, required: true },
        isActive: { type: Boolean },
        date: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation error in Next.js hot reloading
const Package: Model<IPackage> =
  mongoose.models.Package || mongoose.model<IPackage>("Package", PackageSchema);

export default Package;
