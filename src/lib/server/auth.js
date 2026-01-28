// lib/server/auth.js
import { checkUser } from "./checkUser";

export const ROLE = {
  ADMIN: "ADMIN",
  AUTHOR: "AUTHOR",
  READER: "READER",
};

export async function requireRole(allowedRoles) {
  const user = await checkUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user; // ✅ return Prisma user directly
}
