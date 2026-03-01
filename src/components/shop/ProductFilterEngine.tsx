import { useState, useMemo, useCallback } from "react";
import { CatalogProduct } from "@/types/catalog";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type SortOption = "newest" | "price-high" | "price-low" | "featured" | "scarcity";

interface Filters {
  availability: "all" | "in-stock" | "low-stock" | "sold-out";
  condition: "all" | "new" | "limited" | "archive";
  featured: boolean;
  priceRange: [number, number];
}

const defaultFilters: Filters = {
  availability: "all",
  condition: "all",
  featured: false,
  priceRange: [0, 50000],
};

interface ProductFilterEngineProps {
  products: CatalogProduct[];
  children: (filteredProducts: CatalogProduct[], sortOption: SortOption) => React.ReactNode;
}

export function ProductFilterEngine({ products, children }: ProductFilterEngineProps) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const sortLabels: Record<SortOption, string> = {
    newest: "Newest",
    "price-high": "Price: High → Low",
    "price-low": "Price: Low → High",
    featured: "Featured",
    scarcity: "Scarcity",
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Availability
    if (filters.availability === "in-stock") result = result.filter((p) => p.inStock && p.inventory >= 10);
    else if (filters.availability === "low-stock") result = result.filter((p) => p.inStock && p.inventory > 0 && p.inventory < 10);
    else if (filters.availability === "sold-out") result = result.filter((p) => !p.inStock || p.inventory === 0);

    // Condition
    if (filters.condition === "new") result = result.filter((p) => !p.isLimitedEdition);
    else if (filters.condition === "limited") result = result.filter((p) => p.isLimitedEdition || p.luxuryTags.includes("limited"));
    else if (filters.condition === "archive") result = result.filter((p) => p.pillarSlug === "editions");

    // Featured
    if (filters.featured) result = result.filter((p) => p.isFeatured);

    // Price
    result = result.filter((p) => {
      const price = p.price.EUR || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Sort
    switch (sort) {
      case "newest": result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case "price-high": result.sort((a, b) => (b.price.EUR || 0) - (a.price.EUR || 0)); break;
      case "price-low": result.sort((a, b) => (a.price.EUR || 0) - (b.price.EUR || 0)); break;
      case "featured": result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break;
      case "scarcity": result.sort((a, b) => a.inventory - b.inventory); break;
    }

    return result;
  }, [products, filters, sort]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.availability !== "all") count++;
    if (filters.condition !== "all") count++;
    if (filters.featured) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) count++;
    return count;
  }, [filters]);

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase border border-border hover:border-foreground transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center text-[10px] bg-foreground text-background">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button onClick={resetFilters} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline">
              Clear all
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden sm:block">{filtered.length} pieces</span>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity"
            >
              {sortLabels[sort]}
              <ChevronDown className={`w-3 h-3 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-2 bg-background border border-border shadow-lg z-30 min-w-[180px]"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSort(opt); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs tracking-wider transition-colors ${
                        sort === opt ? "bg-foreground text-background" : "hover:bg-muted"
                      }`}
                    >
                      {sortLabels[opt]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border border-border bg-muted/20">
              {/* Availability */}
              <div>
                <p className="text-caption mb-3">Availability</p>
                <div className="space-y-2">
                  {(["all", "in-stock", "low-stock", "sold-out"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilters({ ...filters, availability: opt })}
                      className={`block text-xs transition-colors ${filters.availability === opt ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {opt === "all" ? "All" : opt === "in-stock" ? "In Stock" : opt === "low-stock" ? "Low Stock" : "Sold Out"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <p className="text-caption mb-3">Condition</p>
                <div className="space-y-2">
                  {(["all", "new", "limited", "archive"] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFilters({ ...filters, condition: opt })}
                      className={`block text-xs transition-colors ${filters.condition === opt ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {opt === "all" ? "All" : opt === "new" ? "New" : opt === "limited" ? "Limited Edition" : "Archive"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured */}
              <div>
                <p className="text-caption mb-3">Selection</p>
                <button
                  onClick={() => setFilters({ ...filters, featured: !filters.featured })}
                  className={`flex items-center gap-2 text-xs transition-colors ${filters.featured ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <div className={`w-4 h-4 border transition-colors ${filters.featured ? "bg-foreground border-foreground" : "border-border"}`} />
                  Featured Only
                </button>
              </div>

              {/* Price Range */}
              <div>
                <p className="text-caption mb-3">Price Range</p>
                <div className="space-y-2">
                  {[
                    { label: "All Prices", range: [0, 50000] as [number, number] },
                    { label: "Under €500", range: [0, 500] as [number, number] },
                    { label: "€500 – €1,500", range: [500, 1500] as [number, number] },
                    { label: "€1,500 – €5,000", range: [1500, 5000] as [number, number] },
                    { label: "Over €5,000", range: [5000, 50000] as [number, number] },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setFilters({ ...filters, priceRange: opt.range })}
                      className={`block text-xs transition-colors ${
                        filters.priceRange[0] === opt.range[0] && filters.priceRange[1] === opt.range[1]
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {children(filtered, sort)}
    </div>
  );
}
