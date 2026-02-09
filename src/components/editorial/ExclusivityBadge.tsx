/**
 * Exclusivity Cues - Subtle luxury exclusivity indicators
 * "Private Preview", "By Invitation", etc.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PrivatePreviewBadgeProps {
  className?: string;
}

export const PrivatePreviewBadge = ({ className }: PrivatePreviewBadgeProps) => {
  return (
    <motion.span
      className={cn("private-preview-badge", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      Private Preview
    </motion.span>
  );
};

/**
 * InvitationOverlay - Blurred content with "By Invitation" label
 */
interface InvitationOverlayProps {
  children: React.ReactNode;
}

export const InvitationOverlay = ({ children }: InvitationOverlayProps) => {
  return (
    <div className="invitation-only">
      {children}
      <div className="invitation-only-label">
        <div className="text-center">
          <p className="text-caption text-foreground/60 mb-2">By Invitation</p>
          <p className="text-body-sm text-muted-foreground">
            Available to Private Circle members
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * CountdownQuiet - Non-urgent countdown display
 */
interface CountdownQuietProps {
  label: string;
  date: string;
  className?: string;
}

export const CountdownQuiet = ({ label, date, className }: CountdownQuietProps) => {
  return (
    <motion.div
      className={cn("text-center py-8", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <p className="text-caption text-muted-foreground/60 mb-3">{label}</p>
      <p className="font-serif text-lg text-foreground/80">{date}</p>
    </motion.div>
  );
};

/**
 * TierIndicator - Subtle VIP tier display
 */
interface TierIndicatorProps {
  tier: "standard" | "gold" | "black" | "private_circle";
  showLabel?: boolean;
}

export const TierIndicator = ({ tier, showLabel = false }: TierIndicatorProps) => {
  const tierStyles = {
    standard: "bg-muted text-muted-foreground",
    gold: "bg-accent/20 text-accent",
    black: "bg-foreground text-background",
    private_circle: "bg-foreground text-background border border-accent",
  };

  const tierLabels = {
    standard: "Member",
    gold: "Gold",
    black: "Black",
    private_circle: "Private Circle",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 text-caption-sm",
      tierStyles[tier]
    )}>
      {showLabel && tierLabels[tier]}
      {!showLabel && (
        <span className={cn(
          "w-2 h-2 rounded-full",
          tier === "standard" && "bg-muted-foreground/50",
          tier === "gold" && "bg-accent",
          tier === "black" && "bg-background",
          tier === "private_circle" && "bg-accent"
        )} />
      )}
    </span>
  );
};
