"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package, Plane, Ship, Truck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex py-12 items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7">
            {/* Badge - Fade in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-semibold tracking-wide uppercase text-xs">
                Trusted Worldwide
              </span>
            </motion.div>

            {/* Heading - Slide from left */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold text-primary tracking-tight mb-6 leading-[1.05]"
            >
              Your Cargo, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-secondary">
                Our Priority
              </span>
            </motion.h1>

            {/* Description - Fade in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted mb-10 max-w-xl leading-relaxed"
            >
              Seamless logistics solutions connecting businesses across 150+
              countries. From air freight to ocean shipping, we deliver
              excellence at every mile.
            </motion.p>

            {/* Tracking Widget - Scale up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white p-2 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 max-w-xl mb-12"
            >
              <div className="flex items-center px-4 h-16 bg-gray-50 rounded-xl border border-transparent focus-within:border-secondary/30 focus-within:bg-white transition-all">
                <Package className="text-muted w-5 h-5 mr-3" />
                <input
                  type="text"
                  placeholder="Track your shipment (e.g., TG123456789)"
                  className="flex-1 bg-transparent border-none outline-none text-primary placeholder:text-muted/70 font-medium"
                />
                <button className="ml-2 px-6 h-12 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors font-semibold">
                  Track
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Quick Stats - Slide up */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 max-w-xl"
            >
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-primary mb-1">150+</p>
                <p className="text-sm text-muted">Countries Served</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-primary mb-1">98%</p>
                <p className="text-sm text-muted">On-Time Delivery</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-primary mb-1">24/7</p>
                <p className="text-sm text-muted">Customer Support</p>
              </div>
            </motion.div>
          </div>

          {/* Right Visual - 5 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            {/* Service Cards Grid */}
            <div className="grid gap-5">
              {/* Card 1 - Air Freight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-secondary/30 transition-all"
              >
                <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Plane className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary mb-1">
                      Air Freight
                    </h3>
                    <p className="text-xs text-muted">
                      Express worldwide delivery
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    2-5 Days
                  </div>
                </div>
                <p className="text-sm text-muted mt-4 leading-relaxed">
                  Priority handling with real-time tracking for urgent shipments
                </p>
              </motion.div>

              {/* Card 2 - Ocean Freight (Featured) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-primary to-slate-800 rounded-2xl p-6 shadow-xl text-white hover:shadow-2xl transition-all border border-white/10"
              >
                <div className="flex items-center gap-4 pb-5 border-b border-white/20">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Ship className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">Ocean Freight</h3>
                    <p className="text-xs text-white/80">
                      Cost-effective bulk shipping
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-secondary text-primary text-xs font-bold">
                    15-30 Days
                  </div>
                </div>
                <p className="text-sm text-white/90 mt-4 leading-relaxed">
                  Comprehensive insurance and handling for large cargo volumes
                </p>
              </motion.div>

              {/* Card 3 - Land Transport */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-secondary/30 transition-all"
              >
                <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-primary mb-1">
                      Land Transport
                    </h3>
                    <p className="text-xs text-muted">Regional distribution</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    1-7 Days
                  </div>
                </div>
                <p className="text-sm text-muted mt-4 leading-relaxed">
                  Reliable last-mile delivery and regional logistics services
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
