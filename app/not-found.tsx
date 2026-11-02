import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="border-border bg-muted text-brand inline-flex size-14 items-center justify-center rounded-full border">
          <Compass className="size-7" />
        </div>

        <div className="space-y-2">
          <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Error 404
          </span>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            The page you are looking for doesn&apos;t exist or may have been
            moved.
          </p>
        </div>

        <div>
          <Button
            asChild
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
