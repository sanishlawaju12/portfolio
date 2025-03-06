import Link from "next/link";
import Image from "next/image";

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
    <Image
      className="w-full h-[200px] sm:h-[200px] md:h-[300px] object-cover"
      src={image}
      alt={title}
      width={800}
      height={600}
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
  </div>
);

export default BlogPageCard;
