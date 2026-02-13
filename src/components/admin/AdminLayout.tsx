import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { supabase } from "@/integrations/supabase/client";
import { PageLoader } from "@/components/common/PageLoader";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/", { replace: true });
        return;
      }

      const { data: isStaff } = await supabase.rpc("is_staff", { _user_id: user.id });
      if (cancelled) return;

      if (!isStaff) {
        navigate("/", { replace: true });
        return;
      }

      setAuthorized(true);
      setLoading(false);
    };

    checkAccess();
    return () => { cancelled = true; };
  }, [navigate]);

  if (loading || !authorized) {
    return <PageLoader />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 lg:p-10">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
