import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Package, Truck, RefreshCw, Globe, Clock, Shield } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
};

const shippingRates = [
  {
    country: "United States",
    standard: { time: "5-7 business days", price: "Complimentary over $250" },
    express: { time: "2-3 business days", price: "$25" },
    overnight: { time: "Next business day", price: "$45" }
  },
  {
    country: "United Kingdom",
    standard: { time: "4-6 business days", price: "Complimentary over £200" },
    express: { time: "2-3 business days", price: "£20" },
    overnight: { time: "Next business day", price: "£35" }
  },
  {
    country: "Canada",
    standard: { time: "5-8 business days", price: "Complimentary over $300 CAD" },
    express: { time: "3-4 business days", price: "$30 CAD" },
    overnight: null
  },
  {
    country: "India",
    standard: { time: "5-7 business days", price: "Complimentary over ₹15,000" },
    express: { time: "2-3 business days", price: "₹500" },
    overnight: null
  }
];

const returnFaqs = [
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of delivery for items in their original, unworn condition with all tags attached. Beauty products must be unopened and sealed. Custom or personalized items cannot be returned."
  },
  {
    question: "How do I initiate a return?",
    answer: "Log into your account and navigate to Order History. Select the item you wish to return and follow the prompts to generate a prepaid return label. You can also contact our concierge team for assistance."
  },
  {
    question: "When will I receive my refund?",
    answer: "Once we receive and inspect your return, refunds are processed within 5-7 business days. The refund will be credited to your original payment method. Please allow an additional 3-5 business days for the funds to appear in your account."
  },
  {
    question: "Can I exchange an item?",
    answer: "Yes, exchanges are available for different sizes or colors of the same item, subject to availability. Contact our concierge team to arrange an exchange."
  },
  {
    question: "Are international returns accepted?",
    answer: "Yes, we accept international returns. Please note that return shipping costs for international orders are the responsibility of the customer unless the item was damaged or incorrect."
  },
  {
    question: "What items are final sale?",
    answer: "Swimwear, intimate apparel, pierced jewelry, personalized items, and products marked 'Final Sale' cannot be returned or exchanged."
  }
];

export default function ShippingReturns() {
  return (
    <Layout>
      <SEOHead
        title="Shipping & Returns | AMARISÉ"
        description="Learn about AMARISÉ shipping options, delivery times, and our hassle-free return policy. Complimentary shipping on qualifying orders."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-editorial text-center">
          <motion.p
            {...fadeInUp}
            className="text-caption text-muted-foreground mb-6"
          >
            DELIVERY & CARE
          </motion.p>
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight"
          >
            Shipping & Returns
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Luxury delivered with care. Complimentary shipping on qualifying orders, 
            with easy returns for your peace of mind.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y border-border">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Package, label: "Signature Packaging" },
              { icon: Truck, label: "Tracked Delivery" },
              { icon: RefreshCw, label: "30-Day Returns" },
              { icon: Shield, label: "Secure Checkout" }
            ].map((feature) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <feature.icon className="w-6 h-6 mb-3 text-muted-foreground" />
                <span className="text-sm">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="py-20">
        <div className="container-editorial">
          <Tabs defaultValue="shipping" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-12">
              <TabsTrigger value="shipping" className="text-sm tracking-wide">SHIPPING</TabsTrigger>
              <TabsTrigger value="returns" className="text-sm tracking-wide">RETURNS</TabsTrigger>
            </TabsList>

            <TabsContent value="shipping" className="space-y-16">
              {/* Shipping Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <h2 className="font-serif text-2xl">Worldwide Delivery</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      We deliver to over 50 countries worldwide. Each order is carefully packaged 
                      in our signature gift box, ensuring your pieces arrive in perfect condition.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <h2 className="font-serif text-2xl">Processing Time</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Orders are processed within 1-2 business days. During peak seasons 
                      or for personalized items, processing may take 3-5 additional days.
                    </p>
                  </div>
                </div>

                {/* Shipping Rates Table */}
                <div>
                  <h3 className="font-serif text-xl mb-6">Shipping Rates by Region</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 pr-6 text-caption text-muted-foreground font-normal">DESTINATION</th>
                          <th className="text-left py-4 px-6 text-caption text-muted-foreground font-normal">STANDARD</th>
                          <th className="text-left py-4 px-6 text-caption text-muted-foreground font-normal">EXPRESS</th>
                          <th className="text-left py-4 pl-6 text-caption text-muted-foreground font-normal">OVERNIGHT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippingRates.map((rate) => (
                          <tr key={rate.country} className="border-b border-border/50">
                            <td className="py-4 pr-6 font-medium">{rate.country}</td>
                            <td className="py-4 px-6">
                              <p className="text-sm">{rate.standard.time}</p>
                              <p className="text-xs text-muted-foreground">{rate.standard.price}</p>
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-sm">{rate.express.time}</p>
                              <p className="text-xs text-muted-foreground">{rate.express.price}</p>
                            </td>
                            <td className="py-4 pl-6">
                              {rate.overnight ? (
                                <>
                                  <p className="text-sm">{rate.overnight.time}</p>
                                  <p className="text-xs text-muted-foreground">{rate.overnight.price}</p>
                                </>
                              ) : (
                                <p className="text-xs text-muted-foreground">Not available</p>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="returns" className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Return Policy Overview */}
                <div className="bg-muted/30 p-8 md:p-12 mb-12">
                  <h2 className="font-serif text-2xl mb-4">Our Return Promise</h2>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    We want you to love your AMARISÉ pieces. If for any reason you're not 
                    completely satisfied, we offer complimentary returns within 30 days of 
                    delivery. Items must be unworn, unwashed, and in their original packaging 
                    with all tags attached.
                  </p>
                </div>

                {/* Return Process */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {[
                    { step: "01", title: "Initiate Return", description: "Log in to your account and select the item(s) you wish to return from your order history." },
                    { step: "02", title: "Ship It Back", description: "Print the prepaid return label and drop off your package at any authorized carrier location." },
                    { step: "03", title: "Receive Refund", description: "Once inspected, your refund will be processed within 5-7 business days to your original payment method." }
                  ].map((item) => (
                    <div key={item.step} className="text-center md:text-left">
                      <span className="text-3xl font-serif text-muted-foreground/40">{item.step}</span>
                      <h3 className="font-serif text-lg mt-2 mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>

                {/* FAQs */}
                <div>
                  <h3 className="font-serif text-xl mb-6">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {returnFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container-editorial text-center">
          <h3 className="font-serif text-2xl mb-4">Need Assistance?</h3>
          <p className="text-muted-foreground mb-6">
            Our concierge team is available to help with shipping inquiries or return requests.
          </p>
          <a 
            href="/contact" 
            className="text-sm tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            CONTACT US
          </a>
        </div>
      </section>
    </Layout>
  );
}
