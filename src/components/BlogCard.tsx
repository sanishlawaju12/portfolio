"use client";
import { Button } from "@/components/ui/button";
import { Blog } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { getCloudinaryUrl } from "@/utils/getCloudinaryUrl";

interface BlogCardProps {
  blog?: Blog;
  title?: string;
  body?: string;
  views?: number;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const imageUrl = getCloudinaryUrl(blog?.image);
  return (
    <div className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
      <Image
        priority
        className="w-full sm:w-40 h-40 object-cover"
        src={imageUrl}
        alt=""
        width={800}
        height={600}
      />
      <div className="p-4 flex-1">
        <Link href={`/blog/${blog?.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {blog?.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mt-2">{blog?.excerpt}</p>
        <div className="mt-4">
          <Link
            href={`/blog/${blog?.slug}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
