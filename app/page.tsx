import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import Hero from "@/features/homepage/ui/hero";
import Services from "@/features/homepage/ui/services";
import WhyUs from "@/features/homepage/ui/why-us";
import Testimonials from "@/features/homepage/ui/testimonials";
import Contact from "@/features/homepage/ui/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
