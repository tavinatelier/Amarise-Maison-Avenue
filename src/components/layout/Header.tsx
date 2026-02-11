import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { RitualBagButton } from "../ritual-bag/RitualBagButton";
import { pillars } from "@/data/catalog-hierarchy";
import { Pillar, PillarSlug } from "@/types/catalog";

const utilityLinks = [
  { name: "Journal", path: "/journal" },
  { name: "About", path: "/about-amarise" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<PillarSlug | null>(null);
  const [expandedMobilePillar, setExpandedMobilePillar] = useState<PillarSlug | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
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
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link
              to="/"
              className="font-serif text-xl md:text-2xl tracking-widest hover:opacity-70 transition-opacity duration-300"
            >
              AMARISÉ
            </Link>

            {/* Desktop Navigation — 7 Pillars */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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

              {/* Divider */}
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
            <div className="flex items-center gap-4">
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

        {/* Desktop Dropdown */}
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
                <div className="flex gap-16">
                  {/* Pillar info */}
                  <div className="w-48 shrink-0">
                    <p className="text-caption mb-2">{activePillar.name}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activePillar.description}
                    </p>
                    <Link
                      to={`/shop/${activePillar.slug}`}
                      className="inline-block mt-4 text-xs tracking-widest uppercase text-foreground hover:opacity-70 transition-opacity"
                    >
                      View All →
                    </Link>
                  </div>

                  {/* Families grid */}
                  <div className="flex-1 grid grid-cols-3 gap-x-12 gap-y-3">
                    {activePillar.families.map((family) => (
                      <Link
                        key={family.slug}
                        to={`/shop/${activePillar.slug}/${family.slug}`}
                        className="group flex items-baseline justify-between py-1.5 text-sm text-foreground/80 hover:text-foreground transition-colors"
                      >
                        <span>{family.name}</span>
                        <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                          {family.productCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

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
                <Link
                  to="/"
                  className="font-serif text-xl tracking-widest"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AMARISÉ
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:opacity-70 transition-opacity"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 py-8 space-y-1">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      className="w-full flex items-center justify-between py-3 font-serif text-2xl hover:opacity-70 transition-opacity"
                      onClick={() =>
                        setExpandedMobilePillar(
                          expandedMobilePillar === pillar.slug ? null : pillar.slug
                        )
                      }
                    >
                      <span>{pillar.name}</span>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          expandedMobilePillar === pillar.slug ? "rotate-90" : ""
                        }`}
                      />
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
                            <Link
                              to={`/shop/${pillar.slug}`}
                              className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              View All {pillar.name}
                            </Link>
                            {pillar.families.map((family) => (
                              <Link
                                key={family.slug}
                                to={`/shop/${pillar.slug}/${family.slug}`}
                                className="block text-sm text-foreground/70 hover:text-foreground transition-colors py-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
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
                    <Link
                      key={link.path}
                      to={link.path}
                      className="block py-2 font-serif text-xl text-foreground/60 hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
