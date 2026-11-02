import type { Metadata } from "next";
import { Mail, MapPin, Send } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { getSiteConfig } from "@/services/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Manthan for Full Stack and AI Developer roles, freelance projects, or collaborations.",
};

export default async function ContactPage() {
  const site = await getSiteConfig();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <FadeIn className="border-border space-y-4 border-b pb-8">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Get in Touch
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact Me
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Have an open role, project inquiry, or just want to say hi? Send a
          message.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_320px]">
        {/* Contact Form UI (Submit handling in Phase 6 per PRD) */}
        <FadeIn
          delay={0.1}
          className="border-border bg-card rounded-xl border p-6 sm:p-8"
        >
          <form className="space-y-4">
            {/* Honeypot field for spam bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website-url">Website</label>
              <input
                type="text"
                id="website-url"
                name="website_url"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-foreground text-xs font-medium"
              >
                Your Name <span className="text-brand">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-brand focus:ring-ring w-full rounded-md border px-3 py-2 text-sm transition-colors outline-none focus:ring-1"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-foreground text-xs font-medium"
              >
                Your Email <span className="text-brand">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="jane@example.com"
                className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-brand focus:ring-ring w-full rounded-md border px-3 py-2 text-sm transition-colors outline-none focus:ring-1"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="text-foreground text-xs font-medium"
              >
                Subject <span className="text-brand">*</span>
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="Project inquiry / Opportunity"
                className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-brand focus:ring-ring w-full rounded-md border px-3 py-2 text-sm transition-colors outline-none focus:ring-1"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="body"
                className="text-foreground text-xs font-medium"
              >
                Message <span className="text-brand">*</span>
              </label>
              <textarea
                id="body"
                name="body"
                required
                rows={5}
                placeholder="Share project goals, timeline, or details about your team..."
                className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-brand focus:ring-ring w-full resize-none rounded-md border px-3 py-2 text-sm transition-colors outline-none focus:ring-1"
              />
            </div>

            <div className="pt-2">
              <Button
                type="button"
                size="lg"
                className="bg-brand text-brand-foreground hover:bg-brand/90 w-full font-medium sm:w-auto"
              >
                <Send className="mr-2 size-4" />
                Send Message (Form Active in Phase 6)
              </Button>
            </div>
          </form>
        </FadeIn>

        {/* Direct Links Sidebar */}
        <FadeIn delay={0.2} className="space-y-6">
          <div className="border-border bg-card space-y-6 rounded-xl border p-6">
            <h2 className="text-foreground text-base font-semibold">
              Direct Channels
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Mail className="text-brand mt-0.5 size-4 shrink-0" />
                <div>
                  <span className="text-foreground block font-medium">
                    Email
                  </span>
                  <span className="text-muted-foreground font-mono text-xs break-all">
                    {site.socials.email}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GithubIcon className="text-brand mt-0.5 size-4 shrink-0" />
                <div>
                  <span className="text-foreground block font-medium">
                    GitHub
                  </span>
                  <span className="text-muted-foreground font-mono text-xs break-all">
                    {site.socials.github}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LinkedinIcon className="text-brand mt-0.5 size-4 shrink-0" />
                <div>
                  <span className="text-foreground block font-medium">
                    LinkedIn
                  </span>
                  <span className="text-muted-foreground font-mono text-xs break-all">
                    {site.socials.linkedin}
                  </span>
                </div>
              </div>

              <div className="border-border flex items-start gap-3 border-t pt-4">
                <MapPin className="text-brand mt-0.5 size-4 shrink-0" />
                <div>
                  <span className="text-foreground block font-medium">
                    Location
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {site.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
