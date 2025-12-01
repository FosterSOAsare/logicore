"use client";

import Navbar from "@/features/shared/ui/navbar";
import Footer from "@/features/shared/ui/footer";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  MapPin,
  Clock,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero / Search Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-20 overflow-hidden bg-slate-50">
        {/* Background Map */}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white" />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-semibold tracking-wide uppercase text-xs">
                Real-Time Tracking
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
              Track Your Shipment
            </h1>
            <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
              Enter your tracking ID below to get the latest status updates on
              your cargo's journey.
            </p>

            {/* Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-blue-900/5 border border-gray-100 max-w-2xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex flex-col sm:flex-row items-center p-2 gap-2">
                <div className="flex-1 flex items-center px-4 h-14 bg-gray-50 rounded-xl w-full border border-transparent focus-within:border-secondary/30 focus-within:bg-white transition-all">
                  <Search className="text-muted w-5 h-5 mr-3" />
                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking ID (e.g., LGC-829301)"
                    className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-muted/70 font-medium text-lg"
                  />
                </div>
                <button className="w-full sm:w-auto px-8 h-14 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-bold text-lg">
                  Track
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-secondary">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Real-Time Updates
              </h3>
              <p className="text-muted leading-relaxed">
                Get instant notifications about your shipment's location and
                estimated delivery time.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-secondary">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                Global Coverage
              </h3>
              <p className="text-muted leading-relaxed">
                Track shipments across 150+ countries with our unified tracking
                system.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-secondary">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                24/7 Support
              </h3>
              <p className="text-muted leading-relaxed">
                Need help? Our support team is available around the clock to
                assist with any tracking issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Where can I find my tracking ID?",
                a: "Your tracking ID is included in your shipping confirmation email and on your receipt. It typically starts with 'LGC' followed by 6-9 digits.",
              },
              {
                q: "How often is tracking information updated?",
                a: "Tracking information is updated in real-time as your shipment passes through our scanning points. Major status changes are reflected instantly.",
              },
              {
                q: "What if my package is delayed?",
                a: "If your package is delayed, the tracking status will be updated with a new estimated delivery date. You can also contact our support team for more detailed information.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-bold text-primary mb-2">{faq.q}</h3>
                <p className="text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
