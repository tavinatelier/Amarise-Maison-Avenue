/**
 * StoryBlock - Image + Text pairing for editorial storytelling
 * Classic luxury layout pattern seen in Hermès, Dior, Net-a-Porter
 */

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface StoryBlockProps {
  image: string;
  imageAlt?: string;
  caption?: string;
  title: string;
  children?: ReactNode;
  paragraphs?: string[];
  ctaText?: string;
  ctaLink?: string;
  reversed?: boolean;
  imagePosition?: "left" | "right";
  imageAspect?: "portrait" | "square" | "landscape" | "editorial";
  aspectRatio?: "portrait" | "square" | "landscape" | "editorial";
  className?: string;
}

export const StoryBlock = ({
  image,
  imageAlt = "",
  caption,
  title,
  children,
  paragraphs,
  ctaText,
  ctaLink,
  reversed = false,
  imagePosition,
  imageAspect = "portrait",
  aspectRatio,
  className,
}: StoryBlockProps) => {
  // Support both reversed and imagePosition props
  const isReversed = imagePosition === "right" || reversed;
  const finalAspect = aspectRatio || imageAspect;

  const aspects = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    landscape: "aspect-[4/3]",
    editorial: "aspect-[2/3]",
  };

  return (
    <div className={cn("story-block", isReversed && "story-block-reversed", className)}>
      {/* Image */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={cn(aspects[finalAspect], "overflow-hidden")}>
          <motion.img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex flex-col justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {caption && (
          <p className="text-caption text-accent mb-4">{caption}</p>
        )}
        
        <h3 className="font-serif text-display-sm mb-6">{title}</h3>
        
        <div className="text-body-md text-muted-foreground space-y-5 leading-relaxed">
          {paragraphs ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            children
          )}
        </div>

        {ctaLink && ctaText && (
          <Link
            to={ctaLink}
            className="inline-block mt-8 btn-luxury-outline self-start"
          >
            {ctaText}
          </Link>
        )}
      </motion.div>
    </div>
  );
};

/**
 * ImageTextDuet - Side-by-side pairing with balanced visual weight
 */
interface ImageTextDuetProps {
  image: string;
  imageAlt?: string;
  children: ReactNode;
  reversed?: boolean;
  imageWidth?: "half" | "wide" | "narrow";
}

export const ImageTextDuet = ({
  image,
  imageAlt = "",
  children,
  reversed = false,
  imageWidth = "half",
}: ImageTextDuetProps) => {
  const imageWidths = {
    narrow: "lg:col-span-5",
    half: "lg:col-span-6",
    wide: "lg:col-span-7",
  };

  const textWidths = {
    narrow: "lg:col-span-7",
    half: "lg:col-span-6",
    wide: "lg:col-span-5",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <motion.div
        className={cn(imageWidths[imageWidth], reversed && "lg:order-2")}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
      </motion.div>

      <motion.div
        className={cn(textWidths[imageWidth], reversed && "lg:order-1")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
