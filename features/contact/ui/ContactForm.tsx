"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "../schema";
import { submitContactForm } from "../actions";
import { useState } from "react";

export default function ContactForm() {
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await submitContactForm(data);

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

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.firstName ? "border-red-500" : "border-gray-200"
                    } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white`}
                    placeholder="John"
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
                    {...register("lastName")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.lastName ? "border-red-500" : "border-gray-200"
                    } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white`}
                    placeholder="Doe"
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
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  {...register("subject")}
                  className={`w-full px-4 appearance-none py-3 rounded-lg border ${
                    errors.subject ? "border-red-500" : "border-gray-200"
                  } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white text-gray-600`}
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Track Shipment">Track Shipment</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Report an Issue">Report an Issue</option>
                  <option value="Billing Inquiry">Billing Inquiry</option>
                  <option value="Career Opportunities">
                    Career Opportunities
                  </option>
                </select>
                {errors.subject && (
                  <p className="text-xs text-red-600">
                    {errors.subject.message}
                  </p>
                )}
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
                  {...register("message")}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? "border-red-500" : "border-gray-200"
                  } focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-white resize-none`}
                  placeholder="How can we help you?"
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
                className="w-full py-4 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/90 active:bg-secondary/90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
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
