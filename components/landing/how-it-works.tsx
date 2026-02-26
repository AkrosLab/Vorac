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
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-3xl text-center mb-14 ${mounted ? "reveal-on-scroll" : ""}`}>
          <h2 className="heading-precision text-3xl sm:text-4xl font-extralight tracking-[0.16em] text-[#0a0a0a] uppercase mb-5">
            How It Works
          </h2>
          <p className="text-sm text-[#1a1a1a] font-light leading-relaxed tracking-[0.02em]">
            Professional service in three measured steps.
          </p>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#0a0a0a] text-white font-light text-sm tracking-[0.12em] border border-[#0a0a0a]">
                    {step.number}
                  </div>
                  <div className="h-9 w-9 flex items-center justify-center border border-[#0a0a0a]/[0.12]">
                    <Icon className="h-4 w-4 text-[#0a0a0a]/60" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-base font-light text-[#0a0a0a] uppercase tracking-[0.12em] mb-3">{step.title}</h3>
                <p className="text-sm text-[#1a1a1a] leading-relaxed font-extralight tracking-[0.02em]">{step.description}</p>

                {step.number !== "03" && (
                  <div className="hidden md:block absolute top-5 left-[72px] right-[-40px] h-px bg-[#0a0a0a]/[0.08]" aria-hidden />
                )}
              </div>
            );
          })}
        </div>
        <div className={`mt-16 text-center p-6 border border-[#0a0a0a]/[0.08] max-w-2xl mx-auto bg-white ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "200ms" }}>
          <p className="text-sm text-[#1a1a1a] font-extralight italic tracking-[0.02em]">
            <strong className="text-[#0a0a0a] not-italic font-light uppercase tracking-[0.12em] text-[10px] mr-2">Emergency:</strong>
            Available 24/7 for urgent issues across London.
          </p>
        </div>
      </div>
    </section>
  );
};
