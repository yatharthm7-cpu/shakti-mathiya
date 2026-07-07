import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import LazyImage from './LazyImage';

const testimonials = [
  {
    id: 1,
    name: "Hansal Pandya",
    location: "Ahmedabad (Local Guide)",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVRy5ZKJ1ZRAnaJVheuFhYWXLYOvyOrq26YxF1A0NXGiyVZAAe8hA=s120-c-rp-mo-ba12-br100",
    text: "Authentic Mathiya And Cholafali By Shakti. Always Available, Always Fresh, Value For Money and Loved It. Must Buy 😇",
    rating: 5
  },
  {
    id: 2,
    name: "Raju Patel",
    location: "Ahmedabad (Local Guide)",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjUO26mXbMSTjj5i1G7I1HVbBhqp9UA5keRK4nDXizIVtM4kA1JU=s120-c-rp-mo-ba12-br100",
    text: "Very kind full person, mathiya, papad, chorafali and namkin quality was superb. I personally experience, for abroad parcel.",
    rating: 5
  },
  {
    id: 3,
    name: "Akshay Shinde",
    location: "Ahmedabad (Local Guide)",
    image: "https://lh3.googleusercontent.com/a-/ALV-UuTV0ctYNgvMX3vs2ov1tNTVYJ_0wqz5-DxXMrWySHdE2IlWApHA=s120-c-rp-mo-ba12-br100",
    text: "The best Quality mathiya-papad and chorafali you can get in Ahmedabad. Fresh stock and all year avaibility. Also vast variety of tasty farsan available. Must visit once.",
    rating: 5
  },
  {
    id: 4,
    name: "Jaya Parmar",
    location: "Ahmedabad",
    image: "https://lh3.googleusercontent.com/a/ACg8ocKz1Zbk4oV5hr7gV2EANdsouePYW2XVUfJ_L-cE8E-cYfl7rQ=s120-c-rp-mo-br100",
    text: "Shree Shakti, urad papad, mathiya, or chaorafali are very good, there were many varieties of sarewada (rice papadis). Among them, the extra spicy sarewada is also very good, now I will try other flavors from you too, your NRI sarewada is also very good, I will also try the varieties of farali sabudana.",
    rating: 5
  },
  {
    id: 5,
    name: "Rajendra Oza",
    location: "Ahmedabad (Local Guide)",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWemHTiSmHpqXo3bHofRba_dipnGH3yHX9cEarzq9TgznIWYri9=s120-c-rp-mo-ba12-br100",
    text: "Fresh and excellent quality of mathiya and papad.",
    rating: 5
  },
  {
    id: 6,
    name: "Jayna Jani",
    location: "Ahmedabad",
    image: "https://lh3.googleusercontent.com/a/ACg8ocImChGuzPe4tSKOFEGV52XuOjK5XSi_U3FYWGhPaHRgG9JdTw=s120-c-rp-mo-br100",
    text: "Very tasty mathiya I buy it since 5 years.",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-brand-brown relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-maroon/20 via-brand-brown to-brand-brown pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-serif text-brand-cream mb-4"
          >
            Client Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-saffron text-sm font-semibold tracking-widest uppercase mb-4"
          >
            ★ ★ ★ ★ ★ — Google Maps Verified Reviews
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            className="h-[2px] bg-brand-saffron mx-auto mb-6"
          />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-[500px] sm:h-[350px] md:h-[320px] lg:h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="glass-panel-dark p-6 sm:p-8 md:p-10 rounded-[2rem] h-full flex flex-col md:flex-row gap-6 md:gap-8 items-center border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-brand-saffron/30 p-1">
                      <LazyImage 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 bg-brand-maroon rounded-full flex items-center justify-center text-brand-saffron shadow-lg">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left min-w-0 w-full">
                    <div className="flex justify-center md:justify-start gap-1 mb-3">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-brand-saffron text-brand-saffron" />
                      ))}
                    </div>
                    <div className="max-h-[180px] sm:max-h-[140px] md:max-h-[120px] overflow-y-auto pr-1 scrollbar-thin mb-4">
                      <p className="text-brand-cream-muted text-sm sm:text-base md:text-lg font-serif italic leading-relaxed">
                        "{testimonials[currentIndex].text}"
                      </p>
                    </div>
                    <div>
                      <h4 className="text-white font-bold font-button uppercase tracking-widest text-xs sm:text-sm mb-0.5">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-brand-saffron text-[10px] sm:text-xs font-button uppercase tracking-widest opacity-80">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8 relative z-20">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-saffron hover:text-brand-brown hover:border-brand-saffron transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-saffron hover:text-brand-brown hover:border-brand-saffron transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
