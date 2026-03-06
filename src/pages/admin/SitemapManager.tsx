import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Map, Download, RefreshCw, Globe, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SitemapEntry {
  url: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  lastmod: string;
  included: boolean;
}

const initialEntries: SitemapEntry[] = [
  { url: "/", changefreq: "daily", priority: 1.0, lastmod: "2025-03-06", included: true },
  { url: "/beauty", changefreq: "weekly", priority: 0.9, lastmod: "2025-03-05", included: true },
  { url: "/atelier", changefreq: "weekly", priority: 0.9, lastmod: "2025-03-04", included: true },
  { url: "/lifestyle", changefreq: "weekly", priority: 0.9, lastmod: "2025-03-03", included: true },
  { url: "/journal", changefreq: "daily", priority: 0.8, lastmod: "2025-03-06", included: true },
  { url: "/discover", changefreq: "weekly", priority: 0.7, lastmod: "2025-03-01", included: true },
  { url: "/archive", changefreq: "monthly", priority: 0.5, lastmod: "2025-02-28", included: true },
  { url: "/about-amarise", changefreq: "monthly", priority: 0.6, lastmod: "2025-02-15", included: true },
  { url: "/values-sustainability", changefreq: "monthly", priority: 0.6, lastmod: "2025-02-10", included: true },
  { url: "/contact", changefreq: "yearly", priority: 0.4, lastmod: "2025-01-01", included: true },
  { url: "/beauty/signature-lips", changefreq: "monthly", priority: 0.8, lastmod: "2025-03-01", included: true },
  { url: "/beauty/radiance-serum", changefreq: "monthly", priority: 0.8, lastmod: "2025-03-01", included: true },
  { url: "/atelier/elan-silk-dress", changefreq: "monthly", priority: 0.8, lastmod: "2025-02-20", included: true },
  { url: "/lifestyle/calma-vessel", changefreq: "monthly", priority: 0.7, lastmod: "2025-02-15", included: true },
  { url: "/lifestyle/lumiere-candle", changefreq: "monthly", priority: 0.7, lastmod: "2025-02-15", included: true },
  { url: "/privacy", changefreq: "yearly", priority: 0.2, lastmod: "2025-01-01", included: false },
  { url: "/terms", changefreq: "yearly", priority: 0.2, lastmod: "2025-01-01", included: false },
];

export default function SitemapManager() {
  const [entries, setEntries] = useState(initialEntries);

  const toggleEntry = (url: string) => {
    setEntries(prev => prev.map(e => e.url === url ? { ...e, included: !e.included } : e));
  };

  const updateFrequency = (url: string, freq: SitemapEntry["changefreq"]) => {
    setEntries(prev => prev.map(e => e.url === url ? { ...e, changefreq: freq } : e));
  };

  const generateSitemap = () => {
    const included = entries.filter(e => e.included);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${included.map(e => `  <url>
    <loc>https://amarise.com${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`).join("\n")}
</urlset>`;
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sitemap exported successfully");
  };

  const includedCount = entries.filter(e => e.included).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Sitemap Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">Configure sitemap entries and export XML for search engines.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.success("Sitemap regenerated")}>
              <RefreshCw className="h-4 w-4" /> Regenerate
            </Button>
            <Button size="sm" className="gap-2" onClick={generateSitemap}>
              <Download className="h-4 w-4" /> Export XML
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card><CardContent className="p-4"><p className="text-2xl font-semibold">{includedCount}</p><p className="text-xs text-muted-foreground">URLs in Sitemap</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-2xl font-semibold">{entries.length - includedCount}</p><p className="text-xs text-muted-foreground">Excluded</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-2xl font-semibold">{entries.length}</p><p className="text-xs text-muted-foreground">Total URLs</p></CardContent></Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium text-muted-foreground">Include</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">URL</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Frequency</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Priority</th>
                    <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Last Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(entry => (
                    <tr key={entry.url} className={`border-b border-border/50 ${!entry.included ? "opacity-50" : ""}`}>
                      <td className="p-3"><Switch checked={entry.included} onCheckedChange={() => toggleEntry(entry.url)} /></td>
                      <td className="p-3 font-mono text-xs">{entry.url}</td>
                      <td className="p-3 hidden sm:table-cell">
                        <Select value={entry.changefreq} onValueChange={(v) => updateFrequency(entry.url, v as SitemapEntry["changefreq"])}>
                          <SelectTrigger className="h-7 text-xs w-24"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {["daily", "weekly", "monthly", "yearly"].map(f => (
                              <SelectItem key={f} value={f}>{f}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3 hidden md:table-cell">{entry.priority.toFixed(1)}</td>
                      <td className="p-3 hidden md:table-cell text-muted-foreground">{entry.lastmod}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
