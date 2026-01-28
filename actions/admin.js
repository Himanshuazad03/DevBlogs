"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../db/client";
import { revalidate } from "@/app/(app)/posts/[slug]/page";

export async function promoteUserAction(formData) {
  const { userId } = await auth();
  console.log(userId);
  if (!userId) throw new Error("Unauthorized");

  const admin = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!admin || admin.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const targetUserId = formData.get("userId");

  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: "AUTHOR" },
  });

  revalidate("/admin");
  revalidate("/admin/user");
}
