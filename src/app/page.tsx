import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Heart, MessageCircle, Share2 } from "lucide-react";
import { CiLinkedin, CiInstagram, CiFacebook, CiYoutube } from "react-icons/ci";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import PopularBlogCard from "@/components/PopularBlogCard";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

async function getBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/`
    );
    if (!res.ok) {
      throw new Error("Failed to get blogs");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

async function getPopularBlogs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/blogs/popular`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch popular blog");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching popular blogs:", error);
    return [];
  }
}

export default async function HomePage() {
  const blogs = await getBlogs();
  const popularBlogs = await getPopularBlogs();

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
  ];

  return (
    <div className="flex flex-col items-center px-4">
      <div className="text-center">
        <h1 className="text-[4rem] font-extrabold text-red-500">
          <span className="text-cyan-500">अर्पना</span> कोजु
        </h1>
        <div className="flex gap-3 justify-center items-center">
          <Link
            href="https://www.linkedin.com/in/arpana-koju-a90724310/"
            className="text-blue-500 text-2xl hover:scale-110 transition-transform duration-300"
          >
            <CiLinkedin />
          </Link>
          <Separator
            className="h-5 w-[1px] bg-gray-400"
            aria-orientation="vertical"
          />
          <Link
            href="https://www.instagram.com/arpanakoju/"
            className="text-red-500 text-2xl hover:scale-110 transition-transform duration-300"
          >
            <CiInstagram />
          </Link>
          <Separator
            className="h-5 w-[1px] bg-gray-400"
            aria-orientation="vertical"
          />
          <a href="/arpanacv.pdf" download="Arpana_Koju_CV.pdf">
            <Button
              className="hover:scale-110 transition-transform duration-300 rounded-full px-3"
              variant="outline"
              size="sm"
              aria-label="Download My Resume"
            >
              <small className="flex gap-1 items-center">
                <ArrowDownToLine size={16} /> My Resume
              </small>
            </Button>
          </a>
          <Separator
            className="h-5 w-[1px] bg-gray-400"
            aria-orientation="vertical"
          />
          <Link
            href="https://www.facebook.com/arpana.koju.5"
            className="text-blue-500 text-2xl hover:scale-110 transition-transform duration-300"
          >
            <CiFacebook />
          </Link>
          <Separator
            className="h-5 w-[1px] bg-gray-400"
            aria-orientation="vertical"
          />
          <Link
            href="https://www.youtube.com/@arpanakoju4765"
            className="text-red-500 text-2xl hover:scale-110 transition-transform duration-300"
          >
            <CiYoutube />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 w-full sm:w-[90%] md:w-[80%] lg:w-[80%]">
        <div className="flex gap-8">
          <span className="italic font-semibold text-[1.2rem]">
            Recent Blogs
          </span>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-full px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Separator className="mt-4 sm:w-full md:w-[80%] lg:w-[80%]" />

      <div className="flex flex-col lg:flex-row mt-8 gap-8 w-full sm:w-[90%] md:w-[80%]">
        {/* 70% Width Blog */}
        <div className="w-full lg:w-[70%]">
          <div className="flex flex-col gap-2">
            {/* Use the BlogCard Component here */}
            {blogs.map(
              (blog: {
                id: number;
                slug: string;
                title: string;
                excerpt: string;
                image: string;
              }) => (
                <BlogCard
                  key={blog.slug}
                  slug={blog.slug}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                />
              )
            )}
          </div>

          {/* Gallery Section */}
          <div className="mt-8 w-full sm:w-[90%] md:w-[80%] lg:w-full">
            <div className="flex gap-8">
              <span className="italic font-semibold text-[1.2rem]">
                Gallery(slide)
              </span>
            </div>
            <Separator className="my-4 w-full" />
            <Carousel opts={{ align: "start" }}>
              <CarouselContent>
                {Gallery.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="">
                      <Card>
                        <img
                          src={item.image}
                          alt={`Gallery Image ${index + 1}`}
                          className="w-full h-[300px] object-cover rounded-lg"
                        />
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>

        {/* 30% Width about */}
        <div className="w-full lg:w-[30%]">
          <div className="flex flex-col rounded-lg bg-white dark:bg-gray-800 shadow-xl p-6">
            <div className="flex gap-8 rounded-lg mb-2">
              <span className="italic font-semibold text-[1.2rem]">
                My Popular Blogs
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {popularBlogs.map(
                (popular_blogs: {
                  slug: string;
                  title: string;
                  image: string;
                }) => (
                  <PopularBlogCard
                    key={popular_blogs.slug}
                    slug={popular_blogs.slug}
                    title={popular_blogs.title}
                    image={popular_blogs.image}
                  />
                )
              )}
            </div>
          </div>

          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-6">
            {/* About Me Section */}
            <img
              className="w-full h-full object-cover"
              src="./arpanakoju.jpg"
              alt="About Me"
            />
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                About Me
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Traveling has always been my passion. I love exploring new
                places, experiencing different cultures, and capturing
                unforgettable moments along the way. Whether it’s trekking
                through the mountains, discovering hidden gems in a city, or
                simply enjoying a quiet sunset by the beach, every journey adds
                a new story to my life. I believe that travel is not just about
                visiting places but about embracing new perspectives and making
                meaningful connections with people around the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
