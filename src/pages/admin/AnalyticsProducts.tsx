/**
 * ANALYTICS PRODUCTS PAGE
 * Product performance analytics
 * 
 * BACKEND HANDOFF: Replace mock data with analytics.service.ts API calls
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import analyticsData from "@/data/mock/analytics.json";

export default function AnalyticsProducts() {
  const [timeRange, setTimeRange] = useState("Last 30 days");
  const [sortBy, setSortBy] = useState("revenue");

  const sortedProducts = [...analyticsData.productPerformance].sort((a, b) => {
    if (sortBy === "revenue") return b.revenue - a.revenue;
    if (sortBy === "views") return b.views - a.views;
    if (sortBy === "conversion") return b.conversionRate - a.conversionRate;
    return 0;
  });

  const totalRevenue = sortedProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalViews = sortedProducts.reduce((sum, p) => sum + p.views, 0);
  const avgConversion = sortedProducts.reduce((sum, p) => sum + p.conversionRate, 0) / sortedProducts.length;

  const columns = [
    {
      key: "title",
      label: "Product",
      render: (product: typeof sortedProducts[0]) => (
        <div>
          <p className="font-medium">{product.title}</p>
          <Badge variant="secondary" className="text-xs mt-1">
            {product.category}
          </Badge>
        </div>
      ),
    },
    {
      key: "views",
      label: "Views",
      render: (product: typeof sortedProducts[0]) => (
        <span className="tabular-nums">{product.views.toLocaleString()}</span>
      ),
    },
    {
      key: "addToCart",
      label: "Add to Cart",
      render: (product: typeof sortedProducts[0]) => (
        <div>
          <span className="tabular-nums">{product.addToCart.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground ml-1">
            ({((product.addToCart / product.views) * 100).toFixed(1)}%)
          </span>
        </div>
      ),
    },
    {
      key: "purchases",
      label: "Purchases",
      render: (product: typeof sortedProducts[0]) => (
        <span className="tabular-nums">{product.purchases.toLocaleString()}</span>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (product: typeof sortedProducts[0]) => (
        <span className="font-medium tabular-nums">€{product.revenue.toLocaleString()}</span>
      ),
    },
    {
      key: "conversionRate",
      label: "Conversion",
      render: (product: typeof sortedProducts[0]) => {
        const isHigh = product.conversionRate > avgConversion;
        return (
          <div className="flex items-center gap-1">
            <span className={`font-medium ${isHigh ? "text-emerald-600" : "text-rose-600"}`}>
              {product.conversionRate}%
            </span>
            {isHigh ? (
              <TrendingUp className="h-3 w-3 text-emerald-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-rose-600" />
            )}
          </div>
        );
      },
    },
    {
      key: "avgRating",
      label: "Rating",
      render: (product: typeof sortedProducts[0]) => (
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-sm">{product.avgRating}</span>
        </div>
      ),
    },
    {
      key: "returnRate",
      label: "Returns",
      render: (product: typeof sortedProducts[0]) => (
        <span className={`text-sm ${product.returnRate > 5 ? "text-rose-600" : "text-muted-foreground"}`}>
          {product.returnRate}%
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Product Performance</h1>
            <p className="text-muted-foreground mt-1">
              Analyze product metrics and conversion rates
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Top Revenue</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
                <SelectItem value="conversion">Best Conversion</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {analyticsData.timeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-light mt-1">€{totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-3xl font-light mt-1">{totalViews.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Avg Conversion</p>
              <p className="text-3xl font-light mt-1">{avgConversion.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Distribution */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedProducts.map((product) => {
              const percentage = (product.revenue / totalRevenue) * 100;
              return (
                <div key={product.productId} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{product.title}</span>
                    <span className="font-medium">€{product.revenue.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Products Table */}
        <DataTable
          columns={columns}
          data={sortedProducts.map((p) => ({ ...p, id: p.productId }))}
        />
      </div>
    </AdminLayout>
  );
}
