/**
 * REFUND POLICY PAGE
 * Public legal page for refund and returns policy
 */

import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

export default function RefundPolicy() {
  return (
    <Layout>
      <SEOHead
        title="Refund Policy | AMARISÉ"
        description="Learn about AMARISÉ return and refund policies for all purchases."
      />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-light tracking-wide mb-8">Refund Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: January 2024</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed">
              At AMARISÉ, we want you to be completely satisfied with your purchase. If for any reason 
              you are not happy with your order, we offer a straightforward return and refund process.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Return Window</h2>
            <p className="text-muted-foreground leading-relaxed">
              You have <strong>14 days</strong> from the date of delivery to return items for a full refund. 
              Items must be unworn, unwashed, and in their original packaging with all tags attached.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Non-Returnable Items</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The following items cannot be returned for hygiene and safety reasons:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Beauty products that have been opened or used</li>
              <li>Lip products (including Veil Lip Ritual)</li>
              <li>Skincare products with broken seals</li>
              <li>Personalized or customized items</li>
              <li>Items marked as final sale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">How to Return</h2>
            <ol className="list-decimal list-inside text-muted-foreground space-y-3">
              <li>Contact our customer service team at returns@amarise.com</li>
              <li>You will receive a prepaid return label within 24 hours</li>
              <li>Pack items securely in their original packaging</li>
              <li>Attach the return label and drop off at any DHL location</li>
              <li>Once received and inspected, your refund will be processed</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Refund Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Refunds are processed within <strong>5-7 business days</strong> of receiving your return. 
              The refund will be credited to your original payment method. Please note that your bank 
              may take additional time to reflect the credit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Exchanges</h2>
            <p className="text-muted-foreground leading-relaxed">
              We currently do not offer direct exchanges. If you need a different size or color, please 
              return your original item for a refund and place a new order.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Damaged or Defective Items</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you receive a damaged or defective item, please contact us immediately at 
              support@amarise.com with photos of the damage. We will arrange a replacement or full 
              refund at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Return Shipping Costs</h2>
            <p className="text-muted-foreground leading-relaxed">
              For EU customers, return shipping is free. We provide prepaid return labels for all 
              eligible returns. For orders outside the EU, return shipping costs are the responsibility 
              of the customer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Questions?</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about our refund policy, please contact our customer care team 
              at support@amarise.com. We're here to help.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
