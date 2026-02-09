/**
 * ANALYTICS COUNTRIES PAGE
 * Country-wise performance analytics
 * 
 * BACKEND HANDOFF: Replace mock data with analytics.service.ts API calls
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { MetricCard } from "@/components/admin/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Globe, TrendingUp, TrendingDown } from "lucide-react";
import analyticsData from "@/data/mock/analytics.json";

export default function AnalyticsCountries() {
  const [timeRange, setTimeRange] = useState("Last 30 days");
  const [compareMode, setCompareMode] = useState("none");

  const { countryPerformance } = analyticsData;
  const totalRevenue = countryPerformance.reduce((sum, c) => sum + c.revenue, 0);
  const totalSessions = countryPerformance.reduce((sum, c) => sum + c.sessions, 0);
  const avgConversion = countryPerformance.reduce((sum, c) => sum + c.conversionRate, 0) / countryPerformance.length;

  const columns = [
    {
      key: "country",
      label: "Country",
      render: (country: typeof countryPerformance[0]) => (
        <div className="flex items-center gap-3">
          <span className="text-lg">{getFlagEmoji(country.countryCode)}</span>
          <span className="font-medium">{country.country}</span>
        </div>
      ),
    },
    {
      key: "sessions",
      label: "Sessions",
      render: (country: typeof countryPerformance[0]) => (
        <span className="tabular-nums">{country.sessions.toLocaleString()}</span>
      ),
    },
    {
      key: "conversionRate",
      label: "Conversion",
      render: (country: typeof countryPerformance[0]) => {
        const isAboveAvg = country.conversionRate > avgConversion;
        return (
          <span className={isAboveAvg ? "text-emerald-600 font-medium" : ""}>
            {country.conversionRate}%
          </span>
        );
      },
    },
    {
      key: "avgOrderValue",
      label: "Avg Order Value",
      render: (country: typeof countryPerformance[0]) => (
        <span className="tabular-nums">€{country.avgOrderValue}</span>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (country: typeof countryPerformance[0]) => (
        <span className="font-medium tabular-nums">€{country.revenue.toLocaleString()}</span>
      ),
    },
    {
      key: "topProduct",
      label: "Top Product",
      render: (country: typeof countryPerformance[0]) => (
        <span className="text-sm text-muted-foreground">{country.topProduct}</span>
      ),
    },
    {
      key: "growth",
      label: "Growth",
      render: (country: typeof countryPerformance[0]) => (
        <div className="flex items-center gap-1">
          {country.growth > 0 ? (
            <>
              <TrendingUp className="h-3 w-3 text-emerald-600" />
              <span className="text-emerald-600">+{country.growth}%</span>
            </>
          ) : (
            <>
              <TrendingDown className="h-3 w-3 text-rose-600" />
              <span className="text-rose-600">{country.growth}%</span>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Country Performance</h1>
            <p className="text-muted-foreground mt-1">
              Regional metrics and growth analysis
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={compareMode} onValueChange={setCompareMode}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Compare" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Comparison</SelectItem>
                <SelectItem value="previous">Previous Period</SelectItem>
                <SelectItem value="year">Year over Year</SelectItem>
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

        {/* Summary Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={`€${totalRevenue.toLocaleString()}`}
            subtitle="All countries"
            icon={Globe}
          />
          <MetricCard
            title="Total Sessions"
            value={totalSessions.toLocaleString()}
            subtitle="All countries"
          />
          <MetricCard
            title="Avg Conversion"
            value={`${avgConversion.toFixed(1)}%`}
            subtitle="Cross-country"
          />
          <MetricCard
            title="Markets"
            value={countryPerformance.length.toString()}
            subtitle="Active countries"
          />
        </div>

        {/* Revenue Share */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Revenue by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryPerformance.map((country) => {
                const share = (country.revenue / totalRevenue) * 100;
                return (
                  <div key={country.countryCode} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{getFlagEmoji(country.countryCode)}</span>
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={country.growth > 10 ? "default" : "secondary"} className="text-xs">
                          {country.growth > 0 ? "+" : ""}{country.growth}%
                        </Badge>
                        <span className="text-sm font-medium w-24 text-right">
                          €{country.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Progress value={share} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Countries Table */}
        <DataTable
          columns={columns}
          data={countryPerformance.map((c) => ({ ...c, id: c.countryCode }))}
        />
      </div>
    </AdminLayout>
  );
}

function getFlagEmoji(countryCode: string): string {
  const flags: Record<string, string> = {
    FR: "🇫🇷",
    DE: "🇩🇪",
    GB: "🇬🇧",
    IT: "🇮🇹",
    ES: "🇪🇸",
    NL: "🇳🇱",
  };
  return flags[countryCode] || "🌍";
}
