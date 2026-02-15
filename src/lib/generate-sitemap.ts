/**
 * Dynamic Sitemap Generator
 * Generates a comprehensive sitemap from catalog data.
 * In production, this would run at build time or as an edge function.
 */

import { pillars, sampleProducts } from "@/data/catalog-hierarchy";

interface SitemapEntry {
  loc: string;
  changefreq: string;
  priority: number;
  lastmod?: string;
}

const BASE_URL = "https://amarisemaisonavenue.com";

export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // ── Static pages ──
  const staticPages: Array<[string, string, number]> = [
    ["/", "weekly", 1.0],
    ["/about-amarise", "monthly", 0.7],
    ["/journal", "weekly", 0.8],
    ["/discover", "weekly", 0.7],
    ["/contact", "monthly", 0.5],
    ["/values-sustainability", "monthly", 0.6],
    ["/customer-care", "monthly", 0.5],
    ["/shipping-returns", "monthly", 0.5],
    ["/size-guide", "monthly", 0.5],
    ["/beauty", "weekly", 0.8],
    ["/atelier", "weekly", 0.8],
    ["/lifestyle", "weekly", 0.8],
    ["/archive", "monthly", 0.4],
    ["/press", "monthly", 0.6],
    ["/craftsmanship", "monthly", 0.7],
    ["/care-guides", "monthly", 0.6],
    ["/new-arrivals", "daily", 0.9],
    ["/best-sellers", "weekly", 0.9],
  ];

  staticPages.forEach(([path, changefreq, priority]) => {
    entries.push({ loc: `${BASE_URL}${path}`, changefreq, priority });
  });

  // ── Pillar pages ──
  pillars.forEach((pillar) => {
    entries.push({
      loc: `${BASE_URL}/shop/${pillar.slug}`,
      changefreq: "weekly",
      priority: 0.9,
    });

    // ── Family pages ──
    pillar.families.forEach((family) => {
      entries.push({
        loc: `${BASE_URL}/shop/${pillar.slug}/${family.slug}`,
        changefreq: "weekly",
        priority: 0.8,
      });
    });
  });

  // ── Product pages ──
  sampleProducts
    .filter((p) => !p.isDraft)
    .forEach((product) => {
      entries.push({
        loc: `${BASE_URL}/shop/${product.pillarSlug}/${product.familySlug}/${product.slug}`,
        changefreq: "weekly",
        priority: 0.7,
        lastmod: product.updatedAt,
      });
    });

  // ── Editorial pages ──
  const editorialPaths = [
    "/beauty/signature-lips",
    "/beauty/radiance-serum",
    "/beauty/rituals",
    "/beauty/ingredients-philosophy",
    "/atelier/collections",
    "/atelier/lookbook",
    "/atelier/craft-design",
    "/atelier/elan-silk-dress",
    "/lifestyle/accessories",
    "/lifestyle/objects",
    "/lifestyle/calma-vessel",
    "/lifestyle/lumiere-candle",
  ];

  editorialPaths.forEach((path) => {
    entries.push({ loc: `${BASE_URL}${path}`, changefreq: "monthly", priority: 0.6 });
  });

  // ── Legal pages (low priority, excluded from active crawling focus) ──
  ["/privacy", "/terms", "/cookies", "/refund-policy", "/authenticity"].forEach((path) => {
    entries.push({ loc: `${BASE_URL}${path}`, changefreq: "yearly", priority: 0.3 });
  });

  return entries;
}

export function generateSitemapXML(): string {
  const entries = generateSitemapEntries();
  const today = new Date().toISOString().split("T")[0];

  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod || today}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}
