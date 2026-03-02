import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Search, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AuditTimeline() {
  const { auditLog, can } = useAdminStore();
  const [search, setSearch] = useState("");
  const [filterEntity, setFilterEntity] = useState<string>("all");

  if (!can("audit")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted.</div></AdminLayout>;

  const entities = Array.from(new Set(auditLog.map((e) => e.entity)));

  const filtered = auditLog.filter((entry) => {
    if (filterEntity !== "all" && entry.entity !== filterEntity) return false;
    if (search && !entry.action.toLowerCase().includes(search.toLowerCase()) && !entry.detail.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleExport = () => {
    const csv = ["Timestamp,Role,Action,Entity,Detail", ...filtered.map((e) => `${e.timestamp},${e.role},${e.action},${e.entity},"${e.detail}"`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "audit-log.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Audit log exported");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Audit Timeline</h1>
            <p className="text-sm text-muted-foreground mt-1">{auditLog.length} events recorded</p>
          </div>
          <Button variant="outline" onClick={handleExport} className="gap-2"><Download className="w-4 h-4" /> Export</Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search actions..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select
            value={filterEntity}
            onChange={(e) => setFilterEntity(e.target.value)}
            className="px-3 py-2 text-sm border border-border bg-background"
          >
            <option value="all">All Entities</option>
            {entities.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-border p-12 text-center text-muted-foreground">
            <Clock className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No audit events yet. Actions across admin panels will appear here.</p>
          </div>
        ) : (
          <div className="border border-border divide-y divide-border">
            {filtered.map((entry) => (
              <div key={entry.id} className="p-4 flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium">{entry.action}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground uppercase tracking-wider">{entry.entity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{entry.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-mono text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-[10px] text-muted-foreground capitalize">{entry.role.replace("-", " ")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
