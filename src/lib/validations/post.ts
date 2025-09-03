import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .min(50, "Content must be at least 50 characters"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .min(10, "Excerpt must be at least 10 characters")
    .max(200, "Excerpt must be less than 200 characters"),
  categoryId: z
    .number()
    .min(1, "Category is required"),
  tags: z
    .array(z.number())
    .min(1, "At least one tag is required")
    .max(5, "Maximum 5 tags allowed"),
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostFormData = z.infer<typeof createPostSchema>;
export type UpdatePostFormData = z.infer<typeof updatePostSchema>;
