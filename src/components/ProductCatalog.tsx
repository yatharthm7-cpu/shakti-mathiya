import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { categories, products } from '../data';
import ProductCard from './ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../context/NavigationContext';
import { jsPDF } from 'jspdf';
import { Download, Volume2, VolumeX } from 'lucide-react';
import { playSnackRustle, isSoundMuted, setSoundMuted } from '../utils/audio';

export default function ProductCatalog() {
  const { t } = useLanguage();
  const { selectedCategory } = useNavigation();
  const [muted, setMuted] = useState(isSoundMuted());
  const lastActiveCategory = useRef<string | null>(null);
  const allowSound = useRef<boolean>(false);

  const handleDownloadMenu = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Colors
    const maroon = '#8F000D';
    const gold = '#FCCC38';
    const charcoal = '#1D1D03';
    const lightMuted = '#5A403E';

    // 1. Draw elegant double border
    doc.setDrawColor(143, 0, 13); // Maroon
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277); // Outer border
    doc.rect(11.5, 11.5, 187, 274); // Inner border

    // Decorate corners with small elegant gold lines
    doc.setDrawColor(252, 204, 56); // Gold
    doc.setLineWidth(0.8);
    // Top-left
    doc.line(10, 15, 15, 15);
    doc.line(15, 10, 15, 15);
    // Top-right
    doc.line(200, 15, 195, 15);
    doc.line(195, 10, 195, 15);
    // Bottom-left
    doc.line(10, 282, 15, 282);
    doc.line(15, 287, 15, 282);
    // Bottom-right
    doc.line(200, 282, 195, 282);
    doc.line(195, 287, 195, 282);

    // 2. Header
    doc.setTextColor(143, 0, 13); // Maroon
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('SHREE SHAKTI MATHIYA & CHORAFALI', 105, 24, { align: 'center' });

    doc.setTextColor(90, 64, 62); // lightMuted
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(10);
    doc.text('Where Tradition Meets Taste | Authentic Gujarati Snacks', 105, 30, { align: 'center' });

    // Gold separator line
    doc.setDrawColor(252, 204, 56); // Gold
    doc.setLineWidth(0.6);
    doc.line(30, 34, 180, 34);

    // Info details (Phone & Location)
    doc.setTextColor(29, 29, 3); // Charcoal
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Contact & WhatsApp: +91 91069 97110  |  Ahmedabad, Gujarat, India', 105, 40, { align: 'center' });

    doc.setDrawColor(143, 0, 13); // Maroon
    doc.setLineWidth(0.25);
    doc.line(15, 45, 195, 45);

    // Title: "OFFICIAL MENU & PRICE LIST"
    doc.setTextColor(143, 0, 13);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('OFFICIAL MENU & PRICE LIST', 105, 53, { align: 'center' });

    // 3. Loop through categories and list products
    let y = 62;
    
    categories.forEach((category) => {
      const categoryProducts = products.filter(p => p.category === category);
      if (categoryProducts.length === 0) return;

      // Check if we need to add a new page (need at least 30mm)
      if (y > 235) {
        doc.addPage();
        // Draw border for new page
        doc.setDrawColor(143, 0, 13);
        doc.setLineWidth(0.5);
        doc.rect(10, 10, 190, 277);
        doc.rect(11.5, 11.5, 187, 274);
        y = 25; // Reset y position on new page
      }

      // Category Header
      doc.setFillColor(254, 252, 207); // Soft yellow/cream
      doc.rect(15, y, 180, 7.5, 'F');
      doc.setTextColor(143, 0, 13);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(category.toUpperCase(), 18, y + 5.2);

      // Bottom border under category header
      doc.setDrawColor(143, 0, 13);
      doc.setLineWidth(0.4);
      doc.line(15, y + 7.5, 195, y + 7.5);
      y += 13;

      categoryProducts.forEach((product) => {
        if (y > 255) {
          doc.addPage();
          // Draw border for new page
          doc.setDrawColor(143, 0, 13);
          doc.setLineWidth(0.5);
          doc.rect(10, 10, 190, 277);
          doc.rect(11.5, 11.5, 187, 274);
          y = 25;
        }

        // Clean name (remove Gujarati characters to prevent jsPDF Unicode font box issue)
        const cleanName = product.name.split(' - ')[0];

        doc.setTextColor(29, 29, 3); // Charcoal
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.text(cleanName, 18, y);

        // Price aligned to right (X = 192)
        doc.setTextColor(143, 0, 13);
        doc.setFont('helvetica', 'bold');
        doc.text(product.price, 192, y, { align: 'right' });

        // Add small dotted line between name and price
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.2);
        const nameWidth = doc.getTextWidth(cleanName);
        const priceWidth = doc.getTextWidth(product.price);
        doc.line(18 + nameWidth + 2, y - 1, 192 - priceWidth - 2, y - 1);

        // Description
        if (product.description) {
          y += 4.5;
          doc.setTextColor(90, 64, 62); // lightMuted
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(8);
          // Multiline support if description is long
          const splitDesc = doc.splitTextToSize(product.description, 170);
          doc.text(splitDesc, 18, y);
          y += (splitDesc.length - 1) * 3.5;
        }

        y += 8; // Spacing after product
      });

      y += 3; // Extra space after category
    });

    // Footer note on the last page
    if (y > 245) {
      doc.addPage();
      doc.setDrawColor(143, 0, 13);
      doc.setLineWidth(0.5);
      doc.rect(10, 10, 190, 277);
      doc.rect(11.5, 11.5, 187, 274);
      y = 25;
    }

    // Footer section
    doc.setDrawColor(252, 204, 56); // Gold
    doc.setLineWidth(0.6);
    doc.line(30, y, 180, y);
    y += 7;

    doc.setTextColor(143, 0, 13);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('THANK YOU FOR YOUR PATRONAGE!', 105, y, { align: 'center' });
    y += 5;

    doc.setTextColor(29, 29, 3);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Place bulk, corporate, or export orders directly via WhatsApp / Phone at +91 91069 97110', 105, y, { align: 'center' });

    // Save the PDF
    doc.save('Shree_Shakti_Snacks_Menu.pdf');
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleSound = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    setSoundMuted(newMuted);
    if (!newMuted) {
      playSnackRustle();
    }
  };

  useEffect(() => {
    // Prevent sounds on initial quick load layout shift
    const timer = setTimeout(() => {
      allowSound.current = true;
    }, 1200);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && allowSound.current) {
            const categoryId = entry.target.id;
            if (categoryId !== lastActiveCategory.current) {
              lastActiveCategory.current = categoryId;
              playSnackRustle();
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-10% 0px -40% 0px'
      }
    );

    categories.forEach((category) => {
      const id = `category-${category.replace(/\s+/g, '-').toLowerCase()}`;
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const categoryId = selectedCategory.replace(/\s+/g, '-').toLowerCase();
      const timer = setTimeout(() => {
        scrollToCategory(categoryId);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory]);

  return (
    <section id="products" className="py-24 bg-brand-cream relative scroll-mt-24 overflow-hidden">
      {/* Decorative Blur blob */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[500px] sm:h-[500px] bg-brand-saffron/10 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl sm:text-5xl font-serif text-brand-brown mb-4">{t('products.title')}</h2>
            <div className="w-24 h-[2px] bg-brand-maroon mb-6"></div>
            <p className="text-brand-brown-light max-w-xl text-sm leading-relaxed">
              {t('products.desc')}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={toggleSound}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all text-xs font-button font-bold uppercase tracking-widest cursor-pointer ${
                muted 
                  ? 'border-brand-brown/20 text-brand-brown-light bg-transparent hover:bg-brand-brown/5' 
                  : 'border-brand-maroon/20 text-brand-maroon bg-brand-maroon/5 hover:bg-brand-maroon/10'
              }`}
              title={muted ? 'Enable sound effects' : 'Disable sound effects'}
              aria-label="Toggle ambient sounds"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-saffron fill-brand-saffron/20" />}
              <span>{muted ? 'Sounds Off' : 'Sounds On'}</span>
            </button>
            <button 
              onClick={handleDownloadMenu}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-maroon hover:bg-brand-maroon-dark text-white font-button font-bold text-xs uppercase tracking-widest rounded-full transition-colors shadow-md shadow-brand-maroon/10 cursor-pointer"
            >
              <Download className="w-4 h-4 text-brand-saffron" />
              <span>{t('products.downloadMenu')}</span>
            </button>
          </div>
        </div>

        {/* Product Sections */}
        <div className="space-y-24">
          {categories.map((category) => {
            const categoryProducts = products.filter(p => p.category === category);
            if (categoryProducts.length === 0) return null;
            
            return (
              <div key={category} id={`category-${category.replace(/\s+/g, '-').toLowerCase()}`} className="scroll-mt-[100px]">
                <h3 className="text-3xl font-serif text-brand-maroon mb-8 pb-4 border-b border-brand-brown/10">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {categoryProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      className="reveal-item"
                      whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Inquiry CTA */}
        <div className="mt-20 text-center border-t border-brand-brown/10 pt-16 pb-8">
          <p className="text-brand-brown-light text-sm mb-6 font-medium font-sans">Have questions or want to place a bulk / exports order?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            id="scroll-to-contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-maroon hover:bg-brand-maroon-dark text-white rounded-full text-xs font-button font-bold uppercase tracking-widest transition-all shadow-lg shadow-brand-maroon/10 cursor-pointer"
          >
            Inquire Now
          </motion.button>
        </div>
      </div>
    </section>
  );
}
