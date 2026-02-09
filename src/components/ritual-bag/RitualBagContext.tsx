import { createContext, useContext, useState, ReactNode } from "react";

interface RitualItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface RitualBagContextType {
  items: RitualItem[];
  isOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addItem: (item: Omit<RitualItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBag: () => void;
  totalItems: number;
  totalPrice: number;
}

const RitualBagContext = createContext<RitualBagContextType | undefined>(undefined);

export const useRitualBag = () => {
  const context = useContext(RitualBagContext);
  if (!context) {
    throw new Error("useRitualBag must be used within RitualBagProvider");
  }
  return context;
};

export const RitualBagProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<RitualItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openBag = () => setIsOpen(true);
  const closeBag = () => setIsOpen(false);

  const addItem = (item: Omit<RitualItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.variant === item.variant);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.variant === item.variant
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    openBag();
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearBag = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <RitualBagContext.Provider
      value={{
        items,
        isOpen,
        openBag,
        closeBag,
        addItem,
        removeItem,
        updateQuantity,
        clearBag,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </RitualBagContext.Provider>
  );
};
