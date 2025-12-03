import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewPackageForm from "@/features/packages/ui/new-package-form";

export default function NewPackagePage() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Create New Shipment
          </h1>
          <p className="text-slate-500 mt-1">
            Enter the details below to generate a new tracking ID and shipment
            record.
          </p>
        </div>

        <NewPackageForm />
      </div>
    </div>
  );
}
