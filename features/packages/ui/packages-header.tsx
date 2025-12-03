"use client";
import Link from "next/link";

import { Plus } from "lucide-react";

export default function PackagesHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 z-[100] py-5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Packages</h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage and track all shipments
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/xfa/admin/packages/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span>
            New <span className="hidden md:inline">Package</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
