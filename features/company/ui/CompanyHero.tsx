"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CompanyHero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt="Company Team"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 shadow-sm mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-white font-semibold tracking-wide uppercase text-xs">
              About Us
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold !text-white mb-8 tracking-tight leading-[1.1]">
            Building the Future of <br />
            <span className="text-secondary">Global Logistics</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We are a team of innovators, strategists, and logistics experts
            dedicated to connecting the world through seamless supply chain
            solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
