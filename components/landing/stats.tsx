"use client";

import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import "number-flow";
import "number-flow/group";

// Custom elements (number-flow); typed as React.ElementType for JSX (see number-flow.d.ts)
const NumberFlowEl = "number-flow" as React.ElementType;
const NumberFlowGroup = "number-flow-group" as React.ElementType;

type StatItem = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  format?: Intl.NumberFormatOptions;
};

const stats: StatItem[] = [
  {
    id: "jobs",
    label: "Projects completed",
    value: 12840,
    suffix: "+",
    format: { notation: "compact", maximumFractionDigits: 1 },
  },
  {
    id: "response",
    label: "Average response time",
    value: 42,
    suffix: " mins",
    format: { maximumFractionDigits: 0 },
  },
  {
    id: "repeat",
    label: "Repeat clients",
    value: 0.72,
    format: { style: "percent", maximumFractionDigits: 0 },
  },
  {
    id: "coverage",
    label: "London boroughs covered",
    value: 26,
    suffix: " boroughs",
    format: { maximumFractionDigits: 0 },
  },
];

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: Intl.NumberFormatOptions;
};

const AnimatedNumber = ({ value, prefix, suffix, format }: AnimatedNumberProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement & {
      update?: (value?: number) => void;
      format?: Intl.NumberFormatOptions;
      numberPrefix?: string;
      numberSuffix?: string;
      animated?: boolean;
      trend?: number;
      transformTiming?: EffectTiming;
      spinTiming?: EffectTiming;
      opacityTiming?: EffectTiming;
    };

    if (!el || typeof el.update !== "function") return;

    el.animated = true;
    el.trend = 1;
    el.transformTiming = { duration: 2000, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "both" };
    el.spinTiming = { duration: 2000, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "both" };
    el.opacityTiming = { duration: 1400, easing: "ease-out", fill: "both" };
    if (format) el.format = format;
    if (prefix !== undefined) el.numberPrefix = prefix;
    if (suffix !== undefined) el.numberSuffix = suffix;

    const animate = () => {
      if (!el.update) return;
      el.update(0);
      requestAnimationFrame(() => el.update?.(value));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefix, suffix, format]);

  return (
    <NumberFlowEl
      ref={ref}
      className="block text-[28px] sm:text-[36px] lg:text-[42px] font-thin tracking-[0.06em] text-[#0a0a0a] leading-[1.05]"
      aria-live="polite"
    />
  );
};

export const Stats = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-14 ${mounted ? "reveal-on-scroll" : ""}`}>
          <div className="max-w-3xl space-y-5">
            <p className="text-[10px] font-light uppercase tracking-[0.18em] text-[#1a1a1a]">
              Operational metrics
            </p>
            <h2 className="heading-precision text-3xl sm:text-4xl font-extralight tracking-[0.16em] text-[#0a0a0a] uppercase">
              Measured reliability
            </h2>
            <p className="text-sm text-[#1a1a1a] leading-relaxed font-light tracking-[0.02em]">
              Transparent metrics that reflect the precision and reliability we deliver across London.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge className="rounded-none border-[#0a0a0a]/[0.12] bg-white text-[#0a0a0a] font-light text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
                <ShieldCheck className="h-3 w-3 mr-1.5" aria-hidden="true" />
                DBS checked teams
              </Badge>
              <Badge className="rounded-none border-[#0a0a0a]/[0.12] bg-white text-[#0a0a0a] font-light text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
                <Sparkles className="h-3 w-3 mr-1.5" aria-hidden="true" />
                12-month guarantee
              </Badge>
              <Badge className="rounded-none border-[#0a0a0a]/[0.12] bg-white text-[#0a0a0a] font-light text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
                <Clock3 className="h-3 w-3 mr-1.5" aria-hidden="true" />
                24/7 dispatch
              </Badge>
              <Badge className="rounded-none border-[#0a0a0a]/[0.12] bg-white text-[#0a0a0a] font-light text-[10px] uppercase tracking-[0.1em] px-2.5 py-1">
                <MapPin className="h-3 w-3 mr-1.5" aria-hidden="true" />
                Greater London
              </Badge>
            </div>
          </div>
        </div>

        <NumberFlowGroup className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "200ms" }}>
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="card-precision border border-[#0a0a0a]/[0.08] bg-white px-6 py-8"
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                format={stat.format}
              />
              <p className="mt-3 text-[10px] font-light uppercase tracking-[0.1em] text-[#1a1a1a] leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </NumberFlowGroup>
      </div>
    </section>
  );
};
