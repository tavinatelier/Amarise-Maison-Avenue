/**
 * MoodTile - Emotional navigation tile for Discovery section
 * Serendipity-focused browsing experience
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MoodTileProps {
  image: string;
  title: string;
  subtitle?: string;
  href: string;
  size?: "default" | "large" | "featured";
  className?: string;
}

export const MoodTile = ({
  image,
  title,
  subtitle,
  href,
  size = "default",
  className,
}: MoodTileProps) => {
  const sizes = {
    default: "aspect-square",
    large: "aspect-[4/5]",
    featured: "aspect-[3/4] md:aspect-[2/3]",
  };

  return (
    <Link to={href} className={cn("block group", className)}>
      <motion.div
        className={cn("mood-tile", sizes[size])}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Image */}
        <motion.img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Overlay */}
        <div className="mood-tile-overlay" />

        {/* Content */}
        <div className="mood-tile-content">
          <motion.h3
            className="font-serif text-xl md:text-2xl text-white mb-2"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h3>
          {subtitle && (
            <p className="text-caption-sm text-white/60">{subtitle}</p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

/**
 * RitualTile - Card for ritual-based navigation
 */
interface RitualTileProps {
  image: string;
  title: string;
  description?: string;
  productCount?: number;
  href: string;
}

export const RitualTile = ({
  image,
  title,
  description,
  productCount,
  href,
}: RitualTileProps) => {
  return (
    <Link to={href} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Image */}
        <div className="aspect-square overflow-hidden mb-5 relative">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <h3 className="font-serif text-lg md:text-xl mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="text-body-sm text-muted-foreground mb-2">{description}</p>
        )}
        {productCount !== undefined && (
          <p className="text-caption text-muted-foreground/60">{productCount} pieces</p>
        )}
      </motion.div>
    </Link>
  );
};

/**
 * StoryTile - Horizontal card for story-based navigation
 */
interface StoryTileProps {
  image: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  href: string;
}

export const StoryTile = ({
  image,
  title,
  subtitle,
  excerpt,
  href,
}: StoryTileProps) => {
  return (
    <Link to={href} className="group flex gap-6 items-start">
      <motion.div
        className="w-28 h-28 flex-shrink-0 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="font-serif text-lg mb-1 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        {subtitle && (
          <p className="text-caption text-muted-foreground/70 mb-2">{subtitle}</p>
        )}
        {excerpt && (
          <p className="text-body-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        )}
      </motion.div>
    </Link>
  );
};
