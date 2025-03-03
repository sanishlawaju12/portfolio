import { Separator } from "@/components/ui/separator";

export default function GalleryPage() {
  const Gallery = [
    {
      image: "/abc.jpg",
    },
    {
      image: "/himalhusu.jpg",
    },
    {
      image: "/hotel.jpg",
    },
    {
      image: "/jasta.jpg",
    },
    {
      image: "/map.jpg",
    },
    {
      image: "/mardisign.jpg",
    },
    {
      image: "/lonely.jpg",
    },
    {
      image: "/stone.jpg",
    },
    {
      image: "/rodho.jpg",
    },
    {
      image: "/himalhusu.jpg",
    },
  ];
  return (
    <div className="flex flex-col items-center px-4 mt-12">
      <div className="mt-12 w-full sm:w-[90%] md:w-[80%] lg:w-[80%]">
        <div className="flex gap-8">
          <span className="italic font-semibold text-[1.2rem]">Gallery</span>
        </div>
        <Separator className="my-4 w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Gallery.map((item, index) => (
            <div
              key={index}
              className="w-full h-64 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
