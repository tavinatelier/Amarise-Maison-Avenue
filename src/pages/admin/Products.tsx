import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download, AlertTriangle, Star, Sparkles } from "lucide-react";
import { sampleProducts } from "@/data/catalog-hierarchy";
import { CatalogProduct } from "@/types/catalog";
import { useState } from "react";

type FilterType = "all" | "published" | "draft" | "featured" | "limited" | "low-stock";

export default function AdminProducts() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const products = sampleProducts;

  const filteredProducts = products.filter((p) => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.sku.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    switch (filter) {
      case "draft": return p.isDraft;
      case "featured": return p.isFeatured;
      case "limited": return p.isLimitedEdition;
      case "low-stock": return p.inventory < 10;
      default: return true;
    }
  });

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(value);

  const handleExportCSV = () => {
    const headers = ["SKU", "Title", "Pillar", "Family", "Price (EUR)", "Inventory", "Tags", "Countries"];
    const rows = filteredProducts.map((p) => [
      p.sku, p.title, p.pillarSlug, p.familySlug,
      p.price.EUR.toString(), p.inventory.toString(),
      p.luxuryTags.join("; "), p.countryAvailability.join("; "),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `amarise-products-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      key: "sku",
      label: "SKU",
      render: (p: CatalogProduct) => <span className="text-xs font-mono text-muted-foreground">{p.sku}</span>,
    },
    {
      key: "title",
      label: "Product",
      render: (p: CatalogProduct) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-muted overflow-hidden shrink-0">
            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{p.title}</p>
              {p.isFeatured && <Star className="h-3 w-3 text-accent fill-accent" />}
              {p.isLimitedEdition && <Sparkles className="h-3 w-3 text-accent" />}
            </div>
            <p className="text-xs text-muted-foreground capitalize">{p.pillarSlug} / {p.familySlug}</p>
          </div>
        </div>
      ),
    },
    {
      key: "state",
      label: "Status",
      render: (p: CatalogProduct) => (
        <StatusBadge status={p.isDraft ? "draft" : "published"} />
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (p: CatalogProduct) => formatCurrency(p.price.EUR),
    },
    {
      key: "inventory",
      label: "Inventory",
      render: (p: CatalogProduct) => (
        <div className="flex items-center gap-2">
          <span className={p.inventory < 10 ? "text-amber-600 font-medium" : "text-foreground"}>{p.inventory}</span>
          {p.inventory < 10 && <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
        </div>
      ),
    },
    {
      key: "tags",
      label: "Tags",
      render: (p: CatalogProduct) => (
        <div className="flex flex-wrap gap-1">
          {p.luxuryTags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground capitalize">{tag.replace("-", " ")}</span>
          ))}
        </div>
      ),
    },
    {
      key: "updatedAt",
      label: "Updated",
      render: (p: CatalogProduct) => new Date(p.updatedAt).toLocaleDateString(),
    },
  ];

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "featured", label: "Featured" },
    { key: "limited", label: "Limited" },
    { key: "draft", label: "Draft" },
    { key: "low-stock", label: "Low Stock" },
  ];

  const lowStockCount = products.filter((p) => p.inventory < 10).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
              {products.length} products · {lowStockCount} low stock
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportCSV} className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or SKU..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            {filterButtons.map((f) => (
              <Button key={f.key} variant={filter === f.key ? "outline" : "ghost"} size="sm" onClick={() => setFilter(f.key)}>
                {f.label}
                {f.key === "low-stock" && lowStockCount > 0 && (
                  <span className="ml-1.5 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">{lowStockCount}</span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={columns}
          data={filteredProducts}
          onRowClick={(product) => console.log("Edit product:", product.id)}
        />
      </div>
    </AdminLayout>
  );
}
