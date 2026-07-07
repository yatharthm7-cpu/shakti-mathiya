import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import ProductCatalog from './components/ProductCatalog';
import ProductPreview from './components/ProductPreview';
import AboutUs from './components/AboutUs';
import Management from './components/Management';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollReveal from './components/ScrollReveal';
import SectionSeparator from './components/SectionSeparator';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useNavigation } from './context/NavigationContext';
import { useToast } from './context/ToastContext';

export default function App() {
  const { activePage } = useNavigation();
  const { showToast } = useToast();
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    let lenis: Lenis | null = null;

    const tickLenis = (time: number) => {
      if (lenis) lenis.raf(time * 1000);
    };

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tickLenis);
    }

    gsap.ticker.lagSmoothing(0);

    let lastSpawn = { x: 0, y: 0 };

    // Custom cursor logic
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Spawn trailing particle if over the hero section
      const target = e.target as HTMLElement;
      const isOverHero = target && (target.id === 'hero' || target.closest('#hero'));
      if (isOverHero) {
        const dx = e.clientX - lastSpawn.x;
        const dy = e.clientY - lastSpawn.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 15) {
          lastSpawn = { x: e.clientX, y: e.clientY };
          const pId = Math.random() + Date.now();
          const newParticle = {
            id: pId,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 4, // 4px to 12px
            color: Math.random() > 0.5 ? '#FF9933' : '#9B2226', // saffron or maroon
          };

          setParticles((prev) => [...prev.slice(-15), newParticle]);

          setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== pId));
          }, 600);
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (!isTouchDevice) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (lenis) {
        gsap.ticker.remove(tickLenis);
        lenis.destroy();
      }
      if (!isTouchDevice) {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-saffron selection:text-brand-brown relative overflow-x-hidden w-full max-w-full">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="page-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full"
          >
            {/* Scroll Progress Bar */}
            <motion.div 
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-maroon to-brand-saffron z-50 origin-left"
              style={{ scaleX }}
            />
            
            {/* Custom Cursor (desktop only visually) */}
            <motion.div 
              className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-maroon pointer-events-none z-[100] hidden md:block mix-blend-difference"
              animate={{
                x: cursorPos.x - 16,
                y: cursorPos.y - 16,
                scale: isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? 'var(--color-brand-saffron)' : 'transparent',
                borderColor: isHovering ? 'transparent' : 'var(--color-brand-maroon)',
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.5
              }}
            />
            
            {/* Soft Glow following cursor */}
            <motion.div 
              className="fixed top-0 left-0 w-96 h-96 rounded-full bg-brand-saffron opacity-[0.03] blur-3xl pointer-events-none z-[-1] hidden md:block"
              animate={{
                x: cursorPos.x - 192,
                y: cursorPos.y - 192,
              }}
              transition={{
                type: "tween",
                ease: "linear",
                duration: 0.2
              }}
            />

             {/* Trailing Particles (desktop only, active over hero section) */}
            <div className="fixed inset-0 pointer-events-none z-[99] hidden md:block">
              <AnimatePresence>
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                      left: p.x,
                      top: p.y,
                      width: p.size,
                      height: p.size,
                      backgroundColor: p.color,
                      boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
                    }}
                    initial={{ opacity: 0.8, scale: 1, x: "-50%", y: "-50%" }}
                    animate={{
                      opacity: 0,
                      scale: 0,
                      y: ["-50%", `${-50 + (Math.random() * 40 - 20)}px`],
                      x: ["-50%", `${-50 + (Math.random() * 40 - 20)}px`],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                ))}
              </AnimatePresence>
            </div>

            <main className="flex-grow">
              <ScrollReveal><Hero /></ScrollReveal>
              <SectionSeparator variant="mandala" />
              <ScrollReveal><Statistics /></ScrollReveal>
              <SectionSeparator variant="wave" />
              <ScrollReveal><ProductCatalog /></ScrollReveal>
              <SectionSeparator variant="flourish" />
              <ScrollReveal><AboutUs /></ScrollReveal>
              <SectionSeparator variant="mandala" />
              <ScrollReveal><Management /></ScrollReveal>
              <SectionSeparator variant="wave" />
              <ScrollReveal><Testimonials /></ScrollReveal>
              <SectionSeparator variant="flourish" />
              <ScrollReveal><ContactForm /></ScrollReveal>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp CTA */}
      <motion.a 
        href="https://wa.me/919106997110" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat with Shree Shakti on WhatsApp"
        onClick={() => showToast("Opening WhatsApp to chat with Shree Shakti...", "success")}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
        />
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top of the page"
            className="fixed bottom-24 right-6 z-[90] w-14 h-14 bg-brand-maroon text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl border border-brand-saffron/30 cursor-pointer transition-all"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Back to Top"
          >
            <ArrowUp className="w-6 h-6 text-brand-saffron animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
