import Link from "next/link";
import { VoracLogo } from "@/components/vorac-logo";
import { Mail } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2 space-y-8">
            <VoracLogo />
            <p className="text-zinc-700 max-w-md leading-relaxed text-base sm:text-lg tracking-[0.01em]">
              Premium plumbing and carpentry services across London. Qualified, insured, and guaranteed workmanship for discerning homeowners and landlords.
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.26em] text-zinc-600">
              Contact
            </h3>
            <ul className="space-y-4 text-zinc-900 font-semibold tracking-[0.01em]">
              <li>
                <a
                  href="mailto:info@vorac.co.uk"
                  className="flex items-center gap-3 hover:text-zinc-600 transition-colors group"
                >
                  <div className="h-10 w-10 rounded-none bg-zinc-100 flex items-center justify-center border border-black/20 group-hover:bg-zinc-200 transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="font-normal">info@vorac.co.uk</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.26em] text-zinc-600">
              Opening Hours
            </h3>
            <div className="space-y-2 text-zinc-900 font-semibold tracking-[0.01em]">
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span>Mon - Fri</span>
                <span className="text-black font-normal">8am - 6pm</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span>Saturday</span>
                <span className="text-black font-normal">9am - 4pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="text-black font-normal text-[11px] uppercase tracking-[0.12em] bg-zinc-100 px-2.5 py-1 rounded">
                  Emergency only
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-zinc-700 font-semibold tracking-[0.01em]">
          <p>&copy; <span className="font-normal">{new Date().getFullYear()}</span> VORAC. Built for excellence.</p>
          <div className="flex gap-8">
            <Link href="/policy/privacy" className="hover:text-zinc-900 transition-colors">Privacy</Link>
            <Link href="/policy/terms" className="hover:text-zinc-900 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
