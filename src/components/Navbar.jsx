import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, MapPin, Award, Sliders, Sparkles, Volume2, VolumeX, Calendar } from 'lucide-react';

export default function Navbar({ cartCount, openCart, openBooking, activeTab, setActiveTab, ambientPlaying, toggleAmbient }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        padding: scrolled ? '0.8rem 0' : '1.3rem 0',
        background: scrolled ? 'rgba(15, 10, 8, 0.92)' : 'rgba(15, 10, 8, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(212, 163, 89, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('hero')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4a359 0%, #b86b35 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(212, 163, 89, 0.4)'
          }}>
            <Coffee size={22} color="#0f0a08" />
          </div>
          <div>
            <span className="brand-font" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f5efe6', letterSpacing: '0.12em' }}>
              THAKUR<span style={{ color: '#d4a359' }}>.08</span>
            </span>
            <span style={{ display: 'block', fontSize: '0.62rem', letterSpacing: '0.25em', color: '#a39992', textTransform: 'uppercase' }}>
              Artisanal Coffee Sanctuary
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          {[
            { id: 'menu', label: 'Boutique Menu', icon: Coffee },
            { id: 'alchemist', label: 'Alchemist Studio', icon: Sliders },
            { id: 'quiz', label: 'Palate Quiz', icon: Sparkles },
            { id: 'sanctuaries', label: 'Sanctuaries', icon: MapPin },
            { id: 'reserve', label: 'Reserve Guild', icon: Award }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#d4a359' : '#a39992',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-brand)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  padding: '0.4rem 0.6rem',
                  transition: 'all 0.2s ease',
                  borderBottom: isActive ? '2px solid #d4a359' : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Icon size={14} color={isActive ? '#d4a359' : '#a39992'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* Ambient Sound Toggle */}
          <button
            onClick={toggleAmbient}
            title={ambientPlaying ? "Mute Ambient Coffee Shop Sound" : "Play Ambient Coffee Shop Sound"}
            style={{
              background: ambientPlaying ? 'rgba(212, 163, 89, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-gold)',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: ambientPlaying ? '#d4a359' : '#a39992',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {ambientPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Book Tasting Session Button */}
          <button 
            onClick={openBooking} 
            className="btn-secondary"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.75rem' }}
          >
            <Calendar size={14} />
            Reserve Lounge
          </button>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={openCart}
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(212, 163, 89, 0.15), rgba(184, 107, 53, 0.15))',
              border: '1px solid var(--border-gold)',
              borderRadius: '50px',
              padding: '0.6rem 1.1rem',
              color: '#f5efe6',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingBag size={16} color="#d4a359" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-brand)' }}>
              {cartCount}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}
