import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { SectionHeader } from "@/components/common/SectionHeader";

import atelierHero from "@/assets/atelier-hero.jpg";
import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";
import atelierCoat from "@/assets/atelier-coat.jpg";
import atelierDressDetail from "@/assets/atelier-dress-detail.jpg";

const craftSteps = [
  {
    number: "01",
    title: "Conception",
    description: "Every garment begins with a conversation—understanding the woman who will wear it, the moments it will witness.",
  },
  {
    number: "02",
    title: "Material",
    description: "We source fabrics from the world's finest mills. Italian silk, Scottish wool, Belgian linen. Each chosen for character.",
  },
  {
    number: "03",
    title: "Pattern",
    description: "Our master patternmakers create each template by hand, ensuring every seam falls with perfect grace.",
  },
  {
    number: "04",
    title: "Construction",
    description: "Skilled hands bring the design to life. Every stitch is intentional, every finish immaculate.",
  },
];

const materials = [
  {
    name: "Silk",
    source: "Como, Italy",
    description: "Our silk comes from mulberry silkworms raised in the traditional manner, woven on antique looms.",
  },
  {
    name: "Wool",
    source: "Scottish Highlands",
    description: "Sourced from heritage flocks, our wool is spun by mills that have operated for generations.",
  },
  {
    name: "Linen",
    source: "Flanders, Belgium",
    description: "The world's finest linen, washed in the soft waters of the Lys river.",
  },
  {
    name: "Cashmere",
    source: "Inner Mongolia",
    description: "From goats that roam the high plateaus, yielding the softest, most precious fiber.",
  },
];

const CraftDesign = () => {
  return (
    <Layout>
      <HeroSection
        image={atelierHero}
        caption="Craft & Design"
        title="The Atelier Process"
        subtitle="Where time-honored technique meets contemporary vision."
        fullHeight={true}
      />

      {/* Philosophy */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <p className="text-caption mb-6">Our Approach</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
            Made to Last
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            In an age of disposable fashion, we choose a different path. Every
            AMARISÉ garment is designed to be worn for years, to age with grace,
            to become more beautiful with time.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            This requires patience. Our pieces take weeks, sometimes months, to
            complete. But true luxury cannot be rushed.
          </p>
        </RevealSection>
      </section>

      {/* The Process */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <SectionHeader
            caption="The Process"
            title="From Concept to Creation"
            description="The journey of an AMARISÉ garment"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {craftSteps.map((step, index) => (
              <RevealSection key={step.number} delay={index * 0.1}>
                <div className="text-center">
                  <span className="text-6xl font-serif text-accent/50 mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl mb-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <SectionHeader
            caption="Materials"
            title="The Finest Fabrics"
            description="Sourced from the world's most revered mills"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {materials.map((material, index) => (
              <RevealSection key={material.name} delay={index * 0.1}>
                <div className="p-8 border border-border/30 hover:border-accent/50 transition-colors duration-500">
                  <p className="text-caption text-accent mb-2">{material.source}</p>
                  <h3 className="font-serif text-2xl mb-4">{material.name}</h3>
                  <p className="text-muted-foreground">{material.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier Images */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <RevealSection className="lg:col-span-2">
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={atelierSilkDress}
                  alt="Atelier craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>
            <RevealSection delay={0.1} className="space-y-8">
              <div className="aspect-lifestyle overflow-hidden">
                <img
                  src={atelierCoat}
                  alt="Fabric detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-lifestyle overflow-hidden">
                <img
                  src={atelierDressDetail}
                  alt="Finishing touches"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Bespoke CTA */}
      <section className="py-20 bg-rose/20">
        <RevealSection className="container-editorial text-center">
          <p className="text-caption mb-4">Bespoke Service</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Create Something Unique
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Our master tailors offer a fully bespoke service, creating garments
            crafted entirely to your vision and measurements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/atelier/collections" className="btn-luxury-primary">
              View Collections
            </Link>
            <Link to="/about-amarise" className="btn-luxury-outline">
              Learn More
            </Link>
          </div>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default CraftDesign;
