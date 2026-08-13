import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RotateCcw, Coffee } from 'lucide-react';
import { COFFEE_MENU } from '../data/coffeeData';

const QUESTIONS = [
  {
    id: 1,
    title: 'What aroma profile delights your senses first thing in the morning?',
    options: [
      { label: 'Jasmine, Orange Blossom & Citrus Floral', noteMatch: 'Jasmine', recId: 'thakur-01' },
      { label: 'Smoked Dark Cocoa, Oak & Roasted Nuts', noteMatch: 'Dark Cocoa', recId: 'thakur-02' },
      { label: 'Kashmiri Saffron, Cardamom & Warm Honey', noteMatch: 'Kashmiri Saffron', recId: 'thakur-04' },
      { label: 'Peach Nectar & Citric Sparkle', noteMatch: 'Peach Nectar', recId: 'thakur-05' }
    ]
  },
  {
    id: 2,
    title: 'How do you prefer your extraction velocity and temperature?',
    options: [
      { label: 'Sub-Zero Nitrogen Steeped (24-Hour Cold Drip)' },
      { label: 'High-Pressure Double Espresso (45 Seconds)' },
      { label: 'Table-Side Slow Vacuum Glass Syphon' },
      { label: 'Chemex Paper Filtered Clean Pour-Over' }
    ]
  },
  {
    id: 3,
    title: 'What level of milk silkiness matches your palate?',
    options: [
      { label: 'Pure Black Extraction (No Dairy)' },
      { label: 'Silky Steam Oat Milk' },
      { label: 'Velvet Almond Cream' },
      { label: 'Kashmiri Saffron Gold Foam' }
    ]
  }
];

export default function PalateQuiz({ onAddToCart }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);

  const handleSelectOption = (qId, option) => {
    const updated = { ...answers, [qId]: option };
    setAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate recommendation based on first answer
      const recId = updated[1]?.recId || 'thakur-01';
      const item = COFFEE_MENU.find(m => m.id === recId) || COFFEE_MENU[0];
      setRecommendation(item);
      setStep(QUESTIONS.length);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <section id="quiz" style={{ padding: '6rem 0', background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge-gold" style={{ marginBottom: '0.8rem' }}>
            <Sparkles size={12} color="#d4a359" style={{ marginRight: '0.4rem' }} />
            AI PALATE DISCOVERY
          </div>
          <h2 className="serif-font gold-gradient-text" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
            Palate Sensory Matrix
          </h2>
          <p style={{ color: '#a39992', marginTop: '0.6rem' }}>
            Answer 3 quick sensory questions to discover your single-origin coffee match.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          
          {step < QUESTIONS.length ? (
            <div>
              {/* Progress Dots */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', justifyContent: 'center' }}>
                {QUESTIONS.map((q, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      height: '4px',
                      flex: 1,
                      maxWidth: '80px',
                      borderRadius: '2px',
                      background: idx <= step ? '#d4a359' : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>

              <span style={{ fontSize: '0.8rem', color: '#d4a359', fontFamily: 'var(--font-brand)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Question {step + 1} of 3
              </span>

              <h3 className="serif-font" style={{ fontSize: '1.4rem', color: '#f5efe6', marginTop: '0.4rem', marginBottom: '2rem' }}>
                {QUESTIONS[step].title}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {QUESTIONS[step].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(QUESTIONS[step].id, opt)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(212, 163, 89, 0.2)',
                      borderRadius: '12px',
                      padding: '1.2rem 1.5rem',
                      textAlign: 'left',
                      color: '#f5efe6',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{opt.label}</span>
                    <ArrowRight size={16} color="#d4a359" />
                  </button>
                ))}
              </div>

            </div>
          ) : (
            /* Recommendation Result View */
            <div style={{ textAlign: 'center' }} className="animate-fade-in">
              <div className="badge-gold" style={{ marginBottom: '1rem' }}>
                <Check size={12} color="#d4a359" style={{ marginRight: '0.4rem' }} />
                PERFECT MATCH CALCULATED
              </div>

              <h3 className="serif-font gold-gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {recommendation.name}
              </h3>

              <p style={{ fontSize: '0.85rem', color: '#d4a359', fontFamily: 'var(--font-brand)', marginBottom: '1.5rem' }}>
                {recommendation.origin}
              </p>

              <img 
                src={recommendation.image} 
                alt={recommendation.name} 
                style={{ width: '100%', maxHeight: '240px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }} 
              />

              <p style={{ color: '#a39992', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {recommendation.description}
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => onAddToCart(recommendation)} 
                  className="btn-primary"
                >
                  <Coffee size={16} />
                  Order Your Palate Match • ${recommendation.price.toFixed(2)}
                </button>

                <button 
                  onClick={handleReset} 
                  className="btn-secondary"
                >
                  <RotateCcw size={16} />
                  Retake Quiz
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
