export const runtime = "edge";
// export const runtime = "nodejs";
// import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import { BlogDetailPost } from "@/types/blog";
import { getCloudinaryUrl } from "@/utils/getCloudinaryUrl";

interface BlogDetailSlugProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getBlogDetail(slug: string): Promise<BlogDetailPost> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/${slug}/`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const result = await res.json();
  return result as BlogDetailPost;
}

const BlogDetailSlugPage = async ({ params }: BlogDetailSlugProps) => {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const item = await getBlogDetail(slugPath);
  const imageUrl = getCloudinaryUrl(item.image);
  // const DOMPurifyInstance =
  //   typeof window !== "undefined"
  //     ? createDOMPurify(window)
  //     : { sanitize: (val: string) => val };

  // Once the data is available, render the blog details
  return (
    <div className="flex flex-col items-center px-4 mt-24">
      <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          {item.title}
        </h1>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={item.title}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg mt-4"
            width={800}
            height={600}
          />
        )}

        <div className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 dark:text-white leading-relaxed">
          {/* <div
            className="prose prose-lg"
            dangerouslySetInnerHTML={{
              __html: DOMPurifyInstance.sanitize(addPaddingToList(item.body)),
            }}
          /> */}
          {item.body}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailSlugPage;
