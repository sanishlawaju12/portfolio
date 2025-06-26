// src/app/dashboard/blogs/page.tsx

export default function BlogInsightsPage() {
  return (
    <div className="grid gap-6">
      <h2 className="text-lg font-semibold">Insights</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg bg-muted p-4 text-center">
          <div className="text-2xl font-bold">24</div>
          <div className="text-muted-foreground">Total Blogs</div>
        </div>
        <div className="rounded-lg bg-muted p-4 text-center">
          <div className="text-2xl font-bold">6</div>
          <div className="text-muted-foreground">Categories</div>
        </div>
        <div className="rounded-lg bg-muted p-4 text-center">
          <div className="text-2xl font-bold">11</div>
          <div className="text-muted-foreground">Tags</div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-muted p-6">
        <h3 className="text-md font-semibold mb-2">Blog Post Trends</h3>
        <p className="text-sm text-muted-foreground">
          [Add chart or graph here]
        </p>
      </div>
    </div>
  );
}
