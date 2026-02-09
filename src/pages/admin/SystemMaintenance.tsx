/**
 * SYSTEM MAINTENANCE PAGE
 * Maintenance scheduling and emergency banner management
 * 
 * BACKEND HANDOFF: Replace mock data with system.service.ts API calls
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Plus, Calendar, Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import systemData from "@/data/mock/system.json";

export default function SystemMaintenance() {
  const [schedule, setSchedule] = useState(systemData.maintenanceSchedule);
  const [banner, setBanner] = useState(systemData.emergencyBanner);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusVariants: Record<string, "default" | "success" | "warning" | "info"> = {
    scheduled: "info",
    in_progress: "warning",
    completed: "success",
  };

  const handleBannerToggle = (enabled: boolean) => {
    setBanner({ ...banner, enabled });
    toast.success(enabled ? "Emergency banner enabled" : "Emergency banner disabled");
  };

  const handleScheduleMaintenance = () => {
    toast.success("Maintenance window scheduled");
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Maintenance</h1>
            <p className="text-muted-foreground mt-1">
              Schedule maintenance and manage emergency communications
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Schedule Maintenance
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Maintenance Window</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Maintenance title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the maintenance..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start">Start Time</Label>
                    <Input id="start" type="datetime-local" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end">End Time</Label>
                    <Input id="end" type="datetime-local" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Affected Services</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select services" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkout">Checkout</SelectItem>
                      <SelectItem value="payments">Payments</SelectItem>
                      <SelectItem value="orders">Orders</SelectItem>
                      <SelectItem value="all">All Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleMaintenance}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Emergency Banner */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Emergency Banner
            </CardTitle>
            <CardDescription>
              Display a site-wide announcement to all customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Enable Banner</p>
                <p className="text-sm text-muted-foreground">
                  Show emergency message on all pages
                </p>
              </div>
              <Switch
                checked={banner.enabled}
                onCheckedChange={handleBannerToggle}
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Banner Message</Label>
                <Textarea
                  id="message"
                  value={banner.message}
                  onChange={(e) => setBanner({ ...banner, message: e.target.value })}
                  placeholder="Enter the message to display..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Banner Type</Label>
                  <Select
                    value={banner.type}
                    onValueChange={(value) => setBanner({ ...banner, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          Info
                        </div>
                      </SelectItem>
                      <SelectItem value="warning">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Warning
                        </div>
                      </SelectItem>
                      <SelectItem value="success">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          Success
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Show On</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pages</SelectItem>
                      <SelectItem value="checkout">Checkout Only</SelectItem>
                      <SelectItem value="homepage">Homepage Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={banner.dismissible}
                  onCheckedChange={(dismissible) => setBanner({ ...banner, dismissible })}
                />
                <Label>Allow customers to dismiss</Label>
              </div>
            </div>

            {banner.enabled && banner.message && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <Alert variant={banner.type === "warning" ? "destructive" : "default"}>
                  {banner.type === "warning" && <AlertTriangle className="h-4 w-4" />}
                  {banner.type === "info" && <Info className="h-4 w-4" />}
                  {banner.type === "success" && <CheckCircle className="h-4 w-4" />}
                  <AlertTitle>Announcement</AlertTitle>
                  <AlertDescription>{banner.message || "Your message here..."}</AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scheduled Maintenance */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Scheduled Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {schedule.length > 0 ? (
              <div className="space-y-4">
                {schedule.map((maint) => (
                  <div key={maint.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{maint.title}</p>
                      <p className="text-sm text-muted-foreground">{maint.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>
                          Start: {format(new Date(maint.scheduledStart), "MMM d, yyyy h:mm a")}
                        </span>
                        <span>
                          End: {format(new Date(maint.scheduledEnd), "MMM d, yyyy h:mm a")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground">Affects:</span>
                        {maint.affectedServices.map((service) => (
                          <span key={service} className="text-xs bg-muted px-2 py-0.5 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge
                        status={maint.status}
                        variant={statusVariants[maint.status]}
                      />
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No maintenance scheduled</h3>
                <p className="text-muted-foreground mt-1">
                  Schedule maintenance windows to inform your team
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Audit Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Audit Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Log Retention</p>
                  <p className="text-sm text-muted-foreground">
                    {systemData.auditSettings.retentionDays} days
                  </p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Log Level</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {systemData.auditSettings.logLevel}
                  </p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Mask Sensitive Fields</p>
                  <p className="text-sm text-muted-foreground">
                    PII data is masked in logs
                  </p>
                </div>
                <Switch checked={systemData.auditSettings.sensitiveFieldsMasked} />
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">Export Enabled</p>
                  <p className="text-sm text-muted-foreground">
                    Allow log exports
                  </p>
                </div>
                <Switch checked={systemData.auditSettings.exportEnabled} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
