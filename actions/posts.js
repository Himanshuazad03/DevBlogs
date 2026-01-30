"use server";

import prisma from "../db/client";
import { requireRole, ROLE } from "../src/lib/server/auth";
import { createPostSchema, updatePostSchema } from "../lib/validation";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

function generateSlug(title) {
  const base = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  return base || `post-${Date.now()}`;
}

async function ensureUniqueSlug(title) {
  const base = generateSlug(title);
  let slug = base;
  let counter = 1;

  // Loop until a unique slug is found
  // In practice, this should be very fast due to unique index and small increments
  // and is safe to run inside a transaction if needed.
  // We keep it simple here.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing) {
      return slug;
    }
    slug = `${base}-${counter++}`;
  }
}

export async function createPostAction(rawData) {
  try {
    const user = await requireRole([ROLE.ADMIN, ROLE.AUTHOR]);
  
    const parsed = createPostSchema.safeParse({
      ...rawData,
      tags: rawData.tags
        ? rawData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    });
  
    if (!parsed.success) {
      return {
        ok: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }
  
    const data = parsed.data;
  
    const slug = await ensureUniqueSlug(data.title);
  
    const created = await prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: {
          title: data.title,
          slug,
          content: data.content,
          coverImage: data.coverImage || null,
          status: data.status,
          author: {
            connect: { id: user.id },
          },
        },
      });
  
      if (data.tags && data.tags.length) {
        const normalizedTags = await Promise.all(
          data.tags.map(async (name) => {
            const slug = generateSlug(name);
            const existing = await tx.tag.findUnique({ where: { slug } });
            if (existing) return existing;
            return tx.tag.create({
              data: {
                name,
                slug,
              },
            });
          }),
        );
  
        await tx.postTag.createMany({
          data: normalizedTags.map((tag) => ({
            postId: post.id,
            tagId: tag.id,
          })),
          skipDuplicates: true,
        });
      }
  
      return post;
    });
  
    revalidatePath("/all-posts");
    revalidatePath("/posts");
  
    return {
      ok: true,
      postId: created.id,
      slug: created.slug,
    };
  } catch (error) {
    console.error("createPostAction:", error);
    return { ok: false, message: "Failed to create post" };
  }
}

export async function updatePostAction(rawData) {
  try {
    const user = await requireRole([ROLE.ADMIN, ROLE.AUTHOR]);
  
    const parsed = updatePostSchema.safeParse({
      ...rawData,
      tags: rawData.tags
        ? rawData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    });
  
    if (!parsed.success) {
      return {
        ok: false,
        errors: parsed.error.flatten().fieldErrors,
      };
    }
  
    const data = parsed.data;
  
    const existing = await prisma.post.findUnique({
      where: { id: data.id },
      select: { id: true, authorId: true, status: true, slug: true },
    });
  
    if (!existing) {
      return { ok: false, errors: { _global: ["Post not found"] } };
    }
  
    const isOwner = existing.authorId === user.id;
    const isAdmin = user.role === ROLE.ADMIN;
  
    if (!isOwner && !isAdmin) {
      return { ok: false, errors: { _global: ["You cannot edit this post"] } };
    }
  
    const nextStatus = data.status || existing.status;
  
    const updated = await prisma.$transaction(async (tx) => {
      const post = await tx.post.update({
        where: { id: data.id },
        data: {
          title: data.title,
          content: data.content,
          coverImage: data.coverImage || null,
          status: nextStatus,
        },
      });
  
      // Reset and re-attach tags
      await tx.postTag.deleteMany({
        where: { postId: data.id },
      });
  
      if (data.tags && data.tags.length) {
        const normalizedTags = await Promise.all(
          data.tags.map(async (name) => {
            const slug = generateSlug(name);
            const existing = await tx.tag.findUnique({ where: { slug } });
            if (existing) return existing;
            return tx.tag.create({
              data: {
                name,
                slug,
              },
            });
          }),
        );
  
        await tx.postTag.createMany({
          data: normalizedTags.map((tag) => ({
            postId: post.id,
            tagId: tag.id,
          })),
          skipDuplicates: true,
        });
      }
  
      return post;
    });
  
    revalidatePath("/all-posts");
    revalidatePath("/posts");
    revalidatePath(`/posts/${existing.slug}`);
  
    return {
      ok: true,
      postId: updated.id,
      slug: updated.slug,
    };
  } catch (error) {
    console.error("updatePostAction:", error);
    return { ok: false, message: "Failed to update post" };

  }
}

export async function submitForReviewAction(postId) {
  try {
    const user = await requireRole([ROLE.ADMIN, ROLE.AUTHOR]);
  
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true, status: true },
    });
  
    if (!post) {
      return { ok: false, errors: { _global: ["Post not found"] } };
    }
  
    const isOwner = post.authorId === user.id;
    const isAdmin = user.role === ROLE.ADMIN;
  
    if (!isOwner && !isAdmin) {
      return { ok: false, errors: { _global: ["You cannot submit this post"] } };
    }
  
    if (post.status !== "DRAFT") {
      return {
        ok: false,
        errors: { _global: ["Only drafts can be submitted for review"] },
      };
    }
  
    const updated = await prisma.post.update({
      where: { id: postId },
      data: { status: "REVIEW" },
    });
  
    revalidatePath("/all-posts");
    revalidatePath("/posts");
  
    return { ok: true, postId: updated.id };
  } catch (error) {
    console.error("submitForReviewAction:", error);
    return { ok: false, message: "Failed to submit for review" };
  }
}

export async function publishPostAction({ postId, scheduledAt }) {
 try {
   const user = await requireRole([ROLE.ADMIN]);
 
   const post = await prisma.post.findUnique({
     where: { id: postId },
     select: { id: true, status: true },
   });
 
   if (!post) {
     return { ok: false, errors: { _global: ["Post not found"] } };
   }
 
   if (post.status !== "REVIEW" && post.status !== "SCHEDULED") {
     return {
       ok: false,
       errors: {
         _global: [
           "Only posts in review or scheduled posts can be published by an admin",
         ],
       },
     };
   }
 
   const publishNow = !scheduledAt;
 
   const updated = await prisma.post.update({
     where: { id: postId },
     data: {
       status: publishNow ? "PUBLISHED" : "SCHEDULED",
       scheduledAt: scheduledAt || null,
       publishedAt: publishNow ? new Date() : null,
     },
   });
 
   revalidatePath("/");
   revalidatePath("/posts");
   revalidatePath(`/posts/${postId}`);
 
   return { ok: true, postId: updated.id };
 } catch (error) {
  console.error("publishPostAction:", error);
  return { ok: false, message: "Failed to publish post" };
 }
}
