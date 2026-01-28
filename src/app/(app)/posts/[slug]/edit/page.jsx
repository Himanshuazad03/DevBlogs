import prisma from "../../../../../../db/client";
import PostForm from "../../../../../../components/PostForm";
import { updatePostAction } from "../../../../../../actions/posts";
import { checkUser } from "../../../../../lib/server/checkUser";
import { ROLE } from "../../../../../lib/server/auth";

export default async function EditPostPage({ params }) {
  const { slug } = await params;

  const user = await checkUser();
  if (!user) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) throw new Error("Post not found");

  const isAdmin = user.role === ROLE.ADMIN;
  const isAuthor = post.authorId === user.id;

  if (!isAdmin && !isAuthor) {
    throw new Error("Forbidden");
  }

  async function updateAction(values) {
    "use server";
    return updatePostAction({
      id: post.id,
      ...values,
    });
  }

  return (
    <main className="mx-auto max-w-4xl py-10">
      <h1 className="mb-6 text-2xl font-semibold">Edit post</h1>

      <PostForm
        initialData={{
          title: post.title,
          content: post.content,
          coverImage: post.coverImage,
        }}
        onSubmit={updateAction}
      />
    </main>
  );
}
