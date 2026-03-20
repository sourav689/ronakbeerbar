import { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Info } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface MenuItem {
  id: number;
  name: { mr: string; hi: string; en: string };
  description: { mr: string; hi: string; en: string };
  prices: {
    '90ml'?: string;
    '180ml'?: string;
    '375ml'?: string;
    '750ml'?: string;
  };
  category: 'whiskey' | 'rum' | 'vodka' | 'beer' | 'scotch' | 'wine' | 'brandy' | 'gin';
  image: string;
  darkBg?: boolean;
}

const VARIABLE_PRICE_CATEGORIES = ['beer', 'scotch', 'wine', 'brandy', 'gin'];

const menuItems: MenuItem[] = [
  // ─── WHISKEY ────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: { mr: 'रॉयल स्टॅग व्हिस्की', hi: 'रॉयल स्टैग व्हिस्की', en: 'Royal Stag Whisky' },
    description: { mr: 'स्मूथ ब्लेंडेड व्हिस्की', hi: 'स्मूद ब्लेंडेड व्हिस्की', en: 'Smooth Blended Whisky' },
    prices: { '90ml': '₹160', '180ml': '₹320', '375ml': '₹660', '750ml': '₹1340' },
    category: 'whiskey',
    image: '/images/whisky/ROYAL-STAG-DELUXE-WHISKY-1L.webp',
  },
  {
    id: 2,
    name: { mr: 'रॉयल स्टॅग डार्क', hi: 'रॉयल स्टैग डार्क', en: 'Royal Stag Dark' },
    description: { mr: 'रिच डार्क ब्लेंड', hi: 'रिच डार्क ब्लेंड', en: 'Rich Dark Blend' },
    prices: { '90ml': '₹170', '180ml': '₹340', '375ml': '₹680', '750ml': '₹1360' },
    category: 'whiskey',
    image: '/images/whisky/Royal stag dark.webp',
  },
  {
    id: 3,
    name: { mr: 'रॉयल स्टॅग बॅरेल', hi: 'रॉयल स्टैग बैरल', en: 'Royal Stag Barrel' },
    description: { mr: 'बॅरेल एजड व्हिस्की', hi: 'बैरल एजड व्हिस्की', en: 'Barrel Aged Whisky' },
    prices: { '90ml': '₹180', '180ml': '₹360', '375ml': '₹720', '750ml': '₹1450' },
    category: 'whiskey',
    image: '/images/whisky/royal stag darl 2.jpg',
  },
  {
    id: 4,
    name: { mr: 'इम्पेरियल ब्लू', hi: 'इम्पेरियल ब्लू', en: 'Imperial Blue' },
    description: { mr: 'क्लासिक ब्लेंडेड व्हिस्की', hi: 'क्लासिक ब्लेंडेड व्हिस्की', en: 'Classic Blended Whisky' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1140' },
    category: 'whiskey',
    image: '/images/whisky/imperial blue.jpg',
  },
  {
    id: 5,
    name: { mr: 'मॅक. डॉवेल नं. १', hi: 'मैक. डॉवेल नं. १', en: 'Mc. Dowell No. 1' },
    description: { mr: 'आयकॉनिक इंडियन व्हिस्की', hi: 'आइकॉनिक इंडियन व्हिस्की', en: 'Iconic Indian Whisky' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1140' },
    category: 'whiskey',
    image: '/images/whisky/MCDOWELLNO1.jpg',
  },
  {
    id: 6,
    name: { mr: 'मास्टर डिलाईट', hi: 'मास्टर डिलाइट', en: 'Master Delite' },
    description: { mr: 'सौम्य व्हिस्की', hi: 'सौम्य व्हिस्की', en: 'Mild & Smooth Whisky' },
    prices: { '90ml': '₹100', '180ml': '₹200', '375ml': '₹420', '750ml': '₹840' },
    category: 'whiskey',
    image: '/images/whisky/Markers delight.webp',
  },
  {
    id: 7,
    name: { mr: 'मुंबई माल्ट', hi: 'मुंबई माल्ट', en: 'Mumbai Malt' },
    description: { mr: 'लोकल माल्ट व्हिस्की', hi: 'लोकल माल्ट व्हिस्की', en: 'Local Malt Whisky' },
    prices: { '90ml': '₹100', '180ml': '₹200', '375ml': '₹420', '750ml': '₹840' },
    category: 'whiskey',
    image: '/images/whisky/mm2.webp',
  },
  {
    id: 8,
    name: { mr: 'रॉयल चॅलेंज', hi: 'रॉयल चैलेंज', en: 'Royal Challenge' },
    description: { mr: 'प्रेस्टिज ब्लेंड', hi: 'प्रेस्टिज ब्लेंड', en: 'Prestige Blend Whisky' },
    prices: { '90ml': '₹160', '180ml': '₹320', '375ml': '₹660', '750ml': '₹1340' },
    category: 'whiskey',
    image: '/images/whisky/royal-challenge-image.webp',
  },
  {
    id: 9,
    name: { mr: 'ग्रीन लेबल व्हिस्की', hi: 'ग्रीन लेबल व्हिस्की', en: 'Green Label Whisky' },
    description: { mr: 'फ्रेश ग्रीन लेबल', hi: 'फ्रेश ग्रीन लेबल', en: 'Fresh Green Label' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1140' },
    category: 'whiskey',
    image: '/images/whisky/Green label whiskey.jpg',
  },
  {
    id: 10,
    name: { mr: 'ऑफिसर्स चॉईस ब्लू', hi: 'ऑफिसर्स चॉइस ब्लू', en: "Officer's Choice Blue" },
    description: { mr: 'प्रीमियम ब्लू व्हिस्की', hi: 'प्रीमियम ब्लू व्हिस्की', en: 'Premium Blue Whisky' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1140' },
    category: 'whiskey',
    image: '/images/whisky/offciers chocie whisky blue.webp',
  },
  {
    id: 11,
    name: { mr: 'आयकॉनिक व्हाईट', hi: 'आइकॉनिक व्हाइट', en: 'ICONIQ WHITE' },
    description: { mr: 'व्हाईट लेबल व्हिस्की', hi: 'व्हाइट लेबल व्हिस्की', en: 'White Label Whisky' },
    prices: { '90ml': '₹150', '180ml': '₹290', '375ml': '₹580', '750ml': '₹1160' },
    category: 'whiskey',
    image: '/images/whisky/ICONIQ WHITE.jpg',
  },
  {
    id: 12,
    name: { mr: 'एक्सक्लेमेशन व्हिस्की', hi: 'एक्सक्लेमेशन व्हिस्की', en: 'XCLAMATION Whisky' },
    description: { mr: 'बोल्ड एक्स व्हिस्की', hi: 'बोल्ड एक्स व्हिस्की', en: 'Bold Statement Whisky' },
    prices: { '90ml': '₹190', '180ml': '₹380' },
    category: 'whiskey',
    image: '/images/whisky/XCLAMTION WHISKY.jpg',
  },
  {
    id: 13,
    name: { mr: 'ब्लेंडर्स प्राईड', hi: 'ब्लेंडर्स प्राइड', en: 'Blenders Pride' },
    description: { mr: 'प्रीमियम ब्लेंडेड व्हिस्की', hi: 'प्रीमियम ब्लेंडेड व्हिस्की', en: 'Premium Blended Whisky' },
    prices: { '90ml': '₹240', '180ml': '₹480', '375ml': '₹960' },
    category: 'whiskey',
    image: '/images/whisky/blenders pride.webp',
  },
  {
    id: 14,
    name: { mr: 'सिग्नेचर व्हिस्की', hi: 'सिग्नेचर व्हिस्की', en: 'Signature Whisky' },
    description: { mr: 'एलिगंट सिग्नेचर ब्लेंड', hi: 'एलिगेंट सिग्नेचर ब्लेंड', en: 'Elegant Signature Blend' },
    prices: { '90ml': '₹240', '180ml': '₹480', '375ml': '₹960' },
    category: 'whiskey',
    image: '/images/whisky/signatyure whisky.webp',
  },
  {
    id: 15,
    name: { mr: 'व्हल्कन ब्लू', hi: 'व्हल्कन ब्लू', en: 'Vulcan Blue' },
    description: { mr: 'ब्लू लेबल व्हिस्की', hi: 'ब्लू लेबल व्हिस्की', en: 'Blue Label Whisky' },
    prices: { '90ml': '₹110', '180ml': '₹220', '375ml': '₹440', '750ml': '₹880' },
    category: 'whiskey',
    image: '/images/whisky/vulcan blue.jpg',
  },
  {
    id: 16,
    name: { mr: 'क्लासिक गोल्ड', hi: 'क्लासिक गोल्ड', en: 'Classic Gold' },
    description: { mr: 'गोल्डन व्हिस्की', hi: 'गोल्डन व्हिस्की', en: 'Golden Smooth Whisky' },
    prices: { '90ml': '₹100', '180ml': '₹200', '375ml': '₹400', '750ml': '₹820' },
    category: 'whiskey',
    image: '/images/whisky/classic.png',
  },

  // ─── RUM ────────────────────────────────────────────────────────────────────
  {
    id: 17,
    name: { mr: 'रम गम रम', hi: 'रम गम रम', en: 'Rum Gum Rum' },
    description: { mr: 'स्वीट स्मूथ रम', hi: 'स्वीट स्मूद रम', en: 'Sweet & Smooth Rum' },
    prices: { '90ml': '₹100', '180ml': '₹200', '375ml': '₹420', '750ml': '₹840' },
    category: 'rum',
    image: '/images/rum/rumsumrum.png',
  },
  {
    id: 18,
    name: { mr: 'रस्टम गोल्ड रम', hi: 'रस्टम गोल्ड रम', en: 'Rustom Gold Rum' },
    description: { mr: 'गोल्डन प्रीमियम रम', hi: 'गोल्डन प्रीमियम रम', en: 'Golden Premium Rum' },
    prices: { '90ml': '₹100', '180ml': '₹200', '375ml': '₹420', '750ml': '₹840' },
    category: 'rum',
    image: '/images/rum/Rustomgold.png',
  },
  {
    id: 19,
    name: { mr: 'अल्फा बुल रम', hi: 'अल्फा बुल रम', en: 'Alpha Bull Rum' },
    description: { mr: 'स्ट्राँग बुल रम', hi: 'स्ट्रॉन्ग बुल रम', en: 'Strong Bull Rum' },
    prices: { '90ml': '₹110', '180ml': '₹220', '375ml': '₹460', '750ml': '₹920' },
    category: 'rum',
    image: '/images/rum/Alhpabullrum.avif',
  },
  {
    id: 20,
    name: { mr: 'मॅकडॉवेल नं.१ रम', hi: 'मैकडॉवेल नं.१ रम', en: 'McDowell No.1 Rum' },
    description: { mr: 'क्लासिक इंडियन रम', hi: 'क्लासिक इंडियन रम', en: 'Classic Indian Rum' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1120' },
    category: 'rum',
    image: '/images/rum/Mcdowells-No-1-Celebration-Rum.jpg',
  },
  {
    id: 21,
    name: { mr: 'ओल्ड मॉंक रम', hi: 'ओल्ड मॉंक रम', en: 'Old Monk Rum' },
    description: { mr: 'लीजेंडरी डार्क रम', hi: 'लेजेंडरी डार्क रम', en: 'Legendary Dark Rum' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1120' },
    category: 'rum',
    image: '/images/rum/old monk.jpg',
  },
  {
    id: 22,
    name: { mr: 'मॅड रम', hi: 'मैड रम', en: 'MAD Rum' },
    description: { mr: 'बोल्ड स्पिरिट', hi: 'बोल्ड स्पिरिट', en: 'Bold Spirit Rum' },
    prices: { '90ml': '₹—', '180ml': '₹—' },
    category: 'rum',
    image: '/images/rum/madrum.png',
  },

  // ─── VODKA ──────────────────────────────────────────────────────────────────
  {
    id: 23,
    name: { mr: 'अॅब्सोलुट वोडका', hi: 'एब्सोल्यूट वोदका', en: 'Absolut Vodka' },
    description: { mr: '२०० मिली स्पेशल', hi: '२०० मिली स्पेशल', en: 'Special 200ml Pack' },
    prices: { '180ml': '₹800' },
    category: 'vodka',
    image: '/images/vodka/absolutvodka.webp',
  },
  {
    id: 24,
    name: { mr: 'ग्रँड मास्टर्स वोडका (मेलॉन)', hi: 'ग्रैंड मास्टर्स वोदका (मेलन)', en: 'Grand Masters Vodka (Melon)' },
    description: { mr: 'मेलॉन फ्लेवर्ड वोडका', hi: 'मेलन फ्लेवर्ड वोदका', en: 'Melon Flavoured Vodka' },
    prices: { '90ml': '₹180', '180ml': '₹360', '375ml': '₹720', '750ml': '₹1440' },
    category: 'vodka',
    image: '/images/vodka/melon.png',
  },
  {
    id: 25,
    name: { mr: 'मॅजिक मोमेंट्स अॅपल वोडका', hi: 'मैजिक मोमेंट्स एप्पल वोदका', en: 'Magic Moments Apple Vodka' },
    description: { mr: 'फ्रेश अॅपल फ्लेवर', hi: 'फ्रेश एप्पल फ्लेवर', en: 'Fresh Apple Flavour' },
    prices: { '90ml': '₹170', '180ml': '₹340', '375ml': '₹680', '750ml': '₹1360' },
    category: 'vodka',
    image: '/images/vodka/magicmomemtsapple.jpg',
  },
  {
    id: 26,
    name: { mr: 'मॅजिक मोमेंट्स प्लेन वोडका', hi: 'मैजिक मोमेंट्स प्लेन वोदका', en: 'Magic Moments Plane Vodka' },
    description: { mr: 'क्लासिक प्लेन वोडका', hi: 'क्लासिक प्लेन वोदका', en: 'Classic Plain Vodka' },
    prices: { '90ml': '₹170', '180ml': '₹340', '375ml': '₹680', '750ml': '₹1360' },
    category: 'vodka',
    image: '/images/vodka/magicmoemntsplane.webp',
  },
  {
    id: 27,
    name: { mr: 'एक्सक्लेमेशन वोडका', hi: 'एक्सक्लेमेशन वोदका', en: 'XClamation Vodka' },
    description: { mr: 'बोल्ड एक्स वोडका', hi: 'बोल्ड एक्स वोदका', en: 'Bold Statement Vodka' },
    prices: { '90ml': '₹190', '180ml': '₹380' },
    category: 'vodka',
    image: '/images/vodka/xclanmationvodka.jpg',
  },
  {
    id: 28,
    name: { mr: 'रोमन वोडका प्लेन', hi: 'रोमन वोदका प्लेन', en: 'Romen Vodka Plain' },
    description: { mr: 'क्लासिक प्लेन वोडका', hi: 'क्लासिक प्लेन वोदका', en: 'Classic Plain Vodka' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1120' },
    category: 'vodka',
    image: '/images/vodka/romenvodka.webp',
  },
  {
    id: 29,
    name: { mr: 'रोमन वोडका अॅपल', hi: 'रोमन वोदका एप्पल', en: 'Romen Vodka Apple' },
    description: { mr: 'अॅपल फ्लेवर्ड वोडका', hi: 'एप्पल फ्लेवर्ड वोदका', en: 'Apple Flavoured Vodka' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1120' },
    category: 'vodka',
    image: '/images/vodka/romenapple.webp',
  },
  {
    id: 30,
    name: { mr: 'रोमन वोडका ऑरेंज', hi: 'रोमन वोदका ऑरेंज', en: 'Romen Vodka Orange' },
    description: { mr: 'ऑरेंज फ्लेवर्ड वोडका', hi: 'ऑरेंज फ्लेवर्ड वोडका', en: 'Orange Flavoured Vodka' },
    prices: { '90ml': '₹140', '180ml': '₹280', '375ml': '₹560', '750ml': '₹1120' },
    category: 'vodka',
    image: '/images/vodka/romanvodkaorange.jpg',
  },
  {
    id: 31,
    name: { mr: 'ग्रँड मास्टर्स वोडका (मँगो)', hi: 'ग्रैंड मास्टर्स वोदका (मैंगो)', en: 'Grand Masters Vodka (Mango)' },
    description: { mr: 'मँगो फ्लेवर्ड वोडका', hi: 'मैंगो फ्लेवर्ड वोदका', en: 'Mango Flavoured Vodka' },
    prices: { '90ml': '₹180', '180ml': '₹360', '375ml': '₹720', '750ml': '₹1440' },
    category: 'vodka',
    image: '/images/vodka/grandmastervodkamango.jpg',
  },

  // ─── BEER ───────────────────────────────────────────────────────────────────
  {
    id: 32,
    name: { mr: 'बडवाईझर', hi: 'बडवाइज़र', en: 'Budweiser' },
    description: { mr: 'अमेरिकन लागर बीअर', hi: 'अमेरिकन लागर बीयर', en: 'American Lager Beer' },
    prices: {},
    category: 'beer',
    image: '/images/beer/budwiser.webp',
  },
  {
    id: 33,
    name: { mr: 'कार्ल्सबर्ग', hi: 'कार्ल्सबर्ग', en: 'Carlsberg' },
    description: { mr: 'डॅनिश प्रीमियम बीअर', hi: 'डेनिश प्रीमियम बीयर', en: 'Danish Premium Beer' },
    prices: {},
    category: 'beer',
    image: '/images/beer/carlsberg.webp',
  },
  {
    id: 34,
    name: { mr: 'टुबोर्ग', hi: 'टुबोर्ग', en: 'Tuborg' },
    description: { mr: 'डॅनिश क्राफ्ट बीअर', hi: 'डेनिश क्राफ्ट बीयर', en: 'Danish Craft Beer' },
    prices: {},
    category: 'beer',
    image: '/images/beer/turbog.jpg',
  },
  {
    id: 35,
    name: { mr: 'किंगफिशर', hi: 'किंगफिशर', en: 'Kingfisher' },
    description: { mr: 'इंडियाज फेवरेट बीअर', hi: 'इंडिया की पसंदीदा बीयर', en: "India's Favourite Beer" },
    prices: {},
    category: 'beer',
    image: '/images/beer/kingfisher.avif',
  },
  {
    id: 36,
    name: { mr: 'कॅनन बीअर', hi: 'कैनन बीयर', en: 'Canon Beer' },
    description: { mr: 'स्ट्राँग कॅनन', hi: 'स्ट्रॉन्ग कैनन', en: 'Strong Canon Beer' },
    prices: {},
    category: 'beer',
    image: '/images/beer/canon.png',
  },
  {
    id: 37,
    name: { mr: 'नॉक आउट बीअर', hi: 'नॉक आउट बीयर', en: 'Knock Out Beer' },
    description: { mr: 'एक्स्ट्रा स्ट्राँग बीअर', hi: 'एक्स्ट्रा स्ट्रॉन्ग बीयर', en: 'Extra Strong Beer' },
    prices: {},
    category: 'beer',
    image: '/images/beer/knockout.png',
  },
  {
    id: 38,
    name: { mr: 'हेवर्ड्स बीअर', hi: 'हेवर्ड्स बीयर', en: "Hayward's Beer" },
    description: { mr: 'क्लासिक स्ट्राँग बीअर', hi: 'क्लासिक स्ट्रॉन्ग बीयर', en: 'Classic Strong Beer' },
    prices: {},
    category: 'beer',
    image: '/images/beer/haywards.png',
  },

  // ─── SCOTCH ─────────────────────────────────────────────────────────────────
  {
    id: 39,
    name: { mr: "बॅलेन्टाईन्स स्कॉच", hi: "बैलेंटाइन्स स्कॉच", en: "Ballantine's Scotch Whisky" },
    description: { mr: 'स्कॉटलंडची प्रीमियम स्कॉच', hi: 'स्कॉटलैंड की प्रीमियम स्कॉच', en: 'Premium Blended Scotch' },
    prices: {},
    category: 'scotch',
    image: '/images/scotch whiskey/ballantines.webp',
  },
  {
    id: 40,
    name: { mr: 'जॉनी वॉकर ब्लॅक लेबल', hi: 'जॉनी वॉकर ब्लैक लेबल', en: 'Black Label Scotch Whisky' },
    description: { mr: '12 वर्ष जुनी स्कॉच', hi: '12 साल पुरानी स्कॉच', en: '12 Year Aged Scotch' },
    prices: {},
    category: 'scotch',
    image: '/images/scotch whiskey/blacklabel.jpg',
  },
  {
    id: 41,
    name: { mr: 'जॉनी वॉकर रेड लेबल', hi: 'जॉनी वॉकर रेड लेबल', en: 'Red Label Scotch Whisky' },
    description: { mr: 'आयकॉनिक रेड लेबल स्कॉच', hi: 'आइकॉनिक रेड लेबल स्कॉच', en: 'Iconic Red Label Scotch' },
    prices: {},
    category: 'scotch',
    image: '/images/scotch whiskey/redlabel.jpg',
  },
  {
    id: 42,
    name: { mr: 'जॉनी वॉकर ग्रीन लेबल', hi: 'जॉनी वॉकर ग्रीन लेबल', en: 'Green Label Scotch Whisky' },
    description: { mr: '15 वर्ष जुनी ब्लेंडेड माल्ट', hi: '15 साल पुरानी ब्लेंडेड माल्ट', en: '15 Year Blended Malt' },
    prices: {},
    category: 'scotch',
    image: '/images/scotch whiskey/greenlabel.webp',
  },
  {
    id: 43,
    name: { mr: 'जेमेसन आयरिश व्हिस्की', hi: 'जेमेसन आयरिश व्हिस्की', en: 'Jameson Irish Whisky' },
    description: { mr: 'स्मूथ आयरिश व्हिस्की', hi: 'स्मूद आयरिश व्हिस्की', en: 'Triple Distilled Irish' },
    prices: {},
    category: 'scotch',
    image: '/images/scotch whiskey/jamesob.jpg',
  },
  {
    id: 44,
    name: { mr: "टीचर्स स्कॉच व्हिस्की", hi: "टीचर्स स्कॉच व्हिस्की", en: "Teacher's Scotch Whisky" },
    description: { mr: 'हेवीली पीटेड स्कॉच', hi: 'हेवीली पीटेड स्कॉच', en: 'Heavily Peated Scotch' },
    prices: {},
    category: 'scotch',
    image: '/images/scotch whiskey/teachers.webp',
  },
  {
    id: 45,
    name: { mr: '100 पायपर्स स्कॉच', hi: '100 पाइपर्स स्कॉच', en: '100 Pipers Scotch Whisky' },
    description: { mr: 'स्मूथ ब्लेंडेड स्कॉच', hi: 'स्मूद ब्लेंडेड स्कॉच', en: 'Smooth Blended Scotch' },
    prices: {},
    category: 'scotch',
    image: '/images/scotch whiskey/100pipers.webp',
  },

  // ─── WINE ───────────────────────────────────────────────────────────────────
  {
    id: 46,
    name: { mr: 'रिओ वाईन', hi: 'रिओ वाइन', en: 'Rio Wine' },
    description: { mr: 'फ्रुटी रेड वाईन', hi: 'फ्रुटी रेड वाइन', en: 'Fruity Red Wine' },
    prices: {},
    category: 'wine',
    image: '/images/wine/rio.png',
  },
  {
    id: 47,
    name: { mr: 'बेलोटी वाईन', hi: 'बेलोटी वाइन', en: 'Belloti Wine' },
    description: { mr: 'इटालियन स्टाईल वाईन', hi: 'इटालियन स्टाइल वाइन', en: 'Italian Style Wine' },
    prices: {},
    category: 'wine',
    image: '/images/wine/belloti.png',
  },
  {
    id: 48,
    name: { mr: 'झिपी स्ट्राँग वाईन', hi: 'ज़िपी स्ट्रॉन्ग वाइन', en: 'Zippy Strong Wine' },
    description: { mr: 'बोल्ड स्ट्राँग वाईन', hi: 'बोल्ड स्ट्रॉन्ग वाइन', en: 'Bold & Strong Wine' },
    prices: {},
    category: 'wine',
    image: '/images/wine/zipy.jpg',
  },
  {
    id: 49,
    name: { mr: 'गो गो वाईन', hi: 'गो गो वाइन', en: 'GoGo Wine' },
    description: { mr: 'लाईट फ्रेश वाईन', hi: 'लाइट फ्रेश वाइन', en: 'Light & Fresh Wine' },
    prices: {},
    category: 'wine',
    image: '/images/wine/GogoWine.jpg',
  },

  // ─── BRANDY ─────────────────────────────────────────────────────────────────
  {
    id: 50,
    name: { 
      mr: 'एक्सक्लेमेशन ब्रँडी', 
      hi: 'एक्सक्लेमेशन ब्रैंडी', 
      en: 'Exclamation Brandy' 
    },
    description: { 
      mr: 'क्लासिक एजड ब्रँडी', 
      hi: 'क्लासिक एजड ब्रैंडी', 
      en: 'Classic Aged Brandy' 
    },
    prices: {},
    category: 'brandy',
    image: '/images/brandy/x.webp',
  },

  // ─── GIN ────────────────────────────────────────────────────────────────────
  {
    id: 51,
    name: { 
      mr: 'एक्सक्लेमेशन जिन', 
      hi: 'एक्सक्लेमेशन जिन', 
      en: 'Exclamation Gin' 
    },
    description: { 
      mr: 'प्रीमियम बोटॅनिकल जिन', 
      hi: 'प्रीमियम बोटैनिकल जिन', 
      en: 'Premium Botanical Gin' 
    },
    prices: {},
    category: 'gin',
    image: '/images/gin/x.jpg',
  },
];

const categoryAccent: Record<string, { dot: string; badge: string; label: string }> = {
  whiskey: { dot: '#D97706', badge: 'rgba(217,119,6,0.15)',    label: '#F59E0B' },
  rum:     { dot: '#EF4444', badge: 'rgba(239,68,68,0.15)',    label: '#FCA5A5' },
  vodka:   { dot: '#60A5FA', badge: 'rgba(96,165,250,0.15)',   label: '#93C5FD' },
  beer:    { dot: '#FBBF24', badge: 'rgba(251,191,36,0.15)',   label: '#FDE68A' },
  scotch:  { dot: '#A78BFA', badge: 'rgba(167,139,250,0.15)',  label: '#DDD6FE' },
  wine:    { dot: '#F472B6', badge: 'rgba(244,114,182,0.15)',  label: '#FBCFE8' },
  brandy:  { dot: '#FB923C', badge: 'rgba(251,146,60,0.15)',   label: '#FED7AA' },
  gin:     { dot: '#34D399', badge: 'rgba(52,211,153,0.15)',   label: '#A7F3D0' },
};

const sizeColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
  '90ml':  { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.45)',  text: '#6EE7B7', label: '90ml'  },
  '180ml': { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.45)',  text: '#FCD34D', label: '180ml' },
  '375ml': { bg: 'rgba(167,139,250,0.12)', border: 'rgba(167,139,250,0.45)', text: '#C4B5FD', label: '375ml' },
  '750ml': { bg: 'rgba(251,113,133,0.12)', border: 'rgba(251,113,133,0.45)', text: '#FDA4AF', label: '750ml' },
};

export function Menu() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all',     label: { mr: 'सर्व',      hi: 'सभी',      en: 'All'     }, emoji: '' },
    { id: 'whiskey', label: { mr: 'व्हिस्की',   hi: 'व्हिस्की',  en: 'Whisky'  }, emoji: '🥃' },
    { id: 'rum',     label: { mr: 'रम',         hi: 'रम',        en: 'Rum'     }, emoji: '🍹' },
    { id: 'vodka',   label: { mr: 'वोडका',      hi: 'वोदका',     en: 'Vodka'   }, emoji: '🍸' },
    { id: 'beer',    label: { mr: 'बीअर',       hi: 'बीयर',      en: 'Beer'    }, emoji: '🍺' },
    { id: 'scotch',  label: { mr: 'स्कॉच',      hi: 'स्कॉच',     en: 'Scotch'  }, emoji: '🥂' },
    { id: 'wine',    label: { mr: 'वाईन',       hi: 'वाइन',      en: 'Wine'    }, emoji: '🍷' },
    { id: 'brandy',  label: { mr: 'ब्रँडी',     hi: 'ब्रैंडी',    en: 'Brandy'  }, emoji: '🥃' },
    { id: 'gin',     label: { mr: 'जिन',        hi: 'जिन',       en: 'Gin'     }, emoji: '🍸' },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!q) return matchesCategory;
      const matchesSearch =
        item.name.mr.toLowerCase().includes(q) ||
        item.name.hi.toLowerCase().includes(q) ||
        item.name.en.toLowerCase().includes(q) ||
        item.description.mr.toLowerCase().includes(q) ||
        item.description.hi.toLowerCase().includes(q) ||
        item.description.en.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const accent = (cat: string) => categoryAccent[cat] ?? categoryAccent.whiskey;

  const categoryEmoji = (cat: string) => {
    const map: Record<string, string> = {
      whiskey: '🥃', rum: '🍹', vodka: '🍸', beer: '🍺',
      scotch: '🥂', wine: '🍷', brandy: '🥃', gin: '🍸',
    };
    return map[cat] ?? '🍶';
  };

  const globalPriceTip = {
    mr: 'सर्व श्रेणींच्या किंमती रिअल टाइममध्ये बदलू शकतात — अचूक किंमतीसाठी मालकांशी संपर्क साधा.',
    hi: 'सभी श्रेणियों की कीमतें रियल टाइम में बदल सकती हैं — सटीक मूल्य के लिए मालिक से संपर्क करें।',
    en: 'Prices across all categories may vary in real time — contact the owner for accurate pricing.',
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
            {t('menu')}
          </h1>
          <p className="text-[#F5F5DC]/35 tracking-widest uppercase text-xs">
            {language === 'mr'
              ? 'आमचे प्रीमियम पेय'
              : language === 'hi'
              ? 'हमारे प्रीमियम पेय'
              : 'Our Premium Selection'}
          </p>
        </motion.div>

        {/* ── Global Price Tip (above search bar) ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="max-w-2xl mx-auto mb-4"
        >
          <div
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
            style={{
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
            <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(245,245,220,0.55)' }}>
              {globalPriceTip[language]}
            </p>
          </div>
        </motion.div>

        {/* ── Search Bar ── */}
        <div className="mb-8">
          <div
            className="relative max-w-2xl mx-auto rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #141414, #0D0D0D)',
              border: '1.5px solid rgba(212,175,55,0.25)',
              boxShadow: searchQuery ? '0 0 24px rgba(212,175,55,0.15)' : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
            <input
              type="text"
              placeholder={
                language === 'mr'
                  ? 'नाव किंवा प्रकार शोधा...'
                  : language === 'hi'
                  ? 'नाम या प्रकार खोजें...'
                  : 'Search by name or type...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-14 py-4 bg-transparent text-[#F5F5DC] placeholder:text-[#F5F5DC]/35 focus:outline-none text-sm"
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#FCEABB] transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-center text-[#D4AF37]/60 text-xs mt-3 tracking-wide"
              >
                {filteredItems.length}{' '}
                {language === 'mr'
                  ? 'आयटम सापडले'
                  : language === 'hi'
                  ? 'आइटम मिले'
                  : 'results found'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* ── Category Pills ── */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map(category => {
            const isActive = selectedCategory === category.id;
            const acc = category.id !== 'all' ? accent(category.id) : null;
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className="px-7 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={
                  isActive
                    ? {
                        background: acc
                          ? `linear-gradient(to right, ${acc.dot}88, ${acc.dot}, ${acc.dot}88)`
                          : 'linear-gradient(to right, #B8860B, #FCEABB, #D4AF37)',
                        color: '#0A0A0A',
                        boxShadow: acc
                          ? `0 0 18px ${acc.dot}55`
                          : '0 0 18px rgba(212,175,55,0.35)',
                      }
                    : {
                        background: 'linear-gradient(160deg, #141414, #0D0D0D)',
                        border: '1.5px solid rgba(212,175,55,0.2)',
                        color: acc ? acc.label : '#F5F5DC',
                      }
                }
              >
                {category.emoji && <span className="mr-1.5">{category.emoji}</span>}
                {category.label[language]}
              </motion.button>
            );
          })}
        </div>

        {/* ── Menu Grid ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const acc = accent(item.category);
              const priceEntries = (
                ['90ml', '180ml', '375ml', '750ml'] as const
              ).filter(size => item.prices[size] && item.prices[size] !== '₹—');

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -10 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-3xl overflow-hidden cursor-default"
                  style={{
                    background: 'linear-gradient(160deg, #151515 0%, #0D0D0D 100%)',
                    border: '1.5px solid rgba(212,175,55,0.18)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${acc.dot}80`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${acc.dot}22`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.18)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
                  }}
                >
                  {/* Category dot badge */}
                  <div
                    className="absolute top-3 right-3 z-10 w-2.5 h-2.5 rounded-full"
                    style={{ background: acc.dot, boxShadow: `0 0 8px ${acc.dot}` }}
                  />

                  {/* ── Image — white bg + object-contain for ALL categories ── */}
                  <div
                    className="relative h-52 overflow-hidden flex items-center justify-center p-4"
                    style={{ background: '#ffffff' }}
                  >
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name[language]}
                      className="w-auto h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* subtle gradient at bottom so card text blends in */}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />

                    {/* Category chip */}
                    <div
                      className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider z-10"
                      style={{
                        background: acc.badge,
                        border: `1px solid ${acc.dot}55`,
                        color: acc.dot,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {categoryEmoji(item.category)} {item.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1 leading-snug" style={{ color: '#F5F5DC' }}>
                      {item.name[language]}
                    </h3>
                    <p className="text-[#F5F5DC]/50 text-xs leading-relaxed mb-4">
                      {item.description[language]}
                    </p>

                    {/* Divider */}
                    <div
                      className="h-px w-full mb-4"
                      style={{
                        background: `linear-gradient(to right, transparent, ${acc.dot}40, transparent)`,
                      }}
                    />

                    {/* Price Tags */}
                    <div className="flex flex-wrap gap-2">
                      {!VARIABLE_PRICE_CATEGORIES.includes(item.category) && priceEntries.length > 0 &&
                        priceEntries.map(size => {
                          const s = sizeColors[size];
                          return (
                            <div
                              key={size}
                              className="flex flex-col items-center px-3 py-2 rounded-xl"
                              style={{ background: s.bg, border: `1px solid ${s.border}` }}
                            >
                              <span
                                className="text-[9px] font-semibold uppercase tracking-widest mb-0.5"
                                style={{ color: s.text, opacity: 0.7 }}
                              >
                                {s.label}
                              </span>
                              <span className="text-sm font-bold" style={{ color: s.text }}>
                                {item.prices[size]}
                              </span>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty State ── */}
        <AnimatePresence>
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-[#F5F5DC]/50 text-lg mb-2">
                {language === 'mr'
                  ? 'कोणतेही आयटम सापडले नाहीत'
                  : language === 'hi'
                  ? 'कोई आइटम नहीं मिला'
                  : 'No items found'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-6 py-2 rounded-full text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37]"
              >
                {language === 'mr'
                  ? 'रीसेट करा'
                  : language === 'hi'
                  ? 'रीसेट करें'
                  : 'Reset filters'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}