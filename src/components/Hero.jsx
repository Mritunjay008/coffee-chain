import React from 'react';
import { ArrowRight, Sparkles, Award, ShieldCheck, Flame } from 'lucide-react';

export default function Hero({ onExploreCustomizer, onBookTasting, onExploreMenu }) {
  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        backgroundImage: 'linear-gradient(to bottom, rgba(15, 10, 8, 0.65), rgba(15, 10, 8, 0.95)), url("/images/hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Overlay Glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(212, 163, 89, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        
        {/* Brand Pill Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }} className="badge-gold">
          <Sparkles size={13} color="#d4a359" />
          <span>MICRO-BATCH SINGLE ORIGIN RESERVE</span>
        </div>

        {/* Headline */}
        <h1 
          className="serif-font gold-gradient-text"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '1.2rem',
            letterSpacing: '-0.02em',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)'
          }}
        >
          Beyond Coffee.<br />
          An Alchemy of Senses.
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: '720px',
          margin: '0 auto 2.5rem auto',
          fontSize: '1.1rem',
          color: '#d4cbbd',
          fontWeight: 300,
          lineHeight: 1.7
        }}>
          Welcome to <strong style={{ color: '#d4a359', fontWeight: 600 }}>thakur.08</strong>. We craft ultra-exclusive micro-lot harvests extracted at 1,950m elevation. Experience custom roast profiling, Japanese syphon extractions, and sub-zero nitrogen brews served in bespoke crystalware.
        </p>

        {/* Hero CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button onClick={onExploreCustomizer} className="btn-primary">
            <span>Alchemist Extraction Studio</span>
            <ArrowRight size={16} />
          </button>
          <button onClick={onBookTasting} className="btn-secondary">
            <span>Book VIP Tasting Salon</span>
          </button>
          <button onClick={onExploreMenu} className="btn-secondary" style={{ borderStyle: 'dashed' }}>
            <span>Explore Boutique Menu</span>
          </button>
        </div>

        {/* Key Luxury Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.2rem',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          {[
            { label: 'Single Origin Elevation', value: '1,950 meters', icon: Award },
            { label: 'Japanese Cold Drip', value: '24 Hour Steep', icon: Sparkles },
            { label: 'Micro-Batch Roast', value: 'Hand-Drumed Daily', icon: Flame },
            { label: 'Ethical Sourcing', value: '100% Direct Trade', icon: ShieldCheck }
          ].map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.2rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  textAlign: 'left',
                  transition: 'transform 0.3s ease',
                  cursor: 'default'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(212, 163, 89, 0.12)',
                  border: '1px solid rgba(212, 163, 89, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Icon size={18} color="#d4a359" />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#a39992', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {metric.label}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f5efe6', fontFamily: 'var(--font-brand)' }}>
                    {metric.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
