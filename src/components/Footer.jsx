import React, { useState } from 'react';
import { Coffee, ShieldCheck, Mail, ArrowRight, Heart } from 'lucide-react';

export default function Footer({ setActiveTab, openBooking }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer style={{ background: '#0a0705', borderTop: '1px solid rgba(212, 163, 89, 0.2)', paddingTop: '5rem', paddingBottom: '3rem' }}>
      <div className="container">
        
        {/* Direct Trade Pledge Banner */}
        <div 
          className="glass-panel" 
          style={{
            padding: '2rem 2.5rem',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', maxWidth: '650px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212, 163, 89, 0.15)', border: '1px solid #d4a359', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={24} color="#d4a359" />
            </div>
            <div>
              <h4 className="brand-font" style={{ fontSize: '1.1rem', color: '#f5efe6', marginBottom: '0.2rem' }}>
                100% Direct Trade Ethical Sourcing Pledge
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#a39992', lineHeight: 1.5 }}>
                Every single micro-lot bean served at thakur.08 is sourced directly from independent estate farmers in Gesha, Huila, and Coorg at 3.5x fair trade rates.
              </p>
            </div>
          </div>

          <button onClick={openBooking} className="btn-secondary">
            <span>Visit A Sanctuary</span>
          </button>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4a359 0%, #b86b35 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coffee size={18} color="#0f0a08" />
              </div>
              <span className="brand-font" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f5efe6' }}>
                THAKUR<span style={{ color: '#d4a359' }}>.08</span>
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#a39992', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Ultra-luxury single-origin roastery &amp; sensory lounge. Redefining high-elevation coffee extractions.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#d4a359', fontFamily: 'var(--font-brand)' }}>
              NEW DELHI • BENGALURU • MUMBAI
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h5 className="brand-font" style={{ fontSize: '0.88rem', color: '#f5efe6', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Navigation
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.85rem', color: '#a39992' }}>
              {['Boutique Menu', 'Alchemist Studio', 'Palate Quiz', 'Sanctuary Finder', 'Reserve Guild'].map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => {
                      const tabId = item.toLowerCase().split(' ')[0];
                      setActiveTab(tabId);
                    }}
                    style={{ background: 'none', border: 'none', color: '#a39992', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Support */}
          <div>
            <h5 className="brand-font" style={{ fontSize: '0.88rem', color: '#f5efe6', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Sanctuary Hours
            </h5>
            <div style={{ fontSize: '0.82rem', color: '#a39992', lineHeight: 1.8 }}>
              <div>Mon - Fri: 06:30 AM - 11:30 PM</div>
              <div>Sat - Sun: 07:00 AM - 01:00 AM</div>
              <div style={{ marginTop: '0.6rem', color: '#d4a359' }}>Concierge: concierge@thakur08.coffee</div>
              <div>Phone: +91 11 8808 0808</div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h5 className="brand-font" style={{ fontSize: '0.88rem', color: '#f5efe6', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              The Guild Dispatch
            </h5>
            <p style={{ fontSize: '0.82rem', color: '#a39992', marginBottom: '1rem', lineHeight: 1.5 }}>
              Receive private invitations to micro-lot drops and sommelier cupping events.
            </p>

            <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '30px',
                  padding: '0.7rem 2.8rem 0.7rem 1rem',
                  color: '#f5efe6',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '4px',
                  bottom: '4px',
                  width: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #d4a359, #b86b35)',
                  border: 'none',
                  color: '#0f0a08',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ArrowRight size={14} />
              </button>
            </form>

            {subscribed && (
              <div style={{ fontSize: '0.75rem', color: '#d4a359', marginTop: '0.5rem' }}>
                ✓ Subscribed to Guild Dispatch!
              </div>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: '#a39992' }}>
          <div>
            &copy; 2026 <strong>thakur.08 Artisanal Coffee Chain</strong>. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Direct Trade Sourcing</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
