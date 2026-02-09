/**
 * LIFESTYLE LANDING PAGE — Editorial Objects Experience
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
import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";
import lifestyleCandle from "@/assets/lifestyle-candle.jpg";
import lifestyleVesselDetail from "@/assets/lifestyle-vessel-detail.jpg";
import lifestyleCandleDetail from "@/assets/lifestyle-candle-detail.jpg";

// Image map for resolving mock data paths to imports
const imageMap: Record<string, string> = {
  "/assets/lifestyle-hero.jpg": lifestyleHero,
  "/assets/lifestyle-vessel.jpg": lifestyleVessel,
  "/assets/lifestyle-candle.jpg": lifestyleCandle,
};

const getImage = (path: string): string => imageMap[path] || path;

// Get lifestyle products from mock data
const lifestyleProducts = productsData.lifestyle;

const Lifestyle = () => {
  return (
    <Layout>
      <SEOHead
        title="Lifestyle"
        description="Objects of meaning. Explore AMARISÉ lifestyle—curated home objects and accessories that elevate everyday moments."
      />

      {/* Cinematic Hero — Objects Editorial */}
      <CinematicHero
        image={lifestyleHero}
        caption="For the Home"
        title="Objects of Meaning"
        subtitle="Not utilities, but emotional artifacts that elevate the everyday."
        ctaText="Discover Objects"
        ctaLink="#collection"
        overlayOpacity={0.35}
      />

      {/* Brand Statement */}
      <EditorialSection background="cream" spacing="hero">
        <BrandStatement
          statement="A home is not decorated. It is curated."
          attribution="The Lifestyle Philosophy"
        />
      </EditorialSection>

      {/* Philosophy Introduction */}
      <EditorialSection background="default" spacing="generous">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-8 block">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-10 leading-tight">
              Living with Intention
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Every object in your space tells a story. We curate pieces that
              speak to the soul—vessels that hold more than water, textiles that
              comfort beyond warmth, fragrances that evoke memories yet to be made.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              These are not possessions. They are companions for the life you are
              building.
            </p>
          </RevealSection>
        </div>
      </EditorialSection>

      <EditorialDivider />

      {/* Objects Grid — Editorial Display */}
      <EditorialSection id="collection" background="muted" spacing="hero">
        <div className="text-center mb-16 md:mb-24">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
              The Collection
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              Curated Objects
            </h2>
          </RevealSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {lifestyleProducts.map((product, index) => (
            <RevealSection key={product.id} delay={index * 0.1}>
              <ProductCard
                image={getImage(product.image)}
                title={product.title}
                subtitle={product.subtitle}
                href={`/lifestyle/${product.slug}`}
                aspectRatio="lifestyle"
              />
            </RevealSection>
          ))}
        </div>
      </EditorialSection>

      {/* Pull Quote */}
      <EditorialSection background="default" spacing="generous">
        <PullQuote
          quote="The objects we choose to live with shape who we become."
          context="On the art of curation"
        />
      </EditorialSection>

      {/* Artisan Story */}
      <EditorialSection background="cream" spacing="hero">
        <StoryBlock
          image={lifestyleVesselDetail}
          imagePosition="left"
          caption="The Makers"
          title="Crafted by Artisans"
          paragraphs={[
            "We partner with artisans who share our reverence for craft. From the ceramicists of Portugal to the weavers of Japan, each maker brings generations of knowledge to their work.",
            "The result is objects that carry the mark of human hands—small variations that tell of care, of time, of dedication to creating something that will last.",
          ]}
          ctaText="Meet Our Makers"
          ctaLink="/lifestyle/objects"
          aspectRatio="portrait"
        />
      </EditorialSection>

      {/* Fragrance Story */}
      <EditorialSection background="default" spacing="generous">
        <StoryBlock
          image={lifestyleCandleDetail}
          imagePosition="right"
          caption="Atmosphere"
          title="The Language of Scent"
          paragraphs={[
            "Fragrance is memory made tangible. Our candles and diffusers are composed like music—top notes that greet you, heart notes that embrace you, base notes that linger long after.",
            "Each scent tells a story of place and time. Mediterranean gardens at dusk. Alpine forests after rain. The quiet warmth of a winter evening.",
          ]}
          ctaText="Explore Fragrances"
          ctaLink="/lifestyle/lumiere-candle"
          aspectRatio="landscape"
        />
      </EditorialSection>

      <EditorialDivider />

      {/* Explore CTA */}
      <EditorialSection background="muted" spacing="hero">
        <div className="text-center max-w-2xl mx-auto">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
              Your Space Awaits
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
              Begin Curating
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              Transform your environment into a reflection of your values.
              Discover objects that will become part of your story.
            </p>
            <Link
              to="/lifestyle/lumiere-candle"
              className="btn-luxury-primary text-base px-12 py-4"
            >
              Explore
            </Link>
          </RevealSection>
        </div>
      </EditorialSection>
    </Layout>
  );
};

export default Lifestyle;
