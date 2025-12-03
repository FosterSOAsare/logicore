"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Truck,
  Plane,
  Globe,
  Weight,
  FileText,
  Copy,
  Box,
  AlertCircle,
  Ship,
  Flag,
  CircleDot,
  User,
} from "lucide-react";

interface IRouteStop {
  id: string;
  location: string;
  isActive?: boolean;
  date?: string;
  _id?: string;
}

interface PackageDetails {
  id: string;
  status: string;
  progress: number;
  service: string;
  carrier?: string;
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

export default function TrackingDetails({
  packageData,
}: {
  packageData: PackageDetails;
}) {
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

  const activeStopIndex =
    packageData.plannedRoute?.findIndex((stop) => stop.isActive === true) || 0;
  const activeStop = packageData.plannedRoute?.[activeStopIndex];

  // Determine status for styling
  const isCompleted = packageData.status === "Delivered";
  // Highlight current stop
  const isCancelled = packageData.status === "Cancelled";
  const isInTransit = packageData.status === "In Transit";
  const isCleared = packageData.status === "Customs Cleared";
  const hasArrived = packageData.status === "Arrived at Facility";
  const isHeld = packageData.status === "Customs Hold";

  return (
    <div className="max-w-6xl bg-white rounded-xl mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8">
      <div className="space-y-6 lg:space-y-8">
        {/* Header / Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary flex flex-wrap items-center gap-2 md:gap-3">
              Tracking Details
              <span
                className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs lg:text-sm font-medium border ${
                  isCompleted
                    ? "bg-green-50 text-green-700 border-green-200"
                    : isInTransit
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : isHeld
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : isCancelled
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {packageData.status}
              </span>
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm lg:text-base">
              ID:{" "}
              <span className="font-mono text-primary font-semibold break-all">
                {packageData.id}
              </span>
              <button className="text-gray-400 hover:text-secondary active:text-secondary transition-colors shrink-0">
                <Copy className="w-4 h-4" />
              </button>
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full md:w-auto text-center px-4 py-3 bg-secondary text-white rounded-xl font-medium hover:bg-secondary/90 active:bg-secondary/90 active:scale-95 transition-colors shadow-lg shadow-secondary/20 text-sm md:text-base"
            >
              Contact Support
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
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
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
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
                    {packageData.destination.location.split(",")[0]}
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-xs lg:text-sm">
                    {packageData.destination.date}
                  </p>
                </div>
              </div>

              {/* Dynamic Route Visualization */}
              <div className="relative mb-8 lg:mb-12 mt-4">
                {/* Stops */}
                <div className="relative w-full h-24  overflow-x-auto overflow-y-hidden md:overflow-visible">
                  <div className={`w-[250%] md:w-full flex  justify-between`}>
                    {stops.map((stop, index) => {
                      // Determine Icon
                      let Icon = CircleDot;
                      if (index === 0) Icon = MapPin;
                      else if (index === stops.length - 1) Icon = Flag;
                      else if (stop.location.includes("Port")) Icon = Ship;
                      else if (stop.location.includes("Airport")) Icon = Plane;
                      else if (stop.location.includes("Hub")) Icon = Box;

                      const canShowColor = index <= activeStopIndex;
                      const step =
                        100 / ((packageData.plannedRoute?.length || 2) - 1);
                      const remWidth = packageData.progress % step;

                      const stokeWdith =
                        index < activeStopIndex ? 100 : (remWidth / step) * 100;

                      return (
                        <div
                          key={stop.id || index}
                          className={`flex  justify-start  items-center gap-2 relative group ${
                            index < stops.length - 1 ? "w-full" : "w-auto"
                          }`}
                        >
                          <div
                            className={`flex w-full items-center justify-start`}
                          >
                            <div
                              className={`w-8 h-8 lg:w-10 lg:h-10 mt-2 md:mt-0 rounded-full border-[3px] z-10 flex items-center justify-center transition-all duration-500 bg-white ${
                                index <= activeStopIndex &&
                                (isCleared || hasArrived)
                                  ? "border-blue-600 text-blue-600 shadow-lg shadow-blue-600/20"
                                  : index <= activeStopIndex && isInTransit
                                  ? "border-blue-600 text-blue-600 ring-4 ring-blue-100"
                                  : index <= activeStopIndex && isCancelled
                                  ? "border-red-600 text-red-600 ring-4 ring-red-100"
                                  : index <= activeStopIndex && isHeld
                                  ? "border-amber-600 text-amber-600 ring-4 ring-amber-100"
                                  : index <= activeStopIndex && isCompleted
                                  ? "border-green-600 text-green-600 ring-4 ring-green-100"
                                  : "border-gray-200 text-gray-300"
                              }`}
                            >
                              <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                            </div>
                            {/* Line */}
                            {index < stops.length - 1 && (
                              <div className="w-[calc(100%-40px)] h-1 bg-gray-100">
                                <div
                                  className={` rounded-full h-1 rounded-full transition-all duration-1000 ${
                                    canShowColor
                                      ? isHeld
                                        ? "bg-amber-500"
                                        : isCancelled
                                        ? "bg-red-600"
                                        : isCompleted
                                        ? "bg-green-600"
                                        : "bg-blue-600"
                                      : "bg-gray-100"
                                  }`}
                                  style={{ width: `${stokeWdith}%` }}
                                ></div>
                              </div>
                            )}
                          </div>

                          {/* Label */}
                          <div
                            className={`absolute top-12  -translate-x-1/2 w-32 text-center ${
                              index < stops.length - 1 ? "left-6" : "left-1/2"
                            }`}
                          >
                            <p
                              className={`text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-colors duration-500 ${
                                index < activeStopIndex &&
                                (isCompleted || isCleared || isInTransit)
                                  ? "text-blue-900"
                                  : index <= activeStopIndex && hasArrived
                                  ? "text-green-900"
                                  : index <= activeStopIndex && isHeld
                                  ? "text-amber-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {stop.location.split(",")[0]}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">
                      Est. Delivery
                    </span>
                  </div>
                  <p className="font-bold text-primary">
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
                  <p className="font-bold text-primary">
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
                  <p className="font-bold text-primary">
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
            <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
              <FileText className="w-5 h-5 text-secondary" />
              Activity Log
            </h3>

            <div className="relative space-y-8 before:absolute before:left-[12px] before:top-2 before:h-[calc(100%-24px)] before:w-0.5 before:bg-gray-100">
              {packageData.timeline.map((event, index) => (
                <div key={index} className="relative pl-12 md:pl-12 group">
                  <div
                    className={`absolute -left-2 top-1 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 transition-colors ${
                      event.completed
                        ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                        : event.current
                        ? ["Customs", "Customs Hold", "Exception"].some((s) =>
                            event.status.includes(s)
                          )
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30"
                          : "bg-secondary text-white shadow-lg shadow-secondary/30"
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
                            ? "!text-primary"
                            : event.current
                            ? ["Customs", "Customs Hold", "Exception"].some(
                                (s) => event.status.includes(s)
                              )
                              ? "!text-amber-600"
                              : "!text-secondary"
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

          {/* Shipment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-lg font-bold text-primary mb-3 md:mb-6 flex items-center gap-2">
                <Box className="w-5 h-5 text-secondary" />
                Shipment Details
              </h3>
              <div className="space-y-3 md:space-y-6">
                <div className="flex justify-between items-center  border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Carrier</span>
                  <span className="font-medium text-primary">
                    {packageData.carrier || "Logicore Air"}
                  </span>
                </div>
                <div className="flex justify-between items-center  border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Total Pieces</span>
                  <span className="font-medium text-primary">
                    {packageData.details.items}
                  </span>
                </div>
                <div className="flex justify-between items-center  border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Weight</span>
                  <span className="font-medium text-primary">
                    {packageData.details.weight}
                  </span>
                </div>
                <div className="flex justify-between items-center  border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Reference</span>
                  <span className="font-medium text-primary">
                    #REF-{packageData.id.slice(-6)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="bg-blue-50 rounded-2xl w-full p-4 md:p-6 border border-blue-100">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-bold text-blue-900 text-sm mb-1">
                Shipment Note
              </h4>
              <p className="text-blue-700 text-xs leading-relaxed">
                Package requires signature upon delivery. Please ensure someone
                is available to receive the shipment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
