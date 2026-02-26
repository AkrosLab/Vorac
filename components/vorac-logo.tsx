import Link from "next/link";

export const VoracLogo = () => {
  return (
    <Link
      href="/"
      className="text-[20px] sm:text-[22px] font-light tracking-[0.28em] uppercase text-[#0a0a0a] hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-1"
      aria-label="VORAC Home"
    >
      VORAC
    </Link>
  );
};
