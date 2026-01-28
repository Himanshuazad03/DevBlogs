import prisma from "../../../../db/client";
import Link from "next/link";

export const metadata = {
  title: "All Posts | Blog Platform",
  description: "Browse all published articles from our authors.",
};

export default async function AllPostsPage() {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      publishedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="border-b bg-white mt-10">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            All Articles
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            Read thoughtful articles written by our authors on web development,
            product design, and engineering best practices.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        {posts.length === 0 ? (
          <p className="text-sm text-slate-500">
            No posts have been published yet.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-xl border border-slate-200 bg-white transition hover:shadow-lg"
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="overflow-hidden rounded-t-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt=""
                      className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex h-full flex-col gap-3 p-6">
                  <h2 className="text-lg font-semibold leading-snug text-slate-900">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </Link>
                    <div className="mt-auto flex items-center justify-between text-xs text-slate-500 mt-10">
                      <span>
                        {post.author?.name
                          ? `By ${post.author.name}`
                          : "By Editorial"}
                      </span>
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </h2>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
