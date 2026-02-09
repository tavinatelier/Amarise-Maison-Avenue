import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";
import { SectionHeader } from "@/components/common/SectionHeader";

import beautyIngredients from "@/assets/beauty-ingredients.jpg";
import beautySerum from "@/assets/beauty-serum.jpg";
import heroBeauty from "@/assets/hero-beauty.jpg";

const keyIngredients = [
  {
    name: "Bulgarian Rose",
    origin: "Rose Valley, Bulgaria",
    benefit: "Deep hydration and cellular renewal",
    description: "Hand-harvested at dawn when the oil content is highest, our Bulgarian roses are distilled using traditional copper stills.",
  },
  {
    name: "Japanese Camellia",
    origin: "Nagasaki, Japan",
    benefit: "Antioxidant protection and luminosity",
    description: "Cold-pressed from heritage camellia trees, this precious oil has been used in Japanese beauty rituals for centuries.",
  },
  {
    name: "French Maritime Pine",
    origin: "Les Landes, France",
    benefit: "Collagen support and skin elasticity",
    description: "Extracted from the bark of sustainably harvested pines, this powerful antioxidant protects against environmental stress.",
  },
  {
    name: "New Zealand Manuka",
    origin: "North Island, New Zealand",
    benefit: "Natural healing and skin clarity",
    description: "Our UMF 15+ manuka honey is sourced from remote hives in the pristine forests of New Zealand.",
  },
];

const philosophyPrinciples = [
  {
    title: "Purity",
    description: "We use only ingredients that serve a purpose. No fillers, no synthetics, no compromises.",
  },
  {
    title: "Provenance",
    description: "Every ingredient is traceable to its source. We know the hands that touched it, the land that grew it.",
  },
  {
    title: "Patience",
    description: "We never rush formulation. Some of our products take years to perfect.",
  },
];

const IngredientsPhilosophy = () => {
  return (
    <Layout>
      <HeroSection
        image={beautyIngredients}
        caption="Ingredients"
        title="Where Nature Meets Intention"
        subtitle="The purest ingredients from the world's most pristine sources."
        fullHeight={true}
      />

      {/* Philosophy Section */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <p className="text-caption mb-6">Our Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
            Less, but Better
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            At AMARISÉ, we believe that what you leave out is as important as what
            you put in. Our formulations are stripped of everything unnecessary,
            leaving only the essentials.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            We source the finest botanical ingredients from around the world,
            working directly with farmers and artisans who share our commitment to
            quality and sustainability.
          </p>
        </RevealSection>
      </section>

      {/* Three Principles */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {philosophyPrinciples.map((principle, index) => (
              <RevealSection key={principle.title} delay={index * 0.1}>
                <div className="text-center">
                  <h3 className="font-serif text-2xl md:text-3xl mb-4">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Ingredients */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <SectionHeader
            caption="The Essentials"
            title="Signature Ingredients"
            description="The botanical treasures at the heart of our formulations"
          />

          <div className="space-y-16">
            {keyIngredients.map((ingredient, index) => (
              <RevealSection key={ingredient.name} delay={0.1}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <p className="text-caption text-accent mb-2">{ingredient.origin}</p>
                    <h3 className="font-serif text-2xl md:text-3xl mb-4">{ingredient.name}</h3>
                    <p className="text-muted-foreground mb-4">{ingredient.description}</p>
                    <p className="text-sm font-medium">{ingredient.benefit}</p>
                  </div>
                  <div className={`aspect-lifestyle overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img
                      src={index % 2 === 0 ? beautySerum : heroBeauty}
                      alt={ingredient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 bg-rose/20">
        <RevealSection className="container-narrow text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Our Commitment
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Every AMARISÉ product is free from parabens, sulfates, synthetic
            fragrances, and artificial colors. We never test on animals.
          </p>
          <Link to="/values-sustainability" className="btn-luxury-outline">
            Learn About Our Values
          </Link>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default IngredientsPhilosophy;
