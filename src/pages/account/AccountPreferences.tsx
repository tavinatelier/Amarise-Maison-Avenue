import { useState } from "react";
import { motion } from "framer-motion";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Settings, Bell, Globe, Palette, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import accountData from "@/data/mock/account.json";

export default function AccountPreferences() {
  const { preferences, user } = accountData;
  const { toast } = useToast();
  
  const [emailNotifications, setEmailNotifications] = useState(preferences.communicationPreferences.email);
  const [smsNotifications, setSmsNotifications] = useState(preferences.communicationPreferences.sms);
  const [postNotifications, setPostNotifications] = useState(preferences.communicationPreferences.post);
  const [currency, setCurrency] = useState(user.preferredCurrency);
  const [language, setLanguage] = useState(user.preferredLanguage);

  const handleSave = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <AccountLayout 
      title="Preferences" 
      subtitle="Customize your AMARISÉ experience"
    >
      <div className="space-y-12">
        {/* Communication Preferences */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Communication</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/20">
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">
                  New arrivals, private previews, and order updates
                </p>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/20">
              <div>
                <p className="font-medium">SMS</p>
                <p className="text-sm text-muted-foreground">
                  Shipping updates and time-sensitive notifications
                </p>
              </div>
              <Switch 
                checked={smsNotifications} 
                onCheckedChange={setSmsNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/20">
              <div>
                <p className="font-medium">Post</p>
                <p className="text-sm text-muted-foreground">
                  Printed lookbooks and exclusive invitations
                </p>
              </div>
              <Switch 
                checked={postNotifications} 
                onCheckedChange={setPostNotifications}
              />
            </div>
          </div>
        </section>

        {/* Regional Preferences */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Regional</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-3 bg-secondary/30 border border-border/50 focus:outline-none focus:ring-1 focus:ring-foreground"
              >
                <option value="EUR">Euro (€)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="CAD">Canadian Dollar (C$)</option>
                <option value="AUD">Australian Dollar (A$)</option>
                <option value="INR">Indian Rupee (₹)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                Prices will be displayed in your selected currency
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 bg-secondary/30 border border-border/50 focus:outline-none focus:ring-1 focus:ring-foreground"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </section>

        {/* Style Preferences */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Style Profile</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Sizes</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/20">
                  <p className="text-sm text-muted-foreground">Atelier</p>
                  <p className="font-medium">{preferences.sizes.atelier}</p>
                </div>
                <div className="p-4 bg-secondary/20">
                  <p className="text-sm text-muted-foreground">Shoes</p>
                  <p className="font-medium">{preferences.sizes.shoes}</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">Favorite Colors</label>
              <div className="flex flex-wrap gap-2">
                {preferences.favoriteColors.map((color) => (
                  <span 
                    key={color}
                    className="px-3 py-1.5 bg-secondary/30 text-sm capitalize"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">Fragrance Notes</label>
              <div className="flex flex-wrap gap-2">
                {preferences.fragranceNotes.map((note) => (
                  <span 
                    key={note}
                    className="px-3 py-1.5 bg-secondary/30 text-sm capitalize"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3">Skincare Concerns</label>
              <div className="flex flex-wrap gap-2">
                {preferences.skinConcerns.map((concern) => (
                  <span 
                    key={concern}
                    className="px-3 py-1.5 bg-secondary/30 text-sm capitalize"
                  >
                    {concern}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </AccountLayout>
  );
}
