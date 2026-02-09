/**
 * BEAUTY LANDING PAGE — Editorial Magazine Experience
 * CMS-READY: Product data powered by mock JSON
 * BACKEND HANDOFF: Replace imports with API calls via content.service.ts
 */

import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RevealSection } from "@/components/common/RevealSection";
import { ProductCard } from "@/components/common/ProductCard";
import { SEOHead } from "@/components/seo";
import {
  CinematicHero,
  EditorialSection,
  EditorialDivider,
  StoryBlock,
  PullQuote,
  BrandStatement,
} from "@/components/editorial";

// BACKEND HANDOFF: Import from commerce API instead
import productsData from "@/data/mock/products.json";

// Image imports - BACKEND HANDOFF: Replace with CDN URLs from API
import beautyCollection from "@/assets/beauty-collection.jpg";
import beautyLipRitual from "@/assets/beauty-lip-ritual.jpg";
import heroBeauty from "@/assets/hero-beauty.jpg";
import beautySerum from "@/assets/beauty-serum.jpg";
import beautyIngredients from "@/assets/beauty-ingredients.jpg";

// Image map for resolving mock data paths to imports
const imageMap: Record<string, string> = {
  "/assets/beauty-collection.jpg": beautyCollection,
  "/assets/beauty-lip-ritual.jpg": beautyLipRitual,
  "/assets/hero-beauty.jpg": heroBeauty,
  "/assets/beauty-serum.jpg": beautySerum,
};

const getImage = (path: string): string => imageMap[path] || path;

// Get beauty products from mock data
const beautyProducts = productsData.beauty;

const Beauty = () => {
  return (
    <Layout>
      <SEOHead
        title="Beauty"
        description="Each product is a ceremony. Discover AMARISÉ beauty rituals—luxury skincare and cosmetics crafted with intention."
      />

      {/* Cinematic Hero — Magazine Opening */}
      <CinematicHero
        image={beautyCollection}
        videoUrl={undefined}
        caption="Chapter I"
        title="The Art of the Ritual"
        subtitle="Each product is a ceremony. Each application, an intention."
        ctaText="Enter the Collection"
        ctaLink="#collection"
        overlayOpacity={0.4}
      />

      {/* Brand Philosophy Statement */}
      <EditorialSection background="cream" spacing="hero">
        <BrandStatement
          statement="Beauty is not applied. It is revealed."
          attribution="The AMARISÉ Philosophy"
        />
      </EditorialSection>

      {/* Editorial Introduction */}
      <EditorialSection background="default" spacing="generous">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-8 block">
              Our Approach
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-10 leading-tight">
              Where Science Becomes Sensation
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              At AMARISÉ, we believe beauty transcends the surface. Our
              formulations are crafted to evoke emotion—to transform daily
              routines into meaningful rituals.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              We source the finest ingredients from across the globe, honoring
              both tradition and innovation. Each texture, each scent, each
              sensation is considered.
            </p>
          </RevealSection>
        </div>
      </EditorialSection>

      <EditorialDivider />

      {/* Signature Products — Editorial Grid */}
      <EditorialSection id="collection" background="muted" spacing="hero">
        <div className="text-center mb-16 md:mb-24">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
              The Collection
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              Signature Rituals
            </h2>
          </RevealSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {beautyProducts.map((product, index) => (
            <RevealSection key={product.id} delay={index * 0.15}>
              <ProductCard
                image={getImage(product.image)}
                title={product.title}
                subtitle={product.subtitle}
                href={`/beauty/${product.slug}`}
                aspectRatio="beauty"
              />
            </RevealSection>
          ))}
        </div>
      </EditorialSection>

      {/* Pull Quote Break */}
      <EditorialSection background="default" spacing="generous">
        <PullQuote
          quote="The ritual is not in the product. It is in the pause."
          context="On the philosophy of mindful beauty"
        />
      </EditorialSection>

      {/* The Ritual — Story Block */}
      <EditorialSection background="cream" spacing="hero">
        <StoryBlock
          image={heroBeauty}
          imagePosition="left"
          caption="The Ritual"
          title="A Moment of Intention"
          paragraphs={[
            "Begin each day with purpose. Our products are designed to create pause—a breath between moments, a space for self-reflection.",
            "The texture, the scent, the sensation—each element is considered to elevate the ordinary into the extraordinary.",
            "This is not beauty as you know it. This is beauty as a practice, a philosophy, a way of being.",
          ]}
          ctaText="Explore Rituals"
          ctaLink="/beauty/rituals"
          aspectRatio="portrait"
        />
      </EditorialSection>

      {/* Ingredients Story */}
      <EditorialSection background="default" spacing="generous">
        <StoryBlock
          image={beautyIngredients}
          imagePosition="right"
          caption="Provenance"
          title="From Source to Skin"
          paragraphs={[
            "Every ingredient tells a story. The Bulgarian rose harvested at dawn. The Japanese seaweed dried by ocean winds. The French clay aged for centuries.",
            "We trace each element back to its origin, ensuring purity at every step. Nothing is included without purpose.",
          ]}
          ctaText="Our Ingredients"
          ctaLink="/beauty/ingredients-philosophy"
          aspectRatio="landscape"
        />
      </EditorialSection>

      <EditorialDivider />

      {/* Begin Your Ritual CTA */}
      <EditorialSection background="muted" spacing="hero">
        <div className="text-center max-w-2xl mx-auto">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
              Your Journey Begins
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
              Enter the Ritual
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Every ritual begins with a single step. Discover the products that
              will transform your daily routine into something meaningful.
            </p>
            <Link
              to="/beauty/radiance-serum"
              className="btn-luxury-primary text-base px-12 py-4"
            >
              Begin
            </Link>
          </RevealSection>
        </div>
      </EditorialSection>
    </Layout>
  );
};

export default Beauty;
