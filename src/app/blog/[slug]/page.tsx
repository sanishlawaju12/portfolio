"use client";
export const runtime = 'edge';
// export const runtime = "nodejs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getCloudinaryUrl } from "@/utils/getCloudinaryUrl";
import ReactMarkdown from "react-markdown";

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
      return null; // If the blog is not found, return null
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

  // If no blog data is available, return nothing (i.e., don't render anything)
  if (!blogData) {
    return null;
  }

  const imageUrl = getCloudinaryUrl(blogData.image);

  // Once the data is available, render the blog details
  return (
    <div className="flex flex-col items-center px-4 mt-24">
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          {blogData.title}
        </h1>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={blogData.title}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg mt-4"
            width={800}
            height={600}
          />
        )}

        <div className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 dark:text-white leading-relaxed">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="text-base/8 mb-4 text-justify">{children}</p>
              ),
              img: ({ ...props }) => (
                <img {...props} className="w-full h-[400px] rounded" />
              ),
            }}
          >
            {blogData.body}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
