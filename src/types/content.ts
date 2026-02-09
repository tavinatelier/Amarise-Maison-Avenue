/**
 * CMS-READY: Product type definitions
 * Backend developers: These interfaces match the expected API response structure
 */

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  currency: string;
  priceValue: number;
  image: string;
  category: 'beauty' | 'atelier' | 'lifestyle';
  ritual?: string;
  mood?: string;
  story?: string;
  status: 'active' | 'soft-launch' | 'archived';
  isPurchasable: boolean;
  collection?: string;
  launchDate?: string | null;
  archiveDate?: string | null;
  archiveReason?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  status: 'active' | 'soft-launch' | 'archived' | 'scheduled';
  visibility: 'public' | 'preview' | 'archive' | 'teaser';
  isPurchasable: boolean;
  launchDate: string;
  endDate?: string | null;
  archiveDate?: string;
  previewDate?: string;
  category: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  dateFormatted: string;
  author: string;
  readTime: string;
}

export interface DiscoveryCategory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Ritual extends DiscoveryCategory {
  mood: string;
}

export interface Mood extends DiscoveryCategory {
  palette: string[];
}

export interface Story extends DiscoveryCategory {
  relatedArticle: string;
}

export interface LookbookEntry {
  id: string;
  image: string;
  title: string;
  description: string;
  productLink?: string | null;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
    twitterHandle: string;
  };
  navigation: {
    main: Array<{ label: string; href: string }>;
    secondary: Array<{ label: string; href: string }>;
  };
}
