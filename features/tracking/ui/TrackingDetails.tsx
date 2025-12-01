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
} from "lucide-react";

export default function TrackingDetails({
  trackingId,
}: {
  trackingId: string;
}) {
  // Mock data
  const shipmentData = {
    id: trackingId,
    status: "In Transit",
    estimatedDelivery: "Dec 12, 2025",
    origin: "Shanghai, CN",
    destination: "New York, US",
    currentLocation: "Los Angeles, CA",
    weight: "125 kg",
    pieces: 3,
    service: "Express Air Freight",
    carrier: "Logicore Air",
    progress: 65,
    timeline: [
      {
        // date: "Dec 10, 2025",
        // time: "09:30 AM",
        location: "Los Angeles, CA",
        status: "Arrived at Distribution Center",
        icon: Truck,
        completed: false,
      },
      {
        date: "Dec 09, 2025",
        time: "06:15 PM",
        location: "Los Angeles Int. Airport",
        status: "Customs Clearance Completed",
        icon: FileText,
        completed: true,
      },
      {
        date: "Dec 08, 2025",
        time: "11:45 PM",
        location: "Shanghai Pudong Int. Airport",
        status: "Departed from Origin",
        icon: Plane,
        completed: true,
      },
      {
        date: "Dec 08, 2025",
        time: "02:00 PM",
        location: "Shanghai, CN",
        status: "Shipment Picked Up",
        icon: Package,
        completed: true,
      },
    ],
  };

  const progressSteps = [
    { label: "Origin", icon: MapPin, percentage: 0 },
    { label: "In Transit", icon: Truck, percentage: 33 },
    { label: "Out for Delivery", icon: Package, percentage: 66 },
    { label: "Delivered", icon: CheckCircle2, percentage: 100 },
  ];

  return (
    <div className="max-w-6xl bg-white rounded-xl mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8">
      <div className="space-y-6 lg:space-y-8">
        {/* Header / Actions */}
        {/* Header / Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary flex flex-wrap items-center gap-2 md:gap-3">
              Tracking Details
              <span className="px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-green-50 text-green-700 text-xs lg:text-sm font-medium border border-green-200">
                Active
              </span>
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2 text-sm lg:text-base">
              ID:{" "}
              <span className="font-mono text-primary font-semibold break-all">
                {shipmentData.id}
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
            {/* Route & Progress */}
            <div className="flex-1">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Origin
                  </p>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
                    {shipmentData.origin}
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-xs lg:text-sm">
                    Dec 08, 2025
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">
                    Destination
                  </p>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
                    {shipmentData.destination}
                  </h3>
                  <p className="text-gray-500 text-[10px] md:text-xs lg:text-sm">
                    Est. Dec 12, 2025
                  </p>
                </div>
              </div>

              {/* Icon-Based Progress Visualization */}
              <div className="relative mb-8 lg:mb-12 mt-8">
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 rounded-full" />
                <div
                  className="absolute top-5 left-0 h-1 bg-secondary rounded-full transition-all duration-1000"
                  style={{ width: `${shipmentData.progress}%` }}
                />
                <div className="relative flex justify-between">
                  {progressSteps.map((step, i) => {
                    const isCompleted =
                      step.percentage <= shipmentData.progress;
                    const isCurrent =
                      step.percentage <= shipmentData.progress &&
                      (progressSteps[i + 1]?.percentage || 101) >
                        shipmentData.progress;

                    return (
                      <div
                        key={step.label}
                        className="flex flex-col items-center gap-3"
                      >
                        <div
                          className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border-[3px] z-10 flex items-center justify-center transition-all duration-500 ${
                            isCompleted || isCurrent
                              ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
                              : "bg-white border-gray-200 text-gray-300"
                          }`}
                        >
                          <step.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                        <span
                          className={`text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-colors duration-500 text-center ${
                            isCompleted || isCurrent
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-medium uppercase">
                      Est. Delivery
                    </span>
                  </div>
                  <p className="font-bold text-primary">
                    {shipmentData.estimatedDelivery.split(",")[0]}
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
                    {shipmentData.service}
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
                    {shipmentData.weight}
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
              {shipmentData.timeline.map((event, index) => (
                <div key={index} className="relative pl-12 md:pl-12 group">
                  <div
                    className={`absolute -left-2 top-1 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center z-10 transition-colors ${
                      event.completed
                        ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <event.icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4
                        className={`font-semibold md:font-bold text-base ${
                          event.completed ? "!text-primary" : "!text-gray-400"
                        }`}
                      >
                        {event.status}
                      </h4>
                      <p className="text-gray-500 text-sm">{event.location}</p>
                    </div>

                    {/* Date and time */}
                    <div className="text-right">
                      <p className="text-xs md:text-sm font-medium text-gray-900">
                        {event?.date ?? "-"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {event?.time ?? "-"}
                      </p>
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
                    {shipmentData.carrier}
                  </span>
                </div>
                <div className="flex justify-between items-center  border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Total Pieces</span>
                  <span className="font-medium text-primary">
                    {shipmentData.pieces}
                  </span>
                </div>
                <div className="flex justify-between items-center  border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Weight</span>
                  <span className="font-medium text-primary">
                    {shipmentData.weight}
                  </span>
                </div>
                <div className="flex justify-between items-center  border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Reference</span>
                  <span className="font-medium text-primary">#REF-882910</span>
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
