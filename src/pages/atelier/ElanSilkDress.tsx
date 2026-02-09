/**
 * ÉLAN SILK DRESS — Editorial Product Masterpiece
 * Benchmark: Chanel, Dior product experiences
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToRitualButton } from "@/components/product/AddToRitualButton";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { SEOHead } from "@/components/seo";
import {
  EditorialSection,
  EditorialDivider,
  StoryBlock,
  PullQuote,
} from "@/components/editorial";

import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";
import atelierDressDetail from "@/assets/atelier-dress-detail.jpg";
import atelierCoat from "@/assets/atelier-coat.jpg";
import atelierHero from "@/assets/atelier-hero.jpg";

const productImages = [
  atelierSilkDress,
  atelierDressDetail,
  atelierSilkDress,
  atelierDressDetail,
];

const sizes = ["XS", "S", "M", "L", "XL"];

const relatedProducts = [
  {
    image: atelierCoat,
    title: "Heritage Coat",
    subtitle: "Structured sophistication",
    href: "/atelier/collections",
  },
  {
    image: atelierDressDetail,
    title: "Lumière Gown",
    subtitle: "Evening radiance",
    href: "/atelier/collections",
  },
  {
    image: atelierSilkDress,
    title: "Serene Blouse",
    subtitle: "Effortless refinement",
    href: "/atelier/collections",
  },
];

const ElanSilkDress = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>("M");

  return (
    <Layout>
      <SEOHead
        title="Élan Silk Dress"
        description="A masterpiece of fluid elegance. Cut from the finest Italian silk, this dress moves like water—catching light, releasing shadow, revealing the poetry of motion."
      />

      {/* Hero Section — Cinematic Product Introduction */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-cream">
        <div className="container-editorial py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Product Image — Editorial Scale */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={atelierSilkDress}
                  alt="Élan Silk Dress"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.p
                className="absolute bottom-4 left-4 text-caption-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Spring/Summer Collection
              </motion.p>
            </motion.div>

            {/* Product Title & Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-caption-sm text-muted-foreground mb-8">
                <Link to="/atelier" className="hover:text-foreground transition-colors">
                  Atelier
                </Link>
                <span className="text-muted-foreground/50">/</span>
                <Link to="/atelier/collections" className="hover:text-foreground transition-colors">
                  Collections
                </Link>
              </nav>

              <p className="text-caption tracking-[0.3em] uppercase text-accent mb-4">
                The Signature Piece
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Élan Silk Dress
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif italic">
                Poetry in motion
              </p>

              {/* Philosophy Statement */}
              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-muted-foreground leading-relaxed">
                  A masterpiece of fluid elegance. Cut from the finest Italian silk,
                  this dress moves like water—catching light, releasing shadow,
                  revealing the poetry of motion.
                </p>
              </div>

              <div className="pt-6 border-t border-divider">
                <p className="text-caption mb-2">Price</p>
                <p className="font-serif text-2xl">€1,480</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Exists */}
      <EditorialSection background="default" spacing="hero">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
              Why This Exists
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mb-10 leading-relaxed">
              The Élan Silk Dress was born from a simple observation: the way
              light plays on water at dusk. We wanted to capture that ephemeral
              beauty in fabric.
            </h2>
            <p className="text-lg text-muted-foreground">
              A dress that seems to both absorb and release light simultaneously.
            </p>
          </motion.div>
        </div>
      </EditorialSection>

      <EditorialDivider />

      {/* Purchase Section */}
      <EditorialSection background="muted" spacing="generous">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ProductGallery images={productImages} productName="Élan Silk Dress" />

          {/* Selection */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-caption tracking-[0.3em] uppercase text-accent mb-6">
              Select Your Size
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm">Size</span>
                <button className="text-caption text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border transition-all duration-300 text-sm ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-divider hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Ritual */}
            <AddToRitualButton
              productId="elan-silk-dress"
              productName="Élan Silk Dress"
              price="€1,480"
              image={atelierSilkDress}
              variant={selectedSize}
            />

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-divider space-y-8">
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Materials</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>100% Mulberry Silk from Como, Italy</li>
                  <li>Fully lined in silk charmeuse</li>
                  <li>Hand-finished seams and hems</li>
                </ul>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Invisible side zip closure</li>
                  <li>Floor-length silhouette</li>
                  <li>Made in Italy</li>
                </ul>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Care</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Dry clean only</li>
                  <li>Store on padded hanger</li>
                  <li>Iron on low heat if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* Craft Story */}
      <EditorialSection background="default" spacing="hero">
        <StoryBlock
          image={atelierDressDetail}
          imagePosition="right"
          caption="The Craft"
          title="Poetry in Motion"
          paragraphs={[
            "The silk is woven in Como by artisans whose families have practiced the craft for five generations. Each meter takes three days to produce, resulting in a fabric of unparalleled luminosity and drape.",
            "The cut is minimal—a single seam running from shoulder to hem—allowing the fabric to speak for itself.",
            "It is a dress that rewards stillness, revealing new facets of beauty with every subtle movement.",
          ]}
          aspectRatio="portrait"
        />
      </EditorialSection>

      {/* Pull Quote */}
      <EditorialSection background="cream" spacing="generous">
        <PullQuote
          quote="Clothing that feels as good as it looks—pieces that become more beautiful with time."
          attribution="Atelier Philosophy"
          variant="offset"
        />
      </EditorialSection>

      {/* Heritage Section */}
      <EditorialSection background="default" spacing="generous">
        <StoryBlock
          image={atelierHero}
          imagePosition="left"
          caption="Heritage"
          title="A Tradition of Excellence"
          paragraphs={[
            "Each Élan dress is numbered and registered, joining a legacy of pieces that have been worn to galas, weddings, and quiet dinners alike.",
            "We offer complimentary lifetime alterations and care, ensuring your dress grows with you through every chapter of life.",
          ]}
          aspectRatio="landscape"
        />
      </EditorialSection>

      <EditorialDivider variant="gold" />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </Layout>
  );
};

export default ElanSilkDress;
