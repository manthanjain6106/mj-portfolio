export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="border-border animate-pulse space-y-4 border-b pb-8">
        <div className="bg-muted h-4 w-24 rounded" />
        <div className="bg-muted h-9 w-64 rounded" />
        <div className="bg-muted h-5 w-96 max-w-full rounded" />
      </div>

      <div className="mt-8 flex animate-pulse gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-muted h-7 w-20 rounded-full" />
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border-border bg-card flex animate-pulse flex-col justify-between space-y-4 rounded-xl border p-6"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="bg-muted h-4 w-16 rounded" />
                <div className="bg-muted h-4 w-6 rounded" />
              </div>
              <div className="bg-muted h-6 w-3/4 rounded" />
              <div className="bg-muted h-4 w-full rounded" />
              <div className="bg-muted h-4 w-5/6 rounded" />
            </div>
            <div className="border-border/60 space-y-2 border-t pt-4">
              <div className="flex gap-1.5">
                <div className="bg-muted h-4 w-12 rounded" />
                <div className="bg-muted h-4 w-14 rounded" />
                <div className="bg-muted h-4 w-10 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
