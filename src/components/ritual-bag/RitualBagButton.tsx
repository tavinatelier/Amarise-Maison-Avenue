import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRitualBag } from "./RitualBagContext";

export const RitualBagButton = () => {
  const { openBag, totalItems } = useRitualBag();

  return (
    <button
      onClick={openBag}
      className="relative p-2 hover:opacity-70 transition-opacity"
      aria-label="Open ritual bag"
    >
      <ShoppingBag className="w-5 h-5" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full"
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
