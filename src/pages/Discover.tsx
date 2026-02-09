import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { useRituals, useMoods, useStories } from "@/hooks/useContent";

import beautyCollection from "@/assets/beauty-collection.jpg";

/**
 * Discovery Page - Editorial-led exploration
 * Browse by Ritual, Mood, or Story - no SKU filters
 */
const Discover = () => {
  const rituals = useRituals();
  const moods = useMoods();
  const stories = useStories();

  return (
    <Layout>
      <HeroSection
        image={beautyCollection}
        caption="Discover"
        title="Find Your Ritual"
        subtitle="Explore our world through intention, feeling, and story."
        fullHeight={false}
        overlayOpacity={0.35}
      />

      {/* Browse by Ritual */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <RevealSection className="mb-12 text-center">
            <p className="text-caption mb-4">By Ritual</p>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Moments of Intention</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover products curated for specific moments in your day.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rituals.map((ritual, index) => (
              <RevealSection key={ritual.id} delay={index * 0.1}>
                <Link to={`/discover/ritual/${ritual.slug}`} className="group block">
                  <div className="aspect-square overflow-hidden relative bg-muted mb-4">
                    <img
                      src={ritual.image}
                      alt={ritual.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/10 transition-colors" />
                  </div>
                  <h3 className="font-serif text-lg group-hover:opacity-70 transition-opacity">
                    {ritual.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{ritual.subtitle}</p>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Mood */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <RevealSection className="mb-12 text-center">
            <p className="text-caption mb-4">By Mood</p>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">How Do You Want to Feel?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let emotion guide your discovery.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {moods.map((mood, index) => (
              <RevealSection key={mood.id} delay={index * 0.1}>
                <Link to={`/discover/mood/${mood.slug}`} className="group block">
                  <div className="aspect-[16/9] overflow-hidden relative bg-muted">
                    <img
                      src={mood.image}
                      alt={mood.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-2xl text-primary-foreground group-hover:opacity-80 transition-opacity">
                        {mood.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/70">{mood.subtitle}</p>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Story */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <RevealSection className="mb-12 text-center">
            <p className="text-caption mb-4">By Story</p>
            <h2 className="font-serif text-2xl md:text-3xl mb-4">Follow a Narrative</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Products connected by meaning and purpose.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <RevealSection key={story.id} delay={index * 0.1}>
                <Link to={`/discover/story/${story.slug}`} className="group flex gap-6 items-start">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden bg-muted">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg group-hover:opacity-70 transition-opacity">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{story.subtitle}</p>
                    <p className="text-xs text-muted-foreground/70">{story.productCount} pieces</p>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Discover;
