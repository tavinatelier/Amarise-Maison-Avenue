import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Shield,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Warehouse,
  DollarSign,
  UserCog,
  BarChart3,
  RefreshCw,
  Server,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Customers", url: "/admin/customers", icon: Users },
  { title: "Inventory", url: "/admin/inventory", icon: Warehouse },
  { title: "Refunds", url: "/admin/refunds", icon: RefreshCw },
];

const financeItems = [
  { title: "Finance", url: "/admin/finance", icon: DollarSign },
  { title: "Analytics", url: "/admin/analytics/funnel", icon: BarChart3 },
];

const governanceItems = [
  { title: "Approvals", url: "/admin/approvals", icon: Shield },
  { title: "Audit Log", url: "/admin/audit", icon: Clock },
  { title: "Incidents", url: "/admin/incidents", icon: AlertTriangle },
];

const systemItems = [
  { title: "Team", url: "/admin/team", icon: UserCog },
  { title: "System", url: "/admin/system", icon: Server },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const renderNavItems = (items: typeof mainNavItems) => (
    <SidebarMenu>
      {items.map((item) => (
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

  return (
    <Sidebar
      className={cn(
        "border-r border-border bg-background transition-all duration-300",
        collapsed ? "w-14" : "w-56"
      )}
      collapsible="icon"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <span className="text-sm font-medium tracking-widest uppercase">
            Admin
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <SidebarContent className="py-4">
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-caption mb-2">
              Commerce
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>{renderNavItems(mainNavItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="text-caption mb-2">
              Finance
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>{renderNavItems(financeItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="text-caption mb-2">
              Governance
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>{renderNavItems(governanceItems)}</SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!collapsed && (
            <SidebarGroupLabel className="text-caption mb-2">
              System
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>{renderNavItems(systemItems)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto p-4 border-t border-border">
        <NavLink
          to="/"
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {!collapsed && <span>Back to Store</span>}
        </NavLink>
      </div>
    </Sidebar>
  );
}
