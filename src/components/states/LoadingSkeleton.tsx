import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  variant?: "product" | "article" | "hero" | "text";
  count?: number;
  className?: string;
}

/**
 * Luxury-grade loading skeleton with subtle blur reveal
 * Matches AMARISÉ's quiet luxury aesthetic
 */
export const LoadingSkeleton = ({
  variant = "product",
  count = 1,
  className = "",
}: LoadingSkeletonProps) => {
  const renderSkeleton = (index: number) => {
    switch (variant) {
      case "hero":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full min-h-screen bg-muted overflow-hidden"
          >
            <div className="absolute inset-0 skeleton-shimmer" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-24 h-3 bg-muted-foreground/10 rounded mx-auto" />
                <div className="w-64 h-8 bg-muted-foreground/10 rounded mx-auto" />
                <div className="w-48 h-4 bg-muted-foreground/10 rounded mx-auto" />
              </div>
            </div>
          </motion.div>
        );

      case "product":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={className}
          >
            <div className="relative aspect-beauty bg-muted overflow-hidden rounded">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="w-3/4 h-5 bg-muted-foreground/10 rounded" />
              <div className="w-1/2 h-4 bg-muted-foreground/10 rounded" />
            </div>
          </motion.div>
        );

      case "article":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={className}
          >
            <div className="relative aspect-[4/3] bg-muted overflow-hidden rounded mb-4">
              <div className="absolute inset-0 skeleton-shimmer" />
            </div>
            <div className="space-y-2">
              <div className="w-16 h-3 bg-muted-foreground/10 rounded" />
              <div className="w-full h-6 bg-muted-foreground/10 rounded" />
              <div className="w-5/6 h-4 bg-muted-foreground/10 rounded" />
            </div>
          </motion.div>
        );

      case "text":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`space-y-2 ${className}`}
          >
            <div className="w-full h-4 bg-muted-foreground/10 rounded" />
            <div className="w-5/6 h-4 bg-muted-foreground/10 rounded" />
            <div className="w-4/6 h-4 bg-muted-foreground/10 rounded" />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => renderSkeleton(index))}
    </>
  );
};

/**
 * Grid layout for loading skeletons
 */
export const LoadingGrid = ({
  columns = 3,
  count = 6,
  variant = "product",
}: {
  columns?: 2 | 3 | 4;
  count?: number;
  variant?: "product" | "article";
}) => {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-8 md:gap-10`}>
      <LoadingSkeleton variant={variant} count={count} />
    </div>
  );
};
