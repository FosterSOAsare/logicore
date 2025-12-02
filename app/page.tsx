import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import Hero from "@/features/homepage/ui/hero";
import Services from "@/features/homepage/ui/services";
import WhyUs from "@/features/homepage/ui/why-us";
import Testimonials from "@/features/homepage/ui/testimonials";
import Quote from "@/features/homepage/ui/quote";

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
