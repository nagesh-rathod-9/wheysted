import React, { useState } from 'react';
import {
  X,
  Rotate3d,
  Sparkles,
  ShoppingBag,
  Sliders,
  Layers,
  Sun,
  Flame,
  Zap,
  Check,
  Eye,
  Info,
  Box,
} from 'lucide-react';
import { Product, FlavorOption, WeightOption } from '../types';
import { ProteinTub3D } from './ThreeCanvas/ProteinTub3D';
import { SketchfabEmbed } from './SketchfabEmbed';

interface Interactive3DStudioModalProps {
  product: Product | null;
  initialFlavor?: FlavorOption;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, flavor: FlavorOption, weight: WeightOption) => void;
}

export const Interactive3DStudioModal: React.FC<Interactive3DStudioModalProps> = ({
  product,
  initialFlavor,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedFlavor, setSelectedFlavor] = useState<FlavorOption>(
    initialFlavor || product.flavors[0]
  );
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(product.weights[0]);
  const [viewEngine, setViewEngine] = useState<'sketchfab' | 'webgl'>('sketchfab');
  const [isExploded, setIsExploded] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const price = (product.basePrice * selectedWeight.priceMultiplier).toFixed(2);

  const handleAdd = () => {
    onAddToCart(product, selectedFlavor, selectedWeight);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-6xl rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/20 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200">
              <Rotate3d className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                  {product.name} — 3D INSPECTION STUDIO
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {viewEngine === 'sketchfab' ? 'Sketchfab 3D Active' : 'Custom WebGL Shader'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Click & Drag to rotate 360° • High Precision 3D Model</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
            id="close-3d-studio-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split 3D Viewport on Left / Customizer & Specs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 bg-white">
          {/* Left 3D Canvas Studio */}
          <div className="lg:col-span-7 relative bg-gradient-to-b from-slate-50 to-slate-100/70 p-4 sm:p-6 flex flex-col justify-between min-h-[420px] sm:min-h-[500px]">
            {/* Ambient dynamic radial glow */}
            <div
              className="absolute inset-0 opacity-15 blur-3xl pointer-events-none transition-colors duration-700"
              style={{ backgroundColor: selectedFlavor.accentHex || '#10b981' }}
            />

            {/* 3D Engine Selector & Controls */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 bg-white shadow-sm p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewEngine('sketchfab')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewEngine === 'sketchfab'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Sketchfab 3D Model</span>
                </button>
                <button
                  onClick={() => setViewEngine('webgl')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    viewEngine === 'webgl'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>WebGL Shader Studio</span>
                </button>
              </div>

              {viewEngine === 'webgl' && (
                <div className="flex items-center gap-1.5 bg-white shadow-sm p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setIsExploded(!isExploded)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isExploded ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isExploded ? 'Lid Exploded (ON)' : 'Explode Lid'}
                  </button>
                  <button
                    onClick={() => setIsWireframe(!isWireframe)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isWireframe ? 'bg-cyan-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isWireframe ? 'Wireframe (ON)' : 'Wireframe'}
                  </button>
                </div>
              )}
            </div>

            {/* 3D Viewport Container */}
            <div className="w-full flex-1 relative z-10 flex items-center justify-center my-1">
              {viewEngine === 'sketchfab' ? (
                <div className="w-full h-full min-h-[380px] sm:min-h-[440px]">
                  <SketchfabEmbed
                    title="Whey Protein Concentrado 450g"
                    className="w-full h-full min-h-[380px] sm:min-h-[440px] rounded-2xl border border-slate-200/80 bg-white"
                  />
                </div>
              ) : (
                <ProteinTub3D
                  product={product}
                  selectedFlavor={selectedFlavor}
                  exploded={isExploded}
                  wireframe={isWireframe}
                  className="w-full h-full min-h-[380px] sm:min-h-[440px]"
                />
              )}
            </div>

            {/* Bottom 3D Hint bar */}
            <div className="relative z-20 flex items-center justify-between text-xs text-slate-600 bg-white/90 shadow-sm px-3.5 py-2 rounded-xl border border-slate-200 mt-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Rotate3d className="w-3.5 h-3.5 text-emerald-600" />
                Touch & drag to inspect 360° formulation container
              </span>
              <span className="font-bold text-slate-800 uppercase">{selectedFlavor.name}</span>
            </div>
          </div>

          {/* Right Product Customizer & Nutritional Tab Panel */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 overflow-y-auto">
            <div className="space-y-6">
              {/* Product Info & Quick Stats */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {product.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">• {product.weights[0].servings} Servings</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 font-heading">{product.name}</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{product.description}</p>
              </div>

              {/* 4 Macro Badges */}
              <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 text-center">
                <div className="p-1.5 rounded-xl bg-white shadow-xs border border-slate-100">
                  <div className="text-base font-black text-emerald-600 font-heading">
                    {product.proteinGrams}g
                  </div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Protein</div>
                </div>
                <div className="p-1.5 rounded-xl bg-white shadow-xs border border-slate-100">
                  <div className="text-base font-black text-cyan-600 font-heading">
                    {product.bcaaGrams}g
                  </div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">BCAAs</div>
                </div>
                <div className="p-1.5 rounded-xl bg-white shadow-xs border border-slate-100">
                  <div className="text-base font-black text-amber-600 font-heading">
                    {product.sugarGrams}g
                  </div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Sugar</div>
                </div>
                <div className="p-1.5 rounded-xl bg-white shadow-xs border border-slate-100">
                  <div className="text-base font-black text-slate-900 font-heading">
                    {product.calorieCount}
                  </div>
                  <div className="text-[9px] text-slate-500 uppercase font-bold">Calories</div>
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold uppercase">Select Flavor:</span>
                  <span className="text-slate-900 font-bold">{selectedFlavor.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.flavors.map((flavor) => {
                    const isSelected = selectedFlavor.id === flavor.id;
                    return (
                      <button
                        key={flavor.id}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-400'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-slate-300 shrink-0"
                          style={{ backgroundColor: flavor.colorHex }}
                        />
                        <span className="text-xs font-semibold truncate">{flavor.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-bold uppercase">Size & Servings:</span>
                  <span className="text-emerald-700 font-bold">{selectedWeight.servings} Servings</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.weights.map((weight, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedWeight(weight)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedWeight.size === weight.size
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-400'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{weight.size}</div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        ${(product.basePrice * weight.priceMultiplier).toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nutrition Facts Accordion / Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Nutritional Highlights (Per Scoop)
                </span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                  {product.nutritionTable.slice(0, 6).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-1 border-b border-slate-200/80"
                    >
                      <span className="text-slate-600">{item.label}</span>
                      <span className="font-bold text-slate-900">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Checkout Action */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-black text-slate-900 font-heading">${price}</div>
                <span className="text-[11px] text-emerald-600 font-semibold">Free 2-Day Express Shipping</span>
              </div>

              <button
                onClick={handleAdd}
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
                id="modal-add-to-cart-btn"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>ADDED TO STACK!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
