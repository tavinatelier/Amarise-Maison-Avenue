import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminStore } from "@/stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AlertTriangle, Lock, Search } from "lucide-react";
import { sampleProducts } from "@/data/catalog-hierarchy";
import { useState } from "react";
import { toast } from "sonner";

export default function InventoryControl() {
  const { inventoryFreeze, setInventoryFreeze, productFreezes, toggleProductFreeze, productOverrides, setProductOverride, can, settings } = useAdminStore();
  const [search, setSearch] = useState("");

  if (!can("inventory")) return <AdminLayout><div className="p-8 text-center text-muted-foreground">Access restricted.</div></AdminLayout>;

  const filtered = sampleProducts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const getEffectiveStock = (id: string, original: number) => productOverrides[id]?.inventory ?? original;
  const isSold = (id: string) => productOverrides[id]?.sold ?? false;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-serif">Inventory Control</h1>
            <p className="text-sm text-muted-foreground mt-1">Stock management and freeze controls</p>
          </div>
          <Button
            variant={inventoryFreeze ? "destructive" : "outline"}
            onClick={() => { setInventoryFreeze(!inventoryFreeze); toast.success(inventoryFreeze ? "Inventory unfrozen" : "Inventory frozen"); }}
            className="gap-2"
          >
            <Lock className="w-4 h-4" />
            {inventoryFreeze ? "Unfreeze All" : "Global Freeze"}
          </Button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="border border-border">
          <div className="grid grid-cols-7 gap-2 p-3 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
            <span>SKU</span><span className="col-span-2">Product</span><span>Stock</span><span>Status</span><span>Sold Override</span><span>Freeze</span>
          </div>
          {filtered.map((p) => {
            const stock = getEffectiveStock(p.id, p.inventory);
            const sold = isSold(p.id);
            const frozen = productFreezes[p.id] || false;
            const lowStock = stock > 0 && stock <= settings.lowStockThreshold;

            return (
              <div key={p.id} className="grid grid-cols-7 gap-2 p-3 border-b border-border last:border-0 items-center">
                <span className="text-xs font-mono text-muted-foreground">{p.sku}</span>
                <span className="text-sm font-medium col-span-2 truncate">{p.title}</span>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setProductOverride(p.id, { inventory: parseInt(e.target.value) || 0 })}
                    className="w-20 text-sm"
                    disabled={inventoryFreeze || frozen}
                  />
                  {lowStock && <AlertTriangle className="w-3.5 h-3.5 text-accent" />}
                </div>
                <div>
                  {sold ? (
                    <StatusBadge status="sold" />
                  ) : stock === 0 ? (
                    <StatusBadge status="out-of-stock" />
                  ) : lowStock ? (
                    <StatusBadge status="low-stock" />
                  ) : (
                    <StatusBadge status="in-stock" />
                  )}
                </div>
                <Switch
                  checked={sold}
                  onCheckedChange={(v) => { setProductOverride(p.id, { sold: v }); toast.success(v ? "Marked as sold" : "Unmarked"); }}
                  disabled={inventoryFreeze}
                />
                <Switch
                  checked={frozen}
                  onCheckedChange={() => { toggleProductFreeze(p.id); toast.success(frozen ? "Unfrozen" : "Frozen"); }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
