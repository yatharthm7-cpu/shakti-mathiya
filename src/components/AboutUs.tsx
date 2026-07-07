import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import LazyImage from './LazyImage';

export default function AboutUs() {
  const { t } = useLanguage();

  const features = [
    "Premium Quality Ingredients",
    "Authentic Traditional Recipes",
    "100% Homemade Taste",
    "Hygienic Preparation",
    "Export Quality Standards",
    "Fresh & Crispy"
  ];

  return (
    <section id="about" className="py-32 bg-brand-cream relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-brand-olive/10 rounded-full blur-[50px] sm:blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative flex justify-center"
          >
            <div className="organic-shape w-[300px] h-[300px] md:w-[450px] md:h-[450px] shadow-[0_30px_60px_-15px_rgba(74,44,0,0.2)] bg-brand-cream-muted">
              <LazyImage 
                src="/logo.png" 
                alt="Handmade Khakhra being prepared" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 w-32 h-32 glass-panel rounded-full flex items-center justify-center animate-bounce [animation-duration:3s]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"
                   fill="none" stroke="#755b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"/>
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
              </svg>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <span className="inline-block py-2 px-4 rounded-full border border-brand-maroon/20 text-brand-maroon text-[10px] font-bold tracking-widest uppercase mb-6 bg-brand-cream-muted">
              Our Heritage
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-brand-brown mb-8 leading-[1.1]">
              {t('about.title')} <br />
              <span className="italic font-light text-gradient">Shakti Mathiya</span>
            </h2>
            
            <p className="text-base text-brand-brown-light mb-6 leading-relaxed font-sans">
              {t('about.p1')} 
            </p>
            <p className="text-base text-brand-brown-light mb-12 leading-relaxed font-sans">
              {t('about.p2')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-saffron/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="text-brand-maroon w-5 h-5" />
                  </div>
                  <span className="font-medium font-serif text-brand-brown text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
