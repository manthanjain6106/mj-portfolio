import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, ShieldCheck } from "lucide-react";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Admin Login | Manthan",
  robots: {
    index: false,
    follow: false,
  },
};

interface LoginPageProps {
  readonly searchParams: Promise<{
    error?: string;
    callbackUrl?: string;
  }>;
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error, callbackUrl } = await searchParams;
  const isAccessDenied = error === "AccessDenied";

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="border-border bg-card w-full max-w-sm space-y-8 rounded-xl border p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <div className="border-border bg-muted text-brand mx-auto inline-flex size-12 items-center justify-center rounded-full border">
            <ShieldCheck className="size-6" />
          </div>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Admin Portal
          </h1>
          <p className="text-muted-foreground text-xs">
            Sign in with your authorized GitHub administrator account.
          </p>
        </div>

        {isAccessDenied && (
          <div className="border-destructive/40 bg-destructive/10 text-destructive flex items-start gap-2.5 rounded-lg border p-3 text-xs">
            <ShieldAlert className="mt-0.5 size-4 shrink-0" />
            <div>
              <span className="block font-semibold">Access Denied</span>
              Your GitHub account email does not match the configured
              administrator email.
            </div>
          </div>
        )}

        <form
          action={async () => {
            "use server";
            await signIn("github", {
              redirectTo: callbackUrl || "/admin",
            });
          }}
          className="space-y-4"
        >
          <Button
            type="submit"
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90 w-full font-medium"
          >
            <GithubIcon className="mr-2 size-4" />
            Sign in with GitHub
          </Button>
        </form>

        <div className="border-border/80 border-t pt-4 text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs transition-colors"
          >
            <ArrowLeft className="mr-1.5 size-3" />
            Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
