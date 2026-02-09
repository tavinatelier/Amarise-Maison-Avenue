/**
 * COMMERCE SERVICE
 * BACKEND HANDOFF: Replace mock implementations with actual API calls
 * 
 * This service defines the contract for all commerce operations.
 * UI components use these functions - backend replaces implementation only.
 */

import { Product } from '@/types/content';
import { FEATURES, formatPrice, AVAILABILITY } from '@/config/site.config';

// ============================================
// TYPES
// ============================================

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  sku?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number | null;
  tax: number | null;
  total: number;
  currency: string;
  itemCount: number;
}

export interface CheckoutSession {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  redirectUrl?: string;
}

export interface ProductAvailability {
  inStock: boolean;
  stockLevel: number | null;
  isPreOrder: boolean;
  isWaitlist: boolean;
  estimatedShipDate?: string;
}


// ============================================
// CART OPERATIONS
// ============================================

/**
 * Get current cart
 * BACKEND HANDOFF: Replace with API call to /cart
 */
export const getCart = async (): Promise<Cart> => {
  // Mock implementation - simulates empty cart
  return {
    items: [],
    subtotal: 0,
    shipping: null,
    tax: null,
    total: 0,
    currency: 'EUR',
    itemCount: 0,
  };
};

/**
 * Add item to cart
 * BACKEND HANDOFF: Replace with API call POST /cart/items
 */
export const addToCart = async (
  product: Pick<Product, 'id' | 'title' | 'priceValue' | 'image'>,
  quantity: number = 1,
  variant?: string
): Promise<{ success: boolean; cart: Cart }> => {
  // Check if commerce is enabled
  if (!FEATURES.commerce.addToBagEnabled) {
    return { 
      success: false, 
      cart: await getCart() 
    };
  }

  // Mock implementation - in reality, this calls the API
  console.log('[Commerce] Adding to cart:', { product, quantity, variant });
  
  // Simulate successful add
  return {
    success: true,
    cart: {
      items: [{
        id: `cart-${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.title,
        price: product.priceValue,
        quantity,
        image: product.image,
        variant,
      }],
      subtotal: product.priceValue * quantity,
      shipping: null,
      tax: null,
      total: product.priceValue * quantity,
      currency: 'EUR',
      itemCount: quantity,
    },
  };
};

/**
 * Update cart item quantity
 * BACKEND HANDOFF: Replace with API call PATCH /cart/items/:id
 */
export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<{ success: boolean; cart: Cart }> => {
  console.log('[Commerce] Updating quantity:', { itemId, quantity });
  
  // Mock implementation
  return {
    success: true,
    cart: await getCart(),
  };
};

/**
 * Remove item from cart
 * BACKEND HANDOFF: Replace with API call DELETE /cart/items/:id
 */
export const removeFromCart = async (
  itemId: string
): Promise<{ success: boolean; cart: Cart }> => {
  console.log('[Commerce] Removing from cart:', itemId);
  
  // Mock implementation
  return {
    success: true,
    cart: await getCart(),
  };
};

/**
 * Clear entire cart
 * BACKEND HANDOFF: Replace with API call DELETE /cart
 */
export const clearCart = async (): Promise<{ success: boolean }> => {
  console.log('[Commerce] Clearing cart');
  
  return { success: true };
};


// ============================================
// CHECKOUT OPERATIONS
// ============================================

/**
 * Initialize checkout session
 * BACKEND HANDOFF: Replace with API call POST /checkout
 */
export const createCheckoutSession = async (): Promise<CheckoutSession | null> => {
  // Check if checkout is enabled
  if (!FEATURES.commerce.checkoutEnabled) {
    console.warn('[Commerce] Checkout is disabled');
    return null;
  }

  console.log('[Commerce] Creating checkout session');
  
  // Mock implementation - returns pending session
  return {
    id: `checkout-${Date.now()}`,
    status: 'pending',
    redirectUrl: '/checkout', // Would redirect to payment provider
  };
};

/**
 * Get checkout session status
 * BACKEND HANDOFF: Replace with API call GET /checkout/:id
 */
export const getCheckoutSession = async (
  sessionId: string
): Promise<CheckoutSession | null> => {
  console.log('[Commerce] Getting checkout session:', sessionId);
  
  return {
    id: sessionId,
    status: 'pending',
  };
};


// ============================================
// PRODUCT AVAILABILITY
// ============================================

/**
 * Check product availability
 * BACKEND HANDOFF: Replace with API call GET /products/:id/availability
 */
export const getProductAvailability = async (
  productId: string
): Promise<ProductAvailability> => {
  console.log('[Commerce] Checking availability:', productId);
  
  // Mock implementation - always available
  return {
    inStock: true,
    stockLevel: null, // Don't show exact stock
    isPreOrder: false,
    isWaitlist: false,
  };
};

/**
 * Check if product can be purchased
 * Combines feature flags and product status
 */
export const canPurchase = (product: Product): boolean => {
  // Check commerce enabled
  if (!FEATURES.commerce.addToBagEnabled) {
    return false;
  }
  
  // Check product status
  if (product.status === 'archived') {
    return false;
  }
  
  // Check purchasable flag
  if (product.isPurchasable === false) {
    return false;
  }
  
  // Check soft-launch status
  if (product.status === 'soft-launch') {
    return false;
  }
  
  return true;
};

/**
 * Get purchase button state
 * Returns appropriate label and action based on availability
 */
export const getPurchaseButtonState = (
  product: Product,
  availability?: ProductAvailability
): {
  label: string;
  disabled: boolean;
  action: 'add' | 'preorder' | 'waitlist' | 'none';
} => {
  // Not purchasable
  if (!canPurchase(product)) {
    return { label: 'Not Available', disabled: true, action: 'none' };
  }
  
  // Pre-order
  if (availability?.isPreOrder && AVAILABILITY.preOrder.enabled) {
    return { 
      label: AVAILABILITY.preOrder.label, 
      disabled: false, 
      action: 'preorder' 
    };
  }
  
  // Out of stock - waitlist
  if (availability?.inStock === false && AVAILABILITY.waitlist.enabled) {
    return { 
      label: AVAILABILITY.waitlist.label, 
      disabled: false, 
      action: 'waitlist' 
    };
  }
  
  // Out of stock - no waitlist
  if (availability?.inStock === false) {
    return { label: 'Out of Stock', disabled: true, action: 'none' };
  }
  
  // Available for purchase
  return { label: 'Add to Ritual', disabled: false, action: 'add' };
};


// ============================================
// PRICE FORMATTING
// ============================================

/**
 * Format product price for display
 * BACKEND HANDOFF: May need localization from API
 */
export const formatProductPrice = (price: number): string => {
  return formatPrice(price);
};

/**
 * Format cart totals for display
 */
export const formatCartTotal = (cart: Cart): {
  subtotal: string;
  shipping: string;
  tax: string;
  total: string;
} => {
  return {
    subtotal: formatPrice(cart.subtotal),
    shipping: cart.shipping !== null ? formatPrice(cart.shipping) : 'Calculated at checkout',
    tax: cart.tax !== null ? formatPrice(cart.tax) : 'Calculated at checkout',
    total: formatPrice(cart.total),
  };
};


// ============================================
// WAITLIST & NOTIFICATIONS
// ============================================

/**
 * Join waitlist for out-of-stock product
 * BACKEND HANDOFF: Replace with API call POST /products/:id/waitlist
 */
export const joinWaitlist = async (
  productId: string,
  email: string
): Promise<{ success: boolean }> => {
  console.log('[Commerce] Joining waitlist:', { productId, email });
  
  // Mock implementation
  return { success: true };
};

/**
 * Subscribe to back-in-stock notification
 * BACKEND HANDOFF: Replace with API call POST /notifications/stock
 */
export const subscribeToStockNotification = async (
  productId: string,
  email: string
): Promise<{ success: boolean }> => {
  console.log('[Commerce] Stock notification signup:', { productId, email });
  
  return { success: true };
};
