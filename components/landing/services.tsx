"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { services } from "@/lib/data";

export const Services = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map services to images - using original JPG images where available
  const serviceImageMap: Record<string, string> = {
    "plumbing-1": "/images/plumbing-image.png",
    "plumbing-2": "/images/boiler.png",
    "plumbing-3": "/images/bathroom installation.png",
    "plumbing-4": "/images/blocked drain.png",
    "plumbing-5": "/images/radiator showcase.PNG",
    "plumbing-6": "/images/fixing-tap.png",
    "carpentry-1": "/images/door-installation.jpg",
    "carpentry-2": "/images/skirting.png",
    "carpentry-3": "/images/kitchen installation.png",
    "carpentry-4": "/images/floor-installations.jpg",
    "carpentry-5": "/images/shelving.png",
    "carpentry-6": "/images/maintenence.png",
  };

  const allServices = [
    ...services.plumbing.map((s) => ({ ...s, category: "plumbing" as const })),
    ...services.carpentry.map((s) => ({ ...s, category: "carpentry" as const })),
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-16 text-center ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
          <h2 className="text-[48px] sm:text-[64px] lg:text-[80px] font-thin tracking-[0.28em] text-[#0a0a0a] uppercase mb-4">
            OUR SERVICES
          </h2>
          <p className="text-lg sm:text-xl text-[#1a1a1a] font-light tracking-[0.02em] max-w-2xl mx-auto">
            Precision engineering and construction services across London
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "200ms" }}>
          {allServices.map((service) => {
            const imageSrc = serviceImageMap[service.id] || "/images/plumbing-image.png";
            const categoryLabel = service.category === "plumbing" ? "PLUMBING" : "CARPENTRY";

            return (
              <div
                key={service.id}
                className="relative group overflow-hidden rounded-sm bg-white border border-[#0a0a0a]/10 hover:border-[#0a0a0a]/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={service.description}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block mb-3">
                      <span className="text-xs font-light tracking-[0.2em] uppercase text-white/90 bg-white/10 backdrop-blur-sm px-3 py-1.5 border border-white/20">
                        {categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-thin tracking-[0.1em] text-white uppercase mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/85 font-extralight">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
