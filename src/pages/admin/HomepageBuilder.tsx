import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Eye, EyeOff, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function HomepageBuilder() {
  const { homepageSections, updateHomepageSection, reorderHomepageSections, can } = useAdminStore();
  const [editing, setEditing] = useState<string | null>(null);

  if (!can("homepage")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted for your role.</div></AdminLayout>;

  const sorted = [...homepageSections].sort((a, b) => a.order - b.order);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...sorted];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    reorderHomepageSections(next.map((s, i) => ({ ...s, order: i })));
    toast.success("Section reordered");
  };

  const moveDown = (idx: number) => {
    if (idx === sorted.length - 1) return;
    const next = [...sorted];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    reorderHomepageSections(next.map((s, i) => ({ ...s, order: i })));
    toast.success("Section reordered");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Homepage Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Reorder and configure homepage sections</p>
        </div>

        <div className="space-y-2">
          {sorted.map((section, idx) => (
            <div key={section.id} className="border border-border p-4 flex items-center gap-4 bg-card">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveUp(idx)} className="text-muted-foreground hover:text-foreground text-xs">▲</button>
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <button onClick={() => moveDown(idx)} className="text-muted-foreground hover:text-foreground text-xs">▼</button>
              </div>

              <div className="flex-1 min-w-0">
                {editing === section.id ? (
                  <div className="space-y-2">
                    <Input
                      value={section.title}
                      onChange={(e) => updateHomepageSection(section.id, { title: e.target.value })}
                      className="text-sm"
                    />
                    <Input
                      value={section.description}
                      onChange={(e) => updateHomepageSection(section.id, { description: e.target.value })}
                      className="text-sm"
                    />
                    <Button size="sm" variant="outline" onClick={() => { setEditing(null); toast.success("Section updated"); }}>
                      Done
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground uppercase tracking-wider">{section.type.replace("-", " ")}</span>
                      <span className="font-medium text-sm">{section.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => setEditing(editing === section.id ? null : section.id)}>
                  <Pencil className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
                <div className="flex items-center gap-2">
                  {section.enabled ? <Eye className="w-3.5 h-3.5 text-foreground" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                  <Switch
                    checked={section.enabled}
                    onCheckedChange={(v) => {
                      updateHomepageSection(section.id, { enabled: v });
                      toast.success(`${section.title} ${v ? "enabled" : "disabled"}`);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
