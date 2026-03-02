import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Flag, Shield, Download, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function OrdersControl() {
  const { orders, updateOrder, can } = useAdminStore();

  if (!can("orders")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted.</div></AdminLayout>;

  const handleExportCSV = () => {
    const csv = ["Order,Customer,Country,Total,Status,Payment,Flagged,VIP,Date",
      ...orders.map((o) => `${o.orderNumber},${o.customer},${o.country},${o.total},${o.status},${o.paymentStatus},${o.flagged},${o.vip},${o.createdAt}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "orders-export.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Orders</h1>
            <p className="text-sm text-muted-foreground mt-1">{orders.length} orders · {orders.filter((o) => o.status === "pending").length} pending</p>
          </div>
          <Button variant="outline" onClick={handleExportCSV} className="gap-2"><Download className="w-4 h-4" /> Export CSV</Button>
        </div>

        <div className="border border-border">
          <div className="grid grid-cols-9 gap-2 p-3 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
            <span>Order</span><span>Customer</span><span>Country</span><span>Products</span><span>Total</span><span>Status</span><span>Payment</span><span>Flags</span><span>Actions</span>
          </div>
          {orders.map((order) => (
            <div key={order.id} className="grid grid-cols-9 gap-2 p-3 border-b border-border last:border-0 items-center text-sm">
              <span className="font-mono text-xs">{order.orderNumber}</span>
              <span className="truncate">{order.customer}</span>
              <span>{order.country}</span>
              <span className="text-xs text-muted-foreground truncate">{order.products.join(", ")}</span>
              <span className="font-medium">€{order.total.toLocaleString()}</span>
              <StatusBadge status={order.status} />
              <StatusBadge status={order.paymentStatus} />
              <div className="flex gap-1">
                {order.flagged && <Flag className="w-3.5 h-3.5 text-destructive" />}
                {order.vip && <Shield className="w-3.5 h-3.5 text-accent" />}
              </div>
              <div className="flex gap-1">
                {order.status === "pending" && (
                  <>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { updateOrder(order.id, { status: "approved" }); toast.success("Approved"); }}>
                      <CheckCircle className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { updateOrder(order.id, { status: "cancelled" }); toast.success("Cancelled"); }}>
                      <XCircle className="w-3.5 h-3.5" />
                    </Button>
                  </>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => { updateOrder(order.id, { flagged: !order.flagged }); toast.success(order.flagged ? "Unflagged" : "Flagged"); }}
                >
                  <Flag className="w-3.5 h-3.5" />
                </Button>
                {order.paymentStatus === "paid" && order.status !== "refunded" && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => { updateOrder(order.id, { status: "refunded", paymentStatus: "refunded" }); toast.success("Refund simulated"); }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
