import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RevealSection } from "@/components/common/RevealSection";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToRitualButton } from "@/components/product/AddToRitualButton";
import { RelatedProducts } from "@/components/product/RelatedProducts";

import lifestyleVessel from "@/assets/lifestyle-vessel.jpg";
import lifestyleVesselDetail from "@/assets/lifestyle-vessel-detail.jpg";
import lifestyleCandle from "@/assets/lifestyle-candle.jpg";
import lifestyleCandleDetail from "@/assets/lifestyle-candle-detail.jpg";

const productImages = [
  lifestyleVessel,
  lifestyleVesselDetail,
  lifestyleVessel,
  lifestyleVesselDetail,
];

const relatedProducts = [
  {
    image: lifestyleCandle,
    title: "Lumière Candle",
    subtitle: "Amber & sandalwood",
    href: "/lifestyle/lumiere-candle",
  },
  {
    image: lifestyleCandleDetail,
    title: "Incense Set",
    subtitle: "Temple blend",
    href: "/lifestyle/objects",
  },
  {
    image: lifestyleVessel,
    title: "Stone Tray",
    subtitle: "Natural marble",
    href: "/lifestyle/objects",
  },
];

const CalmaVessel = () => {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container-editorial pt-32 pb-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to="/lifestyle" className="hover:text-foreground transition-colors">Lifestyle</Link>
          <span>/</span>
          <Link to="/lifestyle/objects" className="hover:text-foreground transition-colors">Objects</Link>
          <span>/</span>
          <span className="text-foreground">Calma Ceramic Vessel</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container-editorial pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <RevealSection>
            <ProductGallery images={productImages} productName="Calma Ceramic Vessel" />
          </RevealSection>

          {/* Product Info */}
          <RevealSection delay={0.2}>
            <div className="lg:sticky lg:top-32 space-y-8">
              <div>
                <p className="text-caption text-accent mb-3">Handcrafted in Portugal</p>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                  Calma Ceramic Vessel
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  A meditation in clay. Hand-thrown by master ceramicists in
                  Portugal, this vessel embodies the quiet beauty of imperfection—
                  each subtle variation a testament to the human hand that shaped it.
                </p>
              </div>

              {/* Add to Cart */}
              <AddToRitualButton 
                productId="calma-vessel"
                productName="Calma Ceramic Vessel" 
                price="€280"
                image={lifestyleVessel}
              />

              {/* Product Details */}
              <div className="pt-8 border-t border-border/30 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Details</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Hand-thrown stoneware ceramic</li>
                    <li>Natural matte glaze finish</li>
                    <li>Height: 18cm / Diameter: 14cm</li>
                    <li>Watertight interior</li>
                    <li>Food-safe glaze</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Care</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Hand wash with mild soap</li>
                    <li>Dry thoroughly after washing</li>
                    <li>Handle with care—each piece is unique</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Origin</h3>
                  <p className="text-sm text-muted-foreground">
                    Crafted in the traditional pottery workshops of São Pedro do
                    Corval, Portugal, where the art of ceramics has been practiced
                    for generations.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-luxury bg-muted/30">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <RevealSection>
              <div className="aspect-lifestyle overflow-hidden">
                <img
                  src={lifestyleVesselDetail}
                  alt="Vessel detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </RevealSection>

            <RevealSection delay={0.2}>
              <p className="text-caption mb-4">The Story</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Born from Earth
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  The Calma Vessel is created by master ceramicist João Silva,
                  whose family has worked with clay for five generations. Each
                  piece is thrown on a hand-powered wheel using techniques
                  unchanged for centuries.
                </p>
                <p>
                  The clay is sourced locally from the hills surrounding São
                  Pedro do Corval—the same earth that has yielded pottery for
                  over 500 years. The natural minerals in the clay give each
                  piece its distinctive warm tone.
                </p>
                <p>
                  After shaping, the vessel is left to dry slowly for two weeks
                  before being fired in a wood-burning kiln. The result is a
                  piece that feels ancient and modern simultaneously—a vessel
                  that connects you to the long lineage of human craft.
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} />
    </Layout>
  );
};

export default CalmaVessel;
