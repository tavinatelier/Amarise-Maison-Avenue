import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Shield, AlertTriangle, CheckCircle, XCircle, Clock, Lock, Globe, User, FileText,
} from "lucide-react";

// Mock governance data
const pendingApprovals = [
  { id: "APR-001", type: "Product Publish", item: "Aether Cashmere Coat", requestedBy: "Merchandising Manager", date: "2025-02-28", priority: "high" },
  { id: "APR-002", type: "Price Change", item: "Lumière Tote — EUR region", requestedBy: "Regional Director", date: "2025-02-27", priority: "medium" },
  { id: "APR-003", type: "Content Publish", item: "Spring 2025 Lookbook", requestedBy: "Editorial Lead", date: "2025-02-26", priority: "low" },
];

const countryFreezeStatus: Record<string, boolean> = {
  US: false, GB: false, FR: false, DE: false, IN: false, AE: false, JP: false, AU: false, CA: false, IT: false,
};

const auditLog = [
  { time: "14:32", action: "Product published", user: "Global Director", detail: "Nocturne Velvet Blazer → Active" },
  { time: "13:15", action: "Price override applied", user: "Founder", detail: "Aura Stiletto Pump — AED +5%" },
  { time: "11:48", action: "Country freeze toggled", user: "Global Director", detail: "Japan → Frozen" },
  { time: "10:02", action: "Approval granted", user: "Founder", detail: "Spring 2025 Collection → Published" },
  { time: "09:30", action: "Incident created", user: "System", detail: "Low inventory alert — 3 SKUs below threshold" },
];

const incidents = [
  { id: "INC-001", title: "Low inventory — 3 SKUs below threshold", severity: "warning", status: "open", created: "2025-02-28" },
  { id: "INC-002", title: "Region shipping delay — Japan", severity: "info", status: "monitoring", created: "2025-02-27" },
];

type AdminRole = "founder" | "global-director" | "merchandising-manager" | "support-agent";

const rolePermissions: Record<AdminRole, string[]> = {
  founder: ["governance", "approvals", "freeze", "incidents", "audit", "override"],
  "global-director": ["governance", "approvals", "freeze", "incidents", "audit"],
  "merchandising-manager": ["approvals", "audit"],
  "support-agent": ["audit"],
};

export default function Governance() {
  const [globalFreeze, setGlobalFreeze] = useState(false);
  const [countryFreeze, setCountryFreeze] = useState(countryFreezeStatus);
  const [currentRole, setCurrentRole] = useState<AdminRole>("founder");
  const [approvalStates, setApprovalStates] = useState<Record<string, "pending" | "approved" | "rejected">>({});

  const permissions = rolePermissions[currentRole];
  const can = (perm: string) => permissions.includes(perm);

  const handleApproval = (id: string, action: "approved" | "rejected") => {
    setApprovalStates((prev) => ({ ...prev, [id]: action }));
  };

  const toggleCountryFreeze = (code: string) => {
    setCountryFreeze((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif mb-1">Governance Center</h1>
            <p className="text-sm text-muted-foreground">Platform control, approvals, and compliance</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Simulated Role:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
              className="px-3 py-1.5 text-xs border border-border bg-background"
            >
              <option value="founder">Founder</option>
              <option value="global-director">Global Director</option>
              <option value="merchandising-manager">Merchandising Manager</option>
              <option value="support-agent">Support Agent</option>
            </select>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Pending Approvals" value={pendingApprovals.length.toString()} icon={Clock} />
          <MetricCard title="Open Incidents" value={incidents.filter((i) => i.status === "open").length.toString()} icon={AlertTriangle} />
          <MetricCard title="Global Freeze" value={globalFreeze ? "Active" : "Off"} icon={Lock} />
          <MetricCard title="Active Role" value={currentRole.replace("-", " ")} icon={User} />
        </div>

        {/* Global Freeze */}
        {can("freeze") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5" />
                <div>
                  <h3 className="font-medium">Global Commerce Freeze</h3>
                  <p className="text-xs text-muted-foreground">Immediately disable all purchases across all regions</p>
                </div>
              </div>
              <Button
                variant={globalFreeze ? "destructive" : "outline"}
                size="sm"
                onClick={() => setGlobalFreeze(!globalFreeze)}
              >
                {globalFreeze ? "Deactivate Freeze" : "Activate Freeze"}
              </Button>
            </div>

            {/* Country-level freeze */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-caption mb-3">Country-Level Controls</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {Object.entries(countryFreeze).map(([code, frozen]) => (
                  <button
                    key={code}
                    onClick={() => toggleCountryFreeze(code)}
                    className={`px-3 py-2 text-xs border transition-colors ${
                      frozen ? "bg-destructive text-destructive-foreground border-destructive" : "bg-transparent border-border hover:border-foreground"
                    }`}
                  >
                    <Globe className="w-3 h-3 inline mr-1" />
                    {code} {frozen ? "🔒" : ""}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Approval Queue */}
        {can("approvals") && (
          <div className="border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <h3 className="font-medium">Approval Queue</h3>
            </div>
            <div className="divide-y divide-border">
              {pendingApprovals.map((item) => {
                const state = approvalStates[item.id] || "pending";
                return (
                  <div key={item.id} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{item.id}</span>
                        <StatusBadge status={item.priority} variant={item.priority === "high" ? "error" : item.priority === "medium" ? "warning" : "info"} />
                      </div>
                      <p className="text-sm font-medium">{item.type}: {item.item}</p>
                      <p className="text-xs text-muted-foreground">Requested by {item.requestedBy} · {item.date}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {state === "pending" ? (
                        <>
                          <Button size="sm" onClick={() => handleApproval(item.id, "approved")}>Approve</Button>
                          <Button size="sm" variant="outline" onClick={() => handleApproval(item.id, "rejected")}>Reject</Button>
                        </>
                      ) : (
                        <StatusBadge status={state} variant={state === "approved" ? "success" : "error"} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Incidents */}
        {can("incidents") && (
          <div className="border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-medium">Active Incidents</h3>
            </div>
            <div className="divide-y divide-border">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{inc.id}</span>
                      <StatusBadge status={inc.severity} variant={inc.severity === "warning" ? "warning" : "info"} />
                      <StatusBadge status={inc.status} variant={inc.status === "open" ? "error" : "warning"} />
                    </div>
                    <p className="text-sm">{inc.title}</p>
                    <p className="text-xs text-muted-foreground">{inc.created}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Timeline */}
        {can("audit") && (
          <div className="border border-border">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <h3 className="font-medium">Audit Timeline</h3>
            </div>
            <div className="divide-y divide-border">
              {auditLog.map((entry, i) => (
                <div key={i} className="p-4 flex items-start gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-12 shrink-0">{entry.time}</span>
                  <div>
                    <p className="text-sm font-medium">{entry.action}</p>
                    <p className="text-xs text-muted-foreground">{entry.user} — {entry.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Access denied message for limited roles */}
        {!can("governance") && (
          <div className="p-8 border border-border text-center">
            <Shield className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Some governance features are restricted for your role.</p>
            <p className="text-xs text-muted-foreground mt-1">Contact a Global Director or Founder for elevated access.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
