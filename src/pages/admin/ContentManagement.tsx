import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, Film, Newspaper, Plus, Eye, Edit, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const contentItems = [
  { id: "c-1", title: "Spring Summer 2025 Campaign", type: "Editorial", status: "published", author: "Claire Fontaine", updatedAt: "2025-03-05", views: 2340 },
  { id: "c-2", title: "Radiance Serum — Ingredient Story", type: "Article", status: "published", author: "Raj Mehta", updatedAt: "2025-03-04", views: 1820 },
  { id: "c-3", title: "Behind the Atelier: Silk Weaving", type: "Video", status: "draft", author: "Claire Fontaine", updatedAt: "2025-03-03", views: 0 },
  { id: "c-4", title: "Sustainability Report 2025", type: "Page", status: "review", author: "Tom Baker", updatedAt: "2025-03-02", views: 0 },
  { id: "c-5", title: "Gift Guide: Valentine's Day", type: "Editorial", status: "archived", author: "Claire Fontaine", updatedAt: "2025-02-15", views: 5120 },
  { id: "c-6", title: "Lumière Candle — Care Guide", type: "Article", status: "published", author: "Raj Mehta", updatedAt: "2025-03-01", views: 980 },
  { id: "c-7", title: "New Arrivals Lookbook", type: "Gallery", status: "draft", author: "Claire Fontaine", updatedAt: "2025-03-06", views: 0 },
];

const statusColor: Record<string, string> = {
  published: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  draft: "bg-muted text-muted-foreground border-border",
  review: "bg-amber-500/10 text-amber-700 border-amber-200",
  archived: "bg-muted/50 text-muted-foreground/60 border-border",
};

const typeIcon: Record<string, typeof FileText> = {
  Editorial: Newspaper,
  Article: FileText,
  Video: Film,
  Page: FileText,
  Gallery: Image,
};

export default function ContentManagement() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Content Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage all editorial content, articles, pages, and media.</p>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" /> New Content
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Published", count: contentItems.filter(c => c.status === "published").length, icon: Eye },
            { label: "Drafts", count: contentItems.filter(c => c.status === "draft").length, icon: Edit },
            { label: "In Review", count: contentItems.filter(c => c.status === "review").length, icon: Clock },
            { label: "Total Views", count: contentItems.reduce((s, c) => s + c.views, 0).toLocaleString(), icon: Eye },
          ].map(stat => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-semibold">{stat.count}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="review">In Review</TabsTrigger>
          </TabsList>

          {["all", "published", "draft", "review"].map(tab => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
                          <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Type</th>
                          <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Author</th>
                          <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                          <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Views</th>
                          <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contentItems
                          .filter(c => tab === "all" || c.status === tab)
                          .map(item => {
                            const Icon = typeIcon[item.type] || FileText;
                            return (
                              <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 cursor-pointer">
                                <td className="p-3 font-medium flex items-center gap-2">
                                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                                  <span className="truncate max-w-[200px]">{item.title}</span>
                                </td>
                                <td className="p-3 hidden sm:table-cell text-muted-foreground">{item.type}</td>
                                <td className="p-3 hidden md:table-cell text-muted-foreground">{item.author}</td>
                                <td className="p-3">
                                  <Badge variant="outline" className={statusColor[item.status]}>{item.status}</Badge>
                                </td>
                                <td className="p-3 hidden lg:table-cell text-muted-foreground">{item.views.toLocaleString()}</td>
                                <td className="p-3 hidden md:table-cell text-muted-foreground">{item.updatedAt}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
}
