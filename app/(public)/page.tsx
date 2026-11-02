export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="mx-auto max-w-xl space-y-4">
        <span className="border-border bg-muted text-muted-foreground inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs">
          Phase 1: Foundation Active
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Manthan&apos;s Portfolio
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Foundation setup complete. Design tokens, typography, dark/light
          theme, and layout shell are functioning. Public pages and content will
          be built in Phase 2.
        </p>
      </div>
    </div>
  );
}
