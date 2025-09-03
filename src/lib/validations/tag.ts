import { z } from "zod";

export const createTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name is required")
    .min(2, "Tag name must be at least 2 characters")
    .max(30, "Tag name must be less than 30 characters"),
});

export const updateTagSchema = z.object({
  name: z
    .string()
    .min(1, "Tag name is required")
    .min(2, "Tag name must be at least 2 characters")
    .max(30, "Tag name must be less than 30 characters"),
});

export type CreateTagFormData = z.infer<typeof createTagSchema>;
export type UpdateTagFormData = z.infer<typeof updateTagSchema>;
