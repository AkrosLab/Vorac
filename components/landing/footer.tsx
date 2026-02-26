import Link from "next/link";
import { VoracLogo } from "@/components/vorac-logo";
import { Mail } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="border-t border-[#0a0a0a]/[0.08] bg-white py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          <div className="md:col-span-2 space-y-6">
            <VoracLogo />
            <p className="text-[#1a1a1a] max-w-md leading-relaxed text-sm sm:text-base font-light tracking-[0.02em]">
              Premium plumbing and carpentry services across London. Qualified, insured, and guaranteed workmanship for discerning homeowners and landlords.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-light uppercase tracking-[0.24em] text-[#1a1a1a]/80">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@vorac.co.uk"
                  className="flex items-center gap-3 text-[#0a0a0a] font-light tracking-[0.02em] hover:opacity-80 transition-opacity group"
                >
                  <span className="flex h-10 w-10 items-center justify-center border border-[#0a0a0a]/[0.12] group-hover:border-[#0a0a0a]/[0.2] transition-colors">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>info@vorac.co.uk</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-light uppercase tracking-[0.24em] text-[#1a1a1a]/80">
              Opening Hours
            </h3>
            <div className="space-y-0">
              <div className="flex justify-between py-3 border-b border-[#0a0a0a]/[0.06] text-sm font-light text-[#0a0a0a]">
                <span>Mon – Fri</span>
                <span className="text-[#1a1a1a]">8am – 6pm</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#0a0a0a]/[0.06] text-sm font-light text-[#0a0a0a]">
                <span>Saturday</span>
                <span className="text-[#1a1a1a]">9am – 4pm</span>
              </div>
              <div className="flex justify-between py-3 text-sm font-light text-[#0a0a0a]">
                <span>Sunday</span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#1a1a1a]/80 border border-[#0a0a0a]/[0.08] px-2 py-1">
                  Emergency only
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#0a0a0a]/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-light tracking-[0.06em] text-[#1a1a1a]">
          <p>&copy; {new Date().getFullYear()} VORAC. Built for excellence.</p>
          <div className="flex gap-8">
            <Link href="/policy/privacy" className="hover:text-[#0a0a0a] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-2 rounded-sm">Privacy</Link>
            <Link href="/policy/terms" className="hover:text-[#0a0a0a] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-2 rounded-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
