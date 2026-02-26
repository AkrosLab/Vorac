"use client";

import { Button } from "@/components/ui/button";
import { openVoracQuoteModal } from "@/components/landing/quote-form";

interface ServiceCTAsProps {
  slug: string;
  serviceName: string;
  variant?: "hero" | "card";
}

export function ServiceCTAs({ slug, variant = "hero" }: ServiceCTAsProps) {
  if (variant === "card") {
    return (
      <Button 
        size="lg" 
        className="h-14 rounded-none bg-[#e0e0e0] text-black hover:bg-[#d6d6d6] font-normal shadow-sm border border-black/20"
        onClick={() => openVoracQuoteModal({ service: slug })}
      >
        Get a Fast Quote
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        size="lg" 
        className="h-14 px-10 rounded-none bg-[#e0e0e0] text-black hover:bg-[#d6d6d6] font-normal text-lg shadow-sm transition-all duration-200 active:scale-[0.98] border border-black/20"
        onClick={() => openVoracQuoteModal({ service: slug })}
      >
        Request a Quote
      </Button>
    </div>
  );
}

