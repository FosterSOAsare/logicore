import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import ServicesHero from "@/features/services/ui/ServicesHero";
import ServicesGrid from "@/features/services/ui/ServicesGrid";
import ProcessSection from "@/features/services/ui/ProcessSection";
import ServicesCTA from "@/features/services/ui/ServicesCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - LogiCore",
  description:
    "Explore our comprehensive range of logistics services including air freight, ocean freight, and supply chain management.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ServicesHero />
      <ServicesGrid />
      <ProcessSection />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
