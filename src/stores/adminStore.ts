/**
 * ADMIN STORE — Central state management for the entire admin operating system.
 * Uses Zustand with localStorage persistence.
 * BACKEND HANDOFF: Replace localStorage with API calls.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { sampleProducts } from "@/data/catalog-hierarchy";
import { CatalogProduct } from "@/types/catalog";

// ═══ Types ═══

export type AdminRole = "founder" | "global-director" | "merchandising-manager" | "content-editor" | "support-agent";

export interface AuditEntry {
  id: string;
  timestamp: string;
  role: AdminRole;
  action: string;
  entity: string;
  detail: string;
}

export interface HomepageSection {
  id: string;
  type: "hero" | "featured-collection" | "new-arrivals" | "limited-archive" | "brand-spotlight" | "editorial" | "newsletter";
  title: string;
  description: string;
  enabled: boolean;
  order: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  children: { id: string; label: string; href: string; order: number }[];
  featuredCollection?: string;
  featuredProduct?: string;
  promoText?: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroImage: string;
  featured: boolean;
  productIds: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface PageBlock {
  id: string;
  type: "text" | "image" | "product-slider" | "cta" | "banner" | "hero";
  content: Record<string, string>;
  enabled: boolean;
  order: number;
}

export interface PageItem {
  id: string;
  title: string;
  slug: string;
  blocks: PageBlock[];
}

export interface MockOrder {
  id: string;
  orderNumber: string;
  customer: string;
  country: string;
  products: string[];
  total: number;
  currency: string;
  status: "pending" | "approved" | "cancelled" | "refunded";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  flagged: boolean;
  vip: boolean;
  createdAt: string;
}

export interface CurrencyRate {
  code: string;
  symbol: string;
  rate: number;
  enabled: boolean;
  multiplier: number;
}

export interface SystemSettings {
  brandName: string;
  siteAnnouncement: string;
  maintenanceMode: boolean;
  defaultCurrency: string;
  taxPercent: number;
  lowStockThreshold: number;
}

interface ProductOverride {
  featured?: boolean;
  visible?: boolean;
  sold?: boolean;
  reserved?: boolean;
  archived?: boolean;
  inventory?: number;
  salePrice?: number;
  regionLock?: string[];
  seoTitle?: string;
  seoDescription?: string;
  campaignTags?: string[];
  internalNotes?: string;
  approvalStatus?: "draft" | "pending" | "approved" | "rejected";
  flashSale?: boolean;
}

// ═══ Role Permissions ═══

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  founder: ["dashboard", "products", "collections", "pages", "homepage", "navigation", "pricing", "inventory", "orders", "governance", "roles", "audit", "settings"],
  "global-director": ["dashboard", "products", "collections", "pages", "homepage", "navigation", "pricing", "inventory", "orders", "governance", "audit"],
  "merchandising-manager": ["dashboard", "products", "collections", "homepage", "inventory", "orders", "audit"],
  "content-editor": ["dashboard", "pages", "homepage", "collections", "audit"],
  "support-agent": ["dashboard", "orders", "audit"],
};

// ═══ Initial Data ═══

const defaultHomepageSections: HomepageSection[] = [
  { id: "hero", type: "hero", title: "Hero Banner", description: "Main hero with campaign image", enabled: true, order: 0 },
  { id: "featured", type: "featured-collection", title: "Featured Collection", description: "Curated seasonal collection", enabled: true, order: 1 },
  { id: "arrivals", type: "new-arrivals", title: "New Arrivals", description: "Latest product additions", enabled: true, order: 2 },
  { id: "archive", type: "limited-archive", title: "Limited Archive", description: "Archive and limited edition pieces", enabled: true, order: 3 },
  { id: "spotlight", type: "brand-spotlight", title: "Brand Spotlight", description: "Brand story and values", enabled: true, order: 4 },
  { id: "editorial", type: "editorial", title: "Editorial Section", description: "Journal excerpts and stories", enabled: true, order: 5 },
  { id: "newsletter", type: "newsletter", title: "Newsletter Block", description: "Email subscription form", enabled: true, order: 6 },
];

const defaultNavItems: NavItem[] = [
  { id: "nav-women", label: "Women", href: "/shop/women", order: 0, children: [{ id: "n-w-d", label: "Dresses", href: "/shop/women/dresses", order: 0 }, { id: "n-w-r", label: "Ready-to-Wear", href: "/shop/women/ready-to-wear", order: 1 }, { id: "n-w-o", label: "Outerwear", href: "/shop/women/outerwear-w", order: 2 }], featuredCollection: "Spring 2025", promoText: "New Season" },
  { id: "nav-atelier", label: "Atelier", href: "/atelier", order: 1, children: [{ id: "n-a-c", label: "Collections", href: "/atelier/collections", order: 0 }, { id: "n-a-l", label: "Lookbook", href: "/atelier/lookbook", order: 1 }] },
  { id: "nav-beauty", label: "Beauty", href: "/beauty", order: 2, children: [{ id: "n-b-r", label: "Rituals", href: "/beauty/rituals", order: 0 }, { id: "n-b-s", label: "Skincare", href: "/beauty/radiance-serum", order: 1 }] },
  { id: "nav-objects", label: "Objects", href: "/lifestyle", order: 3, children: [{ id: "n-o-a", label: "Accessories", href: "/lifestyle/accessories", order: 0 }, { id: "n-o-o", label: "Objects", href: "/lifestyle/objects", order: 1 }] },
  { id: "nav-archive", label: "Archive", href: "/archive", order: 4, children: [] },
  { id: "nav-discover", label: "Discover", href: "/discover", order: 5, children: [{ id: "n-d-j", label: "Journal", href: "/journal", order: 0 }, { id: "n-d-p", label: "Press", href: "/press", order: 1 }] },
];

const defaultCollections: CollectionItem[] = [
  { id: "col-1", title: "Spring Summer 2025", slug: "spring-summer-2025", description: "The new season unfolds", heroImage: "/placeholder.svg", featured: true, productIds: ["prod-001", "prod-004"], seoTitle: "Spring Summer 2025 | AMARISÉ", seoDescription: "Discover the Spring Summer 2025 collection" },
  { id: "col-2", title: "Essentials", slug: "essentials", description: "Timeless foundation pieces", heroImage: "/placeholder.svg", featured: false, productIds: ["prod-002", "prod-003"], seoTitle: "Essentials | AMARISÉ", seoDescription: "Explore the Essentials collection" },
  { id: "col-3", title: "Evening Edit", slug: "evening-edit", description: "After dark glamour", heroImage: "/placeholder.svg", featured: false, productIds: ["prod-001", "prod-005"], seoTitle: "Evening Edit | AMARISÉ", seoDescription: "Shop the Evening Edit" },
];

const defaultPages: PageItem[] = [
  { id: "page-home", title: "Home", slug: "/", blocks: [{ id: "b-1", type: "hero", content: { title: "Where Beauty Meets Intention", subtitle: "Discover a world of refined elegance" }, enabled: true, order: 0 }] },
  { id: "page-about", title: "About", slug: "/about-amarise", blocks: [{ id: "b-2", type: "text", content: { heading: "Our Story", body: "AMARISÉ was founded on a belief..." }, enabled: true, order: 0 }] },
  { id: "page-contact", title: "Contact", slug: "/contact", blocks: [{ id: "b-3", type: "text", content: { heading: "Get in Touch", body: "We welcome your inquiries." }, enabled: true, order: 0 }] },
];

const defaultOrders: MockOrder[] = [
  { id: "ord-001", orderNumber: "AMR-2025-0001", customer: "Isabella Rossi", country: "IT", products: ["Élan Silk Midi Dress"], total: 1850, currency: "EUR", status: "pending", paymentStatus: "paid", flagged: false, vip: true, createdAt: "2025-02-28T10:00:00Z" },
  { id: "ord-002", orderNumber: "AMR-2025-0002", customer: "James Harrington", country: "GB", products: ["Nocturne Velvet Blazer", "Lumière Tote"], total: 3650, currency: "EUR", status: "approved", paymentStatus: "paid", flagged: false, vip: false, createdAt: "2025-02-27T14:30:00Z" },
  { id: "ord-003", orderNumber: "AMR-2025-0003", customer: "Aisha Patel", country: "IN", products: ["Aura Stiletto Pump"], total: 890, currency: "EUR", status: "pending", paymentStatus: "pending", flagged: true, vip: false, createdAt: "2025-02-26T09:15:00Z" },
  { id: "ord-004", orderNumber: "AMR-2025-0004", customer: "Sophie Laurent", country: "FR", products: ["Celestine Diamond Ring"], total: 4200, currency: "EUR", status: "approved", paymentStatus: "paid", flagged: false, vip: true, createdAt: "2025-02-25T16:45:00Z" },
  { id: "ord-005", orderNumber: "AMR-2025-0005", customer: "Michael Chen", country: "US", products: ["Élan Silk Midi Dress", "Aether Cashmere Coat"], total: 5050, currency: "EUR", status: "cancelled", paymentStatus: "refunded", flagged: false, vip: false, createdAt: "2025-02-24T11:20:00Z" },
];

const defaultCurrencies: CurrencyRate[] = [
  { code: "USD", symbol: "$", rate: 1.08, enabled: true, multiplier: 1.0 },
  { code: "EUR", symbol: "€", rate: 1.0, enabled: true, multiplier: 1.0 },
  { code: "AED", symbol: "د.إ", rate: 3.97, enabled: true, multiplier: 1.0 },
  { code: "INR", symbol: "₹", rate: 90.5, enabled: true, multiplier: 1.0 },
  { code: "GBP", symbol: "£", rate: 0.86, enabled: true, multiplier: 1.0 },
];

const defaultSettings: SystemSettings = {
  brandName: "AMARISÉ",
  siteAnnouncement: "",
  maintenanceMode: false,
  defaultCurrency: "EUR",
  taxPercent: 20,
  lowStockThreshold: 5,
};

// ═══ Store Interface ═══

interface AdminStore {
  // Role
  currentRole: AdminRole;
  setRole: (role: AdminRole) => void;
  can: (section: string) => boolean;

  // Audit
  auditLog: AuditEntry[];
  addAudit: (action: string, entity: string, detail: string) => void;

  // Homepage
  homepageSections: HomepageSection[];
  updateHomepageSection: (id: string, updates: Partial<HomepageSection>) => void;
  reorderHomepageSections: (sections: HomepageSection[]) => void;

  // Navigation
  navItems: NavItem[];
  updateNavItem: (id: string, updates: Partial<NavItem>) => void;
  addNavItem: (item: NavItem) => void;
  removeNavItem: (id: string) => void;
  reorderNavItems: (items: NavItem[]) => void;

  // Collections
  collections: CollectionItem[];
  addCollection: (col: CollectionItem) => void;
  updateCollection: (id: string, updates: Partial<CollectionItem>) => void;
  removeCollection: (id: string) => void;

  // Pages
  pages: PageItem[];
  updatePage: (id: string, updates: Partial<PageItem>) => void;
  addPageBlock: (pageId: string, block: PageBlock) => void;
  updatePageBlock: (pageId: string, blockId: string, updates: Partial<PageBlock>) => void;
  removePageBlock: (pageId: string, blockId: string) => void;

  // Products (overrides on top of catalog-hierarchy data)
  productOverrides: Record<string, ProductOverride>;
  setProductOverride: (productId: string, override: ProductOverride) => void;

  // Orders
  orders: MockOrder[];
  updateOrder: (id: string, updates: Partial<MockOrder>) => void;

  // Currencies
  currencies: CurrencyRate[];
  updateCurrency: (code: string, updates: Partial<CurrencyRate>) => void;
  baseCurrency: string;
  setBaseCurrency: (code: string) => void;
  taxInclusion: boolean;
  setTaxInclusion: (v: boolean) => void;

  // Governance
  globalFreeze: boolean;
  setGlobalFreeze: (v: boolean) => void;
  countryFreeze: Record<string, boolean>;
  toggleCountryFreeze: (code: string) => void;
  pillarFreeze: Record<string, boolean>;
  togglePillarFreeze: (slug: string) => void;
  approvalRequired: boolean;
  setApprovalRequired: (v: boolean) => void;
  emergencyBanner: string;
  setEmergencyBanner: (v: string) => void;

  // Inventory
  inventoryFreeze: boolean;
  setInventoryFreeze: (v: boolean) => void;
  productFreezes: Record<string, boolean>;
  toggleProductFreeze: (id: string) => void;

  // System Settings
  settings: SystemSettings;
  updateSettings: (updates: Partial<SystemSettings>) => void;
}

// ═══ Store ═══

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Role
      currentRole: "founder",
      setRole: (role) => { set({ currentRole: role }); get().addAudit("Role changed", "System", `Switched to ${role}`); },
      can: (section) => ROLE_PERMISSIONS[get().currentRole]?.includes(section) ?? false,

      // Audit
      auditLog: [],
      addAudit: (action, entity, detail) => set((s) => ({
        auditLog: [{ id: `aud-${Date.now()}`, timestamp: new Date().toISOString(), role: s.currentRole, action, entity, detail }, ...s.auditLog].slice(0, 200),
      })),

      // Homepage
      homepageSections: defaultHomepageSections,
      updateHomepageSection: (id, updates) => {
        set((s) => ({ homepageSections: s.homepageSections.map((sec) => sec.id === id ? { ...sec, ...updates } : sec) }));
        get().addAudit("Homepage section updated", "Homepage", `Section ${id} modified`);
      },
      reorderHomepageSections: (sections) => set({ homepageSections: sections }),

      // Navigation
      navItems: defaultNavItems,
      updateNavItem: (id, updates) => {
        set((s) => ({ navItems: s.navItems.map((n) => n.id === id ? { ...n, ...updates } : n) }));
        get().addAudit("Navigation updated", "Navigation", `Item ${id} modified`);
      },
      addNavItem: (item) => { set((s) => ({ navItems: [...s.navItems, item] })); get().addAudit("Navigation item added", "Navigation", item.label); },
      removeNavItem: (id) => { set((s) => ({ navItems: s.navItems.filter((n) => n.id !== id) })); get().addAudit("Navigation item removed", "Navigation", id); },
      reorderNavItems: (items) => set({ navItems: items }),

      // Collections
      collections: defaultCollections,
      addCollection: (col) => { set((s) => ({ collections: [...s.collections, col] })); get().addAudit("Collection created", "Collections", col.title); },
      updateCollection: (id, updates) => {
        set((s) => ({ collections: s.collections.map((c) => c.id === id ? { ...c, ...updates } : c) }));
        get().addAudit("Collection updated", "Collections", id);
      },
      removeCollection: (id) => { set((s) => ({ collections: s.collections.filter((c) => c.id !== id) })); get().addAudit("Collection removed", "Collections", id); },

      // Pages
      pages: defaultPages,
      updatePage: (id, updates) => {
        set((s) => ({ pages: s.pages.map((p) => p.id === id ? { ...p, ...updates } : p) }));
        get().addAudit("Page updated", "Pages", id);
      },
      addPageBlock: (pageId, block) => {
        set((s) => ({ pages: s.pages.map((p) => p.id === pageId ? { ...p, blocks: [...p.blocks, block] } : p) }));
        get().addAudit("Page block added", "Pages", `${pageId} → ${block.type}`);
      },
      updatePageBlock: (pageId, blockId, updates) => {
        set((s) => ({
          pages: s.pages.map((p) => p.id === pageId ? { ...p, blocks: p.blocks.map((b) => b.id === blockId ? { ...b, ...updates } : b) } : p),
        }));
      },
      removePageBlock: (pageId, blockId) => {
        set((s) => ({ pages: s.pages.map((p) => p.id === pageId ? { ...p, blocks: p.blocks.filter((b) => b.id !== blockId) } : p) }));
        get().addAudit("Page block removed", "Pages", `${pageId} → ${blockId}`);
      },

      // Products
      productOverrides: {},
      setProductOverride: (productId, override) => {
        set((s) => ({ productOverrides: { ...s.productOverrides, [productId]: { ...s.productOverrides[productId], ...override } } }));
        get().addAudit("Product override", "Products", `${productId}: ${Object.keys(override).join(", ")}`);
      },

      // Orders
      orders: defaultOrders,
      updateOrder: (id, updates) => {
        set((s) => ({ orders: s.orders.map((o) => o.id === id ? { ...o, ...updates } : o) }));
        get().addAudit("Order updated", "Orders", `${id}: ${Object.keys(updates).join(", ")}`);
      },

      // Currencies
      currencies: defaultCurrencies,
      updateCurrency: (code, updates) => {
        set((s) => ({ currencies: s.currencies.map((c) => c.code === code ? { ...c, ...updates } : c) }));
        get().addAudit("Currency updated", "Pricing", `${code} modified`);
      },
      baseCurrency: "EUR",
      setBaseCurrency: (code) => { set({ baseCurrency: code }); get().addAudit("Base currency changed", "Pricing", code); },
      taxInclusion: true,
      setTaxInclusion: (v) => set({ taxInclusion: v }),

      // Governance
      globalFreeze: false,
      setGlobalFreeze: (v) => { set({ globalFreeze: v }); get().addAudit(v ? "Global freeze activated" : "Global freeze deactivated", "Governance", "All commerce"); },
      countryFreeze: { US: false, GB: false, FR: false, DE: false, IN: false, AE: false, JP: false, AU: false, CA: false, IT: false },
      toggleCountryFreeze: (code) => {
        set((s) => ({ countryFreeze: { ...s.countryFreeze, [code]: !s.countryFreeze[code] } }));
        get().addAudit("Country freeze toggled", "Governance", code);
      },
      pillarFreeze: {},
      togglePillarFreeze: (slug) => {
        set((s) => ({ pillarFreeze: { ...s.pillarFreeze, [slug]: !s.pillarFreeze[slug] } }));
        get().addAudit("Pillar freeze toggled", "Governance", slug);
      },
      approvalRequired: true,
      setApprovalRequired: (v) => { set({ approvalRequired: v }); get().addAudit("Approval requirement changed", "Governance", v ? "Enabled" : "Disabled"); },
      emergencyBanner: "",
      setEmergencyBanner: (v) => { set({ emergencyBanner: v }); get().addAudit("Emergency banner updated", "Governance", v || "(cleared)"); },

      // Inventory
      inventoryFreeze: false,
      setInventoryFreeze: (v) => { set({ inventoryFreeze: v }); get().addAudit(v ? "Inventory freeze activated" : "Inventory freeze deactivated", "Inventory", "Global"); },
      productFreezes: {},
      toggleProductFreeze: (id) => {
        set((s) => ({ productFreezes: { ...s.productFreezes, [id]: !s.productFreezes[id] } }));
        get().addAudit("Product freeze toggled", "Inventory", id);
      },

      // System Settings
      settings: defaultSettings,
      updateSettings: (updates) => {
        set((s) => ({ settings: { ...s.settings, ...updates } }));
        get().addAudit("System settings updated", "Settings", Object.keys(updates).join(", "));
      },
    }),
    { name: "amarise-admin-store" }
  )
);
