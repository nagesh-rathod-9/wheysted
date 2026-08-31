import React from 'react';
import { Check, X, Award } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Protein Content per 30g Scoop',
      wheysted: '27.2g (90.7% Pure Isolate)',
      others: '21g - 24g (65-75% generic blends)',
      highlight: true,
    },
    {
      feature: 'Digestion & Gastric Comfort',
      wheysted: 'DigeZyme® 5-Enzyme Blend (Zero Bloat)',
      others: 'No enzymes (Causes heavy gas & bloating)',
      highlight: true,
    },
    {
      feature: 'Filtration Method',
      wheysted: 'Cross-Flow Cold Microfiltration (CFM at 4°C)',
      others: 'High-Heat Ion Exchange (Denatures protein)',
      highlight: true,
    },
    {
      feature: 'Authenticity & Batch Lab Testing',
      wheysted: 'Scratch QR on Every Tub + Public NABL Lab CoA',
      others: 'Generic stickers / Untracked batch tests',
      highlight: false,
    },
    {
      feature: 'Sweeteners & Fillers',
      wheysted: 'Stevia & Botanical extracts (0g Added Sugar)',
      others: 'Excess artificial sweeteners & maltodextrin',
      highlight: false,
    },
    {
      feature: 'Dietary Standard',
      wheysted: '100% Vegetarian 🟢 • FSSAI Approved',
      others: 'Often mixed with uncertified animal rennet',
      highlight: false,
    },
    {
      feature: 'Shaker Mixability',
      wheysted: '< 5 Seconds Instant Mix (Zero Clumps)',
      others: '20-30 seconds with persistent lumps',
      highlight: false,
    },
  ];

  return (
    <section id="comparison-lab" className="py-16 sm:py-24 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-200">
            Real Lab Comparison
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Wheysted vs Ordinary Market Whey
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Compare our pure cold-filtered formulation against ordinary commodity powders available in the Indian market.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 sm:p-5 text-xs font-bold text-slate-700 uppercase tracking-wider w-2/5">
                    Specification
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-black text-red-900 uppercase tracking-wider bg-red-50/80 w-1/3 border-x border-red-200">
                    <div className="flex items-center gap-1.5 text-red-700 font-extrabold">
                      <Award className="w-4 h-4 text-red-600" />
                      <span>WHEYSTED INDIA FORMULA</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                    Ordinary Market Whey
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      row.highlight ? 'bg-slate-50/40' : ''
                    }`}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">{row.feature}</td>
                    <td className="p-4 sm:p-5 font-extrabold text-slate-900 bg-red-50/20 border-x border-red-200/80">
                      <div className="flex items-center gap-2 text-red-700">
                        <Check className="w-4 h-4 text-red-600 shrink-0 stroke-[3]" />
                        <span>{row.wheysted}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500 font-medium">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
