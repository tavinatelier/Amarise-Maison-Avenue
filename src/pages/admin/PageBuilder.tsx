import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore, PageBlock } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, FileText, Image, Type, MousePointerClick, Megaphone, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BLOCK_TYPES: { type: PageBlock["type"]; label: string; icon: typeof FileText }[] = [
  { type: "text", label: "Text Block", icon: Type },
  { type: "image", label: "Image Block", icon: Image },
  { type: "product-slider", label: "Product Slider", icon: LayoutDashboard },
  { type: "cta", label: "CTA Button", icon: MousePointerClick },
  { type: "banner", label: "Banner Message", icon: Megaphone },
  { type: "hero", label: "Hero Section", icon: FileText },
];

export default function PageBuilder() {
  const { pages, updatePage, addPageBlock, updatePageBlock, removePageBlock, can } = useAdminStore();
  const [selectedPage, setSelectedPage] = useState(pages[0]?.id || "");

  if (!can("pages")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted.</div></AdminLayout>;

  const page = pages.find((p) => p.id === selectedPage);

  const handleAddBlock = (type: PageBlock["type"]) => {
    if (!page) return;
    addPageBlock(page.id, {
      id: `blk-${Date.now()}`,
      type,
      content: type === "text" ? { heading: "New Heading", body: "Content goes here..." } : type === "cta" ? { label: "Shop Now", href: "/" } : type === "banner" ? { message: "New announcement" } : { title: "Section Title", subtitle: "" },
      enabled: true,
      order: page.blocks.length,
    });
    toast.success(`${type} block added`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-serif">Page Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure page sections and content blocks</p>
        </div>

        {/* Page selector */}
        <div className="flex gap-2">
          {pages.map((p) => (
            <Button key={p.id} variant={selectedPage === p.id ? "default" : "outline"} size="sm" onClick={() => setSelectedPage(p.id)}>
              {p.title}
            </Button>
          ))}
        </div>

        {page && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Blocks panel */}
            <div className="lg:col-span-3 space-y-3">
              {page.blocks.sort((a, b) => a.order - b.order).map((block) => (
                <div key={block.id} className="border border-border bg-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-muted uppercase tracking-wider text-muted-foreground">{block.type}</span>
                      <Switch
                        checked={block.enabled}
                        onCheckedChange={(v) => updatePageBlock(page.id, block.id, { enabled: v })}
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removePageBlock(page.id, block.id)}>
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>

                  {Object.entries(block.content).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs text-muted-foreground capitalize">{key}</label>
                      {(value as string).length > 80 ? (
                        <Textarea
                          value={value as string}
                          onChange={(e) => updatePageBlock(page.id, block.id, { content: { ...block.content, [key]: e.target.value } })}
                        />
                      ) : (
                        <Input
                          value={value as string}
                          onChange={(e) => updatePageBlock(page.id, block.id, { content: { ...block.content, [key]: e.target.value } })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {page.blocks.length === 0 && (
                <div className="border border-dashed border-border p-8 text-center text-muted-foreground text-sm">
                  No blocks yet. Add one from the sidebar.
                </div>
              )}
            </div>

            {/* Add block sidebar */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Add Block</p>
              {BLOCK_TYPES.map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => handleAddBlock(type)}
                  className="w-full flex items-center gap-3 p-3 border border-border text-sm hover:bg-muted/50 transition-colors text-left"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
