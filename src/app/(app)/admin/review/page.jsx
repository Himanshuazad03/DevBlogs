import prisma from "../../../../../db/client";
import { requireRole, ROLE } from "../../../../lib/server/auth";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Review posts | Admin",
};

export default async function ReviewPostsPage() {
  await requireRole([ROLE.ADMIN]);

  const posts = await prisma.post.findMany({
    where: {
      status: { in: ["DRAFT", "REVIEW"] },
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      slug:true,
      createdAt: true,
      author: {
        select: { name: true },
      },
    },
  });


  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Review queue</h1>
        <p className="text-sm text-muted-foreground">
          Posts waiting for review or publication
        </p>
      </header>

      <div className="rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40">
            <tr className="text-left">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                  No posts pending review
                </td>
              </tr>
            )}

            {posts.map((post) => (
              <tr key={post.id} className="border-b last:border-none">
                <td className="px-4 py-3 font-medium">
                  {post.title}
                </td>

                <td className="px-4 py-3">
                  {post.author?.name ?? "Unknown"}
                </td>

                <td className="px-4 py-3">
                  <StatusBadge status={post.status} />
                </td>

                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-right">
                  <Link href={`/posts/${post.slug}`}>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function StatusBadge({ status }) {
  if (status === "DRAFT")
    return <Badge variant="secondary">Draft</Badge>;
  if (status === "REVIEW")
    return <Badge className="bg-yellow-100 text-yellow-800">In review</Badge>;
  if (status === "PUBLISHED")
    return <Badge className="bg-green-100 text-green-800">Published</Badge>;

  return <Badge>{status}</Badge>;
}
