"use server";

import { BlogSchema } from "@/schema/blog";
import { z } from "zod";
import { revalidatePath } from "next/cache";


export async function createBlog(
	values: z.infer<typeof BlogSchema>
) {
	try {
		const url = `${process.env.BASE_URL}/api/v1/blogs/`;

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"APP-KEY": `${process.env.API_KEY}`,
			},
			body: JSON.stringify(values),
		});
		if (!response.ok) {
			throw await response.json();
		}
		revalidatePath("/blog/");
		const result = await response.json();
		return { message: result };
	} catch (error) {
		return { error: error };
	}
}

export async function updateBlog(
  values: z.infer<typeof BlogSchema>,
  id: number
) {
  try {
  const url = `${process.env.BASE_URL}/api/v1/blogs/${id}/`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "APP-KEY": `${process.env.API_KEY}`,
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw await response.json();
  }
  revalidatePath("/blog/");
  const result = await response.json();
  return { message: result };
} catch (error) {
  return { error: error };
}
}

export async function deleteBlog(
  id: string
) {
  try {
  const url = `${process.env.BASE_URL}/api/v1/blogs/${id}/`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "APP-KEY": `${process.env.API_KEY}`,
    },
  });
  if (!response.ok) {
    throw await response.json();
  }
  revalidatePath("/blog/");
  const result = await response.json();
  return { message: result };
} catch (error) {
  return { error: error };
}
}

