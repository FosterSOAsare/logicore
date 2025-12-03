import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import ContactHero from "@/features/contact/ui/ContactHero";
import ContactForm from "@/features/contact/ui/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - LogiCore",
  description:
    "Get in touch with LogiCore for support, quotes, or inquiries. We are here to help with your logistics needs.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ContactHero />
      <ContactForm />
      <Footer />
    </main>
  );
}
