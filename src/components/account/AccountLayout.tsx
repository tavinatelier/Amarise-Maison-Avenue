import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import {
  User,
  Package,
  Heart,
  Shirt,
  MapPin,
  Settings,
  MessageSquare,
  RotateCcw,
  Crown,
  LogOut,
} from "lucide-react";

interface AccountLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const accountNavigation = [
  { 
    label: "Overview", 
    href: "/account", 
    icon: User,
    description: "Your account at a glance"
  },
  { 
    label: "Orders", 
    href: "/account/orders", 
    icon: Package,
    description: "Order history and tracking"
  },
  { 
    label: "Wardrobe", 
    href: "/account/wardrobe", 
    icon: Shirt,
    description: "Your AMARISÉ collection"
  },
  { 
    label: "Saved Items", 
    href: "/account/saved", 
    icon: Heart,
    description: "Items you love"
  },
  { 
    label: "Addresses", 
    href: "/account/addresses", 
    icon: MapPin,
    description: "Shipping and billing"
  },
  { 
    label: "Preferences", 
    href: "/account/preferences", 
    icon: Settings,
    description: "Style and communication"
  },
  { 
    label: "Messages", 
    href: "/account/messages", 
    icon: MessageSquare,
    description: "Communications from AMARISÉ"
  },
  { 
    label: "Returns & Service", 
    href: "/account/service", 
    icon: RotateCcw,
    description: "Requests and support"
  },
];

export function AccountLayout({ children, title, subtitle }: AccountLayoutProps) {
  const location = useLocation();
  
  // Mock user data - would come from auth context
  const user = {
    name: "Alexandra Morgan",
    tier: "gold",
    email: "alexandra.morgan@email.com"
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "gold": return "text-amber-600";
      case "black": return "text-foreground";
      case "private_circle": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Account Header */}
        <div className="border-b border-border/50 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-caption tracking-widest text-muted-foreground uppercase mb-2">
                  Welcome back
                </p>
                <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight">
                  {user.name}
                </h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className={cn(
                    "flex items-center gap-1.5 text-sm font-medium",
                    getTierColor(user.tier)
                  )}>
                    <Crown className="h-4 w-4" />
                    {user.tier.charAt(0).toUpperCase() + user.tier.slice(1).replace("_", " ")} Member
                  </span>
                </div>
              </div>
              
              {user.tier !== "standard" && (
                <Link 
                  to="/private-client"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
                >
                  <Crown className="h-4 w-4" />
                  Private Client Portal
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <nav className="space-y-1">
                {accountNavigation.map((item) => {
                  const isActive = location.pathname === item.href || 
                    (item.href !== "/account" && location.pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm transition-all group",
                        isActive 
                          ? "bg-secondary/60 text-foreground" 
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )} />
                      <span className="tracking-wide">{item.label}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-6 mt-6 border-t border-border/50">
                  <button className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors w-full">
                    <LogOut className="h-4 w-4" />
                    <span className="tracking-wide">Sign Out</span>
                  </button>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3">
              {(title || subtitle) && (
                <div className="mb-8">
                  {title && (
                    <h2 className="text-2xl font-serif font-light tracking-tight">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-muted-foreground mt-2">{subtitle}</p>
                  )}
                </div>
              )}
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {children}
              </motion.div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
