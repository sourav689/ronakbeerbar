import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Navigation } from './Navigation';
import { AdminLogin } from './AdminLogin';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const location = useLocation();
  
  // Don't show footer on Gallery page
  const showFooter = location.pathname !== '/gallery';

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navigation onAdminClick={() => setShowAdminLogin(true)} />
      <Outlet />
      {showFooter && <Footer />}
      <AdminLogin isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </div>
  );
};