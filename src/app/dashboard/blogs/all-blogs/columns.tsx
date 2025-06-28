// src/app/dashboard/blogs/all-blogs/columns.tsx
import type { Blog } from "@/types/blog"; // your centralized Blog type

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={`px-2 py-1 text-xs rounded ${
            status === "published"
              ? "bg-green-100 text-green-800"
              : status === "draft"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div>
          {category.category ? category.category.name : "Uncategorized"}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return date.toLocaleDateString();
    },
  },
];
