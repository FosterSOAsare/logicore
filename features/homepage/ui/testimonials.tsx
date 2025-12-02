"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "LogiCore has completely transformed our supply chain. Their real-time tracking and proactive updates give us peace of mind.",
    author: "Sarah Johnson",
    role: "Operations Director, TechFlow Inc.",
    image: "/testimonials/sarah.png",
    rating: 5,
  },
  {
    quote:
      "The best logistics partner we've worked with. Their team goes above and beyond to ensure our shipments arrive on time, every time.",
    author: "Michael Chen",
    role: "CEO, Global Trade Solutions",
    image: "/testimonials/michael.png",
    rating: 5,
  },
  {
    quote:
      "Reliable, efficient, and professional. LogiCore handled our complex project cargo with ease. Highly recommended.",
    author: "Emma Davis",
    role: "Logistics Manager, BuildRight Construction",
    image: "/testimonials/emma.png",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Split Background */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gray-50 -z-10" />

      {/* Decorative Grid Pattern */}
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
        <div
          className="w-64 h-64 bg-repeat"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 lg:mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-8 bg-secondary"></span>
              <span className="text-secondary font-bold tracking-widest uppercase text-xs">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              What our partners say
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <p className="text-gray-500 max-w-xs text-right">
              Trusted by over 500+ companies worldwide for their logistics
              needs.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-8 lg:p-10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-shadow duration-300"
            >
              {/* Header: User Info */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-gray-50">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-lg leading-tight">
                    {testimonial.author}
                  </h4>
                  <p className="text-sm text-gray-500 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Body: Quote */}
              <div className="flex-grow relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-secondary/10 transform -scale-x-100" />
                <p className="text-gray-700 text-lg leading-relaxed relative z-10 pl-4">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Footer: Rating */}
              <div className="pt-8 mt-8 border-t border-gray-50 flex items-center justify-between">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-secondary fill-secondary"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Verified Client
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
