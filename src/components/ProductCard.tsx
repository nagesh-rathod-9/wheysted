import React, { useState } from 'react';
import {
  ShoppingBag,
  Check,
  Star,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { Product, FlavorOption, WeightOption } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, flavor: FlavorOption, weight: WeightOption) => void;
  onOpenDetailModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onOpenDetailModal,
}) => {
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorOption>(product.flavors[0]);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(product.weights[0]);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = Math.round(product.basePrice * selectedWeight.priceMultiplier);
  const originalPrice = product.originalPrice
    ? Math.round(product.originalPrice * selectedWeight.priceMultiplier)
    : Math.round(currentPrice * 1.25);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedFlavor, selectedWeight);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group rounded-3xl bg-white border border-slate-200 hover:border-red-500 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer"
      onClick={() => onOpenDetailModal(product)}
    >
      {/* Top Media / Product Image Box */}
      <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-100/80 to-slate-50 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {/* Category & Veg Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          <div className="flex items-center gap-1.5">
            {/* Green Veg Dot */}
            <div className="w-3.5 h-3.5 rounded border border-emerald-700 p-0.5 flex items-center justify-center bg-white shadow-2xs" title="100% Vegetarian">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white text-slate-800 border border-slate-200 shadow-2xs">
              {product.categoryLabel}
            </span>
          </div>

          {product.badge && (
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-[#e01931] text-white shadow-2xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Photo */}
        <img
          src={product.pinterestImages[activeImageIdx] || product.pinterestImages[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={handleImageError}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
          loading="lazy"
        />

        {/* Thumbnail Selector Dots */}
        {product.pinterestImages.length > 1 && (
          <div
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full border border-slate-200 shadow-2xs"
            onClick={(e) => e.stopPropagation()}
          >
            {product.pinterestImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeImageIdx === idx ? 'w-3.5 bg-[#e01931]' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content & Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        {/* Title, Tagline & Rating */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {selectedWeight.servings} Scoops
            </span>
          </div>

          <h3 className="text-base font-black text-slate-900 group-hover:text-red-700 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Macro Bubbles */}
        <div className="grid grid-cols-4 gap-1.5 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-center">
          <div className="p-1 rounded-xl bg-white shadow-2xs border border-slate-100">
            <div className="text-xs font-black text-red-600">
              {product.proteinGrams > 0 ? `${product.proteinGrams}g` : '100%'}
            </div>
            <div className="text-[8px] text-slate-500 uppercase font-bold">
              {product.proteinGrams > 0 ? 'Protein' : 'Pure'}
            </div>
          </div>
          <div className="p-1 rounded-xl bg-white shadow-2xs border border-slate-100">
            <div className="text-xs font-black text-slate-700">
              {product.bcaaGrams > 0 ? `${product.bcaaGrams}g` : '200M'}
            </div>
            <div className="text-[8px] text-slate-500 uppercase font-bold">
              {product.bcaaGrams > 0 ? 'BCAAs' : 'Mesh'}
            </div>
          </div>
          <div className="p-1 rounded-xl bg-white shadow-2xs border border-slate-100">
            <div className="text-xs font-black text-amber-600">
              {product.sugarGrams}g
            </div>
            <div className="text-[8px] text-slate-500 uppercase font-bold">Sugar</div>
          </div>
          <div className="p-1 rounded-xl bg-white shadow-2xs border border-slate-100">
            <div className="text-xs font-black text-slate-900">
              {product.calorieCount}
            </div>
            <div className="text-[8px] text-slate-500 uppercase font-bold">Kcal</div>
          </div>
        </div>

        {/* Flavor Selector Swatches */}
        <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-bold uppercase">Flavour:</span>
            <span className="text-slate-800 font-bold truncate max-w-[150px]">
              {selectedFlavor.name}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.flavors.map((flavor) => {
              const isSelected = selectedFlavor.id === flavor.id;
              return (
                <button
                  key={flavor.id}
                  onClick={() => setSelectedFlavor(flavor)}
                  title={flavor.name}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    isSelected
                      ? 'scale-110 ring-2 ring-red-500 ring-offset-2 border-white'
                      : 'border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: flavor.colorHex }}
                />
              );
            })}
          </div>
        </div>

        {/* Size / Weight Selector Pills */}
        <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
          {product.weights.map((weight, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedWeight(weight)}
              className={`flex-1 py-1 px-1 rounded-xl text-[10px] font-bold border transition-all truncate cursor-pointer ${
                selectedWeight.size === weight.size
                  ? 'bg-red-50 border-red-500 text-red-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {weight.size.split(' ')[0]} {weight.size.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Bottom Price & Add to Cart */}
        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                ₹{currentPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] text-red-600 font-bold uppercase flex items-center gap-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> In Stock • Fast Dispatch
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetailModal(product);
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="View Complete Nutrition & Lab Specs"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={handleAdd}
              className="px-3.5 py-2 rounded-xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>ADDED</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
