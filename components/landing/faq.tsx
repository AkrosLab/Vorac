"use client";

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
    <section id="faq" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className={`text-center mb-14 ${mounted ? "reveal-on-scroll" : ""}`}>
            <h2 className="heading-precision text-3xl sm:text-4xl font-extralight tracking-[0.16em] text-[#0a0a0a] uppercase mb-5">
              FAQ
            </h2>
            <p className="text-sm text-[#1a1a1a] font-light leading-relaxed tracking-[0.02em]">
              Common questions about our premium services.
            </p>
          </div>
          <div className={`space-y-px ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-[#0a0a0a]/[0.08] bg-white overflow-hidden transition-colors hover:border-[#0a0a0a]/[0.12]"
                >
                  <button
                    onClick={() => toggle(faq.id)}
                    className="flex w-full items-center justify-between text-left p-6 transition-colors hover:bg-[#fafafa] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/15 focus-visible:ring-inset border-0 rounded-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-light text-sm text-[#0a0a0a] pr-8 uppercase tracking-[0.12em]">{faq.question}</span>
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
