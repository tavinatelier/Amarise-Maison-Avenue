import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";

import heroMain from "@/assets/hero-main.jpg";
import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";

const About = () => {
  return (
    <Layout>
      <HeroSection
        image={heroMain}
        caption="About AMARISÉ"
        title="A New Definition of Luxury"
        subtitle="Where beauty meets intention, and every detail whispers refinement."
        fullHeight={true}
      />

      {/* Story Section */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection>
              <p className="text-caption mb-4">Our Story</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
                Born from a Vision of Quiet Luxury
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  AMARISÉ was founded on a simple belief: that true luxury
                  doesn't shout—it whispers. In a world of noise and excess, we
                  sought to create a brand that speaks to those who understand
                  that the most beautiful things often require the closest
                  attention.
                </p>
                <p>
                  Our name, derived from the French "aimer" (to love), reflects
                  our approach to everything we do. Each product, each
                  experience, each interaction is crafted with love—and with the
                  understanding that love, like luxury, cannot be rushed.
                </p>
                <p>
                  Today, AMARISÉ spans beauty, fashion, and lifestyle—a
                  complete world for those who seek meaning in their
                  possessions and intention in their daily rituals.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={atelierSilkDress}
                  alt="AMARISÉ Story"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <RevealSection className="text-center mb-16">
            <p className="text-caption mb-4">Our Values</p>
            <h2 className="font-serif text-3xl md:text-4xl">
              What We Believe
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                title: "Intentionality",
                description:
                  "Every decision is deliberate. From ingredient selection to packaging design, nothing is accidental.",
              },
              {
                title: "Timelessness",
                description:
                  "We create for longevity, not trends. Our pieces are designed to be loved for years, not seasons.",
              },
              {
                title: "Craft",
                description:
                  "We honor the hands that make our products. Every artisan partnership is built on mutual respect and shared values.",
              },
            ].map((value, index) => (
              <RevealSection key={value.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="divider-luxury mb-6" />
                  <h3 className="font-serif text-xl md:text-2xl mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-luxury bg-background">
        <div className="container-narrow text-center">
          <RevealSection>
            <p className="text-caption mb-6">Global Presence</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-8">
              From Our World to Yours
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              AMARISÉ serves design-aware women across the United States,
              United Kingdom, Canada, Australia, and India. Our digital
              flagship offers the complete AMARISÉ experience, while select
              retail partners bring our world to life in person.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-caption text-muted-foreground">
              <span>United States</span>
              <span>•</span>
              <span>United Kingdom</span>
              <span>•</span>
              <span>Canada</span>
              <span>•</span>
              <span>Australia</span>
              <span>•</span>
              <span>India</span>
            </div>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
