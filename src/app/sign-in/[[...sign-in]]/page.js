"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 text-white">
      
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-white text-black hover:bg-neutral-200 focus:ring-2 focus:ring-offset-2 focus:ring-white",
            },
          }}
          redirectUrl="/all-posts"
        />
      
    </main>
  );
}

