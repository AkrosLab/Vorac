import Link from "next/link";

export const VoracLogo = () => {
  return (
    <Link
      href="/"
      className="text-[22px] sm:text-[24px] font-semibold tracking-[0.32em] uppercase text-black hover:text-zinc-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-sm"
      aria-label="VORAC Home"
    >
      VORAC
    </Link>
  );
};
