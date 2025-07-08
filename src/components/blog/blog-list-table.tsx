"use client";

import { useState, useEffect, useMemo, use } from "react";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Blog, BlogList, BlogListResponse } from "@/types/blog";
import { getCloudinaryUrl } from "@/utils/getCloudinaryUrl";
import BlogForm from "./blog-form";

export type BlogListProps = {
  blogs?: BlogList[];
};

export default function BlogListTable({ blogs }: BlogListProps) {
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const queryClient = useQueryClient();
  const blogss = Array.isArray(blogs) && blogs.length > 0 ? blogs : [];

  const columns = useMemo<ColumnDef<BlogList>[]>(
    () => [
      {
        accessorKey: "image",
        header: () => <div className="whitespace-nowrap">Blog Image</div>,
        cell: ({ row }) => {
          const blog = row.original;
          const imageUrl = getCloudinaryUrl(blog?.image);
          return (
            <div className="flex items-center gap-3 text-[#4D4D4D] text-nowrap">
              <div>
                <Image
                  src={imageUrl}
                  alt={blog?.title || "Blog Image"}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "title",
        header: () => <div className="whitespace-nowrap">Title</div>,
        cell: ({ row }) => {
          const blog = row.original;
          return (
            <div className="flex items-center gap-3 text-[#4D4D4D] text-nowrap">
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-sm">{blog?.title}</p>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: () => <div className="whitespace-nowrap">Category</div>,
        cell: ({ row }) => {
          const blog = row.original;
          return (
            <div className="flex items-center gap-3 text-[#4D4D4D] text-nowrap">
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-sm">{blog?.category?.name}</p>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: () => <div className="whitespace-nowrap">Created At</div>,
        cell: ({ row }) => {
          const blog = row.original;
          const dateOnly = blog.created_at?.split("T")[0] ?? "";
          return (
            <div className="flex items-center gap-3 text-[#4D4D4D] text-nowrap">
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-sm">{dateOnly}</p>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "views",
        header: () => <div className="whitespace-nowrap">Views</div>,
        cell: ({ row }) => {
          const blog = row.original;
          return (
            <div className="flex items-center gap-3 text-[#4D4D4D] text-nowrap">
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-sm">{blog?.view_count}</p>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "actions",
        header: () => <div className="text-left">Action</div>,
        size: 100,
        id: "actions",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link
                    href={`/blog/${data.slug}`}
                    className="flex items-center cursor-pointer"
                  >
                    View Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
                  <div onClick={(e) => e.stopPropagation()}>
                    <BlogForm
                      key={`blog-form-${data.id}-${data.title}-${
                        data.created_at || Date.now()
                      }`}
                      buttonText="Edit"
                      blog={data as BlogList}
                      blogSlug={data.slug}
                      borderStyle={"text-black p-0 hover:none font-normal h-6"}
                      onSuccess={handleUpdateSuccess}
                    />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );
  const table = useReactTable({
    data: blogss,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const isNoData = blogss.length === 0;

  const handleUpdateSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["blogss"],
    });
  };

  return (
    <div>
      <div className="w-[950px] min-w-full overflow-x-auto">
        <TooltipProvider>
          <div className="px-2">
            <Card className="w-full">
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader className="bg-primary-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead key={header.id}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {isNoData ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="text-center h-44"
                        >
                          No results found
                        </TableCell>
                      </TableRow>
                    ) : (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
