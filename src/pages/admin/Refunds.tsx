/**
 * REFUNDS PAGE
 * Admin page for managing refunds
 * 
 * BACKEND HANDOFF: Replace mock data with payment.service.ts API calls
 */

import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mock refunds data
const mockRefunds = [
  {
    id: "RF-2024-045",
    orderId: "AM-2024-0892",
    customerName: "Sophie Laurent",
    amount: 180,
    currency: "EUR",
    status: "approved",
    reason: "Product damaged during shipping",
    requestedAt: "2024-01-12T10:30:00Z",
    processedAt: "2024-01-12T15:28:00Z",
    processedBy: "Sarah Chen",
  },
  {
    id: "RF-2024-044",
    orderId: "AM-2024-0875",
    customerName: "Marcus Weber",
    amount: 450,
    currency: "EUR",
    status: "pending",
    reason: "Wrong size received",
    requestedAt: "2024-01-11T14:20:00Z",
    processedAt: null,
    processedBy: null,
  },
  {
    id: "RF-2024-043",
    orderId: "AM-2024-0860",
    customerName: "Emma Johnson",
    amount: 90,
    currency: "EUR",
    status: "rejected",
    reason: "Changed mind",
    requestedAt: "2024-01-10T09:15:00Z",
    processedAt: "2024-01-10T16:00:00Z",
    processedBy: "Marcus Weber",
  },
  {
    id: "RF-2024-042",
    orderId: "AM-2024-0845",
    customerName: "Olivia Smith",
    amount: 140,
    currency: "EUR",
    status: "approved",
    reason: "Allergic reaction to product",
    requestedAt: "2024-01-09T11:45:00Z",
    processedAt: "2024-01-09T14:30:00Z",
    processedBy: "Sarah Chen",
  },
];

export default function Refunds() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("order") || "");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredRefunds = mockRefunds.filter((refund) => {
    const matchesSearch =
      refund.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      refund.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || refund.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusVariants: Record<string, "default" | "success" | "warning" | "error" | "info"> = {
    pending: "warning",
    approved: "success",
    rejected: "error",
    processing: "info",
  };

  const columns = [
    {
      key: "id",
      label: "Refund ID",
      render: (refund: typeof mockRefunds[0]) => (
        <span className="font-mono text-sm">{refund.id}</span>
      ),
    },
    {
      key: "orderId",
      label: "Order",
      render: (refund: typeof mockRefunds[0]) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/orders/${refund.orderId}`);
          }}
          className="font-mono text-sm text-primary hover:underline"
        >
          {refund.orderId}
        </button>
      ),
    },
    {
      key: "customerName",
      label: "Customer",
    },
    {
      key: "amount",
      label: "Amount",
      render: (refund: typeof mockRefunds[0]) => (
        <span className="font-medium">€{refund.amount}</span>
      ),
    },
    {
      key: "reason",
      label: "Reason",
      render: (refund: typeof mockRefunds[0]) => (
        <span className="text-sm text-muted-foreground truncate max-w-48 block">
          {refund.reason}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (refund: typeof mockRefunds[0]) => (
        <StatusBadge status={refund.status} variant={statusVariants[refund.status]} />
      ),
    },
    {
      key: "requestedAt",
      label: "Requested",
      render: (refund: typeof mockRefunds[0]) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(refund.requestedAt), "MMM d, yyyy")}
        </span>
      ),
    },
  ];

  const handleCreateRefund = () => {
    toast.success("Refund request submitted for approval");
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Refunds</h1>
            <p className="text-muted-foreground mt-1">
              {mockRefunds.filter(r => r.status === "pending").length} pending approval
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/returns")}>
              View Returns
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Refund
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Refund Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="order">Order ID</Label>
                    <Input id="order" placeholder="AM-2024-XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Refund Amount (€)</Label>
                    <Input id="amount" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="damaged">Product damaged</SelectItem>
                        <SelectItem value="wrong_item">Wrong item received</SelectItem>
                        <SelectItem value="not_as_described">Not as described</SelectItem>
                        <SelectItem value="defective">Defective product</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Enter any additional details..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateRefund}>Submit for Approval</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search refunds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Refunds Table */}
        {filteredRefunds.length > 0 ? (
          <DataTable columns={columns} data={filteredRefunds} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <RefreshCw className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No refunds found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
