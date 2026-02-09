import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import type { Product } from "@/types/content";

interface ArchiveProductCardProps {
  product: Product;
}

/**
 * Archive product card - editorial, read-only presentation
 * No CTA, no purchase actions - purely for viewing past products
 */
export const ArchiveProductCard = ({ product }: ArchiveProductCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group block">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
      >
        {/* Image with archive treatment */}
        <div className="aspect-beauty overflow-hidden relative bg-muted">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover grayscale-[30%] opacity-90"
            loading="lazy"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={isLoaded ? { opacity: 0.9, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8 }}
            onLoad={() => setIsLoaded(true)}
          />
          {/* Subtle archive overlay - no badge, just gentle desaturation */}
          <div className="absolute inset-0 bg-background/5" />
        </div>
      </motion.div>

      {/* Product info with muted treatment */}
      <div className="mt-4 md:mt-6 space-y-1">
        <h3 className="font-serif text-lg md:text-xl text-foreground/70">
          {product.title}
        </h3>
        {product.subtitle && (
          <p className="text-sm text-muted-foreground/70">{product.subtitle}</p>
        )}
        {product.collection && (
          <p className="text-xs text-muted-foreground/50 mt-2 italic">
            {product.collection.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * Archive collection card for past collections
 */
export const ArchiveCollectionCard = ({
  collection,
}: {
  collection: {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    image: string;
    archiveDate?: string;
  };
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/archive/collection/${collection.slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
      >
        <div className="aspect-[16/9] overflow-hidden relative bg-muted">
          <motion.img
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover grayscale-[20%] opacity-85"
            loading="lazy"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={isLoaded ? { opacity: 0.85, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8 }}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-caption text-primary-foreground/60 mb-2">
              {collection.subtitle}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground/90 group-hover:opacity-80 transition-opacity">
              {collection.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
