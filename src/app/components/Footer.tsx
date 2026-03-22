import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const ownerInfo = {
    name: 'Rajesh Kulkarni',
    title: {
      mr: 'मालक आणि संस्थापक',
      hi: 'मालिक और संस्थापक',
      en: 'Owner & Founder'
    } as Record<string, string>
  };

  const contactInfo = {
    address: {
      mr: 'शॉप नं. १२३, शेवगाव गेवराई रोड, बीड - ४३११३०, महाराष्ट्र',
      hi: 'दुकान नंबर १२३, शेवगाव गेवराई रोड, बीड - ४३११३०, महाराष्ट्र',
      en: 'Shop No. 123, Shevgaon Georai Road, Beed - 431130, Maharashtra'
    } as Record<string, string>,
    phone: '+91 93071 62705',
    email: 'ronakjaisawl@gmail.com',
    hours: {
      mr: 'सोमवार - रविवार: सकाळी ९:०० - रात्री ११:००',
      hi: 'सोमवार - रविवार: सुबह ९:०० - रात ११:००',
      en: 'Monday - Sunday: 9:00 AM - 11:00 PM'
    } as Record<string, string>
  };

  const socialLinks = [
    {
      icon: Instagram,
      url: 'https://instagram.com/ronakbeerbar',
      label: 'Instagram',
      color: '#E4405F'
    },
    {
      icon: Facebook,
      url: 'https://facebook.com/luxebar',
      label: 'Facebook',
      color: '#1877F2'
    }
  ];

  const openInMaps = () => {
    window.open('https://maps.google.com/?q=Beed,Maharashtra,India', '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0A0A0A] to-[#000000] border-t border-[var(--glass-border)] pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Owner Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent mb-4">
              Hotel Ronak & Beer Bar
            </h3>
            <div className="space-y-3">
              <p className="text-[#D4AF37] font-semibold text-lg">{ownerInfo.name}</p>
              <p className="text-[#F5F5DC]/70 text-sm py-1">{ownerInfo.title[language]}</p>
              <p className="text-[#F5F5DC]/80 leading-relaxed text-sm py-1">
                {language === 'mr' && 'प्रीमियम अनुभव आणि उत्कृष्ट सेवा देणारे'}
                {language === 'hi' && 'प्रीमियम अनुभव और उत्कृष्ट सेवा प्रदान करने वाले'}
                {language === 'en' && 'Providing premium experiences and exceptional service'}
              </p>
            </div>

            {/* License Badge */}
            <div className="mt-5 p-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} />
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-semibold leading-none mb-1">
                  {language === 'mr' ? 'परवाना क्रमांक' : language === 'hi' ? 'लाइसेंस नंबर' : 'License No.'}
                </p>
                <p className="text-white/90 text-sm font-bold tracking-wider">FL III 320</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info + Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-[#D4AF37] mb-4">{t('contactUs')}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                <p className="text-[#F5F5DC]/80 text-sm leading-relaxed py-1">{contactInfo.address[language]}</p>
              </div>

              {/* Google Maps Embed */}
              <div
                className="mt-3 rounded-2xl overflow-hidden border border-[#D4AF37]/25 relative group cursor-pointer"
                style={{ width: '100%', height: '160px' }}
                onClick={openInMaps}
              >
                <iframe
                  title="Ronak Bar Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.1) brightness(0.85)' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.123456789!2d75.0!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAwJzAwLjAiTiA3NcKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                />
                <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 bg-[#0A0A0A]/80 backdrop-blur-sm px-3 py-2 rounded-full border border-[#D4AF37]/50">
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-xs font-semibold">
                      {language === 'mr' ? 'नकाशा उघडा' : language === 'hi' ? 'मैप खोलें' : 'Open in Maps'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="text-[#F5F5DC]/80 text-sm hover:text-[#D4AF37] transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="text-[#F5F5DC]/80 text-sm hover:text-[#D4AF37] transition-colors">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-[#D4AF37] mb-4">{t('openingHours')}</h4>
            <p className="text-[#F5F5DC]/80 text-sm leading-relaxed py-1">{contactInfo.hours[language]}</p>
            <div className="mt-6">
              <h5 className="text-lg font-semibold text-[#D4AF37] mb-3">{t('quickLinks')}</h5>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-[#F5F5DC]/80 text-sm hover:text-[#D4AF37] transition-colors">
                    {t('home')}
                  </a>
                </li>
                <li>
                  <a href="/menu" className="text-[#F5F5DC]/80 text-sm hover:text-[#D4AF37] transition-colors">
                    {t('menu')}
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-[#F5F5DC]/80 text-sm hover:text-[#D4AF37] transition-colors">
                    {t('about')}
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xl font-bold text-[#D4AF37] mb-4">{t('followUs')}</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center hover:border-[#D4AF37] transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon
                    className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-all"
                    onMouseEnter={(e) => {
                      (e.currentTarget as SVGElement).style.color = social.color;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as SVGElement).style.color = '#D4AF37';
                    }}
                  />
                </a>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-2xl backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)]">
              <p className="text-[#F5F5DC]/70 text-xs leading-relaxed py-1">
                {language === 'mr' && 'आमच्या लेटेस्ट ऑफर्स आणि इव्हेंट्स साठी आम्हाला फॉलो करा'}
                {language === 'hi' && 'हमारे नवीनतम ऑफर और इवेंट के लिए हमें फॉलो करें'}
                {language === 'en' && 'Follow us for latest offers and events'}
              </p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--glass-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F5F5DC]/60 text-sm text-center md:text-left">
              © 2024 Hotel Ronak & Beer Bar. {language === 'mr' ? 'सर्व हक्क राखीव' : language === 'hi' ? 'सभी अधिकार सुरक्षित' : 'All rights reserved'}.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#F5F5DC]/60 hover:text-[#D4AF37] transition-colors">
                {language === 'mr' ? 'गोपनीयता धोरण' : language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-[#F5F5DC]/60 hover:text-[#D4AF37] transition-colors">
                {language === 'mr' ? 'अटी व शर्ती' : language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions'}
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
    </footer>
  );
};