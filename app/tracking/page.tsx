import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import TrackingHero from "@/features/tracking/ui/TrackingHero";
import TrackingFAQ from "@/features/tracking/ui/TrackingFAQ";

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
