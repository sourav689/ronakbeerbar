import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'mr' as const, label: 'मराठी', fullLabel: 'मराठी' },
    { code: 'hi' as const, label: 'हिंदी', fullLabel: 'हिंदी' },
    { code: 'en' as const, label: 'EN', fullLabel: 'English' },
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-[60]"
    >
      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[#D4AF37] transition-all duration-300 min-w-[120px]"
        >
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[#F5F5DC] font-medium text-sm">{currentLang?.label}</span>
          <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 w-full min-w-[140px] rounded-2xl backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-all duration-300 flex items-center justify-between ${
                    index !== languages.length - 1 ? 'border-b border-[var(--glass-border)]' : ''
                  } ${
                    language === lang.code
                      ? 'bg-gradient-to-r from-[#B8860B]/20 via-[#FCEABB]/20 to-[#D4AF37]/20 text-[#D4AF37]'
                      : 'text-[#F5F5DC] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                  }`}
                >
                  <span className="font-medium text-sm">{lang.fullLabel}</span>
                  {language === lang.code && (
                    <motion.div
                      layoutId="activeLang"
                      className="w-2 h-2 rounded-full bg-[#D4AF37]"
                    />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};