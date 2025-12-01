"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CompanyStory() {
  return (
    <section className="py-8 md:py-12 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[300px] md:h-[400px] lg:h-[600px] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1524522173746-f628baad3644?q=80&w=2131&auto=format&fit=crop"
                alt="Journey to Excellence"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl lg:text-4xl font-bold text-primary mb-6"
            >
              Our Journey to <br />
              <span className="text-secondary">Excellence</span>
            </motion.h2>
            <div className="space-y-6 text-base lg:text-lg text-gray-500 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Founded in 2010, Logicore began with a simple mission: to
                simplify global trade. What started as a small freight
                forwarding operation has grown into a comprehensive logistics
                powerhouse, serving clients in over 150 countries.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                We believe that logistics is more than just moving goods; it's
                about connecting people, businesses, and economies. Our
                commitment to innovation and customer satisfaction has driven us
                to develop cutting-edge technology and build a robust global
                network.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Today, we continue to push the boundaries of what's possible in
                supply chain management, leveraging AI and data analytics to
                provide smarter, faster, and more sustainable solutions.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
