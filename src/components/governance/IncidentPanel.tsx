import { useState } from "react";
import { IncidentStatus, IncidentSeverity } from "@/types/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Shield, ShieldOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface IncidentPanelProps {
  status: IncidentStatus;
  onActivate?: (severity: IncidentSeverity, message: string) => void;
  onDeactivate?: () => void;
  onUpdateFreeze?: (key: keyof IncidentStatus, value: boolean) => void;
}

export function IncidentPanel({
  status,
  onActivate,
  onDeactivate,
  onUpdateFreeze,
}: IncidentPanelProps) {
  const [severity, setSeverity] = useState<IncidentSeverity>("medium");
  const [message, setMessage] = useState("");

  const handleActivate = () => {
    onActivate?.(severity, message);
    setMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div
        className={cn(
          "p-6 border",
          status.isActive
            ? "border-red-300 bg-red-50"
            : "border-border bg-card"
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {status.isActive ? (
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            ) : (
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-medium">
                {status.isActive ? "Incident Active" : "System Normal"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {status.isActive
                  ? `Activated ${status.activatedAt} by ${status.activatedBy}`
                  : "No active incidents"}
              </p>
            </div>
          </div>
          {status.isActive && <StatusBadge status={status.severity} />}
        </div>

        {status.isActive && status.message && (
          <div className="mt-4 p-4 bg-white/50 border border-red-200">
            <p className="text-sm font-medium text-red-800">{status.message}</p>
          </div>
        )}
      </div>

      {/* Freeze Controls */}
      <div className="border border-border p-6 bg-card">
        <h4 className="text-lg font-medium mb-4">Emergency Freeze Controls</h4>
        <div className="grid gap-4">
          {[
            { key: "freezeCheckout", label: "Freeze Checkout", description: "Disable all checkout operations" },
            { key: "freezeRefunds", label: "Freeze Refunds", description: "Block all refund processing" },
            { key: "freezePrices", label: "Freeze Prices", description: "Lock all price changes" },
            { key: "freezeCMS", label: "Freeze CMS", description: "Block content publishing" },
          ].map((control) => (
            <div
              key={control.key}
              className="flex items-center justify-between p-4 bg-muted/30"
            >
              <div>
                <Label htmlFor={control.key} className="text-sm font-medium">
                  {control.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  {control.description}
                </p>
              </div>
              <Switch
                id={control.key}
                checked={status[control.key as keyof IncidentStatus] as boolean}
                onCheckedChange={(checked) =>
                  onUpdateFreeze?.(control.key as keyof IncidentStatus, checked)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Activation Controls */}
      {!status.isActive ? (
        <div className="border border-border p-6 bg-card">
          <h4 className="text-lg font-medium mb-4">Activate Incident Mode</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="severity">Severity Level</Label>
              <Select value={severity} onValueChange={(v) => setSeverity(v as IncidentSeverity)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message">Broadcast Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Internal message visible to all admin users..."
                className="mt-1"
              />
            </div>
            <Button onClick={handleActivate} className="w-full gap-2">
              <AlertTriangle className="h-4 w-4" />
              Activate Incident Mode
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-border p-6 bg-card">
          <h4 className="text-lg font-medium mb-4">Deactivate Incident Mode</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Deactivating will restore normal operations and lift all freeze controls.
          </p>
          <Button
            variant="outline"
            onClick={onDeactivate}
            className="w-full gap-2"
          >
            <ShieldOff className="h-4 w-4" />
            Deactivate Incident Mode
          </Button>
        </div>
      )}
    </div>
  );
}
