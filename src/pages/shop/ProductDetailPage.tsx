import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { getProductBySlug, getPillar } from "@/data/catalog-hierarchy";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";

const countryNames: Record<string, string> = { IN: "India", US: "United States", GB: "United Kingdom", CA: "Canada" };
const tagLabels: Record<string, string> = { signature: "Signature", limited: "Limited Edition", seasonal: "Seasonal", "editors-pick": "Editor's Pick" };

export default function ProductDetailPage() {
  const { pillar, family, product: productSlug } = useParams();
  const product = getProductBySlug(productSlug || "");
  const pillarData = getPillar(pillar || "");
  const familyData = pillarData?.families.find((f) => f.slug === family);

  if (!product || !pillarData || !familyData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead title={`${product.title} — AMARISÉ`} description={product.description} />

      <section className="pt-28 pb-16 md:pt-36">
        <div className="container-editorial">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-caption mb-8">
            <Link to={`/shop/${pillarData.slug}`} className="hover:text-foreground transition-colors">
              {pillarData.name}
            </Link>
            <span>/</span>
            <Link to={`/shop/${pillarData.slug}/${familyData.slug}`} className="hover:text-foreground transition-colors">
              {familyData.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="aspect-[3/4] bg-muted">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:pt-8"
            >
              {/* Tags */}
              <div className="flex gap-2 mb-4">
                {product.luxuryTags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-widest uppercase px-3 py-1 border border-accent text-accent">
                    {tagLabels[tag] || tag}
                  </span>
                ))}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl mb-2">{product.title}</h1>

              {product.collection && (
                <p className="text-caption mb-4">{product.collection}</p>
              )}

              <p className="text-xl mb-6">€{product.price.EUR?.toLocaleString()}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Actions */}
              <div className="flex gap-3 mb-10">
                <Button className="flex-1 gap-2 h-12 tracking-widest uppercase text-xs">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Bag
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="divider-editorial mb-8" />

              {/* Details */}
              {product.materials && (
                <div className="mb-6">
                  <h3 className="text-caption mb-2">Materials</h3>
                  <p className="text-sm text-muted-foreground">{product.materials}</p>
                </div>
              )}

              {product.edition && (
                <div className="mb-6">
                  <h3 className="text-caption mb-2">Edition</h3>
                  <p className="text-sm text-muted-foreground">{product.edition}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-caption mb-2">Available In</h3>
                <div className="flex flex-wrap gap-2">
                  {product.countryAvailability.map((code) => (
                    <span key={code} className="text-xs px-3 py-1 bg-muted text-muted-foreground">
                      {countryNames[code] || code}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
