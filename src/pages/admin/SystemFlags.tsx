/**
 * SYSTEM FLAGS PAGE
 * Feature flag management
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
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Flag, Search } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import systemData from "@/data/mock/system.json";

export default function SystemFlags() {
  const [flags, setFlags] = useState(systemData.featureFlags);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredFlags = flags.filter(
    (flag) =>
      flag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleFlag = (flagId: string, enabled: boolean) => {
    setFlags(flags.map((f) => (f.id === flagId ? { ...f, enabled } : f)));
    const flag = flags.find((f) => f.id === flagId);
    if (flag) {
      toast.success(`${flag.name} ${enabled ? "enabled" : "disabled"}`);
    }
  };

  const handleRolloutChange = (flagId: string, percentage: number[]) => {
    setFlags(flags.map((f) => (f.id === flagId ? { ...f, rolloutPercentage: percentage[0] } : f)));
  };

  const handleCreateFlag = () => {
    toast.success("Feature flag created");
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Feature Flags</h1>
            <p className="text-muted-foreground mt-1">
              Control feature rollouts and experiments
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Flag
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Feature Flag</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Flag ID</Label>
                  <Input id="id" placeholder="feature_name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" placeholder="Feature Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe what this feature does..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFlag}>Create Flag</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search flags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Flags Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredFlags.map((flag) => (
            <Card key={flag.id} className="border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flag className={`h-5 w-5 ${flag.enabled ? "text-emerald-600" : "text-muted-foreground"}`} />
                    <div>
                      <CardTitle className="text-base font-medium">{flag.name}</CardTitle>
                      <p className="text-xs text-muted-foreground font-mono">{flag.id}</p>
                    </div>
                  </div>
                  <Switch
                    checked={flag.enabled}
                    onCheckedChange={(enabled) => handleToggleFlag(flag.id, enabled)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{flag.description}</p>

                {flag.enabled && (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rollout</span>
                        <span className="font-medium">{flag.rolloutPercentage}%</span>
                      </div>
                      <Slider
                        value={[flag.rolloutPercentage]}
                        onValueChange={(value) => handleRolloutChange(flag.id, value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    {flag.enabledForCountries.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Enabled Countries</span>
                        <div className="flex flex-wrap gap-1.5">
                          {flag.enabledForCountries.map((country) => (
                            <Badge key={country} variant="secondary" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
                  <span>Created {format(new Date(flag.createdAt), "MMM d, yyyy")}</span>
                  <StatusBadge
                    status={flag.enabled ? "Active" : "Inactive"}
                    variant={flag.enabled ? "success" : "default"}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFlags.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Flag className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No flags found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or create a new flag
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
