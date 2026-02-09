/**
 * CinematicHero - Full-screen immersive hero with parallax and cinematic effects
 * Benchmark: Chanel, Dior, Hermès hero experiences
 */

import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

interface CinematicHeroProps {
  image: string;
  video?: string;
  videoUrl?: string;
  caption?: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  children?: ReactNode;
  showScrollIndicator?: boolean;
  overlayIntensity?: "light" | "medium" | "dark";
  overlayOpacity?: number;
}

export const CinematicHero = ({
  image,
  video,
  videoUrl,
  caption,
  title,
  subtitle,
  ctaText = "Enter the Maison",
  ctaLink = "/discover",
  children,
  showScrollIndicator = true,
  overlayIntensity = "medium",
  overlayOpacity,
}: CinematicHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  // Support both overlayIntensity and overlayOpacity
  const overlayClasses = {
    light: "from-black/10 via-transparent to-black/30",
    medium: "from-black/20 via-black/5 to-black/50",
    dark: "from-black/40 via-black/15 to-black/60",
  };

  const videoSource = videoUrl || video;

  return (
    <section 
      ref={containerRef}
      className="hero-cinematic"
      style={{ height: "100vh", minHeight: "100svh" }}
    >
      {/* Background Media */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        {videoSource ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={image}
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        ) : (
          <motion.img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </motion.div>

      {/* Cinematic Overlay */}
      {overlayOpacity !== undefined ? (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayClasses[overlayIntensity]}`} />
      )}
      
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.2) 100%)"
      }} />

      {/* Content */}
      <motion.div 
        className="hero-cinematic-content px-6"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Caption */}
          {caption && (
            <motion.p
              className="text-caption-sm text-white/70 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {caption}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            className="font-serif text-display-hero text-white mb-6 text-balance"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              className="text-body-lg text-white/80 max-w-xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Button */}
          {ctaLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Link to={ctaLink} className="btn-enter-maison group">
                <span>{ctaText}</span>
              </Link>
            </motion.div>
          )}

          {children}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="scroll-indicator-text">Scroll</span>
          <div className="scroll-indicator-line" />
        </motion.div>
      )}
    </section>
  );
};
