import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'mr' | 'hi' | 'en';

interface Translations {
  [key: string]: {
    mr: string;
    hi: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  home: { mr: 'मुख्यपृष्ठ', hi: 'होम', en: 'Home' },
  menu: { mr: 'मेनू', hi: 'मेनू', en: 'Menu' },
  gallery: { mr: 'गॅलरी', hi: 'गैलरी', en: 'Gallery' },
  about: { mr: 'आमच्याबद्दल', hi: 'हमारे बारे में', en: 'About' },
  
  // Hero
  heroTagline: { 
    mr: 'राजेशाही चवीचा अनुभव, प्रीमियम रात्रींसाठी', 
    hi: 'शाही स्वाद का अनुभव, प्रीमियम रातों के लिए', 
    en: 'Experience Royal Flavors for Premium Nights' 
  },
  exploreMenu: { mr: 'मेनू पहा', hi: 'मेनू देखें', en: 'Explore Menu' },
  bookTable: { mr: 'टेबल बुक करा', hi: 'टेबल बुक करें', en: 'Book Table' },
  
  // Featured Drinks
  featuredDrinks: { mr: 'खास पेये', hi: 'विशेष पेय', en: 'Featured Drinks' },
  
  // Table Information
  tableInfo: { mr: 'टे��ल माहिती', hi: 'टेबल जानकारी', en: 'Table Information' },
  viewTable: { mr: 'टेबल पहा', hi: 'टेबल देखें', en: 'View Table' },
  closeImage: { mr: 'बंद करा', hi: 'बंद करें', en: 'Close' },
  capacity: { mr: 'क्षमता', hi: 'क्षमता', en: 'Capacity' },
  persons: { mr: 'व्यक्ती', hi: 'व्यक्ति', en: 'Persons' },
  
  // Form
  name: { mr: 'नाव', hi: 'नाम', en: 'Name' },
  phone: { mr: 'फोन नंबर', hi: 'फोन नंबर', en: 'Phone Number' },
  guests: { mr: 'पाहुणे', hi: 'मेहमान', en: 'Guests' },
  date: { mr: 'तारीख', hi: 'तारीख', en: 'Date' },
  time: { mr: 'वेळ', hi: 'समय', en: 'Time' },
  submit: { mr: 'सबमिट करा', hi: 'सबमिट करें', en: 'Submit' },
  message: { mr: 'संदेश', hi: 'संदेश', en: 'Message' },
  email: { mr: 'ईमेल', hi: 'ईमेल', en: 'Email' },
  
  // Menu
  categories: { mr: 'सर्व श्रेणी', hi: 'सभी श्रेणी', en: 'All Categories' },
  drinks: { mr: 'पेये', hi: 'पेय', en: 'Drinks' },
  food: { mr: 'जेवण', hi: 'भोजन', en: 'Food' },
  combos: { mr: 'कॉम्बो', hi: 'कॉम्बो', en: 'Combos' },
  search: { mr: 'शोधा', hi: 'खोजें', en: 'Search' },
  whisky: { mr: 'व्हिस्की', hi: 'व्हिस्की', en: 'Whisky' },
  vodka: { mr: 'व्होड्का', hi: 'वोदका', en: 'Vodka' },
  rum: { mr: 'रम', hi: 'रम', en: 'Rum' },
  wine: { mr: 'वाइन', hi: 'वाइन', en: 'Wine' },
  beer: { mr: 'बीयर', hi: 'बीयर', en: 'Beer' },
  priceNote: { 
    mr: '* किंमती बदलू शकतात', 
    hi: '* कीमतें बदल सकती हैं', 
    en: '* Prices subject to change' 
  },
  
  // Gallery
  ourGallery: { mr: 'आमची गॅलरी', hi: 'हमारी गैलरी', en: 'Our Gallery' },
  
  // About
  ourStory: { mr: 'आमची कथा', hi: 'हमारी कहानी', en: 'Our Story' },
  ourJourney: { mr: 'आमचा प्रवास', hi: 'हमारी यात्रा', en: 'Our Journey' },
  reviews: { mr: 'पुनरावलोकने', hi: 'समीक्षा', en: 'Reviews' },
  enquiryForm: { mr: 'चौकशी फॉर्म', hi: 'पूछताछ फॉर्म', en: 'Enquiry Form' },
  sendEnquiry: { mr: 'चौकशी पाठवा', hi: 'पूछताछ भेजें', en: 'Send Enquiry' },
  
  // Footer
  contactUs: { mr: 'आमच्याशी संपर्क करा', hi: 'हमसे संपर्क करें', en: 'Contact Us' },
  openingHours: { mr: 'कार्यालयीन वेळा', hi: 'खुलने का समय', en: 'Opening Hours' },
  quickLinks: { mr: 'द्रुत लिंक्स', hi: 'त्वरित लिंक', en: 'Quick Links' },
  followUs: { mr: 'आम्हाला फॉलो करा', hi: 'हमें फॉलो करें', en: 'Follow Us' },
  
  // Admin
  admin: { mr: 'प्रशासक', hi: 'व्यवस्थापक', en: 'Admin' },
  dashboard: { mr: 'डॅशबोर्ड', hi: 'डैशबोर्ड', en: 'Dashboard' },
  bookings: { mr: 'बुकिंग', hi: 'बुकिंग', en: 'Bookings' },
  menuItems: { mr: 'मेनू आयटम', hi: 'मेनू आइटम', en: 'Menu Items' },
  login: { mr: 'लॉगिन', hi: 'लॉगिन', en: 'Login' },
  logout: { mr: 'लॉगआउट', hi: 'लॉगआउट', en: 'Logout' },
  password: { mr: 'पासवर्ड', hi: 'पासवर्ड', en: 'Password' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('mr'); // Marathi default

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};