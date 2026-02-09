import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label?: string;
  title?: string;
  value: string | number;
  subValue?: string;
  subtitle?: string;
  icon?: ReactNode | LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function MetricCard({
  label,
  title,
  value,
  subValue,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  className,
}: MetricCardProps) {
  const displayLabel = label || title;
  const displaySubValue = subValue || subtitle;
  
  const renderIcon = () => {
    if (!Icon) return null;
    if (typeof Icon === 'function') {
      const IconComponent = Icon as LucideIcon;
      return <IconComponent className="h-5 w-5" />;
    }
    return Icon;
  };

  return (
    <div
      className={cn(
        "p-6 border border-border bg-card transition-all duration-300 hover:shadow-luxury",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-caption mb-2">{displayLabel}</p>
          <p className="text-2xl md:text-3xl font-light tracking-tight">
            {value}
          </p>
          {displaySubValue && (
            <p className="text-sm text-muted-foreground mt-1">{displaySubValue}</p>
          )}
          {trend && trendValue && (
            <p
              className={cn(
                "text-sm mt-2",
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-600",
                trend === "neutral" && "text-muted-foreground"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trendValue}
            </p>
          )}
        </div>
        {Icon && (
          <div className="text-muted-foreground/50">{renderIcon()}</div>
        )}
      </div>
    </div>
  );
}
