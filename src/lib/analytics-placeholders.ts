/**
 * Analytics Integration Placeholders
 * These hooks prepare event tracking for GA4, Meta Pixel, and custom conversions.
 * No active campaigns — these fire into void until configured.
 */

// Google Analytics 4 placeholder
export function trackGA4Event(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
  // Silent fallback — no console noise
}

// Meta Pixel placeholder
export function trackMetaPixelEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", eventName, params);
  }
}

// Conversion event hooks
export const AnalyticsEvents = {
  viewProduct: (productId: string, value: number, currency = "EUR") => {
    trackGA4Event("view_item", { items: [{ item_id: productId }], value, currency });
    trackMetaPixelEvent("ViewContent", { content_ids: [productId], value, currency });
  },
  addToCart: (productId: string, value: number, currency = "EUR") => {
    trackGA4Event("add_to_cart", { items: [{ item_id: productId }], value, currency });
    trackMetaPixelEvent("AddToCart", { content_ids: [productId], value, currency });
  },
  beginCheckout: (value: number, currency = "EUR") => {
    trackGA4Event("begin_checkout", { value, currency });
    trackMetaPixelEvent("InitiateCheckout", { value, currency });
  },
  purchase: (orderId: string, value: number, currency = "EUR") => {
    trackGA4Event("purchase", { transaction_id: orderId, value, currency });
    trackMetaPixelEvent("Purchase", { value, currency });
  },
  search: (query: string) => {
    trackGA4Event("search", { search_term: query });
    trackMetaPixelEvent("Search", { search_string: query });
  },
  addToWishlist: (productId: string) => {
    trackGA4Event("add_to_wishlist", { items: [{ item_id: productId }] });
    trackMetaPixelEvent("AddToWishlist", { content_ids: [productId] });
  },
};
