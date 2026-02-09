import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { IncidentPanel } from "@/components/governance/IncidentPanel";
import dashboardData from "@/data/mock/admin-dashboard.json";
import { IncidentStatus, IncidentSeverity } from "@/types/admin";
import { toast } from "@/hooks/use-toast";

export default function AdminIncidents() {
  const [incidentStatus, setIncidentStatus] = useState<IncidentStatus>(
    dashboardData.incident as IncidentStatus
  );

  const handleActivate = (severity: IncidentSeverity, message: string) => {
    setIncidentStatus({
      isActive: true,
      severity,
      message,
      activatedAt: new Date().toISOString(),
      activatedBy: "Current Admin",
      freezeCheckout: severity === "critical",
      freezeRefunds: severity === "critical" || severity === "high",
      freezePrices: true,
      freezeCMS: severity === "critical",
    });
    toast({
      title: "Incident Mode Activated",
      description: `Incident mode has been activated with ${severity} severity.`,
      variant: "destructive",
    });
  };

  const handleDeactivate = () => {
    setIncidentStatus({
      isActive: false,
      severity: "low",
      freezeCheckout: false,
      freezeRefunds: false,
      freezePrices: false,
      freezeCMS: false,
    });
    toast({
      title: "Incident Mode Deactivated",
      description: "All systems have returned to normal operation.",
    });
  };

  const handleUpdateFreeze = (key: keyof IncidentStatus, value: boolean) => {
    setIncidentStatus((prev) => ({
      ...prev,
      [key]: value,
    }));
    toast({
      title: "Freeze Control Updated",
      description: `${key.replace("freeze", "")} has been ${value ? "frozen" : "unfrozen"}.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light tracking-tight">
            Incident Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Emergency controls and crisis management
          </p>
        </div>

        {/* Incident Panel */}
        <div className="max-w-2xl">
          <IncidentPanel
            status={incidentStatus}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
            onUpdateFreeze={handleUpdateFreeze}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
