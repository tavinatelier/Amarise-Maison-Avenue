/**
 * TEAM ROLES PAGE
 * Admin page for managing roles and permissions
 * 
 * BACKEND HANDOFF: Replace mock data with team.service.ts API calls
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Shield, Users, Eye, Headphones } from "lucide-react";
import teamData from "@/data/mock/team.json";

const roleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  admin: Shield,
  manager: Users,
  support: Headphones,
  viewer: Eye,
};

export default function TeamRoles() {
  const [roles, setRoles] = useState(teamData.roles);

  const permissionLabels: Record<string, string> = {
    all: "Full Access",
    orders: "Orders Management",
    "orders.view": "View Orders",
    customers: "Customer Management",
    "customers.view": "View Customers",
    inventory: "Inventory Management",
    refunds: "Process Refunds",
    "refunds.request": "Request Refunds",
    "analytics.view": "View Analytics",
    "reports.view": "View Reports",
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Roles & Permissions</h1>
            <p className="text-muted-foreground mt-1">
              Configure access levels for your team
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Role
          </Button>
        </div>

        {/* Roles Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {roles.map((role) => {
            const Icon = roleIcons[role.id] || Shield;
            return (
              <Card key={role.id} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium">{role.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {role.memberCount} member{role.memberCount !== 1 ? "s" : ""}
                        </CardDescription>
                      </div>
                    </div>
                    {!role.canAssign && (
                      <Badge variant="outline" className="text-xs">
                        System Role
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Permissions
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions.map((perm) => (
                        <Badge key={perm} variant="secondary" className="text-xs font-normal">
                          {permissionLabels[perm] || perm}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {role.canAssign && (
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground">Allow assignment</span>
                      <Switch checked={role.canAssign} />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
