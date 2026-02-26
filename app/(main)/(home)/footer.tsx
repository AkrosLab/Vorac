import Link from "next/link"
import { Logo } from "@/components/logo"

export const Footer = () => {
  const links = [
    {
      label: "LINKS",
      items: [
        { href: "#faq", label: "FAQ" },
        { href: "#testimonials", label: "Testimonials" },
      ],
    },
    {
      label: "LEGAL",
      items: [
        { href: "/policy/privacy", label: "Privacy Policy" },
        { href: "/policy/terms", label: "Terms of Service" },
      ],
    },
  ]

  return (
    <footer className="border-t border-[#0a0a0a]/[0.08] mt-auto bg-white">
      <section className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row items-stretch justify-between gap-10">
          <div>
            <Logo />

            <p className="mt-4 text-xs font-light text-[#1a1a1a] tracking-[0.02em]">
              Copyright © {new Date().getFullYear()} — All rights reserved
            </p>
          </div>

          {links.map((group) => (
            <nav className="flex flex-col gap-2 items-start" key={group.label}>
              <h3 className="text-[10px] font-light uppercase tracking-[0.2em] text-[#1a1a1a]/80 mb-2">
                {group.label}
              </h3>

              {group.items.map((item) => (
                <Link
                  href={item.href}
                  prefetch={false}
                  key={item.href}
                  className="text-sm font-light text-[#0a0a0a] hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </section>
    </footer>
  )
}
