import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuBoutique from './components/MenuBoutique';
import AlchemistStudio from './components/AlchemistStudio';
import PalateQuiz from './components/PalateQuiz';
import SanctuaryFinder from './components/SanctuaryFinder';
import ReserveGuild from './components/ReserveGuild';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBookingStore, setSelectedBookingStore] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Booking Modal Handlers
  const handleOpenBooking = (store = null) => {
    setSelectedBookingStore(store);
    setIsBookingOpen(true);
  };

  // Ambient Audio Generator using Web Audio API
  const toggleAmbientAudio = () => {
    if (!ambientPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Create pink noise buffer for rain/coffee shop ambient atmosphere
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.03; // Gentle volume
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Filter for warm lounge acoustics
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;
        gainNodeRef.current = gainNode;
        setAmbientPlaying(true);
      } catch (e) {
        console.log("Audio not allowed without gesture", e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setAmbientPlaying(false);
    }
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--accent-cream)' }}>
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        openCart={() => setIsCartOpen(true)}
        openBooking={() => handleOpenBooking()}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ambientPlaying={ambientPlaying}
        toggleAmbient={toggleAmbientAudio}
      />

      {/* Main Sections */}
      <main>
        <Hero
          onExploreCustomizer={() => {
            setActiveTab('alchemist');
            document.getElementById('alchemist')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onBookTasting={() => handleOpenBooking()}
          onExploreMenu={() => {
            setActiveTab('menu');
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <AlchemistStudio onAddToCart={handleAddToCart} />

        <MenuBoutique onAddToCart={handleAddToCart} />

        <PalateQuiz onAddToCart={handleAddToCart} />

        <SanctuaryFinder onBookSanctuary={handleOpenBooking} />

        <ReserveGuild />
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openBooking={() => handleOpenBooking()}
      />

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* VIP Lounge Table Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedStore={selectedBookingStore}
      />

    </div>
  );
}
