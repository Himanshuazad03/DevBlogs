import { z } from "zod";

export const postStatusEnum = ["DRAFT", "REVIEW", "PUBLISHED", "SCHEDULED"];

export const postBaseSchema = z.object({
  title: z
    .string()
    .min(4, "Title must be at least 4 characters")
    .max(120, "Title must be at most 120 characters"),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .max(50000, "Content is too long"),
  coverImage: z
    .string()
    .url("Cover image must be a valid URL")
    .optional()
    .or(z.literal("")),
  tags: z
    .array(z.string().min(1).max(30))
    .max(10, "You can add up to 10 tags")
    .optional(),
  scheduledAt: z
    .string()
    .datetime()
    .optional()
    .or(z.literal("")),
});

export const createPostSchema = postBaseSchema.extend({
  status: z.enum(["DRAFT", "REVIEW"]).default("DRAFT"),
});

export const updatePostSchema = postBaseSchema.extend({
  id: z.string().cuid(),
  status: z.enum(postStatusEnum).optional(),
});

