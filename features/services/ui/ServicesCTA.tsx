"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

export default function ServicesCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 lg:mb-8 tracking-tight"
          >
            Ready to Optimize Your <br />
            <span className="text-secondary">Supply Chain?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-10 lg:mb-12 leading-relaxed"
          >
            Join thousands of businesses that trust LogiCore for their global
            shipping needs. Get a custom quote tailored to your requirements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/#quote"
              className="w-full sm:w-auto px-10 py-5 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 active:bg-secondary/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-secondary/20 text-lg"
            >
              Get Custom Quote
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 active:bg-gray-50 active:scale-95 transition-all flex items-center justify-center gap-2 border border-gray-200 text-lg shadow-sm hover:shadow-md active:shadow-md"
            >
              Contact Sales
              <Mail className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
