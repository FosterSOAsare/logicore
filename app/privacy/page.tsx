import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - LogiCore",
  description:
    "Read our Privacy Policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-30" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold !text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            We are committed to protecting your personal information and your
            right to privacy.
          </p>
        </div>
      </section>

      <div className="py-20 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="prose prose-lg text-gray-600 max-w-none">
          <p className="mb-6">Last updated: December 1, 2025</p>
          <p className="mb-6">
            At LogiCore, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We collect information that you provide directly to us, such as when
            you request a quote, track a shipment, or contact our support team.
            This may include:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Name and contact information (email, phone number)</li>
            <li>Shipping details (origin, destination, package contents)</li>
            <li>Billing and payment information</li>
            <li>Communications and correspondence</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send you technical notices, updates, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            3. Data Security
          </h2>
          <p className="mb-6">
            We implement appropriate technical and organizational measures to
            protect the security of your personal information. However, please
            be aware that no method of transmission over the Internet or method
            of electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-primary mt-10 mb-4">
            4. Contact Us
          </h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact
            us at privacy@logicore.com.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
