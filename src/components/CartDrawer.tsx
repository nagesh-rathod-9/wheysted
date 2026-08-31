import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [flatDiscount, setFlatDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isPrepaid, setIsPrepaid] = useState(true);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Calculations in INR
  const rawSubtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const prepaidDiscount = isPrepaid ? Math.round(rawSubtotal * 0.05) : 0;
  const promoPercentageDiscount = discountPercent > 0 ? Math.round(rawSubtotal * (discountPercent / 100)) : 0;
  const totalDiscount = prepaidDiscount + promoPercentageDiscount + flatDiscount;
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - totalDiscount);

  // Free shipping threshold ₹999
  const freeShippingThreshold = 999;
  const shippingCost =
    subtotalAfterDiscount >= freeShippingThreshold || items.length === 0 ? 0 : 99;
  const finalTotal = subtotalAfterDiscount + shippingCost;

  const freeShippingProgress = Math.min(100, (subtotalAfterDiscount / freeShippingThreshold) * 100);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'WHEYSTED10') {
      setDiscountPercent(10);
      setFlatDiscount(0);
      setPromoSuccess('10% Wheysted Special Discount Applied!');
    } else if (code === 'FIRSTORDER') {
      setFlatDiscount(300);
      setDiscountPercent(0);
      setPromoSuccess('₹300 First Order Discount Applied!');
    } else if (code === 'FITNESS') {
      setDiscountPercent(15);
      setFlatDiscount(0);
      setPromoSuccess('15% Fitness Community Discount Applied!');
    } else {
      setPromoError('Invalid coupon. Try "WHEYSTED10" or "FIRSTORDER"');
    }
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e01931', '#1e293b', '#d97706', '#dc2626'],
    });
    setCheckoutComplete(true);
  };

  const handleResetAfterCheckout = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-fadeIn cursor-pointer"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-red-600" />
              <h3 className="text-base font-black text-slate-900">
                YOUR CART ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-200/60 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {checkoutComplete ? (
            /* Checkout Success State */
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">ORDER PLACED SUCCESSFULLY!</h3>
                <p className="text-xs text-slate-600">
                  Thank you for trusting Wheysted. Your fresh batch is getting ready for dispatch.
                </p>
                <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-mono text-red-800 font-bold">
                  ORDER ID: #WHEY-IN-{Math.floor(100000 + Math.random() * 900000)}
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                You will receive SMS & WhatsApp tracking updates as soon as Bluedart / Delhivery picks up the package.
              </p>
              <button
                onClick={handleResetAfterCheckout}
                className="w-full py-3 rounded-xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-xs shadow-md cursor-pointer"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            /* Cart Content */
            <>
              {/* Free Delivery Bar */}
              <div className="p-3.5 bg-slate-50 border-b border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-red-800">
                    <Truck className="w-4 h-4 text-red-600" />
                    <span>
                      {subtotalAfterDiscount >= freeShippingThreshold
                        ? '🎉 FREE Express Delivery across India Unlocked!'
                        : `Add ₹${(freeShippingThreshold - subtotalAfterDiscount).toLocaleString('en-IN')} more for Free Delivery`}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    ₹{subtotalAfterDiscount.toLocaleString('en-IN')} / ₹{freeShippingThreshold}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e01931] transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">Your Cart is Empty</h4>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Explore our 100% authentic Whey Isolates, Concentrates, Plant Proteins, and Creapure Creatine.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3 relative group"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-16 h-16 rounded-xl bg-slate-50 p-1 flex items-center justify-center relative shrink-0 border border-slate-100">
                        <img
                          src={item.product.pinterestImages[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                          className="w-full h-full object-contain"
                        />
                        <div
                          className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full border border-white"
                          style={{ backgroundColor: item.selectedFlavor.colorHex }}
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-red-700 font-semibold truncate">
                          {item.selectedFlavor.name}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {item.selectedWeight.size}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg border border-slate-200 p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-1.5 text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-xs font-black text-slate-900">
                            ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                  {/* Prepaid UPI 5% Discount Toggle */}
                  <div
                    onClick={() => setIsPrepaid(!isPrepaid)}
                    className="p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between cursor-pointer hover:bg-red-100/70 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isPrepaid
                            ? 'bg-[#e01931] border-[#e01931] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isPrepaid && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          Pay Online / UPI (Extra 5% OFF)
                        </span>
                        <span className="text-[10px] text-slate-600">
                          GPay, PhonePe, Paytm, Cards, NetBanking
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-red-900 bg-red-200 px-2 py-0.5 rounded">
                      EXTRA 5% OFF
                    </span>
                  </div>

                  {/* Promo Code Input */}
                  <div className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Coupon (e.g. WHEYSTED10)"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 uppercase placeholder:text-slate-400 focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <button
                        onClick={handleApplyPromo}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoSuccess && (
                      <span className="text-[10px] text-red-800 font-bold block">
                        {promoSuccess}
                      </span>
                    )}
                    {promoError && (
                      <span className="text-[10px] text-rose-600 font-semibold block">
                        {promoError}
                      </span>
                    )}
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Item Total</span>
                      <span className="font-mono text-slate-900 font-semibold">
                        ₹{rawSubtotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-red-700 font-bold">
                        <span>Total Discounts Applied</span>
                        <span className="font-mono">-₹{totalDiscount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-600">
                      <span>Delivery Charges</span>
                      <span className="font-mono text-slate-900 font-semibold">
                        {shippingCost === 0 ? (
                          <span className="text-red-700 font-bold">FREE</span>
                        ) : (
                          `₹${shippingCost}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Grand Total</span>
                      <span className="font-mono text-red-700 text-base font-black">
                        ₹{finalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-2xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-xs tracking-wider shadow-md shadow-red-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="checkout-btn"
                  >
                    <span>PLACE ORDER — ₹{finalTotal.toLocaleString('en-IN')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                    <span>100% Genuine Direct from Brand • Easy 14-Day Replacement</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
