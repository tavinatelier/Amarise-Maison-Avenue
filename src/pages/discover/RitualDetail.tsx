import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/states";
import { SEOHead } from "@/components/seo";
import { useRituals, useProductsByDiscovery } from "@/hooks/useContent";

/**
 * Ritual Detail Page - Products curated for specific moments
 * BACKEND HANDOFF: Replace useRituals/useProductsByDiscovery with API calls
 */
const RitualDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const rituals = useRituals();
  const ritual = rituals.find(r => r.slug === slug);
  const products = useProductsByDiscovery("ritual", ritual?.id || "");

  if (!ritual) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            icon="search"
            title="Ritual not found"
            message="This ritual may have been moved or no longer exists."
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={ritual.title}
        description={ritual.description}
        image={ritual.image}
      />

      <HeroSection
        image={ritual.image}
        caption="Ritual"
        title={ritual.title}
        subtitle={ritual.description}
        fullHeight={false}
        overlayOpacity={0.35}
      />

      {/* Products Grid */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <RevealSection className="mb-12 text-center">
            <p className="text-caption mb-4">{ritual.subtitle}</p>
            <h2 className="font-serif text-2xl md:text-3xl">Curated Pieces</h2>
          </RevealSection>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <RevealSection key={product.id} delay={index * 0.1}>
                  <ProductCard
                    image={product.image}
                    title={product.title}
                    subtitle={product.subtitle}
                    price={product.price}
                    href={`/${product.category}/${product.slug}`}
                    aspectRatio={product.category as "beauty" | "atelier" | "lifestyle"}
                  />
                </RevealSection>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="products"
              title="Products coming soon"
              message="We're curating pieces for this ritual."
            />
          )}
        </div>
      </section>

      {/* Back to Discovery */}
      <section className="py-12 bg-muted/30">
        <div className="container-editorial text-center">
          <Link to="/discover" className="text-caption link-luxury">
            ← Explore More Rituals
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default RitualDetail;
