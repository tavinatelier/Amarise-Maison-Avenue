import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  productId: string;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  editable?: boolean;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
}

export function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
  currency,
  editable = false,
  onUpdateQuantity,
  onRemoveItem,
}: OrderSummaryProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-EU", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="border border-border bg-card p-6 lg:p-8">
      <h3 className="text-caption mb-6">Order Summary</h3>

      {/* Items */}
      <div className="space-y-6 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-24 bg-muted overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                {editable && (
                  <button
                    onClick={() => onRemoveItem?.(item.id)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between mt-3">
                {editable ? (
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() =>
                        onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </span>
                )}
                <p className="font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border pt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tax (VAT)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-border mt-4 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Total</span>
          <span className="text-lg font-medium">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
