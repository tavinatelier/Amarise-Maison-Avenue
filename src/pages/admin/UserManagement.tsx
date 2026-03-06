import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Shield, Search } from "lucide-react";
import { useState } from "react";
import usersData from "@/data/mock/users.json";

const roleColor: Record<string, string> = {
  super_admin: "bg-red-500/10 text-red-700 border-red-200",
  editor: "bg-blue-500/10 text-blue-700 border-blue-200",
  seo_manager: "bg-purple-500/10 text-purple-700 border-purple-200",
  operations_manager: "bg-amber-500/10 text-amber-700 border-amber-200",
  customer: "bg-muted text-muted-foreground border-border",
};

const statusColor: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  inactive: "bg-muted text-muted-foreground border-border",
};

const tierColor: Record<string, string> = {
  standard: "bg-muted text-muted-foreground border-border",
  gold: "bg-amber-500/10 text-amber-700 border-amber-200",
  black: "bg-foreground/10 text-foreground border-foreground/20",
  private_circle: "bg-purple-500/10 text-purple-700 border-purple-200",
};

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const users = usersData.users;

  const filtered = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email} ${u.role}`.toLowerCase().includes(search.toLowerCase())
  );

  const staffUsers = filtered.filter(u => u.role !== "customer");
  const customerUsers = filtered.filter(u => u.role === "customer");

  const renderTable = (list: typeof users) => (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Country</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Tier</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Last Login</th>
              </tr>
            </thead>
            <tbody>
              {list.map(user => (
                <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30">
                  <td className="p-3 font-medium">{user.firstName} {user.lastName}</td>
                  <td className="p-3 hidden sm:table-cell text-muted-foreground text-xs">{user.email}</td>
                  <td className="p-3"><Badge variant="outline" className={roleColor[user.role] || roleColor.customer}>{user.role.replace("_", " ")}</Badge></td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground">{user.country}</td>
                  <td className="p-3 hidden md:table-cell"><Badge variant="outline" className={tierColor[user.tier] || tierColor.standard}>{user.tier}</Badge></td>
                  <td className="p-3"><Badge variant="outline" className={statusColor[user.status]}>{user.status}</Badge></td>
                  <td className="p-3 hidden lg:table-cell text-muted-foreground text-xs">{new Date(user.lastLoginAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">User Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage platform users, staff, and customer accounts.</p>
          </div>
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" /> Invite User
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-4 flex items-center gap-3"><Users className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">{users.length}</p><p className="text-xs text-muted-foreground">Total Users</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><Shield className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">{users.filter(u => u.role !== "customer").length}</p><p className="text-xs text-muted-foreground">Staff Members</p></div></CardContent></Card>
          <Card><CardContent className="p-4 flex items-center gap-3"><Users className="h-5 w-5 text-muted-foreground" /><div><p className="text-2xl font-semibold">{users.filter(u => u.status === "active").length}</p><p className="text-xs text-muted-foreground">Active</p></div></CardContent></Card>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
            <TabsTrigger value="staff">Staff ({staffUsers.length})</TabsTrigger>
            <TabsTrigger value="customers">Customers ({customerUsers.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all">{renderTable(filtered)}</TabsContent>
          <TabsContent value="staff">{renderTable(staffUsers)}</TabsContent>
          <TabsContent value="customers">{renderTable(customerUsers)}</TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
