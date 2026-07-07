import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  alt: string;
  className?: string;
}

export default function LazyImage({ src, alt, className = '', ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Safely encode URLs that have spaces or special characters (e.g. Gujarati script or spaces)
  const encodedSrc = src ? encodeURI(src) : '';

  // Reset loaded state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setIsInView(false);
  }, [encodedSrc]);

  useEffect(() => {
    // Fail-safe fallback timer: guarantees images load on devices/iframes where IntersectionObserver fails
    const fallbackTimer = setTimeout(() => {
      setIsInView(true);
    }, 200);

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      clearTimeout(fallbackTimer);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          clearTimeout(fallbackTimer);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      {
        rootMargin: '120px', // slightly wider margin to pre-load comfortably
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [encodedSrc]);

  if (!encodedSrc) {
    return (
      <div className={`relative overflow-hidden ${className} bg-brand-cream-muted`} />
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Skeleton or blur placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-brand-cream-muted animate-pulse" />
      )}
      
      {/* Actual image */}
      {isInView && (
        <motion.img
          src={encodedSrc}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className={`w-full h-full ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      )}
    </div>
  );
}
