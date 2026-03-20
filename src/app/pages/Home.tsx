import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DrinkCard {
  id: number;
  name: { mr: string; hi: string; en: string };
  price: string;
  image: string;
  description: { mr: string; hi: string; en: string };
}

interface SeatingZone {
  id: string;
  label: { mr: string; hi: string; en: string };
  tagline: { mr: string; hi: string; en: string };
  svgIcon: React.ReactNode;
  topBarColors: string[];
  borderIdle: string;
  hoverBorder: string;
  hoverGlow: string;
  hoverIconGlow: string;
  btnFrom: string;
  btnTo: string;
  images: { src: string; caption: string }[];
}

const drinks: DrinkCard[] = [
  {
    id: 1,
    name: { mr: 'गोल्डन मार्टिनी', hi: 'गोल्डन मार्टिनी', en: 'Golden Martini' },
    price: '₹850',
    image: 'https://images.unsplash.com/photo-1651945496833-1308066c48ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY29ja3RhaWwlMjBkcmluayUyMGdvbGR8ZW58MXx8fHwxNzcyNjU0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: {
      mr: 'प्रीमियम व्होड्का आणि सुवर्ण फ्लेक्स',
      hi: 'प्रीमियम वोदका और सोने की परतें',
      en: 'Premium vodka with gold flakes'
    }
  },
  {
    id: 2,
    name: { mr: 'रॉयल व्हिस्की', hi: 'रॉयल व्हिस्की', en: 'Royal Whiskey' },
    price: '₹1,200',
    image: 'https://images.unsplash.com/photo-1772466431721-cac7edd3a0b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlza2V5JTIwZ2xhc3MlMjBkYXJrJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzI2NTQwNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: {
      mr: '१८ वर्षे जुनी स्कॉच',
      hi: '18 साल पुरानी स्कॉच',
      en: '18-year aged scotch'
    }
  },
  {
    id: 3,
    name: { mr: 'शॅम्पेन डिलाइट', hi: 'शैम्पेन डिलाइट', en: 'Champagne Delight' },
    price: '₹2,500',
    image: 'https://images.unsplash.com/photo-1749983030057-801e003ad976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFtcGFnbmUlMjBib3R0bGUlMjBsdXh1cnl8ZW58MXx8fHwxNzcyNjU0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: {
      mr: 'फ्रेंच शॅम्पेन — अनोखा अनुभव',
      hi: 'फ्रेंच शैंपेन — अनूठा अनुभव',
      en: 'French champagne — a unique experience'
    }
  }
];

// SVG Icons for seating zones
const WineGlassIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M20 28V35M14 35H26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 8H29L25 20C24 23 22 25 20 25C18 25 16 23 15 20L11 8Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={`${color}22`}/>
    <path d="M11 14H29" stroke={color} strokeWidth="1.5" strokeDasharray="2 2"/>
  </svg>
);

const CabinetIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <rect x="6" y="10" width="28" height="20" rx="3" stroke={color} strokeWidth="2" fill={`${color}15`}/>
    <path d="M6 18H34" stroke={color} strokeWidth="1.5"/>
    <circle cx="20" cy="14" r="1.5" fill={color}/>
    <path d="M10 22H17M23 22H30" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 30V34M30 30V34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CrownACIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
    <path d="M8 28L8 16L14 21L20 10L26 21L32 16V28H8Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={`${color}18`}/>
    <path d="M8 28H32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="16" r="2" fill={color}/>
    <circle cx="20" cy="10" r="2" fill={color}/>
    <circle cx="32" cy="16" r="2" fill={color}/>
    <path d="M14 32H26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const seatingZones: SeatingZone[] = [
  {
    id: 'open',
    label: { mr: 'ओपन रेट्रो', hi: 'ओपन रेट्रो', en: 'Open Retro' },
    tagline: {
      mr: 'मोकळ्या आकाशाखाली जेवणाचा आनंद घ्या',
      hi: 'खुले आसमान के नीचे भोजन का आनंद लें',
      en: 'Dine under the open sky'
    },
    svgIcon: <WineGlassIcon color="#34D399" />,
    topBarColors: ['#B8860B', '#FCEABB', '#D4AF37'],
    borderIdle: 'rgba(212,175,55,0.25)',
    hoverBorder: 'rgba(52,211,153,0.85)',
    hoverGlow: 'rgba(52,211,153,0.22)',
    hoverIconGlow: 'rgba(52,211,153,0.3)',
    btnFrom: '#B8860B',
    btnTo: '#FCEABB',
    images: [
      { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080&q=80', caption: 'Open Retro — Table 1' },
      { src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1080&q=80', caption: 'Open Retro — Table 2' },
      { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1080&q=80', caption: 'Open Retro — Table 3' },
      { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1080&q=80', caption: 'Open Retro — Table 4' },
    ]
  },
  {
    id: 'cabinet',
    label: { mr: 'कॅबिनेट', hi: 'कैबिनेट', en: 'Cabinet' },
    tagline: {
      mr: 'खाजगी व आरामदायी कक्षात बसा',
      hi: 'निजी और आरामदायक केबिन में बैठें',
      en: 'Private cozy enclosures'
    },
    svgIcon: <CabinetIcon color="#6395FF" />,
    topBarColors: ['#6B4E00', '#D4AF37', '#9A7200'],
    borderIdle: 'rgba(212,175,55,0.25)',
    hoverBorder: 'rgba(99,149,255,0.85)',
    hoverGlow: 'rgba(59,100,220,0.22)',
    hoverIconGlow: 'rgba(99,149,255,0.3)',
    btnFrom: '#7A5500',
    btnTo: '#D4AF37',
    images: [
      { src: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=1080&q=80', caption: 'Cabinet — Table 1' },
      { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1080&q=80', caption: 'Cabinet — Table 2' },
      { src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1080&q=80', caption: 'Cabinet — Table 3' },
      { src: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=1080&q=80', caption: 'Cabinet — Table 4' },
      { src: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=1080&q=80', caption: 'Cabinet — Table 5' },
    ]
  },
  {
    id: 'permit',
    label: { mr: 'परमिट रूम', hi: 'परमिट रूम', en: 'Permit Room' },
    tagline: {
      mr: 'वातानुकूलित खोलीत शाही जेवण',
      hi: 'वातानुकूलित कक्ष में शाही भोजन',
      en: 'Royal AC fine dining'
    },
    svgIcon: <CrownACIcon color="#F0F0F0" />,
    topBarColors: ['#4A3000', '#FCEABB', '#D4AF37'],
    borderIdle: 'rgba(212,175,55,0.25)',
    hoverBorder: 'rgba(240,240,240,0.80)',
    hoverGlow: 'rgba(220,220,220,0.14)',
    hoverIconGlow: 'rgba(255,255,255,0.2)',
    btnFrom: '#3A2500',
    btnTo: '#FCEABB',
    images: [
      { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1080&q=80', caption: 'Permit Room — Table 1' },
      { src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1080&q=80', caption: 'Permit Room — Table 2' },
      { src: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1080&q=80', caption: 'Permit Room — Table 3' },
      { src: 'https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=1080&q=80', caption: 'Permit Room — Table 4' },
    ]
  }
];

// Translations for static strings used in this component
const UI_TEXT = {
  specialAttractions: { mr: 'विशेष आकर्षणे', hi: 'विशेष आकर्षण', en: 'Special Attractions' },
  chooseSeat: { mr: 'तुमचा आवडता बसण्याचा अनुभव निवडा', hi: 'अपना पसंदीदा बैठने का अनुभव चुनें', en: 'Choose Your Perfect Seating Experience' },
  viewTables: { mr: 'टेबल पहा →', hi: 'टेबल देखें →', en: 'View Tables →' },
  photo: { mr: 'फोटो', hi: 'फ़ोटो', en: 'Photo' },
  of: { mr: 'पैकी', hi: 'में से', en: 'of' },
};

export function Home() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState<SeatingZone | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const openZone = (zone: SeatingZone) => { setActiveZone(zone); setImgIndex(0); };
  const closeZone = () => setActiveZone(null);

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeZone) return;
    setImgIndex(i => (i - 1 + activeZone.images.length) % activeZone.images.length);
  };
  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeZone) return;
    setImgIndex(i => (i + 1) % activeZone.images.length);
  };

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1768949005507-8c0f571285f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXIlMjBuaWdodCUyMGFtYmlhbmNlfGVufDF8fHx8MTc3MjY1NDA2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury Bar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              Hotel Ronak & Beer Bar
            </h1>
            <p className="text-xl md:text-3xl text-[#F5F5DC] mb-8 font-light tracking-wide">{t('heroTagline')}</p>
          </motion.div>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 rounded-full text-lg font-semibold overflow-hidden group"
            onClick={() => navigate('/menu')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] animate-pulse-gold" />
            <span className="relative z-10 text-[#0A0A0A]">{t('exploreMenu')}</span>
            <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-full animate-ping opacity-20" />
          </motion.button>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <div className="w-6 h-10 border-2 border-[#D4AF37]/60 rounded-full p-2 hover:border-[#D4AF37] transition-colors duration-300">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full mx-auto"
            />
          </div>
        </motion.div>
      </section>

      {/* ── Featured Drinks ── */}
      <section id="featured" className="py-24 px-4 md:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
              {t('featuredDrinks')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {drinks.map((drink, index) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative h-[500px] cursor-pointer perspective-1000"
                onMouseEnter={() => setFlippedCard(drink.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${flippedCard === drink.id ? 'rotate-y-180' : ''}`}>
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border border-[var(--glass-border)]">
                    <ImageWithFallback src={drink.image} alt={drink.name[language]} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-[#F5F5DC] mb-2">{drink.name[language]}</h3>
                      <p className="text-[#D4AF37] text-xl font-semibold">{drink.price}</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-3xl p-8 flex flex-col items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-[#D4AF37] mb-4">{drink.name[language]}</h3>
                      <p className="text-[#F5F5DC] mb-6 text-lg">{drink.description[language]}</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">{drink.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="relative py-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[#D4AF37]/40 text-lg">✦</span>
            <p className="text-[#D4AF37] text-sm md:text-base font-semibold tracking-[0.22em] uppercase">
              {UI_TEXT.specialAttractions[language]}
            </p>
            <span className="text-[#D4AF37]/40 text-lg">✦</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
        </div>
        <p className="text-center text-[#F5F5DC]/30 text-xs mt-3 tracking-widest uppercase">
          {UI_TEXT.chooseSeat[language]}
        </p>
      </div>

      {/* ── Seating Zones ── */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seatingZones.map((zone, index) => {
              const isHovered = hoveredZone === zone.id;
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                  onHoverStart={() => setHoveredZone(zone.id)}
                  onHoverEnd={() => setHoveredZone(null)}
                  onClick={() => openZone(zone)}
                  className="relative cursor-pointer rounded-3xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(160deg, #141414 0%, #0D0D0D 100%)',
                    border: `1.5px solid ${isHovered ? zone.hoverBorder : zone.borderIdle}`,
                    boxShadow: isHovered
                      ? `0 8px 48px ${zone.hoverGlow}, 0 0 24px ${zone.hoverGlow}`
                      : '0 2px 20px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                  }}
                >
                  <div className="p-8 flex flex-col items-center text-center gap-4">
                    {/* SVG Icon */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: isHovered
                          ? `radial-gradient(circle at center, ${zone.hoverIconGlow} 0%, transparent 70%)`
                          : 'transparent',
                        border: `1px solid ${isHovered ? zone.hoverBorder : zone.borderIdle}`,
                        boxShadow: isHovered ? `0 0 20px ${zone.hoverGlow}` : 'none',
                        transition: 'all 0.35s ease',
                      }}
                    >
                      {zone.svgIcon}
                    </div>

                    {/* Label */}
                    <h3
                      className="text-2xl font-bold"
                      style={{
                        background: `linear-gradient(to right, ${zone.topBarColors.join(', ')})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {zone.label[language]}
                    </h3>

                    {/* Tagline */}
                    <p className="text-[#F5F5DC]/55 text-sm leading-relaxed tracking-wide">
                      {zone.tagline[language]}
                    </p>

                    {/* Dots */}
                    <div className="flex gap-1.5 mt-0.5">
                      {zone.images.map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isHovered ? zone.hoverBorder : zone.btnTo,
                            opacity: isHovered ? 0.7 : 0.4,
                            transition: 'all 0.35s ease',
                          }}
                        />
                      ))}
                    </div>

                    {/* Button */}
                    <button
                      className="mt-1 px-6 py-2.5 rounded-xl text-sm font-bold text-[#0A0A0A] transition-all duration-300"
                      style={{
                        background: `linear-gradient(to right, ${zone.btnFrom}, ${zone.btnTo})`,
                        boxShadow: isHovered ? `0 4px 20px ${zone.hoverGlow}` : 'none',
                      }}
                    >
                      {UI_TEXT.viewTables[language]}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {activeZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeZone}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
              style={{
                border: `1.5px solid ${activeZone.hoverBorder}`,
                boxShadow: `0 0 60px ${activeZone.hoverGlow}`,
                background: '#0D0D0D',
              }}
            >
              <div className="flex items-center justify-between px-6 py-4">
                <div>
                  <h3
                    className="text-xl font-bold"
                    style={{
                      background: `linear-gradient(to right, ${activeZone.topBarColors.join(', ')})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {activeZone.label[language]}
                  </h3>
                  <p className="text-[#F5F5DC]/35 text-xs mt-0.5">
                    {UI_TEXT.photo[language]} {imgIndex + 1} {UI_TEXT.of[language]} {activeZone.images.length} — {activeZone.images[imgIndex].caption}
                  </p>
                </div>
                <button
                  onClick={closeZone}
                  className="p-2 rounded-full text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A0A0A]"
                  style={{ border: '1px solid rgba(212,175,55,0.35)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-[#0A0A0A]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.28 }}
                  >
                    <ImageWithFallback
                      src={activeZone.images[imgIndex].src}
                      alt={activeZone.images[imgIndex].caption}
                      className="w-full h-[50vh] object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A0A0A]"
                  style={{ background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(212,175,55,0.4)' }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A0A0A]"
                  style={{ background: 'rgba(10,10,10,0.75)', border: '1px solid rgba(212,175,55,0.4)' }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 py-4">
                {activeZone.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={e => { e.stopPropagation(); setImgIndex(i); }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === imgIndex ? '22px' : '8px',
                      height: '8px',
                      background: i === imgIndex ? activeZone.btnTo : `${activeZone.btnTo}38`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-8 left-4 right-4 z-30">
        <button
          onClick={() => navigate('/menu')}
          className="w-full py-4 rounded-full bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold text-lg shadow-[0_0_30px_rgba(212,175,55,0.5)]"
        >
          {t('exploreMenu')}
        </button>
      </div>

      <style>{`
        @keyframes pulse-gold { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
        .animate-pulse-gold { animation: pulse-gold 2s cubic-bezier(0.4,0,0.6,1) infinite; }
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}