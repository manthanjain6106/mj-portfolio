import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <nav
          className="text-muted-foreground flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs"
          aria-label="Footer Navigation"
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-muted-foreground font-mono text-xs">
          © {currentYear} Manthan. Built with Next.js 15.
        </p>
      </div>
    </footer>
  );
}
