import { Facebook, Instagram, Mail, MapPin, Phone, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useState } from 'react';

export default function Footer() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    const addressText = "9, Rama Park Society, behind Meghdoot School, Daxini Society, Maninagar, Ahmedabad, Gujarat 380008";
    navigator.clipboard.writeText(addressText).then(() => {
      setCopied(true);
      showToast(t('contact.copied'), 'success');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      showToast('Failed to copy address', 'error');
    });
  };

  return (
    <footer className="bg-brand-cream-muted border-t border-brand-brown/10 rounded-t-[50px] md:rounded-t-[100px] mt-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-16 py-20 md:py-24 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="/logo.png" 
              alt="Shree Shakti Logo" 
              className="h-16 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'font-serif font-bold text-2xl tracking-tight text-brand-brown';
                fallback.innerHTML = 'Shakti <span class="font-light italic text-brand-maroon">Mathiya</span>';
                e.currentTarget.parentNode?.appendChild(fallback);
              }}
            />
          </div>
          <p className="font-sans text-sm leading-6 text-brand-brown-light mb-6">
            {t('footer.desc') || "Authentic Homemade Papad & Traditional Gujarati Snacks crafted with purity and love."}
          </p>
          <div className="flex gap-4 mb-6">
            <a href="https://m.facebook.com/Suchi-Papad-House-Shakti-Mathiya-1673703879540518/" target="_blank" rel="noopener noreferrer" aria-label="Visit Shree Shakti on Facebook" className="w-10 h-10 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-maroon hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/suchipapadhouse?igsh=aHE4YWxzY3Jpdmt2" target="_blank" rel="noopener noreferrer" aria-label="Visit Shree Shakti on Instagram" className="w-10 h-10 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-maroon hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="mailto:suchipapadhouse@gmail.com" aria-label="Email Shree Shakti Support at suchipapadhouse@gmail.com" className="w-10 h-10 rounded-full border border-brand-brown/20 flex items-center justify-center hover:bg-brand-maroon hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="font-sans text-xs font-medium text-brand-brown-light">
            &copy; {new Date().getFullYear()} Shakti Mathiya. Crafted with tradition.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-serif text-xl font-semibold text-brand-maroon mb-6">Explore</h4>
          <ul className="space-y-3 font-sans text-sm text-brand-brown-light">
            <li><a href="#" className="hover:text-brand-maroon underline transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-maroon underline transition-colors">Terms of Service</a></li>
            <li><a href="#products" className="hover:text-brand-maroon underline transition-colors">Bulk Orders</a></li>
            <li><a href="#about" className="hover:text-brand-maroon underline transition-colors">Our History</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-xl font-semibold text-brand-maroon mb-6">Contact</h4>
          <address className="not-italic space-y-4 font-sans text-sm text-brand-brown-light">
            <div className="flex flex-col gap-2 items-start">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-maroon mt-0.5 flex-shrink-0" />
                <span>9, Rama Park Society, behind Meghdoot School, Daxini Society, Maninagar, Ahmedabad, Gujarat 380008</span>
              </div>
              <button
                onClick={handleCopyAddress}
                className="ml-8 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-maroon/5 hover:bg-brand-maroon/10 text-brand-maroon rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer border border-brand-maroon/10"
                aria-label="Copy store address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t('contact.copied') : t('contact.copyAddress')}</span>
              </button>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-maroon mt-0.5 flex-shrink-0" />
              <span>091069 97110</span>
            </div>
          </address>
        </div>

        {/* Live Google Map */}
        <div>
          <div className="relative overflow-hidden h-48 rounded-2xl border border-brand-brown/10 shadow-lg bg-brand-cream-high/50">
            <iframe 
              title="Shree Shakti Location Map"
              src="https://maps.google.com/maps?q=Suchi%20Papad%20House,%209,%20Rama%20Park%20Society,%20behind%20Meghdoot%20School,%20Daxini%20Society,%20Maninagar,%20Ahmedabad,%20Gujarat%20380008&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
