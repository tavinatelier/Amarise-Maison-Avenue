import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
  image: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  children?: ReactNode;
  fullHeight?: boolean;
  overlayOpacity?: number;
}

export const HeroSection = ({
  image,
  title,
  subtitle,
  caption,
  children,
  fullHeight = true,
  overlayOpacity = 0.3,
}: HeroSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className={`relative overflow-hidden ${
        fullHeight ? "min-h-screen" : "min-h-[60vh] md:min-h-[70vh]"
      }`}
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={image}
          alt={title || "Hero image"}
          className="w-full h-full object-cover scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              hsla(var(--hero-overlay), ${overlayOpacity * 0.5}), 
              transparent 30%,
              transparent 70%,
              hsla(var(--hero-overlay), ${overlayOpacity})
            )`,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 min-h-screen flex items-center justify-center"
      >
        <div className="container-editorial text-center">
          {caption && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-caption text-primary-foreground/80 mb-6"
            >
              {caption}
            </motion.p>
          )}

          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground max-w-4xl mx-auto leading-tight"
            >
              {title}
            </motion.h1>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-primary-foreground/40"
        />
      </motion.div>
    </section>
  );
};
