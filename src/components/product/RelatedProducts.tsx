import { Link } from "react-router-dom";
import { ProductCard } from "@/components/common/ProductCard";
import { RevealSection } from "@/components/common/RevealSection";

interface RelatedProduct {
  image: string;
  title: string;
  subtitle: string;
  href: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
}

export const RelatedProducts = ({ 
  products, 
  title = "Complete Your Ritual" 
}: RelatedProductsProps) => {
  return (
    <section className="section-luxury bg-background">
      <div className="container-editorial">
        <RevealSection className="text-center mb-12">
          <p className="text-caption mb-4">You May Also Love</p>
          <h2 className="font-serif text-2xl md:text-3xl">{title}</h2>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <RevealSection key={product.title} delay={index * 0.1}>
              <ProductCard
                image={product.image}
                title={product.title}
                subtitle={product.subtitle}
                href={product.href}
                aspectRatio="beauty"
              />
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
