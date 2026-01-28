import prisma from "../../../../../db/client";
import { checkUser } from "../../../../lib/server/checkUser";
import { ROLE } from "../../../../lib/server/auth";
import { Button } from "@/components/ui/button";

import {
  submitForReviewAction,
  publishPostAction,
} from "../../../../../actions/posts.js";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    select: {
      title: true,
      coverImage: true,
      content: true,
    },
  });

  if (!post) {
    return {
      title: "Post not found | Blog Platform",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = `${baseUrl}/posts/${slug}`;

  const description =
    post.content.slice(0, 156).replace(/\s+/g, " ").trim() ||
    "Read this article on our blog platform.";

  return {
    title: `${post.title} | Blog Platform`,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  const [post, currentUser] = await Promise.all([
    prisma.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        content: true,
        coverImage: true,
        status: true,
        slug: true,
        publishedAt: true,
        createdAt: true,
        authorId: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    }),
    checkUser(),
  ]);


  const isAdmin = currentUser?.role === ROLE.ADMIN;
  const isAuthor = currentUser && currentUser.id === post?.authorId;

  const canSeeUnpublished = !!post && (isAdmin || isAuthor);

  if (!post || (!post.publishedAt && !canSeeUnpublished)) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center bg-neutral-950 px-4 py-10 px-10 text-neutral-50">
        <p className="text-sm text-neutral-400">
          Post not found or not published yet.
        </p>
      </main>
    );
  }

  const showWorkflowBar = canSeeUnpublished;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-10 text-neutral-950">
      {showWorkflowBar && (
        <section className="flex flex-col gap-3 p-4 text-xs text-neutral-200">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-neutral-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-300">
                {post.status}
              </span>
              {!post.publishedAt && (
                <span className="text-neutral-400">
                  This post is not yet public.
                </span>
              )}
            </div>
            <div>
              {(isAuthor || isAdmin) && (
                <Button>
                  <a
                    href={`/posts/${post.slug}/edit`}
                    
                  >
                    Edit post
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {(isAuthor || isAdmin) && post.status === "DRAFT" && (
              <form
                action={async (formData) => {
                  "use server";
                  const postId = formData.get("postId");
                  await submitForReviewAction(postId);
                }}
              >
                <input type="hidden" name="postId" value={post.id} />
                <button
                  type="submit"
                  className="rounded-md bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 cursor-pointer text-[11px] font-medium text-black hover:bg-white"
                >
                  Submit for review
                </button>
              </form>
            )}

            {isAdmin &&
              (post.status === "REVIEW" || post.status === "SCHEDULED") && (
                <form
                  action={async (formData) => {
                    "use server";
                    const postId = formData.get("postId");
                    const scheduledAt = formData.get("scheduledAt");
                    await publishPostAction({
                      postId,
                      scheduledAt: scheduledAt || null,
                    });
                  }}
                  className="flex flex-wrap items-center gap-2"
                >
                  <input type="hidden" name="postId" value={post.id} />
                  <label className="flex items-center gap-2 text-[11px] text-neutral-900">
                    Schedule (optional)
                    <input
                      type="datetime-local"
                      name="scheduledAt"
                      className="rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-[11px] text-neutral-100 outline-none focus:border-neutral-400"
                    />
                  </label>
                  <button
                    type="submit"
                    className="rounded-md bg-neutral-100 px-3 py-1.5 text-[11px] font-medium text-slate-800 hover:bg-slate-900 hover:text-white"
                  >
                    Publish / schedule
                  </button>
                </form>
              )}
          </div>
        </section>
      )}

      <article className="space-y-6">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Article
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            {post.author?.name && <span>By {post.author.name}</span>}
            {post.publishedAt && (
              <>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </header>

        {post.coverImage && (
          <div className="overflow-hidden rounded-xl border border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt=""
              className="h-64 w-full object-contain"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-900">
            {post.content}
          </p>
        </div>
      </article>
    </main>
  );
}
