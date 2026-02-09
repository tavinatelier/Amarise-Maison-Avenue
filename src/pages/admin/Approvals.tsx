import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ApprovalCard } from "@/components/governance/ApprovalCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dashboardData from "@/data/mock/admin-dashboard.json";
import { ApprovalRequest } from "@/types/admin";
import { toast } from "@/hooks/use-toast";

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState<ApprovalRequest[]>(
    dashboardData.approvals as ApprovalRequest[]
  );

  const pendingApprovals = approvals.filter((a) => a.status === "pending");
  const reviewedApprovals = approvals.filter((a) => a.status !== "pending");

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "approved" as const,
              reviewedBy: {
                id: "admin_001",
                name: "Current Admin",
                email: "admin@amarise.com",
              },
              reviewedAt: new Date().toISOString(),
            }
          : a
      )
    );
    toast({
      title: "Request Approved",
      description: "The approval request has been approved.",
    });
  };

  const handleReject = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "rejected" as const,
              reviewedBy: {
                id: "admin_001",
                name: "Current Admin",
                email: "admin@amarise.com",
              },
              reviewedAt: new Date().toISOString(),
            }
          : a
      )
    );
    toast({
      title: "Request Rejected",
      description: "The approval request has been rejected.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light tracking-tight">Approvals</h1>
          <p className="text-muted-foreground mt-1">
            Review and manage approval requests
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              {pendingApprovals.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">
                  {pendingApprovals.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingApprovals.length === 0 ? (
              <div className="border border-border p-8 text-center text-muted-foreground">
                No pending approval requests
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <ApprovalCard
                    key={approval.id}
                    approval={approval}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviewed" className="mt-6">
            {reviewedApprovals.length === 0 ? (
              <div className="border border-border p-8 text-center text-muted-foreground">
                No reviewed requests
              </div>
            ) : (
              <div className="space-y-4">
                {reviewedApprovals.map((approval) => (
                  <ApprovalCard key={approval.id} approval={approval} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
