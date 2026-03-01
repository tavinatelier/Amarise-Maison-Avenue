import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { sampleProducts } from "@/data/catalog-hierarchy";
import { useCurrency } from "@/hooks/useCurrency";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = ["Silk Dress", "Cashmere", "Tote Bag", "Heels", "Jewelry", "Candle"];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  const recentSearches = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("ama-recent-searches") || "[]") as string[];
    } catch { return []; }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return sampleProducts
      .filter((p) => !p.isDraft && (p.title.toLowerCase().includes(q) || p.familySlug.includes(q) || p.pillarSlug.includes(q)))
      .slice(0, 8);
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>();
    results.forEach((p) => {
      const key = p.pillarSlug;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    });
    return map;
  }, [results]);

  const handleSearch = () => {
    if (query.trim().length < 2) return;
    const stored = recentSearches.filter((s) => s !== query.trim());
    stored.unshift(query.trim());
    localStorage.setItem("ama-recent-searches", JSON.stringify(stored.slice(0, 5)));
  };

  const handleSelect = () => {
    handleSearch();
    setQuery("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] bg-background/98 backdrop-blur-sm overflow-y-auto"
        >
          <div className="container-editorial max-w-3xl py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-serif text-xl tracking-widest">AMARISÉ</span>
              <button onClick={onClose} className="p-2 hover:opacity-70 transition-opacity" aria-label="Close search">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Input */}
            <div className="relative mb-8">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the Maison…"
                className="w-full pl-8 pr-4 py-4 bg-transparent border-b border-border text-xl font-serif focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Results */}
            {query.length >= 2 && results.length > 0 && (
              <div className="space-y-8">
                {Array.from(grouped.entries()).map(([pillar, items]) => (
                  <div key={pillar}>
                    <p className="text-caption mb-4">{pillar}</p>
                    <div className="space-y-3">
                      {items.map((p) => (
                        <Link
                          key={p.id}
                          to={`/shop/${p.pillarSlug}/${p.familySlug}/${p.slug}`}
                          onClick={handleSelect}
                          className="flex items-center gap-4 py-2 group hover:bg-muted/30 -mx-3 px-3 transition-colors"
                        >
                          <div className="w-14 h-14 bg-muted shrink-0 overflow-hidden">
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate group-hover:opacity-70 transition-opacity">{p.title}</p>
                            <p className="text-xs text-muted-foreground">{p.familySlug.replace(/-/g, " ")}</p>
                          </div>
                          <p className="text-sm shrink-0">{formatPrice(p.price.EUR)}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Zero results */}
            {query.length >= 2 && results.length === 0 && (
              <div className="text-center py-16">
                <p className="font-serif text-xl text-muted-foreground mb-2">No results found</p>
                <p className="text-sm text-muted-foreground">Try a different search or browse our collections</p>
              </div>
            )}

            {/* Empty state: popular + recent */}
            {query.length < 2 && (
              <div className="space-y-10">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <p className="text-caption">Recent</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-4 py-2 text-sm border border-border hover:border-foreground transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <p className="text-caption">Popular</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-4 py-2 text-sm border border-border hover:border-foreground transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
