/**
 * SYSTEM CONTROL PAGE
 * Global system status and controls
 * 
 * BACKEND HANDOFF: Replace mock data with system.service.ts API calls
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Shield, 
  AlertTriangle, 
  Server, 
  Database, 
  CreditCard, 
  Mail, 
  Globe,
  Power,
  Settings,
  Flag
} from "lucide-react";
import { toast } from "sonner";
import systemData from "@/data/mock/system.json";

export default function System() {
  const navigate = useNavigate();
  const [killSwitchEnabled, setKillSwitchEnabled] = useState(systemData.killSwitch.enabled);
  const [maintenanceMode, setMaintenanceMode] = useState(systemData.globalStatus.maintenanceMode);

  const handleKillSwitch = (enabled: boolean) => {
    if (enabled) {
      toast.error("Kill switch activated - all commerce operations paused", {
        duration: 5000,
      });
    } else {
      toast.success("Kill switch deactivated - commerce operations resumed");
    }
    setKillSwitchEnabled(enabled);
  };

  const handleMaintenanceMode = (enabled: boolean) => {
    if (enabled) {
      toast.warning("Maintenance mode enabled");
    } else {
      toast.success("Maintenance mode disabled");
    }
    setMaintenanceMode(enabled);
  };

  const healthIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    api: Server,
    database: Database,
    payments: CreditCard,
    email: Mail,
    cdn: Globe,
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">System Control</h1>
            <p className="text-muted-foreground mt-1">
              Global system status and emergency controls
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/system/flags")}>
              <Flag className="h-4 w-4 mr-2" />
              Feature Flags
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/system/maintenance")}>
              <Settings className="h-4 w-4 mr-2" />
              Maintenance
            </Button>
          </div>
        </div>

        {/* Critical Alerts */}
        {killSwitchEnabled && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Kill Switch Active</AlertTitle>
            <AlertDescription>
              All commerce operations are currently paused. New orders cannot be placed.
            </AlertDescription>
          </Alert>
        )}

        {maintenanceMode && (
          <Alert>
            <Settings className="h-4 w-4" />
            <AlertTitle>Maintenance Mode</AlertTitle>
            <AlertDescription>
              The storefront is displaying a maintenance message to customers.
            </AlertDescription>
          </Alert>
        )}

        {/* System Health */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">System Health</CardTitle>
            <CardDescription>Real-time status of all system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {Object.entries(systemData.systemHealth).map(([service, health]) => {
                const Icon = healthIcons[service] || Server;
                return (
                  <div key={service} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium capitalize">{service}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <StatusBadge
                          status={health.status}
                          variant={health.status === "healthy" ? "success" : "error"}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Latency</span>
                        <span>{health.latency}ms</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Uptime</span>
                        <span>{health.uptime}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Controls */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-border border-rose-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Power className="h-5 w-5 text-rose-600" />
                Global Kill Switch
              </CardTitle>
              <CardDescription>
                Immediately pause all commerce operations across all countries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-rose-50 rounded-lg">
                <div>
                  <p className="font-medium">Kill Switch</p>
                  <p className="text-sm text-muted-foreground">
                    {killSwitchEnabled ? "All operations paused" : "Operations running normally"}
                  </p>
                </div>
                <Switch
                  checked={killSwitchEnabled}
                  onCheckedChange={handleKillSwitch}
                  className="data-[state=checked]:bg-rose-600"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Maintenance Mode
              </CardTitle>
              <CardDescription>
                Display maintenance message to customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
                    {maintenanceMode ? "Maintenance page shown" : "Store accessible"}
                  </p>
                </div>
                <Switch
                  checked={maintenanceMode}
                  onCheckedChange={handleMaintenanceMode}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Country Controls */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Country Controls</CardTitle>
            <CardDescription>Enable or disable operations per country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemData.countryControls.map((country) => (
                <div key={country.countryCode} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getFlagEmoji(country.countryCode)}</span>
                    <div>
                      <p className="font-medium">{country.country}</p>
                      {country.notes && (
                        <p className="text-sm text-muted-foreground">{country.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Sales</span>
                      <Switch checked={country.salesEnabled} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Checkout</span>
                      <Switch checked={country.checkoutEnabled} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Refunds</span>
                      <Switch checked={country.refundsEnabled} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Maintenance */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Scheduled Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemData.maintenanceSchedule.map((maint) => (
                <div key={maint.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">{maint.title}</p>
                    <p className="text-sm text-muted-foreground">{maint.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Affects: {maint.affectedServices.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={maint.status} variant="info" />
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(maint.scheduledStart).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function getFlagEmoji(countryCode: string): string {
  const flags: Record<string, string> = {
    FR: "🇫🇷",
    DE: "🇩🇪",
    GB: "🇬🇧",
    IT: "🇮🇹",
    ES: "🇪🇸",
    NL: "🇳🇱",
  };
  return flags[countryCode] || "🌍";
}
