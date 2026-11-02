import { LogOut, Shield } from "lucide-react";
import { signOut } from "@/lib/auth";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  readonly email: string;
}

export function AdminHeader({ email }: AdminHeaderProps) {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-2.5">
        <div className="bg-brand/10 text-brand flex size-8 items-center justify-center rounded-md">
          <Shield className="size-4" />
        </div>
        <div>
          <span className="text-foreground block font-mono text-xs font-semibold tracking-wider uppercase">
            Admin Shell
          </span>
          <span className="text-muted-foreground block font-mono text-[10px]">
            mj-portfolio CMS
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-muted-foreground hidden font-mono text-xs sm:inline-block">
          {email}
        </span>

        <ThemeToggle />

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <Button type="submit" variant="outline" size="sm">
            <LogOut className="mr-1.5 size-3.5" />
            Sign Out
          </Button>
        </form>
      </div>
    </header>
  );
}
