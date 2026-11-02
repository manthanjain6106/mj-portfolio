export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-12 sm:px-6 sm:py-16">
      <div className="border-border space-y-4 border-b pb-8">
        <div className="bg-muted h-3 w-32 rounded" />
        <div className="bg-muted h-10 w-72 rounded" />
        <div className="bg-muted h-5 w-96 rounded" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <div className="bg-muted h-7 w-20 rounded-full" />
          <div className="bg-muted h-7 w-20 rounded-full" />
          <div className="bg-muted h-7 w-20 rounded-full" />
        </div>
        <div className="bg-muted h-8 w-60 rounded-full" />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border-border bg-card/60 flex flex-col justify-between overflow-hidden rounded-xl border p-5"
          >
            <div className="space-y-3">
              <div className="bg-muted aspect-16/9 w-full rounded-lg" />
              <div className="bg-muted h-3 w-28 rounded" />
              <div className="bg-muted h-5 w-44 rounded" />
              <div className="bg-muted h-3 w-full rounded" />
              <div className="bg-muted h-3 w-3/4 rounded" />
            </div>
            <div className="border-border/60 mt-4 border-t pt-3">
              <div className="bg-muted h-4 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
