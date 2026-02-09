/**
 * EMAIL PREFERENCES PAGE
 * Public page for managing newsletter subscriptions and notification settings
 * Mock UI - no backend connection
 */

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Mail, Bell, Tag, Newspaper, Gift, Check } from "lucide-react";

interface PreferenceCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  enabled: boolean;
}

export default function EmailPreferences() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [preferences, setPreferences] = useState<PreferenceCategory[]>([
    {
      id: "newsletter",
      icon: Newspaper,
      title: "Newsletter",
      description: "Monthly editorial content, brand stories, and curated inspiration.",
      enabled: true,
    },
    {
      id: "new_arrivals",
      icon: Tag,
      title: "New Arrivals",
      description: "Be the first to know about new product launches and collections.",
      enabled: true,
    },
    {
      id: "promotions",
      icon: Gift,
      title: "Exclusive Offers",
      description: "Special promotions, private sales, and member-only discounts.",
      enabled: false,
    },
    {
      id: "order_updates",
      icon: Bell,
      title: "Order Updates",
      description: "Shipping notifications, delivery updates, and order confirmations.",
      enabled: true,
    },
  ]);

  const handleVerifyEmail = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsVerified(true);
    setIsLoading(false);
    toast.success("Email verified. You can now manage your preferences.");
  };

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Your preferences have been saved.");
  };

  const handleUnsubscribeAll = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPreferences((prev) => prev.map((pref) => ({ ...pref, enabled: false })));
    setIsLoading(false);
    toast.success("You have been unsubscribed from all marketing emails.");
  };

  return (
    <Layout>
      <SEOHead
        title="Email Preferences | AMARISÉ"
        description="Manage your email subscriptions and notification preferences for AMARISÉ."
      />
      <div className="max-w-2xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
            <Mail className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-light tracking-wide mb-4">
            Email Preferences
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            Choose which communications you'd like to receive from AMARISÉ. 
            You can update your preferences at any time.
          </p>
        </div>

        {!isVerified ? (
          <div className="bg-secondary/30 border border-border rounded-lg p-8">
            <h2 className="text-lg font-medium mb-4">Verify Your Email</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Enter your email address to access and manage your subscription preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleVerifyEmail}
                disabled={isLoading}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Verified Email Display */}
            <div className="flex items-center gap-3 p-4 bg-secondary/30 border border-border rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Managing preferences for</p>
                <p className="text-muted-foreground">{email}</p>
              </div>
            </div>

            {/* Preference Categories */}
            <div className="space-y-1">
              {preferences.map((pref, index) => (
                <div key={pref.id}>
                  <div className="flex items-start justify-between py-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-secondary rounded-full flex-shrink-0 mt-0.5">
                        <pref.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <Label htmlFor={pref.id} className="text-base font-medium cursor-pointer">
                          {pref.title}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                          {pref.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id={pref.id}
                      checked={pref.enabled}
                      onCheckedChange={() => togglePreference(pref.id)}
                    />
                  </div>
                  {index < preferences.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="bg-foreground text-background hover:bg-foreground/90 flex-1"
              >
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
              <Button
                onClick={handleUnsubscribeAll}
                disabled={isLoading}
                variant="outline"
                className="flex-1"
              >
                Unsubscribe from All
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-center pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Note: Transactional emails about your orders cannot be disabled. 
                For questions about our data practices, see our{" "}
                <a href="/privacy" className="underline hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
