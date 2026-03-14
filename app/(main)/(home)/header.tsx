"use client"

import { useState } from "react"
import { MenuIcon, ShirtIcon } from "lucide-react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pages = [
    { href: "#faq", label: "FAQ" },
    { href: "#testimonials", label: "Testimonials" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0a0a0a]/[0.07] bg-white/98 backdrop-blur-sm container mx-auto py-0 px-4 md:px-6 lg:px-8">
      {/* Desktop Menu */}
      <section className="hidden lg:flex w-full h-[4.25rem] items-center justify-between">
        <Logo />

        <NavigationMenu className="my-auto">
          <NavigationMenuList className="gap-0">
            {pages.map((page) => (
              <NavigationMenuLink
                asChild
                key={page.href}
                className="inline-flex h-12 items-center justify-center px-5 text-[11px] font-light uppercase tracking-[0.2em] text-[#0a0a0a] hover:bg-[#fafafa] border border-transparent hover:border-[#0a0a0a]/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/15 focus-visible:ring-offset-0"
              >
                <Link href={page.href} prefetch={false}>
                  {page.label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-2">
          <ThemeToggle />
        </div>
      </section>

      {/* Mobile Menu */}
      <section className="flex items-center justify-between w-full h-[4.25rem] lg:hidden">
        <Logo />

        <div className="flex gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="h-10 w-10 shrink-0 border-transparent text-[#0a0a0a] hover:bg-[#fafafa]"
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="flex w-[min(100vw,360px)] max-w-[calc(100vw-1rem)] flex-col gap-0 rounded-none border-l border-[#0a0a0a]/[0.08] bg-white shadow-[0_24px_48px_rgba(0,0,0,0.08)] pr-[max(1rem,env(safe-area-inset-right))]"
            >
              <SheetHeader className="shrink-0 pt-6 pb-2">
                <SheetTitle className="text-[#0a0a0a] font-light tracking-[0.12em] uppercase text-xs">
                  <Link href="/" prefetch={false} className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <ShirtIcon className="h-5 w-5" />
                    <span className="sr-only">Home</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="scrollbar-menu flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-4 pt-2 pl-5 pb-[env(safe-area-inset-bottom)]" aria-label="Mobile navigation">
                {pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    prefetch={false}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-[44px] items-center py-3 pl-1 text-sm font-light text-[#0a0a0a] tracking-[0.06em] border-b border-[#0a0a0a]/[0.06] last:border-0 hover:opacity-80 active:bg-[#0a0a0a]/[0.04] transition-colors"
                  >
                    {page.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <ThemeToggle />
        </div>
      </section>
    </header>
  )
}
