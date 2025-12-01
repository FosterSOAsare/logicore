"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          alt="Contact Support"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-sm mb-6 lg:mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-white font-semibold tracking-wide uppercase text-xs">
              Get in Touch
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold !text-white mb-6 lg:mb-8 tracking-tight leading-[1.1]">
            We're Here to <br />
            <span className="text-secondary">Help You</span>
          </h1>
          <p className="text-base lg:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Have a question about our services or need assistance with your
            shipment? Our team is ready to assist you 24/7.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
