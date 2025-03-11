import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),

  content: z
    .string()
    .min(10, "Description must be at least 10 characters long"),

  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
