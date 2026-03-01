import { useState, useEffect, useCallback, createContext, useContext } from "react";

export type SupportedCurrency = "USD" | "EUR" | "AED" | "INR";

interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  label: string;
  rate: number; // relative to EUR
}

export const CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  EUR: { code: "EUR", symbol: "€", label: "EUR — Euro", rate: 1 },
  USD: { code: "USD", symbol: "$", label: "USD — US Dollar", rate: 1.08 },
  AED: { code: "AED", symbol: "د.إ", label: "AED — Dirham", rate: 3.97 },
  INR: { code: "INR", symbol: "₹", label: "INR — Indian Rupee", rate: 90.5 },
};

export function useCurrency() {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("ama-currency") as SupportedCurrency) || "EUR";
    }
    return "EUR";
  });

  const setCurrency = useCallback((code: SupportedCurrency) => {
    setCurrencyState(code);
    localStorage.setItem("ama-currency", code);
    window.dispatchEvent(new CustomEvent("ama-currency-change", { detail: code }));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const code = (e as CustomEvent).detail as SupportedCurrency;
      setCurrencyState(code);
    };
    window.addEventListener("ama-currency-change", handler);
    return () => window.removeEventListener("ama-currency-change", handler);
  }, []);

  const formatPrice = useCallback(
    (eurPrice: number): string => {
      const config = CURRENCIES[currency];
      const converted = eurPrice * config.rate;
      return `${config.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    },
    [currency]
  );

  return { currency, setCurrency, formatPrice, config: CURRENCIES[currency] };
}
