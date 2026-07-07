import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { products } from '../data';

// Collect critical images to preload (Hero banner and all product images)
const criticalImages = [
  '/banner.png',
  ...products.map((p) => p.imageUrl).filter(Boolean) as string[]
];

export default function Loader({ onComplete }: { onComplete: () => void; key?: string }) {
  const [progress, setProgress] = useState(0);
  const { isPreloaded } = useImagePreloader(criticalImages);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Smoothly progress up to 90%
        if (prev < 90) {
          const increment = Math.floor(Math.random() * 12) + 6;
          return Math.min(prev + increment, 90);
        }
        
        // Once critical images are fully cached/preloaded, complete the last 10%
        if (isPreloaded) {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 600);
            return 100;
          }
          return prev + 5;
        }
        
        return prev;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete, isPreloaded]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-brand-cream flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Rotating decorative rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-brand-maroon opacity-50"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-b-2 border-brand-saffron opacity-50"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="font-serif text-3xl font-bold text-brand-maroon uppercase tracking-widest">
              Shakti<br/><span className="text-brand-brown font-light">Mathiya</span>
            </h1>
          </motion.div>
        </div>
        
        <div className="mt-12 w-64">
          <div className="h-[2px] w-full bg-brand-brown/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-maroon rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
          <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-brand-brown uppercase tracking-widest font-button">
            <span>Loading Experience</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
