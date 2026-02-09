import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ErrorStateProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  showHomeLink?: boolean;
}

/**
 * Luxury-grade error state component
 * Silent, elegant, non-technical messaging
 */
export const ErrorState = ({
  title = "Something unexpected happened",
  message = "We're working to resolve this. Please try again in a moment.",
  showRetry = true,
  onRetry,
  showHomeLink = true,
}: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center py-20 md:py-32 text-center"
    >
      {/* Subtle decorative element */}
      <div className="mb-8">
        <svg
          className="w-16 h-16 text-muted-foreground/20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h3 className="font-serif text-xl md:text-2xl text-foreground/80 mb-3">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground max-w-md mb-8">{message}</p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="btn-luxury-outline text-sm px-6 py-2"
          >
            Try Again
          </button>
        )}
        {showHomeLink && (
          <Link
            to="/"
            className="text-caption link-luxury"
          >
            Return Home
          </Link>
        )}
      </div>
    </motion.div>
  );
};

/**
 * Inline error for form fields or small sections
 */
export const InlineError = ({ message }: { message: string }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm text-rose-600/80 mt-2"
    >
      {message}
    </motion.p>
  );
};
