"use client";

import { QuoteForm } from "@/components/landing/quote-form";

/**
 * Renders only the quote modal and its event listener.
 * Use on pages that need "Request a Quote" to open the modal but don't show the full quote section (e.g. service pages).
 */
export function QuoteModalOnly() {
  return <QuoteForm showSection={false} />;
}
