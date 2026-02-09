import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AccountLayout } from "@/components/account/AccountLayout";
import { 
  Package, 
  Heart, 
  Shirt, 
  MapPin, 
  MessageSquare,
  ChevronRight,
  Crown,
  Truck,
} from "lucide-react";
import accountData from "@/data/mock/account.json";

export default function AccountHome() {
  const { user, orders, wardrobe, savedItems, communications } = accountData;
  
  const recentOrder = orders[0];
  const unreadMessages = communications.filter(c => !c.read).length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const quickLinks = [
    { 
      label: "Orders", 
      href: "/account/orders", 
      icon: Package,
      value: `${orders.length} orders`,
    },
    { 
      label: "Wardrobe", 
      href: "/account/wardrobe", 
      icon: Shirt,
      value: `${wardrobe.length} pieces`,
    },
    { 
      label: "Saved Items", 
      href: "/account/saved", 
      icon: Heart,
      value: `${savedItems.length} items`,
    },
    { 
      label: "Addresses", 
      href: "/account/addresses", 
      icon: MapPin,
      value: "2 saved",
    },
  ];

  return (
    <AccountLayout>
      <div className="space-y-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.href}
                className="block p-6 bg-secondary/30 hover:bg-secondary/50 transition-colors group"
              >
                <link.icon className="h-5 w-5 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">{link.label}</p>
                <p className="text-lg font-medium mt-1">{link.value}</p>
                <ChevronRight className="h-4 w-4 text-muted-foreground mt-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Order */}
        {recentOrder && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Recent Order</h3>
              <Link 
                to="/account/orders" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all orders
              </Link>
            </div>
            
            <div className="border border-border/50 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Order {recentOrder.number}</p>
                  <p className="text-lg font-medium mt-1">{formatCurrency(recentOrder.total)}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  {recentOrder.status === "delivered" ? (
                    <>
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      <span>Delivered {recentOrder.tracking?.deliveredAt}</span>
                    </>
                  ) : (
                    <>
                      <Truck className="h-4 w-4" />
                      <span>In transit</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {recentOrder.items.slice(0, 5).map((item, i) => (
                  <div key={i} className="aspect-square bg-secondary/50 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <Link 
                to={`/account/orders/${recentOrder.id}`}
                className="inline-block mt-6 text-sm hover:underline"
              >
                View order details
              </Link>
            </div>
          </section>
        )}

        {/* Tier Status */}
        <section className="p-8 bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200/50 dark:border-amber-800/30">
          <div className="flex items-start gap-4">
            <Crown className="h-8 w-8 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Gold Member</h3>
              <p className="text-muted-foreground text-sm mb-4">
                You've spent {formatCurrency(user.lifetimeValue)} with AMARISÉ. 
                Spend {formatCurrency(15000 - user.lifetimeValue)} more to unlock Black tier benefits.
              </p>
              
              <div className="w-full bg-amber-200/50 dark:bg-amber-800/30 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-600 transition-all"
                  style={{ width: `${Math.min((user.lifetimeValue / 15000) * 100, 100)}%` }}
                />
              </div>
              
              <Link 
                to="/private-client/tier"
                className="inline-block mt-4 text-sm text-amber-700 dark:text-amber-400 hover:underline"
              >
                View tier benefits
              </Link>
            </div>
          </div>
        </section>

        {/* Messages */}
        {unreadMessages > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Messages</h3>
              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                {unreadMessages} new
              </span>
            </div>
            
            <div className="space-y-2">
              {communications.filter(c => !c.read).slice(0, 3).map((msg) => (
                <Link
                  key={msg.id}
                  to="/account/messages"
                  className="flex items-center gap-4 p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <MessageSquare className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{msg.subject}</p>
                    <p className="text-sm text-muted-foreground">{msg.date}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Wardrobe Preview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Your Wardrobe</h3>
            <Link 
              to="/account/wardrobe" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View all pieces
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {wardrobe.slice(0, 4).map((item) => (
              <div key={item.id} className="group">
                <div className="aspect-[3/4] bg-secondary/50 overflow-hidden mb-3">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.variant}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AccountLayout>
  );
}
