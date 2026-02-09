import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";
import checkoutData from "@/data/mock/checkout.json";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(checkoutData.cart);
  const [promoCode, setPromoCode] = useState("");

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCart((prev) => {
      const newItems = prev.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      const newSubtotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTax = Math.round(newSubtotal * 0.2);
      return {
        ...prev,
        items: newItems,
        subtotal: newSubtotal,
        tax: newTax,
        total: newSubtotal + prev.shipping + newTax,
      };
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => {
      const newItems = prev.items.filter((item) => item.id !== itemId);
      const newSubtotal = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newTax = Math.round(newSubtotal * 0.2);
      return {
        ...prev,
        items: newItems,
        subtotal: newSubtotal,
        tax: newTax,
        total: newSubtotal + prev.shipping + newTax,
      };
    });
  };

  if (cart.items.length === 0) {
    return (
      <CheckoutLayout step={1}>
        <div className="container-editorial">
          <div className="max-w-lg mx-auto text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-light mb-4">Your Ritual Bag is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Discover our curated collection of luxury beauty, atelier pieces,
              and lifestyle objects.
            </p>
            <Button onClick={() => navigate("/")} className="btn-luxury-primary">
              Continue Shopping
            </Button>
          </div>
        </div>
      </CheckoutLayout>
    );
  }

  return (
    <CheckoutLayout step={1}>
      <div className="container-editorial">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-light mb-8">Your Ritual Bag</h1>

            <div className="space-y-6">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-6 border border-border"
                >
                  <div className="w-32 h-40 bg-muted overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-sm text-muted-foreground hover:text-foreground underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-end justify-between mt-6">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-4 py-2 hover:bg-muted transition-colors text-lg"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 text-center min-w-[60px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-4 py-2 hover:bg-muted transition-colors text-lg"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-medium">
                        €{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="mt-8 p-6 border border-border">
              <h4 className="text-sm font-medium mb-3">Promo Code</h4>
              <div className="flex gap-3">
                <Input
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline">Apply</Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <OrderSummary
              items={cart.items}
              subtotal={cart.subtotal}
              shipping={cart.shipping}
              tax={cart.tax}
              total={cart.total}
              currency={cart.currency}
            />

            <Button
              onClick={() => navigate("/checkout/shipping")}
              className="w-full mt-6 btn-luxury-primary"
            >
              Continue to Shipping
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Taxes and shipping calculated at next step
            </p>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
