import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import dashboardData from "@/data/mock/admin-dashboard.json";
import { ProductAdminData, ProductState } from "@/types/admin";

export default function AdminProducts() {
  const products = dashboardData.products as ProductAdminData[];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);

  const columns = [
    {
      key: "title",
      label: "Product",
      render: (product: ProductAdminData) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-muted overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{product.title}</p>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: "state",
      label: "Status",
      render: (product: ProductAdminData) => (
        <StatusBadge status={product.state as ProductState} />
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (product: ProductAdminData) => formatCurrency(product.price.EUR),
    },
    {
      key: "stock",
      label: "Stock",
      render: (product: ProductAdminData) => (
        <span
          className={
            product.stock < 10
              ? "text-amber-600 font-medium"
              : "text-foreground"
          }
        >
          {product.stock}
        </span>
      ),
    },
    {
      key: "updatedAt",
      label: "Last Updated",
      render: (product: ProductAdminData) =>
        new Date(product.updatedAt).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product catalog
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="ghost" size="sm">
              Published
            </Button>
            <Button variant="ghost" size="sm">
              Draft
            </Button>
            <Button variant="ghost" size="sm">
              Low Stock
            </Button>
          </div>
        </div>

        {/* Products Table */}
        <DataTable
          columns={columns}
          data={products}
          onRowClick={(product) => console.log("Edit product:", product.id)}
        />
      </div>
    </AdminLayout>
  );
}
