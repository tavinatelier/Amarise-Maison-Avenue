import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { useAdminStore } from "@/stores/adminStore";
import { sampleProducts } from "@/data/catalog-hierarchy";
import {
  Package, ShoppingCart, AlertCircle, TrendingUp, Clock, Globe, Star, Euro,
} from "lucide-react";
import dashboardData from "@/data/mock/admin-dashboard.json";

export default function AdminDashboard() {
  const { orders, auditLog, productOverrides, settings, globalFreeze, currencies } = useAdminStore();
  const products = sampleProducts;

  const getStock = (id: string, original: number) => productOverrides[id]?.inventory ?? original;
  const inStock = products.filter((p) => getStock(p.id, p.inventory) > 0).length;
  const lowStock = products.filter((p) => {
    const s = getStock(p.id, p.inventory);
    return s > 0 && s <= settings.lowStockThreshold;
  }).length;
  const soldOut = products.filter((p) => getStock(p.id, p.inventory) === 0 || productOverrides[p.id]?.sold).length;
  const featured = products.filter((p) => productOverrides[p.id]?.featured ?? p.isFeatured).length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const enabledCountries = Object.values(useAdminStore.getState().countryFreeze).filter((f) => !f).length;

  const formatCurrency = (v: number) => new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(v);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {globalFreeze && <span className="text-destructive font-medium mr-2">⚠ Commerce Frozen</span>}
              Overview of your store operations
            </p>
          </div>
          <div className="text-xs text-muted-foreground text-right">
            <p>Active Role: <span className="capitalize font-medium text-foreground">{useAdminStore.getState().currentRole.replace("-", " ")}</span></p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard label="Total Products" value={products.length} icon={<Package className="h-5 w-5" />} />
          <MetricCard label="In Stock" value={inStock} icon={<TrendingUp className="h-5 w-5" />} />
          <MetricCard label="Low Stock" value={lowStock} icon={<AlertCircle className="h-5 w-5" />} subValue="Need attention" />
          <MetricCard label="Sold Out" value={soldOut} icon={<Package className="h-5 w-5" />} />
          <MetricCard label="Featured" value={featured} icon={<Star className="h-5 w-5" />} />
          <MetricCard label="Pending Orders" value={pendingOrders} icon={<ShoppingCart className="h-5 w-5" />} />
        </div>

        {/* Revenue (mock) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Today" value={formatCurrency(dashboardData.revenue.today)} icon={<Euro className="h-5 w-5" />} trend="up" trendValue="+12%" />
          <MetricCard label="This Week" value={formatCurrency(dashboardData.revenue.thisWeek)} icon={<TrendingUp className="h-5 w-5" />} trend="up" trendValue="+8%" />
          <MetricCard label="This Month" value={formatCurrency(dashboardData.revenue.thisMonth)} icon={<TrendingUp className="h-5 w-5" />} trend="up" trendValue="+15%" />
          <MetricCard label="Active Countries" value={enabledCountries} icon={<Globe className="h-5 w-5" />} subValue="Unfrozen regions" />
        </div>

        {/* Activity feed + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <h3 className="text-caption">Recent Activity</h3>
            </div>
            <div className="divide-y divide-border max-h-80 overflow-auto">
              {auditLog.length === 0 ? (
                <div className="p-6 text-center text-sm text-muted-foreground">No activity yet. Make changes in admin panels.</div>
              ) : (
                auditLog.slice(0, 10).map((entry) => (
                  <div key={entry.id} className="p-3 flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{entry.action}</p>
                      <p className="text-xs text-muted-foreground">{entry.detail}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <h3 className="text-caption">Alerts</h3>
            </div>
            <div className="divide-y divide-border">
              {lowStock > 0 && (
                <div className="p-3 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-accent" />
                  <p className="text-sm">{lowStock} products below stock threshold ({settings.lowStockThreshold})</p>
                </div>
              )}
              {soldOut > 0 && (
                <div className="p-3 flex items-center gap-3">
                  <Package className="w-4 h-4 text-destructive" />
                  <p className="text-sm">{soldOut} products sold out</p>
                </div>
              )}
              {pendingOrders > 0 && (
                <div className="p-3 flex items-center gap-3">
                  <ShoppingCart className="w-4 h-4 text-accent" />
                  <p className="text-sm">{pendingOrders} orders awaiting approval</p>
                </div>
              )}
              {globalFreeze && (
                <div className="p-3 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <p className="text-sm font-medium text-destructive">Global commerce freeze is active</p>
                </div>
              )}
              {!lowStock && !soldOut && !pendingOrders && !globalFreeze && (
                <div className="p-6 text-center text-sm text-muted-foreground">All systems operational ✓</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
