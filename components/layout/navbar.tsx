"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group text-foreground hover:text-brand inline-flex items-center gap-2 font-mono text-base font-semibold tracking-tight transition-colors"
        >
          <span>mj</span>
          <span className="text-muted-foreground group-hover:text-brand transition-colors">
            /
          </span>
          <span className="text-foreground">manthan</span>
        </Link>

        <nav
          className="hidden text-sm font-medium md:flex md:items-center md:gap-6"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-brand transition-colors ${
                  isActive ? "text-brand" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-border bg-background border-b px-4 py-4 sm:px-6 md:hidden">
          <nav
            className="flex flex-col space-y-3 text-sm font-medium"
            aria-label="Mobile Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-brand py-1 transition-colors ${
                    isActive
                      ? "text-brand font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
