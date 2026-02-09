/**
 * COOKIE POLICY PAGE
 * Public legal page for cookie usage policy
 */

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function CookiePolicy() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  const handleSavePreferences = () => {
    toast.success("Cookie preferences saved");
  };

  return (
    <Layout>
      <SEOHead
        title="Cookie Policy | AMARISÉ"
        description="Learn how AMARISÉ uses cookies and manage your cookie preferences."
      />
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-light tracking-wide mb-8">Cookie Policy</h1>
        <p className="text-muted-foreground mb-12">Last updated: January 2024</p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-4">What Are Cookies?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files that are stored on your device when you visit a website. 
              They help us provide you with a better experience by remembering your preferences and 
              understanding how you use our site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Types of Cookies We Use</h2>
            
            <div className="space-y-6 mt-6">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Necessary Cookies</CardTitle>
                      <CardDescription>Required for the website to function</CardDescription>
                    </div>
                    <Switch checked={preferences.necessary} disabled />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    These cookies are essential for you to browse the website and use its features, 
                    such as accessing secure areas and your shopping cart.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Functional Cookies</CardTitle>
                      <CardDescription>Remember your preferences</CardDescription>
                    </div>
                    <Switch 
                      checked={preferences.functional}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, functional: checked })}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    These cookies allow us to remember choices you make (such as your language or 
                    region) and provide enhanced, more personal features.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Analytics Cookies</CardTitle>
                      <CardDescription>Help us improve our website</CardDescription>
                    </div>
                    <Switch 
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, analytics: checked })}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    These cookies collect information about how you use our website, such as which 
                    pages you visit and any errors you experience. This helps us improve our site.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Marketing Cookies</CardTitle>
                      <CardDescription>Used for targeted advertising</CardDescription>
                    </div>
                    <Switch 
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    These cookies are used to deliver advertisements more relevant to you and your 
                    interests. They are also used to limit the number of times you see an ad.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button onClick={handleSavePreferences} className="mt-6">
              Save Preferences
            </Button>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can control and delete cookies through your browser settings. Please note that 
              removing or blocking certain cookies may impact your experience on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Third-Party Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use services from third parties that may set cookies on your device. These include 
              payment processors, analytics providers, and social media platforms. These third parties 
              have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time. Any changes will be posted on this 
              page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about our use of cookies, please contact us at privacy@amarise.com.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
