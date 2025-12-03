import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import Hero from "@/features/homepage/ui/hero";
import Services from "@/features/homepage/ui/services";
import WhyUs from "@/features/homepage/ui/why-us";
import Testimonials from "@/features/homepage/ui/testimonials";
import Quote from "@/features/homepage/ui/quote";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LogiCore - Global Logistics Partner",
  description:
    "Seamless global logistics solutions for a connected world. Track your cargo, get quotes, and manage shipments with LogiCore.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
      <Quote />
      <Footer />
    </main>
  );
}
