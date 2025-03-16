import Link from "next/link";
import Image from "next/image";
import { getCloudinaryUrl } from "@/utils/getCloudinaryUrl";

const PopularBlogCard = ({
  slug,
  title,
  image,
}: {
  slug: string;
  title: string;
  image?: string;
}) => {
  const imageUrl = getCloudinaryUrl(image);

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/blog/${slug}`}>
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-16 object-cover transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={200}
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
          <h3 className="text-white text-lg font-semibold truncate">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default PopularBlogCard;
