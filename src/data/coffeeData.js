export const COFFEE_MENU = [
  {
    id: "thakur-01",
    name: "Ethiopian Geisha Gold",
    category: "signature",
    price: 14.50,
    roast: "Light-Medium Floral",
    origin: "Gesha Village, Ethiopia (1,950m elevation)",
    notes: ["Jasmine", "Bergamot", "Golden Honey"],
    acidity: 9,
    body: 6,
    sweetness: 9,
    caffeine: "Medium",
    image: "/images/hero.jpg",
    description: "Hand-picked Geisha variety brewed slow with crystal cold drip extraction. Notes of orange blossom and velvet honey finish."
  },
  {
    id: "thakur-02",
    name: "Velvet Obsidian Nitro Cold Brew",
    category: "cold-brew",
    price: 12.00,
    roast: "Dark French Velvet",
    origin: "Coorg Micro-Lot, Western Ghats India",
    notes: ["Dark Cocoa", "Smoked Oak", "Vanilla Silk"],
    acidity: 4,
    body: 10,
    sweetness: 7,
    caffeine: "High",
    image: "/images/cold_drip.jpg",
    description: "Steeped for 24 hours under sub-zero nitrogen pressure. Cascading velvet foam head with zero bitterness."
  },
  {
    id: "thakur-03",
    name: "Colombia Supremo Amber Reserve",
    category: "beans",
    price: 32.00,
    roast: "Medium Honey Roast",
    origin: "Huila Region, Colombia",
    notes: ["Roasted Almond", "Caramelized Fig", "Dark Chocolate"],
    acidity: 7,
    body: 8,
    sweetness: 8,
    caffeine: "Medium",
    image: "/images/beans.jpg",
    description: "250g Whole Bean bag of single-estate micro-lot roasted fresh daily in our signature brass drum roasters."
  },
  {
    id: "thakur-04",
    name: "Golden Saffron Cardamom Cortado",
    category: "signature",
    price: 11.50,
    roast: "Medium Italian Roast",
    origin: "Wayanad Robusta & Chikmagalur Arabica Blend",
    notes: ["Kashmiri Saffron", "Green Cardamom", "Steamed Oat Silk"],
    acidity: 5,
    body: 9,
    sweetness: 8,
    caffeine: "High",
    image: "/images/hero.jpg",
    description: "Infused with organic Kashmiri saffron threads and stone-ground cardamom, served with a gold leaf shimmer."
  },
  {
    id: "thakur-05",
    name: "Japanese Syphon Chemex Pour-Over",
    category: "manual-brew",
    price: 15.00,
    roast: "Light Cinnamon",
    origin: "Panama Esmeralda Special",
    notes: ["Peach Nectar", "White Tea", "Citric Sparkle"],
    acidity: 10,
    body: 5,
    sweetness: 9,
    caffeine: "Medium",
    image: "/images/cold_drip.jpg",
    description: "Vacuum extraction using Japanese glass syphon right at your table for unparalleled purity and aromatic clarity."
  },
  {
    id: "thakur-06",
    name: "Artisanal Smoked Dark Truffle Pastry",
    category: "savory",
    price: 9.50,
    roast: "N/A",
    origin: "In-House Bakery",
    notes: ["Valrhona 70% Chocolate", "Truffle Butter", "Gold Dust"],
    acidity: 2,
    body: 9,
    sweetness: 8,
    caffeine: "None",
    image: "/images/beans.jpg",
    description: "Freshly baked croissant stuffed with dark Belgian chocolate ganache infused with subtle black truffle oil."
  }
];

export const SANCTUARIES = [
  {
    id: "loc-01",
    name: "thakur.08 Reserve Roastery & Lounge",
    city: "New Delhi",
    address: "08 Diplomatic Enclave, Chanakyapuri",
    status: "Open Now",
    occupancy: "65% Busy",
    features: ["Private Tasting Pods", "Copper Roast Bar", "Valet Parking", "Outdoor Terrace"],
    hours: "07:00 AM - 11:30 PM",
    phone: "+91 11 8808 0808",
    image: "/images/lounge.jpg"
  },
  {
    id: "loc-02",
    name: "thakur.08 Glass Sanctuary",
    city: "Bengaluru",
    address: "100ft Road, Indiranagar",
    status: "Open Now",
    occupancy: "40% Busy",
    features: ["Cold Drip Lab", "Pet Friendly Garden", "Silent Work Pods", "Vinyl Lounge"],
    hours: "06:30 AM - 11:00 PM",
    phone: "+91 80 8808 0808",
    image: "/images/lounge.jpg"
  },
  {
    id: "loc-03",
    name: "thakur.08 Waterfront Salon",
    city: "Mumbai",
    address: "Carter Road, Bandra West",
    status: "Open Now",
    occupancy: "82% Busy",
    features: ["Sunset Deck", "Single-Origin Bar", "Private Sommelier Tasting", "Valet"],
    hours: "07:00 AM - 01:00 AM",
    phone: "+91 22 8808 0808",
    image: "/images/lounge.jpg"
  }
];

export const MEMBERSHIP_TIERS = [
  {
    name: "Amber Connoisseur",
    pointsRequired: 0,
    benefits: ["Complimentary Birthday Reserve Drink", "Early Access to Seasonal Beans", "10% Cashback on Beans"]
  },
  {
    name: "Obsidian Barista VIP",
    pointsRequired: 500,
    benefits: ["Free Nitro Refill per Visit", "Priority Lounge Seating Reservation", "15% Cashback", "Private Cupping Masterclass"]
  },
  {
    name: "Thakur .08 Royal Reserve",
    pointsRequired: 1500,
    benefits: ["Personalized Custom Roast Profile", "Unlimited Syphon Brew Upgrade", "Complimentary Tasting Box Quarterly", "Dedicated Sommelier Host"]
  }
];
