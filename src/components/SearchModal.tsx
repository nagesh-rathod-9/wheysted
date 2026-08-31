import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = products.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.flavors.some((f) => f.name.toLowerCase().includes(q)) ||
      p.dietaryTags.some((d) => d.toLowerCase().includes(q))
    );
  });

  const popularSearches = ['Whey Isolate', 'Kesar Pista', 'Raw Whey', 'Alphonso Mango', 'Creatine', 'Mass Gainer', 'Filter Coffee'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 overflow-hidden">
        {/* Search Input Bar */}
        <div className="relative flex items-center mb-6">
          <Search className="w-5 h-5 text-red-600 absolute left-4" />
          <input
            type="text"
            autoFocus
            placeholder="Search protein powder, flavor (e.g. Kesar Pista), or creatine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
          />
          <button
            onClick={onClose}
            className="absolute right-3 p-1.5 rounded-xl text-slate-400 hover:text-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular searches suggestions if query is empty */}
        {query.trim() === '' ? (
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Popular Searches in India:
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Search Results List */
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            <div className="text-xs text-slate-500 font-semibold mb-2">
              Found {searchResults.length} product{searchResults.length === 1 ? '' : 's'}:
            </div>
            {searchResults.length > 0 ? (
              searchResults.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.pinterestImages[0]}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate max-w-md">
                        {prod.proteinGrams > 0 ? `${prod.proteinGrams}g Protein • ` : ''}{prod.tagline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-700">
                      ₹{prod.basePrice.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                No products matched your search. Try "Isolate", "Mango", or "Creatine".
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
