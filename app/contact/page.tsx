import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import ContactHero from "@/features/contact/ui/ContactHero";
import ContactForm from "@/features/contact/ui/ContactForm";

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
