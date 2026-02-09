/**
 * TERMS OF SERVICE PAGE
 * Public legal page for terms and conditions
 */

import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

export default function TermsOfService() {
  return (
    <Layout>
      <SEOHead
        title="Terms of Service | AMARISÉ"
        description="Read the terms and conditions governing your use of AMARISÉ products and services."
      />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-light tracking-wide mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: January 2024</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the AMARISÉ website and purchasing our products, you agree to be 
              bound by these Terms of Service. If you do not agree to these terms, please do not use 
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">2. Products and Orders</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All products are subject to availability. We reserve the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Limit quantities available for purchase</li>
              <li>Refuse or cancel orders at our discretion</li>
              <li>Modify or discontinue products without notice</li>
              <li>Correct pricing errors</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">3. Pricing and Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices are displayed in Euros (EUR) and include applicable VAT for EU customers. 
              Prices are subject to change without notice. Payment must be received in full before 
              orders are processed. We accept major credit cards and other payment methods as displayed 
              at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">4. Shipping and Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              We ship to selected countries within the European Union. Delivery times are estimates 
              and not guaranteed. Risk of loss passes to you upon delivery. For international orders, 
              you are responsible for any customs duties or import taxes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">5. Returns and Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Please refer to our <a href="/refund-policy" className="text-foreground underline">Refund Policy</a> for 
              detailed information about returns and refunds. In general, unworn and unused items may 
              be returned within 14 days of delivery for a full refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website, including text, images, logos, and designs, is the property 
              of AMARISÉ and is protected by copyright and trademark laws. You may not reproduce, 
              distribute, or use any content without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, AMARISÉ shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of our products or 
              services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service are governed by the laws of France. Any disputes shall be resolved 
              in the courts of Paris, France.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">9. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at legal@amarise.com.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
