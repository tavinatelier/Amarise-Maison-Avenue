/**
 * PullQuote - Statement quote with editorial styling
 * Creates pause moments in the page flow
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  context?: string;
  variant?: "centered" | "offset" | "minimal";
  size?: "default" | "large" | "small";
}

export const PullQuote = ({
  quote,
  attribution,
  context,
  variant = "centered",
  size = "default",
}: PullQuoteProps) => {
  const sizes = {
    small: "text-xl md:text-2xl",
    default: "text-2xl md:text-3xl lg:text-4xl",
    large: "text-3xl md:text-4xl lg:text-5xl",
  };

  if (variant === "minimal") {
    return (
      <motion.div
        className="py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <blockquote className={cn("font-serif italic text-center leading-relaxed", sizes[size])}>
          "{quote}"
        </blockquote>
        {(attribution || context) && (
          <p className="text-caption text-center mt-6 text-muted-foreground">
            {attribution ? `— ${attribution}` : context}
          </p>
        )}
      </motion.div>
    );
  }

  if (variant === "offset") {
    return (
      <motion.div
        className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="lg:col-span-2 flex items-start justify-center lg:justify-end">
          <span className="font-serif text-6xl md:text-8xl text-accent/40 leading-none">"</span>
        </div>
        <div className="lg:col-span-8">
          <blockquote className={cn("font-serif leading-relaxed", sizes[size])}>
            {quote}
          </blockquote>
          {(attribution || context) && (
            <p className="text-caption mt-8 text-muted-foreground">
              {attribution ? `— ${attribution}` : context}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  // Centered variant (default)
  return (
    <motion.div
      className="pull-quote"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <blockquote className={cn("pull-quote-text max-w-4xl mx-auto", sizes[size])}>
        "{quote}"
      </blockquote>
      {(attribution || context) && (
        <p className="text-caption text-center mt-8 text-muted-foreground">
          {attribution ? `— ${attribution}` : context}
        </p>
      )}
    </motion.div>
  );
};

/**
 * BrandStatement - Large typographic statement for brand philosophy
 */
interface BrandStatementProps {
  children?: string;
  statement?: string;
  attribution?: string;
  className?: string;
}

export const BrandStatement = ({ 
  children, 
  statement, 
  attribution,
  className 
}: BrandStatementProps) => {
  const text = statement || children;
  
  return (
    <motion.div
      className={cn("py-20 md:py-32", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      <div className="container-narrow">
        <div className="divider-luxury mb-10" />
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-center leading-relaxed text-foreground/90">
          {text}
        </p>
        {attribution && (
          <p className="text-caption text-center mt-8 text-muted-foreground">
            — {attribution}
          </p>
        )}
        <div className="divider-luxury mt-10" />
      </div>
    </motion.div>
  );
};
