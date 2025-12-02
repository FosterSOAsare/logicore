"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, QuoteFormData } from "../schema";
import { submitQuoteForm } from "../actions";
import { useState } from "react";

export default function Quote() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await submitQuoteForm(data);

      if (result.success) {
        setSubmitMessage({ type: "success", text: result.message });
        reset();
      } else {
        setSubmitMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="quote"
      className="py-12 lg:py-24 bg-gray-50 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100/50 skew-x-12 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-secondary font-semibold tracking-wide uppercase text-xs">
                Get in Touch
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-4xl md:text-5xl font-bold text-primary mt-3 mb-6 tracking-tight"
            >
              Ready to Streamline <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Your Supply Chain?
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted text-base lg:text-lg leading-relaxed mb-8 lg:mb-10 max-w-lg"
            >
              Contact our team of logistics experts to discuss your shipping
              needs. We provide tailored solutions for businesses of all sizes.
            </motion.p>

            {/* Contact Items */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Phone className="w-4 md:w-6 h-4 md:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg">
                    Call Us 24/7
                  </h3>
                  <p className="text-muted">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Multilingual support available
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Mail className="w-4 md:w-6 h-4 md:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg md:text-xl">
                    Email Us
                  </h3>
                  <p className="text-muted">contact@logicore.com</p>
                  <p className="text-sm text-gray-400 mt-1">
                    We respond within 2 hours
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-start gap-4 group"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <MapPin className="w-4 md:w-6 h-4 md:h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-lg md:text-xl">
                    Global HQ
                  </h3>
                  <p className="text-muted">New York, NY 10001</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Quote Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-4 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-primary mb-2">
              Request a Quick Quote
            </h3>
            <p className="text-muted mb-8">
              Fill out the form below and we'll get back to you with a
              competitive rate.
            </p>

            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-xl border ${
                  submitMessage.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm font-medium">{submitMessage.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("firstName")}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                      errors.firstName ? "border-red-500" : "border-gray-200"
                    } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    {...register("lastName")}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                      errors.lastName ? "border-red-500" : "border-gray-200"
                    } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all`}
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Shipping Requirements
                </label>
                <select
                  {...register("shippingRequirements")}
                  className={`w-full px-4 appearance-none py-3 rounded-lg bg-gray-50 border ${
                    errors.shippingRequirements
                      ? "border-red-500"
                      : "border-gray-200"
                  } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-gray-600`}
                >
                  <option value="">Select Freight Type</option>
                  <option value="Air Freight">Air Freight</option>
                  <option value="Ocean Freight">Ocean Freight</option>
                  <option value="Land Transport">Land Transport</option>
                  <option value="Warehousing">Warehousing</option>
                </select>
                {errors.shippingRequirements && (
                  <p className="text-xs text-red-600">
                    {errors.shippingRequirements.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your cargo..."
                  {...register("message")}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-50 border ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none`}
                />
                {errors.message && (
                  <p className="text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 active:bg-primary/90 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
