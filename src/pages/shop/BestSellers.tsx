import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, CollectionPageSchema } from "@/components/seo";
import { sampleProducts } from "@/data/catalog-hierarchy";
import { motion } from "framer-motion";

export default function BestSellers() {
  // Featured + signature items as proxy for best sellers
  const bestSellers = sampleProducts
    .filter((p) => !p.isDraft && (p.isFeatured || p.luxuryTags.includes("signature")))
    .slice(0, 20);

  return (
    <Layout>
      <SEOHead
        title="Best Sellers"
        description="Shop AMARISÉ's most coveted pieces. Our best-selling luxury products across all categories."
      />
      <CollectionPageSchema
        name="Best Sellers — AMARISÉ"
        description="The most sought-after pieces from the AMARISÉ collection."
        url="https://amarisemaisonavenue.com/best-sellers"
        numberOfItems={bestSellers.length}
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-editorial text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-caption mb-4">
            Most Coveted
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            Best Sellers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            The pieces our clients return to, again and again.
          </motion.p>
        </div>
      </section>

      <section className="section-luxury-sm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/shop/${product.pillarSlug}/${product.familySlug}/${product.slug}`}
                  className="group block"
                >
                  <div className="editorial-card aspect-[3/4] bg-muted mb-3">
                    <img src={product.images[0]} alt={product.title} className="editorial-card-image" loading="lazy" />
                  </div>
                  <h4 className="text-sm font-medium group-hover:opacity-70 transition-opacity">{product.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">€{product.price.EUR?.toLocaleString()}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
