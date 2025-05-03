"use client";
import type { Blog } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { getCloudinaryUrl } from "@/utils/getCloudinaryUrl";

interface BlogPageCardProps {
  blogs: Blog[];
}

export default function BlogPageCard({ blogs = [] }: BlogPageCardProps) {
  if (!blogs || blogs.length === 0) {
    return <p>No blogs found.</p>;
  }

  const imageUrl = getCloudinaryUrl();
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
      {blogs.map((blog) => (
        <div key={blog.slug} className="space-y-2 max-w-[500px] w-full mx-auto">
          {/* Image Section */}
          <Image
            priority
            className="w-full h-[200px] sm:h-[200px] md:h-[300px] object-cover"
            src={imageUrl}
            alt={blog.title}
            width={800}
            height={600}
          />

          {/* Content Section */}
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {blog.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {blog.excerpt}
            </p>
            <div className="mt-4">
              <Link
                href={`/blog/${blog.slug}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
