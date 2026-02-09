/**
 * EditorialSection - Magazine-style content section with elegant spacing
 * Supports multiple layout variants for editorial storytelling
 */

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EditorialSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "accent" | "dark" | "cream";
  spacing?: "default" | "compact" | "generous" | "hero";
  container?: "editorial" | "narrow" | "wide" | "full";
}

export const EditorialSection = ({
  children,
  className,
  id,
  background = "default",
  spacing = "default",
  container = "editorial",
}: EditorialSectionProps) => {
  const backgrounds = {
    default: "bg-background",
    muted: "bg-muted/40",
    accent: "bg-accent/10",
    dark: "bg-foreground text-primary-foreground",
    cream: "bg-cream",
  };

  const spacings = {
    default: "section-luxury",
    compact: "section-luxury-sm",
    generous: "section-editorial",
    hero: "py-24 md:py-32 lg:py-40",
  };

  const containers = {
    editorial: "container-editorial",
    narrow: "container-narrow",
    wide: "container-wide",
    full: "",
  };

  return (
    <section id={id} className={cn(backgrounds[background], spacings[spacing], className)}>
      <div className={containers[container]}>
        {children}
      </div>
    </section>
  );
};

/**
 * EditorialHeader - Section headers with editorial typography
 */
interface EditorialHeaderProps {
  caption?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "large" | "small";
}

export const EditorialHeader = ({
  caption,
  title,
  description,
  align = "center",
  size = "default",
}: EditorialHeaderProps) => {
  const alignments = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  const titleSizes = {
    small: "text-display-sm",
    default: "text-display-md",
    large: "text-display-lg",
  };

  return (
    <motion.div
      className={cn("mb-16 md:mb-20 max-w-3xl", alignments[align])}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {caption && (
        <p className="text-caption text-accent mb-5">{caption}</p>
      )}
      <h2 className={cn("font-serif", titleSizes[size])}>{title}</h2>
      {description && (
        <p className="mt-6 text-body-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

/**
 * EditorialDivider - Elegant horizontal divider
 */
interface EditorialDividerProps {
  variant?: "gold" | "subtle" | "full";
  spacing?: "default" | "compact" | "generous";
}

export const EditorialDivider = ({
  variant = "gold",
  spacing = "default",
}: EditorialDividerProps) => {
  const variants = {
    gold: "w-16 h-px bg-accent",
    subtle: "w-12 h-px bg-divider",
    full: "w-full h-px bg-divider",
  };

  const spacings = {
    compact: "my-8",
    default: "my-12 md:my-16",
    generous: "my-16 md:my-24",
  };

  return (
    <motion.div
      className={cn("mx-auto", variants[variant], spacings[spacing])}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
};
