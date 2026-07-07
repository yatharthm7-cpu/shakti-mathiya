import { motion } from 'motion/react';
import { Product } from '../data';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LazyImage from './LazyImage';

interface ProductCardProps {
  key?: string | number;
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div 
      whileHover={isMobile ? {} : { 
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(143, 0, 13, 0.08)",
        borderColor: "rgba(224, 130, 4, 0.4)"
      }}
      whileTap={{
        scale: 0.97,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgba(143, 0, 13, 0.25)",
        boxShadow: "0 4px 12px rgba(143, 0, 13, 0.05)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="glass-panel p-4 rounded-3xl overflow-hidden group flex flex-col h-full border border-brand-brown/5 bg-white/40 backdrop-blur-md transition-colors duration-300 cursor-pointer select-none"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-cream-muted mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/10 to-transparent z-10" />
        <LazyImage 
          src={product.imageUrl || ''} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 mix-blend-multiply"
        />
      </div>
      <div className="flex flex-col flex-grow px-2 pb-2">
        <div className="mb-3">
          <span className="text-[10px] font-button font-bold text-brand-saffron uppercase tracking-widest bg-brand-saffron/10 px-3 py-1 rounded-full">{product.category}</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-brand-brown mb-3 group-hover:text-brand-maroon transition-colors">{product.name}</h3>
        {product.description && (
          <p className="text-brand-brown-light text-xs mb-6 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>
        )}
        <div className="mt-auto pt-4 border-t border-brand-brown/10 flex items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-sans font-bold text-brand-maroon">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-brand-brown-light line-through opacity-70">{product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
