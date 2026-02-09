import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

interface ProductCardProps {
  image: string;
  title: string;
  subtitle?: string;
  price?: string;
  href: string;
  aspectRatio?: "beauty" | "atelier" | "lifestyle";
}

export const ProductCard = ({
  image,
  title,
  subtitle,
  price,
  href,
  aspectRatio = "beauty",
}: ProductCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const aspectClasses = {
    beauty: "aspect-beauty",
    atelier: "aspect-atelier",
    lifestyle: "aspect-lifestyle",
  };

  return (
    <Link to={href} className="group block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="editorial-card"
      >
        <div className={`${aspectClasses[aspectRatio]} overflow-hidden relative bg-muted`}>
          {/* Blur placeholder */}
          <div 
            className={`absolute inset-0 bg-muted transition-opacity duration-700 ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <motion.img
            src={image}
            alt={title}
            className="editorial-card-image"
            loading="lazy"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={isLoaded ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            onLoad={() => setIsLoaded(true)}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
        </div>
      </motion.div>
      <motion.div 
        className="mt-4 md:mt-6 space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="font-serif text-lg md:text-xl group-hover:opacity-70 transition-opacity duration-300">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {price && (
          <p className="text-sm text-foreground font-medium mt-2">{price}</p>
        )}
      </motion.div>
    </Link>
  );
};
