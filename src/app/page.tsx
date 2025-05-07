export const runtime = "nodejs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";
import { CiLinkedin, CiInstagram, CiFacebook, CiYoutube } from "react-icons/ci";
import Link from "next/link";
import { getPopularBlogList, getBlogList } from "@/lib/blog-api";
import { Blog } from "@/types/blog";
import BlogCard from "@/components/BlogCard";
import PopularBlogCard from "@/components/PopularBlogCard";
import * as React from "react";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default async function HomePage() {
  const response = await getBlogList();
  const blogs = response.results.slice(0, 4);
  const data = await getPopularBlogList();
  const populars = data;

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
        {/* <input
          type="text"
          placeholder="Search..."
          className="border rounded-full px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
      </div>
      <Separator className="mt-4 sm:w-full md:w-[80%] lg:w-[80%]" />

      <div className="flex flex-col lg:flex-row mt-8 gap-8 w-full sm:w-[90%] md:w-[80%]">
        {/* 70% Width Blog */}
        <div className="w-full lg:w-[70%]">
          <div className="flex flex-col gap-2">
            {/* Use the BlogCard Component here */}
            <BlogCard blog={blogs[0]} />
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
                        <Image
                          src={item.image}
                          alt={`Gallery Image ${index + 1}`}
                          className="w-full h-[300px] object-cover rounded-lg"
                          width={600}
                          height={400}
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
              {populars.slice(0, 4).map((item: Blog) => (
                <PopularBlogCard blog={item} key={item.slug} />
              ))}
            </div>
          </div>

          <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-6">
            {/* About Me Section */}
            <img
              className="w-full h-[350px] object-cover"
              src="/arpanakoju.jpg"
              alt="About Me"
              width={500}
              height={500}
            />
            <div className="p-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                About Me
              </h3>
              <p className="text-gray-600 text-justify dark:text-gray-300 mt-2">
                I’m Arpana, a tourism graduate, female trekking guide and
                passionate traveler. My journey into the world of travel started
                with my love for exploring new place, understanding diverse
                cultures, and experiencing the beauty of nature firsthand. Over
                the years, I’ve had the opportunity to trek through breathtaking
                landscapes, interact with local communities, and witnessing the
                transformative power of travel.
              </p>
              <p className="text-gray-600 text-justify dark:text-gray-300 mt-2">
                This page is my space to share those experiences with you.
                Whether you’re an adventure seeker looking for trekking routes,
                a cultural enthusiast eager to learn about Nepal’s rich cultural
                heritage, or a traveler searching for practical guides and
                travel tips, I hope you’ll find help here.
              </p>
              <p className="text-gray-600 text-justify dark:text-gray-300 mt-2">
                Join me on this journey as I document my travels, share personal
                stories, and provide tips to help you make the most of your
                adventures. Let’s explore together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
