"use client";

import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Where can I find my tracking number?",
    answer:
      "Your tracking number is included in your shipping confirmation email. It typically starts with 'LGC' followed by 9 digits (e.g., LGC-123456789). If you cannot find it, please check your spam folder or contact our support team.",
  },
  {
    question: "How often is the tracking information updated?",
    answer:
      "Our tracking system is updated in real-time as your shipment passes through various checkpoints in our global network. You will see new status updates immediately as they occur.",
  },
  {
    question: "What does 'In Transit' mean?",
    answer:
      " 'In Transit' means your package is on its way to the final destination. It is currently moving between our logistics hubs or is out for delivery with a local courier.",
  },
  {
    question: "Can I change my delivery address after shipping?",
    answer:
      "Address changes are possible only if the package has not yet left the origin country. Please contact our customer support immediately with your tracking number to request a change.",
  },
  {
    question: "What if I miss my delivery?",
    answer:
      "If you miss a delivery, the courier will leave a note with instructions. Usually, they will attempt delivery again on the next business day, or you can pick it up from a local distribution center.",
  },
];

export default function TrackingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Header */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-6"
            >
              Support Center
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-primary mb-6"
            >
              Frequently Asked <br /> Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg leading-relaxed mb-8"
            >
              Have questions about your shipment? Find answers to common
              inquiries about tracking, delivery times, and shipping policies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
              >
                Contact Support
              </a>
            </motion.div>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full hover:cursor-pointer flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-primary text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={`p-2 rounded-full transition-colors ${
                      openIndex === index
                        ? "bg-secondary text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
