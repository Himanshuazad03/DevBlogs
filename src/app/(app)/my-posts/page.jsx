import prisma from "../../../../db/client";
import {checkUser} from "../../../../src/lib/server/checkUser"
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My posts",
};

export default async function MyPostsPage() {
  const user = await checkUser();

  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      updatedAt: true,
      slug: true,
    },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">My posts</h1>
          <p className="text-sm text-muted-foreground">
            Drafts, reviews, and published posts
          </p>
        </div>

        <Link href="/posts/new">
          <Button>Create post</Button>
        </Link>
      </header>

      <div className="space-y-3">
        {posts.length === 0 && (
          <div className="rounded-xl border p-8 text-center text-muted-foreground">
            You haven’t written any posts yet.
          </div>
        )}

        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="block rounded-xl border p-4 hover:bg-muted/40 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">
                  Updated {new Date(post.updatedAt).toLocaleDateString()}
                </p>
              </div>

              <StatusBadge status={post.status} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

function StatusBadge({ status }) {
  switch (status) {
    case "DRAFT":
      return <Badge variant="secondary">Draft</Badge>;
    case "REVIEW":
      return <Badge className="bg-yellow-100 text-yellow-800">In review</Badge>;
    case "PUBLISHED":
      return <Badge className="bg-green-100 text-green-800">Published</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}
