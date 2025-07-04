import * as z from "zod";

// Reusable category schema
export const CategorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
});

// Main blog payload schema
export const BlogSchema = z.object({
  excerpt: z.string().nonempty("Excerpt is required"),

  title: z.string().nonempty("Title is required"),

  scheduled_for: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "scheduled_for must be a valid ISO date string",
    }),

  deadline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "deadline must be a valid ISO date string",
    }),

  status: z.enum(
    ["Draft", "Pending", "Denied", "Published", "Scheduled", "Expired"] as const,
  ),

  category: CategorySchema,
});
