import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function SystemSettings() {
  const { settings, updateSettings, can } = useAdminStore();

  if (!can("settings")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">System settings restricted to Founders.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">System Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Global platform configuration</p>
        </div>

        <div className="space-y-4 max-w-2xl">
          <div className="border border-border p-4 bg-card">
            <label className="text-xs text-muted-foreground">Brand Name</label>
            <Input
              value={settings.brandName}
              onChange={(e) => updateSettings({ brandName: e.target.value })}
              className="mt-1"
            />
          </div>

          <div className="border border-border p-4 bg-card">
            <label className="text-xs text-muted-foreground">Site Announcement</label>
            <Input
              value={settings.siteAnnouncement}
              onChange={(e) => updateSettings({ siteAnnouncement: e.target.value })}
              placeholder="Optional site-wide announcement banner"
              className="mt-1"
            />
          </div>

          <div className="border border-border p-4 bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Maintenance Mode</p>
                <p className="text-xs text-muted-foreground">Redirects all traffic to maintenance page</p>
              </div>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(v) => { updateSettings({ maintenanceMode: v }); toast.success(v ? "Maintenance mode enabled" : "Maintenance mode disabled"); }}
            />
          </div>

          <div className="border border-border p-4 bg-card">
            <label className="text-xs text-muted-foreground">Default Currency</label>
            <select
              value={settings.defaultCurrency}
              onChange={(e) => { updateSettings({ defaultCurrency: e.target.value }); toast.success("Default currency updated"); }}
              className="w-full mt-1 px-3 py-2 border border-border bg-background text-sm"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-border p-4 bg-card">
              <label className="text-xs text-muted-foreground">Tax Rate (%)</label>
              <Input
                type="number"
                min={0}
                max={50}
                value={settings.taxPercent}
                onChange={(e) => updateSettings({ taxPercent: parseInt(e.target.value) || 0 })}
                className="mt-1"
              />
            </div>
            <div className="border border-border p-4 bg-card">
              <label className="text-xs text-muted-foreground">Low Stock Threshold</label>
              <Input
                type="number"
                min={1}
                value={settings.lowStockThreshold}
                onChange={(e) => updateSettings({ lowStockThreshold: parseInt(e.target.value) || 5 })}
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={() => toast.success("Settings saved")} className="w-full">
            <Settings className="w-4 h-4 mr-2" /> Save Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
