"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award, Users, Globe2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function CompanyStory() {
  const milestones = [
    { year: "2010", label: "Founded", icon: Award, isNumber: false },
    {
      year: "10000",
      suffix: "K+",
      label: "Clients Served",
      icon: Users,
      isNumber: true,
    },
    {
      year: "150",
      suffix: "+",
      label: "Countries",
      icon: Globe2,
      isNumber: true,
    },
  ];

  return (
    <section className="py-12 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-secondary" />
            Our Journey
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6"
          >
            Building Excellence in{" "}
            <span className="text-secondary">Global Logistics</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500"
          >
            From a small operation to a global powerhouse, our story is one of
            innovation, dedication, and relentless pursuit of excellence.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Main Large Image */}
              <div className="col-span-2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/company-story.png"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />

                {/* Floating Badge on Image */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold text-secondary">15+</p>
                  <p className="text-sm text-gray-600 font-medium">Years</p>
                </div>
              </div>

              {/* Two Small Images Side by Side */}
              <div className="relative h-[180px] md:h-[200px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Team Collaboration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20" />
              </div>

              <div className="relative h-[180px] md:h-[200px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
                  alt="Global Operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-secondary/20" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-primary mb-4"
                >
                  From Humble Beginnings
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-500 leading-relaxed"
                >
                  Founded in 2010, Logicore started as a small freight
                  forwarding operation with just five employees. Today, we serve
                  thousands of clients across six continents, transforming how
                  businesses approach global logistics.
                </motion.p>
              </div>

              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-primary mb-4"
                >
                  Driven by Innovation
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-500 leading-relaxed"
                >
                  We combine traditional reliability with cutting-edge
                  technology. From AI-powered route optimization to real-time
                  tracking systems, we deliver the most efficient and
                  transparent logistics solutions in the industry.
                </motion.p>
              </div>

              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl font-bold text-primary mb-4"
                >
                  Building the Future
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-500 leading-relaxed"
                >
                  Our mission is to redefine what's possible in global logistics
                  through sustainable practices, network expansion, and
                  exceptional service that exceeds expectations.
                </motion.p>
              </div>
            </div>

            {/* Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200"
            >
              {milestones.map((milestone, index) => (
                <MilestoneCard
                  key={index}
                  milestone={milestone}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Counting animation component
function CountingNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      // Wait for motion animation to finish (delay: 0.8s + duration: 0.5s = 1.3s total)
      const initialDelay = setTimeout(() => {
        let startTime: number | null = null;
        const duration = 2000; // 2 seconds

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.floor(easeOutQuart * target);

          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        requestAnimationFrame(animate);
      }, 1300); // Wait 1.3 seconds for motion animation to complete

      return () => clearTimeout(initialDelay);
    }
  }, [isInView, target]);

  // Format number with K suffix if needed
  const displayValue = target >= 10000 ? `${Math.floor(count / 1000)}` : count;

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

// Milestone card component
function MilestoneCard({
  milestone,
  index,
}: {
  milestone: any;
  index: number;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 mx-auto mb-3 bg-secondary/10 rounded-xl flex items-center justify-center">
        <milestone.icon className="w-6 h-6 text-secondary" />
      </div>
      <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
        {milestone.isNumber ? (
          <CountingNumber
            target={parseInt(milestone.year)}
            suffix={milestone.suffix}
          />
        ) : (
          milestone.year
        )}
      </p>
      <p className="text-xs md:text-sm text-gray-500 font-medium">
        {milestone.label}
      </p>
    </div>
  );
}
