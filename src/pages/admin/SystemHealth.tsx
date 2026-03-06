import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Server, Database, CreditCard, Mail, Globe, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import systemData from "@/data/mock/system.json";

const serviceIcons: Record<string, typeof Server> = {
  api: Server,
  database: Database,
  payments: CreditCard,
  email: Mail,
  cdn: Globe,
};

const statusBadge: Record<string, { className: string; icon: typeof CheckCircle }> = {
  healthy: { className: "bg-emerald-500/10 text-emerald-700 border-emerald-200", icon: CheckCircle },
  degraded: { className: "bg-amber-500/10 text-amber-700 border-amber-200", icon: AlertTriangle },
  down: { className: "bg-red-500/10 text-red-700 border-red-200", icon: AlertTriangle },
};

const performanceMetrics = [
  { label: "Avg Response Time", value: "142ms", target: "< 200ms", status: "good" },
  { label: "Error Rate", value: "0.02%", target: "< 0.1%", status: "good" },
  { label: "Throughput", value: "1,240 req/s", target: "> 1,000 req/s", status: "good" },
  { label: "Cache Hit Rate", value: "94.2%", target: "> 90%", status: "good" },
  { label: "Database Connections", value: "42/100", target: "< 80/100", status: "good" },
  { label: "Memory Usage", value: "67%", target: "< 85%", status: "warning" },
];

export default function SystemHealth() {
  const health = systemData.systemHealth;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">System Health</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time monitoring of platform infrastructure and services.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
              <div>
                <p className="text-lg font-semibold text-emerald-700">All Systems Operational</p>
                <p className="text-xs text-emerald-600">Last checked: {new Date().toLocaleTimeString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-semibold">99.97%</p>
                <p className="text-xs text-muted-foreground">30-Day Uptime</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Activity className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-semibold">0</p>
                <p className="text-xs text-muted-foreground">Active Incidents</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Service Status</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(health).map(([key, service]) => {
                const Icon = serviceIcons[key] || Server;
                const badge = statusBadge[service.status] || statusBadge.healthy;
                const StatusIcon = badge.icon;
                return (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm capitalize">{key}</p>
                        <p className="text-xs text-muted-foreground">{service.latency}ms latency · {service.uptime}% uptime</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={badge.className}>
                        <StatusIcon className="h-3 w-3 mr-1" /> {service.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Performance Metrics</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceMetrics.map(metric => (
                <div key={metric.label} className="p-3 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="text-lg font-semibold mt-1">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Target: {metric.target}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Maintenance Schedule</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {systemData.maintenanceSchedule.map(maint => (
                <div key={maint.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{maint.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{maint.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(maint.scheduledStart).toLocaleDateString()} {new Date(maint.scheduledStart).toLocaleTimeString()} — {new Date(maint.scheduledEnd).toLocaleTimeString()}
                      </p>
                    </div>
                    <Badge variant="outline">{maint.status}</Badge>
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
