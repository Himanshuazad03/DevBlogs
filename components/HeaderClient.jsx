"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileNav from "./MobileNav";

export default function HeaderClient({ user }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isAdmin = user?.role === "ADMIN";

  const NavLinks = () => (
    <>
      <Link href="/all-posts" className="hover:text-slate-900">
        All Posts
      </Link>
      <Link href="/my-posts" className="hover:text-slate-900">
        My Posts
      </Link>
      <Link href="/posts/new" className="hover:text-slate-900">
        Add Post
      </Link>
      {isAdmin && (
        <Link href="/admin/user" className="hover:text-slate-900">
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight hidden md:block"
        >
          BlogPlatform
        </Link>
        <div className="flex items-center gap-2 md:hidden">
          <MobileNav user = {user} />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Menu
          </span>
        </div>

        {/* Desktop nav (landing only) */}
        {isLandingPage && (
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <NavLinks />
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger (landing only) */}
          {isLandingPage && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>

                  <div className="mt-6 flex flex-col gap-4 text-sm">
                    <NavLinks />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}

          {/* Auth */}
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
