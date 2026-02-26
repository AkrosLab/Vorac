"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById("quote-form");
    form?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-28 sm:pt-40 sm:pb-36">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/background image.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-white/70" />
      </div>
      
      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] items-center">
          <div className="max-w-4xl space-y-8">
            {/* Logo/Title */}
            <div className={`space-y-4 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
              <h1 className="text-[52px] sm:text-[72px] lg:text-[88px] font-thin tracking-[0.28em] text-[#0a0a0a] leading-[1.02] uppercase">
                VORAC
              </h1>
              <div className="h-px w-24 bg-gradient-to-r from-[#0a0a0a]/40 to-transparent" />
            </div>

            {/* Subtitle */}
            <p className={`text-lg sm:text-xl leading-relaxed text-[#1a1a1a] font-light max-w-2xl ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "200ms" }}>
              Precision engineering and meticulous construction services for London&apos;s most discerning properties. Where attention to detail meets measured excellence.
            </p>

            {/* CTAs */}
            <div className={`flex flex-col sm:flex-row items-start gap-4 pt-4 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "300ms" }}>
              <Button
                onClick={scrollToForm}
                className="btn-precision h-12 rounded-none bg-white text-[#0a0a0a] hover:bg-[#f8f8f8] px-8 text-sm uppercase border border-[#0a0a0a]/20 shadow-[0_4px_16px_rgba(0,0,0,0.04)] font-normal"
              >
                Request Quote
              </Button>
            </div>

            {/* Trust points */}
            <ul className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[#0a0a0a]/8 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "400ms" }}>
              {[
                { title: "Same-day service", copy: "Urgent response available" },
                { title: "Fixed pricing", copy: "Transparent, no surprises" },
                { title: "12-month guarantee", copy: "Workmanship warranty" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-left">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-[#0a0a0a]/40" aria-hidden />
                  <div>
                    <p className="text-xs font-light uppercase tracking-[0.1em] text-[#0a0a0a] mb-1">{item.title}</p>
                    <p className="text-xs text-[#1a1a1a] font-extralight leading-relaxed">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <div className={`relative w-full flex items-center justify-center ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "500ms" }}>
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center p-8 bg-white/90 border border-[#0a0a0a]/10 rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/logo.png"
                  alt="VORAC Logo"
                  className="object-contain max-w-full max-h-full"
                  priority
                  width={400}
                  height={400}
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 350px, 300px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
