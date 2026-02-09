/**
 * JOURNAL PAGE
 * CMS-READY: Article data powered by mock JSON
 * BACKEND HANDOFF: Replace imports with API calls via content.service.ts
 */

import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { SEOHead } from "@/components/seo";

// BACKEND HANDOFF: Import from CMS API instead
import journalData from "@/data/mock/journal.json";

// Image imports - BACKEND HANDOFF: Replace with CDN URLs from API
import journalHero from "@/assets/journal-hero.jpg";
import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";
import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";
import beautyLipRitual from "@/assets/beauty-lip-ritual.jpg";

// Image map for resolving mock data paths to imports
const imageMap: Record<string, string> = {
  "/assets/journal-hero.jpg": journalHero,
  "/assets/atelier-silk-dress.jpg": atelierSilkDress,
  "/assets/lifestyle-vessel.jpg": lifestyleVessel,
  "/assets/beauty-lip-ritual.jpg": beautyLipRitual,
};

const getImage = (path: string): string => imageMap[path] || path;

// Get journal data from mock
const { featured, articles } = journalData;

const Journal = () => {
  return (
    <Layout>
      <SEOHead
        title="Journal"
        description="Stories and reflections from AMARISÉ. Explorations of beauty, craft, and the art of living well."
      />
      <HeroSection
        image={journalHero}
        caption="Journal"
        title="Stories & Reflections"
        subtitle="Explorations of beauty, craft, and the art of living well."
        fullHeight={true}
      />

      {/* Featured Article - CMS: journal.featured */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection>
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={getImage(featured.image)}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-caption text-accent mb-4">
                {featured.category}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {featured.excerpt}
              </p>
              {featured.content && (
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {featured.content}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {featured.dateFormatted}
                </span>
                <Link
                  to={`/journal/${featured.slug}`}
                  className="text-caption link-luxury"
                >
                  Read Full Story
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Article Grid - CMS: journal.articles */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <RevealSection className="mb-12 md:mb-16">
            <p className="text-caption mb-4">Latest Stories</p>
            <h2 className="font-serif text-2xl md:text-3xl">
              From the Journal
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article, index) => (
              <RevealSection key={article.id} delay={index * 0.1}>
                <Link to={`/journal/${article.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <img
                      src={getImage(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-caption text-accent mb-2">
                    {article.category}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl mb-3 group-hover:opacity-70 transition-opacity">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {article.dateFormatted}
                  </span>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form Content Section */}
      <section className="section-luxury bg-background">
        <div className="container-narrow">
          <RevealSection className="prose prose-lg max-w-none">
            <p className="text-caption text-center mb-8">A Note from AMARISÉ</p>
            <div className="text-center whitespace-pre-line text-muted-foreground leading-relaxed">
              <p className="mb-6">
                The Journal is our space for reflection—a place where we explore
                the ideas that inspire us, the craftspeople who move us, and the
                beauty we find in everyday moments.
              </p>
              <p className="mb-6">
                Here, you'll find stories about the artisans behind our
                products, essays on the philosophy of slow living, and glimpses
                into the world of AMARISÉ.
              </p>
              <p>
                We invite you to linger, to read slowly, to find inspiration for
                your own journey toward intentional living.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default Journal;
