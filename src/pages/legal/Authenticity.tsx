import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo";
import { motion } from "framer-motion";
import { Shield, Award, Fingerprint, PackageCheck, Globe, Leaf } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export default function Authenticity() {
  return (
    <Layout>
      <SEOHead
        title="Authenticity & Craft — AMARISÉ"
        description="Our commitment to authenticity, craftsmanship, and transparency. Every AMARISÉ piece is a guarantee of provenance, quality, and ethical practice."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-editorial text-center">
          <motion.div {...fadeIn}>
            <p className="text-caption text-accent mb-4">Our Promise</p>
            <h1 className="font-serif text-display-sm mb-6">
              Authenticity & Craft
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every piece bearing the AMARISÉ name is a covenant between maker and owner —
              a promise of provenance, quality, and intention that endures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-luxury-sm border-t border-border">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: "Guaranteed Authenticity",
                text: "Every AMARISÉ product ships with a certificate of authenticity. Our proprietary verification system ensures traceability from atelier to doorstep.",
              },
              {
                icon: Fingerprint,
                title: "Artisan Provenance",
                text: "We document the journey of each piece — from the origin of raw materials to the hands of the artisan who completed it. This is not mass production; this is intention made tangible.",
              },
              {
                icon: Award,
                title: "Material Integrity",
                text: "We source exclusively from certified suppliers. Our silks, leathers, precious metals, and botanical ingredients are verified for origin, purity, and ethical procurement.",
              },
              {
                icon: PackageCheck,
                title: "Quality Assurance",
                text: "Each product undergoes multi-stage quality inspection before leaving our atelier. We accept nothing less than the standard we would choose for ourselves.",
              },
              {
                icon: Globe,
                title: "Ethical Practice",
                text: "Our supply chain adheres to internationally recognised labour standards. We audit our workshops and partner ateliers annually to ensure fair wages and safe conditions.",
              },
              {
                icon: Leaf,
                title: "Sustainability Commitment",
                text: "Where possible, we use responsibly sourced, biodegradable, or recyclable materials. Our packaging is FSC-certified and designed for reuse.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="space-y-4"
              >
                <item.icon className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Philosophy */}
      <section className="section-luxury-sm bg-muted/30">
        <div className="container-editorial max-w-3xl">
          <motion.div {...fadeIn} className="space-y-8">
            <h2 className="font-serif text-2xl md:text-3xl text-center">
              Our Craft Philosophy
            </h2>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                At AMARISÉ, craftsmanship is not a marketing claim — it is the organising
                principle of everything we create. We believe that the value of an object
                lies not only in its aesthetic, but in the care, knowledge, and intention
                embedded in its making.
              </p>
              <p>
                We work with independent artisans and family-owned ateliers across
                Europe, Japan, and India. These partnerships, many spanning over a decade,
                are built on mutual respect and a shared commitment to excellence. We do
                not seek the cheapest production; we seek the most thoughtful.
              </p>
              <p>
                Every material is chosen for its provenance and performance. Our Italian
                silks come from heritage mills in Como. Our leathers are tanned using
                traditional vegetable methods in Tuscany. Our precious metals are refined
                in Milan. Our ceramics are thrown by hand in Porto and Mashiko. Each
                choice reflects our belief that luxury must be earned through substance,
                not merely declared through price.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section-luxury-sm border-t border-border">
        <div className="container-editorial max-w-3xl">
          <motion.div {...fadeIn} className="space-y-6">
            <h2 className="font-serif text-2xl text-center mb-8">
              Disclaimer
            </h2>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Natural Variations:</strong>{" "}
                Due to the handcrafted nature of our products, slight variations in
                colour, texture, grain, and finish are inherent and expected. These
                variations are not defects — they are evidence of the human hand and
                natural materials, and they make each piece unique.
              </p>
              <p>
                <strong className="text-foreground">Colour Accuracy:</strong>{" "}
                Product images are reproduced as faithfully as possible. However,
                colours may appear differently depending on your screen settings,
                lighting conditions, and device calibration. We recommend viewing our
                products in person where possible.
              </p>
              <p>
                <strong className="text-foreground">Material Sourcing:</strong>{" "}
                We make every effort to source materials as described. In rare cases,
                supply constraints may require the substitution of equivalent-quality
                materials. Any such changes will be communicated to the customer before
                fulfilment.
              </p>
              <p>
                <strong className="text-foreground">Care Responsibility:</strong>{" "}
                Product longevity depends on proper care. AMARISÉ provides detailed
                care instructions with every purchase. Damage resulting from failure
                to follow care guidelines is not covered under our return or warranty
                policies.
              </p>
              <p>
                <strong className="text-foreground">Limited Editions:</strong>{" "}
                Limited edition quantities stated are worldwide production limits.
                Once sold out, these pieces will not be reissued. Numbered editions
                include a certificate stating the edition number and total production
                run.
              </p>
              <p>
                <strong className="text-foreground">Pricing:</strong>{" "}
                All prices are listed in Euros (EUR) unless otherwise indicated. Prices
                in other currencies are approximate and subject to exchange rate
                fluctuations at the time of purchase. Import duties and local taxes may
                apply depending on your country of delivery.
              </p>
            </div>

            <div className="pt-8 border-t border-border mt-8">
              <p className="text-xs text-muted-foreground/60 text-center">
                Amarisé Maison Avenue is a product of Baalvion Industries Private Limited.
                <br />
                This document was last updated on February 2026.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
