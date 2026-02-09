import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import {
  Crown,
  Sparkles,
  Calendar,
  Eye,
  Gift,
  Shirt,
  User,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

interface PrivateClientLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const privateNavigation = [
  { 
    label: "Dashboard", 
    href: "/private-client", 
    icon: Crown,
  },
  { 
    label: "Private Previews", 
    href: "/private-client/previews", 
    icon: Eye,
  },
  { 
    label: "Concierge", 
    href: "/private-client/concierge", 
    icon: MessageCircle,
  },
  { 
    label: "Appointments", 
    href: "/private-client/appointments", 
    icon: Calendar,
  },
  { 
    label: "Wardrobe Intelligence", 
    href: "/private-client/wardrobe", 
    icon: Shirt,
  },
  { 
    label: "Gifting", 
    href: "/private-client/gifting", 
    icon: Gift,
  },
  { 
    label: "Your Tier", 
    href: "/private-client/tier", 
    icon: Sparkles,
  },
];

export function PrivateClientLayout({ children, title, subtitle }: PrivateClientLayoutProps) {
  const location = useLocation();
  
  // Mock user data
  const user = {
    name: "Alexandra Morgan",
    tier: "gold",
    stylist: "Marie Laurent"
  };

  return (
    <Layout>
      <div className="min-h-screen bg-foreground text-background">
        {/* Private Client Header - Dark/Inverted */}
        <div className="border-b border-background/10">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <Link 
                to="/account" 
                className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Account</span>
              </Link>
              
              <div className="flex items-center gap-3">
                <Crown className="h-5 w-5 text-amber-400" />
                <span className="text-sm tracking-widest uppercase text-background/80">
                  Private Client
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="border-b border-background/10 bg-gradient-to-b from-background/5 to-transparent">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-caption tracking-[0.3em] text-background/50 uppercase mb-4">
                Welcome to your private space
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-background">
                {user.name}
              </h1>
              <p className="text-background/60 mt-4 text-lg">
                Your personal advisor: {user.stylist}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <nav className="space-y-1">
                {privateNavigation.map((item) => {
                  const isActive = location.pathname === item.href || 
                    (item.href !== "/private-client" && location.pathname.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm transition-all",
                        isActive 
                          ? "bg-background/10 text-background" 
                          : "text-background/50 hover:text-background hover:bg-background/5"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="tracking-wide">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-4">
              {(title || subtitle) && (
                <div className="mb-8">
                  {title && (
                    <h2 className="text-2xl font-serif font-light tracking-tight text-background">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-background/60 mt-2">{subtitle}</p>
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
