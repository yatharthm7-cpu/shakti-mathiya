import { motion } from 'motion/react';
import { products } from '../data';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function ProductPreview() {
  const { t } = useLanguage();
  const { setActivePage } = useNavigation();

  // Curated list of best sellers
  const featuredIds = ['m1', 'u1', 'k1', 's3'];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));

  return (
    <section className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-brand-saffron/10 rounded-full blur-[50px] sm:blur-[100px] pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-2 px-4 rounded-full border border-brand-maroon/20 text-brand-maroon text-[10px] font-bold tracking-widest uppercase mb-4 bg-brand-cream-muted">
              {t('hero.badge') || "Authentic Gujarati Taste"}
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif text-brand-brown mb-4">
              Our Signature Delicacies
            </h2>
            <div className="w-24 h-[2px] bg-brand-maroon mx-auto mb-6"></div>
            <p className="text-brand-brown-light max-w-xl mx-auto text-sm leading-relaxed font-sans">
              A curated selection of our most loved traditional Gujarati snacks, handcrafted using time-honored family recipes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <ProductCard 
                product={product} 
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MagneticButton
              as="button"
              onClick={() => setActivePage('menu')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-maroon text-white border-b-2 border-brand-saffron rounded-full font-sans text-sm font-semibold tracking-wider hover:translate-y-[-2px] transition-transform duration-300 shadow-lg shadow-brand-maroon/10"
            >
              Explore Full Products Menu
              <ArrowRight className="w-4 h-4 text-brand-saffron" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
