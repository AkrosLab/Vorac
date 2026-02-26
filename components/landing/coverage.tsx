"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { areas, coveredPostcodes } from "@/lib/data";
import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

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
    <section id="coverage" className="py-20 sm:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto max-w-3xl text-center mb-14 ${mounted ? "reveal-on-scroll" : ""}`}>
          <h2 className="heading-precision text-3xl sm:text-4xl font-extralight tracking-[0.16em] text-[#0a0a0a] uppercase mb-5">
            Coverage Areas
          </h2>
          <p className="text-sm text-[#1a1a1a] font-light leading-relaxed tracking-[0.02em]">
            Serving the whole of London and surrounding areas.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
          <div>
            <h3 className="text-sm font-light text-[#0a0a0a] mb-6 border-l border-[#0a0a0a]/[0.2] pl-4 uppercase tracking-[0.14em]">Areas We Cover</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {areas.map((area) => (
                <div key={area} className="flex items-center gap-2 text-[#1a1a1a] text-sm font-light group cursor-default">
                  <span className="h-px w-3 bg-[#0a0a0a]/[0.2] group-hover:bg-[#0a0a0a]/[0.4] transition-colors" aria-hidden />
                  <span className="font-extralight tracking-[0.02em] group-hover:text-[#0a0a0a] transition-colors">{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border border-[#0a0a0a]/[0.08] bg-white">
            <h3 className="text-sm font-light text-[#0a0a0a] mb-3 tracking-[0.12em] uppercase">Not sure?</h3>
            <p className="text-sm text-[#1a1a1a] mb-6 font-extralight tracking-[0.02em]">Enter your postcode to check if we service your area.</p>
            
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
                  className="h-12 rounded-none bg-white border border-[#0a0a0a]/[0.12] text-[#0a0a0a] placeholder:text-[#1a1a1a]/50 font-light"
                  />
                  <Button
                    onClick={checkPostcode}
                    type="button"
                    size="lg"
                    className="uppercase tracking-[0.1em] border-[#0a0a0a]/12 hover:border-[#0a0a0a]/20 bg-white text-[#0a0a0a] hover:bg-white h-12 px-6"
                  >
                    Check
                  </Button>
                </div>
              </div>
              
              {result && (
                <div
                  className={`flex items-start gap-4 p-5 border bg-white border-[#0a0a0a]/[0.08] animate-in zoom-in-95 duration-200`}
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
