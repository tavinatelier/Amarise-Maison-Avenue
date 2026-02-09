import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductCard } from "@/components/common/ProductCard";

import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";
import lifestyleCandle from "@/assets/lifestyle-candle.jpg";
import lifestyleCandleDetail from "@/assets/lifestyle-candle-detail.jpg";
import lifestyleVesselDetail from "@/assets/lifestyle-vessel-detail.jpg";

const objects = [
  {
    image: lifestyleVessel,
    title: "Calma Ceramic Vessel",
    subtitle: "Handcrafted serenity",
    price: "$280",
    href: "/lifestyle/calma-vessel",
  },
  {
    image: lifestyleCandle,
    title: "Lumière Scented Candle",
    subtitle: "Amber & sandalwood",
    price: "$95",
    href: "/lifestyle/lumiere-candle",
  },
  {
    image: lifestyleVesselDetail,
    title: "Meditation Bowl",
    subtitle: "Hand-turned bronze",
    price: "$420",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleCandleDetail,
    title: "Incense Set",
    subtitle: "Japanese temple blend",
    price: "$85",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleVessel,
    title: "Stone Tray",
    subtitle: "Natural marble",
    price: "$320",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleCandle,
    title: "Reed Diffuser",
    subtitle: "Bergamot & cedar",
    price: "$110",
    href: "/lifestyle/objects",
  },
];

const Objects = () => {
  return (
    <Layout>
      <HeroSection
        image={lifestyleHero}
        caption="Objects"
        title="Artifacts of Meaning"
        subtitle="Not utilities, but emotional companions for life's quiet moments."
        fullHeight={true}
      />

      {/* Philosophy */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <p className="text-caption mb-6">The Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
            Objects with Soul
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            In a world of mass production, we choose a different path. Each
            object in our collection is selected for its ability to bring
            meaning and beauty to daily life.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            These are not things to be owned—they are companions for your
            journey, witnesses to your rituals, keepers of your moments.
          </p>
        </RevealSection>
      </section>

      {/* Objects Grid */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <SectionHeader
            caption="The Collection"
            title="Curated Objects"
            description="Each piece selected for its soul"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objects.map((product, index) => (
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

      {/* Artisan Story */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection className="order-2 lg:order-1">
              <p className="text-caption mb-4">The Makers</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Crafted by Artisans
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  We partner with artisans who share our reverence for craft.
                  From the ceramicists of Portugal to the bronze casters of
                  Japan, each maker brings generations of knowledge to their
                  work.
                </p>
                <p>
                  The result is objects that carry the mark of human hands—
                  small variations that tell of care, of time, of dedication to
                  creating something that will last.
                </p>
                <p>
                  When you bring one of these objects into your home, you bring
                  with it a story—a connection to the hands that made it, to
                  the tradition it represents, to the moments it will witness.
                </p>
              </div>
            </RevealSection>

            <RevealSection delay={0.2} className="order-1 lg:order-2">
              <div className="aspect-lifestyle overflow-hidden">
                <img
                  src={lifestyleVesselDetail}
                  alt="Artisan at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="h-[60vh] relative overflow-hidden">
        <img
          src={lifestyleCandleDetail}
          alt="Lifestyle objects"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
          <RevealSection className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
              Create Your Sanctuary
            </h2>
            <Link
              to="/lifestyle/accessories"
              className="btn-luxury-outline text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary"
            >
              View Accessories
            </Link>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default Objects;
