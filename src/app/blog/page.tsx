export const runtime = "nodejs";
import { Separator } from "@/components/ui/separator";
import BlogPageCard from "@/components/BlogPageCard";
// import Link from "next/link";
import PopularBlogCard from "@/components/PopularBlogCard";
// import { Badge } from "@/components/ui/badge";

async function fetchBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

async function fetchPopularBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/popular`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch popular blog");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching popular blogs:", error);
    return [];
  }
}

// async function fetchTags() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/blog-tag/`
//     );
//     if (!res.ok) {
//       throw new Error("Failed to fetch blog tags");
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching tags:", error);
//     return [];
//   }
// }

// async function fetchCategories() {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/blog-category/`
//     );
//     if (!res.ok) {
//       throw new Error("Failed to fetch blog categories");
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

export default async function BlogPage() {
  const blogs = await fetchBlogs();
  const popularBlogs = await fetchPopularBlogs();
  // const tags = await fetchTags();
  // const categories = await fetchCategories();

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
            {blogs.map(
              (blog: {
                id: number;
                slug: string;
                title: string;
                excerpt: string;
                image: string;
              }) => (
                <BlogPageCard
                  key={blog.slug}
                  slug={blog.slug}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                />
              )
            )}
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
              {popularBlogs.map(
                (popular_blogs: {
                  slug: string;
                  title: string;
                  image: string;
                }) => (
                  <PopularBlogCard
                    key={popular_blogs.slug}
                    slug={popular_blogs.slug}
                    title={popular_blogs.title}
                    image={popular_blogs.image}
                  />
                )
              )}
            </div>
          </div>

          {/*}
          <div className="flex flex-col mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.length > 0 ? (
                  categories.map(
                    (category: { id: number; name: string; slug: string }) => (
                      <li key={category.id}>
                        <Link
                          href={`/blog/category/${category.slug}`}
                          className="text-blue-600 hover:underline"
                        >
                          {category.name}
                        </Link>
                      </li>
                    )
                  )
                ) : (
                  <span className="text-gray-500 text-sm">
                    No tags available
                  </span>
                )}
              </ul>
            </div>
          </div>

          <div className="flex flex-col mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 overflow-x-auto p-2">
                {tags.length > 0 ? (
                  tags.map(
                    (tag: { id: number; name: string; slug: string }) => (
                      <Badge
                        key={tag.id}
                        className="text-blue-600 bg-blue-100 px-3 py-1 text-sm font-semibold cursor-pointer rounded-full hover:bg-blue-200 transition"
                      >
                        #{tag.name}
                      </Badge>
                    )
                  )
                ) : (
                  <span className="text-gray-500 text-sm">
                    No tags available
                  </span>
                )}
              </div>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
