import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function ScrollReveal({ children, className = '', staggerDelay = 50 }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Detect mobile/touch device or iframe environment
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);

    // Select candidate elements to animate within this section.
    const customItems = el.querySelectorAll('.reveal-item');
    
    let targets: HTMLElement[] = [];
    if (customItems.length > 0) {
      targets = Array.from(customItems) as HTMLElement[];
    } else {
      // Find standard layout elements that represent key content block items
      const defaultSelectors = [
        'h2',
        '.grid > div',
        'p.max-w-2xl',
        'p.max-w-xl',
        '.organic-shape',
        'button',
        '.glass-panel',
      ];
      const candidates = el.querySelectorAll(defaultSelectors.join(', '));
      const filtered: HTMLElement[] = [];
      candidates.forEach((candidate) => {
        const htmlCand = candidate as HTMLElement;
        // Avoid double-animating deeply nested elements if they are inside grid cards
        if (!htmlCand.parentElement?.closest('.grid > div')) {
          filtered.push(htmlCand);
        }
      });
      targets = filtered.length > 0 ? filtered : [el];
    }

    // Bypass animation on mobile to ensure instant visibility and flawless rendering
    if (isMobile) {
      targets.forEach((target) => {
        target.style.opacity = '1';
        target.style.transform = 'none';
      });
      return;
    }

    // Apply initial state: hidden & shifted down for desktop
    targets.forEach((target) => {
      target.style.opacity = '0';
      target.style.transform = 'translateY(30px)';
      target.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      target.style.willChange = 'opacity, transform';
    });

    let revealed = false;
    const revealAll = () => {
      if (revealed) return;
      revealed = true;
      targets.forEach((target, index) => {
        setTimeout(() => {
          target.style.opacity = '1';
          target.style.transform = 'none';
        }, Math.min(index * staggerDelay, 500));
      });
    };

    // Robust fail-safe timer
    const fallbackTimer = setTimeout(() => {
      revealAll();
    }, 800);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer);
            revealAll();
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.01, // Trigger when even 1% of the section enters to be fast
        rootMargin: '100px 0px 100px 0px', // Pre-trigger
      }
    );

    observer.observe(el);

    return () => {
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}


