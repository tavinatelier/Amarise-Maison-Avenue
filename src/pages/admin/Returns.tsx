/**
 * RETURNS PAGE
 * Admin page for managing product returns
 * 
 * BACKEND HANDOFF: Replace mock data with order.service.ts API calls
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Package, Clock, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

// Mock returns data
const mockReturns = [
  {
    id: "RT-2024-018",
    orderId: "AM-2024-0890",
    customerName: "Marie Dupont",
    items: [{ title: "Élan Silk Dress", variant: "Ivory / S", quantity: 1 }],
    reason: "Does not fit",
    status: "pending_receipt",
    returnLabel: "DHL-RT-12345",
    requestedAt: "2024-01-12T08:00:00Z",
    receivedAt: null,
    inspectedAt: null,
  },
  {
    id: "RT-2024-017",
    orderId: "AM-2024-0872",
    customerName: "Hans Mueller",
    items: [{ title: "Radiance Serum", variant: "30ml", quantity: 1 }],
    reason: "Allergic reaction",
    status: "received",
    returnLabel: "DHL-RT-12344",
    requestedAt: "2024-01-11T15:30:00Z",
    receivedAt: "2024-01-12T10:00:00Z",
    inspectedAt: null,
  },
  {
    id: "RT-2024-016",
    orderId: "AM-2024-0855",
    customerName: "Isabella Romano",
    items: [{ title: "Lumière Candle", variant: "Standard", quantity: 2 }],
    reason: "Damaged in transit",
    status: "approved",
    returnLabel: "DHL-RT-12343",
    requestedAt: "2024-01-10T11:20:00Z",
    receivedAt: "2024-01-11T14:00:00Z",
    inspectedAt: "2024-01-11T16:30:00Z",
  },
  {
    id: "RT-2024-015",
    orderId: "AM-2024-0840",
    customerName: "Charlotte Williams",
    items: [{ title: "Veil Lip Ritual", variant: "Rosé", quantity: 1 }],
    reason: "Changed mind",
    status: "rejected",
    returnLabel: "DHL-RT-12342",
    requestedAt: "2024-01-09T09:45:00Z",
    receivedAt: "2024-01-10T11:00:00Z",
    inspectedAt: "2024-01-10T14:00:00Z",
  },
];

export default function Returns() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredReturns = mockReturns.filter((ret) => {
    const matchesSearch =
      ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ret.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusVariants: Record<string, "default" | "success" | "warning" | "error" | "info"> = {
    pending_receipt: "warning",
    received: "info",
    approved: "success",
    rejected: "error",
  };

  const statusLabels: Record<string, string> = {
    pending_receipt: "Pending Receipt",
    received: "Received",
    approved: "Approved",
    rejected: "Rejected",
  };

  const stats = {
    pending: mockReturns.filter(r => r.status === "pending_receipt").length,
    received: mockReturns.filter(r => r.status === "received").length,
    approved: mockReturns.filter(r => r.status === "approved").length,
    rejected: mockReturns.filter(r => r.status === "rejected").length,
  };

  const columns = [
    {
      key: "id",
      label: "Return ID",
      render: (ret: typeof mockReturns[0]) => (
        <span className="font-mono text-sm">{ret.id}</span>
      ),
    },
    {
      key: "orderId",
      label: "Order",
      render: (ret: typeof mockReturns[0]) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/orders/${ret.orderId}`);
          }}
          className="font-mono text-sm text-primary hover:underline"
        >
          {ret.orderId}
        </button>
      ),
    },
    {
      key: "customerName",
      label: "Customer",
    },
    {
      key: "items",
      label: "Items",
      render: (ret: typeof mockReturns[0]) => (
        <div className="text-sm">
          {ret.items.map((item, i) => (
            <p key={i}>
              {item.title} ({item.variant}) × {item.quantity}
            </p>
          ))}
        </div>
      ),
    },
    {
      key: "reason",
      label: "Reason",
      render: (ret: typeof mockReturns[0]) => (
        <span className="text-sm text-muted-foreground">{ret.reason}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (ret: typeof mockReturns[0]) => (
        <StatusBadge
          status={statusLabels[ret.status]}
          variant={statusVariants[ret.status]}
        />
      ),
    },
    {
      key: "requestedAt",
      label: "Requested",
      render: (ret: typeof mockReturns[0]) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(ret.requestedAt), "MMM d, yyyy")}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Returns</h1>
            <p className="text-muted-foreground mt-1">
              Manage product return requests
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/admin/refunds")}>
            View Refunds
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-amber-50">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-light">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending Receipt</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-light">{stats.received}</p>
                <p className="text-sm text-muted-foreground">Received</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-emerald-50">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-light">{stats.approved}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-rose-50">
                <XCircle className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-light">{stats.rejected}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search returns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending_receipt">Pending Receipt</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Returns Table */}
        <DataTable columns={columns} data={filteredReturns} />
      </div>
    </AdminLayout>
  );
}
