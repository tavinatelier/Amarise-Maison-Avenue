import { Link } from "react-router-dom";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { Button } from "@/components/ui/button";
import { Check, Package, Mail, Shield } from "lucide-react";
import checkoutData from "@/data/mock/checkout.json";
import { useMemo } from "react";

function generateOrderId(): string {
  const prefix = "AMA";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export default function Confirmation() {
  const { cart } = checkoutData;

  const orderId = useMemo(() => generateOrderId(), []);

  const estimatedDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d;
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: cart.currency,
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <CheckoutLayout step={4}>
      <div className="container-editorial">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-8 border-2 border-accent flex items-center justify-center">
            <Check className="h-8 w-8 text-accent" />
          </div>

          {/* Thank You */}
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Thank You for Your Order</h1>
          <p className="text-lg text-muted-foreground mb-2">Order {orderId}</p>
          <p className="text-muted-foreground mb-8">
            A confirmation has been sent to your email address.
          </p>

          {/* Order Summary */}
          <div className="border border-border p-8 text-left mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-5 w-5" />
              <h3 className="text-caption">Order Summary</h3>
            </div>

            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-muted overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.subtitle} × {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{cart.shipping === 0 ? "Complimentary" : formatCurrency(cart.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (estimated)</span>
                <span>{formatCurrency(cart.tax)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>{formatCurrency(cart.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="border border-border p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Estimated Delivery</span>
            </div>
            <p className="text-lg font-medium">
              {estimatedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Trust */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <p className="text-sm">Confirmation email sent</p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <p className="text-sm">Authenticity certificate included with your order</p>
            </div>
          </div>

          {/* Corporate attribution */}
          <p className="text-[10px] text-muted-foreground/50 mb-8">
            Invoice issued by Baalvion Industries Private Limited on behalf of Amarisé Maison Avenue.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-luxury-primary">
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account/orders">View Order Status</Link>
            </Button>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
