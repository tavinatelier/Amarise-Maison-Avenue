/**
 * SEO SERVICE
 * Manages meta tags, sitemap generation, and SEO configuration
 * 
 * BACKEND HANDOFF: Replace with CMS-driven SEO API
 * - GET /api/seo/pages → All page SEO configs
 * - PUT /api/seo/pages/:path → Update page SEO
 * - GET /api/seo/sitemap → Dynamic sitemap
 * - GET /api/seo/robots → Robots.txt config
 */

export interface PageSEO {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  indexable: boolean;
  canonical?: string;
  lastModified: string;
}

const defaultPages: PageSEO[] = [
  { path: '/', title: 'AMARISÉ — Quiet Luxury for the Modern Ritual', description: 'Discover the world of AMARISÉ. Beauty, Atelier, and Lifestyle objects crafted with intention.', keywords: ['luxury', 'beauty', 'atelier', 'lifestyle'], indexable: true, lastModified: new Date().toISOString() },
  { path: '/beauty', title: 'Beauty — AMARISÉ', description: 'Ritualistic beauty formulated with rare botanicals and time-honored techniques.', keywords: ['luxury beauty', 'skincare', 'lip ritual'], indexable: true, lastModified: new Date().toISOString() },
  { path: '/atelier', title: 'Atelier — AMARISÉ', description: 'Where fabric becomes poetry. Heritage craft meets contemporary vision.', keywords: ['luxury fashion', 'atelier', 'silk dress'], indexable: true, lastModified: new Date().toISOString() },
  { path: '/lifestyle', title: 'Lifestyle — AMARISÉ', description: 'Objects of meaning that elevate the everyday into the extraordinary.', keywords: ['luxury lifestyle', 'home', 'candles', 'vessels'], indexable: true, lastModified: new Date().toISOString() },
  { path: '/journal', title: 'Journal — AMARISÉ', description: 'Stories, perspectives, and reflections from the world of AMARISÉ.', keywords: ['luxury journal', 'editorial', 'stories'], indexable: true, lastModified: new Date().toISOString() },
  { path: '/discover', title: 'Discover — AMARISÉ', description: 'Navigate by ritual, mood, or story through our universe.', keywords: ['discover', 'ritual', 'mood'], indexable: true, lastModified: new Date().toISOString() },
  { path: '/archive', title: 'Archive — AMARISÉ', description: 'Legacy pieces from past collections. No longer available for purchase.', keywords: ['archive', 'legacy', 'past collections'], indexable: true, lastModified: new Date().toISOString() },
];

const STORAGE_KEY = 'amarise-seo-pages';

function getStoredPages(): PageSEO[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultPages;
  } catch {
    return defaultPages;
  }
}

function savePages(pages: PageSEO[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}

/** BACKEND HANDOFF: GET /api/seo/pages */
export async function getAllPageSEO(): Promise<PageSEO[]> {
  await new Promise(r => setTimeout(r, 100));
  return getStoredPages();
}

/** BACKEND HANDOFF: GET /api/seo/pages/:path */
export async function getPageSEO(path: string): Promise<PageSEO | undefined> {
  const pages = getStoredPages();
  return pages.find(p => p.path === path);
}

/** BACKEND HANDOFF: PUT /api/seo/pages/:path */
export async function updatePageSEO(path: string, updates: Partial<PageSEO>): Promise<PageSEO> {
  const pages = getStoredPages();
  const idx = pages.findIndex(p => p.path === path);
  if (idx >= 0) {
    pages[idx] = { ...pages[idx], ...updates, lastModified: new Date().toISOString() };
  } else {
    pages.push({ path, title: '', description: '', keywords: [], indexable: true, lastModified: new Date().toISOString(), ...updates });
  }
  savePages(pages);
  return pages[idx >= 0 ? idx : pages.length - 1];
}

/** BACKEND HANDOFF: GET /api/seo/sitemap */
export async function generateSitemap(): Promise<string> {
  const pages = getStoredPages().filter(p => p.indexable);
  const base = 'https://amarise.com';
  const urls = pages.map(p => `  <url>\n    <loc>${base}${p.path}</loc>\n    <lastmod>${p.lastModified.split('T')[0]}</lastmod>\n    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}
