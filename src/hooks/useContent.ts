/**
 * CMS-READY: Mock data hooks
 * Backend developers: Replace these imports with API calls
 * Example: const { data } = useQuery(['products'], fetchProducts)
 */

import { Product, Collection, JournalArticle, Ritual, Mood, Story, LookbookEntry } from '@/types/content';

// Import mock data
import productsData from '@/data/mock/products.json';
import collectionsData from '@/data/mock/collections.json';
import journalData from '@/data/mock/journal.json';
import discoveryData from '@/data/mock/discovery.json';
import lookbookData from '@/data/mock/lookbook.json';

/**
 * BACKEND HANDOFF: Replace with API call
 * Example: return useQuery(['products', category], () => api.get(`/products?category=${category}`))
 */
export function useProducts(category?: string): Product[] {
  const allProducts = [
    ...productsData.beauty,
    ...productsData.atelier,
    ...productsData.lifestyle,
  ] as Product[];
  
  if (category) {
    return allProducts.filter(p => p.category === category);
  }
  return allProducts;
}

/**
 * BACKEND HANDOFF: Replace with API call
 * Returns archived products for the Archive page
 */
export function useArchivedProducts(): Product[] {
  return productsData.archived as Product[];
}

/**
 * BACKEND HANDOFF: Replace with API call
 * Mock date-based visibility check
 */
export function useVisibleProducts(category?: string): Product[] {
  const now = new Date();
  const products = useProducts(category);
  
  return products.filter(product => {
    // Check if product is launched
    if (product.launchDate && new Date(product.launchDate) > now) {
      return false;
    }
    // Check if product is archived
    if (product.archiveDate && new Date(product.archiveDate) < now) {
      return false;
    }
    return product.status === 'active';
  });
}

/**
 * BACKEND HANDOFF: Replace with API call
 * Returns soft-launch products (viewable but not purchasable)
 */
export function useSoftLaunchProducts(): Product[] {
  return useProducts().filter(p => p.status === 'soft-launch');
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useCollections(status?: string): Collection[] {
  const all = [
    ...collectionsData.active,
    ...collectionsData.upcoming,
    ...collectionsData.archived,
  ] as Collection[];
  
  if (status) {
    return all.filter(c => c.status === status);
  }
  return all;
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useActiveCollections(): Collection[] {
  const now = new Date();
  return useCollections().filter(collection => {
    if (collection.launchDate && new Date(collection.launchDate) > now) {
      return false;
    }
    if (collection.endDate && new Date(collection.endDate) < now) {
      return false;
    }
    return collection.status === 'active';
  });
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useArchivedCollections(): Collection[] {
  return collectionsData.archived as Collection[];
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useJournalArticles(): JournalArticle[] {
  return journalData.articles as JournalArticle[];
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useFeaturedArticle(): JournalArticle {
  return journalData.featured as JournalArticle;
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useRituals(): Ritual[] {
  return discoveryData.rituals as Ritual[];
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useMoods(): Mood[] {
  return discoveryData.moods as Mood[];
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useStories(): Story[] {
  return discoveryData.stories as Story[];
}

/**
 * BACKEND HANDOFF: Replace with API call
 */
export function useLookbookEntries(): LookbookEntry[] {
  return lookbookData.entries as LookbookEntry[];
}

/**
 * BACKEND HANDOFF: Replace with API call
 * Simulates fetching products by discovery filter
 */
export function useProductsByDiscovery(
  type: 'ritual' | 'mood' | 'story',
  id: string
): Product[] {
  const products = useProducts();
  return products.filter(p => {
    switch (type) {
      case 'ritual':
        return p.ritual === id;
      case 'mood':
        return p.mood === id;
      case 'story':
        return p.story === id;
      default:
        return false;
    }
  });
}
