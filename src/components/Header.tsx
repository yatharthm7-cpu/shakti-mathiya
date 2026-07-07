import { Menu, X, ShoppingCart, Heart, Search, User, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activePage, setActivePage, setSelectedCategory } = useNavigation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'menu', category: string | null = null, elementId: string | null = null) => {
    setActivePage(page);
    setSelectedCategory(category);
    setIsOpen(false);

    if (elementId) {
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in">
      <header 
        className={`fixed top-0 z-[100] w-full transition-all duration-300 bg-white border-b border-gray-200 py-4 lg:py-5`}
      >
        <div className="px-5 sm:px-8 lg:px-12 xl:px-20">
          <div className="flex justify-between items-center">
            
            {/* Left: Brand Name / Logo */}
            <button onClick={() => handleNavClick('home')} aria-label="Go to Shree Shakti Home Page" className="flex-shrink-0 flex items-center focus:outline-none cursor-pointer">
              <img 
                src="/logo.png" 
                alt="Shree Shakti Logo" 
                className="h-12 sm:h-14 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.className = 'font-sans font-semibold text-xl tracking-tight text-black';
                  fallback.innerText = 'Shree Shakti';
                  e.currentTarget.parentNode?.appendChild(fallback);
                }}
              />
            </button>
            
            {/* Center: Nav Links */}
            <nav className="hidden xl:flex items-center gap-8 animate-fade-in">
              <button 
                onClick={() => handleNavClick('home')} 
                className="font-sans text-[15px] font-medium transition-colors cursor-pointer text-gray-800 hover:text-brand-maroon"
              >
                {t('nav.home')}
              </button>

              <button 
                onClick={() => handleNavClick('home', null, 'products')} 
                className="font-sans text-[15px] font-medium transition-colors cursor-pointer text-gray-800 hover:text-brand-maroon"
              >
                Products Menu
              </button>

              <button 
                onClick={() => handleNavClick('home', 'Mathiya', 'category-mathiya')} 
                className="font-sans text-[15px] font-medium text-gray-800 hover:text-brand-maroon transition-colors cursor-pointer"
              >
                Mathiya & Chorafali
              </button>
              
              <button 
                onClick={() => handleNavClick('home', 'Udad Papad', 'category-udad-papad')} 
                className="font-sans text-[15px] font-medium text-gray-800 hover:text-brand-maroon transition-colors cursor-pointer"
              >
                Papad's
              </button>
              
              <button 
                onClick={() => handleNavClick('home', 'HomeMade Namkeen', 'category-homemade-namkeen')} 
                className="font-sans text-[15px] font-medium text-gray-800 hover:text-brand-maroon transition-colors cursor-pointer"
              >
                Namkeen
              </button>

              <button 
                onClick={() => handleNavClick('home', null, 'contact')} 
                className="font-sans text-[15px] font-medium text-gray-800 hover:text-brand-maroon transition-colors cursor-pointer"
              >
                Exports Inquiry
              </button>
              
              <button 
                onClick={() => handleNavClick('home', null, 'about')} 
                className="font-sans text-[15px] font-medium text-gray-800 hover:text-brand-maroon transition-colors cursor-pointer"
              >
                About Us
              </button>
            </nav>

            {/* Right: Icons */}
            <div className="flex items-center gap-4 sm:gap-5 lg:gap-6 animate-slide-right">
              {/* Dedicated Home button for mobile/tablet screens to return easily */}
              <button 
                onClick={() => handleNavClick('home')} 
                className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 bg-brand-cream hover:bg-brand-cream-muted border border-brand-maroon/20 rounded-full text-brand-maroon text-xs font-bold transition-all cursor-pointer shadow-sm"
                aria-label="Return to Home"
              >
                <Home size={14} className="text-brand-maroon" />
                <span>{t('nav.home')}</span>
              </button>

              <button aria-label="Search traditional snacks" className="text-gray-700 hover:text-brand-saffron transition-colors">
                <Search size={22} strokeWidth={1.5} />
              </button>
              
              <button aria-label="View favorite snacks" className="text-gray-700 hover:text-brand-saffron transition-colors hidden sm:block">
                <Heart size={22} strokeWidth={1.5} />
              </button>

              <button aria-label="User account profile" className="text-gray-700 hover:text-brand-saffron transition-colors hidden sm:block">
                <User size={22} strokeWidth={1.5} />
              </button>

              <button 
                onClick={() => setIsOpen(true)}
                className="xl:hidden text-gray-700 focus:outline-none ml-2"
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="fixed inset-0 z-[200] bg-white flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <img 
                  src="/logo.png" 
                  alt="Shree Shakti Logo" 
                  className="h-10 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('span');
                    fallback.className = 'font-sans font-semibold text-xl tracking-tight text-black';
                    fallback.innerText = 'Shree Shakti';
                    e.currentTarget.parentNode?.appendChild(fallback);
                  }}
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800 focus:outline-none p-2"
                  aria-label="Close menu"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto">
                <button onClick={() => handleNavClick('home')} className="text-xl font-sans text-left text-gray-800 hover:text-brand-maroon focus:outline-none cursor-pointer">{t('nav.home')}</button>
                <button onClick={() => handleNavClick('home', null, 'products')} className="text-xl font-sans text-left text-gray-800 hover:text-brand-maroon focus:outline-none cursor-pointer">Products Menu</button>
                <button onClick={() => handleNavClick('home', 'Mathiya', 'category-mathiya')} className="text-xl font-sans text-left text-gray-800 hover:text-brand-maroon focus:outline-none cursor-pointer">Mathiya & Chorafali</button>
                <button onClick={() => handleNavClick('home', 'Udad Papad', 'category-udad-papad')} className="text-xl font-sans text-left text-gray-800 hover:text-brand-maroon focus:outline-none cursor-pointer">Papad's</button>
                <button onClick={() => handleNavClick('home', 'HomeMade Namkeen', 'category-homemade-namkeen')} className="text-xl font-sans text-left text-gray-800 hover:text-brand-maroon focus:outline-none cursor-pointer">Namkeen</button>
                <button onClick={() => handleNavClick('home', null, 'contact')} className="text-xl font-sans text-left text-gray-800 hover:text-brand-maroon focus:outline-none cursor-pointer">Exports Inquiry</button>
                <button onClick={() => handleNavClick('home', null, 'about')} className="text-xl font-sans text-left text-gray-800 hover:text-brand-maroon focus:outline-none cursor-pointer">About Us</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
