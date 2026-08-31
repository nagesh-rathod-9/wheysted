import React, { useState } from 'react';
import {
  Calculator,
  X,
  Target,
  Dumbbell,
  Activity,
  CheckCircle2,
  ShoppingBag,
} from 'lucide-react';
import { Product, FlavorOption, WeightOption } from '../types';

interface MacroCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product, flavor: FlavorOption, weight: WeightOption) => void;
}

export const MacroCalculator: React.FC<MacroCalculatorProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [weightKg, setWeightKg] = useState<number>(70);
  const [dietType, setDietType] = useState<'pure-veg' | 'eggetarian' | 'non-veg'>('pure-veg');
  const [goal, setGoal] = useState<'muscle-gain' | 'fat-loss' | 'maintenance'>('muscle-gain');
  const [workoutDays, setWorkoutDays] = useState<'3-4' | '5-6' | 'daily'>('5-6');
  const [addedStack, setAddedStack] = useState(false);

  // Protein calculation
  const getTargetGrams = () => {
    let multiplier = 1.6;
    if (goal === 'muscle-gain') multiplier = 2.0;
    if (goal === 'fat-loss') multiplier = 2.2;
    if (goal === 'maintenance') multiplier = 1.5;

    if (workoutDays === 'daily') multiplier += 0.2;
    if (workoutDays === '3-4') multiplier -= 0.1;

    return Math.round(weightKg * multiplier);
  };

  const totalProteinTarget = getTargetGrams();
  
  // Typical estimated protein from standard Indian meals
  const estimatedFoodProtein = dietType === 'pure-veg' ? 40 : dietType === 'eggetarian' ? 65 : 85;
  const proteinDeficit = Math.max(0, totalProteinTarget - estimatedFoodProtein);
  const recommendedScoops = Math.max(1, Math.ceil(proteinDeficit / 27));

  // Recommended Stack
  const getRecommendedProducts = () => {
    const isolate = products.find((p) => p.id === 'wheysted-iso-matrix') || products[0];
    const creatine = products.find((p) => p.id === 'wheysted-creatine-pure') || products[products.length - 1];
    return [
      {
        prod: isolate,
        reason: `${recommendedScoops} Scoop(s) Post-Workout for ${recommendedScoops * 27}g Pure Protein`,
      },
      {
        prod: creatine,
        reason: '3g Creapure® Daily for Power & Muscle Strength',
      },
    ];
  };

  const stack = getRecommendedProducts();

  const handleAddStack = () => {
    stack.forEach((item) => {
      onAddToCart(item.prod, item.prod.flavors[0], item.prod.weights[0]);
    });
    setAddedStack(true);
    setTimeout(() => setAddedStack(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-8 my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Indian Daily Protein Requirement Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Calibrate your daily protein intake based on your body weight and Indian diet style
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
          {/* Left Inputs */}
          <div className="space-y-4">
            {/* Weight Slider in KG */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-600" />
                  Body Weight (in KG):
                </span>
                <span className="text-sm font-black text-slate-900 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-200">
                  {weightKg} kg ({Math.round(weightKg * 2.20462)} lbs)
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={130}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Diet Style */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e01931]" />
                Current Diet Pattern:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'pure-veg', label: '100% Veg' },
                  { id: 'eggetarian', label: 'Eggetarian' },
                  { id: 'non-veg', label: 'Non-Veg' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDietType(d.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      dietType === d.id
                        ? 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/20 font-extrabold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-red-600" />
                Primary Goal:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'muscle-gain', label: 'Muscle Gain' },
                  { id: 'fat-loss', label: 'Fat Loss' },
                  { id: 'maintenance', label: 'Fitness' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      goal === g.id
                        ? 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/20 font-extrabold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Workout Frequency */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5 text-amber-600" />
                Gym / Training Frequency:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: '3-4', label: '3-4 Days' },
                  { id: '5-6', label: '5-6 Days' },
                  { id: 'daily', label: 'Everyday' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setWorkoutDays(f.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                      workoutDays === f.id
                        ? 'bg-slate-900 border-slate-900 text-white font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Calculated Targets */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-700">
                YOUR DAILY PROTEIN TARGET
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-4xl sm:text-5xl font-black text-slate-900">
                  {totalProteinTarget}g
                </span>
                <span className="text-xs text-slate-500 font-bold">Protein / Day</span>
              </div>
              <div className="mt-2 text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                <div>• Food Intake (Dal/Paneer/Meals): ~<strong>{estimatedFoodProtein}g</strong></div>
                <div>• Deficit Needed from Wheysted: <strong className="text-red-700">~{proteinDeficit}g ({recommendedScoops} scoop{recommendedScoops > 1 ? 's' : ''})</strong></div>
              </div>
            </div>

            {/* Recommended Stack */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Recommended Daily Stack:
              </span>
              {stack.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{item.prod.name}</div>
                    <div className="text-[10px] text-slate-500">{item.reason}</div>
                  </div>
                  <span className="text-xs font-extrabold text-red-700">
                    ₹{item.prod.basePrice.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddStack}
              className="w-full py-3 rounded-2xl bg-[#e01931] hover:bg-[#c8102e] text-white font-extrabold text-xs tracking-wide shadow-md shadow-red-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {addedStack ? (
                <>
                  <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                  <span>STACK ADDED TO CART!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD RECOMMENDED STACK TO CART</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
