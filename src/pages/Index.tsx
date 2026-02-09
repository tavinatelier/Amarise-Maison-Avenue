/**
 * HOMEPAGE - LUXURY EDITORIAL EXPERIENCE
 * Transformed to match Chanel, Dior, Hermès digital standards
 * CMS-READY: All content sections powered by mock JSON data
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo";
import {
  CinematicHero,
  EditorialSection,
  EditorialDivider,
  StoryBlock,
  BrandStatement,
  MoodTile,
  PullQuote,
} from "@/components/editorial";

// BACKEND HANDOFF: Import from CMS/commerce API instead
import homepageData from "@/data/mock/homepage.json";

// Image imports - BACKEND HANDOFF: Replace with CDN URLs from API
import heroMain from "@/assets/hero-main.jpg";
import beautyLipRitual from "@/assets/beauty-lip-ritual.jpg";
import heroBeauty from "@/assets/hero-beauty.jpg";
import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";
import atelierCoat from "@/assets/atelier-coat.jpg";
import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";
import lifestyleCandle from "@/assets/lifestyle-candle.jpg";
import atelierHero from "@/assets/atelier-hero.jpg";

const Index = () => {
  // CMS data - BACKEND HANDOFF: Replace with useQuery or data loader
  const { hero, statement, sections, editorial, newsletter } = homepageData;

  return (
    <Layout>
      <SEOHead />
      
      {/* ============ CINEMATIC HERO ============ */}
      <CinematicHero
        image={heroMain}
        caption={hero.caption}
        title={hero.title}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        ctaLink={hero.ctaLink}
        overlayIntensity="medium"
        showScrollIndicator
      />

      {/* ============ BRAND STATEMENT ============ */}
      <BrandStatement>
        {statement.quote}
      </BrandStatement>

      {/* ============ DISCOVER BY MOOD ============ */}
      <EditorialSection background="cream">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-caption text-accent mb-4">Discover</p>
          <h2 className="font-serif text-display-md mb-6">Enter the World</h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            Navigate by intention. Choose your path through our universe.
          </p>
        </motion.div>

        {/* Mood Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <MoodTile
            image={heroBeauty}
            title={sections.beauty.title}
            subtitle={sections.beauty.description}
            href={sections.beauty.href}
            size="featured"
          />
          <MoodTile
            image={atelierHero}
            title={sections.atelier.title}
            subtitle={sections.atelier.description}
            href={sections.atelier.href}
            size="featured"
          />
          <MoodTile
            image={lifestyleVessel}
            title={sections.lifestyle.title}
            subtitle={sections.lifestyle.description}
            href={sections.lifestyle.href}
            size="featured"
            className="md:col-span-2 lg:col-span-1"
          />
        </div>
      </EditorialSection>

      {/* ============ EDITORIAL DIVIDER ============ */}
      <EditorialDivider />

      {/* ============ BEAUTY EDITORIAL ============ */}
      <EditorialSection>
        <StoryBlock
          image={beautyLipRitual}
          caption={sections.beauty.caption}
          title="The Art of the Ritual"
          ctaText={sections.beauty.linkText}
          ctaLink={sections.beauty.href}
          imageAspect="editorial"
        >
          <p>
            Each product is a ceremony. Each moment, an intention. 
            Our beauty philosophy transcends the superficial—we believe 
            that caring for oneself is an act of quiet rebellion against 
            the chaos of modern life.
          </p>
          <p>
            Formulated with rare botanicals and time-honored techniques, 
            every texture, every scent, every gesture is designed to 
            transform the ordinary into the extraordinary.
          </p>
        </StoryBlock>
      </EditorialSection>

      {/* ============ PULL QUOTE ============ */}
      <PullQuote
        quote="In a world that moves too fast, we choose stillness. In a world of excess, we choose essence."
        variant="offset"
        size="default"
      />

      {/* ============ ATELIER EDITORIAL ============ */}
      <EditorialSection background="muted">
        <StoryBlock
          image={atelierSilkDress}
          caption={sections.atelier.caption}
          title="Crafted with Soul"
          ctaText={sections.atelier.linkText}
          ctaLink={sections.atelier.href}
          imageAspect="portrait"
          reversed
        >
          <p>
            Where fabric becomes poetry and silhouettes tell stories. 
            Our atelier exists at the intersection of heritage craft 
            and contemporary vision—each piece a dialogue between 
            past and future.
          </p>
          <p>
            Every stitch carries intention. Every drape reveals meaning. 
            In the quiet of our workshop, artisans transform raw 
            materials into wearable philosophy.
          </p>
        </StoryBlock>
      </EditorialSection>

      {/* ============ LIFESTYLE EDITORIAL ============ */}
      <EditorialSection>
        <StoryBlock
          image={lifestyleCandle}
          caption={sections.lifestyle.caption}
          title="Objects of Meaning"
          ctaText={sections.lifestyle.linkText}
          ctaLink={sections.lifestyle.href}
          imageAspect="square"
        >
          <p>
            Not utilities, but emotional artifacts that elevate the everyday. 
            Our objects are designed to become companions in your daily 
            rituals—silent witnesses to moments of beauty.
          </p>
          <p>
            Each piece is conceived to age gracefully, developing character 
            and patina through the intimacy of use. They are designed not 
            for obsolescence, but for inheritance.
          </p>
        </StoryBlock>
      </EditorialSection>

      {/* ============ EDITORIAL DIVIDER ============ */}
      <EditorialDivider />

      {/* ============ JOURNAL TEASER ============ */}
      <EditorialSection background="cream">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="aspect-[4/5] overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={atelierCoat}
              alt="From our Journal"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <p className="text-caption text-accent mb-4">{editorial.caption}</p>
            <h2 className="font-serif text-display-sm mb-6">
              {editorial.title}
            </h2>
            {editorial.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-body-md text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
            <Link
              to={editorial.href}
              className="inline-block mt-4 btn-luxury-outline"
            >
              {editorial.linkText}
            </Link>
          </motion.div>
        </div>
      </EditorialSection>

      {/* ============ NEWSLETTER / RITUAL INVITATION ============ */}
      <section className="relative py-32 md:py-40 bg-foreground text-primary-foreground overflow-hidden">
        {/* Subtle grain overlay */}
        <div className="film-grain opacity-20" />
        
        <motion.div
          className="container-editorial text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-caption-sm text-primary-foreground/50 mb-8 tracking-[0.3em]">
            {newsletter.caption}
          </p>
          <h2 className="font-serif text-display-sm text-primary-foreground max-w-2xl mx-auto mb-10">
            {newsletter.title}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder={newsletter.placeholder}
              className="w-full px-6 py-4 bg-transparent border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50 transition-colors duration-500"
            />
            <button className="w-full sm:w-auto px-8 py-4 bg-primary-foreground text-foreground text-caption tracking-widest uppercase hover:bg-primary-foreground/90 transition-all duration-300 whitespace-nowrap">
              {newsletter.buttonText}
            </button>
          </div>
          <p className="text-caption-sm text-primary-foreground/30 mt-8">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
