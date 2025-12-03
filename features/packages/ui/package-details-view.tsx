"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  FileText,
  User,
  Mail,
  Phone,
  Box,
  Clock,
  CheckCircle2,
  Truck,
  Ship,
  Plane,
  AlertCircle,
  Copy,
  Globe,
  Weight,
  Package,
  Flag,
  CircleDot,
} from "lucide-react";
import { motion } from "framer-motion";

interface IRouteStop {
  id: string;
  location: string;
  status: "Pending" | "In Transit" | "Cleared" | "Completed";
  date?: string;
  _id?: string;
}

interface PackageDetails {
  id: string;
  status: string;
  progress: number;
  service: string;
  receiver: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  origin: {
    location: string;
    date: string;
    time?: string;
  };
  destination: {
    location: string;
    date: string;
    time?: string;
  };
  details: {
    weight: string;
    dimensions: string;
    items: number;
    value: string;
  };
  timeline: {
    status: string;
    location: string;
    date: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }[];
  plannedRoute?: IRouteStop[];
}

export default function PackageDetailsView({
  packageData,
}: {
  packageData: PackageDetails;
}) {
  console.log(packageData.status, packageData.progress);
  // Use plannedRoute if available, otherwise fallback to a basic 2-step
  const stops =
    packageData.plannedRoute && packageData.plannedRoute.length > 0
      ? packageData.plannedRoute
      : [
          {
            id: "origin",
            location: packageData.origin.location,
            status: "Completed",
            date: packageData.origin.date,
          },
          {
            id: "dest",
            location: packageData.destination.location,
            status: "Pending",
            date: packageData.destination.date,
          },
        ];
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/xfa/admin/packages"
                className="p-1.5 -ml-2 hover:bg-gray-100 rounded-lg transition-colors text-slate-500"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <span className="text-sm font-medium text-slate-500">
                Back to Packages
              </span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 flex flex-wrap items-center gap-2 md:gap-3">
              Tracking Details
              <span
                className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs lg:text-sm font-medium border ${
                  packageData.status === "Delivered"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : packageData.status === "In Transit"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : packageData.status === "Customs" ||
                      packageData.status === "Customs Hold"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : packageData.status === "Cancelled"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {packageData.status}
              </span>
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm lg:text-base">
              ID:{" "}
              <span className="font-mono text-blue-600 font-semibold break-all">
                {packageData.id}
              </span>
              <button className="text-gray-400 hover:text-blue-600 active:text-blue-700 transition-colors shrink-0">
                <Copy className="w-4 h-4" />
              </button>
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            {packageData.status === "Pending" && (
              <Link
                href={`/xfa/admin/packages/${packageData.id}/edit-details`}
                className="px-4 py-2 bg-white border border-gray-200 text-slate-700 rounded-xl hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm"
              >
                Edit Details
              </Link>
            )}
            <Link
              href={`/xfa/admin/packages/${packageData.id}/edit-tracker`}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium text-sm shadow-lg shadow-slate-900/20 transition-all"
            >
              Update Status
            </Link>
          </div>
        </div>

        {/* Main Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Route & Progress */}
            <div className="flex-1">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Origin
                  </p>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                    {packageData.origin.location.split(",")[0]}
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-xs lg:text-sm">
                    {packageData.origin.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Destination
                  </p>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                    {packageData.destination.location.split(",")[0]}
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-xs lg:text-sm">
                    {packageData.destination.date}
                  </p>
                </div>
              </div>

              {/* Dynamic Route Visualization */}
              <div className="relative mb-8 lg:mb-12 mt-4">
                {/* Background Line */}
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full" />

                {/* Active Progress Line */}
                {/* Active Progress Line */}
                <div
                  className={`absolute top-5 left-0 h-1 rounded-full transition-all duration-1000 ${
                    packageData.status === "Customs" ||
                    packageData.status === "Customs Hold" ||
                    packageData.status === "Exception"
                      ? "bg-amber-500"
                      : "bg-blue-600"
                  }`}
                  style={{ width: `${packageData.progress}%` }}
                />

                {/* Stops */}
                <div className="relative flex justify-between w-full">
                  {stops.map((stop, i) => {
                    // Determine status for styling
                    const isCompleted = stop.status === "Completed";
                    // Highlight current stop
                    const isCurrent =
                      !isCompleted &&
                      (i === 0 || stops[i - 1].status === "Completed");
                    const isInTransit =
                      stop.status === "In Transit" || isCurrent;
                    const isPending = stop.status === "Pending";
                    const isCleared = stop.status === "Cleared";

                    // Determine Icon
                    let Icon = CircleDot;
                    if (i === 0) Icon = MapPin;
                    else if (i === stops.length - 1) Icon = Flag;
                    else if (stop.location.includes("Port")) Icon = Ship;
                    else if (stop.location.includes("Airport")) Icon = Plane;
                    else if (stop.location.includes("Hub")) Icon = Box;

                    return (
                      <div
                        key={stop.id || i}
                        className="flex flex-col bg- items-center gap-2 relative group"
                      >
                        <div
                          className={`w-8 h-8 lg:w-10 lg:h-10 mt-2 md:mt-0 rounded-full border-[3px] z-10 flex items-center justify-center transition-all duration-500 bg-white ${
                            isCompleted || isCleared
                              ? "border-blue-600 text-blue-600 shadow-lg shadow-blue-600/20"
                              : isInTransit
                              ? "border-blue-600 text-blue-600 ring-4 ring-blue-100"
                              : "border-gray-200 text-gray-300"
                          }`}
                        >
                          <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>

                        {/* Label */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 text-center">
                          <p
                            className={`text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${
                              isCompleted || isCleared || isInTransit
                                ? "text-blue-900"
                                : "text-gray-400"
                            }`}
                          >
                            {stop.location.split(",")[0]}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {stop.date?.split("(")[0]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Spacing for labels */}
              <div className="h-8 md:h-10"></div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">
                      Est. Delivery
                    </span>
                  </div>
                  <p className="font-bold text-slate-900">
                    {packageData.destination.date.split("(")[0]}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Truck className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">
                      Service
                    </span>
                  </div>
                  <p className="font-bold text-slate-900">
                    {packageData?.service ?? "Standard"}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Weight className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">
                      Weight
                    </span>
                  </div>
                  <p className="font-bold text-slate-900">
                    {packageData.details.weight}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Log */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl p-4 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Activity Log
            </h3>

            <div className="relative space-y-8 before:absolute before:left-[12px] before:top-2 before:h-[calc(100%-24px)] before:w-0.5 before:bg-gray-100">
              {packageData.timeline.map((event, index) => (
                <div key={index} className="relative pl-12 md:pl-12 group">
                  <div
                    className={`absolute -left-2 top-1 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 transition-colors ${
                      event.completed
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : event.current
                        ? ["Customs", "Customs Hold", "Exception"].some((s) =>
                            event.status.includes(s)
                          )
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                          : "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {event.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4
                        className={`font-semibold md:font-bold text-base ${
                          event.completed
                            ? "!text-slate-900"
                            : event.current
                            ? ["Customs", "Customs Hold", "Exception"].some(
                                (s) => event.status.includes(s)
                              )
                              ? "!text-amber-600"
                              : "!text-blue-600"
                            : "!text-gray-400"
                        }`}
                      >
                        {event.status}
                      </h4>
                      <p className="text-gray-500 text-sm">{event.location}</p>
                    </div>

                    {/* Date and time */}
                    <div className="text-right">
                      <p className="text-xs md:text-sm font-medium text-gray-900">
                        {event.date}
                      </p>
                      <p className="text-xs text-gray-400">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Receiver Details (Admin Only) */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3 md:mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Receiver Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    {packageData.receiver.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">
                      {packageData.receiver.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Authorized Receiver
                    </p>
                  </div>
                </div>
                <div className="pt-2 space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <span className="text-slate-600">
                      {packageData.receiver.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">
                      {packageData.receiver.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-600">
                      {packageData.receiver.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3 md:mb-6 flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-600" />
                Shipment Details
              </h3>
              <div className="space-y-3 md:space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">Total Pieces</span>
                  <span className="font-medium text-slate-900">
                    {packageData.details.items}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">Dimensions</span>
                  <span className="font-medium text-slate-900">
                    {packageData.details.dimensions}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="text-gray-500 text-sm">Declared Value</span>
                  <span className="font-medium text-slate-900">
                    {packageData.details.value}
                  </span>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="bg-blue-50 rounded-2xl w-full p-4 md:p-6 border border-blue-100">
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">
                    Shipment Note
                  </h4>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    Package requires signature upon delivery. Please ensure
                    someone is available to receive the shipment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
