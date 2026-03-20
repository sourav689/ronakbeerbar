import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import Masonry from 'react-responsive-masonry';
import { X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface GalleryImage {
  id: number;
  src: string;
  alt: { mr: string; hi: string; en: string };
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1680946496238-5272d3c407fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkYXJrfGVufDF8fHx8MTc3MjYwMTQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'लग्झरी इंटीरियर', hi: 'लक्जरी इंटीरियर', en: 'Luxury Interior' }
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1763771757330-3212b518e31c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXIlMjBjb3VudGVyJTIwZHJpbmtzJTIwbmlnaHR8ZW58MXx8fHwxNzcyNjU0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'बार काउंटर', hi: 'बार काउंटर', en: 'Bar Counter' }
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1760421130636-68b0c386f09a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwZGluaW5nJTIwbmlnaHQlMjBsaWdodHN8ZW58MXx8fHwxNzcyNjU0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'छतावरील जेवण', hi: 'छत पर भोजन', en: 'Rooftop Dining' }
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1758648207539-b40dd1f6b50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwYXRtb3NwaGVyZSUyMGVsZWdhbnR8ZW58MXx8fHwxNzcyNjU0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'फाइन डायनिंग', hi: 'फाइन डाइनिंग', en: 'Fine Dining' }
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1681732500310-34637949518c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJ0ZW5kZXIlMjBjb2NrdGFpbCUyMG1ha2luZ3xlbnwxfHx8fDE3NzI2NTQyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'बारटेंडर कला', hi: 'बारटेंडर कला', en: 'Bartender Art' }
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1743793055911-52e19beba5d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGVjb3IlMjBsdXh1cnklMjBhbWJpYW5jZXxlbnwxfHx8fDE3NzI2NTQyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'सजावट', hi: 'सजावट', en: 'Decor' }
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1651945496833-1308066c48ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwY29ja3RhaWwlMjBkcmluayUyMGdvbGR8ZW58MXx8fHwxNzcyNjU0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'कॉकटेल', hi: 'कॉकटेल', en: 'Cocktails' }
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1598930230137-27b0b22154fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc3RlYWslMjBkaW5uZXIlMjBlbGVnYW50fGVufDF8fHx8MTc3MjY1NDEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'गोरमेट जेवण', hi: 'गोरमेट भोजन', en: 'Gourmet Food' }
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1743193143066-29d976eb6edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXR0ZXIlMjBkYXJrfGVufDF8fHx8MTc3MjY1NDEzNXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: { mr: 'प्लॅटर', hi: 'प्लेटर', en: 'Platters' }
  }
];

export function Gallery() {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [columnsCount, setColumnsCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumnsCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnsCount(2);
      } else {
        setColumnsCount(3);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
            {t('ourGallery')}
          </h1>
          <p className="text-[#F5F5DC]/80 text-xl max-w-2xl mx-auto">
            {language === 'mr' && 'आमच्या लग्झरी बार आणि रेस्टॉरंटची झलक'}
            {language === 'hi' && 'हमारे लक्जरी बार और रेस्तरां की झलक'}
            {language === 'en' && 'A glimpse into our luxury bar and restaurant'}
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <Masonry columnsCount={columnsCount} gutter="32px">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[var(--glass-border)]"
              onClick={() => setSelectedImage(image)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt[language]}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[#D4AF37] text-xl font-semibold">{image.alt[language]}</p>
                </div>
              </div>
              {/* Zoom Effect Indicator */}
              <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 rounded-full backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
              <ImageWithFallback
                src={selectedImage.src}
                alt={selectedImage.alt[language]}
                className="max-w-full max-h-[90vh] object-contain rounded-3xl border-2 border-[#D4AF37]"
              />
              <p className="text-center text-[#D4AF37] text-2xl font-semibold mt-4">
                {selectedImage.alt[language]}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};