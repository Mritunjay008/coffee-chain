import React, { useState } from 'react';
import { SANCTUARIES } from '../data/coffeeData';
import { MapPin, Clock, Phone, Users, Calendar, Check, ShieldCheck } from 'lucide-react';

export default function SanctuaryFinder({ onBookSanctuary }) {
  const [activeCity, setActiveCity] = useState('all');

  const cities = ['all', 'New Delhi', 'Bengaluru', 'Mumbai'];

  const filteredSanctuaries = SANCTUARIES.filter((s) => {
    return activeCity === 'all' || s.city === activeCity;
  });

  return (
    <section id="sanctuaries" style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            <MapPin size={12} color="#d4a359" style={{ marginRight: '0.4rem' }} />
            PHYSICAL AMBIANCE & SANCTUARIES
          </div>
          <h2 className="serif-font gold-gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700 }}>
            Sanctuary Finder &amp; Lounges
          </h2>
          <p style={{ color: '#a39992', maxWidth: '620px', margin: '0.8rem auto 0 auto' }}>
            Step into our architectural coffee havens. Featuring dim ambient amber lighting, brass extraction counters, vinyl acoustics, and private cupping pods.
          </p>
        </div>

        {/* City Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              style={{
                background: activeCity === city ? 'linear-gradient(135deg, #d4a359 0%, #b86b35 100%)' : 'rgba(255, 255, 255, 0.04)',
                color: activeCity === city ? '#0f0a08' : '#a39992',
                border: activeCity === city ? 'none' : '1px solid var(--border-gold)',
                padding: '0.6rem 1.4rem',
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-brand)',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {city === 'all' ? 'All Cities' : city}
            </button>
          ))}
        </div>

        {/* Store Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {filteredSanctuaries.map((store) => (
            <div 
              key={store.id}
              className="glass-panel"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Image & Occupancy Overlay */}
              <div style={{ position: 'relative', height: '230px' }}>
                <img 
                  src={store.image} 
                  alt={store.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                
                {/* Live Occupancy Pill */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(15, 10, 8, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #d4a359',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.72rem',
                  color: '#d4a359',
                  fontFamily: 'var(--font-brand)'
                }}>
                  <Users size={12} />
                  <span>{store.occupancy}</span>
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 10, 8, 0.85)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  color: '#55c783',
                  fontFamily: 'var(--font-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <Check size={12} />
                  <span>{store.status}</span>
                </div>
              </div>

              {/* Details */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                <h3 className="serif-font" style={{ fontSize: '1.35rem', color: '#f5efe6', marginBottom: '0.5rem' }}>
                  {store.name}
                </h3>

                <div style={{ fontSize: '0.85rem', color: '#a39992', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} color="#d4a359" />
                  <span>{store.address}</span>
                </div>

                {/* Features List */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {store.features.map((feat, idx) => (
                    <div key={idx} style={{ fontSize: '0.75rem', color: '#d4cbbd', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={12} color="#d4a359" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Hours & Phone */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '0.8rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  color: '#a39992',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} color="#d4a359" /> {store.hours}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={13} color="#d4a359" /> {store.phone}
                  </span>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onBookSanctuary(store)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
                >
                  <Calendar size={15} />
                  Reserve Salon Table or Tasting
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
