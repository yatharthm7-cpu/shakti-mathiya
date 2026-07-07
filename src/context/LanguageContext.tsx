import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'gu';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'header.orderNow': 'Order Now',
    // Hero
    'hero.badge': 'Authentic Gujarati Taste',
    'hero.title': 'Where Tradition Meets Taste',
    'hero.title1': 'Traditional Snacks',
    'hero.title2': 'For Every Celebration',
    'hero.desc': 'Experience the rich heritage of authentic Indian snacks. Handcrafted with love, finest ingredients, and traditional recipes.',
    'hero.explore': 'Explore Catalog',
    'hero.contact': 'Contact Us',
    // Products
    'products.title': 'Our Product Catalog',
    'products.desc': 'Explore our wide range of authentic, handcrafted Indian snacks made with the finest ingredients.',
    'products.downloadMenu': 'Download Menu',
    'products.all': 'All',
    'products.viewDetails': 'View Details',
    'products.description': 'Description',
    'products.inquire': 'Inquire About This Product',
    'products.noProducts': 'No products found in this category.',
    'products.backToHome': 'Back to Home',
    // About
    'about.title': 'About',
    'about.years': 'Years of',
    'about.excellence': 'Excellence',
    'about.p1': 'At Shakti Mathiya & Chorafali, we bring you the authentic taste of tradition. Our journey started with a simple vision: to deliver premium, homemade-style snacks that remind you of festive celebrations and family gatherings.',
    'about.p2': 'Every product is carefully crafted using the finest ingredients, ensuring the perfect crunch, taste, and hygiene in every bite. From our signature White and Green Chilly Mathiya to our diverse range of Papad and Farali items, quality is our foremost promise.',
    // Contact
    'contact.title': 'Get in Touch',
    'contact.desc': "Have questions about our products or want to place a bulk order? We'd love to hear from you.",
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.store': 'Store Location',
    'contact.name': 'Full Name',
    'contact.phoneNum': 'Phone Number',
    'contact.emailAdd': 'Email Address',
    'contact.message': 'Message or Order Inquiry',
    'contact.send': 'Send Message via WhatsApp',
    'contact.sending': 'Sending...',
    'contact.success': 'Message Sent Successfully!',
    'contact.copyAddress': 'Copy Address',
    'contact.copied': 'Copied!',
    // Footer
    'footer.desc': 'Premium quality Mathiya, Chorafali, and authentic Indian snacks made with traditional recipes and the finest ingredients.',
    'footer.quickLinks': 'Quick Links',
    'footer.categories': 'Categories',
    'footer.rights': 'Shakti Mathiya & Chorafali. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  gu: {
    // Header
    'nav.home': 'હોમ',
    'nav.products': 'પ્રોડક્ટ્સ',
    'nav.about': 'અમારા વિશે',
    'nav.contact': 'સંપર્ક',
    'header.orderNow': 'ઓર્ડર કરો',
    // Hero
    'hero.badge': 'અસલ ગુજરાતી સ્વાદ',
    'hero.title': 'જ્યાં પરંપરા સ્વાદને મળે છે',
    'hero.title1': 'પારંપરિક નાસ્તો',
    'hero.title2': 'દરેક ઉજવણી માટે',
    'hero.desc': 'અસલ ભારતીય નાસ્તાના સમૃદ્ધ વારસાનો અનુભવ કરો. પ્રેમ, શ્રેષ્ઠ સામગ્રી અને પારંપરિક રીતથી બનાવેલ.',
    'hero.explore': 'પ્રોડક્ટ્સ જુઓ',
    'hero.contact': 'સંપર્ક કરો',
    // Products
    'products.title': 'અમારું પ્રોડક્ટ કેટલોગ',
    'products.desc': 'શ્રેષ્ઠ સામગ્રીથી બનેલ અસલ, હાથે બનાવેલ ભારતીય નાસ્તાની અમારી વિશાળ શ્રેણી જુઓ.',
    'products.downloadMenu': 'મેનુ ડાઉનલોડ કરો',
    'products.all': 'બધા',
    'products.viewDetails': 'વધુ માહિતી',
    'products.description': 'વર્ણન',
    'products.inquire': 'આ પ્રોડક્ટ વિશે પૂછપરછ કરો',
    'products.noProducts': 'આ શ્રેણીમાં કોઈ પ્રોડક્ટ્સ મળ્યા નથી.',
    'products.backToHome': 'હોમ પેજ પર પાછા જાઓ',
    // About
    'about.title': 'અમારા વિશે',
    'about.years': 'વર્ષનો',
    'about.excellence': 'ઉત્કૃષ્ટતા',
    'about.p1': 'શક્તિ મઠિયા અને ચોળાફળીમાં, અમે તમારા માટે પરંપરાનો અસલ સ્વાદ લાવીએ છીએ. અમારી સફર એક સરળ દ્રષ્ટિકોણથી શરૂ થઈ હતી: પ્રીમિયમ, ઘર જેવા નાસ્તા પહોંચાડવા જે તમને તહેવારોની ઉજવણી અને કૌટુંબિક મેળાવડાની યાદ અપાવે છે.',
    'about.p2': 'દરેક પ્રોડક્ટ કાળજીપૂર્વક શ્રેષ્ઠ સામગ્રીનો ઉપયોગ કરીને બનાવવામાં આવે છે, જે દરેક બાઈટમાં પરફેક્ટ ક્રંચ, સ્વાદ અને સ્વચ્છતાની ખાતરી આપે છે. અમારા સિગ્નેચર સફેદ અને લીલા મરચાના મઠિયાથી લઈને પાપડ અને ફરાળી વસ્તુઓની અમારી વિવિધ શ્રેણી સુધી, ગુણવત્તા એ અમારું મુખ્ય વચન છે.',
    // Contact
    'contact.title': 'સંપર્ક કરો',
    'contact.desc': "અમારી પ્રોડક્ટ્સ વિશે પ્રશ્નો છે અથવા જથ્થાબંધ ઓર્ડર આપવા માંગો છો? અમને તમારી પાસેથી સાંભળવું ગમશે.",
    'contact.phone': 'ફોન',
    'contact.email': 'ઈમેલ',
    'contact.store': 'સ્ટોરનું સરનામું',
    'contact.name': 'પૂરું નામ',
    'contact.phoneNum': 'ફોન નંબર',
    'contact.emailAdd': 'ઈમેલ એડ્રેસ',
    'contact.message': 'સંદેશ અથવા ઓર્ડર પૂછપરછ',
    'contact.send': 'વોટ્સએપ દ્વારા સંદેશ મોકલો',
    'contact.sending': 'મોકલી રહ્યા છીએ...',
    'contact.success': 'સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો!',
    'contact.copyAddress': 'સરનામું કોપી કરો',
    'contact.copied': 'કોપી થઈ ગયું!',
    // Footer
    'footer.desc': 'પ્રીમિયમ ગુણવત્તાવાળા મઠિયા, ચોળાફળી અને અસલ ભારતીય નાસ્તા જે પરંપરાગત વાનગીઓ અને શ્રેષ્ઠ સામગ્રીથી બનેલા છે.',
    'footer.quickLinks': 'ઝડપી લિંક્સ',
    'footer.categories': 'શ્રેણીઓ',
    'footer.rights': 'શક્તિ મઠિયા અને ચોળાફળી. બધા હકો આરક્ષિત છે.',
    'footer.privacy': 'ગોપનીયતા નીતિ',
    'footer.terms': 'સેવાની શરતો',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'gu' : 'en');
  };

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
