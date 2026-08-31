import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Heart,
  QrCode,
  FileCheck,
} from 'lucide-react';
import { Product } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface ExplodedScienceSectionProps {
  product: Product;
}

export const ExplodedScienceSection: React.FC<ExplodedScienceSectionProps> = ({ product }) => {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const purityPillars = [
    {
      id: 'cfm-core',
      number: '01',
      title: 'Sub-Zero CFM Cold-Microfiltration',
      subtitle: 'Native Peptide Protection at 4°C',
      description:
        'Unlike cheap high-heat or acid-ion whey processes that denature proteins, our sub-zero ceramic filtration preserves natural bioactive immunoglobulins, lactoferrin, and glycomacropeptides for maximum muscle uptake.',
      stat: '90.8%',
      statLabel: 'Pure Protein Yield',
      icon: ShieldCheck,
      color: '#e01931',
      bgColor: '#fef2f2',
      borderColor: '#fecaca',
    },
    {
      id: 'digezyme-shield',
      number: '02',
      title: 'DigeZyme® 5-Digestive Enzyme Blend',
      subtitle: 'Zero Bloating & Effortless Digestion',
      description:
        'Formulated specifically for Indian digestion with 5 essential enzymes (Protease, Amylase, Lipase, Lactase, and Cellulase). Pre-breaks protein chains so you never experience gastric heaviness, gas, or acne breakouts.',
      stat: '0.0%',
      statLabel: 'Stomach Distress',
      icon: Heart,
      color: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#fecaca',
    },
    {
      id: 'leucine-matrix',
      number: '03',
      title: '6.4g BCAAs & 3.1g Leucine Trigger',
      subtitle: 'Precision Anabolic mTOR Muscle Synthesis',
      description:
        'Every single 30g scoop delivers the clinically validated threshold of 3.1g free-form L-Leucine and 6.4g total BCAAs in a 2:1:1 ratio to jumpstart muscle protein synthesis immediately after your workout.',
      stat: '6.4g',
      statLabel: 'BCAAs per Scoop',
      icon: Zap,
      color: '#d97706',
      bgColor: '#fffbeb',
      borderColor: '#fde68a',
    },
    {
      id: 'nabl-tested',
      number: '04',
      title: 'NABL 3rd-Party Lab Verified per Batch',
      subtitle: 'Zero Heavy Metals & Zero Amino Spiking',
      description:
        'We publish third-party laboratory Certificate of Analysis (CoA) for every production batch. Guaranteed zero lead, mercury, arsenic, or cheap glycine/taurine amino spiking.',
      stat: '100%',
      statLabel: 'Batch Transparency',
      icon: FileCheck,
      color: '#991b1b',
      bgColor: '#fef2f2',
      borderColor: '#fecaca',
    },
  ];

  const activePillar = purityPillars[activePillarIndex];

  return (
    <section
      id="science-purity"
      className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-md bg-red-50 text-red-700 border border-red-200">
            The Wheysted Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Why Indian Lifters Trust Wheysted
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            No marketing gimmicks or hidden proprietary blends. Just pure, cold-filtered protein engineered for maximum biological absorption.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Active Highlight Box & Packshot */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Purity Pillar {activePillar.number}
                </span>
                <span
                  className="text-xs font-black px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: activePillar.bgColor, color: activePillar.color }}
                >
                  {activePillar.statLabel}: {activePillar.stat}
                </span>
              </div>

              {/* High-res Image of Clean Protein Jar */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 p-4 flex items-center justify-center border border-slate-200/80">
                <img
                  src={product.pinterestImages[0]}
                  alt={activePillar.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="max-h-[220px] object-contain drop-shadow-md"
                />
              </div>

              {/* Pillar Title & Expanded Explanation */}
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {activePillar.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {activePillar.description}
                </p>
              </div>

              {/* FSSAI & Scratch code assurance */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-red-600" />
                  <span>100% Authentic Indian Stock</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>FSSAI Lic. #10021064000128</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Interactive Pillar Cards */}
          <div className="lg:col-span-7 space-y-3">
            {purityPillars.map((pillar, index) => {
              const isCurrent = activePillarIndex === index;
              const IconComp = pillar.icon;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillarIndex(index)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isCurrent
                      ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/20'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                        style={{
                          backgroundColor: pillar.bgColor,
                          color: pillar.color,
                          border: `1px solid ${pillar.borderColor}`,
                        }}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[11px] font-black uppercase tracking-wider"
                            style={{ color: pillar.color }}
                          >
                            STEP {pillar.number}
                          </span>
                          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                            • {pillar.subtitle}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base sm:text-lg font-black text-slate-900">
                        {pillar.stat}
                      </div>
                      <div className="text-[9px] text-slate-500 uppercase font-semibold">
                        {pillar.statLabel}
                      </div>
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed sm:hidden">
                      {pillar.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
