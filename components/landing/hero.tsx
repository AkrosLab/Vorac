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
    <section className="relative overflow-hidden pt-32 pb-28 sm:pt-40 sm:pb-36" aria-label="Hero">
      <div className="absolute inset-0">
        <Image
          src="/images/background image.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[#fafafa]/85" />
      </div>

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid gap-24 lg:grid-cols-[1.12fr_0.88fr] items-center min-h-[60vh] lg:min-h-0">
          <div className="max-w-2xl space-y-8">
            <div className={`space-y-4 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
              <h1 className="text-[42px] sm:text-[60px] lg:text-[76px] xl:text-[84px] font-extralight tracking-[0.22em] text-[#0a0a0a] leading-[1] uppercase">
                VORAC
              </h1>
              <div className="h-px w-16 bg-[#0a0a0a]/[0.14]" aria-hidden />
            </div>

            <p className={`text-[15px] sm:text-[17px] leading-[1.65] text-[#1a1a1a] font-light max-w-xl tracking-[0.02em] ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "200ms" }}>
              Precision engineering and meticulous construction services for London&apos;s most discerning properties. Where attention to detail meets measured excellence.
            </p>

            <div className={`flex flex-col sm:flex-row items-start gap-4 pt-1 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "300ms" }}>
              <Button
                onClick={scrollToForm}
                size="lg"
                className="uppercase tracking-[0.16em] text-[#0a0a0a] border-[#0a0a0a]/[0.12] hover:border-[#0a0a0a]/[0.22] hover:bg-white min-w-[180px]"
              >
                Request Quote
              </Button>
            </div>

            <ul className={`grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-12 border-t border-[#0a0a0a]/[0.06] ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "400ms" }}>
              {[
                { title: "Same-day service", copy: "Urgent response available" },
                { title: "Fixed pricing", copy: "Transparent, no surprises" },
                { title: "12-month guarantee", copy: "Workmanship warranty" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-left">
                  <span className="mt-1.5 h-px w-5 bg-[#0a0a0a]/[0.18]" aria-hidden />
                  <div>
                    <p className="text-[10px] font-light uppercase tracking-[0.16em] text-[#0a0a0a] mb-0.5">{item.title}</p>
                    <p className="text-[13px] text-[#1a1a1a] font-extralight leading-relaxed tracking-[0.02em]">{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={`relative w-full flex items-center justify-center ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "500ms" }}>
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center p-8 sm:p-10 border border-[#0a0a0a]/[0.08] shadow-[0_20px_56px_rgba(0,0,0,0.06)]">
                <Image
                  src="/images/logo.png"
                  alt="VORAC Logo"
                  className="object-contain max-w-full max-h-full"
                  priority
                  width={400}
                  height={400}
                  sizes="(min-width: 1280px) 360px, (min-width: 640px) 320px, 280px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
