import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navigation: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/menu', label: t('menu') },
    { path: '/gallery', label: t('gallery') },
    { path: '/about', label: t('about') },
  ];

  const languages = [
    { code: 'mr' as const, label: 'मराठी', fullLabel: 'मराठी' },
    { code: 'hi' as const, label: 'हिंदी', fullLabel: 'हिंदी' },
    { code: 'en' as const, label: 'EN', fullLabel: 'English' },
  ];

  const currentLang = languages.find(lang => lang.code === language);
  const isActive = (path: string) => location.pathname === path;

  const handleLangToggle = () => {
    if (!isLangOpen && langButtonRef.current) {
      const rect = langButtonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 12,
        right: window.innerWidth - rect.right,
      });
    }
    setIsLangOpen(prev => !prev);
  };

  const handleSelectLanguage = (code: 'mr' | 'hi' | 'en') => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedButton = langButtonRef.current?.contains(target);
      const clickedDropdown = langDropdownRef.current?.contains(target);
      if (!clickedButton && !clickedDropdown) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-full px-8 py-4 relative overflow-hidden">

            {/* Logo with circle icon */}
            <Link to="/" className="relative z-10 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8860B] via-[#FCEABB] to-[#D4AF37] flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.5)]">
                <span className="text-[10px] font-black text-[#1a1208] tracking-tight">LB</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
                Hotel Ronak & Beer Bar
              </h1>
            </Link>

            {/* Nav Links + Language Switcher */}
            <div className="flex items-center gap-2 relative z-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 transition-all duration-300 ${
                    isActive(item.path) ? 'text-[#D4AF37]' : 'text-[#F5F5DC] hover:text-[#D4AF37]'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37]"
                    />
                  )}
                </Link>
              ))}

              {/* Language Switcher Button */}
              <button
                ref={langButtonRef}
                onClick={handleLangToggle}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 min-w-[100px]"
              >
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#F5F5DC] font-medium text-sm">{currentLang?.label}</span>
                <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Language Dropdown — fixed portal outside navbar */}
      <AnimatePresence>
        {isLangOpen && (
          <motion.div
            ref={langDropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: dropdownPos.top,
              right: dropdownPos.right,
              zIndex: 50,
            }}
            className="w-[150px] rounded-2xl backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectLanguage(lang.code);
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

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-2xl px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#B8860B] via-[#FCEABB] to-[#D4AF37] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                <span className="text-[9px] font-black text-[#1a1208] tracking-tight">LB</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
                Hotel Ronak & Beer Bar
              </h1>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#D4AF37]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 mx-4 mt-2 backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-2xl overflow-hidden"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-4 border-b border-[var(--glass-border)] last:border-b-0 transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-[#B8860B]/20 via-[#FCEABB]/20 to-[#D4AF37]/20 text-[#D4AF37]'
                      : 'text-[#F5F5DC] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="px-4 py-3 border-t border-[var(--glass-border)] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      language === lang.code
                        ? 'bg-gradient-to-r from-[#B8860B]/30 to-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/40'
                        : 'text-[#F5F5DC] hover:text-[#D4AF37]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};