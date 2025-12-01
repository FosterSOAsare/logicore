"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TrackingHero() {
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
    <section className="relative min-h-screen flex items-center justify-center py-24 lg:py-36 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop"
          alt="Global Logistics Tracking"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 shadow-sm mb-6 lg:mb-8 backdrop-blur-sm mx-auto"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-white font-semibold tracking-wide text-xs lg:text-sm">
              Live Shipment Tracking
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="text-4xl lg:text-5xl xl:text-7xl font-bold !text-white tracking-tight mb-4 lg:mb-6 leading-[1.1]"
          >
            Monitor Your Cargo <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">
              In Real-Time
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base lg:text-xl text-gray-200 mb-8 lg:mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Stay informed with precise location updates and estimated delivery
            times. Our advanced tracking network ensures you never lose sight of
            your valuable shipments.
          </motion.p>

          {/* Tracking Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className="bg-white p-2 rounded-2xl shadow-2xl shadow-black/20 max-w-4xl mx-auto mb-16"
          >
            <div className="flex flex-col sm:flex-row items-center p-2 gap-2">
              <div className="flex-1 flex items-center px-4 h-14 bg-gray-50 rounded-xl w-full border border-gray-100 focus-within:border-secondary/50 focus-within:bg-white transition-all">
                <Search className="text-gray-400 w-5 h-5 mr-3" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder="Enter Tracking ID (e.g., LGC-123456789)"
                  className="flex-1 bg-transparent py-4 border-none outline-none text-primary placeholder:text-gray-400 font-medium"
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
                    Track Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.4,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: MapPin,
                title: "Global Network",
                desc: "Seamless tracking across 150+ countries",
              },
              {
                icon: Clock,
                title: "Instant Alerts",
                desc: "Real-time status notifications via SMS/Email",
              },
              {
                icon: CheckCircle2,
                title: "Secure Delivery",
                desc: "Digital proof of delivery and signature",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 100 },
                  },
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-2xl text-left hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="!text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
