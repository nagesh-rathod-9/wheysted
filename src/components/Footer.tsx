import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Send,
  MapPin,
} from 'lucide-react';
import { WheystedLogo } from './WheystedLogo';

export const Footer: React.FC = () => {
  const [batchCode, setBatchCode] = useState('');
  const [batchResult, setBatchResult] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleVerifyBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchCode.trim()) return;
    setBatchResult(
      `✓ Batch ${batchCode.toUpperCase()} PASS: 90.8% Protein content verified by NABL Accredited Eurofins Lab. Zero Heavy Metals (Lead/Hg: Nil). Zero Amino Spiking detected.`
    );
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs relative overflow-hidden">
      {/* Top Banner: Lab Certificate Lookup & Offers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pb-12 border-b border-slate-800">
          {/* Certificate Verification Lookup */}
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold tracking-wide">
                AUTHENTICITY & BATCH LAB REPORT LOOKUP
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Enter the batch code printed on the bottom of your Wheysted tub to verify its official NABL 3rd-party lab Certificate of Analysis (CoA).
            </p>
            <form onSubmit={handleVerifyBatch} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. WHEY-2026-IN"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white uppercase placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#e01931] hover:bg-[#c8102e] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Verify Batch
              </button>
            </form>
            {batchResult && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-semibold animate-fadeIn">
                {batchResult}
              </div>
            )}
          </div>

          {/* Special Offers Newsletter */}
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold tracking-wide">
                JOIN THE WHEYSTED SQUAD & GET ₹300 OFF
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Subscribe for flash restock alerts on limited flavors (Kesar Pista, Mango Lassi), free diet advice, and exclusive gym member discounts.
            </p>
            {newsletterSubmitted ? (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-semibold animate-fadeIn flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-400" />
                <span>You're in! Use coupon <strong>FIRSTORDER</strong> for ₹300 off your cart today.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email ID"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#e01931] hover:bg-[#c8102e] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Claim ₹300</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <WheystedLogo className="h-7 w-auto" />
              <div className="w-3 h-3 rounded border border-emerald-400 p-0.5 flex items-center justify-center ml-1" title="100% Vegetarian">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's cleanest sports nutrition. 100% cold-filtered CFM whey protein isolates, plant protein, and Creapure® creatine for true natural strength.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                <span>FSSAI Central Lic. #10021064000128</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>Made in India • Shipped from Mumbai & Bengaluru</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Our Range</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#shop-catalog" className="hover:text-red-400 transition-colors">
                  CFM Whey Protein Isolate
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-red-400 transition-colors">
                  Raw Whey Protein 80%
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-red-400 transition-colors">
                  Clear Whey Refreshing Juice
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-red-400 transition-colors">
                  Organic Plant Vegan Protein
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-red-400 transition-colors">
                  Creapure® German Creatine
                </a>
              </li>
              <li>
                <a href="#shop-catalog" className="hover:text-red-400 transition-colors">
                  Clean Mass Gainer Complex
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Desi Flavours</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#flavor-lab" className="hover:text-red-400 transition-colors">
                  Kesar Pista Shahi Kulfi
                </a>
              </li>
              <li>
                <a href="#flavor-lab" className="hover:text-red-400 transition-colors">
                  Ratnagiri Alphonso Mango
                </a>
              </li>
              <li>
                <a href="#flavor-lab" className="hover:text-red-400 transition-colors">
                  South Indian Filter Coffee
                </a>
              </li>
              <li>
                <a href="#flavor-lab" className="hover:text-red-400 transition-colors">
                  Belgian Dark Chocolate
                </a>
              </li>
              <li>
                <a href="#flavor-lab" className="hover:text-red-400 transition-colors">
                  Malai Kulfi & Rabri
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Customer Support</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>✓ <strong>Free Express Delivery</strong> on all orders ₹999+</p>
              <p>✓ <strong>COD & UPI Available</strong> with Instant 5% Extra Off</p>
              <p>✓ <strong>Helpline:</strong> +91 98765 43210 (Mon-Sat, 9am - 7pm IST)</p>
              <p>✓ <strong>Email:</strong> support@wheysted.in</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} WHEYSTED NUTRITION INDIA PVT. LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-300 cursor-pointer">FSSAI Compliance</span>
            <span className="hover:text-slate-300 cursor-pointer">Track Consignment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
