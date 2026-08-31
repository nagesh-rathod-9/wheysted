import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Calculator,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { ActiveFilterCategory } from '../types';
import { WheystedLogo } from './WheystedLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: ActiveFilterCategory;
  onSelectCategory: (cat: ActiveFilterCategory) => void;
  onOpenMacroCalc: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  onOpenMacroCalc,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories: { id: ActiveFilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Products', count: 6 },
    { id: 'isolate', label: '100% Whey Isolate', count: 1 },
    { id: 'concentrate', label: 'Pure Raw Whey', count: 1 },
    { id: 'clear', label: 'Clear Juice Protein', count: 1 },
    { id: 'plant', label: 'Organic Plant Vegan', count: 1 },
    { id: 'casein', label: 'Night Micellar Casein', count: 1 },
    { id: 'mass', label: 'Clean Mass Gainer', count: 1 },
    { id: 'creatine', label: 'Creapure® Creatine', count: 1 },
  ];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-200 bg-white ${
          isScrolled ? 'border-b border-slate-200/90 shadow-xs py-2 sm:py-2.5' : 'border-b border-slate-100 py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Authentic Storefront Brand Identity with WHEYSTED & PROTEIN STORE */}
            <a href="#" className="flex items-center gap-2 group shrink-0 focus:outline-none">
              <WheystedLogo variant="navbar" size="md" />
            </a>

            {/* Middle: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-bold text-slate-800">
              <a
                href="#shop-catalog"
                className="hover:text-red-600 transition-colors"
              >
                Shop Proteins
              </a>

              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                  className="hover:text-red-600 transition-colors flex items-center gap-1 py-1"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                      isCategoryDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isCategoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    className="absolute top-full left-0 mt-1.5 w-60 p-2 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-1 animate-fadeIn z-50"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setIsCategoryDropdownOpen(false);
                          const el = document.getElementById('shop-catalog');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full px-3 py-2 text-xs rounded-xl text-left font-semibold flex items-center justify-between transition-colors ${
                          activeCategory === cat.id
                            ? 'bg-red-50 text-red-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({cat.count})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#science-purity"
                className="hover:text-red-600 transition-colors"
              >
                Purity Standard
              </a>

              <a
                href="#flavor-lab"
                className="hover:text-red-600 transition-colors"
              >
                Desi Flavours
              </a>

              <a
                href="#comparison-lab"
                className="hover:text-red-600 transition-colors"
              >
                Lab Purity vs Others
              </a>
            </nav>

            {/* Right: Actions (Reduced Cart Size + Mobile Friendly) */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Protein Calculator Pill (Desktop/Tablet) */}
              <button
                onClick={onOpenMacroCalc}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-2xs transition-all"
                title="Calculate protein target"
                id="nav-calc-btn"
              >
                <Calculator className="w-3.5 h-3.5 text-red-600" />
                <span>Protein Calculator</span>
              </button>

              {/* Instant Search Icon Button */}
              <button
                onClick={onOpenSearch}
                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors"
                title="Search protein formulas"
                id="nav-search-btn"
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Red Cart Pill Button */}
              <button
                onClick={onOpenCart}
                className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-[11px] sm:text-xs tracking-wide shadow-2xs active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
                id="nav-cart-btn"
              >
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                <span className="hidden xs:inline">CART</span>
                <span className="min-w-[18px] h-4.5 px-1 rounded-full bg-white text-red-700 text-[10px] sm:text-[11px] font-black flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition-colors"
                id="mobile-menu-toggle"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden pt-16 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-b border-slate-200 p-4 sm:p-5 space-y-3.5 max-h-[85vh] overflow-y-auto shadow-2xl rounded-b-3xl">
            {/* Quick Protein Calculator */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenMacroCalc();
              }}
              className="w-full p-2.5 rounded-xl bg-red-50 text-red-900 border border-red-200 flex items-center justify-between font-bold text-xs"
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-red-600" />
                <span>Calculate Your Daily Protein Goal</span>
              </div>
              <span className="text-red-700 text-[11px] font-extrabold">Open &rarr;</span>
            </button>

            {/* Protein Categories Grid */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Protein Categories:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setIsMobileMenuOpen(false);
                      const el = document.getElementById('shop-catalog');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-2 rounded-xl text-left border text-xs transition-all ${
                      activeCategory === cat.id
                        ? 'bg-red-50 border-red-500 text-red-900 font-bold ring-1 ring-red-400'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-bold truncate text-[11px]">{cat.label}</div>
                    <div className="text-[9px] text-slate-500 font-medium">({cat.count} items)</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-1 pt-2 border-t border-slate-200 text-xs font-bold text-slate-800">
              <a
                href="#science-purity"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Purity Standard
              </a>
              <a
                href="#flavor-lab"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Desi Flavours
              </a>
              <a
                href="#comparison-lab"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Lab Purity vs Others
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
