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
        <div className={`mb-12 text-center ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "100ms" }}>
          <h2 className="section-title text-[36px] sm:text-[48px] lg:text-[60px] tracking-[0.2em] mb-4">
            Our Services
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#1a1a1a] font-light tracking-[0.02em] max-w-xl mx-auto leading-relaxed">
            Precision engineering and construction services across London
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${mounted ? "reveal-on-scroll" : ""}`} style={{ animationDelay: "200ms" }}>
          {allServices.map((service) => {
            const imageSrc = serviceImageMap[service.id] || "/images/plumbing-image.png";
            const categoryLabel = service.category === "plumbing" ? "Plumbing" : "Carpentry";

            return (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-white border border-[#0a0a0a]/[0.08] hover:border-[#0a0a0a]/[0.14] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={service.description}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block text-[10px] font-light tracking-[0.2em] uppercase text-white/90 border border-white/20 px-2.5 py-1 mb-2">
                      {categoryLabel}
                    </span>
                    <h3 className="text-xl font-light tracking-[0.1em] text-white uppercase mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/80 font-extralight tracking-[0.02em]">
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
