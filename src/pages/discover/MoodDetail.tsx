import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/states";
import { SEOHead } from "@/components/seo";
import { useMoods, useProductsByDiscovery } from "@/hooks/useContent";

/**
 * Mood Detail Page - Products curated by emotional quality
 * BACKEND HANDOFF: Replace useMoods/useProductsByDiscovery with API calls
 */
const MoodDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const moods = useMoods();
  const mood = moods.find(m => m.slug === slug);
  const products = useProductsByDiscovery("mood", mood?.id || "");

  if (!mood) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            icon="search"
            title="Mood not found"
            message="This mood may have been moved or no longer exists."
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={mood.title}
        description={mood.description}
        image={mood.image}
      />

      <HeroSection
        image={mood.image}
        caption="Mood"
        title={mood.title}
        subtitle={mood.description}
        fullHeight={false}
        overlayOpacity={0.35}
      />

      {/* Mood Palette Visual */}
      <section className="py-8 bg-background">
        <div className="container-editorial">
          <div className="flex justify-center gap-4">
            {mood.palette.map((color, index) => (
              <div
                key={index}
                className="w-16 h-16 rounded-full shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <RevealSection className="mb-12 text-center">
            <p className="text-caption mb-4">{mood.subtitle}</p>
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
              message="We're curating pieces for this mood."
            />
          )}
        </div>
      </section>

      {/* Back to Discovery */}
      <section className="py-12 bg-background">
        <div className="container-editorial text-center">
          <Link to="/discover" className="text-caption link-luxury">
            ← Explore More Moods
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default MoodDetail;
