import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductCard } from "@/components/common/ProductCard";

import atelierHero from "@/assets/atelier-hero.jpg";
import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";
import atelierCoat from "@/assets/atelier-coat.jpg";
import atelierDressDetail from "@/assets/atelier-dress-detail.jpg";

const springCollection = [
  {
    image: atelierSilkDress,
    title: "Élan Silk Dress",
    subtitle: "Flowing elegance",
    price: "$1,480",
    href: "/atelier/elan-silk-dress",
  },
  {
    image: atelierDressDetail,
    title: "Lumière Gown",
    subtitle: "Evening radiance",
    price: "$2,890",
    href: "/atelier/collections",
  },
  {
    image: atelierCoat,
    title: "Heritage Coat",
    subtitle: "Structured sophistication",
    price: "$2,240",
    href: "/atelier/collections",
  },
  {
    image: atelierSilkDress,
    title: "Serene Blouse",
    subtitle: "Effortless refinement",
    price: "$680",
    href: "/atelier/collections",
  },
];

const autumnCollection = [
  {
    image: atelierCoat,
    title: "Wool Overcoat",
    subtitle: "Winter warmth",
    price: "$3,200",
    href: "/atelier/collections",
  },
  {
    image: atelierDressDetail,
    title: "Cashmere Dress",
    subtitle: "Soft luxury",
    price: "$1,890",
    href: "/atelier/collections",
  },
];

const Collections = () => {
  return (
    <Layout>
      <HeroSection
        image={atelierHero}
        caption="Atelier Collections"
        title="Seasons of Intention"
        subtitle="Each collection tells a story of craft, beauty, and timeless elegance."
        fullHeight={true}
      />

      {/* Spring/Summer */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <SectionHeader
            caption="Spring / Summer"
            title="Light and Movement"
            description="Pieces that flow with the warmth of the season"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {springCollection.map((product, index) => (
              <RevealSection key={product.title} delay={index * 0.1}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  href={product.href}
                  aspectRatio="atelier"
                />
                <p className="mt-4 text-center font-serif text-lg">{product.price}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Autumn/Winter */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <SectionHeader
            caption="Autumn / Winter"
            title="Warmth and Structure"
            description="Pieces that embrace the quiet elegance of cooler seasons"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {autumnCollection.map((product, index) => (
              <RevealSection key={product.title} delay={index * 0.1}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                  href={product.href}
                  aspectRatio="atelier"
                />
                <p className="mt-4 text-center font-serif text-lg">{product.price}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke */}
      <section className="py-20 bg-rose/20">
        <RevealSection className="container-editorial text-center">
          <p className="text-caption mb-4">Private Appointments</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Bespoke Atelier Service
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            For those who desire something truly personal, our master tailors offer
            a bespoke service, creating pieces crafted entirely to your vision.
          </p>
          <Link to="/atelier/craft-design" className="btn-luxury-primary">
            Book a Consultation
          </Link>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default Collections;
