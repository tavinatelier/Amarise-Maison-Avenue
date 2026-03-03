import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { useAdminStore } from "@/stores/adminStore";
import {
  BarChart3, TrendingUp, Globe, Users, ShoppingCart, DollarSign,
  Download, Filter, ArrowUpRight, ArrowDownRight, Monitor, Smartphone, Tablet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import analyticsData from "@/data/mock/analytics.json";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Funnel, FunnelChart,
  LabelList, AreaChart, Area,
} from "recharts";

const TIME_RANGES = ["7d", "30d", "90d", "1y"] as const;
type TimeRange = typeof TIME_RANGES[number];

const CHART_COLORS = [
  "hsl(42, 35%, 60%)", "hsl(0, 0%, 20%)", "hsl(35, 8%, 55%)",
  "hsl(12, 20%, 75%)", "hsl(42, 35%, 45%)", "hsl(0, 0%, 40%)",
];

function generateRevenueTrend(range: TimeRange) {
  const points = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 12 : 12;
  const labels = range === "7d"
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : range === "30d"
    ? Array.from({ length: 30 }, (_, i) => `D${i + 1}`)
    : range === "90d"
    ? ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"]
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return labels.slice(0, points).map((label) => ({
    name: label,
    revenue: Math.round(8000 + Math.random() * 18000),
    orders: Math.round(15 + Math.random() * 45),
  }));
}

function generateAOVTrend() {
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => ({
    name: m,
    aov: Math.round(520 + Math.random() * 200),
  }));
}

export default function AnalyticsDashboard() {
  const { can } = useAdminStore();
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [revenueTrend, setRevenueTrend] = useState(generateRevenueTrend("30d"));
  const [aovTrend] = useState(generateAOVTrend);
  const [liveRevenue, setLiveRevenue] = useState(285400);

  useEffect(() => {
    setRevenueTrend(generateRevenueTrend(timeRange));
  }, [timeRange]);

  // Simulated real-time revenue tick
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRevenue((prev) => prev + Math.round(Math.random() * 150));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!can("dashboard")) {
    return <AdminLayout><div className="p-8 text-center text-muted-foreground">Analytics access restricted.</div></AdminLayout>;
  }

  const funnel = analyticsData.funnel;
  const countries = analyticsData.countryPerformance;
  const traffic = analyticsData.trafficSources;
  const devices = analyticsData.deviceBreakdown;
  const products = analyticsData.productPerformance;

  const filteredCountries = countryFilter === "all"
    ? countries
    : countries.filter((c) => c.countryCode === countryFilter);

  const totalRevenue = filteredCountries.reduce((s, c) => s + c.revenue, 0);
  const totalSessions = filteredCountries.reduce((s, c) => s + c.sessions, 0);
  const avgConversion = filteredCountries.reduce((s, c) => s + c.conversionRate, 0) / (filteredCountries.length || 1);

  const funnelData = funnel.stages.map((s) => ({ name: s.name, value: s.value, fill: CHART_COLORS[0] }));

  const trafficData = Object.entries(traffic).map(([key, val]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    sessions: (val as { sessions: number }).sessions,
    conversion: (val as { conversionRate: number }).conversionRate,
  }));

  const deviceData = Object.entries(devices).map(([key, val], i) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: (val as { sessions: number }).sessions,
    fill: CHART_COLORS[i],
  }));

  const handleExportCSV = () => {
    const header = "Country,Sessions,Conversion,AOV,Revenue,Growth\n";
    const rows = countries.map((c) => `${c.country},${c.sessions},${c.conversionRate}%,${c.avgOrderValue},${c.revenue},${c.growth}%`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `amarise-analytics-${timeRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Analytics exported to CSV");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Analytics Command Center</h1>
            <p className="text-muted-foreground mt-1">Real-time performance intelligence</p>
          </div>
          <div className="flex items-center gap-2">
            {TIME_RANGES.map((r) => (
              <Button
                key={r}
                variant={timeRange === r ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(r)}
                className="text-xs"
              >
                {r}
              </Button>
            ))}
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="w-3.5 h-3.5 mr-1" /> Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard
            label="Live Revenue"
            value={`€${liveRevenue.toLocaleString()}`}
            icon={<DollarSign className="h-5 w-5" />}
            trend="up"
            trendValue="+12.4%"
          />
          <MetricCard label="Sessions" value={totalSessions.toLocaleString()} icon={<Users className="h-5 w-5" />} trend="up" trendValue="+8.2%" />
          <MetricCard label="Conversion" value={`${avgConversion.toFixed(1)}%`} icon={<TrendingUp className="h-5 w-5" />} trend="up" trendValue="+0.3%" />
          <MetricCard label="AOV" value="€617" icon={<ShoppingCart className="h-5 w-5" />} trend="up" trendValue="+5.1%" />
          <MetricCard label="Orders" value="2,450" icon={<ShoppingCart className="h-5 w-5" />} />
          <MetricCard label="Countries" value={countries.length.toString()} icon={<Globe className="h-5 w-5" />} />
        </div>

        {/* Revenue Trend */}
        <div className="border border-border bg-card p-6">
          <h3 className="text-caption mb-4">Revenue & Orders Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" />
              <Tooltip
                contentStyle={{ background: "hsl(42, 28%, 96%)", border: "1px solid hsl(40, 20%, 88%)", fontSize: 12 }}
              />
              <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="hsl(42, 35%, 60%)" fill="hsl(42, 35%, 60%)" fillOpacity={0.15} strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="hsl(0, 0%, 20%)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conversion Funnel */}
          <div className="border border-border bg-card p-6">
            <h3 className="text-caption mb-4">Conversion Funnel</h3>
            <div className="space-y-3">
              {funnel.stages.map((stage, i) => {
                const pct = (stage.value / funnel.stages[0].value) * 100;
                return (
                  <div key={stage.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{stage.name}</span>
                      <span className="font-medium">{stage.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted h-6 relative overflow-hidden">
                      <div
                        className="h-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: `hsl(42, 35%, ${60 - i * 5}%)`,
                        }}
                      />
                      {stage.dropOff > 0 && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                          -{stage.dropOff}%
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-6 mt-4 text-sm">
              <div>
                <span className="text-muted-foreground">Conversion: </span>
                <span className="font-medium">{funnel.conversionRate}%</span>
              </div>
              <div>
                <span className="text-muted-foreground">Cart Abandonment: </span>
                <span className="font-medium">{funnel.cartAbandonmentRate}%</span>
              </div>
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="border border-border bg-card p-6">
            <h3 className="text-caption mb-4">Device Breakdown</h3>
            <div className="flex items-center gap-8">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={deviceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                    {deviceData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 flex-1">
                {Object.entries(devices).map(([key, val], i) => {
                  const d = val as { sessions: number; percentage: number; conversionRate: number };
                  const Icon = key === "desktop" ? Monitor : key === "mobile" ? Smartphone : Tablet;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-3 h-3" style={{ background: CHART_COLORS[i] }} />
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{key}</span>
                          <span>{d.percentage}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Conv: {d.conversionRate}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Country Performance */}
        <div className="border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-caption">Country Performance</h3>
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="text-xs border border-border bg-background px-2 py-1"
            >
              <option value="all">All Countries</option>
              {countries.map((c) => (
                <option key={c.countryCode} value={c.countryCode}>{c.country}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={filteredCountries}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
              <XAxis dataKey="country" tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" />
              <Tooltip contentStyle={{ background: "hsl(42, 28%, 96%)", border: "1px solid hsl(40, 20%, 88%)", fontSize: 12 }} />
              <Bar dataKey="revenue" fill="hsl(42, 35%, 60%)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left py-2">Country</th>
                  <th className="text-right py-2">Sessions</th>
                  <th className="text-right py-2">Conv %</th>
                  <th className="text-right py-2">AOV</th>
                  <th className="text-right py-2">Revenue</th>
                  <th className="text-right py-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                {filteredCountries.map((c) => (
                  <tr key={c.countryCode} className="border-b border-border/50">
                    <td className="py-2 font-medium">{c.country}</td>
                    <td className="text-right py-2">{c.sessions.toLocaleString()}</td>
                    <td className="text-right py-2">{c.conversionRate}%</td>
                    <td className="text-right py-2">€{c.avgOrderValue}</td>
                    <td className="text-right py-2">€{c.revenue.toLocaleString()}</td>
                    <td className="text-right py-2">
                      <span className="inline-flex items-center gap-0.5 text-xs">
                        {c.growth > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {c.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources + Product Heatmap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-border bg-card p-6">
            <h3 className="text-caption mb-4">Traffic Sources</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trafficData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" width={60} />
                <Tooltip contentStyle={{ background: "hsl(42, 28%, 96%)", border: "1px solid hsl(40, 20%, 88%)", fontSize: 12 }} />
                <Bar dataKey="sessions" fill="hsl(42, 35%, 60%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border border-border bg-card p-6">
            <h3 className="text-caption mb-4">Product Heatmap</h3>
            <div className="space-y-2">
              {products.map((p) => {
                const maxRevenue = Math.max(...products.map((x) => x.revenue));
                const intensity = p.revenue / maxRevenue;
                return (
                  <div key={p.productId} className="flex items-center gap-3">
                    <div className="w-32 text-xs truncate">{p.title}</div>
                    <div className="flex-1 h-8 bg-muted relative overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${intensity * 100}%`,
                          background: `hsl(42, 35%, ${75 - intensity * 35}%)`,
                        }}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium">
                        €{p.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground w-16 text-right">{p.conversionRate}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* AOV Trend */}
        <div className="border border-border bg-card p-6">
          <h3 className="text-caption mb-4">Average Order Value Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={aovTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(35, 8%, 55%)" domain={[400, 800]} />
              <Tooltip contentStyle={{ background: "hsl(42, 28%, 96%)", border: "1px solid hsl(40, 20%, 88%)", fontSize: 12 }} />
              <Line type="monotone" dataKey="aov" stroke="hsl(0, 0%, 20%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(42, 35%, 60%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Thresholds */}
        <div className="border border-border bg-card p-6">
          <h3 className="text-caption mb-3">Alert Thresholds</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Conversion Drop", threshold: "< 3%", status: avgConversion > 3, current: `${avgConversion.toFixed(1)}%` },
              { label: "Cart Abandonment", threshold: "> 70%", status: funnel.cartAbandonmentRate < 70, current: `${funnel.cartAbandonmentRate}%` },
              { label: "Return Rate", threshold: "> 10%", status: true, current: "3.2%" },
            ].map((alert) => (
              <div key={alert.label} className={`p-3 border ${alert.status ? "border-border" : "border-destructive bg-destructive/5"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{alert.label}</span>
                  <span className={`text-xs px-2 py-0.5 ${alert.status ? "bg-muted text-muted-foreground" : "bg-destructive/10 text-destructive"}`}>
                    {alert.status ? "OK" : "ALERT"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Threshold: {alert.threshold} · Current: {alert.current}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
