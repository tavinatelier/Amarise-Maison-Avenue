import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Zap, Mail, Bell, ShoppingCart, Package, Clock, Plus } from "lucide-react";
import { useState } from "react";

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  runs: number;
  lastRun: string | null;
  icon: typeof Zap;
}

const initialAutomations: Automation[] = [
  { id: "auto-1", name: "Abandoned Cart Recovery", description: "Send email 2h after cart abandonment", trigger: "Cart abandoned > 2 hours", action: "Send recovery email", enabled: true, runs: 342, lastRun: "2025-03-06T08:30:00Z", icon: ShoppingCart },
  { id: "auto-2", name: "Low Stock Alert", description: "Notify ops when stock < 10 units", trigger: "Stock level < 10", action: "Slack + email notification", enabled: true, runs: 28, lastRun: "2025-03-05T14:00:00Z", icon: Package },
  { id: "auto-3", name: "Order Confirmation", description: "Send confirmation email on order creation", trigger: "Order created", action: "Send confirmation email", enabled: true, runs: 1247, lastRun: "2025-03-06T09:15:00Z", icon: Mail },
  { id: "auto-4", name: "Shipping Update", description: "Notify customer when order ships", trigger: "Fulfillment status → shipped", action: "Send shipping email + SMS", enabled: true, runs: 986, lastRun: "2025-03-06T07:45:00Z", icon: Bell },
  { id: "auto-5", name: "VIP Upgrade Check", description: "Auto-upgrade tier when lifetime spend threshold met", trigger: "Lifetime spend > threshold", action: "Upgrade VIP tier", enabled: false, runs: 15, lastRun: "2025-02-28T12:00:00Z", icon: Zap },
  { id: "auto-6", name: "Review Request", description: "Send review request 7 days after delivery", trigger: "Order delivered > 7 days", action: "Send review request email", enabled: false, runs: 0, lastRun: null, icon: Clock },
];

export default function AutomationCenter() {
  const [automations, setAutomations] = useState(initialAutomations);

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const activeCount = automations.filter(a => a.enabled).length;
  const totalRuns = automations.reduce((s, a) => s + a.runs, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Automation Center</h1>
            <p className="text-sm text-muted-foreground mt-1">Configure automated workflows for commerce operations.</p>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Automation
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-4"><p className="text-2xl font-semibold">{activeCount}</p><p className="text-xs text-muted-foreground">Active Automations</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-2xl font-semibold">{automations.length - activeCount}</p><p className="text-xs text-muted-foreground">Paused</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-2xl font-semibold">{totalRuns.toLocaleString()}</p><p className="text-xs text-muted-foreground">Total Executions</p></CardContent></Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {automations.map(auto => (
            <Card key={auto.id} className={!auto.enabled ? "opacity-60" : ""}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-muted">
                      <auto.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{auto.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">{auto.description}</p>
                    </div>
                  </div>
                  <Switch checked={auto.enabled} onCheckedChange={() => toggleAutomation(auto.id)} />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trigger</span>
                    <span className="font-medium">{auto.trigger}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Action</span>
                    <span className="font-medium">{auto.action}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Executions</span>
                    <span className="font-medium">{auto.runs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Run</span>
                    <span className="font-medium">{auto.lastRun ? new Date(auto.lastRun).toLocaleDateString() : "Never"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
