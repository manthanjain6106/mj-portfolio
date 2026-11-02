export default function ProjectCaseStudyLoading() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-12 sm:px-6 sm:py-16">
      <div className="border-border space-y-6 border-b pb-8">
        <div className="bg-muted h-4 w-28 rounded" />
        <div className="space-y-3">
          <div className="bg-muted h-5 w-24 rounded" />
          <div className="bg-muted h-10 w-3/4 rounded" />
          <div className="bg-muted h-5 w-full rounded" />
        </div>
        <div className="flex gap-3 pt-2">
          <div className="bg-muted h-9 w-28 rounded" />
          <div className="bg-muted h-9 w-28 rounded" />
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="border-border bg-card h-20 w-full rounded-xl border p-6" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border-border bg-card h-48 rounded-xl border p-6" />
          <div className="border-border bg-card h-48 rounded-xl border p-6" />
        </div>
      </div>
    </div>
  );
}
