import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Package, ChevronRight, Truck, CheckCircle } from "lucide-react";
import accountData from "@/data/mock/account.json";

export default function AccountOrders() {
  const { orders } = accountData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />;
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "shipped":
        return "In Transit";
      case "processing":
        return "Processing";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <AccountLayout title="Order History" subtitle="View and track all your AMARISÉ orders">
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              When you place your first order, it will appear here.
            </p>
            <Link 
              to="/discover"
              className="inline-block px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
            >
              Discover AMARISÉ
            </Link>
          </div>
        ) : (
          orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-border/50 p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-6 border-b border-border/50">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">{getStatusLabel(order.status)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Order {order.number}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-medium">{formatCurrency(order.total)}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 h-24 bg-secondary/50 overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.variant}</p>
                      <p className="text-sm mt-1">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracking Info */}
              {order.tracking && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    {order.status === "delivered" 
                      ? `Delivered on ${formatDate(order.tracking.deliveredAt!)}`
                      : `${order.tracking.carrier} • ${order.tracking.number}`
                    }
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to={`/account/orders/${order.id}`}
                  className="inline-flex items-center gap-2 text-sm hover:underline"
                >
                  View details
                  <ChevronRight className="h-4 w-4" />
                </Link>
                
                {order.status === "delivered" && (
                  <Link
                    to="/account/service"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Return or exchange
                  </Link>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </AccountLayout>
  );
}
