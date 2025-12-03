"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Truck, Loader2, MapPin, ArrowRight } from "lucide-react";
import { updateTracker, advancePackageStep } from "../actions/update";

interface EditTrackerFormProps {
  pkg: any; // We can use a proper type here if available
}

export default function EditTrackerForm({ pkg }: EditTrackerFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine current stop
  const currentStopIndex = pkg.plannedRoute.findIndex((s: any) => s.isActive);

  const currentStop =
    currentStopIndex !== -1
      ? pkg.plannedRoute[currentStopIndex]
      : pkg.plannedRoute[pkg.plannedRoute.length - 1];

  const isOrigin = currentStopIndex === 0;
  const isLastStop = currentStopIndex === pkg.plannedRoute.length - 1;

  // Form state
  const [status, setStatus] = useState("");

  // Filter options based on current stop
  let availableStatuses = [];
  if (isOrigin) {
    availableStatuses = ["In Transit", , "Cancelled"];
  } else if (isLastStop) {
    availableStatuses = [
      "In Transit",
      "Customs",
      "Customs Hold",
      "Customs Cleared",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];
  } else {
    // Intermediate
    availableStatuses = [
      "In Transit",
      "Customs Hold",
      "Customs Cleared",
      "Cancelled",
    ];
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!status) throw new Error("Please select a status");
      const result = await updateTracker(pkg.trackingId, status);

      if (result.success) {
        router.push(`/xfa/admin/packages/${pkg.trackingId}`);
        router.refresh();
      } else {
        console.error(result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error updating tracker:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdvanceStep = async () => {
    setIsSubmitting(true);
    try {
      const result = await advancePackageStep(pkg.trackingId);
      if (result.success) {
        router.push(`/xfa/admin/packages/${pkg.trackingId}`);
        router.refresh();
      } else {
        console.error(result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("Error advancing step:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if we should show the "Next Step" button
  const showNextStepButton =
    pkg.status === "In Transit" ||
    pkg.status === "Departed Origin" ||
    pkg.status === "Departed Facility";

  // Determine next location name for the button
  const nextStopIndex = currentStopIndex + 1;
  const nextLocation =
    nextStopIndex < pkg.plannedRoute.length
      ? pkg.plannedRoute[nextStopIndex].location
      : "Destination";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-600" />
          Add Tracking Update
        </h2>

        {/* Current Step Info */}
        <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-4">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">
              Current Location
            </p>
            <p className="text-lg font-bold text-slate-900">
              {currentStop?.location}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Status:{" "}
              <span className="font-medium text-slate-900">{pkg.status}</span>
            </p>
          </div>
        </div>

        {showNextStepButton ? (
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Package In Transit
              </h3>
              <p className="text-slate-500 mb-6">
                The package is currently moving to the next facility. Has it
                arrived?
              </p>
              <button
                onClick={handleAdvanceStep}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Arrived at {nextLocation}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  {showNextStepButton ? "Manual Status Update" : "New Status"}
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  {availableStatuses.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Update Tracker
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
