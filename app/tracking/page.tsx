import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import TrackingHero from "@/features/tracking/ui/TrackingHero";
import TrackingFAQ from "@/features/tracking/ui/TrackingFAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Shipment - LogiCore",
  description:
    "Real-time tracking for your cargo. Enter your tracking ID to get the latest status updates.",
};

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <TrackingHero />
      <TrackingFAQ />
      <Footer />
    </main>
  );
}
