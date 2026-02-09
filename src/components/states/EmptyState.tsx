import { motion } from "framer-motion";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: "products" | "articles" | "search" | "archive";
}

/**
 * Luxury-grade empty state component
 * Displays when no content is available
 */
export const EmptyState = ({
  title = "Nothing here yet",
  message = "Check back soon for new additions.",
  icon = "products",
}: EmptyStateProps) => {
  const icons = {
    products: (
      <svg
        className="w-12 h-12 text-muted-foreground/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    articles: (
      <svg
        className="w-12 h-12 text-muted-foreground/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
    search: (
      <svg
        className="w-12 h-12 text-muted-foreground/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    archive: (
      <svg
        className="w-12 h-12 text-muted-foreground/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center py-20 md:py-32 text-center"
    >
      <div className="mb-6">{icons[icon]}</div>
      <h3 className="font-serif text-xl md:text-2xl text-foreground/80 mb-3">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
    </motion.div>
  );
};
