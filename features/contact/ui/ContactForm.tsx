"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactForm() {
  return (
    <section className="py-8 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl lg:text-4xl font-bold text-primary mb-8"
            >
              Contact Information
            </motion.h2>
            <div className="space-y-8">
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+233 55 052 9015",
                  desc: "Mon-Fri from 8am to 5pm",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "fostersoasare@gmail.com",
                  desc: "Online support 24/7",
                },
                {
                  icon: MapPin,
                  title: "Headquarters",
                  content: "New York, NY 10001",
                  desc: "Global Operations Center",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 md:gap-6"
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 text-secondary">
                    <item.icon className="w-4 md:w-6 h-4 md:h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-base md:text-lg font-medium text-gray-900 mb-1">
                      {item.content}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-gray-100"
          >
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6">
              Send us a Message
            </h3>
            <form className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select className="w-full px-4 appearance-none py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white text-gray-600">
                  <option>General Inquiry</option>
                  <option>Track Shipment</option>
                  <option>Partnership</option>
                  <option>Report an Issue</option>
                  <option>Billing Inquiry</option>
                  <option>Career Opportunities</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Looking for a shipping quote?{" "}
                  <a
                    href="/#quote"
                    className="text-secondary font-medium hover:underline"
                  >
                    Click here to get a quick quote.
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 active:bg-secondary/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/20"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
