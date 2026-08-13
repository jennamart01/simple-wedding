import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<any>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold });

    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [threshold]);

  return { domRef, isVisible };
};
