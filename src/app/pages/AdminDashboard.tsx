import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Edit, Plus, X } from 'lucide-react';

interface Booking {
  id: number;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  tableType: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
}

export function AdminDashboard() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'bookings' | 'menu'>('bookings');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      name: 'Rajesh Sharma',
      phone: '+91 98765 43210',
      guests: 4,
      date: '2026-03-10',
      time: '20:00',
      tableType: 'VIP Section'
    },
    {
      id: 2,
      name: 'Priya Patel',
      phone: '+91 87654 32109',
      guests: 2,
      date: '2026-03-11',
      time: '19:30',
      tableType: 'Rooftop'
    }
  ]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Golden Martini',
      description: 'Premium vodka with gold flakes',
      price: '₹850',
      category: 'Drinks'
    },
    {
      id: 2,
      name: 'Royal Whiskey',
      description: '18-year aged scotch',
      price: '₹1,200',
      category: 'Drinks'
    }
  ]);

  const deleteBooking = (id: number) => {
    setBookings(bookings.filter(b => b.id !== id));
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
            {t('dashboard')}
          </h1>
          <p className="text-[#F5F5DC]/80 text-lg">
            {language === 'mr' && 'व्यवस्थापन नियंत्रण केंद्र'}
            {language === 'hi' && 'प्रबंधन नियंत्रण केंद्र'}
            {language === 'en' && 'Management Control Center'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all duration-300 ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold'
                : 'backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[#F5F5DC] hover:border-[#D4AF37]'
            }`}
          >
            {t('bookings')}
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl transition-all duration-300 ${
              activeTab === 'menu'
                ? 'bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold'
                : 'backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[#F5F5DC] hover:border-[#D4AF37]'
            }`}
          >
            {t('menuItems')}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Add Booking
              </button>

              {bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-2xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-[#D4AF37] text-sm mb-1">{t('name')}</p>
                        <p className="text-[#F5F5DC] font-semibold">{booking.name}</p>
                      </div>
                      <div>
                        <p className="text-[#D4AF37] text-sm mb-1">{t('phone')}</p>
                        <p className="text-[#F5F5DC]">{booking.phone}</p>
                      </div>
                      <div>
                        <p className="text-[#D4AF37] text-sm mb-1">{t('date')} & {t('time')}</p>
                        <p className="text-[#F5F5DC]">{booking.date} {booking.time}</p>
                      </div>
                      <div>
                        <p className="text-[#D4AF37] text-sm mb-1">Table & {t('guests')}</p>
                        <p className="text-[#F5F5DC]">{booking.tableType} ({booking.guests})</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="p-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                Add Menu Item
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#F5F5DC] mb-1">{item.name}</h3>
                        <span className="text-sm text-[#D4AF37]">{item.category}</span>
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-[#F5F5DC]/80 text-sm mb-4">{item.description}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 rounded-lg border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMenuItem(item.id)}
                        className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Modal Placeholder */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-xl"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-3xl p-8 max-w-2xl w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent">
                    {activeTab === 'bookings' ? 'Add Booking' : 'Add Menu Item'}
                  </h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-full hover:bg-[#D4AF37]/10 transition-all duration-300"
                  >
                    <X className="w-6 h-6 text-[#D4AF37]" />
                  </button>
                </div>
                <p className="text-[#F5F5DC] text-center py-8">
                  Form implementation would go here
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};