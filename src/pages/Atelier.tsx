/**
 * ATELIER LANDING PAGE — Editorial Fashion Experience
 * CMS-READY: Product and lookbook data powered by mock JSON
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
import atelierHero from "@/assets/atelier-hero.jpg";
import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";
import atelierCoat from "@/assets/atelier-coat.jpg";
import atelierDressDetail from "@/assets/atelier-dress-detail.jpg";
import atelierLookbookHero from "@/assets/atelier-lookbook-hero.jpg";

// Image map for resolving mock data paths to imports
const imageMap: Record<string, string> = {
  "/assets/atelier-hero.jpg": atelierHero,
  "/assets/atelier-silk-dress.jpg": atelierSilkDress,
  "/assets/atelier-coat.jpg": atelierCoat,
};

const getImage = (path: string): string => imageMap[path] || path;

// Get atelier products from mock data
const atelierProducts = productsData.atelier;

const Atelier = () => {
  return (
    <Layout>
      <SEOHead
        title="Atelier"
        description="Where fabric becomes poetry. Explore AMARISÉ atelier—luxury fashion crafted by artisans with timeless elegance."
      />

      {/* Cinematic Hero — Fashion Editorial Opening */}
      <CinematicHero
        image={atelierHero}
        caption="Spring/Summer"
        title="Where Fabric Becomes Poetry"
        subtitle="Each silhouette tells a story. Each stitch carries intention."
        ctaText="View the Collection"
        ctaLink="#lookbook"
        overlayOpacity={0.35}
      />

      {/* Brand Statement */}
      <EditorialSection background="default" spacing="hero">
        <BrandStatement
          statement="Clothing is not worn. It is inhabited."
          attribution="The Atelier Philosophy"
        />
      </EditorialSection>

      {/* Editorial Introduction */}
      <EditorialSection background="cream" spacing="generous">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-8 block">
              The Season
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-10 leading-tight">
              A Meditation on Light
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              This collection explores the quiet power of simplicity. Silhouettes
              that move with the body. Fabrics that catch the light. Colors drawn
              from the first hours of morning.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              Each piece is designed to be worn for decades, not seasons. To age
              with grace, like the person who wears it.
            </p>
          </RevealSection>
        </div>
      </EditorialSection>

      <EditorialDivider />

      {/* Lookbook Grid — Editorial Product Display */}
      <EditorialSection id="lookbook" background="default" spacing="hero">
        <div className="text-center mb-16 md:mb-24">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-muted-foreground mb-6 block">
              The Lookbook
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              Spring/Summer Collection
            </h2>
          </RevealSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {atelierProducts.map((product, index) => (
            <RevealSection key={product.id} delay={index * 0.15}>
              <ProductCard
                image={getImage(product.image)}
                title={product.title}
                subtitle={product.subtitle}
                href={`/atelier/${product.slug}`}
                aspectRatio="atelier"
              />
            </RevealSection>
          ))}
        </div>
      </EditorialSection>

      {/* Pull Quote */}
      <EditorialSection background="muted" spacing="generous">
        <PullQuote
          quote="True elegance is not about being noticed. It is about being remembered."
          context="On the nature of lasting style"
        />
      </EditorialSection>

      {/* Craft Story */}
      <EditorialSection background="default" spacing="hero">
        <StoryBlock
          image={atelierDressDetail}
          imagePosition="right"
          caption="The Craft"
          title="Made by Hand, Worn with Heart"
          paragraphs={[
            "In our atelier, time moves differently. Each piece is crafted by artisans who understand that true luxury cannot be rushed.",
            "We source our fabrics from the world's finest mills—silk from Italy, wool from Scotland, linen from Belgium. Each material is chosen for its character, its drape, its ability to age with grace.",
            "The result is clothing that feels as good as it looks—pieces that become more beautiful with time, that carry your story within their threads.",
          ]}
          ctaText="Our Craft"
          ctaLink="/atelier/craft-design"
          aspectRatio="portrait"
        />
      </EditorialSection>

      {/* Full Width Lookbook Image */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={atelierLookbookHero}
            alt="Atelier collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end justify-center pb-16 md:pb-24">
          <RevealSection className="text-center">
            <span className="text-caption tracking-[0.3em] uppercase text-primary-foreground/70 mb-4 block">
              The Complete Vision
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-8">
              View the Lookbook
            </h2>
            <Link
              to="/atelier/lookbook"
              className="btn-luxury-outline text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground hover:text-foreground"
            >
              Explore
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Private Preview Teaser */}
      <EditorialSection background="cream" spacing="generous">
        <div className="text-center max-w-2xl mx-auto">
          <RevealSection>
            <span className="text-caption tracking-[0.3em] uppercase text-accent mb-6 block">
              Private Preview
            </span>
            <h3 className="font-serif text-2xl md:text-3xl mb-6">
              Autumn/Winter — By Invitation
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Private Circle members receive early access to upcoming collections,
              personal styling consultations, and exclusive preview events.
            </p>
            <Link
              to="/discover"
              className="link-luxury text-sm"
            >
              Learn About Private Circle
            </Link>
          </RevealSection>
        </div>
      </EditorialSection>
    </Layout>
  );
};

export default Atelier;
