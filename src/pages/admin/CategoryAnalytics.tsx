import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { pillars } from "@/data/catalog-hierarchy";
import { BarChart3, TrendingUp, Globe, Layers } from "lucide-react";

const pillarRevenue = [
  { name: "Women", revenue: 284500, orders: 142, growth: 12.3 },
  { name: "Men", revenue: 198300, orders: 98, growth: 8.7 },
  { name: "Accessories", revenue: 156200, orders: 124, growth: 15.1 },
  { name: "Footwear", revenue: 112800, orders: 76, growth: 6.4 },
  { name: "Jewelry", revenue: 342100, orders: 45, growth: 22.8 },
  { name: "Maison", revenue: 67400, orders: 89, growth: 18.2 },
  { name: "Editions", revenue: 95600, orders: 32, growth: 34.5 },
];

const countryRevenue = [
  { country: "United States", code: "US", revenue: 485200, orders: 234 },
  { country: "United Kingdom", code: "GB", revenue: 312400, orders: 156 },
  { country: "India", code: "IN", revenue: 198600, orders: 142 },
  { country: "Canada", code: "CA", revenue: 147300, orders: 74 },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(n);

export default function AdminCategoryAnalytics() {
  const totalRevenue = pillarRevenue.reduce((s, p) => s + p.revenue, 0);
  const totalOrders = pillarRevenue.reduce((s, p) => s + p.orders, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Category Analytics</h1>
          <p className="text-muted-foreground mt-1">Sales performance by pillar, family, and country</p>
        </div>

        {/* Top-level metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard title="Total Revenue" value={fmt(totalRevenue)} icon={<BarChart3 className="h-4 w-4" />} />
          <MetricCard title="Total Orders" value={totalOrders.toString()} icon={<TrendingUp className="h-4 w-4" />} />
          <MetricCard title="Active Pillars" value={pillars.length.toString()} icon={<Layers className="h-4 w-4" />} />
          <MetricCard title="Markets" value="4" icon={<Globe className="h-4 w-4" />} />
        </div>

        {/* Revenue by Pillar */}
        <div className="border border-border">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-medium">Revenue by Pillar</h2>
          </div>
          <div className="divide-y divide-border">
            {pillarRevenue.map((p) => (
              <div key={p.name} className="flex items-center px-4 py-3">
                <span className="text-sm font-medium w-32">{p.name}</span>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-foreground/70 rounded-full"
                      style={{ width: `${(p.revenue / totalRevenue) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm w-24 text-right">{fmt(p.revenue)}</span>
                <span className="text-xs text-muted-foreground w-16 text-right">{p.orders} orders</span>
                <span className="text-xs text-foreground/70 w-16 text-right">+{p.growth}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Country */}
        <div className="border border-border">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-medium">Revenue by Country</h2>
          </div>
          <div className="divide-y divide-border">
            {countryRevenue.map((c) => (
              <div key={c.code} className="flex items-center px-4 py-3">
                <span className="text-sm font-medium w-40">{c.country}</span>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/70 rounded-full"
                      style={{ width: `${(c.revenue / totalRevenue) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm w-24 text-right">{fmt(c.revenue)}</span>
                <span className="text-xs text-muted-foreground w-16 text-right">{c.orders} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
