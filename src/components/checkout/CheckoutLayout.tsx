import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface CheckoutLayoutProps {
  children: ReactNode;
  step: 1 | 2 | 3 | 4;
}

const steps = [
  { number: 1, label: "Cart" },
  { number: 2, label: "Shipping" },
  { number: 3, label: "Payment" },
  { number: 4, label: "Confirmation" },
];

export function CheckoutLayout({ children, step }: CheckoutLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border py-6">
        <div className="container-editorial">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-light tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Amarisé
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-border py-6">
        <div className="container-editorial">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-sm transition-colors ${
                      s.number <= step
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.number}
                  </div>
                  <span
                    className={`hidden md:block text-sm transition-colors ${
                      s.number <= step
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 md:w-16 h-px transition-colors ${
                      s.number < step ? "bg-foreground" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="py-12 md:py-16">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Secure checkout powered by Stripe</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
