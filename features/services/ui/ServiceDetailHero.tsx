"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ServiceDetailHeroProps {
  title: string;
  description: string;
}

export default function ServiceDetailHero({
  title,
  description,
}: ServiceDetailHeroProps) {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/service-detail-bg.png"
          alt="Abstract Logistics Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <Link
            href="/services"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors text-sm font-medium group"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold !text-secondary mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
