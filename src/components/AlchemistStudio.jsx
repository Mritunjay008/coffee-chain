import React, { useState } from 'react';
import { Sliders, Sparkles, Coffee, Flame, Droplets, CheckCircle, Plus } from 'lucide-react';

const ORIGINS = [
  { id: 'ethiopian', name: 'Ethiopian Gesha Village', elevation: '1,950m', basePrice: 14.0, notes: 'Floral, Jasmine, Bergamot', acidityMod: 3, bodyMod: 0, sweetnessMod: 2 },
  { id: 'colombian', name: 'Colombia Supremo Amber', elevation: '1,600m', basePrice: 12.5, notes: 'Roasted Almond, Fig', acidityMod: 1, bodyMod: 2, sweetnessMod: 1 },
  { id: 'coorg', name: 'Coorg Estate Micro-Lot', elevation: '1,400m', basePrice: 11.5, notes: 'Smoked Dark Cocoa', acidityMod: -1, bodyMod: 3, sweetnessMod: 1 },
  { id: 'panama', name: 'Panama Esmeralda Special', elevation: '2,100m', basePrice: 18.0, notes: 'Peach Nectar, Citric Sparkle', acidityMod: 4, bodyMod: -1, sweetnessMod: 3 }
];

const METHODS = [
  { id: 'espresso', name: 'Double Espresso (9-Bar)', icon: Flame, extra: 0, time: '45 sec' },
  { id: 'cold-drip', name: '24-Hr Japanese Cold Drip', icon: Droplets, extra: 2.5, time: '24 hours' },
  { id: 'syphon', name: 'Table-side Glass Syphon', icon: Coffee, extra: 3.5, time: '6 mins' },
  { id: 'chemex', name: 'Chemex Velvet Filter', icon: Sliders, extra: 1.5, time: '4 mins' }
];

const MILKS = [
  { id: 'none', name: 'None (Pure Extraction)', extra: 0 },
  { id: 'oat', name: 'Oat Milk Silk', extra: 1.0 },
  { id: 'almond', name: 'Almond Cream', extra: 1.0 },
  { id: 'dairy', name: 'Whole Dairy Velvet', extra: 0.5 }
];

const INFUSIONS = [
  { id: 'none', name: 'Pure Coffee Only', extra: 0 },
  { id: 'saffron', name: 'Kashmiri Saffron & Gold Leaf', extra: 3.0 },
  { id: 'vanilla', name: 'Madagascar Vanilla Bean', extra: 1.5 },
  { id: 'cinnamon', name: 'Ceylon Cinnamon & Honey Drizzle', extra: 1.5 }
];

export default function AlchemistStudio({ onAddToCart }) {
  const [selectedOrigin, setSelectedOrigin] = useState(ORIGINS[0]);
  const [selectedMethod, setSelectedMethod] = useState(METHODS[0]);
  const [selectedMilk, setSelectedMilk] = useState(MILKS[0]);
  const [selectedInfusion, setSelectedInfusion] = useState(INFUSIONS[0]);
  const [roastLevel, setRoastLevel] = useState(2); // 1 to 4
  const [sweetnessPumps, setSweetnessPumps] = useState(1);
  const [customName, setCustomName] = useState('My Custom Masterpiece');
  const [addedToast, setAddedToast] = useState(false);

  // Compute calculated metrics
  const calculatedPrice = (
    selectedOrigin.basePrice +
    selectedMethod.extra +
    selectedMilk.extra +
    selectedInfusion.extra
  ).toFixed(2);

  const acidityScore = Math.min(10, Math.max(1, 6 + selectedOrigin.acidityMod - (roastLevel * 1)));
  const bodyScore = Math.min(10, Math.max(1, 4 + selectedOrigin.bodyMod + (roastLevel * 1.5) + (selectedMilk.id !== 'none' ? 2 : 0)));
  const sweetnessScore = Math.min(10, Math.max(1, 5 + selectedOrigin.sweetnessMod + sweetnessPumps));
  const aromaticScore = Math.min(10, Math.max(1, 7 + (selectedInfusion.id !== 'none' ? 2 : 0)));

  const handleAddCustomToCart = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      name: customName || `${selectedOrigin.name.split(' ')[0]} ${selectedMethod.name}`,
      price: parseFloat(calculatedPrice),
      notes: [selectedOrigin.notes, selectedMethod.name, selectedInfusion.name !== 'Pure Coffee Only' ? selectedInfusion.name : null].filter(Boolean),
      image: '/images/hero.jpg',
      isCustom: true,
      customDetails: {
        origin: selectedOrigin.name,
        method: selectedMethod.name,
        milk: selectedMilk.name,
        infusion: selectedInfusion.name,
        roast: `Roast Level ${roastLevel}/4`,
        sweetness: `${sweetnessPumps} pumps`
      }
    };

    onAddToCart(customItem);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <section id="alchemist" style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            <Sliders size={12} color="#d4a359" style={{ marginRight: '0.4rem' }} />
            BESPOKE DRINK CUSTOMIZER
          </div>
          <h2 className="serif-font gold-gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700 }}>
            The Alchemist Extraction Studio
          </h2>
          <p style={{ color: '#a39992', maxWidth: '650px', margin: '0.8rem auto 0 auto', fontSize: '1rem' }}>
            Hand-select single-origin elevations, pressure extraction methods, milk silkiness, and sensory infusions. Craft your bespoke brew profile in real time.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left Column: Interactive Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Step 1: Base Origin */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="brand-font" style={{ fontSize: '0.9rem', color: '#d4a359', textTransform: 'uppercase' }}>
                  1. Micro-Lot Bean Origin
                </span>
                <span style={{ fontSize: '0.75rem', color: '#a39992' }}>{selectedOrigin.elevation}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {ORIGINS.map((orig) => (
                  <button
                    key={orig.id}
                    onClick={() => setSelectedOrigin(orig)}
                    style={{
                      background: selectedOrigin.id === orig.id ? 'rgba(212, 163, 89, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: selectedOrigin.id === orig.id ? '1px solid #d4a359' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '0.8rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: selectedOrigin.id === orig.id ? '#ffffff' : '#a39992',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: selectedOrigin.id === orig.id ? '#d4a359' : '#f5efe6' }}>
                      {orig.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', marginTop: '0.3rem', color: '#a39992' }}>
                      {orig.notes}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Extraction Method */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <span className="brand-font" style={{ fontSize: '0.9rem', color: '#d4a359', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                2. Extraction Apparatus & Technique
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                {METHODS.map((meth) => {
                  const Icon = meth.icon;
                  return (
                    <button
                      key={meth.id}
                      onClick={() => setSelectedMethod(meth)}
                      style={{
                        background: selectedMethod.id === meth.id ? 'rgba(212, 163, 89, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                        border: selectedMethod.id === meth.id ? '1px solid #d4a359' : '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        padding: '0.8rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        color: selectedMethod.id === meth.id ? '#ffffff' : '#a39992',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icon size={18} color={selectedMethod.id === meth.id ? '#d4a359' : '#a39992'} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f5efe6' }}>{meth.name}</div>
                        <div style={{ fontSize: '0.68rem', color: '#a39992' }}>+{meth.extra > 0 ? `$${meth.extra.toFixed(2)}` : 'Included'}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Roast & Milk & Infusions */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <span className="brand-font" style={{ fontSize: '0.9rem', color: '#d4a359', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                3. Roast Level & Milk Texture
              </span>
              
              {/* Roast Slider */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <span>Roast Profile Level:</span>
                  <strong style={{ color: '#d4a359' }}>
                    {roastLevel === 1 ? 'Light Floral (Cinnamon)' : roastLevel === 2 ? 'Medium Honey' : roastLevel === 3 ? 'Dark Velvet Cocoa' : 'Italian Smoked'}
                  </strong>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="4" 
                  value={roastLevel} 
                  onChange={(e) => setRoastLevel(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }} 
                />
              </div>

              {/* Milk Choice */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#a39992', display: 'block', marginBottom: '0.5rem' }}>Milk Texture:</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {MILKS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMilk(m)}
                      style={{
                        background: selectedMilk.id === m.id ? '#d4a359' : 'rgba(255, 255, 255, 0.05)',
                        color: selectedMilk.id === m.id ? '#0f0a08' : '#a39992',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Infusion Choice */}
              <div>
                <label style={{ fontSize: '0.8rem', color: '#a39992', display: 'block', marginBottom: '0.5rem' }}>Aromatic Infusion:</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {INFUSIONS.map((inf) => (
                    <button
                      key={inf.id}
                      onClick={() => setSelectedInfusion(inf)}
                      style={{
                        background: selectedInfusion.id === inf.id ? '#d4a359' : 'rgba(255, 255, 255, 0.05)',
                        color: selectedInfusion.id === inf.id ? '#0f0a08' : '#a39992',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {inf.name} {inf.extra > 0 && `(+$${inf.extra.toFixed(2)})`}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live Flavor Matrix Radar & Preview Card */}
          <div className="glass-panel" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 163, 89, 0.2)', paddingBottom: '1rem' }}>
              <div>
                <span className="brand-font" style={{ fontSize: '1.2rem', color: '#f5efe6', display: 'block' }}>
                  Live Flavor Radar
                </span>
                <span style={{ fontSize: '0.75rem', color: '#a39992' }}>Calculated Extraction Matrix</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d4a359', fontFamily: 'var(--font-brand)' }}>
                ${calculatedPrice}
              </div>
            </div>

            {/* Flavor Metrics Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Acidity & Brightness', score: acidityScore, color: '#e69d45' },
                { label: 'Body & Mouthfeel', score: bodyScore, color: '#b86b35' },
                { label: 'Natural Sweetness', score: sweetnessScore, color: '#d4a359' },
                { label: 'Aromatic Complexity', score: aromaticScore, color: '#f5efe6' }
              ].map((metric, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                    <span style={{ color: '#d4cbbd' }}>{metric.label}</span>
                    <span style={{ color: metric.color, fontWeight: 700 }}>{metric.score} / 10</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{
                        height: '100%',
                        width: `${metric.score * 10}%`,
                        background: metric.color,
                        borderRadius: '3px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Drink Naming Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.75rem', color: '#a39992', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Name Your Bespoke Brew
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Amber Geisha Silk"
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '10px',
                  padding: '0.7rem 1rem',
                  color: '#f5efe6',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Summary Specification Box */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '12px',
              padding: '1rem',
              fontSize: '0.8rem',
              color: '#a39992',
              marginBottom: '1.5rem',
              lineHeight: 1.6
            }}>
              <div><strong style={{ color: '#f5efe6' }}>Origin:</strong> {selectedOrigin.name} ({selectedOrigin.elevation})</div>
              <div><strong style={{ color: '#f5efe6' }}>Extraction:</strong> {selectedMethod.name}</div>
              <div><strong style={{ color: '#f5efe6' }}>Milk &amp; Infusion:</strong> {selectedMilk.name}, {selectedInfusion.name}</div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddCustomToCart}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
            >
              <Plus size={18} />
              <span>Add Bespoke Brew to Order • ${calculatedPrice}</span>
            </button>

            {addedToast && (
              <div className="animate-fade-in" style={{
                marginTop: '1rem',
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
                Bespoke brew added to your cart!
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
