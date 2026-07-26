import React, { useState } from 'react';
import { Sparkles, Download, Share2, Shield, Receipt, Users, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FeatureOverview: React.FC = () => {
  const [donorName, setDonorName] = useState('Anand Deshmukh');
  const [amount, setAmount] = useState<number>(2100);
  const [paymentMode, setPaymentMode] = useState('UPI Instant');
  const [area, setArea] = useState('Flat 402, Shiv Shahi Heights');
  const [generatedSlip, setGeneratedSlip] = useState<any>(null);

  const handleGenerateSlip = (e: React.FormEvent) => {
    e.preventDefault();
    const slipNumber = `SLIP-GANPATI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSlip = {
      slipNumber,
      donorName: donorName || 'Anonymous Donor',
      amount,
      paymentMode,
      area: area || 'Main Market Locality',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      collector: 'Siddhesh Shinde (Group Leader - Sector 4)',
      mandalName: 'Shree Chhatrapati Shivaji Mandal',
    };
    
    setGeneratedSlip(newSlip);
    
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF5722', '#FF9800', '#FFC107', '#4CAF50']
      });
    } catch (err) {
      console.log('Confetti triggered');
    }
  };

  return (
    <section id="feature" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#FF5722] text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 fill-[#FF5722]" />
              <span>Feature</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
              A Mandal SaaS Built <br />
              <span className="gradient-orange-text">Around You</span>
            </h2>
          </div>
          
          <p className="max-w-md text-slate-600 text-sm sm:text-base leading-relaxed">
            This modern, straightforward platform captures every vargani contribution in real-time, eliminating lost paper slips, fraud risk, and manual calculation errors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="glow-card glass-card-light p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF5722] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Receipt className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                Configurable Slip Generator
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Design digital vargani templates with custom fields (donor name, area, payment mode, shop number, custom attributes) and automatic slip numbering.
              </p>
            </div>

            <div className="glow-card glass-card-light p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                Member-Wise Collector Dashboards
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                50 to 300+ members per mandal log in from mobile to collect contributions. Track live collection progress by member, group leader, and locality area.
              </p>
            </div>

            <div className="glow-card glass-card-light p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                Audit Trail & Expense Tracking
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every slip creation, correction, and cancellation is logged with device metadata and approval rules. Manage pandal expenses and view real-time net cash balance.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
                  LIVE INTERACTIVE DEMO
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-2">
                  Test Digital Vargani Generator
                </h3>
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <form onSubmit={handleGenerateSlip} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Contributor / Donor Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter Donor Name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Address / Area / Shop No.
                  </label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="e.g. Shop 12, Market Yard"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Contribution Amount (₹)
                  </label>
                  <div className="flex gap-2">
                    {[501, 1001, 2100, 5001].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setAmount(amt)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          amount === amt
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Payment Mode
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="UPI Instant">UPI (Google Pay / PhonePe / Paytm)</option>
                    <option value="Cash Collection">Cash Collection</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Direct Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gradient-orange-bg text-white font-bold text-sm shadow-lg gradient-orange-glow hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Generate Digital Vargani Receipt Slip</span>
              </button>
            </form>

            {generatedSlip ? (
              <div className="bg-gradient-to-br from-[#1E1E28] to-[#14141E] rounded-2xl p-5 border border-orange-500/40 relative shadow-inner animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full gradient-orange-bg flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                      Slip Generated Successfully
                    </span>
                  </div>
                  <span className="font-mono text-xs text-gray-400 font-bold">
                    {generatedSlip.slipNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                  <div>
                    <div className="text-gray-400 text-[10px]">Donor Name</div>
                    <div className="font-bold text-white text-sm">{generatedSlip.donorName}</div>
                    <div className="text-gray-400 text-[10px] mt-1">{generatedSlip.area}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-[10px]">Vargani Amount</div>
                    <div className="font-heading font-extrabold text-2xl text-amber-400">
                      ₹{generatedSlip.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-emerald-400 text-[10px] font-semibold">{generatedSlip.paymentMode}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-gray-400">
                  <span>Collector: {generatedSlip.collector}</span>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1 rounded bg-orange-500/20 text-orange-400 font-bold hover:bg-orange-500/30 flex items-center gap-1">
                      <Download className="w-3 h-3" /> PDF Receipt
                    </button>
                    <button className="px-3 py-1 rounded bg-white/10 text-white font-bold hover:bg-white/20 flex items-center gap-1">
                      <Share2 className="w-3 h-3" /> Share WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 rounded-2xl p-6 text-center border border-dashed border-slate-700 text-gray-400 text-xs">
                Click "Generate Digital Vargani Receipt Slip" above to simulate instant receipt generation & confetti!
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
