import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductCard } from "@/components/common/ProductCard";

import beautyCollection from "@/assets/beauty-collection.jpg";
import beautyLipRitual from "@/assets/beauty-lip-ritual.jpg";
import beautySerum from "@/assets/beauty-serum.jpg";
import heroBeauty from "@/assets/hero-beauty.jpg";

const ritualProducts = [
  {
    image: beautyLipRitual,
    title: "Veil Lip Ritual",
    subtitle: "A whisper of color",
    href: "/beauty/signature-lips",
  },
  {
    image: beautySerum,
    title: "Radiance Serum",
    subtitle: "Pure luminosity",
    href: "/beauty/radiance-serum",
  },
  {
    image: heroBeauty,
    title: "Essence Mist",
    subtitle: "Dewdrop freshness",
    href: "/beauty/signature-lips",
  },
];

const ritualSteps = [
  {
    number: "01",
    title: "Cleanse",
    description: "Begin with a gentle cleanse to prepare the canvas of your skin.",
  },
  {
    number: "02",
    title: "Nourish",
    description: "Apply the Radiance Serum in gentle, upward strokes.",
  },
  {
    number: "03",
    title: "Mist",
    description: "A light veil of Essence Mist to set and refresh.",
  },
  {
    number: "04",
    title: "Define",
    description: "Complete with the Veil Lip Ritual for a whisper of color.",
  },
];

const Rituals = () => {
  return (
    <Layout>
      <HeroSection
        image={beautyCollection}
        caption="Beauty Rituals"
        title="The Art of Intention"
        subtitle="Transform daily routines into meaningful ceremonies."
        fullHeight={true}
      />

      {/* Philosophy */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <p className="text-caption mb-6">Our Approach</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
            Beauty as Practice
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            At AMARISÉ, we believe that beauty is not merely skin deep. It is a
            practice, a philosophy, a way of being present in the world. Each
            product is designed to create pause—a moment of intention in your day.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Our rituals are designed to be slow, deliberate, and deeply personal.
            There is no rush. Only you, and this moment.
          </p>
        </RevealSection>
      </section>

      {/* Ritual Steps */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <SectionHeader
            caption="The Ritual"
            title="Four Steps to Radiance"
            description="A daily ceremony for your skin and soul"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {ritualSteps.map((step, index) => (
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

      {/* Products for Ritual */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <SectionHeader
            caption="The Collection"
            title="Ritual Essentials"
            description="Everything you need for your daily ceremony"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ritualProducts.map((product, index) => (
              <RevealSection key={product.title} delay={index * 0.1}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  href={product.href}
                  aspectRatio="beauty"
                />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-rose/20">
        <RevealSection className="container-editorial text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Begin Your Ritual
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Discover the products that will transform your daily routine into a
            sacred practice.
          </p>
          <Link to="/beauty/signature-lips" className="btn-luxury-primary">
            Explore Products
          </Link>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default Rituals;
