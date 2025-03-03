import Link from "next/link";
import { Heart, MessageCircle, Share2 } from "lucide-react";

const BlogPageCard = ({
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
  <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
    {/* Image Section */}
    <img
      className="w-full h-[200px] sm:h-[200px] md:h-[300px] object-cover"
      src={image}
      alt={title}
    />

    {/* Content Section */}
    <div className="p-4">
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

    {/* Buttons Section */}
    <div className="flex gap-4 p-4">
      <button className="text-red-500 flex items-center gap-1">
        <Heart /> <span>Like</span>
      </button>
      <button className="text-green-500 flex items-center gap-1">
        <MessageCircle /> <span>Comment</span>
      </button>
      <button className="text-blue-500 flex items-center gap-1">
        <Share2 /> <span>Share</span>
      </button>
    </div>
  </div>
);

export default BlogPageCard;
