import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Settings, Shield, Clock, ChevronLeft, ChevronRight,
  Warehouse, DollarSign, UserCog, BarChart3, RefreshCw, Server, FolderTree, Home, Navigation, FileText,
  Layers, UserCheck, Globe, ClipboardList, Zap, Megaphone, Plug, Activity, Map,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/stores/adminStore";

const allNavItems = {
  commerce: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard, perm: "dashboard" },
    { title: "Products", url: "/admin/products", icon: Package, perm: "products" },
    { title: "Collections", url: "/admin/collections", icon: Layers, perm: "collections" },
    { title: "Orders", url: "/admin/orders", icon: ShoppingCart, perm: "orders" },
    { title: "Customers", url: "/admin/customers", icon: Users, perm: "products" },
    { title: "Inventory", url: "/admin/inventory", icon: Warehouse, perm: "inventory" },
    { title: "Categories", url: "/admin/categories", icon: FolderTree, perm: "products" },
  ],
  content: [
    { title: "Content", url: "/admin/content", icon: FileText, perm: "homepage" },
    { title: "Homepage", url: "/admin/homepage", icon: Home, perm: "homepage" },
    { title: "Pages", url: "/admin/pages", icon: FileText, perm: "pages" },
    { title: "Navigation", url: "/admin/navigation", icon: Navigation, perm: "navigation" },
    { title: "Editorial", url: "/admin/editorial", icon: FileText, perm: "pages" },
    { title: "SEO", url: "/admin/seo", icon: Globe, perm: "pages" },
    { title: "Sitemaps", url: "/admin/sitemaps", icon: Map, perm: "pages" },
  ],
  finance: [
    { title: "Pricing & Currency", url: "/admin/pricing", icon: DollarSign, perm: "pricing" },
    { title: "Finance", url: "/admin/finance", icon: DollarSign, perm: "pricing" },
    { title: "Analytics", url: "/admin/analytics", icon: BarChart3, perm: "dashboard" },
    { title: "Executive", url: "/admin/executive", icon: LayoutDashboard, perm: "dashboard" },
  ],
  governance: [
    { title: "Governance", url: "/admin/governance", icon: Shield, perm: "governance" },
    { title: "Roles", url: "/admin/roles", icon: UserCheck, perm: "roles" },
    { title: "Audit Log", url: "/admin/audit", icon: Clock, perm: "audit" },
  ],
  holding: [
    { title: "Regions", url: "/admin/holding/regions", icon: Globe, perm: "governance" },
    { title: "Country Analytics", url: "/admin/holding/analytics", icon: BarChart3, perm: "dashboard" },
    { title: "Region Control", url: "/admin/holding/region-control", icon: Shield, perm: "governance" },
  ],
  operations: [
    { title: "Automation", url: "/admin/automation", icon: Zap, perm: "dashboard" },
    { title: "Ad Network", url: "/admin/ads", icon: Megaphone, perm: "dashboard" },
    { title: "API Manager", url: "/admin/api", icon: Plug, perm: "settings" },
  ],
  system: [
    { title: "Users", url: "/admin/users", icon: Users, perm: "dashboard" },
    { title: "Team", url: "/admin/team", icon: UserCog, perm: "dashboard" },
    { title: "Tasks", url: "/admin/tasks", icon: ClipboardList, perm: "dashboard" },
    { title: "System Health", url: "/admin/system-health", icon: Activity, perm: "dashboard" },
    { title: "System", url: "/admin/system", icon: Server, perm: "dashboard" },
    { title: "Settings", url: "/admin/settings", icon: Settings, perm: "settings" },
    { title: "Performance", url: "/admin/performance", icon: Server, perm: "settings" },
  ],
};

export function AdminSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";
  const can = useAdminStore((s) => s.can);

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const renderNavItems = (items: typeof allNavItems.commerce) => {
    const visible = items.filter((item) => can(item.perm));
    if (!visible.length) return null;
    return (
      <SidebarMenu>
        {visible.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <NavLink
                to={item.url}
                end={item.url === "/admin"}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-none transition-colors",
                  "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                  isActive(item.url) && "bg-muted text-foreground font-medium"
                )}
                activeClassName="bg-muted text-foreground font-medium"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="text-sm">{item.title}</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  };

  const groups: { label: string; key: keyof typeof allNavItems }[] = [
    { label: "Commerce", key: "commerce" },
    { label: "Content", key: "content" },
    { label: "Finance", key: "finance" },
    { label: "Governance", key: "governance" },
    { label: "Holding", key: "holding" },
    { label: "Operations", key: "operations" },
    { label: "System", key: "system" },
  ];

  return (
    <Sidebar className={cn("border-r border-border bg-background transition-all duration-300", collapsed ? "w-14" : "w-56")} collapsible="icon">
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && <span className="text-sm font-medium tracking-widest uppercase">Admin</span>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <SidebarContent className="py-4">
        {groups.map(({ label, key }, idx) => {
          const rendered = renderNavItems(allNavItems[key]);
          if (!rendered) return null;
          return (
            <SidebarGroup key={key} className={idx > 0 ? "mt-4" : ""}>
              {!collapsed && <SidebarGroupLabel className="text-caption mb-2">{label}</SidebarGroupLabel>}
              <SidebarGroupContent>{rendered}</SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <div className="mt-auto p-4 border-t border-border">
        <NavLink to="/" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-4 w-4" />
          {!collapsed && <span>Back to Store</span>}
        </NavLink>
      </div>
    </Sidebar>
  );
}
