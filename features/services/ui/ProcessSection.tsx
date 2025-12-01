"use client";

import { motion } from "framer-motion";
import { Plane, FileCheck, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

export default function ProcessSection() {
  return (
    <section className="py-24 lg:py-32 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#ffffff_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Streamlined Process, <br />
              <span className="text-secondary">Maximum Efficiency</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg">
              We've optimized every step of the logistics journey to ensure
              transparency, speed, and reliability for your cargo.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              Start Your Shipment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              title: "01. Consultation",
              desc: "We analyze your specific shipping requirements and constraints.",
              icon: Clock,
            },
            {
              title: "02. Strategy",
              desc: "Our experts design a custom logistics route and plan.",
              icon: FileCheck,
            },
            {
              title: "03. Execution",
              desc: "Seamless transport with real-time tracking updates.",
              icon: Plane,
            },
            {
              title: "04. Delivery",
              desc: "Safe arrival and detailed performance reporting.",
              icon: ShieldCheck,
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute top-0 left-0 w-full h-px bg-white/10 group-hover:bg-secondary/50 transition-colors duration-500" />
              <div className="pt-8">
                <step.icon className="w-8 h-8 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
