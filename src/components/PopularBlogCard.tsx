import Link from "next/link";

const PopularBlogCard = ({
  slug,
  title,
  image,
}: {
  slug: string;
  title: string;
  image: string;
}) => {
  const imageUrl = image.startsWith("/media")
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${image}`
    : image;
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${slug}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-16 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60">
          <h3 className="text-white text-lg font-semibold truncate">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default PopularBlogCard;
