export default function AdminPostsLoading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6">
      <div className="border-border flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="bg-muted h-3 w-28 rounded" />
          <div className="bg-muted h-8 w-44 rounded" />
        </div>
        <div className="bg-muted h-9 w-28 rounded-md" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="bg-muted h-9 w-64 rounded-lg" />
        <div className="bg-muted h-9 w-48 rounded-md" />
      </div>

      <div className="border-border bg-card overflow-hidden rounded-xl border">
        <div className="space-y-4 p-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="bg-muted h-4 w-60 rounded" />
                <div className="bg-muted h-3 w-32 rounded" />
              </div>
              <div className="bg-muted h-6 w-20 rounded-full" />
              <div className="bg-muted h-8 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
