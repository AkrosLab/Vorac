"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { areas, coveredPostcodes } from "@/lib/data";
import { useState, useEffect } from "react";
import { MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export const Coverage = () => {
  const [mounted, setMounted] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [result, setResult] = useState<"covered" | "unknown" | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkPostcode = () => {
    const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, "");
    const prefix = cleaned.match(/^[A-Z]{1,2}\d{1,2}/)?.[0];
    
    if (!prefix) {
      setResult("unknown");
      return;
    }

    const isCovered = coveredPostcodes.some((code) => cleaned.startsWith(code));
    setResult(isCovered ? "covered" : "unknown");
  };

  return (
    <section id="coverage" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-3xl text-center mb-16 ${mounted ? "reveal-on-scroll" : ""}`}>
          <h2 className="heading-precision text-4xl sm:text-5xl font-thin tracking-[0.16em] text-[#0a0a0a] uppercase mb-6">
            Coverage Areas
          </h2>
          <p className="text-base text-[#1a1a1a] font-light leading-relaxed">
            Serving the whole of London and surrounding areas.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
          <div>
            <h3 className="text-xl font-light text-[#0a0a0a] mb-8 border-l-2 border-[#0a0a0a]/20 pl-4 uppercase tracking-[0.12em]">Areas We Cover</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {areas.map((area) => (
                <div key={area} className="flex items-center gap-3 text-[#1a1a1a] group cursor-default">
                  <MapPin className="h-3.5 w-3.5 text-[#0a0a0a]/60 group-hover:text-[#0a0a0a] transition-colors" aria-hidden="true" />
                  <span className="text-sm font-extralight group-hover:text-[#0a0a0a] transition-colors">{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-none pearl-surface border border-[#0a0a0a]/20 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
            <h3 className="text-xl font-light text-[#0a0a0a] mb-4 tracking-[0.12em] uppercase">Not sure?</h3>
            <p className="text-sm text-[#1a1a1a] mb-8 font-extralight">Enter your postcode to check if we service your area.</p>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="postcode-check" className="text-[10px] font-light uppercase tracking-[0.12em] text-[#1a1a1a] mb-3 block">Postcode</Label>
                <div className="flex gap-3">
                  <Input
                    id="postcode-check"
                    type="text"
                    placeholder="e.g., SW1A 1AA"
                    value={postcode}
                    onChange={(e) => {
                      setPostcode(e.target.value);
                      setResult(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkPostcode();
                      }
                    }}
                    className="h-12 rounded-none bg-white border border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#1a1a1a] focus:ring-[#0a0a0a]/30 focus:border-[#0a0a0a]/30 font-light"
                  />
                  <Button 
                    onClick={checkPostcode} 
                    type="button" 
                    className="btn-precision h-12 px-8 rounded-none bg-white text-[#0a0a0a] hover:bg-[#f8f8f8] font-light shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#0a0a0a]/20 uppercase tracking-[0.08em] text-xs"
                  >
                    Check
                  </Button>
                </div>
              </div>
              
              {result && (
                <div
                  className={`flex items-start gap-4 p-5 rounded-none animate-in zoom-in-95 duration-200 border ${
                    result === "covered"
                      ? "pearl-surface border-[#0a0a0a]/20"
                      : "pearl-surface border-[#0a0a0a]/20"
                  }`}
                  role="status"
                >
                  {result === "covered" ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-[#0a0a0a] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-light text-[#0a0a0a] text-sm uppercase tracking-[0.08em]">We cover your area</p>
                        <p className="text-sm text-[#1a1a1a] mt-1 font-extralight">
                          Our team is ready to help. Book a quote online or call us today.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-[#1a1a1a] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-light text-[#0a0a0a] text-sm uppercase tracking-[0.08em]">Contact us to confirm</p>
                        <p className="text-sm text-[#1a1a1a] mt-1 font-extralight">
                          We may still be able to help. Please give us a call to discuss your requirements.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
