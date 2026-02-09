import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import accountData from "@/data/mock/account.json";

export default function AccountSaved() {
  const { savedItems } = accountData;
  const { toast } = useToast();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleRemove = (itemId: string) => {
    toast({
      title: "Item removed",
      description: "This item has been removed from your saved items.",
    });
  };

  const handleAddToBag = (item: typeof savedItems[0]) => {
    toast({
      title: "Added to bag",
      description: `${item.title} has been added to your ritual bag.`,
    });
  };

  return (
    <AccountLayout 
      title="Saved Items" 
      subtitle="Items you've saved for later"
    >
      {savedItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No saved items</h3>
          <p className="text-muted-foreground mb-6">
            Save items you love to revisit them later.
          </p>
          <Link 
            to="/discover"
            className="inline-block px-6 py-3 bg-foreground text-background text-sm tracking-wide hover:bg-foreground/90 transition-colors"
          >
            Discover AMARISÉ
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {savedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-6 p-4 border border-border/50 group"
            >
              <div className="w-32 h-40 bg-secondary/50 overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="font-medium text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.variant}</p>
                  <p className="text-lg mt-2">{formatCurrency(item.price)}</p>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToBag(item)}
                    className="gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Bag
                  </Button>
                  
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
