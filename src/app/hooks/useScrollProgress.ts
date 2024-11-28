import { useEffect, useState, useCallback } from 'react';

export const useScrollProgress = (containerRef: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    const scrollWidth = element.scrollWidth - element.clientWidth;
    const scrolled = element.scrollLeft;
    const progress = (scrolled / scrollWidth) * 100;
    
    setProgress(Math.min(100, Math.max(0, progress)));
  }, [containerRef]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, handleScroll]);

  return progress;
};
