import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductCard } from "@/components/common/ProductCard";

import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";
import lifestyleCandle from "@/assets/lifestyle-candle.jpg";
import lifestyleVesselDetail from "@/assets/lifestyle-vessel-detail.jpg";

const accessories = [
  {
    image: lifestyleVessel,
    title: "Serene Linen Throw",
    subtitle: "Organic comfort",
    price: "$380",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleCandle,
    title: "Silk Sleep Mask",
    subtitle: "Restful luxury",
    price: "$120",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleVesselDetail,
    title: "Cashmere Travel Blanket",
    subtitle: "Portable warmth",
    price: "$680",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleVessel,
    title: "Leather Journal",
    subtitle: "Handbound thoughts",
    price: "$220",
    href: "/lifestyle/objects",
  },
];

const Accessories = () => {
  return (
    <Layout>
      <HeroSection
        image={lifestyleHero}
        caption="Accessories"
        title="Objects of Comfort"
        subtitle="Thoughtfully designed pieces that elevate the everyday."
        fullHeight={true}
      />

      {/* Philosophy */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <p className="text-caption mb-6">The Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
            Living with Intention
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Our accessories are not mere objects—they are companions for life's
            quiet moments. Each piece is designed to bring comfort, beauty, and
            meaning to the rituals of everyday living.
          </p>
        </RevealSection>
      </section>

      {/* Products */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <SectionHeader
            caption="The Collection"
            title="Curated Accessories"
            description="Objects that bring comfort and beauty to daily life"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {accessories.map((product, index) => (
              <RevealSection key={product.title} delay={index * 0.1}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  href={product.href}
                  aspectRatio="lifestyle"
                />
                <p className="mt-4 text-center font-serif text-lg">{product.price}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection>
              <div className="aspect-lifestyle overflow-hidden">
                <img
                  src={lifestyleVesselDetail}
                  alt="Handcrafted accessory"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-caption mb-4">The Craft</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Made by Hand
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Every accessory in our collection is made by skilled artisans
                  who understand that true luxury is found in the details.
                </p>
                <p>
                  From the hand-stitched leather of our journals to the
                  hand-loomed cashmere of our blankets, each piece carries the
                  mark of human care and attention.
                </p>
              </div>
              <Link to="/lifestyle/objects" className="inline-block mt-8 btn-luxury-outline">
                Explore Objects
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-rose/20">
        <RevealSection className="container-editorial text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Complete Your Ritual
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Discover how our accessories can transform your daily moments.
          </p>
          <Link to="/lifestyle" className="btn-luxury-primary">
            View All Lifestyle
          </Link>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default Accessories;
