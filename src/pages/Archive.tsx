import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { ArchiveProductCard, ArchiveCollectionCard } from "@/components/archive/ArchiveProductCard";
import { useArchivedProducts, useArchivedCollections } from "@/hooks/useContent";
import { EmptyState } from "@/components/states";

import atelierHero from "@/assets/atelier-hero.jpg";

/**
 * Archive Page - Editorial presentation of past collections and products
 * Read-only, no purchase CTAs, subtle visual treatment
 */
const Archive = () => {
  const archivedProducts = useArchivedProducts();
  const archivedCollections = useArchivedCollections();

  return (
    <Layout>
      {/* SEO: meta handled in index.html template */}
      <HeroSection
        image={atelierHero}
        caption="Archive"
        title="Past Collections"
        subtitle="A retrospective of pieces that defined our journey."
        fullHeight={false}
        overlayOpacity={0.4}
      />

      {/* Archived Collections */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <RevealSection className="mb-12">
            <p className="text-caption mb-4">Collections</p>
            <h2 className="font-serif text-2xl md:text-3xl">Past Seasons</h2>
          </RevealSection>

          {archivedCollections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {archivedCollections.map((collection, index) => (
                <RevealSection key={collection.id} delay={index * 0.1}>
                  <ArchiveCollectionCard collection={collection} />
                </RevealSection>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="archive"
              title="No archived collections"
              message="Past collections will appear here."
            />
          )}
        </div>
      </section>

      {/* Archived Products */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <RevealSection className="mb-12">
            <p className="text-caption mb-4">Products</p>
            <h2 className="font-serif text-2xl md:text-3xl">Past Pieces</h2>
          </RevealSection>

          {archivedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {archivedProducts.map((product, index) => (
                <RevealSection key={product.id} delay={index * 0.1}>
                  <ArchiveProductCard product={product} />
                </RevealSection>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="archive"
              title="No archived products"
              message="Past products will appear here."
            />
          )}
        </div>
      </section>

      {/* Editorial Note */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <div className="divider-luxury mb-8" />
          <p className="text-muted-foreground leading-relaxed">
            These pieces represent moments in our creative journey. While no longer
            available for purchase, they remain part of the AMARISÉ story—a
            testament to our commitment to timeless design.
          </p>
          <div className="divider-luxury mt-8" />
        </RevealSection>
      </section>
    </Layout>
  );
};

export default Archive;
