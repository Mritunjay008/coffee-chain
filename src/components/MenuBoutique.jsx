import React, { useState } from 'react';
import { COFFEE_MENU } from '../data/coffeeData';
import { Coffee, Search, Plus, Eye, Award, Check } from 'lucide-react';

export default function MenuBoutique({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemModal, setSelectedItemModal] = useState(null);
  const [addedItemIds, setAddedItemIds] = useState({});

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'signature', label: 'Signature Espresso' },
    { id: 'cold-brew', label: 'Nitro Cold Brews' },
    { id: 'beans', label: 'Micro-Lot Beans' },
    { id: 'manual-brew', label: 'Manual Brews' },
    { id: 'savory', label: 'Artisanal Savories' }
  ];

  const filteredMenu = COFFEE_MENU.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.notes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item) => {
    onAddToCart(item);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section id="menu" style={{ padding: '6rem 0', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            <Coffee size={12} color="#d4a359" style={{ marginRight: '0.4rem' }} />
            CURATED SELECTION
          </div>
          <h2 className="serif-font gold-gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700 }}>
            Artisanal Boutique Menu
          </h2>
          <p style={{ color: '#a39992', maxWidth: '600px', margin: '0.8rem auto 0 auto' }}>
            Each beverage and micro-lot bean bag is single-origin certified, freshly roasted, and prepared by our master sommeliers.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.2rem', marginBottom: '2.5rem' }}>
          
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: activeCategory === cat.id ? 'linear-gradient(135deg, #d4a359 0%, #b86b35 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeCategory === cat.id ? '#0f0a08' : '#a39992',
                  border: activeCategory === cat.id ? 'none' : '1px solid var(--border-gold)',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '30px',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-brand)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} color="#a39992" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search notes, origins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-gold)',
                borderRadius: '30px',
                padding: '0.5rem 1rem 0.5rem 2.6rem',
                color: '#f5efe6',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
          </div>

        </div>

        {/* Menu Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredMenu.map((item) => {
            const isAdded = addedItemIds[item.id];
            return (
              <div 
                key={item.id}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                {/* Product Image Header */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(15, 10, 8, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '20px',
                    fontSize: '0.7rem',
                    color: '#d4a359',
                    fontFamily: 'var(--font-brand)'
                  }}>
                    {item.roast}
                  </div>

                  <button
                    onClick={() => setSelectedItemModal(item)}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(15, 10, 8, 0.7)',
                      border: '1px solid rgba(212, 163, 89, 0.3)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f5efe6',
                      cursor: 'pointer'
                    }}
                    title="View Origin Notes"
                  >
                    <Eye size={16} />
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  
                  <div style={{ fontSize: '0.75rem', color: '#a39992', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Award size={12} color="#d4a359" />
                    {item.origin}
                  </div>

                  <h3 className="serif-font" style={{ fontSize: '1.25rem', color: '#f5efe6', marginBottom: '0.6rem', fontWeight: 600 }}>
                    {item.name}
                  </h3>

                  <p style={{ fontSize: '0.85rem', color: '#a39992', marginBottom: '1.2rem', lineHeight: 1.5, flexGrow: 1 }}>
                    {item.description}
                  </p>

                  {/* Tasting Note Pills */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
                    {item.notes.map((note, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: 'rgba(212, 163, 89, 0.1)',
                          border: '1px solid rgba(212, 163, 89, 0.2)',
                          color: '#d4a359',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontSize: '0.7rem'
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Price & Add to Cart */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f5efe6', fontFamily: 'var(--font-brand)' }}>
                      ${item.price.toFixed(2)}
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className={isAdded ? 'btn-secondary' : 'btn-primary'}
                      style={{ padding: '0.6rem 1.1rem', fontSize: '0.78rem' }}
                    >
                      {isAdded ? (
                        <>
                          <Check size={14} color="#d4a359" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Origin Details Modal */}
      {selectedItemModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '540px', width: '100%', padding: '2rem', position: 'relative' }}>
            <button
              onClick={() => setSelectedItemModal(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                color: '#a39992',
                fontSize: '1.4rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <img 
              src={selectedItemModal.image} 
              alt={selectedItemModal.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.2rem' }} 
            />

            <h3 className="serif-font gold-gradient-text" style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>
              {selectedItemModal.name}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#d4a359', marginBottom: '1rem', fontFamily: 'var(--font-brand)' }}>
              {selectedItemModal.origin}
            </p>

            <p style={{ fontSize: '0.9rem', color: '#a39992', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedItemModal.description}
            </p>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem', background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#a39992' }}>Acidity</div>
                <div style={{ fontSize: '1rem', color: '#d4a359', fontWeight: 700 }}>{selectedItemModal.acidity} / 10</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#a39992' }}>Body</div>
                <div style={{ fontSize: '1rem', color: '#b86b35', fontWeight: 700 }}>{selectedItemModal.body} / 10</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#a39992' }}>Sweetness</div>
                <div style={{ fontSize: '1rem', color: '#f5efe6', fontWeight: 700 }}>{selectedItemModal.sweetness} / 10</div>
              </div>
            </div>

            <button 
              onClick={() => {
                handleAddToCart(selectedItemModal);
                setSelectedItemModal(null);
              }} 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Add to Order • ${selectedItemModal.price.toFixed(2)}
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
