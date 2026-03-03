import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { useAdminStore } from "@/stores/adminStore";
import { sampleProducts } from "@/data/catalog-hierarchy";
import {
  Globe, Shield, AlertTriangle, TrendingUp, DollarSign, Package,
  Clock, Lock, Users, BarChart3, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import analyticsData from "@/data/mock/analytics.json";

export default function ExecutiveDashboard() {
  const {
    can, currentRole, globalFreeze, setGlobalFreeze,
    countryFreeze, orders, productOverrides, settings,
    auditLog, emergencyBanner, inventoryFreeze, approvalRequired,
  } = useAdminStore();

  if (!can("dashboard")) {
    return <AdminLayout><div className="p-8 text-center text-muted-foreground">Executive access restricted.</div></AdminLayout>;
  }

  const products = sampleProducts;
  const totalRevenue = analyticsData.countryPerformance.reduce((s, c) => s + c.revenue, 0);
  const frozenCountries = Object.entries(countryFreeze).filter(([, v]) => v).map(([k]) => k);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const lowStock = products.filter((p) => {
    const s = productOverrides[p.id]?.inventory ?? p.inventory;
    return s > 0 && s <= settings.lowStockThreshold;
  }).length;
  const soldOut = products.filter((p) => (productOverrides[p.id]?.inventory ?? p.inventory) === 0 || productOverrides[p.id]?.sold).length;

  const regions = analyticsData.countryPerformance
    .sort((a, b) => b.revenue - a.revenue)
    .map((c, i) => ({ ...c, rank: i + 1 }));

  const riskScore = (globalFreeze ? 30 : 0) + (frozenCountries.length * 5) + (lowStock * 2) + (soldOut * 3) + (pendingOrders * 2);
  const riskLevel = riskScore > 40 ? "critical" : riskScore > 20 ? "elevated" : riskScore > 5 ? "moderate" : "low";
  const riskColors = { critical: "text-destructive", elevated: "text-accent", moderate: "text-muted-foreground", low: "text-foreground" };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Executive Command Center</h1>
            <p className="text-muted-foreground mt-1">CEO-level strategic overview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`text-xs px-3 py-1.5 border ${riskLevel === "low" ? "border-border" : riskLevel === "critical" ? "border-destructive bg-destructive/5" : "border-accent bg-accent/5"}`}>
              Risk Level: <span className={`font-medium uppercase ${riskColors[riskLevel]}`}>{riskLevel}</span>
            </div>
          </div>
        </div>

        {/* Strategic KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Global Revenue" value={`€${totalRevenue.toLocaleString()}`} icon={<DollarSign className="h-5 w-5" />} trend="up" trendValue="+14.2%" />
          <MetricCard label="Active Markets" value={`${Object.values(countryFreeze).filter((f) => !f).length}`} icon={<Globe className="h-5 w-5" />} />
          <MetricCard label="Pending Approvals" value={pendingOrders.toString()} icon={<Clock className="h-5 w-5" />} />
          <MetricCard label="Inventory Alerts" value={`${lowStock + soldOut}`} icon={<Package className="h-5 w-5" />} subValue={`${lowStock} low · ${soldOut} sold out`} />
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Freeze Status */}
          <div className="border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4" />
              <h3 className="text-caption">Freeze Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Global Commerce</span>
                <span className={globalFreeze ? "text-destructive font-medium" : "text-muted-foreground"}>
                  {globalFreeze ? "FROZEN" : "Active"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Inventory</span>
                <span className={inventoryFreeze ? "text-destructive font-medium" : "text-muted-foreground"}>
                  {inventoryFreeze ? "FROZEN" : "Active"}
                </span>
              </div>
              {frozenCountries.length > 0 && (
                <div className="text-xs text-destructive mt-2">
                  Frozen: {frozenCountries.join(", ")}
                </div>
              )}
            </div>
          </div>

          {/* Compliance */}
          <div className="border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4" />
              <h3 className="text-caption">Compliance Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Approvals</span>
                <span className={approvalRequired ? "text-foreground" : "text-accent"}>
                  {approvalRequired ? "Required" : "Bypassed"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Emergency Banner</span>
                <span className={emergencyBanner ? "text-accent" : "text-muted-foreground"}>
                  {emergencyBanner ? "Active" : "Off"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Maintenance</span>
                <span className={settings.maintenanceMode ? "text-destructive" : "text-muted-foreground"}>
                  {settings.maintenanceMode ? "ON" : "Off"}
                </span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4" />
              <h3 className="text-caption">Performance Mode</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Mode</span>
                <span className="font-medium capitalize">{localStorage.getItem("amarise-perf-mode") || "standard"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Reduced Motion</span>
                <span className="text-muted-foreground">{localStorage.getItem("amarise-reduced-motion") === "true" ? "On" : "Off"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Region Ranking */}
        <div className="border border-border bg-card p-6">
          <h3 className="text-caption mb-4">Region Revenue Ranking</h3>
          <div className="space-y-3">
            {regions.map((r) => {
              const maxRev = regions[0].revenue;
              return (
                <div key={r.countryCode} className="flex items-center gap-4">
                  <span className="w-6 text-sm font-medium text-muted-foreground">#{r.rank}</span>
                  <span className="w-32 text-sm">{r.country}</span>
                  <div className="flex-1 h-6 bg-muted relative overflow-hidden">
                    <div
                      className="h-full transition-all duration-700"
                      style={{ width: `${(r.revenue / maxRev) * 100}%`, background: "hsl(42, 35%, 60%)" }}
                    />
                  </div>
                  <span className="text-sm font-medium w-24 text-right">€{r.revenue.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground w-12 text-right">+{r.growth}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Overrides */}
        <div className="border border-border bg-card p-6">
          <h3 className="text-caption mb-4">Quick Override Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant={globalFreeze ? "destructive" : "outline"}
              onClick={() => { setGlobalFreeze(!globalFreeze); toast.success(globalFreeze ? "Commerce resumed" : "Commerce frozen"); }}
              className="h-auto py-4 flex-col gap-1"
            >
              <Lock className="w-5 h-5" />
              <span className="text-xs">{globalFreeze ? "Unfreeze Commerce" : "Emergency Freeze"}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-1" onClick={() => toast.info("Navigate to /admin/governance for full controls")}>
              <Shield className="w-5 h-5" />
              <span className="text-xs">Governance Panel</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-1" onClick={() => toast.info("Navigate to /admin/analytics for full analytics")}>
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Full Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-1" onClick={() => toast.info("Navigate to /admin/inventory for stock control")}>
              <Package className="w-5 h-5" />
              <span className="text-xs">Inventory Control</span>
            </Button>
          </div>
        </div>

        {/* Recent Audit */}
        <div className="border border-border bg-card">
          <div className="p-4 border-b border-border">
            <h3 className="text-caption">Recent Strategic Actions</h3>
          </div>
          <div className="divide-y divide-border max-h-64 overflow-auto">
            {auditLog.slice(0, 8).map((entry) => (
              <div key={entry.id} className="p-3 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{entry.action}</p>
                  <p className="text-xs text-muted-foreground">{entry.entity} · {entry.detail}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 capitalize">{entry.role.replace("-", " ")}</span>
              </div>
            ))}
            {auditLog.length === 0 && (
              <div className="p-6 text-center text-sm text-muted-foreground">No strategic actions recorded</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
