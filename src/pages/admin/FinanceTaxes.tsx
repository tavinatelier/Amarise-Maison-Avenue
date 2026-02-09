import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Receipt, Globe, Percent, AlertCircle } from "lucide-react";
import financeData from "@/data/mock/finance.json";

export default function FinanceTaxes() {
  const navigate = useNavigate();
  const taxRates = financeData.taxRates;
  const byCountry = financeData.byCountry;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);

  const totalTaxes = byCountry.reduce((sum, c) => sum + c.taxesCollected, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight">Tax Management</h1>
            <p className="text-muted-foreground mt-1">
              VAT rates and tax collection by country
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/admin/finance")}>
            Back to Finance
          </Button>
        </div>

        {/* Summary */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Taxes Collected (Current Period)</p>
                  <p className="text-3xl font-light">{formatCurrency(totalTaxes)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-2xl font-light">{byCountry.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tax Rates by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Percent className="h-4 w-4" />
              VAT Rates by Country
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(taxRates).map(([code, rates]) => {
                const countryData = byCountry.find((c) => c.countryCode === code);
                const countryNames: Record<string, string> = {
                  FR: "France",
                  DE: "Germany",
                  GB: "United Kingdom",
                  IT: "Italy",
                  ES: "Spain",
                  NL: "Netherlands",
                };

                return (
                  <div key={code} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                        {code}
                      </div>
                      <div>
                        <p className="font-medium">{countryNames[code] || code}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Standard: {rates.standard}%
                          </span>
                          {"reduced" in rates && rates.reduced && (
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              Reduced: {rates.reduced}%
                            </span>
                          )}
                          {"superReduced" in rates && (rates as any).superReduced && (
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              Super Reduced: {(rates as any).superReduced}%
                            </span>
                          )}
                          {"zero" in rates && (rates as any).zero !== undefined && (
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              Zero Rate: {(rates as any).zero}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {countryData && (
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(countryData.taxesCollected)}</p>
                        <p className="text-sm text-muted-foreground">collected</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tax Collection by Country */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Tax Collection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {byCountry.map((country) => {
                const percentage = (country.taxesCollected / totalTaxes) * 100;
                return (
                  <div key={country.countryCode} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{country.country}</span>
                      <span>
                        {formatCurrency(country.taxesCollected)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Notice */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Tax Compliance Notice</p>
                <p className="text-sm text-amber-700 mt-1">
                  Tax rates and collection are managed automatically based on customer location. 
                  For any discrepancies or manual adjustments, please contact finance@amarise.com.
                  All tax data is retained for 7 years as per EU regulations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}