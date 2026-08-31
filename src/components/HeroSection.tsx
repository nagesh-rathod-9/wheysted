import React, { useState } from 'react';
import {
  ShoppingBag,
  Zap,
  ShieldCheck,
  Star,
  Eye,
  Truck,
  QrCode,
  FlaskConical,
  Sparkles,
  ChevronDown,
  Atom,
} from 'lucide-react';
import { Product, FlavorOption } from '../types';
import { HeroProductVisual } from './HeroProductVisual';

interface HeroSectionProps {
  heroProduct: Product;
  selectedFlavor: FlavorOption;
  onSelectFlavor: (flavor: FlavorOption) => void;
  onAddToCart: (product: Product, flavor: FlavorOption) => void;
  onOpenMacroCalc: () => void;
  onOpenDetailModal: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProduct,
  selectedFlavor,
  onSelectFlavor,
  onAddToCart,
  onOpenMacroCalc,
  onOpenDetailModal,
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  // Flavor pills configuration
  const flavorPills = [
    {
      id: 'kesar-pista',
      name: 'Kesar Pista Shahi Kulfi',
      emoji: '🟠',
      colorHex: '#d97706',
      description: 'Authentic Kashmiri saffron blended with crushed pistachio nuts and rich rabri notes.',
    },
    {
      id: 'alphonso-mango',
      name: 'Ratnagiri Alphonso Mango',
      emoji: '🥭',
      colorHex: '#ea580c',
      description: 'Sun-ripened tropical Alphonso mango pulp with a sweet, creamy shake texture.',
    },
    {
      id: 'belgian-chocolate',
      name: 'Belgian Dark Chocolate',
      emoji: '🟤',
      colorHex: '#451a03',
      description: 'Deep 70% imported cocoa with subtle malt sweetness and velvet texture.',
    },
    {
      id: 'filter-coffee',
      name: 'South Indian Filter Coffee',
      emoji: '☕',
      colorHex: '#78350f',
      description: 'Freshly roasted Arabica beans brewed with roasted chicory for a classic morning kick.',
    },
    {
      id: 'malai-kulfi',
      name: 'Traditional Malai Kulfi',
      emoji: '🍨',
      colorHex: '#fef3c7',
      description: 'Classic slow-cooked caramelized milk and cardamom infused Indian dessert flavor.',
    },
  ];

  const handleSelectPill = (flavorId: string) => {
    const matched = heroProduct.flavors.find((f) => f.id === flavorId);
    if (matched) {
      onSelectFlavor(matched);
    } else {
      const fallback = flavorPills.find((p) => p.id === flavorId);
      if (fallback) {
        onSelectFlavor({
          id: fallback.id,
          name: fallback.name,
          colorHex: fallback.colorHex,
          accentHex: '#10b981',
          bgGradient: 'from-amber-100 to-amber-50',
          description: fallback.description,
          tasteNotes: ['Authentic Flavor', 'Natural Aroma'],
          inStock: true,
        });
      }
    }
  };

  return (
    <section className="relative pt-2 pb-12 lg:pt-3 lg:pb-16 overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Trust Ribbon under Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 mb-6 rounded-xl bg-slate-50/80 border border-slate-200/80 text-xs font-semibold text-slate-800">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>India's Highest Rated 90% Pure CFM Whey Isolate</span>
          </div>

          <div className="flex items-center gap-4 text-slate-700">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-extrabold text-slate-900">4.94/5</span>
              <span className="text-slate-500 font-medium">(4,820+ Indian Athletes)</span>
            </div>

            <span className="hidden sm:inline text-slate-300">•</span>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>FSSAI Certified</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 text-slate-900 font-bold">
              <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Lab Tested for Purity</span>
            </div>
          </div>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Product Information, Flavour Selector, Dark Price Box */}
          <div className="lg:col-span-7 flex flex-col space-y-5 text-left">
            {/* Vegetarian Green Pill Badge */}
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300/80 shadow-2xs">
                <span>🍃</span>
                <span>100% VEGETARIAN • NATIVE CFM ISOLATE</span>
              </span>
            </div>

            {/* Clean Bold Uppercase Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] uppercase">
                CLEANEST WHEY <br />
                ISOLATE FOR <br />
                <span className="text-[#e01931]">INDIAN ATHLETES.</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed max-w-xl font-normal">
                Formulated with 100% Cold-Filtered Native Whey delivering{' '}
                <strong className="text-red-700 font-bold">27.2g Protein</strong>,{' '}
                <strong className="text-slate-900 font-bold">6.4g BCAAs</strong>, and DigeZyme®
                for zero bloating and instant 5-second mixing.
              </p>
            </div>

            {/* Flavour Selector Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
              {/* Header row: SELECT DESI & INTERNATIONAL FLAVOUR + current flavor dropdown indicator */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-black text-slate-900 tracking-wider uppercase text-[11px]">
                  <Zap className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  <span>SELECT DESI & INTERNATIONAL FLAVOUR:</span>
                </div>
                <div className="flex items-center gap-1 text-red-600 font-bold text-xs cursor-pointer hover:text-red-700">
                  <span>{selectedFlavor.name}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Flavor Pills in Row/Grid */}
              <div className="flex flex-wrap gap-2 pt-1">
                {flavorPills.map((pill) => {
                  const isSelected =
                    selectedFlavor.id === pill.id ||
                    selectedFlavor.name.toLowerCase().includes(pill.name.toLowerCase().split(' ')[0]);
                  return (
                    <button
                      key={pill.id}
                      onClick={() => handleSelectPill(pill.id)}
                      className={`px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-red-50 border border-red-500 ring-1 ring-red-500 font-bold text-slate-900 shadow-2xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-medium'
                      }`}
                    >
                      <span className="text-xs">{pill.emoji}</span>
                      <span className="truncate">{pill.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Flavor taste description quote box */}
              <div className="text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 leading-relaxed italic">
                "{selectedFlavor.description || 'Sun-ripened tropical Alphonso mango pulp with a sweet, creamy shake texture.'}"
              </div>
            </div>

            {/* Dark Price & Action Card */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#0b1120] text-white p-5 sm:p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
              {/* Left Price Info */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ₹{heroProduct.basePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm sm:text-base text-slate-400 line-through font-semibold">
                    ₹{heroProduct.originalPrice ? heroProduct.originalPrice.toLocaleString('en-IN') : '3,599'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#e01931] text-white text-[10px] font-black tracking-wider uppercase ml-1">
                    SAVE 20% TODAY
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-normal">
                  (Incl. of all taxes & GST invoice)
                </div>
              </div>

              {/* Right CTA Buttons */}
              <div className="flex flex-col gap-2 shrink-0 min-w-[240px]">
                <button
                  onClick={() => onAddToCart(heroProduct, selectedFlavor)}
                  className="w-full py-3.5 px-6 rounded-xl sm:rounded-2xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-xs sm:text-sm tracking-wider shadow-lg shadow-red-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-add-to-cart-btn"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                  <span>ADD TO CART — ₹{heroProduct.basePrice.toLocaleString('en-IN')}</span>
                </button>

                <button
                  onClick={() => onOpenDetailModal(heroProduct)}
                  className="w-full py-2.5 px-4 rounded-xl sm:rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs border border-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-700" />
                  <span>View Full Nutrition & Lab Report</span>
                </button>
              </div>
            </div>

            {/* 4 Indian E-Commerce Assurance Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 text-slate-700 text-xs">
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#e01931] shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-slate-900 block">Free Delivery</span>
                  <span className="text-[11px] text-slate-500">2-4 Days</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <QrCode className="w-5 h-5 text-[#e01931] shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-slate-900 block">Scratch QR</span>
                  <span className="text-[11px] text-slate-500">Authenticity</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Atom className="w-5 h-5 text-[#e01931] shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-slate-900 block">Zero Amino</span>
                  <span className="text-[11px] text-slate-500">Spiking</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#e01931] shrink-0" />
                <div className="leading-tight">
                  <span className="font-bold text-slate-900 block">COD & UPI</span>
                  <span className="text-[11px] text-slate-500">Accepted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Scene & Graphic Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroProductVisual
              selectedFlavor={selectedFlavor}
              selectedImageIdx={selectedImageIdx}
              onSelectImageIdx={(idx) => setSelectedImageIdx(idx)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
