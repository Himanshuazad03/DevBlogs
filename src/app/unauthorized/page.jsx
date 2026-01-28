"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (hasShownToast.current) return;
    hasShownToast.current = true;

    toast.error("You are not allowed to access this page");
    router.replace("/all-posts");
  }, [router]);

  return null;
}
