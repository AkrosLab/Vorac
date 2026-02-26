"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { faqs } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export const FAQ = () => {
  const [mounted, setMounted] = useState(false);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className={`text-center mb-16 ${mounted ? "reveal-on-scroll" : ""}`}>
            <h2 className="heading-precision text-4xl sm:text-5xl font-thin tracking-[0.16em] text-[#0a0a0a] uppercase mb-6">
              FAQ
            </h2>
            <p className="text-base text-[#1a1a1a] font-light leading-relaxed">
              Common questions about our premium services.
            </p>
          </div>
          <div className={`space-y-3 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="rounded-none border border-[#0a0a0a]/20 pearl-surface overflow-hidden transition-all duration-200 hover:border-[#0a0a0a]/30 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between text-left p-6 transition-colors hover:bg-[#f8f8f8] focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-light text-base text-[#0a0a0a] pr-8 uppercase tracking-[0.1em]">{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#0a0a0a]/70 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#0a0a0a]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-200">
                      <p className="text-sm text-[#1a1a1a] leading-relaxed font-extralight">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
