/**
 * PAYMENT SERVICE - MOCK IMPLEMENTATION
 * BACKEND HANDOFF: Replace with Stripe, PayPal, or other payment provider
 * 
 * This service simulates payment flows for UI development.
 * All functions return mock responses - no real payments processed.
 */

import { COMMERCE_CONTROLS, isCommerceAvailable } from '@/config/admin.config';
import { CURRENCY, formatPrice } from '@/config/site.config';

// ============================================
// TYPES - STABLE API CONTRACTS
// ============================================

export type PaymentStatus = 
  | 'idle'
  | 'initializing'
  | 'awaiting_payment'
  | 'processing'
  | 'requires_action'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 
  | 'card'
  | 'apple_pay'
  | 'google_pay'
  | 'paypal'
  | 'klarna'
  | 'afterpay';

export interface PaymentIntent {
  id: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  clientSecret?: string;
  paymentMethod?: PaymentMethod;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntent: PaymentIntent;
  redirectUrl?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface RefundRequest {
  paymentIntentId: string;
  amount?: number; // Partial refund
  reason?: string;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed';
}

// ============================================
// PAYMENT INTENT OPERATIONS
// ============================================

/**
 * Create a payment intent
 * BACKEND HANDOFF: POST /payments/intents
 * 
 * @param amount - Amount in cents/smallest currency unit
 * @param metadata - Order metadata
 */
export const createPaymentIntent = async (
  amount: number,
  metadata?: Record<string, string>
): Promise<PaymentResult> => {
  console.log('[Payment] Creating payment intent:', { amount, metadata });
  
  // Check if commerce is available
  if (!isCommerceAvailable()) {
    return {
      success: false,
      paymentIntent: createMockPaymentIntent(amount, 'failed'),
      errorCode: 'COMMERCE_DISABLED',
      errorMessage: 'Checkout is currently unavailable',
    };
  }
  
  // Check minimum order value
  if (amount < COMMERCE_CONTROLS.minimumOrderValue * 100) {
    return {
      success: false,
      paymentIntent: createMockPaymentIntent(amount, 'failed'),
      errorCode: 'MINIMUM_NOT_MET',
      errorMessage: `Minimum order value is ${formatPrice(COMMERCE_CONTROLS.minimumOrderValue)}`,
    };
  }
  
  // Mock successful creation
  const paymentIntent = createMockPaymentIntent(amount, 'awaiting_payment');
  
  return {
    success: true,
    paymentIntent,
    redirectUrl: '/checkout/payment', // Would be Stripe checkout URL
  };
};

/**
 * Confirm a payment
 * BACKEND HANDOFF: POST /payments/intents/:id/confirm
 */
export const confirmPayment = async (
  paymentIntentId: string,
  paymentMethod: PaymentMethod = 'card'
): Promise<PaymentResult> => {
  console.log('[Payment] Confirming payment:', { paymentIntentId, paymentMethod });
  
  // Simulate processing delay
  await simulateDelay(1500);
  
  // Mock: 90% success rate for demo purposes
  const success = Math.random() > 0.1;
  
  if (success) {
    return {
      success: true,
      paymentIntent: {
        id: paymentIntentId,
        status: 'succeeded',
        amount: 0, // Would come from server
        currency: CURRENCY.getCurrent().code,
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      redirectUrl: '/checkout/success',
    };
  }
  
  // Simulate failure
  return {
    success: false,
    paymentIntent: {
      id: paymentIntentId,
      status: 'failed',
      amount: 0,
      currency: CURRENCY.getCurrent().code,
      errorMessage: 'Your card was declined. Please try another payment method.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    errorCode: 'CARD_DECLINED',
    errorMessage: 'Your card was declined. Please try another payment method.',
  };
};

/**
 * Get payment intent status
 * BACKEND HANDOFF: GET /payments/intents/:id
 */
export const getPaymentIntent = async (
  paymentIntentId: string
): Promise<PaymentIntent | null> => {
  console.log('[Payment] Getting payment intent:', paymentIntentId);
  
  // Mock: Return a pending payment
  return {
    id: paymentIntentId,
    status: 'awaiting_payment',
    amount: 0,
    currency: CURRENCY.getCurrent().code,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Cancel a payment intent
 * BACKEND HANDOFF: POST /payments/intents/:id/cancel
 */
export const cancelPayment = async (
  paymentIntentId: string
): Promise<PaymentResult> => {
  console.log('[Payment] Cancelling payment:', paymentIntentId);
  
  return {
    success: true,
    paymentIntent: {
      id: paymentIntentId,
      status: 'cancelled',
      amount: 0,
      currency: CURRENCY.getCurrent().code,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

// ============================================
// REFUND OPERATIONS
// ============================================

/**
 * Request a refund
 * BACKEND HANDOFF: POST /payments/refunds
 */
export const requestRefund = async (
  request: RefundRequest
): Promise<RefundResult> => {
  console.log('[Payment] Requesting refund:', request);
  
  // Mock successful refund
  return {
    success: true,
    refundId: `ref_${Date.now()}`,
    amount: request.amount || 0,
    status: 'succeeded',
  };
};

// ============================================
// PAYMENT METHOD OPERATIONS
// ============================================

/**
 * Get available payment methods for region
 * BACKEND HANDOFF: GET /payments/methods
 */
export const getAvailablePaymentMethods = async (
  region: string = 'EU'
): Promise<PaymentMethod[]> => {
  console.log('[Payment] Getting available methods for:', region);
  
  // Base methods available everywhere
  const methods: PaymentMethod[] = ['card'];
  
  // Add region-specific methods
  switch (region) {
    case 'EU':
      methods.push('klarna', 'paypal');
      break;
    case 'US':
      methods.push('apple_pay', 'google_pay', 'paypal', 'afterpay');
      break;
    case 'UK':
      methods.push('apple_pay', 'google_pay', 'klarna', 'paypal');
      break;
    case 'AU':
      methods.push('apple_pay', 'afterpay');
      break;
    default:
      methods.push('paypal');
  }
  
  return methods;
};

/**
 * Validate payment method for amount
 * BACKEND HANDOFF: POST /payments/validate
 */
export const validatePaymentMethod = async (
  method: PaymentMethod,
  amount: number
): Promise<{ valid: boolean; message?: string }> => {
  console.log('[Payment] Validating method:', { method, amount });
  
  // Mock: Klarna has minimum
  if (method === 'klarna' && amount < 5000) { // 50.00 in cents
    return {
      valid: false,
      message: 'Klarna requires a minimum order of €50',
    };
  }
  
  return { valid: true };
};

// ============================================
// UI STATE HELPERS
// ============================================

/**
 * Get payment button state
 * Returns appropriate label and disabled state
 */
export const getPaymentButtonState = (
  status: PaymentStatus,
  amount: number
): {
  label: string;
  disabled: boolean;
  loading: boolean;
} => {
  const formattedAmount = formatPrice(amount / 100); // Convert cents to display
  
  switch (status) {
    case 'idle':
      return { 
        label: `Pay ${formattedAmount}`, 
        disabled: false, 
        loading: false 
      };
    case 'initializing':
      return { 
        label: 'Preparing...', 
        disabled: true, 
        loading: true 
      };
    case 'processing':
      return { 
        label: 'Processing...', 
        disabled: true, 
        loading: true 
      };
    case 'awaiting_payment':
      return { 
        label: `Pay ${formattedAmount}`, 
        disabled: false, 
        loading: false 
      };
    case 'requires_action':
      return { 
        label: 'Complete Payment', 
        disabled: false, 
        loading: false 
      };
    case 'succeeded':
      return { 
        label: 'Payment Complete', 
        disabled: true, 
        loading: false 
      };
    case 'failed':
      return { 
        label: 'Try Again', 
        disabled: false, 
        loading: false 
      };
    case 'cancelled':
      return { 
        label: `Pay ${formattedAmount}`, 
        disabled: false, 
        loading: false 
      };
    default:
      return { 
        label: `Pay ${formattedAmount}`, 
        disabled: false, 
        loading: false 
      };
  }
};

/**
 * Get payment status message for UI
 */
export const getPaymentStatusMessage = (
  status: PaymentStatus,
  errorMessage?: string
): { type: 'info' | 'success' | 'error'; message: string } | null => {
  switch (status) {
    case 'processing':
      return { type: 'info', message: 'Processing your payment...' };
    case 'succeeded':
      return { type: 'success', message: 'Payment successful!' };
    case 'failed':
      return { 
        type: 'error', 
        message: errorMessage || 'Payment failed. Please try again.' 
      };
    case 'cancelled':
      return { type: 'info', message: 'Payment was cancelled.' };
    default:
      return null;
  }
};

// ============================================
// MOCK HELPERS
// ============================================

const createMockPaymentIntent = (
  amount: number,
  status: PaymentStatus
): PaymentIntent => ({
  id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  status,
  amount,
  currency: CURRENCY.getCurrent().code,
  clientSecret: `pi_secret_${Date.now()}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const simulateDelay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));
