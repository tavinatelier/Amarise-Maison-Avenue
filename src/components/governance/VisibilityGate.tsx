/**
 * CMS-READY: Soft Launch and Collection Governance Components
 * BACKEND HANDOFF: Replace mock date logic with API-driven visibility
 */

import { ReactNode } from "react";
import type { Product, Collection } from "@/types/content";

interface VisibilityGateProps {
  children: ReactNode;
  launchDate?: string | null;
  endDate?: string | null;
  fallback?: ReactNode;
}

/**
 * Gates content based on date-based visibility
 * BACKEND HANDOFF: This mock logic will be replaced with server-side checks
 */
export const VisibilityGate = ({
  children,
  launchDate,
  endDate,
  fallback = null,
}: VisibilityGateProps) => {
  const now = new Date();

  // Check if before launch
  if (launchDate && new Date(launchDate) > now) {
    return <>{fallback}</>;
  }

  // Check if after end
  if (endDate && new Date(endDate) < now) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

interface SoftLaunchBadgeProps {
  status: "active" | "soft-launch" | "archived" | "scheduled";
  className?: string;
}

/**
 * Subtle indicator for product/collection status
 * Only shows for non-active states, and in an editorial way
 */
export const SoftLaunchIndicator = ({
  status,
  className = "",
}: SoftLaunchBadgeProps) => {
  if (status === "active") return null;

  const labels = {
    "soft-launch": "Preview",
    archived: "",
    scheduled: "Coming Soon",
  };

  const label = labels[status];
  if (!label) return null;

  return (
    <span
      className={`text-xs tracking-widest uppercase text-muted-foreground/60 ${className}`}
    >
      {label}
    </span>
  );
};

/**
 * Checks if a product is purchasable based on status and dates
 * BACKEND HANDOFF: Replace with API response field
 */
export const isPurchasable = (product: Product): boolean => {
  const now = new Date();

  if (product.status !== "active") return false;
  if (product.launchDate && new Date(product.launchDate) > now) return false;
  if (product.archiveDate && new Date(product.archiveDate) < now) return false;

  return product.isPurchasable;
};

/**
 * Gets the display status for a collection
 * BACKEND HANDOFF: Replace with API response field
 */
export const getCollectionStatus = (
  collection: Collection
): "live" | "preview" | "ended" | "upcoming" => {
  const now = new Date();

  if (collection.status === "archived") return "ended";
  if (collection.status === "soft-launch") return "preview";
  if (collection.launchDate && new Date(collection.launchDate) > now) {
    return "upcoming";
  }
  if (collection.endDate && new Date(collection.endDate) < now) {
    return "ended";
  }

  return "live";
};

/**
 * Formats countdown text for upcoming launches
 * BACKEND HANDOFF: May be replaced with server-synced countdown
 */
export const getCountdownText = (launchDate: string): string => {
  const now = new Date();
  const launch = new Date(launchDate);
  const diff = launch.getTime() - now.getTime();

  if (diff <= 0) return "";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 30) {
    const months = Math.floor(days / 30);
    return `Available in ${months} month${months > 1 ? "s" : ""}`;
  }
  if (days > 0) {
    return `Available in ${days} day${days > 1 ? "s" : ""}`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  return `Available in ${hours} hour${hours > 1 ? "s" : ""}`;
};
