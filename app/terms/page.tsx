import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-primary py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold !text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      <div className="py-24 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p className="mb-6">Last updated: December 1, 2025</p>
          <p className="mb-6">
            Please read these Terms of Service ("Terms", "Terms of Service")
            carefully before using the LogiCore website and services operated by
            LogiCore Logistics ("us", "we", or "our").
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing or using our Service, you agree to be bound by these
            Terms. If you disagree with any part of the terms, then you may not
            access the Service.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            2. Use of Services
          </h2>
          <p className="mb-4">
            You agree to use our services only for lawful purposes and in
            accordance with these Terms. You are prohibited from violating or
            attempting to violate the security of the Site or our services.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            3. Shipment and Delivery
          </h2>
          <p className="mb-4">
            All shipments are subject to our standard shipping terms and
            conditions. We strive to meet estimated delivery times, but delays
            may occur due to unforeseen circumstances.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            4. Limitation of Liability
          </h2>
          <p className="mb-6">
            In no event shall LogiCore, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            5. Governing Law
          </h2>
          <p className="mb-6">
            These Terms shall be governed and construed in accordance with the
            laws of the United States, without regard to its conflict of law
            provisions.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            6. Changes
          </h2>
          <p className="mb-6">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. By continuing to access or use our Service
            after those revisions become effective, you agree to be bound by the
            revised terms.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
