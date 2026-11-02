"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="border-border text-muted-foreground inline-flex size-9 items-center justify-center rounded-md border transition-colors"
        aria-label="Toggle theme"
        disabled
      >
        <span className="size-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex size-9 items-center justify-center rounded-md border transition-colors focus-visible:ring-2 focus-visible:outline-none"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Sun className="text-brand size-4" />
      ) : (
        <Moon className="text-brand size-4" />
      )}
    </button>
  );
}
