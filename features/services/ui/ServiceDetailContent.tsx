"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import { services } from "@/features/services/data";

interface ServiceDetailContentProps {
  slug: string;
}

export default function ServiceDetailContent({
  slug,
}: ServiceDetailContentProps) {
  const service = services.find((s) => s.slug === slug);

  if (!service) return null;
  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-24 lg:top-32 space-y-6 lg:space-y-8">
              {/* Service List */}
              <div className="bg-gray-50 rounded-3xl p-6 lg:p-8 border border-gray-100">
                <h3 className="text-lg font-bold text-primary mb-6">
                  Other Services
                </h3>
                <div className="space-y-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className={`flex items-center justify-between p-2 md:p-4 rounded-xl transition-all ${
                        s.slug === slug
                          ? "bg-primary text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-100 hover:text-primary active:bg-gray-100 active:text-primary"
                      }`}
                    >
                      <span className="font-medium">{s.title}</span>
                      {s.slug === slug && <ChevronRight className="w-4 h-4" />}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-secondary rounded-xl md;rounded-3xl p-4 lg:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
                <p className="text-white mb-6 text-sm leading-relaxed">
                  Our logistics experts are ready to assist you with your
                  specific requirements.
                </p>
                <a
                  href="tel:+233550529015"
                  className="flex items-center gap-3 bg-white/10 p-4 rounded-xl hover:bg-white/20 active:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-white text-secondary flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/80">Call Us 24/7</p>
                    <p className="font-bold">+233 55 052 9015</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="prose prose-lg max-w-none mb-8 lg:mb-16">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4 lg:mb-6">
                  Overview
                </h2>
                <p className="text-muted leading-relaxed text-base lg:text-lg">
                  {service.details}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-12 lg:mb-16">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-2 lg:p-6 rounded-2xl bg-gray-50 border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">{feature}</h4>
                      <p className="text-sm text-muted">
                        Optimized for efficiency and reliability.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Box */}
              <div className="bg-primary rounded-[1rem] md:rounded-[2rem] p-4 md:p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

                <div className="relative z-10">
                  <h3 className="text-xl md:text-3xl !text-secondary font-bold mb-4">
                    Ready to ship with {service.title}?
                  </h3>
                  <p className="text-gray-300 mb-8 max-w-xl text-sm md:text-base">
                    Get a competitive quote tailored to your specific cargo
                    needs. Our team will get back to you within 2 hours.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/#quote"
                      className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 active:bg-secondary/90 active:scale-95 transition-all gap-2 shadow-lg shadow-secondary/20"
                    >
                      Get Custom Quote
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 active:bg-white/20 active:scale-95 transition-all gap-2 backdrop-blur-sm"
                    >
                      Talk to an Expert
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
