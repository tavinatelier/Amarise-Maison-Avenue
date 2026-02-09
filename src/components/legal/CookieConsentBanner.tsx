import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

const CONSENT_KEY = "amarise_cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

export const CookieConsentBanner = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsentStatus(stored);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsentStatus("accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsentStatus("declined");
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render if user has already made a choice
  if (consentStatus) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-background border border-border shadow-2xl rounded-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-secondary rounded-full flex-shrink-0">
                    <Cookie className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-light tracking-wide">
                      We Value Your Privacy
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                      We use cookies to enhance your browsing experience, serve personalized 
                      content, and analyze our traffic. By clicking "Accept All", you consent 
                      to our use of cookies. Read our{" "}
                      <Link 
                        to="/cookies" 
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        Cookie Policy
                      </Link>{" "}
                      and{" "}
                      <Link 
                        to="/privacy" 
                        className="underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        Privacy Policy
                      </Link>{" "}
                      for more information.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                  aria-label="Close cookie banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
                <Button
                  onClick={handleAccept}
                  className="bg-foreground text-background hover:bg-foreground/90 px-8"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="px-8"
                >
                  Decline Optional
                </Button>
                <Link to="/cookies" className="sm:ml-auto">
                  <Button variant="ghost" className="w-full sm:w-auto text-muted-foreground">
                    Manage Preferences
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
