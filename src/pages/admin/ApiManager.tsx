import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plug, Key, Activity, Shield, Plus, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ApiIntegration {
  id: string;
  name: string;
  provider: string;
  status: "connected" | "disconnected" | "error";
  type: "payment" | "shipping" | "analytics" | "email" | "storage" | "search";
  lastSync: string | null;
  apiVersion: string;
  enabled: boolean;
}

const initialIntegrations: ApiIntegration[] = [
  { id: "api-1", name: "Stripe Payments", provider: "Stripe", status: "connected", type: "payment", lastSync: "2025-03-06T09:00:00Z", apiVersion: "v1", enabled: true },
  { id: "api-2", name: "DHL Shipping", provider: "DHL", status: "connected", type: "shipping", lastSync: "2025-03-06T08:45:00Z", apiVersion: "v2.1", enabled: true },
  { id: "api-3", name: "Google Analytics 4", provider: "Google", status: "connected", type: "analytics", lastSync: "2025-03-06T09:15:00Z", apiVersion: "v4", enabled: true },
  { id: "api-4", name: "SendGrid Email", provider: "SendGrid", status: "connected", type: "email", lastSync: "2025-03-06T07:30:00Z", apiVersion: "v3", enabled: true },
  { id: "api-5", name: "Cloudinary Media", provider: "Cloudinary", status: "disconnected", type: "storage", lastSync: null, apiVersion: "v1.1", enabled: false },
  { id: "api-6", name: "Algolia Search", provider: "Algolia", status: "error", type: "search", lastSync: "2025-03-05T22:00:00Z", apiVersion: "v1", enabled: true },
];

const apiKeys = [
  { id: "key-1", name: "Production API Key", prefix: "amr_live_", created: "2025-01-15", lastUsed: "2025-03-06", status: "active" },
  { id: "key-2", name: "Staging API Key", prefix: "amr_test_", created: "2025-02-01", lastUsed: "2025-03-05", status: "active" },
  { id: "key-3", name: "Webhook Secret", prefix: "whsec_", created: "2025-01-15", lastUsed: "2025-03-06", status: "active" },
];

const statusColor: Record<string, string> = {
  connected: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  disconnected: "bg-muted text-muted-foreground border-border",
  error: "bg-red-500/10 text-red-700 border-red-200",
};

export default function ApiManager() {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, enabled: !i.enabled, status: !i.enabled ? "connected" : "disconnected" } : i));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">API Integrations</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage third-party API connections and credentials.</p>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-4 flex items-center gap-3"><Plug className="h-5 w-5 text-emerald-600" /><div><p className="text-2xl font-semibold">{integrations.filter(i => i.status === "connected").length}</p><p className="text-xs text-muted-foreground">Connected</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><Activity className="h-5 w-5 text-red-500" /><div><p className="text-2xl font-semibold">{integrations.filter(i => i.status === "error").length}</p><p className="text-xs text-muted-foreground">Errors</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><Key className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">{apiKeys.length}</p><p className="text-xs text-muted-foreground">API Keys</p></div></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Integrations</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {integrations.map(api => (
                <div key={api.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-muted"><Plug className="h-4 w-4" /></div>
                    <div>
                      <p className="font-medium text-sm">{api.name}</p>
                      <p className="text-xs text-muted-foreground">{api.provider} · {api.apiVersion} · {api.lastSync ? `Synced ${new Date(api.lastSync).toLocaleDateString()}` : "Never synced"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={statusColor[api.status]}>{api.status}</Badge>
                    <Switch checked={api.enabled} onCheckedChange={() => toggleIntegration(api.id)} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> API Keys</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Key</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Created</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Last Used</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr></thead>
                <tbody>
                  {apiKeys.map(k => (
                    <tr key={k.id} className="border-b border-border/50">
                      <td className="p-3 font-medium">{k.name}</td>
                      <td className="p-3 font-mono text-xs text-muted-foreground">{k.prefix}••••••••</td>
                      <td className="p-3 hidden sm:table-cell text-muted-foreground">{k.created}</td>
                      <td className="p-3 hidden sm:table-cell text-muted-foreground">{k.lastUsed}</td>
                      <td className="p-3"><Button variant="ghost" size="sm" onClick={() => toast.success("Key copied to clipboard")}><Copy className="h-3 w-3" /></Button></td>
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
