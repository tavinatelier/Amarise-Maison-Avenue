import { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  blur?: boolean;
}

export const RevealSection = ({
  children,
  className = "",
  delay = 0,
  blur = false,
}: RevealSectionProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 30,
        filter: blur ? "blur(8px)" : "blur(0px)"
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)"
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
