import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";

import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";

const Sustainability = () => {
  return (
    <Layout>
      <HeroSection
        image={lifestyleHero}
        caption="Values & Sustainability"
        title="Beauty with Responsibility"
        subtitle="Our commitment to creating luxury that honors the planet."
        fullHeight={true}
      />

      {/* Introduction */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <div className="divider-luxury mb-8" />
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground/90">
            "Sustainability is not a trend to us—it is a responsibility. We
            believe that true luxury must be kind to the world that inspires
            it."
          </p>
          <div className="divider-luxury mt-8" />
        </RevealSection>
      </section>

      {/* Pillars */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <RevealSection className="text-center mb-16">
            <p className="text-caption mb-4">Our Pillars</p>
            <h2 className="font-serif text-3xl md:text-4xl">
              How We Make a Difference
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {[
              {
                title: "Sustainable Sourcing",
                description:
                  "We partner with suppliers who share our commitment to ethical practices. From organic cotton to recycled metals, every material is chosen with care for both quality and environmental impact.",
              },
              {
                title: "Conscious Production",
                description:
                  "Our manufacturing partners meet rigorous environmental and social standards. We prioritize local production where possible, reducing transportation emissions while supporting artisan communities.",
              },
              {
                title: "Mindful Packaging",
                description:
                  "Beauty shouldn't come at the cost of the planet. Our packaging is designed to be beautiful, functional, and environmentally responsible—using recycled materials and eliminating unnecessary elements.",
              },
              {
                title: "Longevity Over Trend",
                description:
                  "The most sustainable product is one that lasts. We design for timelessness, creating pieces meant to be treasured for years rather than discarded after seasons.",
              },
            ].map((pillar, index) => (
              <RevealSection key={pillar.title} delay={index * 0.1}>
                <h3 className="font-serif text-xl md:text-2xl mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection>
              <div className="aspect-lifestyle overflow-hidden">
                <img
                  src={lifestyleVessel}
                  alt="Sustainable practices"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-caption mb-4">Our Goals</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">
                The Road Ahead
              </h2>
              <div className="space-y-6">
                {[
                  { year: "2025", goal: "100% recyclable packaging across all product lines" },
                  { year: "2026", goal: "Carbon-neutral operations worldwide" },
                  { year: "2027", goal: "Zero waste production in our primary facilities" },
                  { year: "2030", goal: "Fully regenerative supply chain" },
                ].map((item) => (
                  <div
                    key={item.year}
                    className="flex items-start gap-4 pb-4 border-b border-divider last:border-0"
                  >
                    <span className="text-caption text-accent font-medium">
                      {item.year}
                    </span>
                    <p className="text-muted-foreground">{item.goal}</p>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 bg-foreground text-primary-foreground">
        <RevealSection className="container-narrow text-center">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Sustainability is not a destination—it is a continuous journey of
            improvement. We are committed to transparency, to learning, and to
            evolving our practices as better solutions emerge.
          </p>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default Sustainability;
