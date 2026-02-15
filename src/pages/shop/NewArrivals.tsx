import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, CollectionPageSchema } from "@/components/seo";
import { sampleProducts } from "@/data/catalog-hierarchy";
import { motion } from "framer-motion";

export default function NewArrivals() {
  // Sort by createdAt descending, take top 20
  const newProducts = [...sampleProducts]
    .filter((p) => !p.isDraft)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 20);

  return (
    <Layout>
      <SEOHead
        title="New Arrivals"
        description="Discover the latest additions to AMARISÉ. New luxury pieces across beauty, fashion, jewelry, and maison."
      />
      <CollectionPageSchema
        name="New Arrivals — AMARISÉ"
        description="The latest additions to the AMARISÉ collection."
        url="https://amarisemaisonavenue.com/new-arrivals"
        numberOfItems={newProducts.length}
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-editorial text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-caption mb-4">
            Just Arrived
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            New Arrivals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            The newest additions to our world — curated, crafted, and waiting to be discovered.
          </motion.p>
        </div>
      </section>

      <section className="section-luxury-sm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {newProducts.map((product, i) => (
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
                  {product.luxuryTags.length > 0 && (
                    <div className="flex gap-2 mt-1">
                      {product.luxuryTags.map((tag) => (
                        <span key={tag} className="text-[10px] tracking-widest uppercase text-accent">{tag.replace("-", " ")}</span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
