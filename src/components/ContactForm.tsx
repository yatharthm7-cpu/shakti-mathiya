import { MapPin, Phone, Mail, Clock, Copy, Check } from 'lucide-react';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';
import MagneticButton from './MagneticButton';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [addressCopied, setAddressCopied] = useState(false);
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const addressText = "9, Rama Park Society, behind Meghdoot School, Daxini Society, Maninagar, Ahmedabad, Gujarat 380008";
    navigator.clipboard.writeText(addressText).then(() => {
      setAddressCopied(true);
      showToast(t('contact.copied'), 'success');
      setTimeout(() => setAddressCopied(false), 2000);
    }).catch(() => {
      showToast('Failed to copy address', 'error');
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    showToast("Preparing your inquiry details...", "info");
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = (formData.get('email') as string) || 'N/A';
    const message = formData.get('message') as string;

    const formattedText = `*New Inquiry from Shree Shakti Website*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email}\n*Message:* ${message}`;
    const encodedText = encodeURIComponent(formattedText);
    const whatsappUrl = `https://wa.me/919106997110?text=${encodedText}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setStatus('success');
      showToast("Form details prepared! Directing you to WhatsApp to send message.", "success");
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-brand-maroon" />,
      title: t('contact.phone'),
      details: "091069 97110",
      sub: "Mon-Sat 9am to 8pm"
    },
    {
      icon: <Mail className="w-5 h-5 text-brand-maroon" />,
      title: t('contact.email'),
      details: "suchipapadhouse@gmail.com",
      sub: "Online Support"
    },
    {
      icon: <MapPin className="w-5 h-5 text-brand-maroon" />,
      title: t('contact.store'),
      details: "9, Rama Park Society, behind Meghdoot School, Daxini Society, Maninagar, Ahmedabad, Gujarat 380008",
      sub: "Ahmedabad, Gujarat, India"
    }
  ];

  return (
    <section id="contact" className="py-32 bg-brand-cream relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[600px] sm:h-[600px] bg-brand-maroon/5 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-2 px-4 rounded-full border border-brand-maroon/20 text-brand-maroon text-[10px] font-bold tracking-widest uppercase mb-6 bg-white/50 backdrop-blur-sm">
            Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-brand-brown mb-6">{t('contact.title')}</h2>
          <div className="w-24 h-[2px] bg-brand-maroon mx-auto mb-6"></div>
          <p className="text-brand-brown-light max-w-2xl mx-auto text-base leading-relaxed">
            {t('contact.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-5 p-8 glass-panel rounded-3xl group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-brand-maroon/5"
              >
                <div className="w-14 h-14 bg-brand-cream-muted rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-brand-maroon/10 transition-colors">
                  {info.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold font-serif text-brand-brown text-lg leading-tight">{info.title}</h4>
                    {idx === 2 && (
                      <button
                        onClick={handleCopyAddress}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-maroon/5 hover:bg-brand-maroon/10 text-brand-maroon transition-all cursor-pointer border border-brand-maroon/10 text-[10px] font-bold uppercase tracking-wider shrink-0"
                        title={t('contact.copyAddress')}
                        aria-label="Copy address"
                      >
                        {addressCopied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                        <span>{addressCopied ? t('contact.copied') : t('contact.copyAddress')}</span>
                      </button>
                    )}
                  </div>
                  <p className="text-brand-brown-light text-sm mb-1 leading-relaxed">{info.details}</p>
                  <p className="text-brand-saffron text-xs font-button uppercase tracking-widest">{info.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 sm:p-14 shadow-2xl shadow-brand-brown/5 border border-brand-brown/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-brand-saffron/10 rounded-full blur-[40px] sm:blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-[10px] font-button font-bold text-brand-brown uppercase tracking-widest">{t('contact.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-brand-cream-muted bg-brand-cream/50 text-brand-brown focus:ring-0 focus:border-brand-maroon outline-none transition-all text-sm placeholder:text-brand-brown/30"
                    placeholder="Rajesh Patel"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="phone" className="text-[10px] font-button font-bold text-brand-brown uppercase tracking-widest">{t('contact.phoneNum')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-brand-cream-muted bg-brand-cream/50 text-brand-brown focus:ring-0 focus:border-brand-maroon outline-none transition-all text-sm placeholder:text-brand-brown/30"
                    placeholder="091069 97110"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="email" className="text-[10px] font-button font-bold text-brand-brown uppercase tracking-widest">{t('contact.emailAdd')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-5 py-4 rounded-xl border-2 border-brand-cream-muted bg-brand-cream/50 text-brand-brown focus:ring-0 focus:border-brand-maroon outline-none transition-all text-sm placeholder:text-brand-brown/30"
                  placeholder="rajesh@example.com"
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="message" className="text-[10px] font-button font-bold text-brand-brown uppercase tracking-widest">{t('contact.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-brand-cream-muted bg-brand-cream/50 text-brand-brown focus:ring-0 focus:border-brand-maroon outline-none transition-all resize-none text-sm placeholder:text-brand-brown/30"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <MagneticButton
                as="button"
                type="submit"
                disabled={status === 'submitting'}
                aria-label="Send Message via WhatsApp"
                className="w-full py-5 px-8 text-white text-xs font-button font-bold rounded-full uppercase tracking-widest bg-brand-maroon hover:bg-brand-maroon-dark focus:outline-none focus:ring-4 focus:ring-brand-maroon/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_30px_rgb(122,32,33,0.3)] mt-4 block text-center"
              >
                {status === 'idle' && t('contact.send')}
                {status === 'submitting' && t('contact.sending')}
                {status === 'success' && t('contact.success')}
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
