import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import dashboardData from "@/data/mock/admin-dashboard.json";
import { OrderAdminData } from "@/types/admin";

export default function AdminOrders() {
  const orders = dashboardData.recentOrders as OrderAdminData[];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);

  const columns = [
    {
      key: "orderNumber",
      label: "Order",
      render: (order: OrderAdminData) => (
        <span className="font-medium">{order.orderNumber}</span>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (order: OrderAdminData) => (
        <div>
          <p className="font-medium">{order.customer.name}</p>
          <p className="text-xs text-muted-foreground">{order.customer.email}</p>
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (order: OrderAdminData) => (
        <span>{order.items.length} item(s)</span>
      ),
    },
    {
      key: "total",
      label: "Total",
      render: (order: OrderAdminData) => (
        <span className="font-medium">{formatCurrency(order.total)}</span>
      ),
    },
    {
      key: "paymentStatus",
      label: "Payment",
      render: (order: OrderAdminData) => (
        <StatusBadge status={order.paymentStatus} />
      ),
    },
    {
      key: "fulfillmentStatus",
      label: "Fulfillment",
      render: (order: OrderAdminData) => (
        <StatusBadge status={order.fulfillmentStatus} />
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (order: OrderAdminData) =>
        formatDistanceToNow(new Date(order.createdAt), { addSuffix: true }),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Orders</h1>
            <p className="text-muted-foreground mt-1">
              Manage customer orders and fulfillment
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="ghost" size="sm">
              Pending
            </Button>
            <Button variant="ghost" size="sm">
              Processing
            </Button>
            <Button variant="ghost" size="sm">
              Shipped
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <DataTable
          columns={columns}
          data={orders}
          onRowClick={(order) => console.log("View order:", order.id)}
        />
      </div>
    </AdminLayout>
  );
}
