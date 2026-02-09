import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Shield,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import customersData from "@/data/mock/customers.json";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const customer = customersData.customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-muted-foreground">Customer not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/admin/customers")}>
            Back to Customers
          </Button>
        </div>
      </AdminLayout>
    );
  }

  const formatCurrency = (value: number, currency: string = "EUR") =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(value);

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "elite":
        return "default";
      case "vip":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/customers")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-light tracking-tight">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="text-muted-foreground mt-1">{customer.email}</p>
          </div>
          <Badge variant={getTierBadgeVariant(customer.tier)} className="uppercase text-xs">
            {customer.tier}
          </Badge>
          <Badge variant={getRiskBadgeVariant(customer.riskLevel)} className="uppercase text-xs">
            Risk: {customer.riskLevel}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{customer.phone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="font-medium">{customer.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Customer Since</p>
                      <p className="font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-light">{customer.totalOrders}</p>
                    <p className="text-sm text-muted-foreground">Orders</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light">{formatCurrency(customer.totalSpent, customer.currency)}</p>
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light">{customer.currency}</p>
                    <p className="text-sm text-muted-foreground">Currency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {customer.orders && customer.orders.length > 0 ? (
                  <div className="space-y-3">
                    {customer.orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => navigate(`/admin/orders/${order.id}`)}
                      >
                        <div>
                          <p className="font-medium">{order.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <StatusBadge status={order.status as any} />
                          <p className="font-medium">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No orders yet</p>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Internal Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add notes about this customer..."
                  defaultValue={customer.notes}
                  rows={4}
                  className="resize-none"
                />
                <Button className="mt-3" size="sm">
                  Save Notes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* GDPR Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  GDPR Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Marketing Consent</span>
                  {customer.gdprStatus.consentMarketing ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analytics Consent</span>
                  {customer.gdprStatus.consentAnalytics ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Export Requested</span>
                  {customer.gdprStatus.dataExportRequested ? (
                    <Badge variant="secondary">Pending</Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">No</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Deletion Requested</span>
                  {customer.gdprStatus.deletionRequested ? (
                    <Badge variant="destructive">Requested</Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">No</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  Last updated: {new Date(customer.gdprStatus.lastUpdated).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                {customer.addresses && customer.addresses.length > 0 ? (
                  <div className="space-y-3">
                    {customer.addresses.map((addr) => (
                      <div key={addr.id} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs uppercase text-muted-foreground">{addr.type}</span>
                          {addr.isDefault && <Badge variant="outline" className="text-xs">Default</Badge>}
                        </div>
                        <p className="text-sm">{addr.line1}</p>
                        <p className="text-sm">{addr.postalCode} {addr.city}</p>
                        <p className="text-sm">{addr.country}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No saved addresses</p>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Export Customer Data
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Process Deletion Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}