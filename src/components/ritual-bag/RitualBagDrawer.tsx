import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useRitualBag } from "./RitualBagContext";

export const RitualBagDrawer = () => {
  const { items, isOpen, closeBag, removeItem, updateQuantity, totalItems, totalPrice } = useRitualBag();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-foreground/20 backdrop-blur-sm"
            onClick={closeBag}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-background shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/30">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="font-serif text-xl">Your Ritual</h2>
                  {totalItems > 0 && (
                    <span className="text-sm text-muted-foreground">({totalItems})</span>
                  )}
                </div>
                <button
                  onClick={closeBag}
                  className="p-2 hover:opacity-70 transition-opacity"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                    <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="font-serif text-xl mb-2">Your ritual awaits</p>
                    <p className="text-sm text-muted-foreground">
                      Add meaningful pieces to begin your journey
                    </p>
                  </div>
                ) : (
                  <div className="px-6 py-4 space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 py-4 border-b border-border/20 last:border-0"
                      >
                        <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-base truncate">{item.name}</h3>
                          {item.variant && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>
                          )}
                          <p className="text-sm mt-1">€{item.price}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center border border-border/50 hover:border-foreground transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center border border-border/50 hover:border-foreground transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-6 py-5 border-t border-border/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption">Subtotal</span>
                    <span className="font-serif text-lg">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Shipping and taxes calculated at checkout
                  </p>
                  <button className="w-full btn-luxury-primary">
                    Proceed to Checkout
                  </button>
                  <button 
                    onClick={closeBag}
                    className="w-full btn-luxury-ghost text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
