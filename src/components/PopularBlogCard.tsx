import { Blog } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { getCloudinaryUrl } from "@/utils/getCloudinaryUrl";

interface PopularBlogCardProps {
  blog: Blog;
}

export default function PopularBlogCard({ blog }: PopularBlogCardProps) {
  const imageUrl = getCloudinaryUrl(blog.image);
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${blog.slug}`}>
        <Image
          src={imageUrl}
          alt={blog.title}
          className="w-full h-16 object-cover transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={200}
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
          <h3 className="text-white text-lg font-semibold truncate">
            {blog.title}
          </h3>
        </div>
      </Link>
    </div>
  );
}
