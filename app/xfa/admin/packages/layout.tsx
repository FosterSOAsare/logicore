"use client";

import Link from "next/link";
import { Package, Box, Settings, LogOut } from "lucide-react";

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-900 leading-none">
                LogiCore
              </h1>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Management
          </div>
          <Link
            href="/xfa/admin/packages"
            className="flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium transition-all"
          >
            <Box className="w-5 h-5" />
            All Packages
          </Link>

          <div className="px-4 py-2 mt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            System
          </div>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-gray-50 hover:text-slate-900 rounded-xl transition-all font-medium"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">
                Admin User
              </p>
              <p className="text-xs text-slate-500 truncate">
                admin@logicore.com
              </p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-4 py-2 w-full hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
