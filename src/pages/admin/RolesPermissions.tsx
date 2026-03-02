import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore, ROLE_PERMISSIONS, AdminRole } from "@/stores/adminStore";
import { CheckCircle, XCircle, User } from "lucide-react";

const ALL_SECTIONS = ["dashboard", "products", "collections", "pages", "homepage", "navigation", "pricing", "inventory", "orders", "governance", "roles", "audit", "settings"];

const ROLE_LABELS: Record<AdminRole, { title: string; description: string }> = {
  founder: { title: "Founder", description: "Full unrestricted access to all systems" },
  "global-director": { title: "Global Director", description: "All operations except system settings and role management" },
  "merchandising-manager": { title: "Merchandising Manager", description: "Products, collections, inventory, and orders" },
  "content-editor": { title: "Content Editor", description: "Pages, homepage, and collections content" },
  "support-agent": { title: "Support Agent", description: "Orders and audit log only" },
};

export default function RolesPermissions() {
  const { currentRole, setRole, can } = useAdminStore();

  if (!can("roles")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Role management restricted to Founders.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Roles & Permissions</h1>
          <p className="text-sm text-muted-foreground mt-1">Simulated role-based access control matrix</p>
        </div>

        {/* Current role */}
        <div className="border border-border p-4 bg-card flex items-center gap-4">
          <User className="w-5 h-5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Active Role: <span className="capitalize">{currentRole.replace("-", " ")}</span></p>
            <p className="text-xs text-muted-foreground">Switch roles to simulate permission gating across all admin panels</p>
          </div>
          <select
            value={currentRole}
            onChange={(e) => setRole(e.target.value as AdminRole)}
            className="px-3 py-2 text-sm border border-border bg-background"
          >
            {Object.entries(ROLE_LABELS).map(([key, { title }]) => (
              <option key={key} value={key}>{title}</option>
            ))}
          </select>
        </div>

        {/* Permission matrix */}
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left text-xs text-muted-foreground uppercase tracking-wider">Section</th>
                {Object.entries(ROLE_LABELS).map(([key, { title }]) => (
                  <th key={key} className={`p-3 text-center text-xs uppercase tracking-wider ${key === currentRole ? "text-foreground font-bold bg-muted/50" : "text-muted-foreground"}`}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_SECTIONS.map((section) => (
                <tr key={section} className="border-b border-border last:border-0">
                  <td className="p-3 capitalize font-medium">{section}</td>
                  {Object.keys(ROLE_LABELS).map((role) => {
                    const has = ROLE_PERMISSIONS[role as AdminRole]?.includes(section);
                    return (
                      <td key={role} className={`p-3 text-center ${role === currentRole ? "bg-muted/50" : ""}`}>
                        {has ? (
                          <CheckCircle className="w-4 h-4 text-foreground mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Role descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(ROLE_LABELS).map(([key, { title, description }]) => (
            <div key={key} className={`border p-4 ${key === currentRole ? "border-foreground bg-muted/30" : "border-border"}`}>
              <h3 className="font-medium text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
              <p className="text-xs mt-2">
                <span className="text-muted-foreground">Permissions: </span>
                {ROLE_PERMISSIONS[key as AdminRole]?.length}/{ALL_SECTIONS.length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
