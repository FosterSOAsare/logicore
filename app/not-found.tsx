import Link from "next/link";
import { ArrowLeft, PackageX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-gray-200 flex items-center justify-center mx-auto mb-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <PackageX className="w-10 h-10 text-secondary relative z-10" />
        </div>

        <h1 className="text-4xl font-bold text-primary mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
          The shipment you're looking for seems to have gone off-grid. Let's get
          you back on track.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all hover:gap-4 shadow-lg shadow-primary/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
