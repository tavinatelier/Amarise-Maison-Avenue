/**
 * PRODUCT SERVICE - DETAILED PRODUCT DATA
 * BACKEND HANDOFF: Replace mock data with Commerce + CMS API calls
 * 
 * This service provides full product detail pages, variants, and inventory.
 * Separate from content.service.ts which handles listings.
 */

import { isProductEnabled, isProductPurchasable, getProductStatus } from '@/config/admin.config';
import { FEATURES, formatPrice } from '@/config/site.config';
import productDetailsData from '@/data/mock/product-details.json';

// ============================================
// TYPES - STABLE API CONTRACTS
// ============================================

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  price?: number;
  inStock: boolean;
}

export interface ProductIngredient {
  name: string;
  origin: string;
  benefit: string;
}

export interface ProductDetail {
  id: string;
  slug: string;
  category: 'beauty' | 'atelier' | 'lifestyle';
  status: 'active' | 'soft-launch' | 'archived';
  isPurchasable: boolean;
  collection?: string;
  
  hero: {
    caption: string;
    title: string;
    subtitle: string;
  };
  
  pricing: {
    price: number;
    currency: string;
    compareAtPrice: number | null;
    formattedPrice?: string;
    formattedCompareAtPrice?: string;
  };
  
  images: {
    gallery: string[];
    featured: string;
  };
  
  variants: {
    type: 'shade' | 'size' | 'finish' | 'scent';
    options: ProductVariant[];
    defaultVariant: string;
  };
  
  story: {
    paragraphs: string[];
  };
  
  details: Record<string, string>;
  
  ingredients?: ProductIngredient[];
  ingredientsPhilosophy?: string;
  
  editorial?: {
    title: string;
    image: string;
    paragraphs: string[];
  };
  
  relatedProducts: string[];
  
  seo: {
    title: string;
    description: string;
  };
}

export interface ProductDetailAvailability {
  isAvailable: boolean;
  isEnabled: boolean;
  isPurchasable: boolean;
  status: 'active' | 'soft-launch' | 'archived' | 'hidden';
  selectedVariantInStock: boolean;
  message?: string;
}

// ============================================
// PRODUCT DETAIL OPERATIONS
// ============================================

/**
 * Get full product details by ID
 * BACKEND HANDOFF: GET /products/:id/full
 */
export const getProductDetail = async (
  productId: string
): Promise<ProductDetail | null> => {
  console.log('[Product] Getting product detail:', productId);
  
  const data = productDetailsData as Record<string, any>;
  const product = data[productId];
  
  if (!product) return null;
  
  // Apply admin overrides
  const enabled = isProductEnabled(productId);
  if (!enabled) return null;
  
  const status = getProductStatus(productId, product.status);
  const purchasable = isProductPurchasable(productId);
  
  // Format prices
  const formattedPrice = formatPrice(product.pricing.price);
  const formattedCompareAtPrice = product.pricing.compareAtPrice 
    ? formatPrice(product.pricing.compareAtPrice) 
    : null;
  
  return {
    ...product,
    status,
    isPurchasable: purchasable && product.isPurchasable,
    pricing: {
      ...product.pricing,
      formattedPrice,
      formattedCompareAtPrice,
    },
  } as ProductDetail;
};

/**
 * Get product detail by slug
 * BACKEND HANDOFF: GET /products/slug/:slug
 */
export const getProductDetailBySlug = async (
  slug: string
): Promise<ProductDetail | null> => {
  console.log('[Product] Getting product by slug:', slug);
  
  const data = productDetailsData as Record<string, any>;
  
  // Find product by slug
  const entry = Object.entries(data).find(([_, product]) => product.slug === slug);
  
  if (!entry) return null;
  
  return getProductDetail(entry[0]);
};

/**
 * Get product availability details
 * BACKEND HANDOFF: GET /products/:id/availability
 */
export const getProductDetailAvailability = async (
  productId: string,
  variantId?: string
): Promise<ProductDetailAvailability> => {
  console.log('[Product] Checking availability:', { productId, variantId });
  
  const product = await getProductDetail(productId);
  
  if (!product) {
    return {
      isAvailable: false,
      isEnabled: false,
      isPurchasable: false,
      status: 'hidden',
      selectedVariantInStock: false,
      message: 'Product not found',
    };
  }
  
  // Check variant stock
  let selectedVariantInStock = true;
  if (variantId) {
    const variant = product.variants.options.find(v => v.id === variantId);
    selectedVariantInStock = variant?.inStock ?? false;
  }
  
  // Build message
  let message: string | undefined;
  if (product.status === 'soft-launch') {
    message = 'Coming soon';
  } else if (product.status === 'archived') {
    message = 'No longer available';
  } else if (!selectedVariantInStock) {
    message = 'This option is currently out of stock';
  } else if (!product.isPurchasable) {
    message = 'Not available for purchase';
  }
  
  return {
    isAvailable: product.status === 'active' && selectedVariantInStock,
    isEnabled: isProductEnabled(productId),
    isPurchasable: product.isPurchasable && selectedVariantInStock,
    status: product.status,
    selectedVariantInStock,
    message,
  };
};

/**
 * Get selected variant price
 */
export const getVariantPrice = (
  product: ProductDetail,
  variantId: string
): { price: number; formattedPrice: string } => {
  const variant = product.variants.options.find(v => v.id === variantId);
  const price = variant?.price ?? product.pricing.price;
  
  return {
    price,
    formattedPrice: formatPrice(price),
  };
};

/**
 * Get purchase button configuration
 * BACKEND HANDOFF: Combines availability check with UI state
 */
export const getPurchaseButtonConfig = async (
  productId: string,
  variantId?: string
): Promise<{
  label: string;
  disabled: boolean;
  action: 'add' | 'preorder' | 'waitlist' | 'notify' | 'none';
  message?: string;
}> => {
  const availability = await getProductDetailAvailability(productId, variantId);
  
  // Not available at all
  if (!availability.isEnabled) {
    return {
      label: 'Not Available',
      disabled: true,
      action: 'none',
    };
  }
  
  // Soft launch
  if (availability.status === 'soft-launch') {
    return {
      label: 'Coming Soon',
      disabled: true,
      action: 'none',
      message: 'This product will be available soon',
    };
  }
  
  // Archived
  if (availability.status === 'archived') {
    return {
      label: 'No Longer Available',
      disabled: true,
      action: 'none',
    };
  }
  
  // Out of stock
  if (!availability.selectedVariantInStock) {
    return {
      label: 'Join Waitlist',
      disabled: false,
      action: 'waitlist',
      message: 'Get notified when this is back in stock',
    };
  }
  
  // Not purchasable (commerce disabled or maintenance)
  if (!availability.isPurchasable) {
    return {
      label: 'Notify Me',
      disabled: false,
      action: 'notify',
      message: 'Be the first to know when shopping is available',
    };
  }
  
  // Available for purchase
  return {
    label: 'Add to Ritual',
    disabled: false,
    action: 'add',
  };
};

/**
 * Get related products
 * BACKEND HANDOFF: GET /products/:id/related
 */
export const getRelatedProducts = async (
  productId: string
): Promise<Array<{
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  price: string;
}>> => {
  console.log('[Product] Getting related products:', productId);
  
  const product = await getProductDetail(productId);
  if (!product) return [];
  
  const related: Array<{
    id: string;
    title: string;
    subtitle: string;
    image: string;
    href: string;
    price: string;
  }> = [];
  
  for (const relatedId of product.relatedProducts) {
    const relatedProduct = await getProductDetail(relatedId);
    if (relatedProduct) {
      related.push({
        id: relatedProduct.id,
        title: relatedProduct.hero.title,
        subtitle: relatedProduct.hero.subtitle,
        image: relatedProduct.images.featured,
        href: `/${relatedProduct.category}/${relatedProduct.slug}`,
        price: relatedProduct.pricing.formattedPrice || formatPrice(relatedProduct.pricing.price),
      });
    }
  }
  
  return related;
};

// ============================================
// INVENTORY OPERATIONS (MOCK)
// ============================================

/**
 * Check stock level
 * BACKEND HANDOFF: GET /inventory/:productId/:variantId
 */
export const checkStockLevel = async (
  productId: string,
  variantId: string
): Promise<{
  inStock: boolean;
  stockLevel: 'in-stock' | 'low-stock' | 'out-of-stock';
  quantity?: number;
}> => {
  console.log('[Product] Checking stock:', { productId, variantId });
  
  const product = await getProductDetail(productId);
  if (!product) {
    return { inStock: false, stockLevel: 'out-of-stock' };
  }
  
  const variant = product.variants.options.find(v => v.id === variantId);
  
  return {
    inStock: variant?.inStock ?? true,
    stockLevel: variant?.inStock ? 'in-stock' : 'out-of-stock',
    quantity: undefined, // Don't expose exact quantity
  };
};

/**
 * Reserve stock for checkout
 * BACKEND HANDOFF: POST /inventory/reserve
 */
export const reserveStock = async (
  productId: string,
  variantId: string,
  quantity: number
): Promise<{ success: boolean; reservationId?: string }> => {
  console.log('[Product] Reserving stock:', { productId, variantId, quantity });
  
  // Mock: Always successful
  return {
    success: true,
    reservationId: `res_${Date.now()}`,
  };
};
