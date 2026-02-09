import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutLayout } from "@/components/checkout/CheckoutLayout";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";
import checkoutData from "@/data/mock/checkout.json";

export default function Shipping() {
  const navigate = useNavigate();
  const { cart, shippingOptions, countries } = checkoutData;
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const selectedShippingOption = shippingOptions.find(
    (opt) => opt.id === selectedShipping
  );
  const shippingCost = selectedShippingOption?.price || 0;
  const newTotal = cart.subtotal + shippingCost + cart.tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    // In production, validate form data
    navigate("/checkout/payment");
  };

  return (
    <CheckoutLayout step={2}>
      <div className="container-editorial">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-light mb-8">Shipping Information</h1>

            {/* Contact */}
            <div className="space-y-6 mb-10">
              <h3 className="text-caption">Contact</h3>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-6 mb-10">
              <h3 className="text-caption">Shipping Address</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input
                  id="apartment"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange("apartment", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => handleInputChange("country", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phone">Phone (for delivery updates)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="space-y-6">
              <h3 className="text-caption">Shipping Method</h3>

              <RadioGroup
                value={selectedShipping}
                onValueChange={setSelectedShipping}
                className="space-y-3"
              >
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      selectedShipping === option.id
                        ? "border-foreground bg-muted/30"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      {option.price === 0 ? "Free" : `€${option.price}`}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <OrderSummary
              items={cart.items}
              subtotal={cart.subtotal}
              shipping={shippingCost}
              tax={cart.tax}
              total={newTotal}
              currency={cart.currency}
            />

            <Button
              onClick={handleContinue}
              className="w-full mt-6 btn-luxury-primary"
            >
              Continue to Payment
            </Button>

            <button
              onClick={() => navigate("/checkout/cart")}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Return to Cart
            </button>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}
