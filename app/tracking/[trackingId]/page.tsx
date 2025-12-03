import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import TrackingDetails from "@/features/tracking/ui/TrackingDetails";
import { getPackageById } from "@/features/packages/actions";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}): Promise<Metadata> {
  const trackingId = (await params).trackingId;
  return {
    title: `Tracking ${trackingId} - LogiCore`,
    description: `View detailed tracking information for shipment ${trackingId}.`,
  };
}

export default async function TrackingDetailsPage({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  const trackingId = (await params).trackingId;
  const packageData = await getPackageById(trackingId);

  if (!packageData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold !text-white mb-4 md:mb-6">
            Shipment Details
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Real-time tracking information for your cargo.
          </p>
        </div>
      </section>

      <div className="-mt-12 md:-mt-20 relative z-20 pb-12 md:pb-24">
        <TrackingDetails packageData={packageData} />
      </div>
      <Footer />
    </main>
  );
}
