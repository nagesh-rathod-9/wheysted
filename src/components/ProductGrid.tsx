import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Product, FlavorOption, WeightOption, ActiveFilterCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: ActiveFilterCategory;
  onSelectCategory: (category: ActiveFilterCategory) => void;
  onAddToCart: (product: Product, flavor: FlavorOption, weight: WeightOption) => void;
  onOpenDetailModal: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onOpenDetailModal,
  searchQuery,
  setSearchQuery,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'protein-desc' | 'rating'>('featured');

  const categoryFilters: { id: ActiveFilterCategory; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'isolate', label: 'Whey Isolate' },
    { id: 'concentrate', label: 'Raw Whey 80%' },
    { id: 'clear', label: 'Clear Juice Protein' },
    { id: 'plant', label: 'Organic Plant' },
    { id: 'casein', label: 'Micellar Casein' },
    { id: 'mass', label: 'Clean Mass Gainer' },
    { id: 'creatine', label: 'Creapure® Creatine' },
  ];

  let filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.flavors.some((f) => f.name.toLowerCase().includes(q)) ||
      product.dietaryTags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Sort logic
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
    if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
    if (sortBy === 'protein-desc') return b.proteinGrams - a.proteinGrams;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <section id="shop-catalog" className="py-16 sm:py-20 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-red-50 text-red-700 border border-red-200">
              100% Authentic & Lab Tested
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
              Wheysted Protein & Nutrition Store
            </h2>
            <p className="text-slate-600 text-sm max-w-xl">
              Clean, unadulterated sports nutrition formulated for Indian lifters. 100% vegetarian, zero amino-spiking, and direct from factory to your doorstep.
            </p>
          </div>

          {/* Quick Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Kesar Pista, Isolate, Mango..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
              />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="w-full sm:w-auto py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-red-500"
              >
                <option value="featured">Sort: Best Sellers</option>
                <option value="protein-desc">Highest Protein per Scoop</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categoryFilters.map((tab) => {
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#e01931] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onOpenDetailModal={onOpenDetailModal}
              />
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <h4 className="text-base font-bold text-slate-800">No products matching your search</h4>
            <p className="text-xs text-slate-500">
              Try adjusting your category filter or clearing your search keywords.
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
