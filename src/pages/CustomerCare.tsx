import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Package, 
  CreditCard, 
  Truck, 
  RefreshCw, 
  User, 
  Gift, 
  Sparkles,
  MessageCircle,
  Mail,
  Phone 
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
};

const categories = [
  {
    icon: Package,
    title: "Orders",
    description: "Track, modify, or inquire about your orders",
    link: "/account/orders"
  },
  {
    icon: Truck,
    title: "Shipping",
    description: "Delivery options and international shipping",
    link: "/shipping-returns"
  },
  {
    icon: RefreshCw,
    title: "Returns",
    description: "Return policy and exchange process",
    link: "/shipping-returns"
  },
  {
    icon: CreditCard,
    title: "Payment",
    description: "Payment methods and billing questions",
    link: "#payment"
  },
  {
    icon: User,
    title: "Account",
    description: "Manage your profile and preferences",
    link: "/account"
  },
  {
    icon: Gift,
    title: "Gifting",
    description: "Gift services and special packaging",
    link: "#gifting"
  }
];

const faqs = {
  orders: [
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking link. You can also track your order by logging into your account and visiting Order History. Tracking updates typically appear within 24-48 hours of shipment."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. After this window, orders enter processing and cannot be changed. Please contact our concierge team immediately if you need to make changes."
    },
    {
      question: "What if my order arrives damaged?",
      answer: "We take great care in packaging your items. If your order arrives damaged, please contact us within 48 hours with photos of the damage. We'll arrange a replacement or full refund at no additional cost."
    }
  ],
  payment: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Klarna for interest-free installments. For select regions, we also accept local payment methods."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely. All transactions are encrypted using SSL technology, and we never store your complete card details. We're PCI DSS compliant, ensuring the highest standards of payment security."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we partner with Klarna to offer interest-free installments on orders over $100. At checkout, select Klarna to split your payment into 4 equal installments with no additional fees."
    }
  ],
  gifting: [
    {
      question: "Do you offer gift wrapping?",
      answer: "Every AMARISÉ order arrives in our signature packaging, suitable for gifting. For an elevated experience, select our Premium Gift Box option at checkout, which includes hand-tied ribbon and a personalized note card."
    },
    {
      question: "Can I send an order directly to the recipient?",
      answer: "Yes, simply enter the recipient's address at checkout. You can include a gift message, and the packing slip will not display pricing information."
    },
    {
      question: "Do you offer gift cards?",
      answer: "Digital and physical gift cards are available in denominations from $50 to $1000. Digital cards are delivered instantly via email, while physical cards arrive in our signature packaging."
    }
  ],
  products: [
    {
      question: "How should I care for my AMARISÉ pieces?",
      answer: "Each product includes specific care instructions on the label. Generally, we recommend dry cleaning for tailored pieces, hand washing for delicate items in cool water, and storing pieces in the provided dust bags away from direct sunlight."
    },
    {
      question: "Are your products sustainably made?",
      answer: "Sustainability is central to our philosophy. We use responsibly sourced materials, work with certified ethical manufacturers, and offset 100% of shipping emissions. Learn more on our Sustainability page."
    },
    {
      question: "How do I know if an item will fit?",
      answer: "Consult our detailed Size Guide for measurements across all categories. Each product page also includes fit notes and model measurements. For personalized guidance, contact our styling team."
    }
  ]
};

export default function CustomerCare() {
  return (
    <Layout>
      <SEOHead
        title="Customer Care | AMARISÉ"
        description="Get help with orders, shipping, returns, and more. Our dedicated team is here to assist you with any questions about your AMARISÉ experience."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-editorial text-center">
          <motion.p
            {...fadeInUp}
            className="text-caption text-muted-foreground mb-6"
          >
            WE'RE HERE TO HELP
          </motion.p>
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-3xl mx-auto leading-tight"
          >
            Customer Care
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Your satisfaction is our priority. Find answers to common questions 
            or reach out to our dedicated concierge team.
          </motion.p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-y border-border">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link 
                  to={category.link}
                  className="flex flex-col items-center text-center p-4 group hover:bg-muted/50 transition-colors rounded"
                >
                  <category.icon className="w-6 h-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <h3 className="font-medium text-sm mb-1">{category.title}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl">Frequently Asked Questions</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Orders & Payment */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-muted-foreground" />
                  Orders
                </h3>
                <Accordion type="single" collapsible>
                  {faqs.orders.map((faq, index) => (
                    <AccordionItem key={index} value={`orders-${index}`}>
                      <AccordionTrigger className="text-left text-sm hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div id="payment">
                <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  Payment
                </h3>
                <Accordion type="single" collapsible>
                  {faqs.payment.map((faq, index) => (
                    <AccordionItem key={index} value={`payment-${index}`}>
                      <AccordionTrigger className="text-left text-sm hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Gifting & Products */}
            <div className="space-y-8">
              <div id="gifting">
                <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-muted-foreground" />
                  Gifting
                </h3>
                <Accordion type="single" collapsible>
                  {faqs.gifting.map((faq, index) => (
                    <AccordionItem key={index} value={`gifting-${index}`}>
                      <AccordionTrigger className="text-left text-sm hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div>
                <h3 className="font-serif text-xl mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-muted-foreground" />
                  Products & Care
                </h3>
                <Accordion type="single" collapsible>
                  {faqs.products.map((faq, index) => (
                    <AccordionItem key={index} value={`products-${index}`}>
                      <AccordionTrigger className="text-left text-sm hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground">
              Our concierge team is available to assist you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mon–Sat, 9am–9pm EST
              </p>
              <button className="text-sm tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors">
                START CHAT
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Response within 24 hours
              </p>
              <a 
                href="mailto:care@amarise.com" 
                className="text-sm tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                SEND EMAIL
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <Phone className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mon–Fri, 9am–6pm EST
              </p>
              <a 
                href="tel:+18005550123" 
                className="text-sm tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                +1 800 555 0123
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 border-t border-border">
        <div className="container-editorial">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <Link to="/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
              Size Guide
            </Link>
            <Link to="/shipping-returns" className="text-muted-foreground hover:text-foreground transition-colors">
              Shipping & Returns
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
