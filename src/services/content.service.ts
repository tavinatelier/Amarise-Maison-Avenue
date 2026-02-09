/**
 * CONTENT SERVICE
 * BACKEND HANDOFF: Replace mock implementations with CMS API calls
 * 
 * This service defines the contract for all content operations.
 * UI components use these functions - backend replaces implementation only.
 */

import { 
  Product, 
  Collection, 
  JournalArticle, 
  Ritual, 
  Mood, 
  Story,
  LookbookEntry 
} from '@/types/content';

// Import mock data
import homepageData from '@/data/mock/homepage.json';
import productsData from '@/data/mock/products.json';
import journalData from '@/data/mock/journal.json';
import collectionsData from '@/data/mock/collections.json';
import lookbookData from '@/data/mock/lookbook.json';
import discoveryData from '@/data/mock/discovery.json';
import siteData from '@/data/mock/site.json';

// ============================================
// TYPES
// ============================================

export interface HomepageContent {
  hero: {
    image: string;
    caption: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
  };
  statement: {
    quote: string;
  };
  sections: {
    beauty: SectionContent;
    atelier: SectionContent;
    lifestyle: SectionContent;
  };
  editorial: {
    caption: string;
    title: string;
    paragraphs: string[];
    linkText: string;
    href: string;
  };
  newsletter: {
    caption: string;
    title: string;
    placeholder: string;
    buttonText: string;
  };
}

interface SectionContent {
  caption: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
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
  footer: {
    shop: Array<{ label: string; href: string }>;
    discover: Array<{ label: string; href: string }>;
    customer: Array<{ label: string; href: string }>;
    legal: Array<{ label: string; href: string }>;
    social: Array<{ platform: string; href: string; icon?: string }>;
    copyright: string;
  };
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      country: string;
      postal: string;
    };
  };
}


// ============================================
// HOMEPAGE
// ============================================

/**
 * Get homepage content
 * BACKEND HANDOFF: Replace with CMS API call GET /pages/home
 */
export const getHomepageContent = async (): Promise<HomepageContent> => {
  // Mock implementation - returns mock data
  return homepageData as unknown as HomepageContent;
};


// ============================================
// PRODUCTS
// ============================================

/**
 * Get all products by category
 * BACKEND HANDOFF: Replace with Commerce API call GET /products?category=:category
 */
export const getProductsByCategory = async (
  category: 'beauty' | 'atelier' | 'lifestyle'
): Promise<Product[]> => {
  const products = productsData[category] as Product[];
  return products;
};

/**
 * Get single product by slug
 * BACKEND HANDOFF: Replace with Commerce API call GET /products/:slug
 */
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const allProducts = [
    ...productsData.beauty,
    ...productsData.atelier,
    ...productsData.lifestyle,
  ] as Product[];
  
  return allProducts.find(p => p.slug === slug) || null;
};

/**
 * Get archived products
 * BACKEND HANDOFF: Replace with Commerce API call GET /products?status=archived
 */
export const getArchivedProducts = async (): Promise<Product[]> => {
  return productsData.archived as Product[];
};

/**
 * Get featured products for homepage
 * BACKEND HANDOFF: Replace with Commerce API call GET /products/featured
 */
export const getFeaturedProducts = async (): Promise<{
  beauty: Product[];
  atelier: Product[];
  lifestyle: Product[];
}> => {
  // Return first 3 products from each category
  return {
    beauty: (productsData.beauty as Product[]).slice(0, 3),
    atelier: (productsData.atelier as Product[]).slice(0, 2),
    lifestyle: (productsData.lifestyle as Product[]).slice(0, 3),
  };
};


// ============================================
// COLLECTIONS
// ============================================

/**
 * Get active collections
 * BACKEND HANDOFF: Replace with Commerce API call GET /collections?status=active
 */
export const getActiveCollections = async (): Promise<Collection[]> => {
  return collectionsData.active as Collection[];
};

/**
 * Get upcoming collections (for preview/countdown)
 * BACKEND HANDOFF: Replace with Commerce API call GET /collections?status=upcoming
 */
export const getUpcomingCollections = async (): Promise<Collection[]> => {
  return collectionsData.upcoming as Collection[];
};

/**
 * Get archived collections
 * BACKEND HANDOFF: Replace with Commerce API call GET /collections?status=archived
 */
export const getArchivedCollections = async (): Promise<Collection[]> => {
  return collectionsData.archived as Collection[];
};

/**
 * Get collection by slug
 * BACKEND HANDOFF: Replace with Commerce API call GET /collections/:slug
 */
export const getCollectionBySlug = async (slug: string): Promise<Collection | null> => {
  const allCollections = [
    ...collectionsData.active,
    ...collectionsData.upcoming,
    ...collectionsData.archived,
  ] as Collection[];
  
  return allCollections.find(c => c.slug === slug) || null;
};


// ============================================
// JOURNAL / ARTICLES
// ============================================

/**
 * Get all journal articles
 * BACKEND HANDOFF: Replace with CMS API call GET /journal
 */
export const getJournalArticles = async (): Promise<JournalArticle[]> => {
  return journalData.articles as JournalArticle[];
};

/**
 * Get featured article
 * BACKEND HANDOFF: Replace with CMS API call GET /journal/featured
 */
export const getFeaturedArticle = async (): Promise<JournalArticle> => {
  return journalData.featured as JournalArticle;
};

/**
 * Get article by slug
 * BACKEND HANDOFF: Replace with CMS API call GET /journal/:slug
 */
export const getArticleBySlug = async (slug: string): Promise<JournalArticle | null> => {
  const articles = journalData.articles as JournalArticle[];
  return articles.find(a => a.slug === slug) || null;
};


// ============================================
// LOOKBOOK
// ============================================

/**
 * Get lookbook content
 * BACKEND HANDOFF: Replace with CMS API call GET /lookbook
 */
export const getLookbook = async (): Promise<{
  hero: { image: string; caption: string; title: string; subtitle: string };
  statement: { quote: string };
  entries: LookbookEntry[];
  credits: { photographer: string; styling: string; location: string; season: string };
}> => {
  return lookbookData as unknown as ReturnType<typeof getLookbook> extends Promise<infer T> ? T : never;
};

/**
 * Get lookbook entries only
 * BACKEND HANDOFF: Replace with CMS API call GET /lookbook/entries
 */
export const getLookbookEntries = async (): Promise<LookbookEntry[]> => {
  return lookbookData.entries as LookbookEntry[];
};


// ============================================
// DISCOVERY
// ============================================

/**
 * Get all rituals
 * BACKEND HANDOFF: Replace with Recommendation API call GET /discovery/rituals
 */
export const getRituals = async (): Promise<Ritual[]> => {
  return discoveryData.rituals as Ritual[];
};

/**
 * Get ritual by slug
 * BACKEND HANDOFF: Replace with Recommendation API call GET /discovery/rituals/:slug
 */
export const getRitualBySlug = async (slug: string): Promise<Ritual | null> => {
  const rituals = discoveryData.rituals as Ritual[];
  return rituals.find(r => r.slug === slug) || null;
};

/**
 * Get all moods
 * BACKEND HANDOFF: Replace with Recommendation API call GET /discovery/moods
 */
export const getMoods = async (): Promise<Mood[]> => {
  return discoveryData.moods as Mood[];
};

/**
 * Get mood by slug
 * BACKEND HANDOFF: Replace with Recommendation API call GET /discovery/moods/:slug
 */
export const getMoodBySlug = async (slug: string): Promise<Mood | null> => {
  const moods = discoveryData.moods as Mood[];
  return moods.find(m => m.slug === slug) || null;
};

/**
 * Get all stories
 * BACKEND HANDOFF: Replace with Recommendation API call GET /discovery/stories
 */
export const getStories = async (): Promise<Story[]> => {
  return discoveryData.stories as Story[];
};

/**
 * Get story by slug
 * BACKEND HANDOFF: Replace with Recommendation API call GET /discovery/stories/:slug
 */
export const getStoryBySlug = async (slug: string): Promise<Story | null> => {
  const stories = discoveryData.stories as Story[];
  return stories.find(s => s.slug === slug) || null;
};

/**
 * Get products by discovery filter
 * BACKEND HANDOFF: Replace with Recommendation API call GET /products?filter=:type&value=:id
 */
export const getProductsByDiscoveryFilter = async (
  filterType: 'ritual' | 'mood' | 'story',
  filterValue: string
): Promise<Product[]> => {
  const allProducts = [
    ...productsData.beauty,
    ...productsData.atelier,
    ...productsData.lifestyle,
  ] as Product[];
  
  return allProducts.filter(p => {
    switch (filterType) {
      case 'ritual':
        return p.ritual === filterValue;
      case 'mood':
        return p.mood === filterValue;
      case 'story':
        return p.story === filterValue;
      default:
        return false;
    }
  });
};


// ============================================
// SITE SETTINGS
// ============================================

/**
 * Get site-wide settings
 * BACKEND HANDOFF: Replace with CMS API call GET /settings
 */
export const getSiteSettings = async (): Promise<SiteContent> => {
  return siteData as SiteContent;
};

/**
 * Get navigation
 * BACKEND HANDOFF: Replace with CMS API call GET /navigation
 */
export const getNavigation = async (): Promise<SiteContent['navigation']> => {
  return siteData.navigation;
};

/**
 * Get footer content
 * BACKEND HANDOFF: Replace with CMS API call GET /footer
 */
export const getFooterContent = async (): Promise<SiteContent['footer']> => {
  return siteData.footer;
};


// ============================================
// NEWSLETTER
// ============================================

/**
 * Subscribe to newsletter
 * BACKEND HANDOFF: Replace with Marketing API call POST /newsletter/subscribe
 */
export const subscribeToNewsletter = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  console.log('[Content] Newsletter subscription:', email);
  
  // Mock implementation
  return {
    success: true,
    message: 'Thank you for subscribing',
  };
};
