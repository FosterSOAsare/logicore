"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { PackageFormValues } from "../../schemas";

export function ReceiverDetailsStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PackageFormValues>();

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Receiver Details</h2>
          <p className="text-slate-500 text-sm">
            Enter the contact information for the receiver.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            {...register("receiverName")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="e.g. John Doe"
          />
          {errors.receiverName && (
            <p className="text-red-500 text-xs">
              {errors.receiverName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            {...register("receiverEmail")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="e.g. john@example.com"
          />
          {errors.receiverEmail && (
            <p className="text-red-500 text-xs">
              {errors.receiverEmail.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Phone Number
          </label>
          <input
            {...register("receiverPhone")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="e.g. +1 (555) 000-0000"
          />
          {errors.receiverPhone && (
            <p className="text-red-500 text-xs">
              {errors.receiverPhone.message}
            </p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">
            Delivery Address
          </label>
          <input
            {...register("receiverAddress")}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            placeholder="e.g. 123 Logistics Way, San Francisco, CA"
          />
          {errors.receiverAddress && (
            <p className="text-red-500 text-xs">
              {errors.receiverAddress.message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
