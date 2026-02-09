import { AdminLayout } from "@/components/admin/AdminLayout";
import { AuditTimeline } from "@/components/governance/AuditTimeline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, Filter } from "lucide-react";
import dashboardData from "@/data/mock/admin-dashboard.json";
import { AuditEntry } from "@/types/admin";

export default function AdminAuditLog() {
  const auditEntries = dashboardData.auditLog as AuditEntry[];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Audit Log</h1>
            <p className="text-muted-foreground mt-1">
              Complete history of all administrative actions
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search audit log..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="product">Products</SelectItem>
              <SelectItem value="order">Orders</SelectItem>
              <SelectItem value="customer">Customers</SelectItem>
              <SelectItem value="cms">CMS</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Admins</SelectItem>
              <SelectItem value="alex@amarise.com">Alexandra Noir</SelectItem>
              <SelectItem value="claire@amarise.com">Claire Martin</SelectItem>
              <SelectItem value="lucas@amarise.com">Lucas Weber</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audit Timeline */}
        <div className="border border-border p-6 bg-card">
          <AuditTimeline entries={auditEntries} showDiff={true} />
        </div>
      </div>
    </AdminLayout>
  );
}
