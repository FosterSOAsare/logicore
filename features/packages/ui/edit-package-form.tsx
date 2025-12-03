"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User,
  MapPin,
  Box,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
} from "lucide-react";
import { packageFormSchema, PackageFormValues } from "../schemas";
import { updatePackage } from "../actions/update";

import { ReceiverDetailsStep } from "./steps/receiver-details-step";
import { ShipmentRouteStep } from "./steps/shipment-route-step";
import { PackageDetailsStep } from "./steps/package-details-step";

const steps = [
  {
    id: 1,
    title: "Receiver Details",
    description: "Who is receiving this package?",
    icon: User,
  },
  {
    id: 2,
    title: "Shipment Route",
    description: "Origin and Destination info",
    icon: MapPin,
  },
  {
    id: 3,
    title: "Package Details",
    description: "Weight, dimensions, and value",
    icon: Box,
  },
];

interface EditPackageFormProps {
  initialData: PackageFormValues & { trackingId: string };
}

export default function EditPackageForm({ initialData }: EditPackageFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: initialData,
    mode: "onSubmit",
  });

  const { trigger } = form;

  console.log(form.formState.errors);

  const processStep = async () => {
    let fieldsToValidate: (keyof PackageFormValues)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = [
        "receiverName",
        "receiverEmail",
        "receiverPhone",
        "receiverAddress",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "originLocation",
        "destinationLocation",
        "destinationDate",
        "carrier",
        "service",
        "stops",
      ];
    } else if (currentStep === 3) {
      fieldsToValidate = ["weight", "dimensions", "items", "value"];
    }

    if (fieldsToValidate.length > 0) {
      const isStepValid = await trigger(fieldsToValidate);

      if (isStepValid) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const onSubmit = async (data: PackageFormValues) => {
    if (currentStep < 3) {
      console.warn("Premature submission blocked. Current step:", currentStep);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updatePackage(initialData.trackingId, data);
      if (result.success) {
        router.push(`/xfa/admin/packages/${initialData.trackingId}`);
        router.refresh();
      } else {
        console.error(result.error);
        // You might want to show a toast error here
      }
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8 md:mb-12">
        <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center gap-2 bg-white p-2"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-110"
                      : isCompleted
                      ? "border-blue-600 bg-white text-blue-600"
                      : "border-gray-200 bg-white text-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div className="text-center hidden md:block">
                  <p
                    className={`text-sm font-bold ${
                      isActive || isCompleted
                        ? "text-slate-900"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (currentStep < 3) {
                processStep();
              } else {
                form.handleSubmit(onSubmit)(e);
              }
            }}
            className="p-6 md:p-8"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && <ReceiverDetailsStep />}
              {currentStep === 2 && <ShipmentRouteStep />}
              {currentStep === 3 && <PackageDetailsStep />}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-slate-600 hover:bg-gray-50 font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div /> // Spacer
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    processStep();
                  }}
                  className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-medium shadow-lg shadow-slate-900/20 transition-all"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
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
                      Update Package
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
