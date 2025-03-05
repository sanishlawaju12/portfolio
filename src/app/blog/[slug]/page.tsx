export const runtime = 'edge';
import { notFound } from "next/navigation";

// Interface to define the shape of the blog data
interface Blog {
  slug: string;
  title: string;
  image: string;
  body: string;
}

// BlogDetail Component (Server Component in App Router)
export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  // Await the params to ensure the dynamic routing works
  const { slug } = await params;

  try {
    // Fetch blog data based on the slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/${slug}/`);
    const blogData: Blog = await res.json();

    // If no blog data found, return 404-like state
    if (!blogData) {
      return notFound();
    }

    return (
      <div className="flex flex-col items-center px-4 mt-24">
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {blogData.title}
          </h1>

          <img
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-lg mt-4"
          />

          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-800 dark:text-white leading-relaxed">
            {blogData.body}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return notFound();
  }
}
