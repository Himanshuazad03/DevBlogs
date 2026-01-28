"use client";

import Link from "next/link";
import {
  Menu,
  FileText,
  PenLine,
  LayoutDashboard,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNav({ user }) {
  const isAdmin = user?.role === "ADMIN";
  const isAuthor = user?.role === "AUTHOR" || isAdmin;


  return (
    <Sheet>
      {/* Hamburger */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-700 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      {/* Drawer */}
      <SheetContent
        side="left"
        className="w-[280px] p-0 bg-white border-r border-slate-200"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <SheetHeader className="border-b border-slate-200 px-6 py-4">
            <SheetTitle className="text-lg font-semibold text-slate-900">
              Blog Platform
            </SheetTitle>
          </SheetHeader>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4 py-6 text-sm">
            <NavItem href="/all-posts" icon={FileText} label="All Posts" />

            {(isAuthor || isAdmin) && (
              <>
                <NavItem href="/my-posts" icon={FileText} label="My Posts" />
                <NavItem href="/posts/new" icon={PenLine} label="Write Post" />
              </>
            )}

            {isAdmin && (
              <div className="mt-4 border-t border-slate-200 pt-4">
                <NavItem
                  href="/admin/review"
                  icon={ClipboardList}
                  label="Review Queue"
                />
                <NavItem
                  href="/admin/user"
                  icon={LayoutDashboard}
                  label="Dashboard"
                />
              </div>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ---------- Helper ---------- */

function NavItem({ href, icon: Icon, label }) {
  return (
    <Link
      href={href}
      className="
        flex items-center gap-3 rounded-md px-3 py-2
        text-slate-600 hover:text-slate-900 hover:bg-slate-100
        transition
      "
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
