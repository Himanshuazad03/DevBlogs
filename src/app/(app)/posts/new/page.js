import { ROLE, requireRole } from "../../../../lib/server/auth";
import { createPostAction } from "../../../../../actions/posts";
import PostForm from "../../../../../components/PostForm";



export const metadata = {
  title: "New post | Blog Platform",
};

export default async function NewPostPage() {
  // Clerk-based role protection
  const result = await requireRole([ROLE.AUTHOR, ROLE.READER, ROLE.ADMIN]);


  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-10 rounded-xl mb-10 text-neutral-950">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create a new post
        </h1>
        <p className="text-sm text-neutral-400">
          Draft your article. You can submit it for review after saving.
        </p>
      </header>

      <PostForm onSubmit={createPostAction} />
    </main>
  );
}
