/**
 * LUMIÈRE SCENTED CANDLE — Editorial Product Masterpiece
 * Benchmark: Diptyque, Byredo product experiences
 */

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

import lifestyleCandle from "@/assets/lifestyle-candle.jpg";
import lifestyleCandleDetail from "@/assets/lifestyle-candle-detail.jpg";
import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";
import lifestyleVesselDetail from "@/assets/lifestyle-vessel-detail.jpg";
import lifestyleHero from "@/assets/lifestyle-hero.jpg";

const productImages = [
  lifestyleCandle,
  lifestyleCandleDetail,
  lifestyleCandle,
  lifestyleCandleDetail,
];

const scentNotes = [
  { type: "Top", notes: "Bergamot, Pink Pepper, Cardamom" },
  { type: "Heart", notes: "Amber, Sandalwood, Oud" },
  { type: "Base", notes: "Musk, Vanilla, Cedarwood" },
];

const relatedProducts = [
  {
    image: lifestyleVessel,
    title: "Calma Vessel",
    subtitle: "Handcrafted ceramic",
    href: "/lifestyle/calma-vessel",
  },
  {
    image: lifestyleVesselDetail,
    title: "Incense Set",
    subtitle: "Temple blend",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleCandle,
    title: "Reed Diffuser",
    subtitle: "Bergamot & cedar",
    href: "/lifestyle/objects",
  },
];

const LumiereCandle = () => {
  return (
    <Layout>
      <SEOHead
        title="Lumière Scented Candle"
        description="Light itself, captured in fragrance. This candle transforms any space into a sanctuary of warmth and contemplation."
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
              <div className="aspect-square overflow-hidden">
                <img
                  src={lifestyleCandle}
                  alt="Lumière Scented Candle"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.p
                className="absolute bottom-4 left-4 text-caption-sm text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                250g / 60+ Hours
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
                <Link to="/lifestyle" className="hover:text-foreground transition-colors">
                  Lifestyle
                </Link>
                <span className="text-muted-foreground/50">/</span>
                <Link to="/lifestyle/objects" className="hover:text-foreground transition-colors">
                  Objects
                </Link>
              </nav>

              <p className="text-caption tracking-[0.3em] uppercase text-accent mb-4">
                Atmosphere
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Lumière Candle
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif italic">
                Light captured in fragrance
              </p>

              {/* Philosophy Statement */}
              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-muted-foreground leading-relaxed">
                  Light itself, captured in fragrance. This candle transforms any
                  space into a sanctuary of warmth and contemplation. Notes of
                  amber and sandalwood unfold slowly, creating an atmosphere of
                  quiet luxury.
                </p>
              </div>

              <div className="pt-6 border-t border-divider">
                <p className="text-caption mb-2">Price</p>
                <p className="font-serif text-2xl">€95</p>
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
              Lumière is our meditation on light—the way it transforms a space,
              the way it marks the passage of time, the way it creates sanctuary.
            </h2>
            <p className="text-lg text-muted-foreground">
              The feeling of golden hour, of coming home, of settling into stillness.
            </p>
          </motion.div>
        </div>
      </EditorialSection>

      <EditorialDivider />

      {/* Purchase Section */}
      <EditorialSection background="muted" spacing="generous">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <ProductGallery images={productImages} productName="Lumière Scented Candle" />

          {/* Selection */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-caption tracking-[0.3em] uppercase text-accent mb-6">
              Scent Profile
            </p>

            {/* Scent Notes */}
            <div className="mb-10 space-y-4">
              {scentNotes.map((note) => (
                <div key={note.type} className="flex items-baseline">
                  <span className="w-20 text-caption text-muted-foreground">{note.type}</span>
                  <span className="text-sm">{note.notes}</span>
                </div>
              ))}
            </div>

            {/* Add to Ritual */}
            <AddToRitualButton
              productId="lumiere-candle"
              productName="Lumière Scented Candle"
              price="€95"
              image={lifestyleCandle}
            />

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-divider space-y-8">
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>100% natural soy wax</li>
                  <li>Hand-poured in Grasse, France</li>
                  <li>Cotton wick for clean burn</li>
                  <li>Amber glass vessel (reusable)</li>
                  <li>Weight: 250g / 8.8oz</li>
                </ul>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Burn Time</h3>
                <p className="text-sm text-muted-foreground">60+ hours</p>
              </div>
              <div>
                <h3 className="text-caption tracking-[0.2em] uppercase mb-3">Care</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Trim wick to 5mm before each use</li>
                  <li>Allow wax to melt to edges on first burn</li>
                  <li>Burn for 2-4 hours at a time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* Story Section */}
      <EditorialSection background="default" spacing="hero">
        <StoryBlock
          image={lifestyleCandleDetail}
          imagePosition="right"
          caption="The Story"
          title="Captured Light"
          paragraphs={[
            "The fragrance was created in collaboration with a master perfumer in Grasse, the historic heart of French perfumery. Over two years, we refined the blend until it captured exactly what we envisioned.",
            "Each candle is hand-poured in small batches, using only natural soy wax and the finest fragrance oils.",
            "The amber glass vessel is designed to be kept and repurposed—a beautiful object long after the candle has burned.",
          ]}
          aspectRatio="portrait"
        />
      </EditorialSection>

      {/* Pull Quote */}
      <EditorialSection background="cream" spacing="generous">
        <PullQuote
          quote="Fragrance is memory made tangible."
          attribution="The Lumière Philosophy"
          variant="centered"
        />
      </EditorialSection>

      {/* Atmosphere Section */}
      <EditorialSection background="default" spacing="generous">
        <StoryBlock
          image={lifestyleHero}
          imagePosition="left"
          caption="Atmosphere"
          title="Creating Sanctuary"
          paragraphs={[
            "Light the Lumière as the sun begins to set. Let the fragrance unfold slowly—top notes of bergamot and pink pepper giving way to the warm embrace of amber and sandalwood.",
            "This is the alchemy of atmosphere: transforming a room into a refuge, a moment into a memory.",
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

export default LumiereCandle;
