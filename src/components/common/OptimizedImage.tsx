import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "beauty" | "atelier" | "lifestyle" | "hero" | "square" | "video";
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * Performance-optimized image component with:
 * - Lazy loading (unless priority)
 * - Blur-up placeholder effect
 * - Intersection Observer for viewport detection
 * - Graceful error handling
 * 
 * BACKEND HANDOFF: Can be extended to support CDN URLs and srcset
 */
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  aspectRatio,
  priority = false,
  onLoad,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const aspectClasses = {
    beauty: "aspect-[3/4]",
    atelier: "aspect-[2/3]",
    lifestyle: "aspect-square",
    hero: "aspect-[16/9]",
    square: "aspect-square",
    video: "aspect-video",
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before viewport
        threshold: 0,
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-muted ${
        aspectRatio ? aspectClasses[aspectRatio] : ""
      } ${className}`}
    >
      {/* Blur placeholder */}
      <div
        className={`absolute inset-0 bg-muted transition-opacity duration-700 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <svg
            className="w-8 h-8 text-muted-foreground/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          animate={
            isLoaded
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 1.05, filter: "blur(8px)" }
          }
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

/**
 * Background image with parallax support
 */
export const ParallaxImage = ({
  src,
  alt,
  className = "",
  speed = 0.3,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only update if in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          transform: `translateY(${scrollY * speed}px) scale(1.1)`,
        }}
      />
    </div>
  );
};
