import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/common/HeroSection";
import { RevealSection } from "@/components/common/RevealSection";

import atelierLookbookHero from "@/assets/atelier-lookbook-hero.jpg";
import atelierSilkDress from "@/assets/atelier-silk-dress.jpg";
import atelierCoat from "@/assets/atelier-coat.jpg";
import atelierDressDetail from "@/assets/atelier-dress-detail.jpg";

const lookbookImages = [
  {
    image: atelierSilkDress,
    title: "Élan Silk Dress",
    look: "Look 01",
  },
  {
    image: atelierDressDetail,
    title: "Lumière Gown",
    look: "Look 02",
  },
  {
    image: atelierCoat,
    title: "Heritage Coat",
    look: "Look 03",
  },
  {
    image: atelierSilkDress,
    title: "Serene Blouse",
    look: "Look 04",
  },
  {
    image: atelierDressDetail,
    title: "Evening Set",
    look: "Look 05",
  },
  {
    image: atelierCoat,
    title: "Wool Overcoat",
    look: "Look 06",
  },
];

const Lookbook = () => {
  return (
    <Layout>
      <HeroSection
        image={atelierLookbookHero}
        caption="Lookbook"
        title="Spring/Summer 2025"
        subtitle="A meditation on light, movement, and the poetry of fabric."
        fullHeight={true}
      />

      {/* Editorial Intro */}
      <section className="section-luxury bg-background">
        <RevealSection className="container-narrow text-center">
          <p className="text-caption mb-6">The Vision</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8">
            Quiet Luxury
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            This season's collection is a study in restraint. We explored the
            tension between structure and fluidity, between presence and absence.
            The result is a wardrobe of pieces that whisper rather than shout—
            garments that reveal themselves slowly, rewarding attention with
            details that unfold over time.
          </p>
        </RevealSection>
      </section>

      {/* Lookbook Grid */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {lookbookImages.map((item, index) => (
              <RevealSection key={item.look} delay={index * 0.05}>
                <Link
                  to="/atelier/collections"
                  className="group block bg-background"
                >
                  <div className="relative aspect-atelier overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-caption text-primary-foreground mb-2">{item.look}</p>
                      <h3 className="font-serif text-xl md:text-2xl text-primary-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="section-luxury bg-background">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection>
              <div className="aspect-atelier overflow-hidden">
                <img
                  src={atelierDressDetail}
                  alt="Behind the scenes"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-caption mb-4">Behind the Lookbook</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Shot on Location in Provence
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  For this season's lookbook, we traveled to the lavender fields
                  of Provence—a landscape that embodies the same quiet beauty we
                  seek in our designs.
                </p>
                <p>
                  Photographer Elena Moreau captured these images over three
                  days, working only with natural light to honor the organic
                  nature of our fabrics.
                </p>
                <p>
                  The result is a visual poem—images that breathe, that invite
                  contemplation, that reveal the soul of each garment.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-rose/20">
        <RevealSection className="container-editorial text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Shop the Collection
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Each piece from this lookbook is available in our atelier.
          </p>
          <Link to="/atelier/collections" className="btn-luxury-primary">
            View All Pieces
          </Link>
        </RevealSection>
      </section>
    </Layout>
  );
};

export default Lookbook;
