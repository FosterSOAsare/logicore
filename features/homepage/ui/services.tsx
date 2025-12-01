"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/features/services/data";

export default function Services() {
  return (
    <section className="py-12 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
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
            <h2 className="text-3xl lg:text-4xl md:text-5xl font-bold text-primary mt-3 mb-6 tracking-tight">
              Comprehensive Logistics <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Solutions for Every Need
              </span>
            </h2>
            <p className="text-muted text-base lg:text-lg leading-relaxed">
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
            >
              <Link
                href={`/services/${service.slug}`}
                className="block h-full group relative bg-gray-50 rounded-3xl p-4 md:p-8 lg:hover:bg-white lg:hover:shadow-xl lg:hover:shadow-gray-200/50 active:bg-white active:shadow-xl active:shadow-gray-200/50 transition-all duration-300 border border-transparent lg:hover:border-gray-100 active:border-gray-100"
              >
                <div className="absolute top-8 right-8 opacity-0 lg:group-hover:opacity-100 group-active:opacity-100 transition-opacity transform translate-x-2 lg:group-hover:translate-x-0 group-active:translate-x-0">
                  <ArrowUpRight className="w-6 h-6 text-secondary" />
                </div>

                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm lg:group-hover:bg-secondary lg:group-hover:text-white group-active:bg-secondary group-active:text-white transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary lg:group-hover:text-white group-active:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-primary mb-4 lg:group-hover:!text-secondary group-active:!text-secondary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted leading-relaxed md:mb-6">
                  {service.description}
                </p>

                <div className="hidden md:block w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-secondary lg:group-hover:w-full group-active:w-full transition-all duration-500 ease-out" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
