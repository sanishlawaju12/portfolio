import * as z from "zod"
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

// Reusable category schema
export const CategorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
});

export const TagsSchema = z.object({
  name: z.string().nonempty("Tags name is required"),
})

export const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .pdf formats are supported."
    ),
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

  tags: TagsSchema,

  image: fileSchema,

  body: z.string().optional()
});
