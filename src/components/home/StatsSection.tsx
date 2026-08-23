"use client";

import React from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Globe, Award, Zap, Database } from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: any;
  description: string;
}

const stats: StatItem[] = [
  {
    label: "Projects Delivered",
    value: 50,
    suffix: "+",
    icon: Zap,
    description: "Enterprise & startup products shipped",
  },
  {
    label: "Years of Experience",
    value: 6,
    suffix: "+",
    icon: Award,
    description: "Full-stack architecture & engineering",
  },
  {
    label: "Client Satisfaction",
    value: 100,
    suffix: "%",
    icon: TrendingUp,
    description: "Repeat engagement & referral rate",
  },
  {
    label: "Technologies Mastered",
    value: 30,
    suffix: "+",
    icon: Database,
    description: "Across frontend, backend & DevOps",
  },
  {
    label: "Global Clients",
    value: 25,
    suffix: "+",
    icon: Globe,
    description: "Spanning 4 continents & 12+ industries",
  },
  {
    label: "Team Members Led",
    value: 15,
    suffix: "+",
    icon: Users,
    description: "Cross-functional engineering squads",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(eased * value));
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 border-t border-white/[0.06] bg-[#09090d]/60 relative overflow-hidden">
      {/* Radial ambient light */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dfb15b]/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-16 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#dfb15b]">
            By The Numbers
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Impact & Engineering Metrics
          </h2>
          <p className="text-platinum-400 text-sm sm:text-base font-light leading-relaxed">
            Quantified track record of architectural delivery, client satisfaction, and cross-domain expertise.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col gap-4 hover:border-[#dfb15b]/30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#dfb15b] group-hover:bg-[#dfb15b] group-hover:text-black transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-platinum-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                <p className="text-xs font-mono text-platinum-400 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
