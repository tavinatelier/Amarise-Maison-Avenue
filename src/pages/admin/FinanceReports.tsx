import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
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
import { Download, FileText, Calendar, CheckCircle } from "lucide-react";
import financeData from "@/data/mock/finance.json";

export default function FinanceReports() {
  const navigate = useNavigate();
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);

  const monthlyTrend = financeData.monthlyTrend;
  const quarterlyReports = financeData.quarterlyReports;

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
            <h1 className="text-3xl font-light tracking-tight">Financial Reports</h1>
            <p className="text-muted-foreground mt-1">
              Monthly and quarterly financial summaries
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/admin/finance")}>
              Back to Finance
            </Button>
          </div>
        </div>

        <Tabs defaultValue="monthly" className="space-y-6">
          <TabsList>
            <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Monthly Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyTrend.slice().reverse().map((month, index) => {
                    const prevMonth = monthlyTrend[monthlyTrend.length - index - 2];
                    const change = prevMonth
                      ? ((month.grossRevenue - prevMonth.grossRevenue) / prevMonth.grossRevenue) * 100
                      : 0;

                    return (
                      <div key={month.month} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <p className="font-medium">
                            {new Date(month.month + "-01").toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-8 text-right">
                          <div>
                            <p className="text-sm text-muted-foreground">Gross</p>
                            <p className="font-medium">{formatCurrency(month.grossRevenue)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Net</p>
                            <p className="font-medium">{formatCurrency(month.netRevenue)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Refunds</p>
                            <p className="font-medium text-red-600">-{formatCurrency(month.refunds)}</p>
                          </div>
                        </div>
                        <div className="w-24 text-right">
                          {change !== 0 && (
                            <span className={change > 0 ? "text-green-600" : "text-red-600"}>
                              {change > 0 ? "+" : ""}{change.toFixed(1)}%
                            </span>
                          )}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quarterly">
            <div className="grid gap-6">
              {quarterlyReports.slice().reverse().map((report) => (
                <Card key={report.quarter} className={selectedQuarter === report.quarter ? "ring-2 ring-primary" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {report.quarter}
                        {report.status === "finalized" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </CardTitle>
                      <span className={`text-sm px-2 py-1 rounded ${
                        report.status === "finalized" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {report.status === "finalized" ? "Finalized" : "In Progress"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                      </div>
                      <div className="grid grid-cols-3 gap-8 text-right">
                        <div>
                          <p className="text-sm text-muted-foreground">Gross Revenue</p>
                          <p className="text-xl font-light">{formatCurrency(report.grossRevenue)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Net Revenue</p>
                          <p className="text-xl font-light">{formatCurrency(report.netRevenue)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Refunds</p>
                          <p className="text-xl font-light text-red-600">-{formatCurrency(report.refunds)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select defaultValue="pdf">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF</SelectItem>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="xlsx">Excel</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}