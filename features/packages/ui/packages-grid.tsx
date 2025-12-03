"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Pencil,
  MapPin,
  Calendar,
  Package as PackageIcon,
  Search as SearchIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Package } from "./packages-table";

const statusStyles: Record<string, string> = {
  "In Transit": "bg-blue-50 text-blue-700 border-blue-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Customs: "bg-purple-50 text-purple-700 border-purple-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

interface PackagesGridProps {
  packages: Package[];
}

export default function PackagesGrid({ packages }: PackagesGridProps) {
  if (packages.length === 0) {
    return (
      <div className="p-16 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 border border-gray-100">
          <SearchIcon className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No packages found</h3>
        <p className="text-slate-500 mt-1 max-w-sm mx-auto">
          We couldn't find any packages matching your search. Try adjusting your
          filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <Link
                href={`/xfa/admin/packages/${pkg.id}`}
                className="font-mono font-bold text-slate-900 hover:text-primary transition-colors text-lg"
              >
                {pkg.id}
              </Link>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  statusStyles[pkg.status] ||
                  "bg-gray-100 text-gray-600 border-gray-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                {pkg.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                  Receiver
                </p>
                <p className="font-medium text-slate-900">{pkg.receiver}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
                  Route
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium text-slate-900 truncate"
                      title={pkg.origin}
                    >
                      {pkg.origin.split(",")[0]}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Origin</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <div className="flex-1 min-w-0 text-right">
                    <p
                      className="font-medium text-slate-900 truncate"
                      title={pkg.destination}
                    >
                      {pkg.destination.split(",")[0]}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Destination</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {pkg.date}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <PackageIcon className="w-3.5 h-3.5" />
                  {pkg.weight}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl flex items-center justify-between">
            <div className="text-xs text-slate-500 font-medium">{pkg.type}</div>
            <div className="flex items-center gap-2">
              <Link
                href={`/xfa/admin/packages/${pkg.id}`}
                className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-primary transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
                title="View Details"
              >
                <Eye className="w-4 h-4" />
              </Link>
              <Link
                href={
                  pkg.status === "Pending"
                    ? `/xfa/admin/packages/${pkg.id}/edit-details`
                    : `/xfa/admin/packages/${pkg.id}/edit-tracker`
                }
                className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm"
                title={
                  pkg.status === "Pending" ? "Edit Details" : "Edit Tracker"
                }
              >
                <Pencil className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
