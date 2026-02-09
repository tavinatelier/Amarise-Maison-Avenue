import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import dashboardData from "@/data/mock/admin-dashboard.json";
import { CustomerAdminData } from "@/types/admin";

export default function AdminCustomers() {
  const customers = dashboardData.customers as CustomerAdminData[];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);

  const columns = [
    {
      key: "name",
      label: "Customer",
      render: (customer: CustomerAdminData) => (
        <div>
          <p className="font-medium">
            {customer.firstName} {customer.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{customer.email}</p>
        </div>
      ),
    },
    {
      key: "country",
      label: "Country",
      render: (customer: CustomerAdminData) => customer.country,
    },
    {
      key: "totalOrders",
      label: "Orders",
      render: (customer: CustomerAdminData) => customer.totalOrders,
    },
    {
      key: "totalSpent",
      label: "Total Spent",
      render: (customer: CustomerAdminData) => (
        <span className="font-medium">{formatCurrency(customer.totalSpent)}</span>
      ),
    },
    {
      key: "lastOrderAt",
      label: "Last Order",
      render: (customer: CustomerAdminData) =>
        customer.lastOrderAt
          ? formatDistanceToNow(new Date(customer.lastOrderAt), {
              addSuffix: true,
            })
          : "Never",
    },
    {
      key: "createdAt",
      label: "Customer Since",
      render: (customer: CustomerAdminData) =>
        new Date(customer.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Customers</h1>
            <p className="text-muted-foreground mt-1">
              View and manage customer data
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="ghost" size="sm">
              VIP
            </Button>
            <Button variant="ghost" size="sm">
              New
            </Button>
          </div>
        </div>

        {/* Customers Table */}
        <DataTable
          columns={columns}
          data={customers}
          onRowClick={(customer) => console.log("View customer:", customer.id)}
        />
      </div>
    </AdminLayout>
  );
}
