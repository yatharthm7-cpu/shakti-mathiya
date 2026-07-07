import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Package, Award, Truck, MapPin } from 'lucide-react';

const stats = [
  { id: 1, label: 'Happy Customers', value: 10000, suffix: '+', icon: Users },
  { id: 2, label: 'Products', value: 50, suffix: '+', icon: Package },
  { id: 3, label: 'Years Experience', value: 10, suffix: '+', icon: Award },
  { id: 4, label: 'Orders Delivered', value: 50000, suffix: '+', icon: Truck },
  { id: 5, label: 'Cities Served', value: 25, suffix: '+', icon: MapPin },
];

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.floor(from + (to - from) * (1 - Math.pow(1 - progress, 3))));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(to);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

export default function Statistics() {
  return (
    <section className="py-24 bg-brand-brown relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-saffron via-brand-brown to-brand-brown"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-brand-maroon/20 rounded-2xl flex items-center justify-center border border-brand-maroon/30 group-hover:bg-brand-maroon/40 transition-colors duration-300 transform group-hover:-translate-y-2">
                <stat.icon className="w-8 h-8 text-brand-saffron" />
              </div>
              <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 flex justify-center">
                <Counter from={0} to={stat.value} duration={2.5} />
                <span className="text-brand-saffron">{stat.suffix}</span>
              </div>
              <p className="text-xs font-button uppercase tracking-widest text-brand-cream-muted opacity-70">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
