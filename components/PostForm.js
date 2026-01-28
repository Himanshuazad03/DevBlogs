"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema } from "../lib/validation";
import { useRouter } from "next/navigation";

export default function PostForm({ onSubmit }) {
  const [serverErrors, setServerErrors] = useState(null);
  const [isPending, startTransition] = useTransition();

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(
      createPostSchema.omit({ tags: true, scheduledAt: true }),
    ),
    defaultValues: {
      title: "",
      content: "",
      coverImage: "",
      tags: "",
    },
  });

  const submit = (values) => {
    setServerErrors(null);
    startTransition(async () => {
      const result = await onSubmit({
        ...values,
        // tags are handled server-side as comma-separated string
        status: "DRAFT",
      });

      if (!result?.ok) {
        setServerErrors(result.errors || { _global: ["Something went wrong"] });
        return;
      }

      // Navigate to the newly created post
      router.push(`/posts/${result.slug}`);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-6 rounded-xl border border-neutral-800 bg-slate-50/60 p-6"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-950">
          Title
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-neutral-700 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none focus:border-neutral-300"
          placeholder="A compelling, descriptive title"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-950">
          Content
        </label>
        <textarea
          rows={8}
          className="w-full rounded-md border border-neutral-700 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none focus:border-neutral-300"
          placeholder="Write your post content here. Rich text editor can be added later; for now we store HTML or structured text."
          {...register("content")}
        />
        {errors.content && (
          <p className="text-xs text-red-400">{errors.content.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-950">
          Cover image URL
        </label>
        <input
          type="url"
          className="w-full rounded-md border border-neutral-700 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none focus:border-neutral-300"
          placeholder="https://images.example.com/cover.jpg"
          {...register("coverImage")}
        />
        {errors.coverImage && (
          <p className="text-xs text-red-400">{errors.coverImage.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-950">Tags</label>
        <input
          type="text"
          className="w-full rounded-md border border-neutral-700 bg-slate-50 px-3 py-2 text-sm text-slate-950 outline-none focus:border-neutral-300"
          placeholder="performance, react, nextjs"
          {...register("tags")}
        />
        <p className="text-xs text-neutral-400">
          Comma-separated tags, used for filtering and search.
        </p>
      </div>

      {serverErrors?._global && (
        <p className="text-sm text-red-400">
          {serverErrors._global.join(", ")}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium cursor-pointer text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving draft..." : "Save draft"}
      </button>
    </form>
  );
}
