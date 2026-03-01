import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCurrency, CURRENCIES, SupportedCurrency } from "@/hooks/useCurrency";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity"
      >
        {currency}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute right-0 top-full mt-2 bg-background border border-border shadow-lg z-50 min-w-[160px]"
          >
            {(Object.keys(CURRENCIES) as SupportedCurrency[]).map((code) => (
              <button
                key={code}
                onClick={() => { setCurrency(code); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-xs tracking-wider transition-colors ${
                  currency === code ? "bg-foreground text-background" : "hover:bg-muted"
                }`}
              >
                {CURRENCIES[code].label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
