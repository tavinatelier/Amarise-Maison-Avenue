import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Lock } from "lucide-react";
import checkoutData from "@/data/mock/checkout.json";

export default function Payment() {
  const navigate = useNavigate();
  const { cart } = checkoutData;
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    billingAddressSame: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/checkout/confirmation");
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  return (
    <CheckoutLayout step={3}>
      <div className="container-editorial">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Payment Form */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-light mb-8">Payment</h1>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border mb-8">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Your payment information is encrypted and secure
              </p>
            </div>

            {/* Card Details */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <h3 className="text-caption">Card Details</h3>
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "cardNumber",
                      formatCardNumber(e.target.value.slice(0, 19))
                    )
                  }
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange(
                        "expiryDate",
                        formatExpiryDate(e.target.value.slice(0, 5))
                      )
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={formData.cvc}
                    onChange={(e) =>
                      handleInputChange(
                        "cvc",
                        e.target.value.replace(/\D/g, "").slice(0, 4)
                      )
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  placeholder="As shown on card"
                  value={formData.nameOnCard}
                  onChange={(e) =>
                    handleInputChange("nameOnCard", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div className="space-y-4">
              <h3 className="text-caption">Billing Address</h3>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="billingAddressSame"
                  checked={formData.billingAddressSame}
                  onCheckedChange={(checked) =>
                    handleInputChange("billingAddressSame", !!checked)
                  }
                />
                <Label htmlFor="billingAddressSame" className="text-sm">
                  Same as shipping address
                </Label>
              </div>

              {!formData.billingAddressSame && (
                <div className="mt-6 p-6 border border-border space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Billing address form would appear here
                  </p>
                </div>
              )}
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
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full mt-6 btn-luxury-primary"
            >
              {isProcessing ? "Processing..." : `Pay €${cart.total}`}
            </Button>

            <button
              onClick={() => navigate("/checkout/shipping")}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Return to Shipping
            </button>

            {/* Trust Badges */}
            <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span className="text-xs">256-bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
