"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Ship,
  Truck,
  Warehouse,
  Briefcase,
  FileCheck,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Rapid global delivery for your time-sensitive cargo. We ensure your goods reach their destination safely and on schedule.",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description:
      "Cost-effective global shipping solutions for large volumes. Full container load (FCL) and less than container load (LCL) options.",
  },
  {
    icon: Truck,
    title: "Land Transportation",
    description:
      "Reliable ground transport network across continents. Door-to-door delivery with real-time tracking and fleet management.",
  },
  {
    icon: Warehouse,
    title: "Smart Warehousing",
    description:
      "Secure, climate-controlled storage with AI-driven inventory management and automated fulfillment services.",
  },
  {
    icon: Briefcase,
    title: "Project Logistics",
    description:
      "Specialized handling for oversized, heavy, or complex cargo. End-to-end planning and execution for industrial projects.",
  },
  {
    icon: FileCheck,
    title: "Customs Brokerage",
    description:
      "Expert navigation of global customs regulations. We handle documentation and compliance to prevent delays.",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-secondary font-semibold tracking-wide uppercase text-xs">
                Our Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-3 mb-6 tracking-tight">
              Comprehensive Logistics <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Solutions for Every Need
              </span>
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              From small packages to massive industrial equipment, we provide
              tailored logistics solutions that drive your business forward.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-gray-100"
            >
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="w-6 h-6 text-secondary" />
              </div>

              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-0 h-full bg-secondary group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
