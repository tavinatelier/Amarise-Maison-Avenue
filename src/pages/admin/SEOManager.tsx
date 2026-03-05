/**
 * SEO MANAGEMENT — Admin page for managing meta tags, sitemap, and OG data
 * BACKEND HANDOFF: Replace localStorage with CMS API for meta management
 */

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Search, Globe, FileText, Download, RefreshCw } from "lucide-react";
import { useAdminStore } from "@/stores/adminStore";
import { generateSitemapEntries } from "@/lib/generate-sitemap";

interface PageSEO {
  id: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  indexable: boolean;
}

const STORAGE_KEY = "amarise-seo-pages";

const defaultPages: PageSEO[] = [
  { id: "seo-home", path: "/", title: "Home", metaTitle: "AMARISÉ — Where Beauty Meets Intention", metaDescription: "Discover luxury fashion, beauty rituals, and lifestyle objects from AMARISÉ Maison Avenue.", keywords: "luxury fashion, beauty rituals, lifestyle objects, AMARISÉ", ogTitle: "AMARISÉ Maison Avenue", ogDescription: "Where Beauty Meets Intention", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/", indexable: true },
  { id: "seo-beauty", path: "/beauty", title: "Beauty", metaTitle: "Beauty Collection | AMARISÉ", metaDescription: "Explore curated beauty rituals, skincare serums, and lip collections crafted with intention.", keywords: "luxury beauty, skincare, lip ritual, serum", ogTitle: "AMARISÉ Beauty", ogDescription: "Curated beauty rituals", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/beauty", indexable: true },
  { id: "seo-atelier", path: "/atelier", title: "Atelier", metaTitle: "Atelier Collection | AMARISÉ", metaDescription: "Handcrafted garments from our atelier. Silk dresses, tailored coats, and ready-to-wear luxury.", keywords: "atelier, silk dress, luxury fashion, haute couture", ogTitle: "AMARISÉ Atelier", ogDescription: "Handcrafted luxury garments", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/atelier", indexable: true },
  { id: "seo-lifestyle", path: "/lifestyle", title: "Lifestyle", metaTitle: "Lifestyle Objects | AMARISÉ", metaDescription: "Candles, vessels, and accessories designed for intentional living.", keywords: "luxury lifestyle, candles, home objects, accessories", ogTitle: "AMARISÉ Lifestyle", ogDescription: "Objects for intentional living", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/lifestyle", indexable: true },
  { id: "seo-journal", path: "/journal", title: "Journal", metaTitle: "Journal | AMARISÉ", metaDescription: "Stories, essays, and editorial content from the world of AMARISÉ.", keywords: "luxury journal, editorial, fashion stories", ogTitle: "AMARISÉ Journal", ogDescription: "Stories from the maison", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/journal", indexable: true },
  { id: "seo-about", path: "/about-amarise", title: "About", metaTitle: "About AMARISÉ — Our Story", metaDescription: "Learn about the philosophy, craftsmanship, and values behind AMARISÉ Maison Avenue.", keywords: "about AMARISÉ, luxury brand story, craftsmanship", ogTitle: "About AMARISÉ", ogDescription: "Our philosophy and story", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/about-amarise", indexable: true },
  { id: "seo-discover", path: "/discover", title: "Discover", metaTitle: "Discover | AMARISÉ", metaDescription: "Explore curated moods, rituals, and stories from AMARISÉ.", keywords: "discover luxury, curated moods, rituals", ogTitle: "Discover AMARISÉ", ogDescription: "Curated experiences", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/discover", indexable: true },
  { id: "seo-archive", path: "/archive", title: "Archive", metaTitle: "Archive | AMARISÉ", metaDescription: "Browse past collections and limited edition pieces from the AMARISÉ archive.", keywords: "archive, past collections, limited edition", ogTitle: "AMARISÉ Archive", ogDescription: "Past collections", ogImage: "/placeholder.svg", canonical: "https://amarisemaisonavenue.com/archive", indexable: true },
];

function loadPages(): PageSEO[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return defaultPages;
}

export default function SEOManager() {
  const [pages, setPages] = useState<PageSEO[]>(loadPages);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const addAudit = useAdminStore((s) => s.addAudit);
  const sitemapEntries = generateSitemapEntries();

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(pages)); }, [pages]);

  const updatePage = (id: string, updates: Partial<PageSEO>) => {
    setPages((prev) => prev.map((p) => p.id === id ? { ...p, ...updates } : p));
    addAudit("SEO metadata updated", "SEO", `Page ${id}`);
  };

  const exportSitemap = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((e) => `  <url><loc>${e.loc}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`).join("\n")}
</urlset>`;
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "sitemap.xml"; a.click();
    addAudit("Sitemap exported", "SEO", `${sitemapEntries.length} URLs`);
  };

  const filtered = pages.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.path.includes(search));

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">SEO Management</h1>
            <p className="text-muted-foreground mt-1">{sitemapEntries.length} indexed URLs</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={exportSitemap}>
              <Download className="h-4 w-4" /> Export Sitemap
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-border rounded-sm p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Pages</p>
            <p className="text-2xl font-light mt-1">{sitemapEntries.length}</p>
          </div>
          <div className="border border-border rounded-sm p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Managed SEO</p>
            <p className="text-2xl font-light mt-1">{pages.length}</p>
          </div>
          <div className="border border-border rounded-sm p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Indexable</p>
            <p className="text-2xl font-light mt-1">{pages.filter((p) => p.indexable).length}</p>
          </div>
          <div className="border border-border rounded-sm p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">No-Index</p>
            <p className="text-2xl font-light mt-1">{pages.filter((p) => !p.indexable).length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search pages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {/* Pages List */}
        <div className="space-y-4">
          {filtered.map((page) => (
            <div key={page.id} className="border border-border rounded-sm">
              <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setEditing(editing === page.id ? null : page.id)}>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{page.title}</p>
                    <p className="text-xs text-muted-foreground">{page.path}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={page.indexable ? "Indexed" : "No-Index"} variant={page.indexable ? "success" : "warning"} />
                  <span className="text-xs text-muted-foreground">{page.metaTitle.length}/60 chars</span>
                </div>
              </div>
              {editing === page.id && (
                <div className="border-t border-border p-4 space-y-4 bg-muted/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Meta Title</label>
                      <Input value={page.metaTitle} onChange={(e) => updatePage(page.id, { metaTitle: e.target.value })} />
                      <p className="text-xs text-muted-foreground">{page.metaTitle.length}/60 characters</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Canonical URL</label>
                      <Input value={page.canonical} onChange={(e) => updatePage(page.id, { canonical: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Meta Description</label>
                    <Textarea value={page.metaDescription} onChange={(e) => updatePage(page.id, { metaDescription: e.target.value })} />
                    <p className="text-xs text-muted-foreground">{page.metaDescription.length}/160 characters</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Keywords</label>
                    <Input value={page.keywords} onChange={(e) => updatePage(page.id, { keywords: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">OG Title</label>
                      <Input value={page.ogTitle} onChange={(e) => updatePage(page.id, { ogTitle: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">OG Image URL</label>
                      <Input value={page.ogImage} onChange={(e) => updatePage(page.id, { ogImage: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">OG Description</label>
                    <Textarea value={page.ogDescription} onChange={(e) => updatePage(page.id, { ogDescription: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant={page.indexable ? "outline" : "default"} size="sm" onClick={() => updatePage(page.id, { indexable: !page.indexable })}>
                      {page.indexable ? "Set No-Index" : "Set Indexable"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
