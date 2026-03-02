import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Lock, Globe, AlertTriangle, Shield, Megaphone } from "lucide-react";
import { pillars } from "@/data/catalog-hierarchy";
import { toast } from "sonner";

export default function GovernanceControl() {
  const {
    globalFreeze, setGlobalFreeze,
    countryFreeze, toggleCountryFreeze,
    pillarFreeze, togglePillarFreeze,
    approvalRequired, setApprovalRequired,
    emergencyBanner, setEmergencyBanner,
    can,
  } = useAdminStore();

  if (!can("governance")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Governance access restricted to Founders and Directors.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Governance & Compliance</h1>
          <p className="text-sm text-muted-foreground mt-1">Platform-wide controls and freeze mechanisms</p>
        </div>

        {/* Global Freeze */}
        <div className="border border-border p-6 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5" />
              <div>
                <h3 className="font-medium">Global Commerce Freeze</h3>
                <p className="text-xs text-muted-foreground">Disable all purchases immediately</p>
              </div>
            </div>
            <Button variant={globalFreeze ? "destructive" : "outline"} onClick={() => { setGlobalFreeze(!globalFreeze); toast.success(globalFreeze ? "Commerce resumed" : "Commerce frozen"); }}>
              {globalFreeze ? "Deactivate" : "Activate Freeze"}
            </Button>
          </div>
        </div>

        {/* Country Freeze */}
        <div className="border border-border p-6 bg-card">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5" />
            <h3 className="font-medium">Country-Level Freeze</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {Object.entries(countryFreeze).map(([code, frozen]) => (
              <button
                key={code}
                onClick={() => { toggleCountryFreeze(code); toast.success(`${code} ${frozen ? "unfrozen" : "frozen"}`); }}
                className={`px-3 py-2 text-xs border transition-colors ${frozen ? "bg-destructive text-destructive-foreground border-destructive" : "bg-transparent border-border hover:border-foreground"}`}
              >
                {code} {frozen ? "🔒" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Pillar Freeze */}
        <div className="border border-border p-6 bg-card">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5" />
            <h3 className="font-medium">Pillar-Level Freeze</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {pillars.map((pillar) => (
              <div key={pillar.slug} className="flex items-center justify-between p-3 border border-border">
                <span className="text-sm">{pillar.name}</span>
                <Switch
                  checked={pillarFreeze[pillar.slug] ?? false}
                  onCheckedChange={() => { togglePillarFreeze(pillar.slug); toast.success(`${pillar.name} ${pillarFreeze[pillar.slug] ? "unfrozen" : "frozen"}`); }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Approval Required */}
        <div className="border border-border p-6 bg-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <h3 className="font-medium">Require Approvals</h3>
              <p className="text-xs text-muted-foreground">All product and price changes need approval before going live</p>
            </div>
          </div>
          <Switch checked={approvalRequired} onCheckedChange={(v) => { setApprovalRequired(v); toast.success(v ? "Approvals required" : "Approvals disabled"); }} />
        </div>

        {/* Emergency Banner */}
        <div className="border border-border p-6 bg-card">
          <div className="flex items-center gap-3 mb-3">
            <Megaphone className="w-5 h-5" />
            <h3 className="font-medium">Emergency Announcement Banner</h3>
          </div>
          <div className="flex gap-3">
            <Input
              value={emergencyBanner}
              onChange={(e) => setEmergencyBanner(e.target.value)}
              placeholder="Type announcement message (empty = disabled)"
              className="flex-1"
            />
            <Button variant="outline" onClick={() => { setEmergencyBanner(""); toast.success("Banner cleared"); }}>Clear</Button>
          </div>
          {emergencyBanner && (
            <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              Preview: {emergencyBanner}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
