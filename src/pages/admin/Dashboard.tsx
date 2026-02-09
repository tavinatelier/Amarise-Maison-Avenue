import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { formatDistanceToNow } from "date-fns";
import {
  Euro,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import dashboardData from "@/data/mock/admin-dashboard.json";
import { OrderAdminData, ProductAdminData } from "@/types/admin";

export default function AdminDashboard() {
  const { revenue, orders, productMetrics, topCountries, recentOrders } = dashboardData;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);

  const orderColumns = [
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
      render: (order: OrderAdminData) => order.customer.name,
    },
    {
      key: "total",
      label: "Total",
      render: (order: OrderAdminData) => formatCurrency(order.total),
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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your store performance
          </p>
        </div>

        {/* Revenue Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Today"
            value={formatCurrency(revenue.today)}
            icon={<Euro className="h-5 w-5" />}
            trend="up"
            trendValue="+12% vs yesterday"
          />
          <MetricCard
            label="This Week"
            value={formatCurrency(revenue.thisWeek)}
            icon={<TrendingUp className="h-5 w-5" />}
            trend="up"
            trendValue="+8% vs last week"
          />
          <MetricCard
            label="This Month"
            value={formatCurrency(revenue.thisMonth)}
            icon={<TrendingUp className="h-5 w-5" />}
            trend="up"
            trendValue="+15% vs last month"
          />
          <MetricCard
            label="This Year"
            value={formatCurrency(revenue.thisYear)}
            icon={<TrendingUp className="h-5 w-5" />}
          />
        </div>

        {/* Order & Product Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Pending Orders"
            value={orders.pending}
            icon={<ShoppingCart className="h-5 w-5" />}
            subValue="Awaiting payment"
          />
          <MetricCard
            label="Processing"
            value={orders.processing}
            icon={<Package className="h-5 w-5" />}
            subValue="Being prepared"
          />
          <MetricCard
            label="Low Stock Products"
            value={productMetrics.lowStock}
            icon={<AlertCircle className="h-5 w-5" />}
            subValue="Need attention"
          />
          <MetricCard
            label="Total Active Products"
            value={productMetrics.totalActive}
            icon={<Package className="h-5 w-5" />}
          />
        </div>

        {/* Top Countries & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Countries */}
          <div className="border border-border p-6 bg-card">
            <h3 className="text-caption mb-4">Top Countries</h3>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <div key={country.countryCode} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-4">
                      {index + 1}
                    </span>
                    <span className="font-medium">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(country.revenue)}</p>
                    <p className="text-xs text-muted-foreground">
                      {country.orders} orders
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-caption">Recent Orders</h3>
              <a
                href="/admin/orders"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View All →
              </a>
            </div>
            <DataTable
              columns={orderColumns}
              data={recentOrders as OrderAdminData[]}
              onRowClick={(order) => console.log("View order:", order.id)}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
