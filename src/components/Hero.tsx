import { ArrowRight, MessageSquare, Flame, CircleDot, Sparkles, HelpCircle, Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigation } from "../context/NavigationContext";
import { motion } from "motion/react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const { t } = useLanguage();
  const { setActivePage, setSelectedCategory } = useNavigation();

  const handleQuickNav = (page: 'home' | 'menu', category: string | null = null, elementId: string | null = null) => {
    setActivePage('home');
    setSelectedCategory(category);

    const targetId = elementId || (category ? `category-${category.replace(/\s+/g, '-').toLowerCase()}` : null);
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const quickLinks = [
    {
      label: "Mathiya & Chorafali",
      icon: <Sparkles className="w-4 h-4 text-brand-saffron" />,
      onClick: () => handleQuickNav('home', 'Mathiya', 'category-mathiya')
    },
    {
      label: "Papad Specialties",
      icon: <Flame className="w-4 h-4 text-brand-saffron" />,
      onClick: () => handleQuickNav('home', 'Udad Papad', 'category-udad-papad')
    },
    {
      label: "Homemade Namkeen",
      icon: <CircleDot className="w-4 h-4 text-brand-saffron" />,
      onClick: () => handleQuickNav('home', 'HomeMade Namkeen', 'category-homemade-namkeen')
    },
    {
      label: "Bulk & Exports Inquiry",
      icon: <MessageSquare className="w-4 h-4 text-brand-saffron" />,
      onClick: () => handleQuickNav('home', null, 'contact')
    },
    {
      label: "Our Heritage Story",
      icon: <Users className="w-4 h-4 text-brand-saffron" />,
      onClick: () => handleQuickNav('home', null, 'about')
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen lg:min-h-[921px] flex flex-col items-center justify-center pt-20 overflow-hidden bg-brand-cream">
      {/* Background image for desktop ONLY (large screens) to avoid clashing and cropping on tablet & mobile */}
      <div 
        className="hidden lg:block absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/banner.png')" }}
      />

      {/* Responsive Banner Image for Mobile & Tablet - full visibility, zero cropping */}
      <div className="block lg:hidden w-full max-w-xl px-4 pt-4 pointer-events-none z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-2xl border border-brand-maroon/15 shadow-md bg-white/50"
        >
          <img 
            src="/banner.png" 
            alt="Shree Shakti traditional snacks banner" 
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Gradient overlay (Desktop only, since mobile/tablet has solid background under the text) */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-cream/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 md:px-16 max-w-7xl mx-auto flex flex-col items-center w-full mt-6 lg:mt-0">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif font-bold text-brand-maroon text-[32px] leading-[38px] sm:text-[40px] sm:leading-[48px] md:text-[50px] md:leading-[58px] lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em] max-w-4xl mb-6"
        >
          {t("hero.title") || "Authentic Homemade Papad & Traditional Gujarati Snacks"}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-lg leading-7 text-brand-brown-light max-w-2xl mb-10"
        >
          {t("hero.desc") || "Crafted with tradition, purity, and love. Experience the rich heritage of handcrafted snacks in every bite."}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full relative z-30 mb-12"
        >
          <MagneticButton
            as="button"
            onClick={() => handleQuickNav('home', null, 'products')}
            className="w-full sm:w-auto px-8 py-4 bg-brand-maroon text-white border-b-2 border-brand-saffron rounded-full font-sans text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_-5px_rgba(74,44,0,0.25)] text-center flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Menu & Order
            <ArrowRight className="w-4 h-4 text-brand-saffron" />
          </MagneticButton>

          <button 
            onClick={() => handleQuickNav('home', null, 'contact')}
            className="w-full sm:w-auto px-8 py-4 bg-brand-cream/80 backdrop-blur-[20px] border border-brand-saffron/20 rounded-full font-sans text-sm font-semibold tracking-widest uppercase text-brand-saffron-dark hover:text-brand-maroon transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(74,44,0,0.08)] text-center cursor-pointer hover:border-brand-maroon/40"
          >
            Contact Us
          </button>
        </motion.div>

        {/* Quick Links Shortcut Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-4xl border-t border-brand-maroon/10 pt-8"
        >
          <p className="font-serif text-sm font-medium text-brand-brown/70 mb-4 tracking-wider">
            Quick Navigation — Jump Straight to what you need:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={link.onClick}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/70 hover:bg-white border border-brand-maroon/10 hover:border-brand-maroon/30 rounded-full text-xs font-semibold text-brand-brown transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md"
              >
                {link.icon}
                <span>{link.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave curve divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" className="relative block w-[calc(100%+1.3px)] h-[80px]">
          <path 
            fill="var(--color-brand-cream)"
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39 C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35 A600.21,600.21,0,0,0,321.39,56.44Z"
          />
        </svg>
      </div>
    </section>
  );
}
