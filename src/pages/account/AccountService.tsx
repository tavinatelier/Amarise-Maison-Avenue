import { AccountLayout } from "@/components/account/AccountLayout";
import { RotateCcw, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import accountData from "@/data/mock/account.json";

export default function AccountService() {
  const { serviceRequests } = accountData;

  return (
    <AccountLayout title="Returns & Service" subtitle="Manage returns, exchanges, and service requests">
      <div className="space-y-8">
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          New Return Request
        </Button>

        {serviceRequests.length === 0 ? (
          <div className="text-center py-16">
            <RotateCcw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No service requests</h3>
            <p className="text-muted-foreground">Your service history will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {serviceRequests.map((req) => (
              <div key={req.id} className="p-6 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium capitalize">{req.status}</span>
                </div>
                <p className="font-medium">{req.item}</p>
                <p className="text-sm text-muted-foreground">{req.reason}</p>
                <p className="text-sm text-muted-foreground mt-2">Resolution: {req.resolution}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
