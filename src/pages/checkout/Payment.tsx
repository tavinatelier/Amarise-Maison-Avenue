import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard, Smartphone, Building2, Clock, ChevronRight } from "lucide-react";
import checkoutData from "@/data/mock/checkout.json";

const paymentMethods = [
  {
    id: "card",
    category: "Cards",
    methods: [
      { id: "stripe", name: "Credit / Debit Card", subtitle: "Visa, Mastercard, Amex", icon: CreditCard },
    ],
  },
  {
    id: "wallets",
    category: "Digital Wallets",
    methods: [
      { id: "apple-pay", name: "Apple Pay", subtitle: "Pay with Face ID or Touch ID", icon: Smartphone },
      { id: "google-pay", name: "Google Pay", subtitle: "Fast checkout with Google", icon: Smartphone },
      { id: "paypal", name: "PayPal", subtitle: "Pay with your PayPal account", icon: Smartphone },
    ],
  },
  {
    id: "bnpl",
    category: "Pay Later",
    methods: [
      { id: "klarna", name: "Klarna", subtitle: "Pay in 3 interest-free instalments", icon: Clock },
      { id: "afterpay", name: "Afterpay", subtitle: "4 interest-free payments", icon: Clock },
    ],
  },
  {
    id: "regional",
    category: "Regional Payment",
    methods: [
      { id: "razorpay", name: "Razorpay", subtitle: "UPI, Netbanking, Cards (India)", icon: Building2 },
      { id: "bank-transfer", name: "Bank Transfer", subtitle: "Direct bank payment", icon: Building2 },
    ],
  },
  {
    id: "processors",
    category: "Additional Options",
    methods: [
      { id: "adyen", name: "Adyen", subtitle: "Secure global payments", icon: CreditCard },
      { id: "worldpay", name: "Worldpay", subtitle: "Trusted worldwide processor", icon: CreditCard },
      { id: "square", name: "Square", subtitle: "Simple, secure payments", icon: CreditCard },
    ],
  },
];

export default function Payment() {
  const navigate = useNavigate();
  const { cart } = checkoutData;
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/checkout/confirmation");
  };

  return (
    <CheckoutLayout step={3}>
      <div className="container-editorial">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Payment Methods */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-light mb-4">Payment</h1>
            <p className="text-sm text-muted-foreground mb-8">
              Select your preferred payment method
            </p>

            {/* Security Notice */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border mb-8">
              <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                All transactions are encrypted and secure. Your payment details are never stored.
              </p>
            </div>

            {/* Payment Method Categories */}
            <div className="space-y-8">
              {paymentMethods.map((category) => (
                <div key={category.id}>
                  <h3 className="text-caption mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.methods.map((method) => {
                      const isSelected = selectedMethod === method.id;
                      const IconComponent = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method.id)}
                          className={`w-full flex items-center gap-4 p-4 border transition-all duration-300 text-left ${
                            isSelected
                              ? "border-foreground bg-muted/20"
                              : "border-border hover:border-foreground/30"
                          }`}
                        >
                          <div className={`w-10 h-10 flex items-center justify-center border ${
                            isSelected ? "border-foreground" : "border-border"
                          }`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{method.name}</p>
                            <p className="text-xs text-muted-foreground">{method.subtitle}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-foreground" : "border-border"
                          }`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Integration Notice */}
            {selectedMethod && (
              <div className="mt-8 p-5 border border-dashed border-border bg-muted/10">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium mb-1">Payment Integration Preview</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This is a design preview. The selected payment gateway will be connected
                      during the integration phase. No real transactions will be processed.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
              disabled={!selectedMethod || isProcessing}
              className="w-full mt-6 btn-luxury-primary"
            >
              {isProcessing
                ? "Processing..."
                : selectedMethod
                ? `Complete Order — €${cart.total}`
                : "Select a payment method"}
            </Button>

            <button
              onClick={() => navigate("/checkout/shipping")}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Return to Shipping
            </button>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="text-xs">256-bit SSL</span>
              </div>
              <span className="text-xs text-muted-foreground/30">|</span>
              <span className="text-xs">PCI DSS Compliant</span>
              <span className="text-xs text-muted-foreground/30">|</span>
              <span className="text-xs">Fraud Protection</span>
            </div>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
