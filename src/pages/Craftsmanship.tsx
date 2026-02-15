import { Layout } from "@/components/layout/Layout";
import { SEOHead, FAQSchema } from "@/components/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const craftFAQ = [
  { question: "Where are AMARISÉ products made?", answer: "Our products are crafted across select ateliers in Italy, France, and India, each chosen for their heritage expertise in specific materials and techniques." },
  { question: "What materials does AMARISÉ use?", answer: "We source only the finest materials — Grade-6A Mulberry silk, vegetable-tanned Italian calfskin, ethically sourced precious metals, and rare botanicals for our beauty line." },
  { question: "Are AMARISÉ products handmade?", answer: "The majority of our pieces involve significant hand-finishing. Our atelier garments undergo 40–70 individual hand-finishing steps depending on the piece." },
  { question: "How does AMARISÉ ensure quality?", answer: "Every piece passes through a multi-stage quality inspection. Garments are examined at seam, finish, and final presentation stages. Jewelry undergoes GIA-standard grading." },
];

const pillars = [
  {
    title: "The Atelier",
    description: "Our garments are born in quiet ateliers where time is measured not in hours, but in stitches. Each piece undergoes between 40 and 70 hand-finishing steps — from the initial pattern cut on tissue paper to the final pressing.",
    detail: "We work with heritage looms in Como for our silks, century-old tanneries in Tuscany for our leathers, and master tailors who have perfected their craft across generations.",
  },
  {
    title: "The Beauty Laboratoire",
    description: "Our formulations begin with rare botanicals sourced from ethical cultivators across five continents. Each ingredient is selected not merely for efficacy, but for the sensorial experience it creates.",
    detail: "Every texture, every scent, every moment of application is choreographed to transform routine into ritual.",
  },
  {
    title: "The Maison Workshop",
    description: "Our objects are conceived to outlast trends. Working with ceramicists, glassblowers, and metalworkers who maintain centuries-old techniques, we create pieces that become more beautiful with age.",
    detail: "Each object carries the subtle imperfections of the human hand — proof that it was touched, shaped, and finished by an artisan, not a machine.",
  },
];

export default function Craftsmanship() {
  return (
    <Layout>
      <SEOHead
        title="Craftsmanship"
        description="Discover the artisanal heritage behind every AMARISÉ creation. From hand-finished garments to rare botanical formulations."
      />
      <FAQSchema questions={craftFAQ} />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-editorial text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-caption mb-4">
            The Making
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            Craftsmanship
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Behind every AMARISÉ creation lies a dedication to the art of making — where patience is a material and intention is a technique.
          </motion.p>
        </div>
      </section>

      {pillars.map((pillar, i) => (
        <section key={i} className={`section-luxury-sm ${i % 2 === 1 ? "bg-muted/30" : ""}`}>
          <div className="container-editorial max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-6">{pillar.title}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">{pillar.description}</p>
              <p className="text-muted-foreground leading-relaxed">{pillar.detail}</p>
            </motion.div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="section-luxury-sm border-t border-border">
        <div className="container-editorial max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">Questions About Our Craft</h2>
          <div className="space-y-6">
            {craftFAQ.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-b border-border pb-6"
              >
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-luxury-sm bg-foreground text-primary-foreground">
        <div className="container-editorial text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">Explore the Collection</h2>
          <p className="text-primary-foreground/60 mb-8">Discover pieces crafted with the care described above.</p>
          <Link to="/shop/women" className="inline-block px-8 py-3 border border-primary-foreground/30 text-sm tracking-widest uppercase hover:bg-primary-foreground/10 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}
