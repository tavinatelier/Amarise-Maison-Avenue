import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText, Calendar, Eye, EyeOff, Clock, Plus, Trash2, Edit2, CheckCircle, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface EditorialItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: "draft" | "scheduled" | "published" | "expired";
  publishAt: string;
  expiresAt: string;
  visible: boolean;
  category: string;
  author: string;
  createdAt: string;
}

const CATEGORIES = ["Fashion", "Beauty", "Lifestyle", "Culture", "Sustainability", "Behind the Scenes"];

const initialEditorials: EditorialItem[] = [
  { id: "ed-001", title: "The Art of Slow Fashion", slug: "art-of-slow-fashion", excerpt: "Exploring the philosophy behind our seasonal approach to design.", status: "published", publishAt: "2025-01-15T09:00:00Z", expiresAt: "", visible: true, category: "Fashion", author: "Editorial Team", createdAt: "2025-01-10T10:00:00Z" },
  { id: "ed-002", title: "Ingredients From Earth", slug: "ingredients-from-earth", excerpt: "A deep dive into our commitment to natural, ethically sourced beauty ingredients.", status: "published", publishAt: "2025-02-01T09:00:00Z", expiresAt: "", visible: true, category: "Beauty", author: "Beauty Editor", createdAt: "2025-01-25T10:00:00Z" },
  { id: "ed-003", title: "Spring Summer 2025 Preview", slug: "ss25-preview", excerpt: "An exclusive first look at our upcoming collection.", status: "scheduled", publishAt: "2025-04-01T09:00:00Z", expiresAt: "", visible: false, category: "Fashion", author: "Creative Director", createdAt: "2025-02-20T10:00:00Z" },
  { id: "ed-004", title: "Holiday Gift Guide", slug: "holiday-gift-guide", excerpt: "Curated selections for the discerning gift giver.", status: "expired", publishAt: "2024-11-15T09:00:00Z", expiresAt: "2024-12-31T23:59:00Z", visible: false, category: "Lifestyle", author: "Editorial Team", createdAt: "2024-11-01T10:00:00Z" },
];

export default function EditorialManager() {
  const { can, addAudit } = useAdminStore();
  const [editorials, setEditorials] = useState<EditorialItem[]>(initialEditorials);
  const [editing, setEditing] = useState<string | null>(null);
  const [previewDate, setPreviewDate] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  if (!can("pages")) {
    return <AdminLayout><div className="p-8 text-center text-muted-foreground">Editorial access restricted.</div></AdminLayout>;
  }

  const updateEditorial = (id: string, updates: Partial<EditorialItem>) => {
    setEditorials((prev) => prev.map((e) => e.id === id ? { ...e, ...updates } : e));
    addAudit("Editorial updated", "Editorial", `${id}: ${Object.keys(updates).join(", ")}`);
    toast.success("Editorial updated");
  };

  const addEditorial = () => {
    const newItem: EditorialItem = {
      id: `ed-${Date.now()}`,
      title: "Untitled Article",
      slug: `untitled-${Date.now()}`,
      excerpt: "",
      status: "draft",
      publishAt: "",
      expiresAt: "",
      visible: false,
      category: "Fashion",
      author: "Editorial Team",
      createdAt: new Date().toISOString(),
    };
    setEditorials((prev) => [newItem, ...prev]);
    setEditing(newItem.id);
    addAudit("Editorial created", "Editorial", newItem.title);
    toast.success("New draft created");
  };

  const removeEditorial = (id: string) => {
    setEditorials((prev) => prev.filter((e) => e.id !== id));
    addAudit("Editorial deleted", "Editorial", id);
    toast.success("Editorial removed");
  };

  const publishEditorial = (id: string) => {
    updateEditorial(id, { status: "published", visible: true, publishAt: new Date().toISOString() });
    addAudit("Editorial published", "Editorial", id);
  };

  const scheduleEditorial = (id: string, date: string) => {
    updateEditorial(id, { status: "scheduled", publishAt: date });
    addAudit("Editorial scheduled", "Editorial", `${id} → ${date}`);
  };

  // Preview as future date filtering
  const visibleEditorials = showPreview && previewDate
    ? editorials.filter((e) => {
        const pd = new Date(previewDate);
        const pub = e.publishAt ? new Date(e.publishAt) : null;
        const exp = e.expiresAt ? new Date(e.expiresAt) : null;
        if (!pub || pub > pd) return false;
        if (exp && exp < pd) return false;
        return true;
      })
    : editorials;

  const statusIcon = (s: EditorialItem["status"]) => {
    switch (s) {
      case "published": return <CheckCircle className="w-4 h-4 text-accent" />;
      case "scheduled": return <Clock className="w-4 h-4 text-muted-foreground" />;
      case "draft": return <Edit2 className="w-4 h-4 text-muted-foreground" />;
      case "expired": return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Editorial Manager</h1>
            <p className="text-muted-foreground mt-1">Draft, schedule, and publish editorial content</p>
          </div>
          <Button onClick={addEditorial} size="sm">
            <Plus className="w-4 h-4 mr-1" /> New Article
          </Button>
        </div>

        {/* Preview as Future Date */}
        <div className="border border-border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview as Future Date</span>
            </div>
            <Input
              type="datetime-local"
              value={previewDate}
              onChange={(e) => setPreviewDate(e.target.value)}
              className="w-auto text-sm"
            />
            <Switch checked={showPreview} onCheckedChange={setShowPreview} />
            <span className="text-xs text-muted-foreground">
              {showPreview ? `Showing content visible on ${previewDate || "now"}` : "Showing all items"}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {(["draft", "scheduled", "published", "expired"] as const).map((status) => (
            <div key={status} className="border border-border p-4 bg-card text-center">
              <div className="text-2xl font-light">{editorials.filter((e) => e.status === status).length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{status}</div>
            </div>
          ))}
        </div>

        {/* Editorial List */}
        <div className="space-y-3">
          {visibleEditorials.map((item) => (
            <div key={item.id} className="border border-border bg-card p-5">
              {editing === item.id ? (
                <div className="space-y-3">
                  <Input
                    value={item.title}
                    onChange={(e) => updateEditorial(item.id, { title: e.target.value })}
                    className="text-lg font-serif"
                    placeholder="Article title"
                  />
                  <Input
                    value={item.slug}
                    onChange={(e) => updateEditorial(item.id, { slug: e.target.value })}
                    className="text-sm"
                    placeholder="url-slug"
                  />
                  <Textarea
                    value={item.excerpt}
                    onChange={(e) => updateEditorial(item.id, { excerpt: e.target.value })}
                    placeholder="Brief excerpt..."
                    rows={2}
                  />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Category</label>
                      <select
                        value={item.category}
                        onChange={(e) => updateEditorial(item.id, { category: e.target.value })}
                        className="w-full mt-1 px-2 py-1.5 border border-border bg-background text-sm"
                      >
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Author</label>
                      <Input value={item.author} onChange={(e) => updateEditorial(item.id, { author: e.target.value })} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Publish At</label>
                      <Input
                        type="datetime-local"
                        value={item.publishAt ? item.publishAt.slice(0, 16) : ""}
                        onChange={(e) => scheduleEditorial(item.id, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Expires At</label>
                      <Input
                        type="datetime-local"
                        value={item.expiresAt ? item.expiresAt.slice(0, 16) : ""}
                        onChange={(e) => updateEditorial(item.id, { expiresAt: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(null)}>Done</Button>
                    <Button size="sm" onClick={() => publishEditorial(item.id)}>Publish Now</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {statusIcon(item.status)}
                    <div>
                      <h3 className="font-serif text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.excerpt || "No excerpt"}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{item.category}</span>
                        <span>·</span>
                        <span>{item.author}</span>
                        <span>·</span>
                        <span className="capitalize">{item.status}</span>
                        {item.publishAt && item.status === "scheduled" && (
                          <>
                            <span>·</span>
                            <span>Publishes: {new Date(item.publishAt).toLocaleDateString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(item.id)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => updateEditorial(item.id, { visible: !item.visible })}>
                      {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeEditorial(item.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4" />
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
