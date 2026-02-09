/**
 * VEIL LIP RITUAL — Editorial Product Masterpiece
 * Benchmark: Vogue editorial, Chanel product experiences
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToRitualButton } from "@/components/product/AddToRitualButton";
import { ProductIngredients } from "@/components/product/ProductIngredients";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { SEOHead } from "@/components/seo";
import {
  EditorialSection,
  EditorialDivider,
  StoryBlock,
  PullQuote,
} from "@/components/editorial";

import beautyLipRitual from "@/assets/beauty-lip-ritual.jpg";
import beautyLipRitual2 from "@/assets/beauty-lip-ritual-2.jpg";
import beautyTextureSwatch from "@/assets/beauty-texture-swatch.jpg";
import beautyLipDetail from "@/assets/beauty-lip-detail.jpg";
import heroBeauty from "@/assets/hero-beauty.jpg";
import beautySerum from "@/assets/beauty-serum.jpg";

const productImages = [
  beautyLipRitual,
  beautyLipRitual2,
  beautyTextureSwatch,
  beautyLipDetail,
];

const ingredients = [
  {
    name: "Rose Damascena Oil",
    origin: "Valley of Roses, Bulgaria",
    benefit: "Deep hydration with antioxidant protection for visibly softer, more supple lips.",
  },
  {
    name: "Marula Oil",
    origin: "Namibian Highlands",
    benefit: "Rich in oleic acid and omega fatty acids for lasting moisture and gentle plumping.",
  },
  {
    name: "Vitamin E Complex",
    origin: "Swiss Biotech Laboratory",
    benefit: "Protects delicate lip skin from environmental stressors while promoting healing.",
  },
];

const relatedProducts = [
  {
    image: heroBeauty,
    title: "Radiance Serum",
    subtitle: "Pure luminosity",
    href: "/beauty/radiance-serum",
  },
  {
    image: beautySerum,
    title: "Essence Mist",
    subtitle: "Dewdrop freshness",
    href: "/beauty/rituals",
  },
  {
    image: beautyLipRitual,
    title: "Veil Foundation",
    subtitle: "Second-skin perfection",
    href: "/beauty/rituals",
  },
];

const shades = [
  { name: "Nude Whisper", color: "#D8BFC0" },
  { name: "Rose Dawn", color: "#C4A4A4" },
  { name: "Champagne Veil", color: "#E8D4C8" },
  { name: "Terracotta Calm", color: "#B8897C" },
];

const VeilLipRitual = () => {
  return (
    <Layout>
      <SEOHead
        title="Veil Lip Ritual"
        description="A whisper of color, a moment of intention. The Veil Lip Ritual delivers a luminous veil of color that enhances rather than masks."
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
                  src={beautyLipRitual}
                  alt="Veil Lip Ritual"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.p
                className="absolute bottom-4 left-4 text-caption-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                4.5g / Four Shades
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
                <Link to="/beauty" className="hover:text-foreground transition-colors">
                  Beauty
                </Link>
                <span className="text-muted-foreground/50">/</span>
                <span>Signature Lips</span>
              </nav>

              <p className="text-caption tracking-[0.3em] uppercase text-accent mb-4">
                The Ritual
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Veil Lip Ritual
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif italic">
                A whisper of color, a moment of intention
              </p>

              {/* Philosophy Statement */}
              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-muted-foreground leading-relaxed">
                  The Veil Lip Ritual is more than a lip product—it is an invitation
                  to pause. Inspired by the quiet elegance of morning light through
                  sheer curtains, this formula delivers a luminous veil of color that
                  enhances rather than masks.
                </p>
              </div>

              <div className="pt-6 border-t border-divider">
                <p className="text-caption mb-2">Price</p>
                <p className="font-serif text-2xl">€68</p>
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
              Each application becomes a small ceremony: the weight of the gold
              case in your palm, the soft cushion of the applicator, the subtle
              scent of Bulgarian rose.
            </h2>
            <p className="text-lg text-muted-foreground">
              This is beauty that respects your time and elevates your spirit.
            </p>
          </motion.div>
        </div>
      </EditorialSection>

      <EditorialDivider />

      {/* Purchase Section */}
      <EditorialSection background="muted" spacing="generous">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ProductGallery images={productImages} productName="Veil Lip Ritual" />

          {/* Selection */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-caption tracking-[0.3em] uppercase text-accent mb-6">
              Select Your Shade
            </p>

            {/* Shade Selection */}
            <div className="mb-10">
              <div className="flex gap-4 mb-4">
                {shades.map((shade, index) => (
                  <button
                    key={shade.name}
                    className={`group relative w-12 h-12 rounded-full transition-all duration-300 ${
                      index === 0 ? "ring-2 ring-foreground ring-offset-2" : ""
                    } hover:scale-110`}
                    style={{ backgroundColor: shade.color }}
                    title={shade.name}
                  >
                    <span className="sr-only">{shade.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Nude Whisper</p>
            </div>

            {/* Add to Ritual */}
            <AddToRitualButton
              productId="veil-lip-ritual"
              productName="Veil Lip Ritual"
              price="€68"
              image={beautyLipRitual}
            />

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-divider space-y-8">
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Size</h3>
                <p className="text-sm text-muted-foreground">4.5g / 0.15 oz</p>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">How to Use</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apply directly from the cushion applicator, starting at the center
                  of lips and blending outward. Layer for deeper color or wear alone
                  for a natural, luminous finish.
                </p>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">The Promise</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vegan. Cruelty-free. Free from parabens, sulfates, and synthetic
                  fragrances. Dermatologist tested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* Story Section */}
      <EditorialSection background="default" spacing="hero">
        <StoryBlock
          image={beautyTextureSwatch}
          imagePosition="left"
          caption="The Story"
          title="Born from a Single Rose"
          paragraphs={[
            "The inspiration for the Veil Lip Ritual came from a single rose petal, caught in morning light. That translucent quality—color that reveals rather than conceals—became our guiding principle.",
            "We spent three years perfecting the formula, working with master chemists to achieve a texture that feels like silk and a finish that looks like your lips, only better.",
            "The gold case was designed to age gracefully, developing a unique patina over time. It is meant to be kept, cherished, and eventually refilled—a small rebellion against disposability.",
          ]}
          aspectRatio="portrait"
        />
      </EditorialSection>

      {/* Pull Quote */}
      <EditorialSection background="cream" spacing="generous">
        <PullQuote
          quote="Color that reveals rather than conceals."
          attribution="The Veil Philosophy"
          variant="centered"
        />
      </EditorialSection>

      {/* Ingredients */}
      <ProductIngredients
        ingredients={ingredients}
        philosophy="We believe in transparency. Every ingredient is chosen for its efficacy, its origin story, and its alignment with our values of purity and sustainability."
      />

      <EditorialDivider variant="gold" />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </Layout>
  );
};

export default VeilLipRitual;
