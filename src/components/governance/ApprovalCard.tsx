import { ApprovalRequest } from "@/types/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Check, X, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ApprovalCardProps {
  approval: ApprovalRequest;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const typeLabels: Record<string, string> = {
  price_change: "Price Change",
  refund: "Refund Request",
  product_publish: "Product Publish",
  cms_publish: "CMS Publish",
  country_override: "Country Override",
};

export function ApprovalCard({ approval, onApprove, onReject }: ApprovalCardProps) {
  const isPending = approval.status === "pending";
  
  return (
    <div className="border border-border p-6 bg-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-caption">{typeLabels[approval.type] || approval.type}</span>
            <StatusBadge status={approval.status} />
          </div>
          <h4 className="text-lg font-medium">{approval.resourceId}</h4>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Clock className="h-4 w-4" />
          {formatDistanceToNow(new Date(approval.createdAt), { addSuffix: true })}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{approval.reason}</p>

      <div className="bg-muted/30 p-4 mb-4">
        <p className="text-caption mb-2">Changes</p>
        {Object.entries(approval.changes).map(([field, change]) => (
          <div key={field} className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">{field}:</span>
            <span className="line-through text-red-600/70">{String(change.from)}</span>
            <span>→</span>
            <span className="text-green-600">{String(change.to)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Requested by <span className="text-foreground">{approval.requestedBy.name}</span>
        </div>

        {isPending && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject?.(approval.id)}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={() => onApprove?.(approval.id)}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              Approve
            </Button>
          </div>
        )}

        {!isPending && approval.reviewedBy && (
          <div className="text-sm text-muted-foreground">
            {approval.status === "approved" ? "Approved" : "Rejected"} by{" "}
            <span className="text-foreground">{approval.reviewedBy.name}</span>
          </div>
        )}
      </div>

      {approval.reviewNotes && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-caption mb-1">Review Notes</p>
          <p className="text-sm">{approval.reviewNotes}</p>
        </div>
      )}
    </div>
  );
}
