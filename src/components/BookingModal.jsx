import React, { useState } from 'react';
import { X, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { SANCTUARIES } from '../data/coffeeData';

export default function BookingModal({ isOpen, onClose, selectedStore }) {
  const [location, setLocation] = useState(selectedStore?.name || SANCTUARIES[0].name);
  const [date, setDate] = useState('2026-08-14');
  const [timeSlot, setTimeSlot] = useState('16:00 (4:00 PM)');
  const [guests, setGuests] = useState(2);
  const [experience, setExperience] = useState('Private Tasting Salon');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleCloseAll = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 4000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{ maxWidth: '520px', width: '100%', padding: '2rem', position: 'relative' }}>
        
        <button 
          onClick={handleCloseAll}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#a39992', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {!confirmed ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <Calendar size={18} color="#d4a359" />
              <h3 className="serif-font gold-gradient-text" style={{ fontSize: '1.4rem' }}>
                Reserve Sanctuary Table
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#a39992', marginBottom: '1.5rem' }}>
              Reserve your seat at our sommelier bar or private tasting salon.
            </p>

            <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              
              <div>
                <label style={{ fontSize: '0.75rem', color: '#a39992', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                  Sanctuary Location
                </label>
                <select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: '10px',
                    padding: '0.7rem 1rem',
                    color: '#f5efe6',
                    outline: 'none'
                  }}
                >
                  {SANCTUARIES.map(s => (
                    <option key={s.id} value={s.name} style={{ background: '#120c0a', color: '#f5efe6' }}>
                      {s.name} ({s.city})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#a39992', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Date
                  </label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '10px',
                      padding: '0.7rem 0.8rem',
                      color: '#f5efe6',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#a39992', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Time Slot
                  </label>
                  <select 
                    value={timeSlot} 
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '10px',
                      padding: '0.7rem 0.8rem',
                      color: '#f5efe6',
                      outline: 'none'
                    }}
                  >
                    <option style={{ background: '#120c0a' }}>11:00 AM</option>
                    <option style={{ background: '#120c0a' }}>02:30 PM</option>
                    <option style={{ background: '#120c0a' }}>04:00 PM</option>
                    <option style={{ background: '#120c0a' }}>07:30 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#a39992', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Guests
                  </label>
                  <select 
                    value={guests} 
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '10px',
                      padding: '0.7rem 0.8rem',
                      color: '#f5efe6',
                      outline: 'none'
                    }}
                  >
                    {[1, 2, 3, 4, 6, 8].map(n => (
                      <option key={n} value={n} style={{ background: '#120c0a' }}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#a39992', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                    Seating Area
                  </label>
                  <select 
                    value={experience} 
                    onChange={(e) => setExperience(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '10px',
                      padding: '0.7rem 0.8rem',
                      color: '#f5efe6',
                      outline: 'none'
                    }}
                  >
                    <option style={{ background: '#120c0a' }}>Private Tasting Salon</option>
                    <option style={{ background: '#120c0a' }}>Vinyl Acoustics Lounge</option>
                    <option style={{ background: '#120c0a' }}>Copper Roaster Bar</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#a39992', display: 'block', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                  Guest Full Name &amp; Contact
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '10px',
                      padding: '0.7rem 0.8rem',
                      color: '#f5efe6',
                      outline: 'none'
                    }}
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    required 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid var(--border-gold)',
                      borderRadius: '10px',
                      padding: '0.7rem 0.8rem',
                      color: '#f5efe6',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                <Sparkles size={16} />
                <span>Confirm VIP Table Reservation</span>
              </button>

            </form>

          </div>
        ) : (
          /* Confirmation Pass */
          <div style={{ textAlign: 'center', padding: '1rem 0' }} className="animate-fade-in">
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(212, 163, 89, 0.2)', border: '2px solid #d4a359', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <CheckCircle size={30} color="#d4a359" />
            </div>

            <h3 className="serif-font gold-gradient-text" style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>
              Reservation Confirmed
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#d4a359', fontFamily: 'var(--font-brand)', marginBottom: '1.5rem' }}>
              PASS CODE: #TK-8808-VIP
            </p>

            <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px dashed var(--border-gold)', borderRadius: '12px', padding: '1.2rem', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#d4cbbd', lineHeight: 1.7 }}>
              <div><strong style={{ color: '#f5efe6' }}>Guest:</strong> {name || 'VIP Guest'}</div>
              <div><strong style={{ color: '#f5efe6' }}>Sanctuary:</strong> {location}</div>
              <div><strong style={{ color: '#f5efe6' }}>Date &amp; Time:</strong> {date} at {timeSlot}</div>
              <div><strong style={{ color: '#f5efe6' }}>Seating:</strong> {experience} ({guests} Guests)</div>
            </div>

            <button onClick={handleCloseAll} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
