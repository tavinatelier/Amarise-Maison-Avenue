/**
 * Performance utilities for AMARISÉ
 * BACKEND HANDOFF: These utilities help with frontend performance
 */

/**
 * Debounce function for scroll/resize events
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Throttle function for high-frequency events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage));
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device is low-powered (for performance adjustments)
 */
export function isLowPoweredDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  
  // Check for low memory
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory && nav.deviceMemory < 4) return true;
  
  // Check for slow connection
  const connection = (navigator as Navigator & { 
    connection?: { effectiveType?: string } 
  }).connection;
  if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
    return true;
  }
  
  return false;
}

/**
 * Get optimized animation settings based on device capability
 */
export function getAnimationSettings() {
  const reducedMotion = prefersReducedMotion();
  const lowPower = isLowPoweredDevice();
  
  if (reducedMotion) {
    return {
      duration: 0,
      ease: 'linear',
      enableParallax: false,
      enableBlur: false,
    };
  }
  
  if (lowPower) {
    return {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      enableParallax: false,
      enableBlur: false,
    };
  }
  
  return {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
    enableParallax: true,
    enableBlur: true,
  };
}
