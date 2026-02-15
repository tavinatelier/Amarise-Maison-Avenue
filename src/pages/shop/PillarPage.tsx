import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, CollectionPageSchema } from "@/components/seo/SEOHead";
import { getPillar, getProductsByPillar } from "@/data/catalog-hierarchy";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PillarPage() {
  const { pillar } = useParams<{ pillar: string }>();
  const pillarData = getPillar(pillar || "");
  const products = getProductsByPillar(pillar || "");

  if (!pillarData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Collection not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title={`${pillarData.name} — AMARISÉ`} description={pillarData.description} />
      <CollectionPageSchema
        name={`${pillarData.name} — AMARISÉ`}
        description={pillarData.description}
        url={`https://amarisemaisonavenue.com/shop/${pillarData.slug}`}
        numberOfItems={products.length}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-editorial text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-caption mb-4"
          >
            The World of AMARISÉ
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6"
          >
            {pillarData.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            {pillarData.description}
          </motion.p>
        </div>
      </section>

      {/* Families Grid */}
      <section className="section-luxury-sm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {pillarData.families.map((family, i) => (
              <motion.div
                key={family.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/shop/${pillarData.slug}/${family.slug}`}
                  className="group block"
                >
                  <div className="editorial-card aspect-[3/4] bg-muted mb-4">
                    <img
                      src={family.image || "/placeholder.svg"}
                      alt={family.name}
                      className="editorial-card-image"
                    />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-lg">{family.name}</h3>
                    <span className="text-caption opacity-0 group-hover:opacity-100 transition-opacity">
                      {family.productCount} pieces
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{family.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      {products.length > 0 && (
        <section className="section-luxury-sm border-t border-border">
          <div className="container-editorial">
            <h2 className="font-serif text-2xl md:text-3xl mb-8">Curated Selection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/shop/${product.pillarSlug}/${product.familySlug}/${product.slug}`}
                  className="group block"
                >
                  <div className="editorial-card aspect-[3/4] bg-muted mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="editorial-card-image"
                    />
                  </div>
                  <h4 className="text-sm font-medium">{product.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    €{product.price.EUR?.toLocaleString()}
                  </p>
                  {product.luxuryTags.length > 0 && (
                    <div className="flex gap-2 mt-1">
                      {product.luxuryTags.map((tag) => (
                        <span key={tag} className="text-[10px] tracking-widest uppercase text-accent">
                          {tag.replace("-", " ")}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
