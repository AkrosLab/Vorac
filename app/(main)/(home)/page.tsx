/**
 * VORAC Landing Page
 * 
 * High-converting landing page for UK home services business (Plumbing + Carpentry)
 * 
 * To run:
 * 1. Install dependencies: npm install (or bun install)
 * 2. Run dev server: npm run dev (or bun dev)
 * 3. Open http://localhost:3000
 * 
 * Features:
 * - Fully responsive, mobile-first design
 * - Accessible (ARIA labels, keyboard navigation, semantic HTML)
 * - Form validation with error handling
 * - Smooth scroll navigation
 * - Service pre-selection from service cards
 * - Postcode coverage checker
 * - Interactive FAQ accordion
 * - Booking modal
 */

"use client";

import { LandingHeader } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { Stats } from "@/components/landing/stats";
import { Trust } from "@/components/landing/trust";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Reviews } from "@/components/landing/reviews";
import { Coverage } from "@/components/landing/coverage";
import { FAQ } from "@/components/landing/faq";
import { QuoteForm } from "@/components/landing/quote-form";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-zinc-900 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400"
      >
        Skip to main content
      </a>
      <LandingHeader />
      <main id="main-content" className="pearl-bg text-[#0a0a0a]">
        <div className="space-y-28 sm:space-y-36 pb-32">
          <Hero />
          <Stats />
          <Services />
          <Trust />
          <HowItWorks />
          <Reviews />
          <Coverage />
          <FAQ />
          <QuoteForm />
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
