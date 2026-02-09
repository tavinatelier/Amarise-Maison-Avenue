/**
 * TEAM ACTIVITY PAGE
 * Admin page for viewing team activity and shift handovers
 * 
 * BACKEND HANDOFF: Replace mock data with team.service.ts API calls
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import teamData from "@/data/mock/team.json";

export default function TeamActivity() {
  const [memberFilter, setMemberFilter] = useState("all");

  const actionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    approved_refund: CheckCircle,
    updated_inventory: FileText,
    processed_order: FileText,
    requested_refund: AlertCircle,
    shift_handover: Clock,
    customer_note: User,
  };

  const actionLabels: Record<string, string> = {
    approved_refund: "Approved Refund",
    updated_inventory: "Updated Inventory",
    processed_order: "Processed Order",
    requested_refund: "Requested Refund",
    shift_handover: "Shift Handover",
    customer_note: "Customer Note",
  };

  const filteredActivity = teamData.activityLog.filter(
    (activity) => memberFilter === "all" || activity.userId === memberFilter
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Team Activity</h1>
            <p className="text-muted-foreground mt-1">
              Monitor team actions and shift handovers
            </p>
          </div>
          <Select value={memberFilter} onValueChange={setMemberFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by member" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              {teamData.members.filter(m => m.status === "active").map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="handovers">Shift Handovers</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            {filteredActivity.length > 0 ? (
              <div className="space-y-3">
                {filteredActivity.map((activity) => {
                  const Icon = actionIcons[activity.action] || FileText;
                  return (
                    <Card key={activity.id} className="border-border">
                      <CardContent className="py-4">
                        <div className="flex items-start gap-4">
                          <div className="p-2 rounded-lg bg-muted shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium">{activity.userName}</span>
                              <span className="text-muted-foreground">·</span>
                              <span className="text-sm text-muted-foreground">
                                {actionLabels[activity.action] || activity.action}
                              </span>
                              {activity.country && (
                                <Badge variant="outline" className="text-xs">
                                  {activity.country}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {activity.details}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No activity found</h3>
                <p className="text-muted-foreground mt-1">
                  Activity will appear here as team members take actions
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="handovers" className="space-y-4">
            {teamData.handoverNotes.map((handover) => (
              <Card key={handover.id} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                      {handover.region} {handover.shiftType.charAt(0).toUpperCase() + handover.shiftType.slice(1)} Shift
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(handover.timestamp), "MMM d, yyyy")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Handed over by</span>
                    <span className="font-medium">{handover.createdByName}</span>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {handover.notes}
                    </pre>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <span>{handover.openIssues} open issues</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>{handover.resolvedIssues} resolved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
