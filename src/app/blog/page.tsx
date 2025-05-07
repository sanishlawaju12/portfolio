export const runtime = "edge";
import { Separator } from "@/components/ui/separator";
// import BlogPageCard from "@/components/BlogPageCard";
import BlogCard from "@/components/BlogCard";
// import Link from "next/link";
import PopularBlogCard from "@/components/PopularBlogCard";
// import { Badge } from "@/components/ui/badge";

import { getPopularBlogList, getBlogList } from "@/lib/blog-api";
import { Blog } from "@/types/blog";

export default async function BlogPage() {
  const response = await getBlogList();
  const blogs = response.results.slice(0, 4);
  const data = await getPopularBlogList();
  const populars = data;

  return (
    <div className="flex flex-col items-center px-4 mt-12">
      {/* Navigation & Search */}
      <div className="flex items-center justify-between mt-8 w-full sm:w-[90%] md:w-[80%] lg:w-[80%]">
        <div className="flex gap-8">
          <span className="italic font-semibold text-[1.2rem]">
            Recent Blogs
          </span>
        </div>
        {/* <input
          type="text"
          placeholder="Search..."
          className="border rounded-full px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
      </div>
      <Separator className="mt-4 sm:w-full md:w-[80%] lg:w-[80%]" />

      {/* Blog Layout */}
      <div className="flex flex-col lg:flex-row mt-8 gap-8 w-full sm:w-[90%] md:w-[80%]">
        {/* Blogs Section (60%) */}
        <div className="w-full lg:w-[70%]">
          <div className="flex flex-col gap-2">
            {/* Use the BlogCard Component here */}
            <BlogCard blog={blogs[0]} />
          </div>
        </div>

        {/* Sidebar Section (30%) */}
        <div className="w-full lg:w-[30%]">
          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex p-4 gap-8 rounded-lg">
              <span className="italic font-semibold text-[1.2rem]">
                My Popular Blogs
              </span>
            </div>
            <div className="flex flex-col px-4 pb-4 gap-4">
              {populars.slice(0, 4).map((item: Blog) => (
                <PopularBlogCard blog={item} key={item.slug} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
