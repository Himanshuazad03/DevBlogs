"use client";

import { promoteUserAction } from "../../../../../actions/admin";
import { Button } from "../../../../components/ui/button";

export default function PromoteButton({ userId }) {
  return (
    <form action={promoteUserAction}>
      <input type="hidden" name="userId" value={userId} />
      <Button className="rounded-md bg-black px-3 py-1.5 text-xs text-white hover:bg-gray-900">
        Promote to Author
      </Button>
    </form>
  );
}
