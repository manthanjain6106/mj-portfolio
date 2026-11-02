export default function BlogPostLoading() {
  return (
    <article className="mx-auto max-w-5xl animate-pulse px-4 py-12 sm:px-6 sm:py-16">
      <div className="bg-muted h-4 w-32 rounded" />

      <div className="mt-8 space-y-4">
        <div className="bg-muted h-3 w-40 rounded" />
        <div className="bg-muted h-12 w-3/4 rounded" />
        <div className="bg-muted h-5 w-full rounded" />
        <div className="bg-muted h-5 w-2/3 rounded" />
      </div>

      <div className="bg-muted my-8 aspect-16/9 w-full rounded-xl" />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-5/6 rounded" />
          <div className="bg-muted h-32 w-full rounded-lg" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-4/5 rounded" />
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <div className="bg-muted h-64 w-full rounded-lg" />
        </div>
      </div>
    </article>
  );
}
