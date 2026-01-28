import prisma from "../../../../../db/client";
import { requireRole, ROLE } from "../../../../lib/server/auth";
import PromoteButton from "./PromoteButton";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Users | Admin",
};

const roleBadgeStyles = {
  ADMIN: "bg-red-100 text-red-700 border-red-200",
  AUTHOR: "bg-blue-100 text-blue-700 border-blue-200",
  READER: "bg-slate-100 text-slate-700 border-slate-200",
};

export default async function AdminUsersPage() {
  await requireRole([ROLE.ADMIN]);

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold">User Management</h1>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-3">{user.name || "—"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium ${roleBadgeStyles[user.role]}`}
                  >
                    {user.role}
                  </Badge>
                </td>

                <td className="px-4 py-3 text-right">
                  {user.role === "READER" && <PromoteButton userId={user.id} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
