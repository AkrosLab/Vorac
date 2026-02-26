"use client";

import { Button } from "@/components/ui/button";
import { openVoracQuoteModal } from "@/components/landing/quote-form";

interface ServiceCTAsProps {
  slug: string;
  serviceName?: string;
  variant?: "hero" | "card";
}

export function ServiceCTAs({ slug, variant = "hero" }: ServiceCTAsProps) {
  if (variant === "card") {
    return (
      <Button
        size="lg"
        variant="secondary"
        className="uppercase tracking-[0.12em] border-[#0a0a0a]/12 hover:border-[#0a0a0a]/20 bg-white text-[#0a0a0a] hover:bg-zinc-50"
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
        variant="secondary"
        className="uppercase tracking-[0.12em] border-[#0a0a0a]/12 hover:border-[#0a0a0a]/20 bg-white text-[#0a0a0a] hover:bg-zinc-50"
        onClick={() => openVoracQuoteModal({ service: slug })}
      >
        Request a Quote
      </Button>
    </div>
  );
}

