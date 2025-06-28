"use client";

import { useState, useEffect, useMemo, use } from "react";
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
import { TooltipProvider } from "@/components/ui/tooltip";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BlogList, BlogListResponse } from "@/types/blog";

export type BlogListProps = {
  blogs?: BlogList[];
  totalPageCount: number;
};

export default function BlogListTable({
  blogs,
  totalPageCount = 0,
}: BlogListProps) {
  const pageCount = blogs?.length || 0;
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") ?? "10";
  const offset = searchParams.get("offset") ?? "1";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const blogss = Array.isArray(blogs) && blogs.length > 0 ? blogs : [];

  const columns = useMemo<ColumnDef<BlogList>[]>(
    () => [
      {
        accessorKey: "blog",
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
        accessorKey: "excerpt",
        header: () => <div className="whitespace-nowrap">Excerpt</div>,
        cell: ({ row }) => {
          const blog = row.original;
          return (
            <div className="flex items-center gap-3 text-[#4D4D4D] text-nowrap">
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-sm">{blog?.excerpt}</p>
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
          return (
            <div className="flex items-center gap-3 text-[#4D4D4D] text-nowrap">
              <div>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-sm">{blog?.created_at}</p>
                </div>
              </div>
            </div>
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
