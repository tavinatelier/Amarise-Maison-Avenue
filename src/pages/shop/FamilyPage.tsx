import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, CollectionPageSchema } from "@/components/seo/SEOHead";
import { getPillar, getProductsByFamily, getMicroCategoriesByFamily } from "@/data/catalog-hierarchy";
import { useState } from "react";
import { motion } from "framer-motion";
import { ProductFilterEngine } from "@/components/shop/ProductFilterEngine";
import { useCurrency } from "@/hooks/useCurrency";
import { Heart, Eye } from "lucide-react";

export default function FamilyPage() {
  const { pillar, family } = useParams<{ pillar: string; family: string }>();
  const pillarData = getPillar(pillar || "");
  const familyData = pillarData?.families.find((f) => f.slug === family);
  const products = getProductsByFamily(pillar || "", family || "");
  const microCats = getMicroCategoriesByFamily(pillar || "", family || "");
  const [activeMicro, setActiveMicro] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  if (!pillarData || !familyData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Category not found.</p>
        </div>
      </Layout>
    );
  }

  const microFiltered = activeMicro
    ? products.filter((p) => p.microCategories.includes(activeMicro))
    : products;

  return (
    <Layout>
      <SEOHead title={`${familyData.name} — ${pillarData.name} — AMARISÉ`} description={familyData.description} />
      <CollectionPageSchema
        name={`${familyData.name} — ${pillarData.name} — AMARISÉ`}
        description={familyData.description}
        url={`https://amarisemaisonavenue.com/shop/${pillarData.slug}/${familyData.slug}`}
        numberOfItems={microFiltered.length}
      />

      {/* Breadcrumb + Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-editorial">
          <div className="flex items-center gap-2 text-caption mb-6">
            <Link to={`/shop/${pillarData.slug}`} className="hover:text-foreground transition-colors">{pillarData.name}</Link>
            <span>/</span>
            <span className="text-foreground">{familyData.name}</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-3xl md:text-5xl mb-4">
            {familyData.name}
          </motion.h1>
          <p className="text-muted-foreground max-w-lg">{familyData.description}</p>

          {/* Micro-category filters */}
          {microCats.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              <button
                onClick={() => setActiveMicro(null)}
                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                  !activeMicro ? "bg-foreground text-background border-foreground" : "bg-transparent text-foreground/70 border-border hover:border-foreground"
                }`}
              >
                All
              </button>
              {microCats.filter((mc) => mc.visibility !== "hidden").map((mc) => (
                <button
                  key={mc.slug}
                  onClick={() => setActiveMicro(mc.slug === activeMicro ? null : mc.slug)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${
                    activeMicro === mc.slug ? "bg-foreground text-background border-foreground" : "bg-transparent text-foreground/70 border-border hover:border-foreground"
                  }`}
                >
                  {mc.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid with Filters */}
      <section className="section-luxury-sm">
        <div className="container-editorial">
          <ProductFilterEngine products={microFiltered}>
            {(filteredProducts) => (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-24">
                    <p className="font-serif text-xl text-muted-foreground">No pieces found in this selection.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {filteredProducts.map((product, i) => {
                      const isLow = product.inStock && product.inventory > 0 && product.inventory < 10;
                      const isSold = !product.inStock || product.inventory === 0;
                      const isOnly1 = product.inventory === 1;

                      return (
                        <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                          <Link to={`/shop/${product.pillarSlug}/${product.familySlug}/${product.slug}`} className="group block relative">
                            <div className={`editorial-card aspect-[3/4] bg-muted mb-3 relative overflow-hidden ${isSold ? "opacity-60" : ""}`}>
                              <img src={product.images[0]} alt={product.title} className="editorial-card-image" loading="lazy" />
                              {/* Hover overlay with quick actions */}
                              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
                              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                                <button className="flex-1 py-2 bg-background/90 backdrop-blur-sm text-xs tracking-widest uppercase hover:bg-background transition-colors text-center" onClick={(e) => e.preventDefault()}>
                                  Quick View
                                </button>
                              </div>
                              {/* Status badges */}
                              {isOnly1 && <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 bg-accent text-accent-foreground">Only 1 Left</span>}
                              {isLow && !isOnly1 && <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 bg-muted text-muted-foreground">Low Stock</span>}
                              {isSold && <span className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 bg-foreground text-background">Sold</span>}
                            </div>
                            <h4 className="text-sm font-medium group-hover:opacity-70 transition-opacity">{product.title}</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">{formatPrice(product.price.EUR)}</p>
                            {product.luxuryTags.length > 0 && (
                              <div className="flex gap-2 mt-1">
                                {product.luxuryTags.map((tag) => (
                                  <span key={tag} className="text-[10px] tracking-widest uppercase text-accent">{tag.replace("-", " ")}</span>
                                ))}
                              </div>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </ProductFilterEngine>
        </div>
      </section>
    </Layout>
  );
}
