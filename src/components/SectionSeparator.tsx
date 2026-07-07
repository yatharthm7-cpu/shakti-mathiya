import { motion } from 'motion/react';

interface SectionSeparatorProps {
  className?: string;
  variant?: 'mandala' | 'wave' | 'flourish';
}

export default function SectionSeparator({ className = '', variant = 'mandala' }: SectionSeparatorProps) {
  return (
    <div className={`w-full flex items-center justify-center my-12 md:my-16 px-4 select-none pointer-events-none overflow-hidden ${className}`}>
      {variant === 'mandala' && (
        <div className="w-full max-w-5xl flex items-center justify-center gap-4">
          {/* Left Tapered Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-brand-maroon/20 to-brand-maroon/40 rounded-full" />
          
          {/* Central Mandala/Medallion Ornaments */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-1.5 shrink-0"
          >
            {/* Left flourish dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-brand-saffron" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand-maroon" />
            
            {/* SVG Medallion */}
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm text-brand-maroon"
            >
              {/* Outer decorative petal circle */}
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
              
              {/* Saffron accent diamond ring */}
              <g stroke="#fccc38" strokeWidth="2">
                <rect x="30" y="30" width="40" height="40" transform="rotate(45 50 50)" />
                <rect x="34" y="34" width="32" height="32" transform="rotate(22.5 50 50)" />
              </g>

              {/* Inner core circle */}
              <circle cx="50" cy="50" r="14" fill="#8f000d" />
              <circle cx="50" cy="50" r="10" stroke="#fccc38" strokeWidth="1.5" />
              
              {/* Center star */}
              <circle cx="50" cy="50" r="3" fill="#fccc38" />

              {/* Little cardinal dots */}
              <circle cx="50" cy="18" r="3" fill="#8f000d" />
              <circle cx="50" cy="82" r="3" fill="#8f000d" />
              <circle cx="18" cy="50" r="3" fill="#8f000d" />
              <circle cx="82" cy="50" r="3" fill="#8f000d" />
            </svg>

            {/* Right flourish dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-brand-maroon" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-saffron" />
          </motion.div>
          
          {/* Right Tapered Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-l from-transparent via-brand-maroon/20 to-brand-maroon/40 rounded-full" />
        </div>
      )}

      {variant === 'wave' && (
        <div className="w-full max-w-7xl">
          <svg 
            viewBox="0 0 1200 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-8 md:h-12 text-brand-maroon opacity-30"
          >
            <path 
              d="M0,20 C150,5 150,35 300,20 C450,5 450,35 600,20 C750,5 750,35 900,20 C1050,5 1050,35 1200,20" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            <path 
              d="M0,20 C150,12 150,28 300,20 C450,12 450,28 600,20 C750,12 750,28 900,20 C1050,12 1050,28 1200,20" 
              stroke="#fccc38" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeDasharray="8 8"
            />
          </svg>
        </div>
      )}

      {variant === 'flourish' && (
        <div className="w-full max-w-4xl flex items-center justify-center gap-3">
          <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent via-brand-saffron/30 to-brand-saffron" />
          
          <svg 
            width="64" 
            height="24" 
            viewBox="0 0 100 30" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-6 text-brand-maroon"
          >
            {/* Traditional Indian paisley scrollwork flourish */}
            <path 
              d="M10,15 C25,5 35,25 50,15 C65,5 75,25 90,15" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            <path 
              d="M20,15 C30,10 35,20 45,15" 
              stroke="#fccc38" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <path 
              d="M55,15 C65,10 70,20 80,15" 
              stroke="#fccc38" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            <circle cx="50" cy="15" r="4" fill="#8f000d" />
            <circle cx="50" cy="15" r="2" fill="#fccc38" />
          </svg>

          <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent via-brand-saffron/30 to-brand-saffron" />
        </div>
      )}
    </div>
  );
}
