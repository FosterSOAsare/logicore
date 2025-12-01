import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import CompanyHero from "@/features/company/ui/CompanyHero";
import CompanyStory from "@/features/company/ui/CompanyStory";
import CompanyValues from "@/features/company/ui/CompanyValues";

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
