import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PrivateClientLayout } from "@/components/private-client/PrivateClientLayout";
import { Eye, Calendar, Shirt, Gift, MessageCircle, ChevronRight, Sparkles } from "lucide-react";
import privateClientData from "@/data/mock/private-client.json";

export default function PrivateClientDashboard() {
  const { privatePreview, concierge, wardrobeIntelligence, tiers } = privateClientData;
  const currentTier = tiers.gold;

  return (
    <PrivateClientLayout>
      <div className="space-y-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Private Previews", href: "/private-client/previews", icon: Eye, value: `${privatePreview.active.length} active` },
            { label: "Appointments", href: "/private-client/appointments", icon: Calendar, value: `${concierge.upcomingAppointments.length} upcoming` },
            { label: "Wardrobe", href: "/private-client/wardrobe", icon: Shirt, value: `${wardrobeIntelligence.totalPieces} pieces` },
            { label: "Concierge", href: "/private-client/concierge", icon: MessageCircle, value: "Contact" },
          ].map((item, index) => (
            <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Link to={item.href} className="block p-6 bg-background/5 hover:bg-background/10 transition-colors group">
                <item.icon className="h-5 w-5 text-background/60 mb-4" />
                <p className="text-sm text-background/60">{item.label}</p>
                <p className="text-lg text-background mt-1">{item.value}</p>
                <ChevronRight className="h-4 w-4 text-background/40 mt-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Active Preview */}
        {privatePreview.active[0] && (
          <section className="p-8 bg-gradient-to-r from-amber-900/20 to-amber-800/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span className="text-sm tracking-widest uppercase text-amber-400">Private Preview</span>
            </div>
            <h3 className="text-2xl font-serif text-background mb-2">{privatePreview.active[0].title}</h3>
            <p className="text-background/70 mb-6">{privatePreview.active[0].description}</p>
            <Link to="/private-client/previews" className="inline-block px-6 py-3 bg-background text-foreground text-sm tracking-wide hover:bg-background/90 transition-colors">
              View Preview
            </Link>
          </section>
        )}

        {/* Your Advisor */}
        <section>
          <h3 className="text-lg font-medium text-background mb-6">Your Personal Advisor</h3>
          <div className="flex items-center gap-6 p-6 bg-background/5">
            <div className="w-16 h-16 bg-background/10 rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-background/60" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-background">{concierge.assignedStylist.name}</p>
              <p className="text-sm text-background/60">{concierge.assignedStylist.title}</p>
              <p className="text-sm text-background/50 mt-1">{concierge.assignedStylist.email}</p>
            </div>
            <Link to="/private-client/concierge" className="px-4 py-2 border border-background/20 text-background text-sm hover:bg-background/10 transition-colors">
              Contact
            </Link>
          </div>
        </section>

        {/* Tier Benefits */}
        <section className="p-8 bg-background/5">
          <h3 className="text-lg font-medium text-background mb-2">{currentTier.name} Member Benefits</h3>
          <ul className="space-y-2 mt-4">
            {currentTier.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-background/70">
                <span className="h-1.5 w-1.5 bg-amber-400 rounded-full" />
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PrivateClientLayout>
  );
}
