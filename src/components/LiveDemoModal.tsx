import React, { useState } from 'react';
import { X, Zap, Download, Share2, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'dashboard' | 'expenses'>('generator');
  
  const [mandalName, setMandalName] = useState('Lalbaugcha Raja Mandal 2026');
  const [donorName, setDonorName] = useState('Vijay Kolhe');
  const [mobile, setMobile] = useState('9820198201');
  const [amount, setAmount] = useState<number>(5001);
  const [paymentMode, setPaymentMode] = useState('UPI Instant');
  const [area, setArea] = useState('Shop #14, Diamond Market');
  const [customFieldValue, setCustomFieldValue] = useState('Gold Sponsor Tag');
  
  const [generatedSlip, setGeneratedSlip] = useState<any>({
    slipNumber: 'SLIP-LRM-2026-9812',
    mandalName: 'Lalbaugcha Raja Mandal 2026',
    donorName: 'Vijay Kolhe',
    mobile: '9820198201',
    amount: 5001,
    paymentMode: 'UPI Instant',
    area: 'Shop #14, Diamond Market',
    customField: 'Gold Sponsor Tag',
    collector: 'Rahul Sharma (Group Leader - Sec 2)',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
  });

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlip = {
      slipNumber: `SLIP-LRM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      mandalName,
      donorName: donorName || 'Anonymous Contributor',
      mobile: mobile || 'N/A',
      amount,
      paymentMode,
      area: area || 'Locality Central Area',
      customField: customFieldValue,
      collector: 'Rahul Sharma (Group Leader - Sec 2)',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    setGeneratedSlip(newSlip);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#FF5722', '#FF9800', '#4CAF50', '#2196F3']
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121218] text-white w-full max-w-4xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1A1A24]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-orange-bg flex items-center justify-center text-white font-bold text-sm">
              ⚡
            </div>
            <div>
              <div className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                Digital Vargani Live Simulator
              </div>
              <h3 className="font-heading font-extrabold text-xl text-white">
                Mandal Operations Control Panel
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-white/10 bg-[#161620] px-6">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'generator'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Slip Generator & Receipt
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'dashboard'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Member & Area Dashboard
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-5 py-3 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'expenses'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Mandal Expense Reconciler
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'generator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <form onSubmit={handleGenerate} className="lg:col-span-6 space-y-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Create Vargani Contribution Slip
                </div>

                <div>
                  <label className="block text-[11px] text-gray-300 font-semibold mb-1">Mandal Name</label>
                  <input
                    type="text"
                    value={mandalName}
                    onChange={(e) => setMandalName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-300 font-semibold mb-1">Donor / Shop Name</label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-300 font-semibold mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-300 font-semibold mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-300 font-semibold mb-1">Payment Mode</label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                    >
                      <option value="UPI Instant">UPI Instant</option>
                      <option value="Cash Collection">Cash Collection</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-300 font-semibold mb-1">Address / Street Area</label>
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-300 font-semibold mb-1">Custom Slip Field Tag</label>
                  <input
                    type="text"
                    value={customFieldValue}
                    onChange={(e) => setCustomFieldValue(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gradient-orange-bg text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 hover:opacity-95"
                >
                  <Zap className="w-4 h-4" /> Issue Numbered Vargani Slip
                </button>
              </form>

              <div className="lg:col-span-6 flex flex-col justify-between bg-[#181822] p-5 rounded-2xl border border-orange-500/30">
                <div className="border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span className="font-bold text-orange-400">{generatedSlip.mandalName}</span>
                    <span className="font-mono bg-black/40 px-2 py-0.5 rounded text-[10px] text-white border border-white/10">
                      {generatedSlip.slipNumber}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500">Official Ganpati Festival Vargani Pass</div>
                </div>

                <div className="bg-gradient-to-r from-[#FF5722] to-[#FF8C00] p-4 rounded-xl text-white shadow-md space-y-3 mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[10px] uppercase text-white/80">Contributor</div>
                      <div className="font-bold text-base">{generatedSlip.donorName}</div>
                      <div className="text-[10px] text-white/80">{generatedSlip.area}</div>
                    </div>
                    <div className="w-10 h-10 rounded bg-white/20 p-1 flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-2 border-t border-white/20">
                    <div>
                      <div className="text-[9px] uppercase text-white/70">Payment</div>
                      <div className="text-xs font-bold text-amber-200">{generatedSlip.paymentMode}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase text-white/70">Vargani Amount</div>
                      <div className="font-extrabold text-2xl">₹{Number(generatedSlip.amount).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] text-gray-300 mb-4 bg-slate-800/50 p-3 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Collector Member:</span>
                    <span className="font-semibold">{generatedSlip.collector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="font-mono text-[10px]">{generatedSlip.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Custom Tag:</span>
                    <span className="text-orange-400 font-semibold">{generatedSlip.customField}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-600">
                    <Download className="w-3.5 h-3.5" /> PDF Slip
                  </button>
                  <button className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-700">
                    <Share2 className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#1A1A24] p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400">Total Vargani Collected</div>
                  <div className="text-2xl font-extrabold text-amber-400 mt-1">₹12,84,500</div>
                  <div className="text-[10px] text-emerald-400 mt-1">+18% vs yesterday</div>
                </div>
                <div className="bg-[#1A1A24] p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400">Total Digital Slips</div>
                  <div className="text-2xl font-extrabold text-white mt-1">1,480 Slips</div>
                  <div className="text-[10px] text-gray-400 mt-1">Avg ₹867 / slip</div>
                </div>
                <div className="bg-[#1A1A24] p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400">Active Field Members</div>
                  <div className="text-2xl font-extrabold text-orange-400 mt-1">32 Collectors</div>
                  <div className="text-[10px] text-gray-400 mt-1">4 Active Groups</div>
                </div>
              </div>

              <div className="bg-[#1A1A24] p-4 rounded-xl border border-white/10">
                <div className="text-xs font-bold text-white mb-3">Group-wise Collection Summary</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                    <span>Group 1 (Main Market Area)</span>
                    <span className="font-bold text-emerald-400">₹4,85,000 (420 slips)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                    <span>Group 2 (Residential Towers)</span>
                    <span className="font-bold text-emerald-400">₹3,90,000 (510 slips)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                    <span>Group 3 (Station Road & Shops)</span>
                    <span className="font-bold text-emerald-400">₹4,09,500 (550 slips)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-4">
              <div className="bg-[#1A1A24] p-4 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <div className="text-xs text-gray-400">Net Mandal Balance</div>
                  <div className="text-2xl font-extrabold text-emerald-400">₹7,64,500</div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-gray-400">Total Expenses: <span className="text-rose-400 font-bold">₹5,20,000</span></div>
                  <div className="text-gray-400">Total Vargani: <span className="text-amber-400 font-bold">₹12,84,500</span></div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-xs font-bold text-white mb-2">Approved Mandal Expenses</div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex justify-between">
                  <div>
                    <div className="font-bold text-white">Grand Pandal & Stage Mandap</div>
                    <div className="text-[10px] text-gray-400">Vendor: Mahalakshmi Decorators • Approved by Admin</div>
                  </div>
                  <span className="font-bold text-rose-400">₹2,80,000</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex justify-between">
                  <div>
                    <div className="font-bold text-white">Sound System & LED Screen</div>
                    <div className="text-[10px] text-gray-400">Vendor: Sai Electronics • Approved by Khajindar</div>
                  </div>
                  <span className="font-bold text-rose-400">₹1,40,000</span>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex justify-between">
                  <div>
                    <div className="font-bold text-white">Daily Modak & Maha Prasad</div>
                    <div className="text-[10px] text-gray-400">Vendor: Catering Team • Approved by Admin</div>
                  </div>
                  <span className="font-bold text-rose-400">₹1,00,000</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
