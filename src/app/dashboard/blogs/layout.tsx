// src/app/dashboard/blogs/layout.tsx
"use client";

import BlogForm from "@/components/blog/blog-form";

// import { usePathname } from "next/navigation";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
      <h1 className="text-xl font-bold">Blogs Management</h1>
      <BlogForm/>
      </div>
      <div>{children}</div>
    </div>
  );
}
