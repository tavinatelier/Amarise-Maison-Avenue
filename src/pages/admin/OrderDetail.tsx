/**
 * ORDER DETAIL PAGE
 * Detailed order view with timeline and actions
 * 
 * BACKEND HANDOFF: Replace mock data with order.service.ts API calls
 */

import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CreditCard, 
  User, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";

// Mock order data
const mockOrder = {
  id: "AM-2024-0892",
  status: "shipped",
  createdAt: "2024-01-10T14:30:00Z",
  updatedAt: "2024-01-11T09:15:00Z",
  customer: {
    id: "cust_001",
    name: "Sophie Laurent",
    email: "sophie.laurent@email.com",
    phone: "+33 6 12 34 56 78",
  },
  shippingAddress: {
    line1: "42 Rue de Rivoli",
    line2: "Apt 3B",
    city: "Paris",
    postalCode: "75004",
    country: "France",
    countryCode: "FR",
  },
  billingAddress: {
    line1: "42 Rue de Rivoli",
    line2: "Apt 3B",
    city: "Paris",
    postalCode: "75004",
    country: "France",
    countryCode: "FR",
  },
  items: [
    {
      id: "item_001",
      productId: "prod_001",
      title: "Veil Lip Ritual",
      variant: "Pétale",
      quantity: 2,
      unitPrice: 90,
      total: 180,
    },
    {
      id: "item_002",
      productId: "prod_002",
      title: "Radiance Serum",
      variant: "30ml",
      quantity: 1,
      unitPrice: 140,
      total: 140,
    },
  ],
  subtotal: 320,
  shipping: 0,
  tax: 64,
  total: 384,
  currency: "EUR",
  paymentMethod: "card",
  paymentLast4: "4242",
  tracking: {
    carrier: "DHL Express",
    number: "1234567890",
    url: "https://dhl.com/track/1234567890",
  },
  timeline: [
    {
      id: "evt_001",
      event: "Order Placed",
      description: "Order received and payment confirmed",
      timestamp: "2024-01-10T14:30:00Z",
      status: "completed",
    },
    {
      id: "evt_002",
      event: "Processing",
      description: "Order sent to fulfillment center",
      timestamp: "2024-01-10T15:00:00Z",
      status: "completed",
    },
    {
      id: "evt_003",
      event: "Shipped",
      description: "Package picked up by DHL Express",
      timestamp: "2024-01-11T09:15:00Z",
      status: "completed",
    },
    {
      id: "evt_004",
      event: "Out for Delivery",
      description: "Package is out for delivery",
      timestamp: null,
      status: "pending",
    },
    {
      id: "evt_005",
      event: "Delivered",
      description: "Package delivered to recipient",
      timestamp: null,
      status: "pending",
    },
  ],
};

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = mockOrder; // In real app, fetch by id

  const statusVariants: Record<string, "default" | "success" | "warning" | "info" | "error"> = {
    pending: "warning",
    processing: "info",
    shipped: "info",
    delivered: "success",
    cancelled: "error",
    refunded: "error",
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/orders")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-light tracking-wide">Order {order.id}</h1>
                <StatusBadge status={order.status} variant={statusVariants[order.status]} />
              </div>
              <p className="text-muted-foreground mt-1">
                Placed {format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate(`/admin/refunds?order=${order.id}`)}>
              Issue Refund
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Resend Confirmation
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.variant} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">€{item.total}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>€{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{order.shipping === 0 ? "Free" : `€${order.shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (VAT)</span>
                      <span>€{order.tax}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>€{order.total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {order.timeline.map((event, index) => {
                    const isLast = index === order.timeline.length - 1;
                    const isCompleted = event.status === "completed";

                    return (
                      <div key={event.id} className="flex gap-4 pb-6 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div className={`p-1.5 rounded-full ${
                            isCompleted ? "bg-emerald-100" : "bg-muted"
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          {!isLast && (
                            <div className={`w-px flex-1 mt-2 ${
                              isCompleted ? "bg-emerald-200" : "bg-border"
                            }`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${!isCompleted && "text-muted-foreground"}`}>
                            {event.event}
                          </p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          {event.timestamp && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(event.timestamp), "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-medium">{order.customer.name}</p>
                <p className="text-sm text-muted-foreground">{order.customer.email}</p>
                <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                <Button variant="link" className="p-0 h-auto text-sm" onClick={() => navigate(`/admin/customers/${order.customer.id}`)}>
                  View Customer Profile →
                </Button>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-1">
                  <p>{order.shippingAddress.line1}</p>
                  {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                  <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Card ending in <span className="font-mono">{order.paymentLast4}</span>
                </p>
              </CardContent>
            </Card>

            {/* Tracking */}
            {order.tracking && (
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{order.tracking.carrier}</p>
                  <p className="text-sm font-mono">{order.tracking.number}</p>
                  <Button variant="link" className="p-0 h-auto text-sm" asChild>
                    <a href={order.tracking.url} target="_blank" rel="noopener noreferrer">
                      Track Package →
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
