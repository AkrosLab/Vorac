"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationMenu, mobileOnlyLinks } from "@/lib/navigation-data";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { openVoracQuoteModal } from "@/components/landing/quote-form";

export const LandingHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleRequestQuote = () => {
    openVoracQuoteModal();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0a0a0a]/[0.07] bg-white/98 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.25rem] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-[19px] sm:text-[21px] font-extralight tracking-[0.26em] uppercase text-[#0a0a0a] hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 focus-visible:ring-offset-2"
            aria-label="VORAC Home"
          >
            <Image
              src="/images/logo.png"
              alt="Vorac logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              priority
            />
            <span className="tracking-[0.28em]">VORAC</span>
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={handleRequestQuote}
              size="lg"
              className="uppercase tracking-[0.14em] border-[#0a0a0a]/[0.12] hover:border-[#0a0a0a]/[0.22] text-[#0a0a0a] font-light"
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu" className="border-transparent">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[380px] bg-white text-[#0a0a0a] rounded-none border-l border-[#0a0a0a]/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
                <SheetHeader>
                  <SheetTitle className="text-[#0a0a0a] font-light tracking-[0.08em] uppercase text-sm">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-0" aria-label="Mobile navigation">
                  {mobileOnlyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href || "#"}
                      className="py-3 text-sm font-light text-[#0a0a0a] tracking-[0.04em] border-b border-[#0a0a0a]/[0.06] last:border-0 hover:text-[#0a0a0a]/80 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t border-[#0a0a0a]/[0.08] pt-4 mt-2">
                    {navigationMenu.map((item) => {
                      if (item.href) {
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block py-2.5 text-sm font-light text-[#0a0a0a] tracking-[0.04em] hover:text-[#0a0a0a]/80 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      }

                      return (
                        <div key={item.label} className="py-2">
                          <div className="text-[10px] font-light uppercase tracking-[0.18em] text-[#1a1a1a]/80 mb-2">
                            {item.label}
                          </div>
                          <div className="pl-0 space-y-0">
                            {item.items?.map((subItem) => {
                              if (subItem.items) {
                                return (
                                  <div key={subItem.label} className="py-1">
                                    <div className="text-[10px] font-light uppercase tracking-[0.12em] text-[#1a1a1a]/60 mb-1">
                                      {subItem.label}
                                    </div>
                                    <div className="pl-0 space-y-0">
                                      {subItem.items.map((nestedItem) => (
                                        <Link
                                          key={nestedItem.label}
                                          href={nestedItem.href || "#"}
                                          className="block py-2 text-sm font-light text-[#0a0a0a] hover:text-[#0a0a0a]/80 transition-colors"
                                          onClick={() => setMobileMenuOpen(false)}
                                        >
                                          {nestedItem.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <Link
                                  key={subItem.label}
                                  href={subItem.href || "#"}
                                  className="block py-2 text-sm font-light text-[#0a0a0a] hover:text-[#0a0a0a]/80 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="hidden lg:flex items-center justify-center h-14 border-t border-[#0a0a0a]/[0.05]">
          <nav aria-label="Main navigation" className="w-full">
            <NavigationMenu className="relative w-full justify-center" viewport={false}>
              <NavigationMenuList className="gap-0 justify-center">
                {navigationMenu.map((item) => {
                  if (item.href) {
                    return (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuLink
                          asChild
                          className="group inline-flex h-12 w-max items-center justify-center rounded-none px-5 py-2 text-xs font-light uppercase tracking-[0.18em] text-[#0a0a0a] hover:text-[#0a0a0a] hover:bg-[#fafafa] border border-transparent hover:border-[#0a0a0a]/[0.08] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/15 focus-visible:ring-offset-0"
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger className="h-12 rounded-none bg-transparent px-5 py-2 text-xs font-light uppercase tracking-[0.18em] text-[#0a0a0a] hover:bg-[#fafafa] border border-transparent hover:border-[#0a0a0a]/[0.08] focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/15">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white border border-[#0a0a0a]/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.08)] text-[#0a0a0a] rounded-none animate-in fade-in slide-in-from-top-1 duration-200">
                        <ul className="grid w-[400px] gap-0 p-4 md:w-[520px] md:grid-cols-1">
                          {item.items?.map((subItem) => {
                            if (subItem.items) {
                              return (
                                <li key={subItem.label} className="space-y-1">
                                  <div className="px-3 py-2 text-[10px] font-light uppercase tracking-[0.2em] text-[#1a1a1a]/70 border-b border-[#0a0a0a]/[0.06] mb-2">
                                    {subItem.label}
                                  </div>
                                  <ul className="space-y-0">
                                    {subItem.items.map((nestedItem) => (
                                      <li key={nestedItem.label}>
                                        <NavigationMenuLink
                                          asChild
                                          className="block select-none rounded-none px-4 py-3 text-sm font-light leading-none text-[#0a0a0a] no-underline outline-none transition-colors hover:bg-[#fafafa] focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/15 border border-transparent hover:border-[#0a0a0a]/[0.06]"
                                        >
                                          <Link href={nestedItem.href || "#"}>
                                            {nestedItem.label}
                                          </Link>
                                        </NavigationMenuLink>
                                      </li>
                                    ))}
                                  </ul>
                                </li>
                              );
                            }

                            return (
                              <li key={subItem.label}>
                                <NavigationMenuLink
                                  asChild
                                  className="block select-none rounded-none px-4 py-3 text-sm font-light leading-none text-[#0a0a0a] no-underline outline-none transition-colors hover:bg-[#fafafa] focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/15"
                                >
                                  <Link href={subItem.href || "#"}>
                                    {subItem.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};
