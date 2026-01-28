// src/lib/server/checkUser.js
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "../../../db/client";

export async function checkUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });

  if (!dbUser) return null;

  return dbUser; // IMPORTANT: Prisma user
}
