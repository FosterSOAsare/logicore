import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import CompanyHero from "@/features/company/ui/CompanyHero";
import CompanyStory from "@/features/company/ui/CompanyStory";
import CompanyValues from "@/features/company/ui/CompanyValues";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - LogiCore",
  description:
    "Learn about LogiCore's mission, vision, and core values. We are dedicated to providing excellence in global logistics.",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <CompanyHero />
      <CompanyStory />
      <CompanyValues />
      <Footer />
    </main>
  );
}
