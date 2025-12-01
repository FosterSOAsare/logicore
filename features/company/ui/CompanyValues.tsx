"use client";

import { motion } from "framer-motion";
import { Shield, Users, Lightbulb, Globe } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "We conduct our business with the highest ethical standards, ensuring transparency and trust in every interaction.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Our customers are at the heart of everything we do. We go above and beyond to exceed their expectations.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We embrace change and continuously seek new ways to improve our services through technology and creativity.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    desc: "We are committed to reducing our environmental impact and promoting sustainable practices in the logistics industry.",
  },
];

export default function CompanyValues() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Our Core <span className="text-secondary">Values</span>
          </h2>
          <p className="text-gray-500 text-lg">
            These principles guide our decisions and define our culture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              <div className="w-16 h-16 mx-auto bg-gray-50 rounded-lg flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-500 relative z-10">
                <value.icon className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300">
                {value.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                {value.desc}
              </p>

              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
