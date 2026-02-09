/**
 * RADIANCE SERUM — Editorial Product Masterpiece
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

import beautySerum from "@/assets/beauty-serum.jpg";
import heroBeauty from "@/assets/hero-beauty.jpg";
import beautyLipRitual from "@/assets/beauty-lip-ritual.jpg";
import beautyCollection from "@/assets/beauty-collection.jpg";
import beautyIngredients from "@/assets/beauty-ingredients.jpg";

const productImages = [
  beautySerum,
  heroBeauty,
  beautyCollection,
];

const ingredients = [
  {
    name: "Hyaluronic Acid Complex",
    origin: "Biofermented in Japan",
    benefit: "Multi-molecular weight formula penetrates deeply for lasting hydration at every layer.",
  },
  {
    name: "Bakuchiol",
    origin: "Psoralea Corylifolia Seeds, India",
    benefit: "Nature's alternative to retinol, promoting cell renewal without irritation.",
  },
  {
    name: "Squalane",
    origin: "Olive-derived, Spain",
    benefit: "Weightless moisture that mimics skin's natural oils for perfect balance.",
  },
];

const relatedProducts = [
  {
    image: beautyLipRitual,
    title: "Veil Lip Ritual",
    subtitle: "A whisper of color",
    href: "/beauty/veil-lip-ritual",
  },
  {
    image: heroBeauty,
    title: "Essence Mist",
    subtitle: "Dewdrop freshness",
    href: "/beauty/rituals",
  },
  {
    image: beautyCollection,
    title: "Complete Ritual Set",
    subtitle: "The full experience",
    href: "/beauty/rituals",
  },
];

const RadianceSerum = () => {
  return (
    <Layout>
      <SEOHead
        title="Radiance Serum"
        description="Pure luminosity in every drop. The Radiance Serum captures the essence of light itself, working in harmony with your skin's natural renewal process."
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
                  src={beautySerum}
                  alt="Radiance Serum"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Subtle caption */}
              <motion.p
                className="absolute bottom-4 left-4 text-caption-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                30ml / Pure Radiance
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
                <span>Skincare Rituals</span>
              </nav>

              <p className="text-caption tracking-[0.3em] uppercase text-accent mb-4">
                The Signature
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Radiance Serum
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif italic">
                Pure luminosity in every drop
              </p>

              {/* Philosophy Statement */}
              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-muted-foreground leading-relaxed">
                  The Radiance Serum captures the essence of light itself. Developed
                  over five years with leading dermatologists, this concentrated
                  formula works in harmony with your skin's natural renewal process
                  to reveal the luminosity that already exists within.
                </p>
              </div>

              <div className="pt-6 border-t border-divider">
                <p className="text-caption mb-2">Starting from</p>
                <p className="font-serif text-2xl">€95</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Exists — Philosophical Narrative */}
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
              Unlike harsh treatments that force change, our serum supports.
              It listens to your skin, responds to its needs, and gently guides
              it toward its most radiant expression.
            </h2>
            <p className="text-lg text-muted-foreground">
              This is skincare as conversation, not command.
            </p>
          </motion.div>
        </div>
      </EditorialSection>

      <EditorialDivider />

      {/* Purchase Section — Refined Selection */}
      <EditorialSection background="muted" spacing="generous">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ProductGallery images={productImages} productName="Radiance Serum" />

          {/* Selection & Add to Ritual */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-caption tracking-[0.3em] uppercase text-accent mb-6">
              Select Your Ritual
            </p>

            {/* Size Selection */}
            <div className="mb-10">
              <p className="text-caption mb-4">Size</p>
              <div className="flex gap-4">
                {[
                  { size: "15ml", price: "€95", subtitle: "Travel" },
                  { size: "30ml", price: "€165", subtitle: "Signature" },
                  { size: "50ml", price: "€240", subtitle: "Luxe" },
                ].map((option, index) => (
                  <button
                    key={option.size}
                    className={`flex-1 p-4 border transition-all duration-300 text-left ${
                      index === 1
                        ? "border-foreground bg-foreground text-background"
                        : "border-divider hover:border-foreground"
                    }`}
                  >
                    <span className="block text-lg font-medium">{option.size}</span>
                    <span className="block text-sm opacity-70 mt-1">{option.subtitle}</span>
                    <span className="block text-sm mt-2">{option.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Ritual */}
            <AddToRitualButton
              productId="radiance-serum"
              productName="Radiance Serum"
              price="€165"
              image={beautySerum}
            />

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-divider space-y-8">
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">How to Use</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  After cleansing, apply 3-4 drops to fingertips. Press gently into
                  skin, allowing the serum to absorb fully before applying moisturizer.
                  Use morning and evening for optimal results.
                </p>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Best For</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All skin types, especially those seeking to address dullness,
                  uneven texture, or early signs of aging.
                </p>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">The Promise</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vegan. Cruelty-free. Free from parabens, sulfates, and synthetic
                  fragrances. Clinically tested.
                </p>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* Craft & Material Story */}
      <EditorialSection background="default" spacing="hero">
        <StoryBlock
          image={beautyIngredients}
          imagePosition="right"
          caption="The Science"
          title="Where Nature Meets Innovation"
          paragraphs={[
            "Our formulation philosophy is simple: start with what nature provides, then enhance it with the best of modern science. The Radiance Serum exemplifies this approach.",
            "We use a triple-weight hyaluronic acid complex—small molecules that penetrate deeply, medium molecules that plump the mid-layers, and large molecules that seal in moisture at the surface.",
            "Bakuchiol, our star active, offers the benefits of retinol without the sensitivity. Studies show comparable efficacy in reducing fine lines and improving skin texture.",
          ]}
          aspectRatio="portrait"
        />
      </EditorialSection>

      {/* Pull Quote — Pause Moment */}
      <EditorialSection background="cream" spacing="generous">
        <PullQuote
          quote="The result is hydration that works on every level."
          attribution="AMARISÉ Formulation Philosophy"
          variant="offset"
        />
      </EditorialSection>

      {/* Ingredients — Provenance Story */}
      <ProductIngredients
        ingredients={ingredients}
        philosophy="Each ingredient is selected for both its scientific efficacy and its story of origin. We trace every component back to its source, ensuring purity at every step."
      />

      {/* Ritual Section — How It Lives in Your Life */}
      <EditorialSection background="default" spacing="hero">
        <StoryBlock
          image={heroBeauty}
          imagePosition="left"
          caption="The Ritual"
          title="A Moment of Intention"
          paragraphs={[
            "The Radiance Serum is designed to create pause in your day. The weight of the glass bottle, the soft click of the dropper, the subtle scent of botanicals—each element is considered.",
            "This is not a product to be rushed. It is an invitation to be present with yourself, even if only for a moment.",
          ]}
          aspectRatio="portrait"
        />
      </EditorialSection>

      <EditorialDivider variant="gold" />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </Layout>
  );
};

export default RadianceSerum;
