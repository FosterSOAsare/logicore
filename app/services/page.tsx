import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import ServicesHero from "@/features/services/ui/ServicesHero";
import ServicesGrid from "@/features/services/ui/ServicesGrid";
import ProcessSection from "@/features/services/ui/ProcessSection";
import ServicesCTA from "@/features/services/ui/ServicesCTA";

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
