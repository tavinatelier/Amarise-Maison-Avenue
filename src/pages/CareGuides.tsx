import { Layout } from "@/components/layout/Layout";
import { SEOHead, FAQSchema } from "@/components/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const careCategories = [
  {
    title: "Silk & Delicate Fabrics",
    icon: "🧵",
    instructions: [
      "Professional dry clean only — avoid home washing",
      "Store on padded hangers in breathable garment bags",
      "Avoid direct sunlight to prevent colour fading",
      "Steam gently on reverse side to remove creases",
      "Blot spills immediately — never rub silk",
    ],
    products: "Dresses, Blouses, Eveningwear, Scarves",
  },
  {
    title: "Leather & Exotic Skins",
    icon: "👜",
    instructions: [
      "Condition with specialist leather balm quarterly",
      "Store stuffed with acid-free tissue in dust bags",
      "Avoid prolonged exposure to rain and moisture",
      "Keep away from heat sources and direct sunlight",
      "Allow to air dry naturally if damp — never use a hairdryer",
    ],
    products: "Bags, Belts, Small Leather Goods, Boots",
  },
  {
    title: "Cashmere & Fine Knitwear",
    icon: "🧶",
    instructions: [
      "Hand wash in cool water with pH-neutral detergent",
      "Lay flat to dry on a clean towel — never hang",
      "Use a cashmere comb to gently remove pilling",
      "Fold and store with cedar or lavender sachets",
      "Allow 24 hours between wears to let fibres recover",
    ],
    products: "Sweaters, Cardigans, Throws, Scarves",
  },
  {
    title: "Fine Jewelry & Precious Metals",
    icon: "💎",
    instructions: [
      "Remove before swimming, bathing, or exercising",
      "Clean with a soft, lint-free cloth after each wear",
      "Store pieces individually in soft pouches to prevent scratching",
      "Schedule professional cleaning annually",
      "Keep away from perfume, hairspray, and cosmetics",
    ],
    products: "Necklaces, Rings, Earrings, Bracelets",
  },
  {
    title: "Footwear",
    icon: "👞",
    instructions: [
      "Use shoe trees immediately after wearing",
      "Allow 24 hours between wears for leather to breathe",
      "Apply protective spray before first outdoor wear",
      "Store in individual dust bags, upright, at room temperature",
      "Resole when tread shows significant wear — do not wait",
    ],
    products: "Heels, Boots, Sneakers, Flats, Formal Shoes",
  },
  {
    title: "Ceramics & Home Objects",
    icon: "🏺",
    instructions: [
      "Hand wash only — never place in a dishwasher",
      "Use soft cloths to avoid scratching glazed surfaces",
      "Handle with dry hands to prevent slip damage",
      "Display away from shelf edges and high-traffic areas",
      "Dust regularly with a soft, dry microfibre cloth",
    ],
    products: "Vases, Tableware, Candle Vessels, Decorative Objects",
  },
];

const careFAQ = [
  { question: "Can I return a damaged item for repair?", answer: "Yes. AMARISÉ offers a lifetime craftsmanship warranty. Contact our concierge team to arrange assessment and repair." },
  { question: "Do you offer re-dyeing or restoration services?", answer: "For select leather and fabric pieces, we offer professional restoration through our partner ateliers. Please contact customer care for eligibility." },
  { question: "How should I store items long-term?", answer: "All AMARISÉ products ship with storage accessories — dust bags, tissue, and boxes. Use these for long-term storage in a cool, dry, dark environment." },
];

export default function CareGuides() {
  return (
    <Layout>
      <SEOHead
        title="Care Guides"
        description="Expert care instructions for your AMARISÉ pieces. Learn how to maintain the beauty and longevity of luxury silk, leather, cashmere, jewelry, and home objects."
      />
      <FAQSchema questions={careFAQ} />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-editorial text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-caption mb-4">
            Product Care
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl mb-6"
          >
            Care Guides
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Every AMARISÉ piece is designed to endure. Proper care ensures your investment grows more beautiful with time.
          </motion.p>
        </div>
      </section>

      <section className="section-luxury-sm">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {careCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border p-8"
              >
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h2 className="font-serif text-xl mb-2">{cat.title}</h2>
                <p className="text-xs text-muted-foreground mb-4">Applicable to: {cat.products}</p>
                <ul className="space-y-2">
                  {cat.instructions.map((inst, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">·</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-luxury-sm border-t border-border">
        <div className="container-editorial max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {careFAQ.map((faq, i) => (
              <div key={i} className="border-b border-border pb-6">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-luxury-sm bg-muted/30">
        <div className="container-editorial text-center">
          <h2 className="font-serif text-xl mb-4">Need Assistance?</h2>
          <p className="text-muted-foreground mb-6">Our concierge team is available for personalized care advice.</p>
          <Link to="/contact" className="btn-luxury-outline">Contact Concierge</Link>
        </div>
      </section>
    </Layout>
  );
}
