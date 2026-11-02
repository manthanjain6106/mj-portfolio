export default function AdminProjectsLoading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <div className="space-y-1">
          <div className="bg-muted h-4 w-28 rounded" />
          <div className="bg-muted h-8 w-44 rounded" />
        </div>
        <div className="bg-muted h-9 w-32 rounded" />
      </div>

      <div className="border-border bg-card space-y-4 rounded-xl border p-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="border-border/50 flex items-center justify-between border-b py-2"
          >
            <div className="space-y-1">
              <div className="bg-muted h-5 w-48 rounded" />
              <div className="bg-muted h-3 w-28 rounded" />
            </div>
            <div className="bg-muted h-6 w-20 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
