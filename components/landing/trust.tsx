"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, Shield, Clock, Award, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const trustPoints = [
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Fixed quotes with no hidden fees. You know the cost before we start.",
  },
  {
    icon: Home,
    title: "Clean & Respectful",
    description: "We treat your property with care and leave it spotless after every job.",
  },
  {
    icon: Shield,
    title: "Qualified & Insured",
    description: "All tradespeople are fully qualified, DBS checked, and comprehensively insured.",
  },
  {
    icon: Clock,
    title: "Rapid Response",
    description: "Same-day slots available. Emergency call-outs within 2 hours in London.",
  },
  {
    icon: Award,
    title: "Workmanship Guarantee",
    description: "12-month guarantee on all work. We stand behind what we do.",
  },
  {
    icon: Phone,
    title: "Real Humans on the Phone",
    description: "Speak to a real person, not a bot. We're here to help when you need us.",
  },
];

export const Trust = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="why-vorac" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Why VORAC Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/why vorac background.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Top and bottom fade gradients */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #fafafa 0%, transparent 15%, transparent 85%, #fafafa 100%)'
          }}
        />
      </div>
      
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className={`mx-auto max-w-3xl text-center mb-16 ${mounted ? "reveal-on-scroll" : ""}`}>
          <h2 className="heading-precision text-4xl sm:text-5xl font-thin tracking-[0.16em] text-[#0a0a0a] uppercase mb-6">
            Why VORAC
          </h2>
          <p className="text-base text-[#1a1a1a] font-light leading-relaxed">
            Premium service quality built on trust and measured reliability.
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
          {trustPoints.map((point, idx) => {
            const Icon = point.icon;
            return (
              <div
                key={point.title}
                className="card-precision p-8 pearl-surface shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#0a0a0a]/20"
              >
                <div className="mb-6 h-12 w-12 rounded-none bg-[#f8f8f8] flex items-center justify-center border border-[#0a0a0a]/20">
                  <Icon className="h-5 w-5 text-[#0a0a0a]/70" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-light text-[#0a0a0a] uppercase tracking-[0.1em] mb-3">{point.title}</h3>
                <p className="text-sm text-[#1a1a1a] leading-relaxed font-extralight">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
