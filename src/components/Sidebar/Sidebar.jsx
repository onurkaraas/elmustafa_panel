import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const COLORS = {
  primary: '#004d40', // Teal green
  secondary: '#d4c19c', // Beige
  darkPrimary: '#002420', // Darker teal
  text: '#333333',
  textLight: '#666666',
  border: '#eeeeee',
  white: '#ffffff',
  black: '#000000',
};

function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = path => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FiMenu />
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <div className="logo-container">
            <img src="/logo.png" alt="El Mustafa TV" />
          </div>
          <nav className="sidebar-nav">
            <Link to="/" className={isActive('/')}>
              Kontrol Paneli
            </Link>
            <Link to="/live-streams" className={isActive('/live-streams')}>
              Canlı Yayınlar
            </Link>
            <Link to="/content-library" className={isActive('/content-library')}>
              İçerik Kütüphanesi
            </Link>
            {/* <Link to="/analytics" className={isActive('/analytics')}>
              Analitik
            </Link> */}
            <Link to="/settings" className={isActive('/settings')}>
              Ayarlar
            </Link>
          </nav>
        </div>
        <button onClick={handleSignOut} className="sign-out-btn">
          <FiLogOut className="sign-out-icon" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
