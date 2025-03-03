"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import "../../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { House, Rss, Menu, Images } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const [isLeftOpen, setLeftOpen] = useState(false);

  // Hide navbars on /blog and /gallery pages
  const shouldShowNavbar = !(
    pathname.startsWith("/blog") || pathname.startsWith("/gallery")
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {shouldShowNavbar && (
            <>
              {/* Left Sidebar Toggle Button */}
              <button
                className="fixed top-3 left-2 w-12 h-12 flex items-center justify-center 
                rounded-full bg-gray-300 text-black shadow-lg hover:scale-110 
                transition-transform duration-300"
                onClick={() => setLeftOpen(!isLeftOpen)}
              >
                <Menu />
              </button>

              <div className="flex justify-between w-full">
                {/* Left Sidebar */}
                <div
                  className={`fixed top-20 left-2 flex flex-col gap-4 transition-all duration-300 ${
                    isLeftOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10 pointer-events-none"
                  }`}
                >
                  <Link
                    href="/"
                    className="w-12 h-12 flex items-center justify-center 
                    rounded-full bg-black text-white shadow-lg hover:scale-110 
                    transition-transform duration-300 dark:bg-gray-200 dark:text-black 
                    dark:hover:bg-gray-300"
                  >
                    <House className="text-2xl" />
                  </Link>
                  <Link
                    href="/blog"
                    className="w-12 h-12 flex items-center justify-center 
                    rounded-full bg-black text-white shadow-lg hover:scale-110 
                    transition-transform duration-300 dark:bg-gray-200 dark:text-black 
                    dark:hover:bg-gray-300"
                  >
                    <Rss className="text-2xl" />
                  </Link>
                  <Link
                    href="/gallery"
                    className="w-12 h-12 flex items-center justify-center 
                    rounded-full bg-black text-white shadow-lg hover:scale-110 
                    transition-transform duration-300 dark:bg-gray-200 dark:text-black 
                    dark:hover:bg-gray-300"
                  >
                    <Images className="text-2xl" />
                  </Link>
                </div>

                {/* Right Sidebar */}
                <div className="flex gap-4 mt-3 ml-auto mr-2">
                  <Link
                    href="/"
                    className="w-12 h-12 flex items-center justify-center 
                    rounded-full bg-black text-white shadow-lg hover:scale-110 
                    transition-transform duration-300 dark:bg-gray-200 dark:text-black 
                    dark:hover:bg-gray-300"
                  >
                    <House className="text-2xl" />
                  </Link>
                  <Link
                    href="/blog"
                    className="w-12 h-12 flex items-center justify-center 
                    rounded-full bg-black text-white shadow-lg hover:scale-110 
                    transition-transform duration-300 dark:bg-gray-200 dark:text-black 
                    dark:hover:bg-gray-300"
                  >
                    <Rss className="text-2xl" />
                  </Link>
                  <Link
                    href="/gallery"
                    className="w-12 h-12 flex items-center justify-center 
                    rounded-full bg-black text-white shadow-lg hover:scale-110 
                    transition-transform duration-300 dark:bg-gray-200 dark:text-black 
                    dark:hover:bg-gray-300"
                  >
                    <Images className="text-2xl" />
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Main Content */}
          <main className="flex-1 w-full mb-10">{children}</main>
          <footer className="w-full bg-gray-900 text-white dark:bg-transparent text-center py-4">
            <p className="font-semibold italic">
              &copy; {new Date().getFullYear()} Arpana Koju | All Rights
              Reserved
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
