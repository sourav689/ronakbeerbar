import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { X, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check (in production, this would be properly secured)
    if (password === 'admin123') {
      navigate('/admin');
      onClose();
      setPassword('');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="backdrop-blur-[25px] border-2 border-[#D4AF37] bg-[var(--glass-bg)] rounded-3xl p-8 md:p-12 max-w-md w-full relative overflow-hidden"
      >
        {/* Gold glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/20 via-[#FCEABB]/20 to-[#D4AF37]/20 blur-xl" />
        
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 rounded-full backdrop-blur-[25px] border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] flex items-center justify-center">
              <Lock className="w-10 h-10 text-[#0A0A0A]" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] bg-clip-text text-transparent mb-2">
              {t('admin')} {t('login')}
            </h2>
            <p className="text-[#F5F5DC]/60 text-sm">
              Enter password to access admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[#D4AF37] text-sm font-semibold mb-2 block">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-6 py-4 bg-white/5 border border-[#D4AF37]/30 rounded-2xl text-[#F5F5DC] focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
                placeholder="Enter admin password"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
              <p className="text-[#F5F5DC]/40 text-xs mt-2">
                Demo password: admin123
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#B8860B] via-[#FCEABB] to-[#D4AF37] text-[#0A0A0A] font-bold text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300"
            >
              {t('login')}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
