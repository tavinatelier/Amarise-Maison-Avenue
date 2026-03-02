import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NavigationBuilder() {
  const { navItems, updateNavItem, addNavItem, removeNavItem, reorderNavItems, can } = useAdminStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");

  if (!can("navigation")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted.</div></AdminLayout>;

  const sorted = [...navItems].sort((a, b) => a.order - b.order);

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    addNavItem({
      id: `nav-${Date.now()}`,
      label: newLabel,
      href: newHref || `/${newLabel.toLowerCase().replace(/\s/g, "-")}`,
      order: navItems.length,
      children: [],
    });
    setNewLabel("");
    setNewHref("");
    toast.success("Navigation item added");
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...sorted];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    reorderNavItems(next.map((n, i) => ({ ...n, order: i })));
  };

  const moveDown = (idx: number) => {
    if (idx === sorted.length - 1) return;
    const next = [...sorted];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    reorderNavItems(next.map((n, i) => ({ ...n, order: i })));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Navigation Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure mega navigation structure</p>
        </div>

        {/* Add new */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">Label</label>
            <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="e.g. Sale" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">Href</label>
            <Input value={newHref} onChange={(e) => setNewHref(e.target.value)} placeholder="/sale" />
          </div>
          <Button onClick={handleAdd} className="gap-2"><Plus className="w-4 h-4" /> Add</Button>
        </div>

        {/* Items */}
        <div className="space-y-2">
          {sorted.map((item, idx) => (
            <div key={item.id} className="border border-border bg-card">
              <div className="flex items-center gap-3 p-4">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveUp(idx)} className="text-xs text-muted-foreground hover:text-foreground">▲</button>
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  <button onClick={() => moveDown(idx)} className="text-xs text-muted-foreground hover:text-foreground">▼</button>
                </div>

                <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="shrink-0">
                  {expanded === item.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Input
                    value={item.label}
                    onChange={(e) => updateNavItem(item.id, { label: e.target.value })}
                    className="text-sm"
                  />
                  <Input
                    value={item.href}
                    onChange={(e) => updateNavItem(item.id, { href: e.target.value })}
                    className="text-sm"
                  />
                </div>

                <Button variant="ghost" size="icon" onClick={() => { removeNavItem(item.id); toast.success("Removed"); }}>
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>

              {/* Expanded details */}
              {expanded === item.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Featured Collection</label>
                      <Input
                        value={item.featuredCollection || ""}
                        onChange={(e) => updateNavItem(item.id, { featuredCollection: e.target.value })}
                        placeholder="e.g. Spring 2025"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Promo Text</label>
                      <Input
                        value={item.promoText || ""}
                        onChange={(e) => updateNavItem(item.id, { promoText: e.target.value })}
                        placeholder="e.g. New Season"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Children ({item.children.length})</p>
                    {item.children.sort((a, b) => a.order - b.order).map((child) => (
                      <div key={child.id} className="flex gap-2 items-center mb-1 pl-6">
                        <Input
                          value={child.label}
                          className="text-sm flex-1"
                          onChange={(e) => {
                            const updated = item.children.map((c) => c.id === child.id ? { ...c, label: e.target.value } : c);
                            updateNavItem(item.id, { children: updated });
                          }}
                        />
                        <Input
                          value={child.href}
                          className="text-sm flex-1"
                          onChange={(e) => {
                            const updated = item.children.map((c) => c.id === child.id ? { ...c, href: e.target.value } : c);
                            updateNavItem(item.id, { children: updated });
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            updateNavItem(item.id, { children: item.children.filter((c) => c.id !== child.id) });
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        updateNavItem(item.id, {
                          children: [...item.children, { id: `nc-${Date.now()}`, label: "New Link", href: "/", order: item.children.length }],
                        });
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1" /> Add Child
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
