"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/features/services/data";

export default function ServicesGrid() {
  return (
    <section className="py-12 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              href={`/services/${service.slug}`}
              key={index}
              className="block group h-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-[10px] p-6 md:p-8 h-full border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] active:border-gray-100 active:bg-white active:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-gray-100">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors duration-300" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <ArrowRight className="w-5 h-5 text-secondary -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted mb-8 leading-relaxed flex-grow">
                  {service.description}
                </p>

                <div className="space-y-4 pt-8 border-t border-gray-200/50">
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm font-medium text-gray-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      </div>
                      <span className="group-hover:text-primary transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
