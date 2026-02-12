/**
 * CATALOG TYPES — Product & Category Architecture
 * Pillar → Family → Micro-Category hierarchy
 */

export type PillarSlug = 'women' | 'men' | 'accessories' | 'footwear' | 'jewelry' | 'maison' | 'editions';

export type LuxuryTag = 'signature' | 'limited' | 'seasonal' | 'editors-pick';

export type MicroCategoryVisibility = 'hidden' | 'filter-only' | 'seo-ready';

export type CountryCode = 'IN' | 'US' | 'GB' | 'CA';

export interface Pillar {
  slug: PillarSlug;
  name: string;
  description: string;
  families: CategoryFamily[];
}

export interface CategoryFamily {
  slug: string;
  name: string;
  pillarSlug: PillarSlug;
  description: string;
  image?: string;
  productCount: number;
}

export interface MicroCategory {
  id: string;
  slug: string;
  name: string;
  pillarSlug: PillarSlug;
  familySlug: string;
  visibility: MicroCategoryVisibility;
  isNavigationVisible: boolean;
  productCount: number;
}

export interface CatalogProduct {
  id: string;
  sku: string;
  title: string;
  slug: string;
  pillarSlug: PillarSlug;
  familySlug: string;
  microCategories: string[];
  collection?: string;
  edition?: string;
  luxuryTags: LuxuryTag[];
  price: Record<string, number>;
  currency: string;
  images: string[];
  description: string;
  headline: string;
  craftsmanshipStory: string;
  materials?: string;
  careInstructions?: string;
  sizeGuide?: string[];
  countryAvailability: CountryCode[];
  inStock: boolean;
  inventory: number;
  isFeatured?: boolean;
  isDraft?: boolean;
  isLimitedEdition?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryHierarchyAdmin {
  pillar: Pillar;
  families: CategoryFamily[];
  microCategories: MicroCategory[];
}
