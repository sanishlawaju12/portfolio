import type { Blog, BlogResponse } from "@/types/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            const errorMessage = `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        console.log("Error fetching data:", error);
        throw new Error("Failed to fetch data. Please try again later.");
    }
}

  export async function getBlogs(
    slug: string,
  ): Promise<BlogResponse> {
    const params = new URLSearchParams();

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return fetchData(
        `${BASE_URL}/api/v1/blog/categories/${slug}/posts/${queryString}`
    )
  }

export async function getBlogList(): Promise<BlogResponse> {
    return fetchData(`${BASE_URL}/api/v1/blogs/`);
}

export async function getPopularBlogList(): Promise<Blog[]> {
    return fetchData(`${BASE_URL}/api/v1/blogs/popular/`);
}