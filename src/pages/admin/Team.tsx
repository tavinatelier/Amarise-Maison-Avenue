/**
 * TEAM MANAGEMENT PAGE
 * Admin page for managing team members
 * 
 * BACKEND HANDOFF: Replace mock data with team.service.ts API calls
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Users } from "lucide-react";
import teamData from "@/data/mock/team.json";

export default function Team() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers = teamData.members.filter((member) => {
    const matchesSearch =
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (member: typeof teamData.members[0]) => (
        <div>
          <p className="font-medium">{member.firstName} {member.lastName}</p>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (member: typeof teamData.members[0]) => (
        <span className="text-sm">{member.title}</span>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (member: typeof teamData.members[0]) => {
        const roleConfig: Record<string, "default" | "success" | "warning" | "info"> = {
          admin: "success",
          manager: "info",
          support: "default",
          viewer: "warning",
        };
        return <StatusBadge status={member.role} variant={roleConfig[member.role] || "default"} />;
      },
    },
    {
      key: "countries",
      label: "Countries",
      render: (member: typeof teamData.members[0]) => (
        <span className="text-sm text-muted-foreground">
          {member.countries.length > 0 ? member.countries.join(", ") : "—"}
        </span>
      ),
    },
    {
      key: "timezone",
      label: "Timezone",
      render: (member: typeof teamData.members[0]) => (
        <span className="text-sm text-muted-foreground">{member.timezone.split("/")[1]}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (member: typeof teamData.members[0]) => (
        <StatusBadge
          status={member.status}
          variant={member.status === "active" ? "success" : "default"}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Team Management</h1>
            <p className="text-muted-foreground mt-1">
              {teamData.members.filter(m => m.status === "active").length} active members
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/team/roles")}>
              Manage Roles
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/team/activity")}>
              Activity Log
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Invite Member
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Team Table */}
        {filteredMembers.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredMembers}
            onRowClick={(member) => navigate(`/admin/team/${member.id}`)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No team members found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
