import React, { useState } from 'react';
import { ArrowRight, Coffee } from 'lucide-react';
import { Product, FlavorOption } from '../types';

interface FlavorLabExperienceProps {
  products: Product[];
  onSelectProductAndFlavor: (product: Product, flavor: FlavorOption) => void;
}

export const FlavorLabExperience: React.FC<FlavorLabExperienceProps> = ({
  products,
  onSelectProductAndFlavor,
}) => {
  const flavorShowcase = [
    {
      prodId: 'wheysted-iso-matrix',
      flavorId: 'kesar-pista',
      name: 'Kesar Pista Shahi Kulfi',
      subtitle: 'Kashmiri Saffron, Crushed Pistachios & Rabri Creaminess',
      category: 'Royal Indian Desserts',
      color: '#d97706',
      accent: '#f59e0b',
      sweetness: 65,
      creaminess: 95,
      refreshment: 60,
      richness: 92,
      bestWith: 'Cold Water or Chilled Toned Milk',
      tag: '🔥 #1 Indian Lifter Choice',
    },
    {
      prodId: 'wheysted-iso-matrix',
      flavorId: 'alphonso-mango',
      name: 'Ratnagiri Alphonso Mango',
      subtitle: 'Sun-Ripened Devgad Alphonso Mango Pulp Shake',
      category: 'Tropical Fruit',
      color: '#ea580c',
      accent: '#f97316',
      sweetness: 70,
      creaminess: 88,
      refreshment: 85,
      richness: 80,
      bestWith: 'Ice Shaker Water or Blended with Curd (Lassi)',
      tag: '🥭 Summer Classic',
    },
    {
      prodId: 'wheysted-iso-matrix',
      flavorId: 'filter-coffee',
      name: 'South Indian Filter Coffee',
      subtitle: 'Coorg Arabica Beans with Roasted Chicory Aroma',
      category: 'Morning Energy & Kaapi',
      color: '#713f12',
      accent: '#a16207',
      sweetness: 45,
      creaminess: 85,
      refreshment: 75,
      richness: 90,
      bestWith: 'Pre-Workout Morning Shaker in Cold Water',
      tag: '☕ Caffeine Kick',
    },
    {
      prodId: 'wheysted-iso-matrix',
      flavorId: 'belgian-chocolate',
      name: 'Belgian Dark Chocolate Ganache',
      subtitle: '70% Rich Imported Cocoa & Malted Velvet Texture',
      category: 'Rich & Decadent',
      color: '#3d2314',
      accent: '#78350f',
      sweetness: 55,
      creaminess: 92,
      refreshment: 40,
      richness: 98,
      bestWith: 'Mixed in Oats or Post-Workout Cold Water',
      tag: '🍫 Classic All-Time Favorite',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = flavorShowcase[activeIndex];

  const handleApply = () => {
    const prod = products.find((p) => p.id === active.prodId) || products[0];
    const flav = prod.flavors.find((f) => f.id === active.flavorId) || prod.flavors[0];
    onSelectProductAndFlavor(prod, flav);
  };

  return (
    <section id="flavor-lab" className="py-16 sm:py-24 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-200">
            Crafted for the Indian Palate
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Gourmet Desi & International Flavours
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Never force down chalky, artificial powders again. Every Wheysted flavor is micro-blended for effortless dissolving and delicious taste in simple cold water.
          </p>
        </div>

        {/* Flavor Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {flavorShowcase.map((flavor, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={flavor.name}
                onClick={() => setActiveIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isCurrent
                    ? 'bg-white border-red-500 ring-2 ring-red-400/30 shadow-md scale-[1.02]'
                    : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-4 h-4 rounded-full border border-slate-300 shadow-2xs"
                    style={{ backgroundColor: flavor.color }}
                  />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {flavor.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate">{flavor.name}</h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{flavor.subtitle}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Flavor Sensory Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Flavor Overview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                  ★ {active.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {active.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{active.subtitle}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-900 uppercase block">
                    Mixing & Pairing Suggestion:
                  </span>
                  <p className="text-xs font-semibold text-slate-800">{active.bestWith}</p>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="px-6 py-3 rounded-2xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-md shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>SELECT THIS FLAVOUR & BUY NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Sensory Calibration Bars */}
            <div className="lg:col-span-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Sensory Matrix Ratings:
              </span>

              {/* Bar 1: Richness */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Flavour Intensity & Richness</span>
                  <span className="text-slate-900 font-bold">{active.richness}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${active.richness}%` }}
                  />
                </div>
              </div>

              {/* Bar 2: Creaminess */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Smooth Shake Texture (Zero Chalk)</span>
                  <span className="text-slate-900 font-bold">{active.creaminess}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e01931] rounded-full transition-all duration-500"
                    style={{ width: `${active.creaminess}%` }}
                  />
                </div>
              </div>

              {/* Bar 3: Refreshment */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Post-Workout Refreshment</span>
                  <span className="text-slate-900 font-bold">{active.refreshment}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-600 rounded-full transition-all duration-500"
                    style={{ width: `${active.refreshment}%` }}
                  />
                </div>
              </div>

              {/* Bar 4: Natural Sweetness Balance */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-600">Clean Sweetness (Zero Added Sugar)</span>
                  <span className="text-slate-900 font-bold">{active.sweetness}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${active.sweetness}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
