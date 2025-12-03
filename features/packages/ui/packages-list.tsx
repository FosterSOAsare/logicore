"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, LayoutGrid, List, Check } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Search from "@/features/shared/ui/search";
import PackagesTable, { Package } from "./packages-table";
import PackagesGrid from "./packages-grid";

interface PackagesListProps {
  initialPackages: Package[];
  view: "grid" | "list";
}

const statuses = [
  "All",
  "In Transit",
  "Delivered",
  "Pending",
  "Customs",
  "Cancelled",
];

export default function PackagesList({
  initialPackages,
  view,
}: PackagesListProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const currentView = view || "list";
  const currentStatus = searchParams.get("status") || "All";

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewChange = (view: "list" | "grid") => {
    const params = new URLSearchParams(searchParams);
    params.set("view", view);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status === "All") {
      params.delete("status");
    } else {
      params.set("status", status.toLowerCase());
    }
    if (status !== "All") {
      params.set("status", status.toLowerCase());
    }
    replace(`${pathname}?${params.toString()}`);
    setIsFilterOpen(false);
  };

  return (
    <div className="p-8 flex-1 overflow-y-auto">
      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center z-20 relative">
        <div className="w-[calc(100%-16em)]">
          <Search placeholder="Search packages..." />
        </div>
        <div className="flex items-center gap-3 w-full md:w-60">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => handleViewChange("list")}
              className={`p-2 rounded-md transition-all ${
                currentView === "list"
                  ? "bg-white shadow-sm text-primary"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewChange("grid")}
              className={`p-2 rounded-md transition-all ${
                currentView === "grid"
                  ? "bg-white shadow-sm text-primary"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg transition-colors font-medium text-sm ${
                currentStatus !== "All"
                  ? "bg-primary/5 border-primary text-primary"
                  : "bg-white border-gray-200 text-slate-700 hover:bg-gray-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              {currentStatus === "All"
                ? "Filter Status"
                : statuses.find((s) => s.toLowerCase() === currentStatus) ||
                  currentStatus}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                  Filter by Status
                </div>
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50 hover:text-primary flex items-center justify-between group"
                  >
                    {status}
                    {currentStatus === status.toLowerCase() && (
                      <Check className="w-3.5 h-3.5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {currentView === "list" ? (
        <PackagesTable packages={initialPackages} />
      ) : (
        <PackagesGrid packages={initialPackages} />
      )}
    </div>
  );
}
