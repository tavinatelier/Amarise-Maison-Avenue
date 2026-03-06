import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * DEV MODE: Auth bypass active. All users get full admin access.
 * TODO: Re-enable auth checks before production deployment.
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex items-center h-12 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
            <SidebarTrigger className="ml-3" />
            <span className="ml-3 text-sm font-medium tracking-widest uppercase">Admin</span>
          </header>
          <div className="p-4 md:p-6 lg:p-10">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
