import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo";
import { motion } from "framer-motion";

const pressFeatures = [
  { publication: "Vogue", title: "AMARISÉ: The New Language of Luxury", date: "January 2025", excerpt: "A new maison that speaks in whispers rather than shouts, AMARISÉ is redefining what it means to be a luxury house in the modern era." },
  { publication: "Harper's Bazaar", title: "The Ritual Economy", date: "February 2025", excerpt: "How AMARISÉ is turning the act of self-care into a philosophy of intentional living." },
  { publication: "Financial Times — How to Spend It", title: "Craftsmanship Without Compromise", date: "March 2025", excerpt: "Inside the ateliers where AMARISÉ's most coveted pieces come to life." },
  { publication: "Wallpaper*", title: "Objects of Desire", date: "December 2024", excerpt: "The Maison collection from AMARISÉ elevates everyday objects into art." },
  { publication: "The Business of Fashion", title: "Quiet Luxury's Next Chapter", date: "November 2024", excerpt: "Why AMARISÉ's restrained approach to branding is resonating with a new generation of luxury consumers." },
  { publication: "Elle Décor", title: "Living with Intention", date: "October 2024", excerpt: "AMARISÉ's home collection brings atelier-level craftsmanship to the domestic sphere." },
];

const pressInquiry = {
  email: "press@amarise.com",
  note: "For press inquiries, sample requests, and editorial features, please contact our communications team.",
};

export default function Press() {
  return (
    <Layout>
      <SEOHead
        title="Press"
        description="AMARISÉ in the press. Read features, interviews, and editorial coverage from the world's leading publications."
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-editorial text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-caption mb-4">
            The Maison
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            Press
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Selected coverage and features from international publications.
          </motion.p>
        </div>
      </section>

      <section className="section-luxury-sm">
        <div className="container-editorial max-w-3xl">
          {pressFeatures.map((feature, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-b border-border py-10 first:pt-0"
            >
              <p className="text-caption text-accent mb-2">{feature.publication}</p>
              <h2 className="font-serif text-2xl md:text-3xl mb-3">{feature.title}</h2>
              <p className="text-sm text-muted-foreground mb-2">{feature.date}</p>
              <p className="text-muted-foreground leading-relaxed">{feature.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section-luxury-sm border-t border-border">
        <div className="container-editorial max-w-xl text-center">
          <h2 className="font-serif text-2xl mb-4">Press Inquiries</h2>
          <p className="text-muted-foreground mb-4">{pressInquiry.note}</p>
          <a href={`mailto:${pressInquiry.email}`} className="text-sm tracking-widest uppercase hover:opacity-70 transition-opacity">
            {pressInquiry.email}
          </a>
        </div>
      </section>
    </Layout>
  );
}
