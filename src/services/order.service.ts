/**
 * ORDER SERVICE - MOCK IMPLEMENTATION
 * BACKEND HANDOFF: Replace with order management API
 * 
 * This service handles order creation, tracking, and history.
 * All functions return mock responses.
 */

import { Cart, CartItem } from './commerce.service';
import { PaymentIntent, PaymentMethod } from './payment.service';
import { CURRENCY, formatPrice } from '@/config/site.config';

// ============================================
// TYPES - STABLE API CONTRACTS
// ============================================

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping?: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: number;
  carrier?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  shippingOption: ShippingOption;
  paymentMethod: PaymentMethod;
  paymentIntentId: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
}

export interface CreateOrderRequest {
  cart: Cart;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  shippingOptionId: string;
  paymentIntentId: string;
  paymentMethod: PaymentMethod;
  email: string;
  notes?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  formattedSubtotal: string;
  formattedShipping: string;
  formattedTax: string;
  formattedDiscount: string;
  formattedTotal: string;
}

// ============================================
// ORDER OPERATIONS
// ============================================

/**
 * Create a new order
 * BACKEND HANDOFF: POST /orders
 */
export const createOrder = async (
  request: CreateOrderRequest
): Promise<{ success: boolean; order?: Order; errorMessage?: string }> => {
  console.log('[Order] Creating order:', request);
  
  // Validate cart
  if (!request.cart.items.length) {
    return {
      success: false,
      errorMessage: 'Cannot create order with empty cart',
    };
  }
  
  // Mock order creation
  const order: Order = {
    id: `order_${Date.now()}`,
    orderNumber: generateOrderNumber(),
    status: 'confirmed',
    items: request.cart.items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      variant: item.variant,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
      image: item.image,
    })),
    subtotal: request.cart.subtotal,
    shipping: request.cart.shipping || 0,
    tax: request.cart.tax || 0,
    total: request.cart.total,
    currency: request.cart.currency,
    shippingAddress: request.shippingAddress,
    billingAddress: request.billingAddress,
    shippingOption: getMockShippingOption(request.shippingOptionId),
    paymentMethod: request.paymentMethod,
    paymentIntentId: request.paymentIntentId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    estimatedDelivery: getEstimatedDelivery(5),
  };
  
  return { success: true, order };
};

/**
 * Get order by ID
 * BACKEND HANDOFF: GET /orders/:id
 */
export const getOrder = async (orderId: string): Promise<Order | null> => {
  console.log('[Order] Getting order:', orderId);
  
  // Mock: Return null (order not found in mock)
  // In production, this fetches from API
  return null;
};

/**
 * Get order by order number (for confirmation page)
 * BACKEND HANDOFF: GET /orders/number/:orderNumber
 */
export const getOrderByNumber = async (
  orderNumber: string
): Promise<Order | null> => {
  console.log('[Order] Getting order by number:', orderNumber);
  return null;
};

/**
 * Get user's order history
 * BACKEND HANDOFF: GET /orders (with auth)
 */
export const getOrderHistory = async (): Promise<Order[]> => {
  console.log('[Order] Getting order history');
  
  // Mock: Return empty array (no auth in mock)
  return [];
};

/**
 * Cancel an order
 * BACKEND HANDOFF: POST /orders/:id/cancel
 */
export const cancelOrder = async (
  orderId: string,
  reason?: string
): Promise<{ success: boolean; order?: Order; errorMessage?: string }> => {
  console.log('[Order] Cancelling order:', { orderId, reason });
  
  // Mock: Orders can only be cancelled if pending/confirmed
  return {
    success: true,
    order: undefined, // Would return updated order
  };
};

// ============================================
// SHIPPING OPTIONS
// ============================================

/**
 * Get available shipping options
 * BACKEND HANDOFF: GET /shipping/options
 */
export const getShippingOptions = async (
  country: string
): Promise<ShippingOption[]> => {
  console.log('[Order] Getting shipping options for:', country);
  
  // Mock shipping options
  const baseOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivered in 5-7 business days',
      price: 0, // Free
      estimatedDays: 7,
      carrier: 'DHL',
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Delivered in 2-3 business days',
      price: 25,
      estimatedDays: 3,
      carrier: 'DHL Express',
    },
    {
      id: 'priority',
      name: 'Priority Shipping',
      description: 'Next business day delivery',
      price: 45,
      estimatedDays: 1,
      carrier: 'DHL Express',
    },
  ];
  
  // Adjust for different regions
  if (country === 'US') {
    baseOptions[0].price = 15;
    baseOptions[0].description = 'Delivered in 7-10 business days';
    baseOptions[0].estimatedDays = 10;
  }
  
  return baseOptions;
};

/**
 * Calculate shipping cost
 * BACKEND HANDOFF: POST /shipping/calculate
 */
export const calculateShipping = async (
  items: CartItem[],
  shippingAddress: ShippingAddress,
  shippingOptionId: string
): Promise<{ cost: number; estimatedDays: number }> => {
  console.log('[Order] Calculating shipping:', { 
    itemCount: items.length, 
    country: shippingAddress.country, 
    optionId: shippingOptionId 
  });
  
  const options = await getShippingOptions(shippingAddress.country);
  const selectedOption = options.find(o => o.id === shippingOptionId);
  
  if (!selectedOption) {
    return { cost: 0, estimatedDays: 7 };
  }
  
  return {
    cost: selectedOption.price,
    estimatedDays: selectedOption.estimatedDays,
  };
};

// ============================================
// TAX CALCULATION
// ============================================

/**
 * Calculate tax
 * BACKEND HANDOFF: POST /tax/calculate
 */
export const calculateTax = async (
  subtotal: number,
  shippingAddress: ShippingAddress
): Promise<{ tax: number; taxRate: number; taxIncluded: boolean }> => {
  console.log('[Order] Calculating tax:', { subtotal, country: shippingAddress.country });
  
  // Mock tax rates by country
  const taxRates: Record<string, number> = {
    DE: 0.19,  // Germany
    FR: 0.20,  // France
    IT: 0.22,  // Italy
    ES: 0.21,  // Spain
    UK: 0.20,  // UK
    US: 0,     // US - calculated at checkout
    JP: 0.10,  // Japan
    AU: 0.10,  // Australia
  };
  
  // EU countries have tax included
  const euCountries = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT'];
  const taxIncluded = euCountries.includes(shippingAddress.country);
  
  const taxRate = taxRates[shippingAddress.country] || 0.20;
  
  // If tax included, it's already in the price
  // If not, calculate additional tax
  const tax = taxIncluded ? 0 : subtotal * taxRate;
  
  return { tax, taxRate, taxIncluded };
};

// ============================================
// ORDER SUMMARY
// ============================================

/**
 * Calculate complete order summary
 * BACKEND HANDOFF: POST /orders/summary
 */
export const calculateOrderSummary = async (
  cart: Cart,
  shippingAddress: ShippingAddress | null,
  shippingOptionId: string = 'standard',
  discountCode?: string
): Promise<OrderSummary> => {
  console.log('[Order] Calculating order summary');
  
  const subtotal = cart.subtotal;
  
  // Calculate shipping
  let shipping = 0;
  if (shippingAddress) {
    const shippingResult = await calculateShipping(
      cart.items, 
      shippingAddress, 
      shippingOptionId
    );
    shipping = shippingResult.cost;
  }
  
  // Calculate tax
  let tax = 0;
  if (shippingAddress) {
    const taxResult = await calculateTax(subtotal, shippingAddress);
    tax = taxResult.tax;
  }
  
  // Mock discount
  const discount = discountCode ? subtotal * 0.1 : 0; // 10% off with any code
  
  const total = subtotal + shipping + tax - discount;
  
  return {
    subtotal,
    shipping,
    tax,
    discount,
    total,
    formattedSubtotal: formatPrice(subtotal),
    formattedShipping: shipping === 0 ? 'Free' : formatPrice(shipping),
    formattedTax: tax === 0 ? 'Included' : formatPrice(tax),
    formattedDiscount: discount === 0 ? '' : `-${formatPrice(discount)}`,
    formattedTotal: formatPrice(total),
  };
};

// ============================================
// TRACKING
// ============================================

/**
 * Get tracking info
 * BACKEND HANDOFF: GET /orders/:id/tracking
 */
export const getTrackingInfo = async (orderId: string): Promise<{
  status: OrderStatus;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  updates: Array<{ date: string; status: string; location?: string }>;
} | null> => {
  console.log('[Order] Getting tracking info:', orderId);
  
  // Mock tracking
  return {
    status: 'shipped',
    trackingNumber: '1234567890',
    trackingUrl: 'https://tracking.example.com/1234567890',
    estimatedDelivery: getEstimatedDelivery(3),
    updates: [
      { date: new Date().toISOString(), status: 'Package shipped', location: 'Lisbon, PT' },
      { date: new Date(Date.now() - 86400000).toISOString(), status: 'Order confirmed' },
    ],
  };
};

// ============================================
// HELPERS
// ============================================

const generateOrderNumber = (): string => {
  const prefix = 'AM';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

const getEstimatedDelivery = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const getMockShippingOption = (id: string): ShippingOption => ({
  id,
  name: id === 'express' ? 'Express Shipping' : 'Standard Shipping',
  description: '',
  price: id === 'express' ? 25 : 0,
  estimatedDays: id === 'express' ? 3 : 7,
});
