// src/app/dashboard/blogs/layout.tsx
"use client";

// import { usePathname } from "next/navigation";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const pathname = usePathname();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Blogs Management</h1>
      <div>{children}</div>
    </div>
  );
}
