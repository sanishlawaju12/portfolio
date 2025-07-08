import * as z from "zod";

// Reusable category schema
export const CategorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
});

export const TagSchema = z.object({
  name: z.string().nonempty("Tag is required.")
})

// Main blog payload schema
export const BlogSchema = z.object({
  title: z.string().nonempty("Title is required"),
  excerpt: z.string().nonempty("Excerpt is required"),
  body: z.string().optional(),

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
  tags: TagSchema,

  // image: z
  // .union([z.string(), z.instanceof(File)])
  // .refine((val) => {
  //   if (typeof val === "string") return true;
  //   return ["image/jpeg", "image/png", "image/bmp", "image/tiff"].includes(val.type);
  // }, { message: "Only image files are allowed" }),

  // tags: z.array(z.object({ name: z.string().optional() })).optional(),  
});
