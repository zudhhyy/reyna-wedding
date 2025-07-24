import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseScrollToNextOptions {
  nextPage: string;
  threshold?: number;
  requireScroll?: boolean;
}

export function useScrollToNext({ 
  nextPage, 
  threshold = 10, 
  requireScroll = true 
}: UseScrollToNextOptions) {
  const router = useRouter();
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Only set hasScrolled true when user actually moves
      if (scrollTop > lastScrollTop.current) {
        setHasScrolled(true);
      }
      lastScrollTop.current = scrollTop;

      // Check if user has scrolled to the bottom
      const isAtBottom = scrollTop + windowHeight >= documentHeight - threshold;
      
      // Navigate if at bottom and either no scroll requirement or user has scrolled
      if (isAtBottom && (!requireScroll || hasScrolled)) {
        router.push(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled, router, nextPage, threshold, requireScroll]);

  return { hasScrolled };
} 