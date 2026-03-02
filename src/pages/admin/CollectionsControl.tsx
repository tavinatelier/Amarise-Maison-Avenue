import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Star, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CollectionsControl() {
  const { collections, addCollection, updateCollection, removeCollection, can } = useAdminStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");

  if (!can("collections")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted.</div></AdminLayout>;

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    addCollection({
      id: `col-${Date.now()}`,
      title: newTitle,
      slug: newSlug || newTitle.toLowerCase().replace(/\s+/g, "-"),
      description: "",
      heroImage: "/placeholder.svg",
      featured: false,
      productIds: [],
      seoTitle: `${newTitle} | AMARISÉ`,
      seoDescription: `Explore the ${newTitle} collection`,
    });
    setNewTitle("");
    setNewSlug("");
    setShowCreate(false);
    toast.success("Collection created");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Collections</h1>
            <p className="text-sm text-muted-foreground mt-1">{collections.length} collections</p>
          </div>
          <Button onClick={() => setShowCreate(true)} className="gap-2"><Plus className="w-4 h-4" /> New Collection</Button>
        </div>

        {showCreate && (
          <div className="border border-border p-4 space-y-3 bg-card">
            <div className="grid grid-cols-2 gap-3">
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Collection Title" />
              <Input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="slug (auto-generated)" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCreate}>Create</Button>
              <Button size="sm" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {collections.map((col) => (
            <div key={col.id} className="border border-border bg-card">
              <div className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-muted shrink-0 overflow-hidden">
                  <img src={col.heroImage} alt={col.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{col.title}</span>
                    {col.featured && <Star className="w-3.5 h-3.5 text-accent fill-accent" />}
                  </div>
                  <p className="text-xs text-muted-foreground">/{col.slug} · {col.productIds.length} products</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Featured</span>
                    <Switch checked={col.featured} onCheckedChange={(v) => updateCollection(col.id, { featured: v })} />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setEditing(editing === col.id ? null : col.id)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => { removeCollection(col.id); toast.success("Collection removed"); }}>
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {editing === col.id && (
                <div className="p-4 pt-0 border-t border-border space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Title</label>
                      <Input value={col.title} onChange={(e) => updateCollection(col.id, { title: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Slug</label>
                      <Input value={col.slug} onChange={(e) => updateCollection(col.id, { slug: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Description</label>
                    <Textarea value={col.description} onChange={(e) => updateCollection(col.id, { description: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">SEO Title</label>
                      <Input value={col.seoTitle} onChange={(e) => updateCollection(col.id, { seoTitle: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">SEO Description</label>
                      <Input value={col.seoDescription} onChange={(e) => updateCollection(col.id, { seoDescription: e.target.value })} />
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => { setEditing(null); toast.success("Collection updated"); }}>Done</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
