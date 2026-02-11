import { Pillar, MicroCategory, CatalogProduct } from "@/types/catalog";

export const pillars: Pillar[] = [
  {
    slug: "women",
    name: "Women",
    description: "Refined elegance for the modern woman",
    families: [
      { slug: "dresses", name: "Dresses", pillarSlug: "women", description: "Evening and day dresses", productCount: 24, image: "/placeholder.svg" },
      { slug: "ready-to-wear", name: "Ready-to-Wear", pillarSlug: "women", description: "Everyday luxury", productCount: 32, image: "/placeholder.svg" },
      { slug: "outerwear-w", name: "Outerwear", pillarSlug: "women", description: "Coats and jackets", productCount: 18, image: "/placeholder.svg" },
      { slug: "knitwear-w", name: "Knitwear", pillarSlug: "women", description: "Cashmere and fine knits", productCount: 14, image: "/placeholder.svg" },
      { slug: "eveningwear", name: "Eveningwear", pillarSlug: "women", description: "Gala and black-tie", productCount: 12, image: "/placeholder.svg" },
      { slug: "tops-w", name: "Tops", pillarSlug: "women", description: "Blouses and shirts", productCount: 20, image: "/placeholder.svg" },
      { slug: "bottoms-w", name: "Bottoms", pillarSlug: "women", description: "Trousers and skirts", productCount: 16, image: "/placeholder.svg" },
      { slug: "tailoring-w", name: "Tailoring", pillarSlug: "women", description: "Bespoke suiting", productCount: 10, image: "/placeholder.svg" },
      { slug: "resortwear", name: "Resortwear", pillarSlug: "women", description: "Vacation and cruise", productCount: 15, image: "/placeholder.svg" },
    ],
  },
  {
    slug: "men",
    name: "Men",
    description: "Timeless menswear with modern restraint",
    families: [
      { slug: "jackets", name: "Jackets", pillarSlug: "men", description: "Structured and casual", productCount: 20, image: "/placeholder.svg" },
      { slug: "shirts", name: "Shirts", pillarSlug: "men", description: "Dress and casual shirts", productCount: 22, image: "/placeholder.svg" },
      { slug: "tailoring-m", name: "Tailoring", pillarSlug: "men", description: "Suits and formalwear", productCount: 14, image: "/placeholder.svg" },
      { slug: "knitwear-m", name: "Knitwear", pillarSlug: "men", description: "Sweaters and cardigans", productCount: 16, image: "/placeholder.svg" },
      { slug: "trousers", name: "Trousers", pillarSlug: "men", description: "Formal and casual", productCount: 18, image: "/placeholder.svg" },
      { slug: "casualwear", name: "Casualwear", pillarSlug: "men", description: "Relaxed luxury", productCount: 24, image: "/placeholder.svg" },
      { slug: "formalwear", name: "Formalwear", pillarSlug: "men", description: "Black-tie and evening", productCount: 10, image: "/placeholder.svg" },
      { slug: "outerwear-m", name: "Outerwear", pillarSlug: "men", description: "Coats and overcoats", productCount: 15, image: "/placeholder.svg" },
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "The finishing touch of distinction",
    families: [
      { slug: "bags", name: "Bags", pillarSlug: "accessories", description: "Handbags and totes", productCount: 28, image: "/placeholder.svg" },
      { slug: "small-leather-goods", name: "Small Leather Goods", pillarSlug: "accessories", description: "Wallets and cardholders", productCount: 20, image: "/placeholder.svg" },
      { slug: "belts", name: "Belts", pillarSlug: "accessories", description: "Leather and exotic", productCount: 12, image: "/placeholder.svg" },
      { slug: "sunglasses", name: "Sunglasses", pillarSlug: "accessories", description: "Eyewear collection", productCount: 16, image: "/placeholder.svg" },
      { slug: "scarves", name: "Scarves", pillarSlug: "accessories", description: "Silk and cashmere", productCount: 14, image: "/placeholder.svg" },
      { slug: "tech-accessories", name: "Tech Accessories", pillarSlug: "accessories", description: "Device cases and covers", productCount: 10, image: "/placeholder.svg" },
      { slug: "travel", name: "Travel", pillarSlug: "accessories", description: "Luggage and travel sets", productCount: 8, image: "/placeholder.svg" },
    ],
  },
  {
    slug: "footwear",
    name: "Footwear",
    description: "Crafted from sole to silhouette",
    families: [
      { slug: "heels", name: "Heels", pillarSlug: "footwear", description: "Pumps and stilettos", productCount: 18, image: "/placeholder.svg" },
      { slug: "flats", name: "Flats", pillarSlug: "footwear", description: "Ballet and loafers", productCount: 14, image: "/placeholder.svg" },
      { slug: "sneakers", name: "Sneakers", pillarSlug: "footwear", description: "Luxury athletic", productCount: 12, image: "/placeholder.svg" },
      { slug: "boots", name: "Boots", pillarSlug: "footwear", description: "Ankle and knee-high", productCount: 16, image: "/placeholder.svg" },
      { slug: "sandals", name: "Sandals", pillarSlug: "footwear", description: "Summer and evening", productCount: 10, image: "/placeholder.svg" },
      { slug: "formal-shoes", name: "Formal Shoes", pillarSlug: "footwear", description: "Oxford and derby", productCount: 14, image: "/placeholder.svg" },
    ],
  },
  {
    slug: "jewelry",
    name: "Jewelry",
    description: "Precious objects of personal meaning",
    families: [
      { slug: "necklaces", name: "Necklaces", pillarSlug: "jewelry", description: "Chains and pendants", productCount: 20, image: "/placeholder.svg" },
      { slug: "earrings", name: "Earrings", pillarSlug: "jewelry", description: "Studs and drops", productCount: 22, image: "/placeholder.svg" },
      { slug: "bracelets", name: "Bracelets", pillarSlug: "jewelry", description: "Bangles and cuffs", productCount: 16, image: "/placeholder.svg" },
      { slug: "rings", name: "Rings", pillarSlug: "jewelry", description: "Statement and everyday", productCount: 18, image: "/placeholder.svg" },
      { slug: "fine-jewelry", name: "Fine Jewelry", pillarSlug: "jewelry", description: "Precious stones and metals", productCount: 10, image: "/placeholder.svg" },
      { slug: "limited-pieces", name: "Limited Pieces", pillarSlug: "jewelry", description: "One-of-a-kind creations", productCount: 6, image: "/placeholder.svg" },
    ],
  },
  {
    slug: "maison",
    name: "Maison",
    description: "The art of living beautifully",
    families: [
      { slug: "home-decor", name: "Home Décor", pillarSlug: "maison", description: "Decorative objects", productCount: 18, image: "/placeholder.svg" },
      { slug: "fragrance", name: "Fragrance", pillarSlug: "maison", description: "Parfums and home scents", productCount: 14, image: "/placeholder.svg" },
      { slug: "tableware", name: "Tableware", pillarSlug: "maison", description: "Porcelain and crystal", productCount: 12, image: "/placeholder.svg" },
      { slug: "objects", name: "Objects", pillarSlug: "maison", description: "Curated objets d'art", productCount: 10, image: "/placeholder.svg" },
      { slug: "textiles", name: "Textiles", pillarSlug: "maison", description: "Throws and cushions", productCount: 14, image: "/placeholder.svg" },
      { slug: "lifestyle-maison", name: "Lifestyle", pillarSlug: "maison", description: "Everyday ritual objects", productCount: 16, image: "/placeholder.svg" },
    ],
  },
  {
    slug: "editions",
    name: "Editions",
    description: "Rare, seasonal, and collectible",
    families: [
      { slug: "limited-edition", name: "Limited Edition", pillarSlug: "editions", description: "Numbered and exclusive", productCount: 8, image: "/placeholder.svg" },
      { slug: "seasonal-drops", name: "Seasonal Drops", pillarSlug: "editions", description: "Seasonal capsules", productCount: 12, image: "/placeholder.svg" },
      { slug: "collaborations", name: "Collaborations", pillarSlug: "editions", description: "Artist and designer partnerships", productCount: 6, image: "/placeholder.svg" },
      { slug: "archive-editions", name: "Archive", pillarSlug: "editions", description: "Past collections revisited", productCount: 10, image: "/placeholder.svg" },
      { slug: "signature-collection", name: "Signature Collection", pillarSlug: "editions", description: "Iconic house pieces", productCount: 14, image: "/placeholder.svg" },
    ],
  },
];

export const microCategories: MicroCategory[] = [
  // Women micro-categories
  { id: "mc-1", slug: "silk-dresses", name: "Silk Dresses", pillarSlug: "women", familySlug: "dresses", visibility: "filter-only", isNavigationVisible: false, productCount: 8 },
  { id: "mc-2", slug: "cocktail-dresses", name: "Cocktail Dresses", pillarSlug: "women", familySlug: "dresses", visibility: "filter-only", isNavigationVisible: false, productCount: 6 },
  { id: "mc-3", slug: "maxi-dresses", name: "Maxi Dresses", pillarSlug: "women", familySlug: "dresses", visibility: "filter-only", isNavigationVisible: false, productCount: 5 },
  { id: "mc-4", slug: "cashmere-knits", name: "Cashmere Knits", pillarSlug: "women", familySlug: "knitwear-w", visibility: "filter-only", isNavigationVisible: false, productCount: 7 },
  { id: "mc-5", slug: "merino-knits", name: "Merino Knits", pillarSlug: "women", familySlug: "knitwear-w", visibility: "filter-only", isNavigationVisible: false, productCount: 4 },
  { id: "mc-6", slug: "trench-coats", name: "Trench Coats", pillarSlug: "women", familySlug: "outerwear-w", visibility: "seo-ready", isNavigationVisible: false, productCount: 3 },
  { id: "mc-7", slug: "wool-coats", name: "Wool Coats", pillarSlug: "women", familySlug: "outerwear-w", visibility: "filter-only", isNavigationVisible: false, productCount: 5 },
  { id: "mc-8", slug: "silk-blouses", name: "Silk Blouses", pillarSlug: "women", familySlug: "tops-w", visibility: "filter-only", isNavigationVisible: false, productCount: 8 },
  { id: "mc-9", slug: "evening-gowns", name: "Evening Gowns", pillarSlug: "women", familySlug: "eveningwear", visibility: "seo-ready", isNavigationVisible: false, productCount: 4 },
  { id: "mc-10", slug: "wide-leg-trousers", name: "Wide-Leg Trousers", pillarSlug: "women", familySlug: "bottoms-w", visibility: "filter-only", isNavigationVisible: false, productCount: 6 },
  // Men micro-categories
  { id: "mc-11", slug: "linen-shirts", name: "Linen Shirts", pillarSlug: "men", familySlug: "shirts", visibility: "filter-only", isNavigationVisible: false, productCount: 5 },
  { id: "mc-12", slug: "cotton-shirts", name: "Cotton Shirts", pillarSlug: "men", familySlug: "shirts", visibility: "filter-only", isNavigationVisible: false, productCount: 8 },
  { id: "mc-13", slug: "blazers", name: "Blazers", pillarSlug: "men", familySlug: "jackets", visibility: "seo-ready", isNavigationVisible: false, productCount: 7 },
  { id: "mc-14", slug: "bomber-jackets", name: "Bomber Jackets", pillarSlug: "men", familySlug: "jackets", visibility: "filter-only", isNavigationVisible: false, productCount: 4 },
  { id: "mc-15", slug: "tuxedos", name: "Tuxedos", pillarSlug: "men", familySlug: "formalwear", visibility: "seo-ready", isNavigationVisible: false, productCount: 3 },
  { id: "mc-16", slug: "cashmere-sweaters", name: "Cashmere Sweaters", pillarSlug: "men", familySlug: "knitwear-m", visibility: "filter-only", isNavigationVisible: false, productCount: 6 },
  // Accessories micro-categories
  { id: "mc-17", slug: "tote-bags", name: "Tote Bags", pillarSlug: "accessories", familySlug: "bags", visibility: "filter-only", isNavigationVisible: false, productCount: 8 },
  { id: "mc-18", slug: "crossbody-bags", name: "Crossbody Bags", pillarSlug: "accessories", familySlug: "bags", visibility: "filter-only", isNavigationVisible: false, productCount: 6 },
  { id: "mc-19", slug: "clutches", name: "Clutches", pillarSlug: "accessories", familySlug: "bags", visibility: "seo-ready", isNavigationVisible: false, productCount: 5 },
  { id: "mc-20", slug: "aviator-sunglasses", name: "Aviator Sunglasses", pillarSlug: "accessories", familySlug: "sunglasses", visibility: "filter-only", isNavigationVisible: false, productCount: 4 },
  // Footwear micro-categories
  { id: "mc-21", slug: "stiletto-heels", name: "Stiletto Heels", pillarSlug: "footwear", familySlug: "heels", visibility: "filter-only", isNavigationVisible: false, productCount: 6 },
  { id: "mc-22", slug: "kitten-heels", name: "Kitten Heels", pillarSlug: "footwear", familySlug: "heels", visibility: "filter-only", isNavigationVisible: false, productCount: 4 },
  { id: "mc-23", slug: "chelsea-boots", name: "Chelsea Boots", pillarSlug: "footwear", familySlug: "boots", visibility: "seo-ready", isNavigationVisible: false, productCount: 5 },
  { id: "mc-24", slug: "leather-sneakers", name: "Leather Sneakers", pillarSlug: "footwear", familySlug: "sneakers", visibility: "filter-only", isNavigationVisible: false, productCount: 4 },
  // Jewelry micro-categories
  { id: "mc-25", slug: "diamond-rings", name: "Diamond Rings", pillarSlug: "jewelry", familySlug: "rings", visibility: "seo-ready", isNavigationVisible: false, productCount: 5 },
  { id: "mc-26", slug: "gold-chains", name: "Gold Chains", pillarSlug: "jewelry", familySlug: "necklaces", visibility: "filter-only", isNavigationVisible: false, productCount: 6 },
  { id: "mc-27", slug: "pearl-earrings", name: "Pearl Earrings", pillarSlug: "jewelry", familySlug: "earrings", visibility: "filter-only", isNavigationVisible: false, productCount: 4 },
  // Maison micro-categories
  { id: "mc-28", slug: "scented-candles", name: "Scented Candles", pillarSlug: "maison", familySlug: "fragrance", visibility: "filter-only", isNavigationVisible: false, productCount: 6 },
  { id: "mc-29", slug: "eau-de-parfum", name: "Eau de Parfum", pillarSlug: "maison", familySlug: "fragrance", visibility: "seo-ready", isNavigationVisible: false, productCount: 5 },
  { id: "mc-30", slug: "ceramic-vases", name: "Ceramic Vases", pillarSlug: "maison", familySlug: "objects", visibility: "filter-only", isNavigationVisible: false, productCount: 4 },
  // Editions micro-categories
  { id: "mc-31", slug: "numbered-editions", name: "Numbered Editions", pillarSlug: "editions", familySlug: "limited-edition", visibility: "filter-only", isNavigationVisible: false, productCount: 3 },
  { id: "mc-32", slug: "spring-capsule", name: "Spring Capsule", pillarSlug: "editions", familySlug: "seasonal-drops", visibility: "filter-only", isNavigationVisible: false, productCount: 5 },
];

export const sampleProducts: CatalogProduct[] = [
  {
    id: "prod-001", title: "Élan Silk Midi Dress", slug: "elan-silk-midi-dress",
    pillarSlug: "women", familySlug: "dresses", microCategories: ["silk-dresses", "cocktail-dresses"],
    collection: "Spring 2025", luxuryTags: ["signature", "editors-pick"],
    price: { EUR: 1850, USD: 1950, GBP: 1600, INR: 165000, CAD: 2650 },
    currency: "EUR", images: ["/placeholder.svg"], description: "A masterwork in charmeuse silk, designed to move with the body.",
    materials: "100% Mulberry Silk", countryAvailability: ["IN", "US", "GB", "CA"], inStock: true,
    createdAt: "2025-01-15", updatedAt: "2025-02-01",
  },
  {
    id: "prod-002", title: "Nocturne Velvet Blazer", slug: "nocturne-velvet-blazer",
    pillarSlug: "men", familySlug: "jackets", microCategories: ["blazers"],
    collection: "Autumn 2025", luxuryTags: ["signature"],
    price: { EUR: 2200, USD: 2350, GBP: 1900, INR: 195000, CAD: 3100 },
    currency: "EUR", images: ["/placeholder.svg"], description: "Structured velvet in midnight navy — timeless authority.",
    materials: "Italian Velvet, Silk Lining", countryAvailability: ["US", "GB", "CA"], inStock: true,
    createdAt: "2025-01-20", updatedAt: "2025-02-05",
  },
  {
    id: "prod-003", title: "Lumière Tote", slug: "lumiere-tote",
    pillarSlug: "accessories", familySlug: "bags", microCategories: ["tote-bags"],
    luxuryTags: ["editors-pick"],
    price: { EUR: 1450, USD: 1550, GBP: 1250, INR: 128000, CAD: 2050 },
    currency: "EUR", images: ["/placeholder.svg"], description: "Hand-stitched Italian calfskin with brushed-gold hardware.",
    materials: "Full-grain Calfskin", countryAvailability: ["IN", "US", "GB", "CA"], inStock: true,
    createdAt: "2025-01-10", updatedAt: "2025-01-30",
  },
  {
    id: "prod-004", title: "Aura Stiletto Pump", slug: "aura-stiletto-pump",
    pillarSlug: "footwear", familySlug: "heels", microCategories: ["stiletto-heels"],
    collection: "Spring 2025", luxuryTags: ["signature"],
    price: { EUR: 890, USD: 950, GBP: 780, INR: 79000, CAD: 1250 },
    currency: "EUR", images: ["/placeholder.svg"], description: "100mm stiletto in hand-polished patent leather.",
    materials: "Patent Leather, Leather Sole", countryAvailability: ["IN", "US", "GB", "CA"], inStock: true,
    createdAt: "2025-02-01", updatedAt: "2025-02-08",
  },
  {
    id: "prod-005", title: "Solstice Diamond Ring", slug: "solstice-diamond-ring",
    pillarSlug: "jewelry", familySlug: "rings", microCategories: ["diamond-rings"],
    luxuryTags: ["limited"],
    price: { EUR: 4800, USD: 5200, GBP: 4200, INR: 425000, CAD: 6900 },
    currency: "EUR", images: ["/placeholder.svg"], description: "Brilliant-cut diamond set in 18k rose gold, limited to 50 pieces.",
    materials: "18K Rose Gold, VVS1 Diamond", countryAvailability: ["US", "GB"], inStock: true,
    createdAt: "2025-01-05", updatedAt: "2025-02-01",
  },
  {
    id: "prod-006", title: "Rituel Scented Candle", slug: "rituel-scented-candle",
    pillarSlug: "maison", familySlug: "fragrance", microCategories: ["scented-candles"],
    luxuryTags: ["signature"],
    price: { EUR: 95, USD: 105, GBP: 85, INR: 8500, CAD: 135 },
    currency: "EUR", images: ["/placeholder.svg"], description: "Hand-poured soy candle with notes of oud, amber, and sandalwood.",
    materials: "Soy Wax, Cotton Wick", countryAvailability: ["IN", "US", "GB", "CA"], inStock: true,
    createdAt: "2025-01-25", updatedAt: "2025-02-03",
  },
  {
    id: "prod-007", title: "Capsule No. 01 — Linen Set", slug: "capsule-01-linen-set",
    pillarSlug: "editions", familySlug: "limited-edition", microCategories: ["numbered-editions"],
    collection: "Capsule 01", edition: "Limited to 100", luxuryTags: ["limited", "seasonal"],
    price: { EUR: 1200, USD: 1300, GBP: 1050, INR: 106000, CAD: 1700 },
    currency: "EUR", images: ["/placeholder.svg"], description: "Numbered linen two-piece — only 100 produced worldwide.",
    materials: "Belgian Linen", countryAvailability: ["IN", "US", "GB", "CA"], inStock: true,
    createdAt: "2025-02-05", updatedAt: "2025-02-10",
  },
  {
    id: "prod-008", title: "Cashmere Oversized Pullover", slug: "cashmere-oversized-pullover",
    pillarSlug: "women", familySlug: "knitwear-w", microCategories: ["cashmere-knits"],
    luxuryTags: ["editors-pick"],
    price: { EUR: 980, USD: 1050, GBP: 850, INR: 87000, CAD: 1380 },
    currency: "EUR", images: ["/placeholder.svg"], description: "Mongolian cashmere, relaxed silhouette, designed for layering.",
    materials: "100% Mongolian Cashmere", countryAvailability: ["IN", "US", "GB", "CA"], inStock: true,
    createdAt: "2025-01-18", updatedAt: "2025-02-02",
  },
];

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}

export function getFamiliesByPillar(pillarSlug: string) {
  const pillar = getPillar(pillarSlug);
  return pillar?.families ?? [];
}

export function getMicroCategoriesByFamily(pillarSlug: string, familySlug: string) {
  return microCategories.filter((mc) => mc.pillarSlug === pillarSlug && mc.familySlug === familySlug);
}

export function getProductsByPillar(pillarSlug: string) {
  return sampleProducts.filter((p) => p.pillarSlug === pillarSlug);
}

export function getProductsByFamily(pillarSlug: string, familySlug: string) {
  return sampleProducts.filter((p) => p.pillarSlug === pillarSlug && p.familySlug === familySlug);
}

export function getProductBySlug(slug: string) {
  return sampleProducts.find((p) => p.slug === slug);
}
