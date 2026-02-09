/**
 * ArchiveCard - Muted presentation for archived/past collection items
 * "Controlled Memory" aesthetic - historical, not urgent
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ArchiveCardProps {
  image: string;
  title: string;
  subtitle?: string;
  year?: string;
  href?: string;
  className?: string;
}

export const ArchiveCard = ({
  image,
  title,
  subtitle,
  year,
  href,
  className,
}: ArchiveCardProps) => {
  const content = (
    <motion.div
      className={cn("group", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Image with muted treatment */}
      <div className="aspect-[3/4] overflow-hidden mb-5 relative">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale-[30%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Archive overlay */}
        <div className="absolute inset-0 bg-foreground/5 group-hover:bg-transparent transition-colors duration-700" />
        
        {/* Year badge */}
        {year && (
          <div className="absolute top-4 left-4">
            <span className="text-caption-sm text-foreground/50 bg-background/80 backdrop-blur-sm px-3 py-1.5">
              {year}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <h3 className="font-serif text-lg md:text-xl text-foreground/80 group-hover:text-foreground transition-colors duration-500">
        {title}
      </h3>
      {subtitle && (
        <p className="text-body-sm text-muted-foreground/60 mt-1">{subtitle}</p>
      )}
      
      {/* "No longer available" indicator */}
      <p className="text-caption text-muted-foreground/40 mt-3 italic">
        From the Archive
      </p>
    </motion.div>
  );

  if (href) {
    return <Link to={href} className="block">{content}</Link>;
  }

  return content;
};

/**
 * ArchiveHero - Hero section for archive pages
 */
interface ArchiveHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export const ArchiveHero = ({ title, subtitle, description }: ArchiveHeroProps) => {
  return (
    <motion.section
      className="py-32 md:py-40 bg-muted/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container-narrow text-center">
        <motion.p
          className="text-caption text-muted-foreground/60 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          The Archive
        </motion.p>
        
        <motion.h1
          className="font-serif text-display-lg text-foreground/80 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            className="text-body-lg text-muted-foreground/70 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
        )}
        
        {description && (
          <motion.p
            className="text-body-md text-muted-foreground/50 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.section>
  );
};

/**
 * ArchiveNote - Editorial note for archive context
 */
interface ArchiveNoteProps {
  children: string;
}

export const ArchiveNote = ({ children }: ArchiveNoteProps) => {
  return (
    <motion.div
      className="py-16 border-t border-b border-divider"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container-narrow">
        <p className="text-caption text-muted-foreground/50 text-center mb-4">
          A Note on the Archive
        </p>
        <p className="text-body-md text-muted-foreground/70 text-center leading-relaxed italic">
          {children}
        </p>
      </div>
    </motion.div>
  );
};
