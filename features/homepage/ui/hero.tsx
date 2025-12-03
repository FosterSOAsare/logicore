"use client";

import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (trackingId.trim()) {
      setIsLoading(true);
      // Simulate network delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push(`/tracking/${trackingId}`);
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center py-20 lg:py-32 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.png"
          alt="Global Logistics Network"
          fill
          className="object-cover object-[center_20%] md:scale-130 md:mt-26 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/40 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/35 to-primary/10" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8  relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/10 shadow-sm mb-6 lg:mb-8 backdrop-blur-sm mx-auto"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <span className="text-gray-200 font-semibold tracking-wide text-xs lg:text-sm">
              #1 Global Logistics Partner
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl xl:text-7xl font-bold !text-white tracking-tight mb-4 lg:mb-6 leading-[1.1]"
          >
            Seamless Global Logistics <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">
              For a Connected World
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base lg:text-xl text-gray-200 mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            From first mile to last mile, we deliver excellence. Trust Logicore
            for fast, secure, and intelligent supply chain solutions.
          </motion.p>

          {/* Tracking Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className="bg-white p-2 rounded-2xl shadow-2xl shadow-black/10 mt-16 lg:mt-26 max-w-4xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center p-2 gap-2">
              <div className="flex-1 flex items-center px-4 h-14 bg-gray-50 rounded-xl w-full border border-gray-200 focus-within:border-secondary focus-within:bg-white transition-all">
                <Package className="text-gray-400 w-5 h-5 mr-3" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder="Enter Tracking ID"
                  className="flex-1 bg-transparent py-4 border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleTrack}
                disabled={isLoading}
                className="w-full sm:w-auto px-8 h-14 bg-secondary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-secondary/90 active:bg-secondary/90 active:scale-95 transition-all shadow-lg shadow-secondary/20 font-semibold group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Track Cargo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Suggested IDs */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/60 text-sm md:text-base mt-6 font-medium"
          >
            For Testing, Try:{" "}
            <span className="text-white select-all">LGC-763364</span> ,{" "}
            <span className="text-white select-all">LGC-697993</span> ,{" "}
            <span className="text-white select-all">LGC-250116</span>. Contact
            us for demo
          </motion.p>
        </div>
      </div>
    </section>
  );
}
