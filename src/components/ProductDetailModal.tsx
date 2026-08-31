import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Check,
  QrCode,
  Download,
} from 'lucide-react';
import { Product, FlavorOption, WeightOption } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, flavor: FlavorOption, weight: WeightOption) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedFlavor, setSelectedFlavor] = useState<FlavorOption>(product.flavors[0]);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(product.weights[0]);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'nutrition' | 'amino' | 'usage' | 'lab'>('specs');
  const [isAdded, setIsAdded] = useState(false);
  const [isReportDownloaded, setIsReportDownloaded] = useState(false);

  const currentPrice = Math.round(product.basePrice * selectedWeight.priceMultiplier);
  const originalPrice = product.originalPrice
    ? Math.round(product.originalPrice * selectedWeight.priceMultiplier)
    : Math.round(currentPrice * 1.25);
  const savings = originalPrice - currentPrice;

  const handleAdd = () => {
    onAddToCart(product, selectedFlavor, selectedWeight);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleDownloadLabReport = () => {
    setIsReportDownloaded(true);
    setTimeout(() => setIsReportDownloaded(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-3.5 h-3.5 rounded border border-emerald-700 p-0.5 flex items-center justify-center bg-white shadow-2xs" title="100% Vegetarian">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200">
              {product.categoryLabel}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 truncate max-w-xs sm:max-w-md">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1 bg-white">
          {/* Left Media & Packshot Column */}
          <div className="lg:col-span-5 p-5 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Main Photo */}
              <div className="relative aspect-square w-full rounded-2xl bg-white p-6 flex items-center justify-center border border-slate-200/90 shadow-xs overflow-hidden">
                <img
                  src={product.pinterestImages[selectedImageIdx] || product.pinterestImages[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="max-h-[260px] sm:max-h-[300px] w-auto object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center justify-center gap-2">
                {product.pinterestImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-14 h-14 rounded-xl border p-1 bg-white transition-all cursor-pointer ${
                      selectedImageIdx === idx
                        ? 'border-red-600 ring-2 ring-red-400'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      onError={handleImageError}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Macro Specs Summary Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Macro Profile (Per 30g Scoop):
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="p-1.5 rounded-lg bg-red-50 text-red-900 font-bold border border-red-200">
                  <div className="text-sm font-black">{product.proteinGrams > 0 ? `${product.proteinGrams}g` : '100%'}</div>
                  <div className="text-[9px] uppercase">Protein</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-900 font-bold border border-slate-200">
                  <div className="text-sm font-black">{product.bcaaGrams > 0 ? `${product.bcaaGrams}g` : '200M'}</div>
                  <div className="text-[9px] uppercase">BCAAs</div>
                </div>
                <div className="p-1.5 rounded-lg bg-amber-50 text-amber-900 font-bold border border-amber-200">
                  <div className="text-sm font-black">{product.sugarGrams}g</div>
                  <div className="text-[9px] uppercase">Sugar</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-900 font-bold border border-slate-200">
                  <div className="text-sm font-black">{product.calorieCount}</div>
                  <div className="text-[9px] uppercase">Kcal</div>
                </div>
              </div>
            </div>

            {/* Authenticity Certificate Banner */}
            <div className="p-3 rounded-xl bg-red-50/80 border border-red-200 text-red-950 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-red-700 shrink-0" />
                <span>Scratch & Verify QR on Tub</span>
              </div>
              <span className="text-[10px] text-red-700 font-bold">100% Original</span>
            </div>
          </div>

          {/* Right Product Details, Selectors & Tabs Column */}
          <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Ratings and Reviews */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-slate-900 text-sm">{product.rating}</span>
                  <span className="text-xs text-slate-500 font-medium">({product.reviewCount} verified Indian reviews)</span>
                </div>
                <span className="text-xs text-red-800 font-bold bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                  FSSAI Approved
                </span>
              </div>

              {/* Tagline & Story */}
              <div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">{product.tagline}</p>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{product.description}</p>
              </div>

              {/* Flavor Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 uppercase">
                    Select Flavour: <strong className="text-slate-900">{selectedFlavor.name}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`p-2 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        selectedFlavor.id === flavor.id
                          ? 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/20 font-bold shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: flavor.colorHex }}
                      />
                      <span className="truncate">{flavor.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 uppercase">
                    Select Pack Size: <strong className="text-slate-900">{selectedWeight.size}</strong>
                  </span>
                  {selectedWeight.badge && (
                    <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {selectedWeight.badge}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.weights.map((w, idx) => {
                    const wPrice = Math.round(product.basePrice * w.priceMultiplier);
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedWeight(w)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          selectedWeight.size === w.size
                            ? 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/20 font-bold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold">{w.size.split('(')[0]}</div>
                        <div className="text-[11px] text-slate-600 font-semibold">
                          ₹{wPrice.toLocaleString('en-IN')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tabbed Info Section */}
              <div className="border-t border-slate-200 pt-3 space-y-3">
                <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
                  {[
                    { id: 'specs', label: 'Purity Highlights' },
                    { id: 'nutrition', label: 'Nutrition Facts' },
                    { id: 'amino', label: 'Aminogram' },
                    { id: 'usage', label: 'How to Use' },
                    { id: 'lab', label: 'Lab Report' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2 px-2.5 text-xs font-bold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-red-600 text-red-700'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Specs Tab */}
                {activeTab === 'specs' && (
                  <div className="space-y-2 text-xs text-slate-700">
                    <p>• <strong>Cold-Filtered CFM:</strong> Native isolate extracted at sub-zero temperatures to preserve bioactive immunoglobulins.</p>
                    <p>• <strong>DigeZyme® Multi-Enzyme:</strong> 5 digestive enzymes (Protease, Amylase, Lipase, Lactase, Cellulase) for effortless digestion.</p>
                    <p>• <strong>Dietary:</strong> 100% Vegetarian, Gluten-Free, Zero Added Sugar, Zero Amino-Spiking.</p>
                    <p>• <strong>Certifications:</strong> {product.certifications.join(' • ')}</p>
                  </div>
                )}

                {/* Nutrition Table Tab */}
                {activeTab === 'nutrition' && (
                  <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-300 text-[10px] text-slate-500 uppercase">
                          <th className="py-1">Nutrient</th>
                          <th className="py-1 text-right">Per Serving ({product.scoopSizeGrams}g)</th>
                          <th className="py-1 text-right">Daily Value %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.nutritionTable.map((item, i) => (
                          <tr key={i} className={`border-b border-slate-200/60 ${item.highlight ? 'font-bold text-slate-900 bg-red-50/50' : 'text-slate-600'}`}>
                            <td className="py-1">{item.label}</td>
                            <td className="py-1 text-right font-mono">{item.amount}</td>
                            <td className="py-1 text-right font-mono text-slate-500">{item.dailyValue || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Aminogram Tab */}
                {activeTab === 'amino' && (
                  <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                    <p className="text-[11px] text-slate-500 font-medium">Naturally occurring amino acid spectrum per scoop:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {product.aminoProfile.map((amino, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{amino.name}</span>
                          <span className="font-bold text-red-700 font-mono">{amino.amountPerServing}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Usage Tab */}
                {activeTab === 'usage' && (
                  <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p><strong>1. Post-Workout:</strong> Add 1 scoop (30g) in 200-250ml cold water or toned milk. Shake vigorously for 5 seconds.</p>
                    <p><strong>2. Morning or Breakfast:</strong> Blend with oats, peanut butter, and banana for a high-protein power smoothie.</p>
                    <p><strong>3. Best Timing:</strong> Within 30 minutes after training or between major meals to hit your daily protein goal.</p>
                  </div>
                )}

                {/* Lab Report Tab */}
                {activeTab === 'lab' && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">NABL Accredited Certificate of Analysis (CoA)</div>
                        <div className="text-[11px] text-slate-500">Batch #WHEY-2026-IN • Tested for Heavy Metals & Protein %</div>
                      </div>
                      <button
                        onClick={handleDownloadLabReport}
                        className="px-3 py-1.5 rounded-lg bg-[#e01931] hover:bg-[#c8102e] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isReportDownloaded ? 'Downloaded ✓' : 'View CoA PDF'}</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-1">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 block">Tested Protein %</span>
                        <span className="font-black text-red-700">90.8% (Pass)</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 block">Heavy Metals (Lead/Hg)</span>
                        <span className="font-black text-red-700">ND / Zero</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-slate-500 block">Amino Spiking</span>
                        <span className="font-black text-red-700">Negative</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Checkout & Add to Cart Bar */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    ₹{currentPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-400 line-through font-semibold">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                    Save ₹{savings.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium block">
                  Free Express Delivery across India (2-4 Days) • COD Available
                </span>
              </div>

              <button
                onClick={handleAdd}
                className="px-8 py-3.5 rounded-2xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-red-600/25 active:scale-95 transition-all cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>ADDED TO CART!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART — ₹{currentPrice.toLocaleString('en-IN')}</span>
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
