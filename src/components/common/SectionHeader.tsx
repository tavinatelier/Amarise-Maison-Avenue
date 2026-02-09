import { Link } from "react-router-dom";
import { RevealSection } from "./RevealSection";

interface SectionHeaderProps {
  caption?: string;
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
  centered?: boolean;
}

export const SectionHeader = ({
  caption,
  title,
  description,
  href,
  linkText = "Explore",
  centered = true,
}: SectionHeaderProps) => {
  return (
    <RevealSection className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      {caption && <p className="text-caption mb-4">{caption}</p>}
      
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">{title}</h2>
      
      {description && (
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
      
      {href && (
        <Link
          to={href}
          className="inline-block mt-6 text-caption link-luxury hover:opacity-70 transition-opacity"
        >
          {linkText}
        </Link>
      )}
    </RevealSection>
  );
};
