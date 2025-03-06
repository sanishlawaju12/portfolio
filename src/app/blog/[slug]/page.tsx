"use client";
export const runtime = "edge";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define the expected type for blog data
interface Blog {
  title: string;
  image?: string;
  body: string;
}

async function fetchBlogData(slug: string): Promise<Blog | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/${slug}`;
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export default function BlogDetail() {
  const params = useParams();
  const [blogData, setBlogData] = useState<Blog | null>(null);

  useEffect(() => {
    if (params?.slug) {
      fetchBlogData(params.slug as string).then(setBlogData);
    }
  }, [params?.slug]);

  if (!params?.slug || !blogData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center px-4 mt-24">
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          {blogData.title}
        </h1>

        {blogData.image && (
          <Image
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg mt-4"
          />
        )}

        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 dark:text-white leading-relaxed">
          {blogData.body}
        </p>
      </div>
    </div>
  );
}
