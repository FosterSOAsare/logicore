"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, Calendar, Truck, Plus, Trash2 } from "lucide-react";
import { PackageFormValues } from "../../schemas";
import { LOGISTICS_HUBS } from "../../constants";

export function ShipmentRouteStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PackageFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stops",
  });

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <MapPin className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Route Information
          </h2>
          <p className="text-slate-500 text-sm">
            Define the shipment journey from origin to destination.
          </p>
        </div>
      </div>

      <div className="relative pl-2 md:pl-4">
        {/* Continuous Line Background */}
        <div className="absolute left-[27px] md:left-[35px] top-8 bottom-8 w-0.5 bg-gray-100 -z-10" />

        {/* Origin */}
        <div className="flex gap-4 md:gap-6 mb-8 relative">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center text-blue-600 shadow-sm z-10">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-bold text-slate-800 mb-3">Origin</h3>
            <div className="space-y-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  {...register("originLocation")}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Origin City, Country"
                />
              </div>
              {errors.originLocation && (
                <p className="text-red-500 text-xs">
                  {errors.originLocation.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stops */}
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 md:gap-6 mb-8 relative">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-purple-500 flex items-center justify-center text-purple-600 shadow-sm z-10">
                <span className="text-sm font-bold">{index + 1}</span>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-800">Stop {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <select
                  {...register(`stops.${index}.location`)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all bg-white"
                >
                  <option value="">Select a hub...</option>
                  {LOGISTICS_HUBS.map((hub) => (
                    <option key={hub} value={hub}>
                      {hub}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        {/* Add Stop Button Area */}
        <div className="flex gap-4 md:gap-6 mb-8">
          <div className="w-10 flex justify-center">
            {/* Spacer for alignment */}
          </div>
          <div className="flex-1">
            <button
              type="button"
              onClick={() => append({ location: "" })}
              className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg border border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 w-full justify-center"
            >
              <div className="w-5 h-5 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <Plus className="w-3 h-3" />
              </div>
              Add Intermediate Stop
            </button>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-4 md:gap-6 relative">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center text-amber-600 shadow-sm z-10">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-bold text-slate-800 mb-3">Destination</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    {...register("destinationLocation")}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    placeholder="Destination City"
                  />
                </div>
                {errors.destinationLocation && (
                  <p className="text-red-500 text-xs">
                    {errors.destinationLocation.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Estimated Arrival
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    {...register("destinationDate")}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                  />
                </div>
                {errors.destinationDate && (
                  <p className="text-red-500 text-xs">
                    {errors.destinationDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Section */}
      <div className="mt-8 pt-8 border-t border-gray-100">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Truck className="w-4 h-4 text-slate-400" />
          Service Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Carrier
            </label>
            <input
              {...register("carrier")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="Carrier Name"
            />
            {errors.carrier && (
              <p className="text-red-500 text-xs">{errors.carrier.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Service Level
            </label>
            <select
              {...register("service")}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
            >
              <option value="Standard Freight">Standard Freight</option>
              <option value="Express Freight">Express Freight</option>
              <option value="Air Priority">Air Priority</option>
              <option value="Sea Saver">Sea Saver</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
