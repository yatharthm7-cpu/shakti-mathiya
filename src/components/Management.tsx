import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import LazyImage from './LazyImage';

const managementTeam = [
  {
    name: "Pooja Ben",
    role: "Founder & Managing Director",
    image: "https://6a4ca34db793a9afadfb60c6.imgix.net/Gemini_Generated_Image_gbfi7vgbfi7vgbfi-clean.png",
    description: "Visionary behind Shree Shakti, dedicated to preserving traditional Gujarati flavors while expanding globally."
  },
  {
    name: "CA Sajag Shah",
    role: "Operations Head",
    image: "https://6a4ca34db793a9afadfb60c6.imgix.net/image-clean.png",
    description: "Ensures every batch of Mathiya and Papad meets our strict hygiene and quality standards."
  }
];

export default function Management() {
  const { t } = useLanguage();

  return (
    <section id="management" className="py-24 bg-brand-cream-muted relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-2 px-4 rounded-full border border-brand-maroon/20 text-brand-maroon text-[10px] font-bold tracking-widest uppercase mb-6 bg-white">
            Leadership
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-brand-brown mb-6">Our Management</h2>
          <div className="w-24 h-[2px] bg-brand-maroon mx-auto mb-6"></div>
          <p className="text-brand-brown-light max-w-2xl mx-auto text-sm leading-relaxed">
            Meet the passionate individuals who ensure every product of Shree Shakti carries the authentic taste of Gujarat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {managementTeam.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                <LazyImage 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="text-2xl font-serif text-brand-brown mb-2">{member.name}</h3>
              <p className="text-brand-saffron font-bold text-sm tracking-wider uppercase mb-4">{member.role}</p>
              <p className="text-brand-brown-light text-sm leading-relaxed max-w-sm">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
