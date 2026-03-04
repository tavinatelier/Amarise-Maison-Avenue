/**
 * AMARISÉ Admin — Holding: Country-Aware Analytics
 * Revenue, AOV, conversion, tax, and shipping data per country.
 */
import { useState, useMemo } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRIES } from '@/config/countries.config';
import { getEffectiveCountries } from '@/services/countryExpansion.service';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Globe, TrendingUp, DollarSign, ShoppingCart, Truck } from 'lucide-react';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', '#C9A96E', '#D4A5A5', '#6B7280', '#10B981', '#F59E0B'];

// Mock data generator
function generateCountryMetrics(countryId: string, range: string) {
  const seed = countryId.charCodeAt(0) + countryId.charCodeAt(1);
  const mult = range === '7d' ? 0.3 : range === '30d' ? 1 : range === '90d' ? 3 : 12;
  return {
    revenue: Math.round((seed * 1247 * mult) % 500000 + 50000),
    orders: Math.round((seed * 31 * mult) % 300 + 20),
    aov: Math.round((seed * 7) % 400 + 200),
    conversion: parseFloat(((seed * 0.03) % 5 + 1.5).toFixed(1)),
    taxCollected: Math.round((seed * 213 * mult) % 50000 + 5000),
    shippingCost: Math.round((seed * 47 * mult) % 10000 + 1000),
    returns: Math.round((seed * 3 * mult) % 20 + 2),
  };
}

export default function HoldingAnalytics() {
  const [range, setRange] = useState('30d');
  const [view, setView] = useState<'consolidated' | 'regional'>('consolidated');
  const countries = getEffectiveCountries().filter(c => c.active);

  const data = useMemo(() =>
    countries.map(c => ({
      ...c,
      metrics: generateCountryMetrics(c.id, range),
    })),
    [range, countries.length]
  );

  const totals = useMemo(() => ({
    revenue: data.reduce((s, d) => s + d.metrics.revenue, 0),
    orders: data.reduce((s, d) => s + d.metrics.orders, 0),
    aov: Math.round(data.reduce((s, d) => s + d.metrics.aov, 0) / (data.length || 1)),
    conversion: parseFloat((data.reduce((s, d) => s + d.metrics.conversion, 0) / (data.length || 1)).toFixed(1)),
    tax: data.reduce((s, d) => s + d.metrics.taxCollected, 0),
    shipping: data.reduce((s, d) => s + d.metrics.shippingCost, 0),
  }), [data]);

  const chartData = data.map(d => ({ name: d.code, revenue: d.metrics.revenue, orders: d.metrics.orders, aov: d.metrics.aov }));
  const pieData = data.map(d => ({ name: d.name, value: d.metrics.revenue }));

  // Simulated trend data
  const trendData = Array.from({ length: range === '7d' ? 7 : range === '30d' ? 30 : 12 }, (_, i) => {
    const point: Record<string, number | string> = { period: range === '90d' || range === '1y' ? `W${i + 1}` : `D${i + 1}` };
    data.forEach(d => { point[d.code] = Math.round(d.metrics.revenue / (range === '7d' ? 7 : range === '30d' ? 30 : 12) * (0.7 + Math.random() * 0.6)); });
    return point;
  });

  const exportCSV = () => {
    const header = 'Country,Revenue,Orders,AOV,Conversion,Tax,Shipping\n';
    const rows = data.map(d => `${d.name},${d.metrics.revenue},${d.metrics.orders},${d.metrics.aov},${d.metrics.conversion}%,${d.metrics.taxCollected},${d.metrics.shippingCost}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `amarise-country-analytics-${range}.csv`; a.click();
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Country Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Revenue, performance, and tax intelligence by region</p>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex gap-1">
          {['7d', '30d', '90d', '1y'].map(r => (
            <Button key={r} size="sm" variant={range === r ? 'default' : 'outline'} onClick={() => setRange(r)}>{r}</Button>
          ))}
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant={view === 'consolidated' ? 'default' : 'outline'} onClick={() => setView('consolidated')}>Consolidated</Button>
          <Button size="sm" variant={view === 'regional' ? 'default' : 'outline'} onClick={() => setView('regional')}>Regional</Button>
        </div>
        <Button size="sm" variant="outline" onClick={exportCSV} className="ml-auto">Export CSV</Button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `€${totals.revenue.toLocaleString()}`, icon: DollarSign },
          { label: 'Total Orders', value: totals.orders, icon: ShoppingCart },
          { label: 'Avg AOV', value: `€${totals.aov}`, icon: TrendingUp },
          { label: 'Avg Conversion', value: `${totals.conversion}%`, icon: TrendingUp },
          { label: 'Tax Collected', value: `€${totals.tax.toLocaleString()}`, icon: DollarSign },
          { label: 'Shipping Cost', value: `€${totals.shipping.toLocaleString()}`, icon: Truck },
        ].map((kpi, i) => (
          <Card key={i} className="p-4 text-center">
            <kpi.icon className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
            <p className="text-lg font-semibold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
          </Card>
        ))}
      </div>

      {view === 'consolidated' ? (
        <div className="space-y-6">
          {/* Revenue Trend */}
          <Card className="p-6">
            <h4 className="text-sm font-medium tracking-widest uppercase mb-4">Revenue Trend by Country</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  {data.map((d, i) => (
                    <Line key={d.code} type="monotone" dataKey={d.code} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Revenue Bar */}
            <Card className="p-6">
              <h4 className="text-sm font-medium tracking-widest uppercase mb-4">Revenue by Country</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Revenue Pie */}
            <Card className="p-6">
              <h4 className="text-sm font-medium tracking-widest uppercase mb-4">Revenue Distribution</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* Regional View — Per-Country Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map(d => (
            <Card key={d.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">{d.name}</h4>
                <Badge variant="outline">{d.currencySymbol} {d.currency}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div><p className="text-muted-foreground text-xs">Revenue</p><p className="font-medium">€{d.metrics.revenue.toLocaleString()}</p></div>
                <div><p className="text-muted-foreground text-xs">Orders</p><p className="font-medium">{d.metrics.orders}</p></div>
                <div><p className="text-muted-foreground text-xs">AOV</p><p className="font-medium">€{d.metrics.aov}</p></div>
                <div><p className="text-muted-foreground text-xs">Conversion</p><p className="font-medium">{d.metrics.conversion}%</p></div>
                <div><p className="text-muted-foreground text-xs">Tax</p><p className="font-medium">€{d.metrics.taxCollected.toLocaleString()}</p></div>
                <div><p className="text-muted-foreground text-xs">Shipping</p><p className="font-medium">€{d.metrics.shippingCost.toLocaleString()}</p></div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
