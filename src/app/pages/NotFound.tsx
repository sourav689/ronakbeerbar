import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5DC] mb-4">
          {language === 'mr' && 'पृष्ठ सापडले नाही'}
          {language === 'hi' && 'पेज नहीं मिला'}
          {language === 'en' && 'Page Not Found'}
        </h2>
        <p className="text-[#F5F5DC]/80 mb-8 text-lg">
          {language === 'mr' && 'आपण शोधत असलेले पृष्ठ अस्तित्वात नाही'}
          {language === 'hi' && 'आप जो पेज खोज रहे हैं वह मौजूद नहीं है'}
          {language === 'en' && 'The page you are looking for does not exist'}
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            {language === 'mr' && 'मुख्यपृष्ठावर परत या'}
            {language === 'hi' && 'होम पर वापस जाएं'}
            {language === 'en' && 'Back to Home'}
          </motion.button>
        </Link>
        <Link to="/previous-page">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            {language === 'mr' && 'मागलेल्या पृष्ठावर परत या'}
            {language === 'hi' && 'पिछले पेज पर वापस जाएं'}
            {language === 'en' && 'Back to Previous Page'}
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};