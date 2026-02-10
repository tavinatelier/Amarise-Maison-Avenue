/**
 * PRIVACY POLICY PAGE
 * Public legal page for privacy policy
 */

import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <SEOHead
        title="Privacy Policy | AMARISÉ"
        description="Learn how AMARISÉ collects, uses, and protects your personal information."
      />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-light tracking-wide mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: January 2024</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              AMARISÉ ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you visit our 
              website and make purchases from our store.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your questions and requests</li>
              <li>Improve our products and services</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">4. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal information. We may share your information with trusted 
              third-party service providers who assist us in operating our website, processing payments, 
              and delivering your orders. These providers are contractually obligated to protect your 
              information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">5. Your Rights (GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are located in the European Economic Area, you have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">6. California Privacy Rights (CCPA)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Right to know what personal information is collected, used, shared, or sold</li>
              <li>Right to delete personal information held by businesses</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to non-discrimination for exercising your CCPA rights</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              AMARISÉ does not sell personal information. To exercise your rights, please contact us
              at privacy@amarise.com or submit a request through our{" "}
              <a href="/data-request" className="text-foreground underline">Data Request Form</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">7. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              We operate in India, the United States, the United Kingdom, and Canada. Your personal
              information may be transferred to and processed in countries other than your own.
              We ensure appropriate safeguards are in place, including Standard Contractual Clauses
              and compliance with applicable data protection frameworks.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes 
              outlined in this policy, unless a longer retention period is required by law. Order 
              information is retained for 7 years for tax and legal compliance purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">9. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. All 
              payment transactions are encrypted using SSL technology.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or wish to exercise your data rights, 
              please contact our Data Protection Officer at privacy@amarise.com or submit a request 
              through our <a href="/data-request" className="text-foreground underline">Data Request Form</a>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
