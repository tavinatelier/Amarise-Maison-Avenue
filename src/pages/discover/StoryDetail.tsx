import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { ProductCard } from "@/components/common/ProductCard";
import { EmptyState } from "@/components/states";
import { SEOHead } from "@/components/seo";
import { useStories, useProductsByDiscovery } from "@/hooks/useContent";

/**
 * Story Detail Page - Products connected by narrative
 * BACKEND HANDOFF: Replace useStories/useProductsByDiscovery with API calls
 */
const StoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const stories = useStories();
  const story = stories.find(s => s.slug === slug);
  const products = useProductsByDiscovery("story", story?.id || "");

  if (!story) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <EmptyState
            icon="search"
            title="Story not found"
            message="This story may have been moved or no longer exists."
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={story.title}
        description={story.description}
        image={story.image}
      />

      <HeroSection
        image={story.image}
        caption="Story"
        title={story.title}
        subtitle={story.description}
        fullHeight={false}
        overlayOpacity={0.35}
      />

      {/* Story Introduction */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <div className="divider-luxury mb-8" />
          <p className="text-muted-foreground leading-relaxed text-lg">
            {story.description}
          </p>
          {story.relatedArticle && (
            <Link
              to={story.relatedArticle}
              className="inline-block mt-6 text-caption link-luxury"
            >
              Read the Full Story →
            </Link>
          )}
          <div className="divider-luxury mt-8" />
        </RevealSection>
      </section>

      {/* Products Grid */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <RevealSection className="mb-12 text-center">
            <p className="text-caption mb-4">{story.subtitle}</p>
            <h2 className="font-serif text-2xl md:text-3xl">Pieces from This Story</h2>
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
              message="We're curating pieces for this story."
            />
          )}
        </div>
      </section>

      {/* Back to Discovery */}
      <section className="py-12 bg-background">
        <div className="container-editorial text-center">
          <Link to="/discover" className="text-caption link-luxury">
            ← Explore More Stories
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default StoryDetail;
