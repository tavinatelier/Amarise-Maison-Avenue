import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Shirt, Info, ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import accountData from "@/data/mock/account.json";

export default function AccountWardrobe() {
  const { wardrobe } = accountData;
  const [filter, setFilter] = useState<string>("all");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const categories = ["all", "atelier", "beauty", "lifestyle"];
  
  const filteredWardrobe = filter === "all" 
    ? wardrobe 
    : wardrobe.filter(item => item.category === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <AccountLayout 
      title="Your Wardrobe" 
      subtitle="Every AMARISÉ piece you own, with care guides and styling suggestions"
    >
      {/* Filter */}
      <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border/50">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 text-sm transition-colors capitalize",
                filter === cat 
                  ? "bg-foreground text-background" 
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredWardrobe.length === 0 ? (
        <div className="text-center py-16">
          <Shirt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No pieces yet</h3>
          <p className="text-muted-foreground mb-6">
            Your AMARISÉ collection will grow here.
          </p>
          <Link 
            to="/discover"
            className="inline-block px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
          >
            Discover AMARISÉ
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWardrobe.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-border/50 overflow-hidden"
            >
              <div className="flex gap-4 p-4">
                <div className="w-24 h-32 bg-secondary/50 overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="text-xs tracking-widest text-muted-foreground uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-medium mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.variant}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Purchased {formatDate(item.purchaseDate)}
                  </p>
                </div>
              </div>

              {/* Expandable Care Section */}
              <button
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-secondary/30 hover:bg-secondary/50 transition-colors text-sm"
              >
                <span className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Care instructions
                </span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  expandedItem === item.id && "rotate-180"
                )} />
              </button>
              
              {expandedItem === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-4 py-4 bg-secondary/20 text-sm text-muted-foreground"
                >
                  {item.careInstructions}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Wardrobe Summary */}
      <div className="mt-12 p-8 bg-secondary/20">
        <h3 className="text-lg font-medium mb-4">Your Collection</h3>
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-light">{wardrobe.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Total pieces</p>
          </div>
          <div>
            <p className="text-3xl font-light">
              {wardrobe.filter(w => w.category === "atelier").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Atelier</p>
          </div>
          <div>
            <p className="text-3xl font-light">
              {wardrobe.filter(w => w.category === "beauty").length || wardrobe.filter(w => w.category === "lifestyle").length}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Beauty & Lifestyle</p>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
