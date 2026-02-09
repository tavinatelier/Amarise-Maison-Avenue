import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { MetricCard } from "@/components/admin/MetricCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Package, AlertTriangle, XCircle, Archive } from "lucide-react";
import inventoryData from "@/data/mock/inventory.json";

type InventoryStatus = 'active' | 'low_stock' | 'out_of_stock' | 'archived';

interface InventoryItem {
  sku: string;
  productId: string;
  title: string;
  category: string;
  status: InventoryStatus;
  totalStock: number;
  stockByCountry: Record<string, number>;
  lowStockThreshold: number;
  reorderPoint: number;
  lastRestocked: string;
}

export default function Inventory() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const inventory = inventoryData.inventory as InventoryItem[];
  const summary = inventoryData.summary;

  const filteredInventory = inventory.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    return true;
  });

  const categories = [...new Set(inventory.map((i) => i.category))];

  const getStatusVariant = (status: InventoryStatus) => {
    switch (status) {
      case "active":
        return "completed";
      case "low_stock":
        return "processing";
      case "out_of_stock":
        return "failed";
      case "archived":
        return "refunded";
      default:
        return "pending";
    }
  };

  const columns = [
    {
      key: "sku",
      label: "SKU",
      render: (item: InventoryItem) => (
        <span className="font-mono text-sm">{item.sku}</span>
      ),
    },
    {
      key: "title",
      label: "Product",
      render: (item: InventoryItem) => (
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.category}</p>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item: InventoryItem) => (
        <StatusBadge status={getStatusVariant(item.status) as any} />
      ),
    },
    {
      key: "totalStock",
      label: "Total Stock",
      render: (item: InventoryItem) => (
        <span className={item.totalStock <= item.lowStockThreshold ? "text-amber-600 font-medium" : ""}>
          {item.totalStock}
        </span>
      ),
    },
    {
      key: "countries",
      label: "Countries",
      render: (item: InventoryItem) => (
        <div className="flex gap-1">
          {Object.keys(item.stockByCountry).map((code) => (
            <span key={code} className="text-xs bg-muted px-1.5 py-0.5 rounded">
              {code}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "lastRestocked",
      label: "Last Restocked",
      render: (item: InventoryItem) =>
        new Date(item.lastRestocked).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light tracking-tight">Inventory</h1>
          <p className="text-muted-foreground mt-1">
            Manage stock levels and supply chain
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Total SKUs"
            value={summary.totalSKUs}
            icon={<Package className="h-5 w-5" />}
          />
          <MetricCard
            label="Low Stock"
            value={summary.lowStockProducts}
            icon={<AlertTriangle className="h-5 w-5" />}
            trend={summary.lowStockProducts > 0 ? "down" : undefined}
            trendValue={summary.lowStockProducts > 0 ? `${summary.lowStockProducts} items` : undefined}
          />
          <MetricCard
            label="Out of Stock"
            value={summary.outOfStockProducts}
            icon={<XCircle className="h-5 w-5" />}
          />
          <MetricCard
            label="Archived"
            value={summary.archivedProducts}
            icon={<Archive className="h-5 w-5" />}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by SKU or product..." className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Inventory Table */}
        <DataTable
          columns={columns}
          data={filteredInventory}
          onRowClick={(item) => navigate(`/admin/inventory/${item.sku}`)}
        />
      </div>
    </AdminLayout>
  );
}