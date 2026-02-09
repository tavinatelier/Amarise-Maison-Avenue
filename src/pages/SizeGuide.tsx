import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ruler, Info } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
};

const womensSizes = {
  clothing: [
    { size: "XS", us: "0-2", uk: "4-6", eu: "32-34", bust: "76-81", waist: "61-66", hip: "84-89" },
    { size: "S", us: "4-6", uk: "8-10", eu: "36-38", bust: "84-89", waist: "69-74", hip: "91-97" },
    { size: "M", us: "8-10", uk: "12-14", eu: "40-42", bust: "91-97", waist: "76-81", hip: "99-104" },
    { size: "L", us: "12-14", uk: "16-18", eu: "44-46", bust: "99-107", waist: "84-91", hip: "107-114" },
    { size: "XL", us: "16-18", uk: "20-22", eu: "48-50", bust: "109-119", waist: "94-104", hip: "117-124" }
  ],
  shoes: [
    { eu: "35", us: "5", uk: "2", cm: "22.5" },
    { eu: "36", us: "6", uk: "3", cm: "23" },
    { eu: "37", us: "6.5", uk: "4", cm: "23.5" },
    { eu: "38", us: "7.5", uk: "5", cm: "24.5" },
    { eu: "39", us: "8.5", uk: "6", cm: "25" },
    { eu: "40", us: "9", uk: "6.5", cm: "25.5" },
    { eu: "41", us: "10", uk: "7.5", cm: "26" },
    { eu: "42", us: "11", uk: "8", cm: "27" }
  ]
};

const measurementGuide = [
  {
    name: "Bust",
    description: "Measure around the fullest part of your bust, keeping the tape parallel to the floor."
  },
  {
    name: "Waist",
    description: "Measure around your natural waistline, which is the narrowest part of your torso."
  },
  {
    name: "Hip",
    description: "Measure around the fullest part of your hips, approximately 20cm below your waist."
  },
  {
    name: "Inseam",
    description: "Measure from the crotch seam to the bottom of the leg along the inner seam."
  }
];

export default function SizeGuide() {
  return (
    <Layout>
      <SEOHead
        title="Size Guide | AMARISÉ"
        description="Find your perfect fit with our comprehensive size guide. Detailed measurements for clothing and footwear across international sizing standards."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-editorial text-center">
          <motion.p
            {...fadeInUp}
            className="text-caption text-muted-foreground mb-6"
          >
            FIND YOUR FIT
          </motion.p>
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-3xl mx-auto leading-tight"
          >
            Size Guide
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Our pieces are designed with an elegant, tailored silhouette. 
            Use this guide to find your perfect size.
          </motion.p>
        </div>
      </section>

      {/* Measurement Tips */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container-editorial">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-serif text-xl">How to Measure</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {measurementGuide.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Size Tables */}
      <section className="py-20">
        <div className="container-editorial">
          <Tabs defaultValue="clothing" className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 mb-12">
              <TabsTrigger value="clothing" className="text-sm tracking-wide">CLOTHING</TabsTrigger>
              <TabsTrigger value="shoes" className="text-sm tracking-wide">FOOTWEAR</TabsTrigger>
              <TabsTrigger value="accessories" className="text-sm tracking-wide">ACCESSORIES</TabsTrigger>
            </TabsList>

            <TabsContent value="clothing">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif text-xl mb-6">Women's Clothing</h3>
                
                <div className="overflow-x-auto mb-8">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 pr-4 text-caption text-muted-foreground font-normal">SIZE</th>
                        <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">US</th>
                        <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">UK</th>
                        <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">EU</th>
                        <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">BUST (CM)</th>
                        <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">WAIST (CM)</th>
                        <th className="text-left py-4 pl-4 text-caption text-muted-foreground font-normal">HIP (CM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {womensSizes.clothing.map((row) => (
                        <tr key={row.size} className="border-b border-border/50">
                          <td className="py-4 pr-4 font-medium">{row.size}</td>
                          <td className="py-4 px-4 text-muted-foreground">{row.us}</td>
                          <td className="py-4 px-4 text-muted-foreground">{row.uk}</td>
                          <td className="py-4 px-4 text-muted-foreground">{row.eu}</td>
                          <td className="py-4 px-4 text-muted-foreground">{row.bust}</td>
                          <td className="py-4 px-4 text-muted-foreground">{row.waist}</td>
                          <td className="py-4 pl-4 text-muted-foreground">{row.hip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded">
                  <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    AMARISÉ garments are designed with a relaxed, elegant fit. If you prefer a more fitted silhouette, 
                    we recommend sizing down. For structured pieces like blazers, your usual size should provide the perfect drape.
                  </p>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="shoes">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif text-xl mb-6">Women's Footwear</h3>
                
                <div className="overflow-x-auto mb-8">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 pr-4 text-caption text-muted-foreground font-normal">EU</th>
                        <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">US</th>
                        <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">UK</th>
                        <th className="text-left py-4 pl-4 text-caption text-muted-foreground font-normal">FOOT LENGTH (CM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {womensSizes.shoes.map((row) => (
                        <tr key={row.eu} className="border-b border-border/50">
                          <td className="py-4 pr-4 font-medium">{row.eu}</td>
                          <td className="py-4 px-4 text-muted-foreground">{row.us}</td>
                          <td className="py-4 px-4 text-muted-foreground">{row.uk}</td>
                          <td className="py-4 pl-4 text-muted-foreground">{row.cm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded">
                  <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Our footwear runs true to Italian sizing. If you are between sizes, we recommend sizing up. 
                    For heeled styles, you may prefer your usual size for a secure fit.
                  </p>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="accessories">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                {/* Rings */}
                <div>
                  <h3 className="font-serif text-xl mb-6">Ring Sizes</h3>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 pr-4 text-caption text-muted-foreground font-normal">US</th>
                          <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">UK</th>
                          <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">EU</th>
                          <th className="text-left py-4 pl-4 text-caption text-muted-foreground font-normal">DIAMETER (MM)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { us: "5", uk: "J", eu: "49", mm: "15.7" },
                          { us: "6", uk: "L", eu: "52", mm: "16.5" },
                          { us: "7", uk: "N", eu: "54", mm: "17.3" },
                          { us: "8", uk: "P", eu: "57", mm: "18.1" },
                          { us: "9", uk: "R", eu: "59", mm: "19.0" }
                        ].map((row) => (
                          <tr key={row.us} className="border-b border-border/50">
                            <td className="py-4 pr-4 font-medium">{row.us}</td>
                            <td className="py-4 px-4 text-muted-foreground">{row.uk}</td>
                            <td className="py-4 px-4 text-muted-foreground">{row.eu}</td>
                            <td className="py-4 pl-4 text-muted-foreground">{row.mm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Belts */}
                <div>
                  <h3 className="font-serif text-xl mb-6">Belt Sizes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[400px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 pr-4 text-caption text-muted-foreground font-normal">SIZE</th>
                          <th className="text-left py-4 px-4 text-caption text-muted-foreground font-normal">WAIST (CM)</th>
                          <th className="text-left py-4 pl-4 text-caption text-muted-foreground font-normal">BELT LENGTH (CM)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { size: "S", waist: "70-75", length: "85" },
                          { size: "M", waist: "76-81", length: "90" },
                          { size: "L", waist: "82-87", length: "95" },
                          { size: "XL", waist: "88-93", length: "100" }
                        ].map((row) => (
                          <tr key={row.size} className="border-b border-border/50">
                            <td className="py-4 pr-4 font-medium">{row.size}</td>
                            <td className="py-4 px-4 text-muted-foreground">{row.waist}</td>
                            <td className="py-4 pl-4 text-muted-foreground">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Personal Styling CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container-editorial text-center">
          <h3 className="font-serif text-2xl mb-4">Still Unsure?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our personal stylists are available to provide fit guidance and recommendations 
            tailored to your preferences.
          </p>
          <a 
            href="/contact" 
            className="text-sm tracking-widest underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            SPEAK TO A STYLIST
          </a>
        </div>
      </section>
    </Layout>
  );
}
