import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Send, Instagram } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function About() {
  const { t, language } = useLanguage();
  const [currentReview, setCurrentReview] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const reviews = [
    {
      id: 1,
      name: { mr: 'प्रिया शर्मा', hi: 'प्रिया शर्मा', en: 'Priya Sharma' },
      rating: 5,
      comment: {
        mr: 'LUXE BAR मध्ये अप्रतिम अनुभव! खाणं आणि सेवा उत्तम होतं. नक्कीच पुन्हा येईन!',
        hi: 'LUXE BAR में शानदार अनुभव! खाना और सेवा बेहतरीन थी। निश्चित रूप से फिर आएंगे!',
        en: 'Amazing experience at LUXE BAR! The food and service were exceptional. Will definitely come again!'
      },
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mjg5OTU3M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 2,
      name: { mr: 'राहुल कुलकर्णी', hi: 'राहुल कुलकर्णी', en: 'Rahul Kulkarni' },
      rating: 5,
      comment: {
        mr: 'परफेक्ट वातावरण आणि अतिशय चवदार पदार्थ. माझ्या बर्थडे साठी सर्वोत्तम जागा होती!',
        hi: 'परफेक्ट माहौल और बेहद स्वादिष्ट व्यंजन। मेरे बर्थडे के लिए सबसे अच्छी जगह थी!',
        en: 'Perfect ambiance and extremely delicious dishes. Best place for my birthday celebration!'
      },
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzI4OTk1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: 3,
      name: { mr: 'अनीता पाटील', hi: 'अनीता पाटिल', en: 'Anita Patil' },
      rating: 5,
      comment: {
        mr: 'लग्झुरियस व्हायब्स आणि प्रीमियम ड्रिंक्स. प्रत्येक पैसा वर्थ आहे. हायली रेकमेंडेड!',
        hi: 'लग्जरी वाइब्स और प्रीमियम ड्रिंक्स। हर पैसा वर्थ है। बहुत ही अनुशंसित!',
        en: 'Luxurious vibes and premium drinks. Every penny worth it. Highly recommended!'
      },
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzcyODk5NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const content = {
    story: {
      mr: 'Hotel Ronak & Beer Bar ही प्रीमियम जेवण आणि पेयांच्या अनुभवाची परिभाषा आहे. 2011 मध्ये स्थापना झाल्यापासून, आम्ही महाराष्ट्रातील सर्वोत्तम ब्रँड बनण्यासाठी प्रयत्नशील आहोत.',
      hi: 'Hotel Ronak & Beer Bar प्रीमियम भोजन और पेय अनुभव की परिभाषा है। 2011 में अपनी स्थापना के बाद से, हम महाराष्ट्र में सर्वश्रेष्ठ ब्रांड बनने की दिशा में प्रयासरत हैं।',
      en: 'Hotel Ronak & Beer Bar is the definition of premium dining and beverage experience. Since our establishment in 2011, we have been striving to be the best brand in Maharashtra.'
    },
    mission: {
      mr: 'आमचे ध्येय प्रत्येक पाहुण्यांना एक अविस्मरणीय अनुभव देणे आहे.',
      hi: 'हमारा मिशन प्रत्येक मेहमान को एक अविस्मरणीय अनुभव प्रदान करना है।',
      en: 'Our mission is to provide every guest with an unforgettable experience.'
    }
  };

  // --- Instagram Deep Link Logic ---
  const handleInstagramRedirect = () => {
  const instagramId = 'ronakbeerbar';
  const webUrl = `https://www.instagram.com/${instagramId}`;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    const appUrl = `instagram://user?username=${instagramId}`;
    
    // Open web URL in new tab first (as fallback)
    const newTab = window.open(webUrl, '_blank');
    
    // Then try to open the app
    setTimeout(() => {
      window.location.href = appUrl;
    }, 100);
    
  } else {
    window.open(webUrl, '_blank');
  }
};

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert(language === 'mr' ? 'कृपया सर्व माहिती भरा' : language === 'hi' ? 'कृपया सभी जानकारी भरें' : 'Please fill in all fields');
      return;
    }
    alert(`Query submitted: ${formData.name}`);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
            {t('ourStory')}
          </h1>
        </motion.div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-3xl p-8 md:p-12">
              <h2 className="text-4xl font-bold text-[#D4AF37] mb-6">
                {language === 'mr' ? 'आमची कथा' : language === 'hi' ? 'हमारी कहानी' : 'Our Story'}
              </h2>
              <p className="text-[#F5F5DC]/90 text-lg leading-relaxed mb-8">{content.story[language]}</p>
              
              <h3 className="text-3xl font-bold text-[#D4AF37] mb-4">
                {language === 'mr' ? 'आमचे ध्येय' : language === 'hi' ? 'हमारा मिशन' : 'Our Mission'}
              </h3>
              <p className="text-[#F5F5DC]/90 text-lg leading-relaxed mb-8">{content.mission[language]}</p>

              {/* Added Instagram Follow Button */}
              <button 
                onClick={handleInstagramRedirect}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Follow @ronakbeerbar</span>
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]">
            <ImageWithFallback src="https://images.unsplash.com/photo-1680946496238-5272d3c407fc" alt="Luxury Interior" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Reviews Carousel Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-24">
          <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent mb-12">
            {language === 'mr' ? 'ग्राहक अभिप्राय' : language === 'hi' ? 'ग्राहक समीक्षा' : 'Customer Reviews'}
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-3xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#D4AF37]">
                    <ImageWithFallback src={reviews[currentReview].image} alt={reviews[currentReview].name[language]} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-3">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-[#F5F5DC] text-lg leading-relaxed mb-4 italic">"{reviews[currentReview].comment[language]}"</p>
                  <p 
                    onClick={handleInstagramRedirect}
                    className="text-[#D4AF37] font-bold text-xl cursor-pointer hover:underline inline-flex items-center gap-2"
                  >
                    {reviews[currentReview].name[language]}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button onClick={prevReview} className="p-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#0A0A0A] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextReview} className="p-3 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#0A0A0A] hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Query Form Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
          <div className="backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent mb-4">
                {language === 'mr' ? 'आमच्याशी संपर्क साधा' : language === 'hi' ? 'हमसे संपर्क करें' : 'Get In Touch'}
              </h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder={language === 'mr' ? 'नाव' : 'Name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border border-[#D4AF37]/30 text-[#F5F5DC] focus:border-[#D4AF37] focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder={language === 'mr' ? 'फोन' : 'Phone'}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border border-[#D4AF37]/30 text-[#F5F5DC] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border border-[#D4AF37]/30 text-[#F5F5DC] focus:border-[#D4AF37] focus:outline-none"
                />
                <textarea
                  rows={4}
                  placeholder={language === 'mr' ? 'संदेश...' : 'Message...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0A0A0A]/50 border border-[#D4AF37]/30 text-[#F5F5DC] focus:border-[#D4AF37] focus:outline-none resize-none"
                />
                <button onClick={handleSubmit} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#0A0A0A] font-bold text-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg">
                  <span>{language === 'mr' ? 'संदेश पाठवा' : 'Send Message'}</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
