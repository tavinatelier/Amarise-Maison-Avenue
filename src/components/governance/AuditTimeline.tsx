import { AuditEntry } from "@/types/admin";
import { formatDistanceToNow, format } from "date-fns";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditTimelineProps {
  entries: AuditEntry[];
  showDiff?: boolean;
}

const resourceIcons: Record<string, typeof Package> = {
  product: Package,
  order: ShoppingCart,
  customer: Users,
  cms: FileText,
  settings: Settings,
};

const actionLabels: Record<string, string> = {
  "product.create": "Created product",
  "product.update": "Updated product",
  "product.publish": "Published product",
  "product.archive": "Archived product",
  "order.create": "Order placed",
  "order.fulfill": "Order fulfilled",
  "order.ship": "Order shipped",
  "order.refund": "Order refunded",
  "approval.request": "Requested approval",
  "approval.approve": "Approved request",
  "approval.reject": "Rejected request",
  "refund.request": "Requested refund",
};

export function AuditTimeline({ entries, showDiff = true }: AuditTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
      
      <div className="space-y-6">
        {entries.map((entry, index) => {
          const Icon = resourceIcons[entry.resourceType] || Package;
          
          return (
            <div key={entry.id} className="relative pl-10">
              <div
                className={cn(
                  "absolute left-0 w-8 h-8 rounded-full bg-background border border-border",
                  "flex items-center justify-center"
                )}
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="border border-border p-4 bg-card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">
                      {actionLabels[entry.action] || entry.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {entry.resourceType}: {entry.resourceId}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}</p>
                    <p className="text-xs">{format(new Date(entry.timestamp), "HH:mm")}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  by {entry.adminEmail}
                </p>
                
                {showDiff && entry.changes.length > 0 && (
                  <div className="bg-muted/30 p-3 space-y-2">
                    {entry.changes.map((change, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground min-w-[100px]">
                          {change.field}:
                        </span>
                        <span className="text-red-600/70 line-through">
                          {String(change.oldValue)}
                        </span>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <span className="text-green-600">
                          {String(change.newValue)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
