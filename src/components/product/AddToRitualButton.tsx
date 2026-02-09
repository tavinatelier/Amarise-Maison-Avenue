import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useRitualBag } from "../ritual-bag/RitualBagContext";

interface AddToRitualButtonProps {
  productId: string;
  productName: string;
  price: string;
  image: string;
  variant?: string;
}

export const AddToRitualButton = ({ 
  productId,
  productName, 
  price, 
  image,
  variant 
}: AddToRitualButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addItem } = useRitualBag();

  // Parse price string to number (remove € and convert)
  const priceNumber = parseFloat(price.replace(/[€$,]/g, ''));

  const handleAddToRitual = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      addItem({
        id: productId,
        name: productName,
        price: priceNumber,
        image,
        variant,
      });
      setIsAdded(true);
      setIsAnimating(false);
      toast.success(`${productName} added to your ritual`, {
        description: "Continue exploring or view your ritual bag.",
        duration: 3000,
      });
    }, 400);

    // Reset after a delay
    setTimeout(() => {
      setIsAdded(false);
    }, 2500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <span className="font-serif text-2xl">{price}</span>
        <span className="text-sm text-muted-foreground">Free shipping on orders over €100</span>
      </div>

      <motion.button
        onClick={handleAddToRitual}
        disabled={isAnimating}
        className={`w-full py-4 px-8 text-sm tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-2 ${
          isAdded
            ? "bg-accent text-accent-foreground"
            : "bg-foreground text-background hover:opacity-90"
        }`}
        whileTap={{ scale: 0.98 }}
      >
        {isAnimating ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, ease: "linear", repeat: Infinity }}
            className="w-5 h-5 border-2 border-background border-t-transparent rounded-full"
          />
        ) : isAdded ? (
          <>
            <Check className="w-4 h-4" />
            Added to Ritual
          </>
        ) : (
          "Add to Ritual"
        )}
      </motion.button>

      <p className="text-center text-xs text-muted-foreground">
        Complimentary gift wrapping available
      </p>
    </div>
  );
};
