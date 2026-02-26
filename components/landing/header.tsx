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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-[22px] sm:text-[24px] font-semibold tracking-[0.32em] uppercase text-black hover:text-zinc-600 transition-colors duration-200"
            aria-label="VORAC Home"
          >
            <Image
              src="/images/logo.png"
              alt="Vorac logo"
              width={38}
              height={38}
              className="h-10 w-10 object-contain"
              priority
            />
            VORAC
          </Link>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={handleRequestQuote}
              size="lg"
              className="h-11 rounded-none bg-[#e0e0e0] text-black hover:bg-[#d6d6d6] font-normal px-7 shadow-sm transition-all duration-200 active:scale-[0.98] border border-black/20"
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white text-black">
                <SheetHeader>
                  <SheetTitle className="text-black">Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile navigation">
                  {mobileOnlyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href || "#"}
                      className="text-base font-medium text-black hover:text-zinc-600 transition-colors duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t border-zinc-200 pt-4 mt-2">
                    {navigationMenu.map((item) => {
                      if (item.href) {
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block py-2 text-base font-medium text-black hover:text-zinc-600 transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        );
                      }

                      return (
                        <div key={item.label} className="py-2">
                          <div className="text-base font-semibold text-black mb-2">
                            {item.label}
                          </div>
                          <div className="pl-4 space-y-1">
                            {item.items?.map((subItem) => {
                              if (subItem.items) {
                                return (
                                  <div key={subItem.label} className="py-1">
                                    <div className="text-sm font-medium text-zinc-600 mb-1">
                                      {subItem.label}
                                    </div>
                                    <div className="pl-4 space-y-1">
                                      {subItem.items.map((nestedItem) => (
                                        <Link
                                          key={nestedItem.label}
                                          href={nestedItem.href || "#"}
                                          className="block py-1 text-sm text-black hover:text-zinc-600 transition-colors duration-200"
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
                                  className="block py-1 text-sm text-black hover:text-zinc-600 transition-colors duration-200"
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
        <div className="hidden lg:flex items-center justify-center h-14 border-t border-zinc-200">
          <nav aria-label="Main navigation" className="w-full">
            <NavigationMenu className="relative w-full justify-center" viewport={false}>
              <NavigationMenuList className="gap-2 justify-center">
                {navigationMenu.map((item) => {
                  if (item.href) {
                    return (
                      <NavigationMenuItem key={item.label}>
                        <NavigationMenuLink
                          asChild
                          className="group inline-flex h-12 w-max items-center justify-center rounded-none px-5 py-2 text-sm font-thin uppercase tracking-[0.14em] text-black hover:text-black hover:bg-zinc-100 hover:underline underline-offset-8 decoration-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 border border-transparent hover:border-black/20"
                        >
                          <Link href={item.href}>{item.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.label}>
                      <NavigationMenuTrigger className="h-12 rounded-none bg-transparent px-5 py-2 text-sm font-thin uppercase tracking-[0.14em] text-black hover:text-black hover:bg-zinc-100 hover:underline underline-offset-8 decoration-2 data-[state=open]:text-black focus-visible:ring-zinc-400 border border-transparent hover:border-black/20">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-white border border-zinc-200 shadow-2xl text-black animate-in fade-in slide-in-from-top-2 duration-200">
                        <ul className="grid w-[400px] gap-1 p-4 md:w-[520px] md:grid-cols-1">
                          {item.items?.map((subItem) => {
                            if (subItem.items) {
                              return (
                                <li key={subItem.label} className="space-y-1">
                                  <div className="px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-zinc-500 border-b border-zinc-200 mb-2">
                                    {subItem.label}
                                  </div>
                                  <ul className="space-y-0.5">
                                    {subItem.items.map((nestedItem) => (
                                      <li key={nestedItem.label}>
                                        <NavigationMenuLink
                                          asChild
                                          className="block select-none rounded-none px-4 py-3 text-base font-semibold leading-none text-black no-underline outline-none transition-all duration-150 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400 border border-transparent hover:border-black/20"
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
                                  className="block select-none rounded-xl px-4 py-3 text-base font-semibold leading-none text-black no-underline outline-none transition-all duration-150 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400"
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
