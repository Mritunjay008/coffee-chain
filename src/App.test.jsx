import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('thakur.08 Luxury Coffee Chain Application', () => {
  it('renders brand identity THAKUR.08 in header', () => {
    render(<App />);
    const brandElements = screen.getAllByText(/THAKUR/i);
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('renders hero headline correctly', () => {
    render(<App />);
    expect(screen.getByText(/Beyond Coffee/i)).toBeInTheDocument();
  });

  it('renders Alchemist Extraction Studio customizer', () => {
    render(<App />);
    expect(screen.getByText(/The Alchemist Extraction Studio/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Flavor Radar/i)).toBeInTheDocument();
  });

  it('renders Artisanal Boutique Menu section', () => {
    render(<App />);
    expect(screen.getByText(/Artisanal Boutique Menu/i)).toBeInTheDocument();
    expect(screen.getByText(/Ethiopian Geisha Gold/i)).toBeInTheDocument();
  });

  it('renders Palate Sensory Matrix quiz', () => {
    render(<App />);
    expect(screen.getByText(/Palate Sensory Matrix/i)).toBeInTheDocument();
  });

  it('renders Sanctuary Lounges section', () => {
    render(<App />);
    expect(screen.getByText(/Sanctuary Finder & Lounges/i)).toBeInTheDocument();
  });
});
