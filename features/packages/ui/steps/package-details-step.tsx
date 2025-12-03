"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Box,
  Scale,
  Ruler,
  Package as PackageIcon,
  DollarSign,
} from "lucide-react";
import { PackageFormValues } from "../../schemas";

export function PackageDetailsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PackageFormValues>();

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <Box className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Package Details</h2>
          <p className="text-slate-500 text-sm">
            Physical characteristics and value of the shipment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Weight</label>
          <div className="relative">
            <Scale className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              {...register("weight")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="e.g. 500 kg"
            />
          </div>
          {errors.weight && (
            <p className="text-red-500 text-xs">{errors.weight.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Dimensions
          </label>
          <div className="relative">
            <Ruler className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              {...register("dimensions")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="e.g. 20x20x20 cm"
            />
          </div>
          {errors.dimensions && (
            <p className="text-red-500 text-xs">{errors.dimensions.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Total Items
          </label>
          <div className="relative">
            <PackageIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              {...register("items", { valueAsNumber: true })}
              type="number"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="e.g. 150"
            />
          </div>
          {errors.items && (
            <p className="text-red-500 text-xs">{errors.items.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Declared Value
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              {...register("value")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              placeholder="e.g. $5,000.00"
            />
          </div>
          {errors.value && (
            <p className="text-red-500 text-xs">{errors.value.message}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
