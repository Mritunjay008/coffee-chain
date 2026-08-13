import React, { useState } from 'react';
import { MEMBERSHIP_TIERS } from '../data/coffeeData';
import { Award, Crown, Gift, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';

export default function ReserveGuild() {
  const [userPoints, setUserPoints] = useState(740);
  const [grindType, setGrindType] = useState('Whole Bean');
  const [frequency, setFrequency] = useState('Bi-Weekly');
  const [quantity, setQuantity] = useState(2); // bags
  const [subSuccess, setSubSuccess] = useState(false);

  const currentTier = userPoints >= 1500 
    ? MEMBERSHIP_TIERS[2] 
    : userPoints >= 500 
      ? MEMBERSHIP_TIERS[1] 
      : MEMBERSHIP_TIERS[0];

  const handleSubscribe = () => {
    setSubSuccess(true);
    setTimeout(() => setSubSuccess(false), 4000);
  };

  return (
    <section id="reserve" style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            <Crown size={12} color="#d4a359" style={{ marginRight: '0.4rem' }} />
            EXCLUSIVE MEMBERSHIP &amp; RECURRING ROASTS
          </div>
          <h2 className="serif-font gold-gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700 }}>
            The Reserve Guild
          </h2>
          <p style={{ color: '#a39992', maxWidth: '620px', margin: '0.8rem auto 0 auto' }}>
            Unlock VIP tasting privileges, zero-friction automated roast deliveries, and private cupping salon access.
          </p>
        </div>

        {/* Member Card & Tier Progress */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(212, 163, 89, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            <div>
              <span style={{ fontSize: '0.75rem', color: '#a39992', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                CURRENT MEMBER STATUS
              </span>
              <h3 className="serif-font gold-gradient-text" style={{ fontSize: '2rem', marginTop: '0.2rem', marginBottom: '0.5rem' }}>
                {currentTier.name}
              </h3>
              <p style={{ color: '#d4cbbd', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                Member ID: <strong style={{ color: '#d4a359' }}>THAKUR-8808-VIP</strong>
              </p>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span className="badge-gold">
                  <Award size={12} color="#d4a359" style={{ marginRight: '0.3rem' }} />
                  {userPoints} Guild Points
                </span>
                <span style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#f5efe6', padding: '0.35rem 0.85rem', borderRadius: '30px', fontSize: '0.75rem', fontFamily: 'var(--font-brand)' }}>
                  Tier 2 of 3
                </span>
              </div>
            </div>

            {/* Progress Bar to Next Tier */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#a39992', marginBottom: '0.5rem' }}>
                <span>Next Tier: Thakur .08 Royal Reserve</span>
                <strong style={{ color: '#d4a359' }}>{1500 - userPoints} PTS Needed</strong>
              </div>

              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ height: '100%', width: `${(userPoints / 1500) * 100}%`, background: 'linear-gradient(90deg, #d4a359, #b86b35)', borderRadius: '4px' }} />
              </div>

              <div style={{ fontSize: '0.82rem', color: '#a39992', lineHeight: 1.6 }}>
                <strong style={{ color: '#f5efe6' }}>Tier Privileges Active:</strong> Free Nitro Refill per Visit, Priority Lounge Seating, 15% Bean Cashback, Masterclass Access.
              </div>
            </div>

          </div>

        </div>

        {/* Subscription Engine Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '2rem' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <RefreshCw size={20} color="#d4a359" />
              <h3 className="brand-font" style={{ fontSize: '1.2rem', color: '#f5efe6' }}>
                Automated Fresh Roast Subscription
              </h3>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#a39992', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Never run out of masterfully roasted single-origin micro-lots. Direct-from-roastery shipping within 24 hours of roasting.
            </p>

            {/* Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              <div>
                <label style={{ fontSize: '0.78rem', color: '#a39992', display: 'block', marginBottom: '0.4rem' }}>Grind Specification:</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['Whole Bean', 'Espresso Fine', 'Chemex Medium', 'French Press Coarse'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGrindType(g)}
                      style={{
                        background: grindType === g ? '#d4a359' : 'rgba(255, 255, 255, 0.04)',
                        color: grindType === g ? '#0f0a08' : '#a39992',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#a39992', display: 'block', marginBottom: '0.4rem' }}>Delivery Cadence:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['Weekly', 'Bi-Weekly', 'Monthly'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      style={{
                        flex: 1,
                        background: frequency === f ? '#d4a359' : 'rgba(255, 255, 255, 0.04)',
                        color: frequency === f ? '#0f0a08' : '#a39992',
                        border: 'none',
                        padding: '0.5rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#a39992', display: 'block', marginBottom: '0.4rem' }}>Quantity (250g Bags):</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#f5efe6', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}
                  >-</button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#d4a359', fontFamily: 'var(--font-brand)' }}>{quantity} Bags / Ship</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#f5efe6', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}
                  >+</button>
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                <Sparkles size={16} />
                <span>Start Subscription • ${(quantity * 28 * 0.85).toFixed(2)} / ship</span>
              </button>

              {subSuccess && (
                <div style={{
                  padding: '0.8rem',
                  background: 'rgba(212, 163, 89, 0.15)',
                  border: '1px solid #d4a359',
                  borderRadius: '10px',
                  color: '#d4a359',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={16} />
                  Roast Subscription Activated! 15% Guild Discount Applied.
                </div>
              )}

            </div>

          </div>

          {/* Membership Perks Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { title: 'Private Sommelier Concierge', desc: 'Direct WhatsApp/phone channel with our head roaster for custom blend requests.', icon: Crown },
              { title: 'Tasting Box Drops', desc: 'Receive complimentary 50g sample tins of unreleased Geisha and Panama micro-lots.', icon: Gift },
              { title: 'Priority Lounge Table Booking', desc: 'Skip public waitlists at New Delhi, Indiranagar & Bandra sanctuaries.', icon: Award }
            ].map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div key={idx} className="glass-panel" style={{ padding: '1.2rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(212, 163, 89, 0.12)', border: '1px solid #d4a359', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color="#d4a359" />
                  </div>
                  <div>
                    <h4 className="brand-font" style={{ fontSize: '0.9rem', color: '#f5efe6', marginBottom: '0.2rem' }}>
                      {perk.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#a39992', lineHeight: 1.5 }}>
                      {perk.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
