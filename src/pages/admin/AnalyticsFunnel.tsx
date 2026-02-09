/**
 * ANALYTICS FUNNEL PAGE
 * Conversion funnel visualization
 * 
 * BACKEND HANDOFF: Replace mock data with analytics.service.ts API calls
 */

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, ShoppingCart, CreditCard, ArrowRight } from "lucide-react";
import analyticsData from "@/data/mock/analytics.json";

export default function AnalyticsFunnel() {
  const [timeRange, setTimeRange] = useState("Last 30 days");
  const { funnel } = analyticsData;

  const maxValue = funnel.stages[0].value;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Conversion Funnel</h1>
            <p className="text-muted-foreground mt-1">
              Analyze customer journey and drop-off points
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
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

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Overall Conversion"
            value={`${funnel.conversionRate}%`}
            subtitle="Sessions to orders"
            icon={TrendingDown}
          />
          <MetricCard
            title="Cart Abandonment"
            value={`${funnel.cartAbandonmentRate}%`}
            subtitle="Left at checkout"
            icon={ShoppingCart}
          />
          <MetricCard
            title="Checkout Abandonment"
            value={`${funnel.checkoutAbandonmentRate}%`}
            subtitle="Left before payment"
            icon={CreditCard}
          />
        </div>

        {/* Funnel Visualization */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Customer Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {funnel.stages.map((stage, index) => {
              const percentage = (stage.value / maxValue) * 100;
              const isLast = index === funnel.stages.length - 1;

              return (
                <div key={stage.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{stage.name}</span>
                      {stage.dropOff > 0 && (
                        <span className="text-sm text-rose-500">
                          -{stage.dropOff}% drop-off
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium tabular-nums">
                      {stage.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress value={percentage} className="h-10" />
                    <div 
                      className="absolute inset-y-0 left-0 flex items-center pl-3"
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-xs font-medium text-primary-foreground">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  {!isLast && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              {Object.entries(analyticsData.trafficSources).map(([source, data]) => (
                <div key={source} className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-light">{data.sessions.toLocaleString()}</p>
                  <p className="text-sm font-medium capitalize mt-1">{source}</p>
                  <p className="text-xs text-muted-foreground">
                    {data.conversionRate}% conversion
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(analyticsData.deviceBreakdown).map(([device, data]) => (
                <div key={device} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium capitalize">{device}</span>
                    <span className="text-sm text-muted-foreground">{data.percentage}%</span>
                  </div>
                  <Progress value={data.percentage} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{data.sessions.toLocaleString()} sessions</span>
                    <span>{data.conversionRate}% CVR</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
