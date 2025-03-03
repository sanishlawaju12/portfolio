import Link from "next/link";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const BlogCard = ({
  slug,
  title,
  excerpt,
  image,
}: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}) => (
  <div className="flex flex-col sm:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
    <img className="w-full sm:w-40 h-40 object-cover" src={image} alt={title} />
    <div className="p-4 flex-1">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{excerpt}</p>
      <div className="mt-4">
        <Link
          href={`/blog/${slug}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
    {/* Button container - Horizontally on mobile, vertically on larger screens */}
    <div className="flex sm:flex-col flex-row justify-between p-4 sm:ml-auto w-full sm:w-auto">
      <button className="text-red-500 flex items-center gap-1">
        <Heart /> <span className="sm:hidden">Like</span>
      </button>
      <button className="text-green-500 flex items-center gap-1">
        <MessageCircle /> <span className="sm:hidden">Comment</span>
      </button>
      <button className="text-blue-500 flex items-center gap-1">
        <Share2 /> <span className="sm:hidden">Share</span>
      </button>
    </div>
  </div>
);

export default BlogCard;
