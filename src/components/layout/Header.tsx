import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Search, User } from "lucide-react";
import { RitualBagButton } from "../ritual-bag/RitualBagButton";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { SearchOverlay } from "./SearchOverlay";
import { pillars, sampleProducts, getProductBySlug } from "@/data/catalog-hierarchy";
import { Pillar, PillarSlug } from "@/types/catalog";

const utilityLinks = [
  { name: "Journal", path: "/journal" },
  { name: "About", path: "/about-amarise" },
];

// Featured collections per pillar (mock)
const pillarFeatured: Partial<Record<PillarSlug, { title: string; image: string; link: string }>> = {
  women: { title: "Spring 2025 Edit", image: "/placeholder.svg", link: "/shop/women" },
  men: { title: "Evening Essentials", image: "/placeholder.svg", link: "/shop/men" },
  accessories: { title: "The Icon Edit", image: "/placeholder.svg", link: "/shop/accessories" },
  jewelry: { title: "Fine Pieces", image: "/placeholder.svg", link: "/shop/jewelry" },
  maison: { title: "The Art of Home", image: "/placeholder.svg", link: "/shop/maison" },
};

export const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<PillarSlug | null>(null);
  const [expandedMobilePillar, setExpandedMobilePillar] = useState<PillarSlug | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setExpandedMobilePillar(null);
  }, [location.pathname]);

  const handleMouseEnter = (slug: PillarSlug) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(slug);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const activePillar = pillars.find((p) => p.slug === activeDropdown);
  const featured = activeDropdown ? pillarFeatured[activeDropdown] : null;

  // Featured product for mega nav — first featured in pillar
  const featuredProduct = useMemo(() => {
    if (!activeDropdown) return null;
    return sampleProducts.find((p) => p.pillarSlug === activeDropdown && p.isFeatured && !p.isDraft) || null;
  }, [activeDropdown]);

  // Recently viewed for mega nav
  const recentlyViewed = useMemo(() => {
    try {
      const slugs = JSON.parse(localStorage.getItem("ama-recently-viewed") || "[]") as string[];
      return slugs.slice(0, 3).map((s) => getProductBySlug(s)).filter(Boolean);
    } catch { return []; }
  }, [activeDropdown]);

  // Scroll states
  const isScrolled = scrollY > 50;
  const isCompact = scrollY > 200;

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-luxury"
            : "bg-transparent"
        }`}
      >
        <nav className="container-editorial">
          <div className={`flex items-center justify-between transition-all duration-500 ${isCompact ? "h-16" : "h-20 md:h-24"}`}>
            {/* Logo */}
            <Link
              to="/"
              className={`font-serif tracking-widest hover:opacity-70 transition-all duration-500 ${isCompact ? "text-lg md:text-xl" : "text-xl md:text-2xl"}`}
            >
              AMARISÉ
            </Link>

            {/* Desktop Navigation — 7 Pillars */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7">
              {pillars.map((pillar) => (
                <div
                  key={pillar.slug}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(pillar.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/shop/${pillar.slug}`}
                    className={`text-caption hover:opacity-100 transition-opacity duration-300 link-luxury ${
                      location.pathname.startsWith(`/shop/${pillar.slug}`)
                        ? "opacity-100"
                        : "opacity-70"
                    }`}
                  >
                    {pillar.name}
                  </Link>
                </div>
              ))}

              <span className="w-px h-4 bg-border" />

              {utilityLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-caption hover:opacity-100 transition-opacity duration-300 link-luxury ${
                    location.pathname === link.path ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              <CurrencySwitcher />
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 hover:opacity-70 transition-opacity"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="hidden md:block p-1.5 hover:opacity-70 transition-opacity" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
              <RitualBagButton />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:opacity-70 transition-opacity"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>

        {/* Desktop Mega Panel */}
        <AnimatePresence>
          {activeDropdown && activePillar && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-0 right-0 bg-background border-t border-border shadow-lg z-50"
              onMouseEnter={() => handleMouseEnter(activeDropdown)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="container-editorial py-8">
                <div className="grid grid-cols-4 gap-8">
                  {/* Column 1: Pillar info + categories */}
                  <div>
                    <p className="text-caption mb-4">{activePillar.name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {activePillar.description}
                    </p>
                    <Link
                      to={`/shop/${activePillar.slug}`}
                      className="inline-block text-xs tracking-widest uppercase text-foreground hover:opacity-70 transition-opacity"
                    >
                      View All →
                    </Link>
                  </div>

                  {/* Column 2: Families / subcategories */}
                  <div>
                    <p className="text-caption mb-4">Categories</p>
                    <div className="space-y-2">
                      {activePillar.families.slice(0, 9).map((family) => (
                        <Link
                          key={family.slug}
                          to={`/shop/${activePillar.slug}/${family.slug}`}
                          className="group flex items-baseline justify-between text-sm text-foreground/80 hover:text-foreground transition-colors"
                        >
                          <span>{family.name}</span>
                          <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            {family.productCount}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Featured collection */}
                  <div>
                    <p className="text-caption mb-4">Featured</p>
                    {featured ? (
                      <Link to={featured.link} className="group block">
                        <div className="aspect-[4/5] bg-muted overflow-hidden mb-3">
                          <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <p className="text-sm font-medium group-hover:opacity-70 transition-opacity">{featured.title}</p>
                      </Link>
                    ) : (
                      <div className="aspect-[4/5] bg-muted" />
                    )}
                  </div>

                  {/* Column 4: Featured product */}
                  <div>
                    <p className="text-caption mb-4">New In</p>
                    {featuredProduct ? (
                      <Link to={`/shop/${featuredProduct.pillarSlug}/${featuredProduct.familySlug}/${featuredProduct.slug}`} className="group block">
                        <div className="aspect-[4/5] bg-muted overflow-hidden mb-3">
                          <img src={featuredProduct.images[0]} alt={featuredProduct.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <p className="text-sm font-medium group-hover:opacity-70 transition-opacity">{featuredProduct.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">€{featuredProduct.price.EUR?.toLocaleString()}</p>
                      </Link>
                    ) : (
                      <div className="aspect-[4/5] bg-muted" />
                    )}
                  </div>
                </div>

                {/* Recently viewed bar */}
                {recentlyViewed.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-6">
                      <p className="text-[10px] tracking-widest uppercase text-muted-foreground shrink-0">Recently Viewed</p>
                      <div className="flex gap-4">
                        {recentlyViewed.map((p) => p && (
                          <Link key={p.id} to={`/shop/${p.pillarSlug}/${p.familySlug}/${p.slug}`} className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-muted overflow-hidden shrink-0">
                              <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xs group-hover:opacity-70 transition-opacity">{p.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background overflow-y-auto"
          >
            <div className="container-editorial min-h-full flex flex-col">
              <div className="flex items-center justify-between h-20">
                <Link to="/" className="font-serif text-xl tracking-widest" onClick={() => setIsMobileMenuOpen(false)}>
                  AMARISÉ
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:opacity-70 transition-opacity" aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile search */}
              <button
                onClick={() => { setIsMobileMenuOpen(false); setSearchOpen(true); }}
                className="flex items-center gap-3 py-4 border-b border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm">Search the Maison…</span>
              </button>

              <nav className="flex-1 py-6 space-y-1">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      className="w-full flex items-center justify-between py-3 font-serif text-2xl hover:opacity-70 transition-opacity"
                      onClick={() => setExpandedMobilePillar(expandedMobilePillar === pillar.slug ? null : pillar.slug)}
                    >
                      <span>{pillar.name}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${expandedMobilePillar === pillar.slug ? "rotate-90" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {expandedMobilePillar === pillar.slug && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-4 space-y-2">
                            <Link to={`/shop/${pillar.slug}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
                              View All {pillar.name}
                            </Link>
                            {pillar.families.map((family) => (
                              <Link key={family.slug} to={`/shop/${pillar.slug}/${family.slug}`} className="block text-sm text-foreground/70 hover:text-foreground transition-colors py-1" onClick={() => setIsMobileMenuOpen(false)}>
                                {family.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                <div className="pt-6 border-t border-border space-y-2">
                  {utilityLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="block py-2 font-serif text-xl text-foreground/60 hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                      {link.name}
                    </Link>
                  ))}
                  <Link to="/account" className="block py-2 font-serif text-xl text-foreground/60 hover:text-foreground transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                    Account
                  </Link>
                </div>
              </nav>

              {/* Mobile currency */}
              <div className="py-6 border-t border-border">
                <CurrencySwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
