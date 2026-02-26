"use client";

import { FileText, Calendar, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Tell us what you need",
    description: "Fill out our quick quote form or call us directly. We'll understand your requirements and urgency.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Get a quote + time slot",
    description: "We'll provide a transparent, fixed-price quote and arrange a convenient time slot that works for you.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Job done, guaranteed",
    description: "Our qualified tradesperson completes the work to the highest standard, with a 12-month guarantee.",
  },
];

export const HowItWorks = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-3xl text-center mb-16 ${mounted ? "reveal-on-scroll" : ""}`}>
          <h2 className="heading-precision text-4xl sm:text-5xl font-thin tracking-[0.16em] text-[#0a0a0a] uppercase mb-6">
            How It Works
          </h2>
          <p className="text-base text-[#1a1a1a] font-light leading-relaxed">
            Professional service in three measured steps.
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                <div className="mb-8 flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-none bg-[#0a0a0a] text-white font-thin text-xl tracking-wider border border-[#0a0a0a]/20">
                    {step.number}
                  </div>
                  <div className="h-10 w-10 rounded-none bg-[#f8f8f8] border border-[#0a0a0a]/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#0a0a0a]/70" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-xl font-light text-[#0a0a0a] uppercase tracking-[0.12em] mb-4">{step.title}</h3>
                <p className="text-sm text-[#1a1a1a] leading-relaxed font-extralight">{step.description}</p>
                
                {step.number !== "03" && (
                  <div className="hidden md:block absolute top-6 left-[88px] right-[-48px] h-px bg-[#0a0a0a]/8" aria-hidden />
                )}
              </div>
            );
          })}
        </div>
        <div className={`mt-20 text-center p-8 rounded-none pearl-surface max-w-2xl mx-auto border border-[#0a0a0a]/20 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "200ms" }}>
          <p className="text-sm text-[#1a1a1a] font-extralight italic">
            <strong className="text-[#0a0a0a] not-italic font-light uppercase tracking-[0.12em] text-xs mr-3">Emergency:</strong>
            Available 24/7 for urgent issues across London.
          </p>
        </div>
      </div>
    </section>
  );
};
