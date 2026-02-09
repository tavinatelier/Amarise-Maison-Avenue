import { useState, useEffect } from 'react';
import { getAnimationSettings, prefersReducedMotion } from '@/lib/performance';

/**
 * Hook to get performance-aware animation settings
 * Respects user preferences and device capabilities
 */
export function useAnimationSettings() {
  const [settings, setSettings] = useState(getAnimationSettings);

  useEffect(() => {
    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      setSettings(getAnimationSettings());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return settings;
}

/**
 * Hook to check if reduced motion is preferred
 */
export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

/**
 * Hook for viewport-based loading
 * Returns true when element is near viewport
 */
export function useNearViewport(
  ref: React.RefObject<HTMLElement>,
  rootMargin = '200px'
) {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isNear;
}
