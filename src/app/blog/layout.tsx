"use client";

import "../../../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { House, Rss, Images } from "lucide-react";
import Link from "next/link";

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {/* Navbar */}
        <div className="fixed top-4 flex items-center gap-4 p-2 rounded-full bg-gray-900 text-white shadow-lg left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            <House className="text-2xl" />
            <span>Home</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            <Rss className="text-2xl" />
            <span>Blog</span>
          </Link>
          <Link
            href="/gallery"
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            <Images className="text-2xl" />
            <span>Gallery</span>
          </Link>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full">{children}</main>
      </ThemeProvider>
    </div>
  );
}
