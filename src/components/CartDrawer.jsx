import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShoppingBag, X, Trash2, Plus, Minus, CheckCircle, ArrowRight, Award, Clock } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Cart list, 1: Processing, 2: Confirmed

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + tax;
  const pointsEarned = Math.floor(grandTotal * 10);

  const handleCheckout = () => {
    setCheckoutStep(1);
    setTimeout(() => {
      setCheckoutStep(2);
      // Fire gold celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4a359', '#b86b35', '#f5efe6']
      });
    }, 2000);
  };

  const handleResetCheckout = () => {
    onClearCart();
    setCheckoutStep(0);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 3000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#120c0a',
          borderLeft: '1px solid var(--border-gold)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-dark)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212, 163, 89, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="#d4a359" />
            <h3 className="brand-font" style={{ fontSize: '1.1rem', color: '#f5efe6' }}>
              Your Extraction Order
            </h3>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', color: '#a39992', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
          
          {checkoutStep === 0 && (
            <>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#a39992' }}>
                  <ShoppingBag size={48} color="rgba(212, 163, 89, 0.3)" style={{ marginBottom: '1rem' }} />
                  <p className="serif-font" style={{ fontSize: '1.2rem', color: '#f5efe6', marginBottom: '0.5rem' }}>
                    Your Order Vault is Empty
                  </p>
                  <p style={{ fontSize: '0.85rem' }}>
                    Explore our Boutique Menu or craft a custom brew in the Alchemist Studio.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(212, 163, 89, 0.15)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center'
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} 
                      />

                      <div style={{ flexGrow: 1 }}>
                        <h4 className="serif-font" style={{ fontSize: '0.95rem', color: '#f5efe6' }}>
                          {item.name}
                        </h4>
                        
                        {item.customDetails ? (
                          <div style={{ fontSize: '0.7rem', color: '#d4a359', marginTop: '0.2rem' }}>
                            {item.customDetails.origin} • {item.customDetails.method}
                          </div>
                        ) : (
                          <div style={{ fontSize: '0.7rem', color: '#a39992', marginTop: '0.2rem' }}>
                            {item.notes?.slice(0, 2).join(', ')}
                          </div>
                        )}

                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f5efe6', marginTop: '0.4rem', fontFamily: 'var(--font-brand)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0, 0, 0, 0.4)', padding: '0.2rem 0.5rem', borderRadius: '20px' }}>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            style={{ background: 'none', border: 'none', color: '#f5efe6', cursor: 'pointer' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#d4a359' }}>{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', color: '#f5efe6', cursor: 'pointer' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          style={{ background: 'none', border: 'none', color: '#e05353', cursor: 'pointer', marginTop: '0.2rem' }}
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 1 && (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <Clock size={48} color="#d4a359" style={{ animation: 'spin 2s linear infinite', marginBottom: '1.5rem' }} />
              <h3 className="serif-font gold-gradient-text" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                Transmitting Extraction Order...
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#a39992' }}>
                Connecting to thakur.08 Sommelier Roastery Bar...
              </p>
            </div>
          )}

          {checkoutStep === 2 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }} className="animate-fade-in">
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212, 163, 89, 0.2)', border: '2px solid #d4a359', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem auto' }}>
                <CheckCircle size={32} color="#d4a359" />
              </div>

              <h3 className="serif-font gold-gradient-text" style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>
                Order Confirmed!
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#d4a359', fontFamily: 'var(--font-brand)', marginBottom: '1.5rem' }}>
                Vault Ticket: #THAKUR-9948
              </p>

              {/* Status Timeline */}
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '12px', padding: '1.2rem', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.8rem' }}>
                <div style={{ color: '#55c783', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle size={14} /> Step 1: Order Transmitted to Barista
                </div>
                <div style={{ color: '#d4a359', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} /> Step 2: Single-Origin Extraction in Progress
                </div>
                <div style={{ color: '#a39992', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShoppingBag size={14} /> Step 3: Sealed in Thermal Glass Vault
                </div>
              </div>

              <div className="badge-gold" style={{ marginBottom: '1.5rem' }}>
                <Award size={12} color="#d4a359" style={{ marginRight: '0.3rem' }} />
                +{pointsEarned} Reserve Guild Points Earned
              </div>

              <button onClick={handleResetCheckout} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Done
              </button>
            </div>
          )}

        </div>

        {/* Footer Summary */}
        {checkoutStep === 0 && cartItems.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(212, 163, 89, 0.2)', background: 'rgba(0, 0, 0, 0.5)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#a39992', marginBottom: '0.4rem' }}>
              <span>Subtotal:</span>
              <span style={{ color: '#f5efe6' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#a39992', marginBottom: '0.4rem' }}>
              <span>Artisanal Tax (5%):</span>
              <span style={{ color: '#f5efe6' }}>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: '#d4a359', margin: '0.8rem 0', fontFamily: 'var(--font-brand)' }}>
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <div style={{ fontSize: '0.72rem', color: '#a39992', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={12} color="#d4a359" /> You will earn +{pointsEarned} Reserve Guild points with this order.
            </div>

            <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
              <span>Transmit Order • ${grandTotal.toFixed(2)}</span>
              <ArrowRight size={16} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
