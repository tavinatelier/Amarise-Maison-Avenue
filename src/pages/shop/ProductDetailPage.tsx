import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, ProductSchema, BreadcrumbSchema } from "@/components/seo/SEOHead";
import { getProductBySlug, getPillar, getRelatedProducts } from "@/data/catalog-hierarchy";
import { CatalogProduct } from "@/types/catalog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRitualBag } from "@/components/ritual-bag/RitualBagContext";
import { useState, useEffect } from "react";
import {
  ShoppingBag, Heart, Truck, RotateCcw, Shield, ChevronDown, AlertCircle, Ruler,
} from "lucide-react";

const countryNames: Record<string, string> = { IN: "India", US: "United States", GB: "United Kingdom", CA: "Canada" };
const tagLabels: Record<string, string> = { signature: "Signature", limited: "Limited Edition", seasonal: "Seasonal", "editors-pick": "Editor's Pick" };

const deliveryEstimates: Record<string, string> = {
  IN: "5–7 business days",
  US: "3–5 business days",
  GB: "2–4 business days",
  CA: "4–6 business days",
};

const shippingCosts: Record<string, string> = {
  IN: "Complimentary",
  US: "Complimentary on orders over $500",
  GB: "Complimentary",
  CA: "Complimentary on orders over CA$700",
};

function RecentlyViewed({ current }: { current: string }) {
  const [viewed, setViewed] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ama-recently-viewed") || "[]") as string[];
    setViewed(stored.filter((s) => s !== current).slice(0, 4));
  }, [current]);

  if (viewed.length === 0) return null;

  return (
    <section className="section-luxury-sm border-t border-border">
      <div className="container-editorial">
        <h2 className="font-serif text-2xl md:text-3xl mb-8">Recently Viewed</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {viewed.map((slug) => {
            const p = getProductBySlug(slug);
            if (!p) return null;
            return (
              <Link key={p.id} to={`/shop/${p.pillarSlug}/${p.familySlug}/${p.slug}`} className="group block">
                <div className="editorial-card aspect-[3/4] bg-muted mb-3">
                  <img src={p.images[0]} alt={p.title} className="editorial-card-image" loading="lazy" />
                </div>
                <h4 className="text-sm font-medium group-hover:opacity-70 transition-opacity">{p.title}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">€{p.price.EUR?.toLocaleString()}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const { pillar, family, product: productSlug } = useParams();
  const product = getProductBySlug(productSlug || "");
  const pillarData = getPillar(pillar || "");
  const familyData = pillarData?.families.find((f) => f.slug === family);
  const { addItem } = useRitualBag();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("craftsmanship");

  // Track recently viewed
  useEffect(() => {
    if (!productSlug) return;
    const stored = JSON.parse(localStorage.getItem("ama-recently-viewed") || "[]") as string[];
    const updated = [productSlug, ...stored.filter((s) => s !== productSlug)].slice(0, 10);
    localStorage.setItem("ama-recently-viewed", JSON.stringify(updated));
  }, [productSlug]);

  // Wishlist persistence
  useEffect(() => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("ama-wishlist") || "[]") as string[];
    setIsWishlisted(wishlist.includes(product.id));
  }, [product]);

  const toggleWishlist = () => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("ama-wishlist") || "[]") as string[];
    const updated = isWishlisted ? wishlist.filter((id) => id !== product.id) : [...wishlist, product.id];
    localStorage.setItem("ama-wishlist", JSON.stringify(updated));
    setIsWishlisted(!isWishlisted);
  };

  if (!product || !pillarData || !familyData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const isLowStock = product.inventory > 0 && product.inventory < 10;

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price.EUR,
      image: product.images[0],
      variant: selectedSize || undefined,
    });
  };

  const toggleAccordion = (key: string) => setOpenAccordion(openAccordion === key ? null : key);

  const accordionSections = [
    { key: "craftsmanship", title: "Craftsmanship", content: product.craftsmanshipStory },
    ...(product.materials ? [{ key: "materials", title: "Materials & Composition", content: product.materials }] : []),
    ...(product.careInstructions ? [{ key: "care", title: "Care Instructions", content: product.careInstructions }] : []),
  ];

  return (
    <Layout>
      <SEOHead title={`${product.title} — AMARISÉ`} description={product.headline || product.description} type="product" />
      <ProductSchema name={product.title} description={product.description} image={product.images[0]} price={product.price.EUR} availability={product.inStock ? "InStock" : "OutOfStock"} />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: pillarData.name, url: `/shop/${pillarData.slug}` },
        { name: familyData.name, url: `/shop/${pillarData.slug}/${familyData.slug}` },
        { name: product.title, url: `/shop/${pillarData.slug}/${familyData.slug}/${product.slug}` },
      ]} />

      <section className="pt-28 pb-16 md:pt-36">
        <div className="container-editorial">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-caption mb-8" aria-label="Breadcrumb">
            <Link to={`/shop/${pillarData.slug}`} className="hover:text-foreground transition-colors">{pillarData.name}</Link>
            <span>/</span>
            <Link to={`/shop/${pillarData.slug}/${familyData.slug}`} className="hover:text-foreground transition-colors">{familyData.name}</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="aspect-[3/4] bg-muted overflow-hidden group cursor-zoom-in">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              </div>
              {/* Thumbnail strip placeholder */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={product.images[0]} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:pt-8">
              {/* SKU */}
              <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-3">{product.sku}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.luxuryTags.map((tag) => (
                  <span key={tag} className="text-[10px] tracking-widest uppercase px-3 py-1 border border-accent text-accent">{tagLabels[tag] || tag}</span>
                ))}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl mb-2">{product.title}</h1>
              {product.headline && <p className="text-lg text-muted-foreground italic mb-3">{product.headline}</p>}
              {product.collection && <p className="text-caption mb-4">{product.collection}</p>}

              <p className="text-xl mb-2">€{product.price.EUR?.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mb-6">Tax included. Complimentary shipping on qualifying orders.</p>

              {/* Scarcity indicator */}
              {isLowStock && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-accent mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Only {product.inventory} remaining</span>
                </motion.div>
              )}

              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Size Selection */}
              {product.sizeGuide && product.sizeGuide.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-caption">Select Size</h3>
                    <button onClick={() => setShowSizeGuide(!showSizeGuide)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                      <Ruler className="h-3 w-3" />
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizeGuide.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                        className={`px-4 py-2.5 text-xs tracking-wider border transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-foreground border-border hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {showSizeGuide && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-4 p-4 bg-muted/30 border border-border">
                        <p className="text-sm text-muted-foreground">For detailed measurements, please refer to our <Link to="/size-guide" className="underline hover:text-foreground transition-colors">complete size guide</Link>.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <Button onClick={handleAddToBag} className="flex-1 gap-2 h-12 tracking-widest uppercase text-xs">
                  <ShoppingBag className="h-4 w-4" />
                  Add to Bag
                </Button>
                <Button variant="outline" size="icon" className={`h-12 w-12 transition-colors ${isWishlisted ? "bg-foreground text-background" : ""}`} onClick={toggleWishlist}>
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Return reassurance */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Complimentary returns within 30 days</span>
              </div>

              {/* Delivery estimate */}
              <div className="border border-border p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-caption">Delivery Estimate</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.countryAvailability.map((code) => (
                    <button
                      key={code}
                      onClick={() => setSelectedCountry(code)}
                      className={`text-xs px-3 py-1.5 border transition-colors ${
                        selectedCountry === code
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-muted-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {countryNames[code]}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-foreground">{deliveryEstimates[selectedCountry] || "5–10 business days"}</p>
                <p className="text-xs text-muted-foreground mt-1">{shippingCosts[selectedCountry] || "Shipping calculated at checkout"}</p>
              </div>

              {/* Trust signals */}
              <div className="flex items-center gap-4 mb-8 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /><span>Authenticity Guaranteed</span></div>
                <span className="text-border">|</span>
                <span>Luxury Packaging</span>
                <span className="text-border">|</span>
                <span>Secure Checkout</span>
              </div>

              <div className="divider-editorial mb-8" />

              {/* Accordions */}
              <div className="space-y-0">
                {accordionSections.map((section) => (
                  <div key={section.key} className="border-b border-border">
                    <button
                      onClick={() => toggleAccordion(section.key)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <h3 className="text-caption">{section.title}</h3>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${openAccordion === section.key ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openAccordion === section.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed pb-4">{section.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Edition info */}
              {product.edition && (
                <div className="mt-6 p-4 border border-accent/30 bg-accent/5">
                  <h3 className="text-caption text-accent mb-1">Limited Edition</h3>
                  <p className="text-sm text-muted-foreground">{product.edition}</p>
                </div>
              )}

              {/* Country availability */}
              <div className="mt-6">
                <h3 className="text-caption mb-2">Available In</h3>
                <div className="flex flex-wrap gap-2">
                  {product.countryAvailability.map((code) => (
                    <span key={code} className="text-xs px-3 py-1 bg-muted text-muted-foreground">{countryNames[code]}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="section-luxury-sm border-t border-border">
          <div className="container-editorial">
            <h2 className="font-serif text-2xl md:text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Link to={`/shop/${p.pillarSlug}/${p.familySlug}/${p.slug}`} className="group block">
                    <div className="editorial-card aspect-[3/4] bg-muted mb-3">
                      <img src={p.images[0]} alt={p.title} className="editorial-card-image" loading="lazy" />
                    </div>
                    <h4 className="text-sm font-medium group-hover:opacity-70 transition-opacity">{p.title}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">€{p.price.EUR?.toLocaleString()}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed current={productSlug || ""} />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product.title}</p>
            <p className="text-sm text-muted-foreground">€{product.price.EUR?.toLocaleString()}</p>
          </div>
          <Button onClick={handleAddToBag} className="gap-2 h-11 tracking-widest uppercase text-xs shrink-0">
            <ShoppingBag className="h-4 w-4" />
            Add to Bag
          </Button>
        </div>
      </div>
    </Layout>
  );
}
