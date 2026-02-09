import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/admin/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Receipt,
  Download,
  Globe,
} from "lucide-react";
import financeData from "@/data/mock/finance.json";

export default function Finance() {
  const [period, setPeriod] = useState("2024-01");

  const overview = financeData.overview;
  const byCountry = financeData.byCountry;
  const paymentMethods = financeData.paymentMethods;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Finance</h1>
            <p className="text-muted-foreground mt-1">
              Revenue, taxes, and financial insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-01">January 2024</SelectItem>
                <SelectItem value="2023-12">December 2023</SelectItem>
                <SelectItem value="2023-11">November 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Gross Revenue"
            value={formatCurrency(overview.grossRevenue)}
            icon={<DollarSign className="h-5 w-5" />}
            trend="up"
            trendValue="+12.5%"
          />
          <MetricCard
            label="Net Revenue"
            value={formatCurrency(overview.netRevenue)}
            icon={<TrendingUp className="h-5 w-5" />}
            trend="up"
            trendValue="+15.2%"
          />
          <MetricCard
            label="Refunds"
            value={formatCurrency(overview.refunds)}
            icon={<TrendingDown className="h-5 w-5" />}
          />
          <MetricCard
            label="Taxes Collected"
            value={formatCurrency(overview.taxesCollected)}
            icon={<Receipt className="h-5 w-5" />}
          />
        </div>

        <Tabs defaultValue="countries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="countries">By Country</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Revenue by Country
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {byCountry.map((country) => (
                    <div key={country.countryCode} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                          {country.countryCode}
                        </div>
                        <div>
                          <p className="font-medium">{country.country}</p>
                          <p className="text-sm text-muted-foreground">
                            {country.orders} orders • {country.taxRate}% VAT
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(country.grossRevenue)}</p>
                        <p className="text-sm text-muted-foreground">
                          Net: {formatCurrency(country.netRevenue)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">AOV</p>
                        <p className="font-medium">{formatCurrency(country.avgOrderValue)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Taxes</p>
                        <p className="font-medium">{formatCurrency(country.taxesCollected)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment Method Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(paymentMethods).map(([method, data]) => (
                    <div key={method} className="flex items-center gap-4">
                      <div className="w-32 capitalize font-medium">{method}</div>
                      <div className="flex-1">
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${data.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-24 text-right">
                        <p className="font-medium">{data.percentage.toFixed(1)}%</p>
                      </div>
                      <div className="w-32 text-right">
                        <p className="font-medium">{formatCurrency(data.volume)}</p>
                        <p className="text-xs text-muted-foreground">{data.transactions} txns</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Deductions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Refunds</span>
                  <span className="font-medium text-red-600">-{formatCurrency(overview.refunds)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discounts Applied</span>
                  <span className="font-medium text-red-600">-{formatCurrency(overview.discountsApplied)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-medium">Total Deductions</span>
                  <span className="font-medium text-red-600">
                    -{formatCurrency(overview.refunds + overview.discountsApplied)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Additional Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping Revenue</span>
                  <span className="font-medium text-green-600">+{formatCurrency(overview.shippingRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gift Wrapping</span>
                  <span className="font-medium text-green-600">+{formatCurrency(1250)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-medium">Total Additional</span>
                  <span className="font-medium text-green-600">
                    +{formatCurrency(overview.shippingRevenue + 1250)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}