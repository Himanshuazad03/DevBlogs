import Footer from "../../../components/footer";
import {BlogSidebar} from "../../../components/BlogSide";
import { checkUser } from "@/lib/server/checkUser";
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default async function AppLayout({ children }) {
    const user = await checkUser()
  
    return (
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <BlogSidebar user={user} />
        </Sidebar>
  
        <SidebarInset className="flex min-h-screen flex-col">
          <header className="flex h-14 items-center gap-2 border-b px-4 md:hidden">
            <SidebarTrigger />
            <span className="font-semibold">Blog</span>
          </header>
  
          <main className="flex-1 pt-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    )
  }
  