"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  FileText,
  PenLine,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";

export function BlogSidebar({ user }) {
  const pathname = usePathname();

  const isAdmin = user?.role === "ADMIN";
  const isAuthor = user?.role === "AUTHOR" || isAdmin;

  const NavItem = ({ href, icon: Icon, label }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathname === href}>
        <Link href={href}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar className="w-64 border-r bg-background">
      <SidebarContent className="py-20">
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            <NavItem href="/all-posts" icon={FileText} label="All Posts" />
            {isAuthor && <NavItem href="/my-posts" icon={FileText} label="My Posts" />}
            {isAuthor && <NavItem href="/posts/new" icon={PenLine} label="Write Post" />}
          </SidebarMenu>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarMenu>
              <NavItem href="/admin/review" icon={ClipboardList} label="Review Queue" />
              <NavItem href="/admin/user" icon={LayoutDashboard} label="Dashboard" />
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
