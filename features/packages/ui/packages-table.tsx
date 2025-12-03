"use client";

import Link from "next/link";
import {
  ArrowRight,
  Search as SearchIcon,
  Eye,
  Pencil,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const statusStyles: Record<string, string> = {
  "In Transit": "bg-blue-50 text-blue-700 border-blue-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Customs: "bg-purple-50 text-purple-700 border-purple-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export interface Package {
  id: string;
  receiver: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  status: string;
  date: string;
  type: string;
  weight: string;
}

interface PackagesTableProps {
  packages: Package[];
}

export default function PackagesTable({ packages }: PackagesTableProps) {
  return (
    <>
      {/* Mobile View (Cards) */}
      <div className="grid gap-4 md:hidden">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <Link
                  href={`/xfa/admin/packages/${pkg.id}`}
                  className="font-mono font-bold text-slate-900 hover:text-primary transition-colors block"
                >
                  {pkg.id}
                </Link>
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  {pkg.type}
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                  statusStyles[pkg.status] ||
                  "bg-gray-100 text-gray-600 border-gray-200"
                }`}
              >
                <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
                {pkg.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-gray-50">
              <div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                  Route
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                  <span className="truncate max-w-[80px]">
                    {pkg.origin.split(",")[0]}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                  <span className="truncate max-w-[80px]">
                    {pkg.destination.split(",")[0]}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                  Est. Delivery
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {pkg.estimatedDelivery.split("(")[0]}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {pkg.receiver}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{pkg.date}</div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/xfa/admin/packages/${pkg.id}`}
                  className="p-2 hover:bg-gray-50 rounded-lg text-slate-400 hover:text-primary transition-colors border border-transparent hover:border-gray-100"
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
                  className="p-2 hover:bg-gray-50 rounded-lg text-slate-400 hover:text-blue-600 transition-colors border border-transparent hover:border-gray-100"
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

      {/* Desktop View (Table) */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Receiver
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Est. Delivery
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg) => (
                <motion.tr
                  key={pkg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/xfa/admin/packages/${pkg.id}`}
                      className="font-mono font-bold text-slate-900 hover:text-primary transition-colors"
                    >
                      {pkg.id}
                    </Link>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      {pkg.type}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {pkg.receiver}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span
                        className="max-w-[80px] truncate font-medium"
                        title={pkg.origin}
                      >
                        {pkg.origin.split(",")[0]}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                      <span
                        className="max-w-[80px] truncate font-medium"
                        title={pkg.destination}
                      >
                        {pkg.destination.split(",")[0]}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {pkg.estimatedDelivery.split("(")[0]}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                        statusStyles[pkg.status] ||
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 font-medium">
                      {pkg.weight}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {pkg.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/xfa/admin/packages/${pkg.id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg text-slate-400 hover:text-primary transition-colors"
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
                        className="p-2 hover:bg-gray-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                        title={
                          pkg.status === "Pending"
                            ? "Edit Details"
                            : "Edit Tracker"
                        }
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {packages.length === 0 && (
        <div className="p-16 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 border border-gray-100">
            <SearchIcon className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            No packages found
          </h3>
          <p className="text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn't find any packages matching your search. Try adjusting
            your filters or search terms.
          </p>
        </div>
      )}
    </>
  );
}
