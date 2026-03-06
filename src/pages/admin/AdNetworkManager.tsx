import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Megaphone, TrendingUp, Eye, MousePointerClick, Plus } from "lucide-react";
import { useState } from "react";

interface AdCampaign {
  id: string;
  name: string;
  platform: string;
  status: "active" | "paused" | "ended";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  startDate: string;
  endDate: string;
}

const campaigns: AdCampaign[] = [
  { id: "ad-1", name: "Spring Collection Launch", platform: "Meta Ads", status: "active", budget: 15000, spent: 8420, impressions: 420000, clicks: 12600, conversions: 189, roas: 4.2, startDate: "2025-02-15", endDate: "2025-03-31" },
  { id: "ad-2", name: "Radiance Serum — Search", platform: "Google Ads", status: "active", budget: 8000, spent: 5340, impressions: 180000, clicks: 7200, conversions: 108, roas: 3.8, startDate: "2025-02-01", endDate: "2025-04-30" },
  { id: "ad-3", name: "Brand Awareness — UK", platform: "Meta Ads", status: "active", budget: 5000, spent: 2100, impressions: 310000, clicks: 4650, conversions: 42, roas: 2.1, startDate: "2025-03-01", endDate: "2025-03-31" },
  { id: "ad-4", name: "Valentine's Day Gift Guide", platform: "Pinterest Ads", status: "ended", budget: 3000, spent: 3000, impressions: 95000, clicks: 2850, conversions: 57, roas: 3.5, startDate: "2025-02-01", endDate: "2025-02-14" },
  { id: "ad-5", name: "Retargeting — Cart Abandon", platform: "Google Ads", status: "paused", budget: 4000, spent: 1200, impressions: 45000, clicks: 1350, conversions: 27, roas: 5.1, startDate: "2025-02-20", endDate: "2025-03-20" },
];

const statusColor: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  paused: "bg-amber-500/10 text-amber-700 border-amber-200",
  ended: "bg-muted text-muted-foreground border-border",
};

export default function AdNetworkManager() {
  const totalSpend = campaigns.reduce((s, c) => s + c.spent, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
  const avgRoas = campaigns.filter(c => c.status === "active").reduce((s, c) => s + c.roas, 0) / campaigns.filter(c => c.status === "active").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Ad Network Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">Monitor and manage advertising campaigns across platforms.</p>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Campaign
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card><CardContent className="p-4 flex items-center gap-3"><Megaphone className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">{campaigns.filter(c => c.status === "active").length}</p><p className="text-xs text-muted-foreground">Active Campaigns</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><TrendingUp className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">€{totalSpend.toLocaleString()}</p><p className="text-xs text-muted-foreground">Total Spend</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><MousePointerClick className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">{totalConversions}</p><p className="text-xs text-muted-foreground">Conversions</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><Eye className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">{avgRoas.toFixed(1)}x</p><p className="text-xs text-muted-foreground">Avg ROAS</p></div></CardContent></Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium text-muted-foreground">Campaign</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Platform</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-3 font-medium text-muted-foreground hidden md:table-cell">Budget</th>
                    <th className="text-right p-3 font-medium text-muted-foreground hidden md:table-cell">Spent</th>
                    <th className="text-right p-3 font-medium text-muted-foreground hidden lg:table-cell">Impressions</th>
                    <th className="text-right p-3 font-medium text-muted-foreground hidden lg:table-cell">Conversions</th>
                    <th className="text-right p-3 font-medium text-muted-foreground">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(c => (
                    <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-3 font-medium">{c.name}</td>
                      <td className="p-3 hidden sm:table-cell text-muted-foreground">{c.platform}</td>
                      <td className="p-3"><Badge variant="outline" className={statusColor[c.status]}>{c.status}</Badge></td>
                      <td className="p-3 text-right hidden md:table-cell">€{c.budget.toLocaleString()}</td>
                      <td className="p-3 text-right hidden md:table-cell">€{c.spent.toLocaleString()}</td>
                      <td className="p-3 text-right hidden lg:table-cell">{c.impressions.toLocaleString()}</td>
                      <td className="p-3 text-right hidden lg:table-cell">{c.conversions}</td>
                      <td className="p-3 text-right font-medium">{c.roas}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
