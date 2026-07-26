import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'issue' | 'expense' | 'stats'>('issue');
  const [donorName, setDonorName] = useState('Rajesh Shinde');
  const [phone, setPhone] = useState('9820198201');
  const [amount, setAmount] = useState('1001');
  const [mode, setMode] = useState('UPI');
  const [isGenerated, setIsGenerated] = useState(false);

  // Expense tab state
  const [expenseTitle, setExpenseTitle] = useState('Modak & Prasad Batch');
  const [expenseAmount, setExpenseAmount] = useState('12500');
  const [expenseVendor, setVendor] = useState('Kaka Sweets');
  const [expenses, setExpenses] = useState([
    { title: 'Pandal Bamboo Structure', amount: '₹ 45,000', vendor: 'Shree Decorators', status: 'Approved' },
    { title: 'Sound & Mic System Permit', amount: '₹ 18,000', vendor: 'Rhythm Sound', status: 'Approved' },
  ]);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff5722', '#c08600', '#ffdeac', '#ffffff'],
    });
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    setExpenses([
      { title: expenseTitle, amount: `₹ ${expenseAmount}`, vendor: expenseVendor, status: 'Pending Review' },
      ...expenses,
    ]);
    setExpenseTitle('');
    setExpenseAmount('');
    setVendor('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-scale-in">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto card-warm border border-[var(--outline-variant)]/40 relative">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#1c1b1b] text-white p-6 rounded-t-3xl flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[var(--festival-orange)] text-2xl">science</span>
            <div>
              <h3 className="font-headline-sm text-white">Digital Vargani Interactive Sandbox</h3>
              <p className="text-xs text-white/70">Test real-time slip generation and mandal expense audit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[var(--outline-variant)]/30 px-6 pt-4 bg-[var(--surface-container-low)] gap-3">
          <button
            onClick={() => setActiveTab('issue')}
            className={`px-5 py-2.5 rounded-t-xl font-label-md transition-all ${
              activeTab === 'issue'
                ? 'bg-white text-[var(--festival-orange)] border-t-2 border-[var(--festival-orange)] shadow-sm'
                : 'text-[var(--on-surface-variant)] hover:text-[var(--charcoal)]'
            }`}
          >
            1. Issue Slip (Field Member)
          </button>
          <button
            onClick={() => setActiveTab('expense')}
            className={`px-5 py-2.5 rounded-t-xl font-label-md transition-all ${
              activeTab === 'expense'
                ? 'bg-white text-[var(--festival-orange)] border-t-2 border-[var(--festival-orange)] shadow-sm'
                : 'text-[var(--on-surface-variant)] hover:text-[var(--charcoal)]'
            }`}
          >
            2. Mandal Expense Log
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-5 py-2.5 rounded-t-xl font-label-md transition-all ${
              activeTab === 'stats'
                ? 'bg-white text-[var(--festival-orange)] border-t-2 border-[var(--festival-orange)] shadow-sm'
                : 'text-[var(--on-surface-variant)] hover:text-[var(--charcoal)]'
            }`}
          >
            3. Live Dashboard Tally
          </button>
        </div>

        {/* Tab 1: Issue Slip */}
        {activeTab === 'issue' && (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-label-md text-[var(--charcoal)] mb-1">Donor Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--outline-variant)] focus:outline-none focus:border-[var(--festival-orange)] text-sm font-body-md"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-label-md text-[var(--charcoal)] mb-1">Mobile Number (WhatsApp)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--outline-variant)] focus:outline-none focus:border-[var(--festival-orange)] text-sm font-body-md"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-label-md text-[var(--charcoal)] mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--outline-variant)] focus:outline-none focus:border-[var(--festival-orange)] text-sm font-body-md font-bold text-[var(--festival-orange)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-label-md text-[var(--charcoal)] mb-1">Payment Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--outline-variant)] focus:outline-none focus:border-[var(--festival-orange)] text-sm font-body-md bg-white"
                  >
                    <option value="UPI">UPI Direct</option>
                    <option value="Cash">Cash Handover</option>
                    <option value="Cheque">Bank Cheque</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-label-md text-white shadow-md hover-lift transition-all"
                style={{ backgroundColor: 'var(--festival-orange)' }}
              >
                Generate &amp; Send WhatsApp Slip
              </button>
            </form>

            {/* Slip Preview Box */}
            <div className="bg-[var(--surface-container-low)] p-6 rounded-2xl border border-[var(--outline-variant)]/40 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center pb-3 mb-3 border-b border-[var(--outline-variant)]/30 text-xs font-label-sm text-[var(--on-surface-variant)]">
                  <span>Lalbaugcha Raja Mandal</span>
                  <span className="text-green-700 font-bold">LIVE PREVIEW</span>
                </div>

                {isGenerated ? (
                  <div className="space-y-3 bg-white p-5 rounded-xl border border-green-200 shadow-sm animate-scale-in">
                    <div className="flex items-center gap-2 text-green-700 font-label-md text-sm">
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      Receipt #VG-2026-9041 Generated
                    </div>

                    <div className="text-2xl font-display-lg text-[var(--charcoal)]">{donorName}</div>
                    <div className="text-3xl font-display-lg text-[var(--festival-orange)]">₹ {amount}</div>

                    <div className="text-xs text-[var(--on-surface-variant)] space-y-1 font-body-md pt-2 border-t border-gray-100">
                      <div>Phone: +91 {phone}</div>
                      <div>Mode: {mode} Direct</div>
                      <div>Date: {new Date().toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-[var(--on-surface-variant)]">
                    Fill the form on the left to simulate instant slip creation.
                  </div>
                )}
              </div>

              <div className="pt-4 text-center">
                <span className="text-[11px] text-[var(--on-surface-variant)]">
                  Simulating WhatsApp API dispatch &amp; SMS delivery pipeline
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Expense Log */}
        {activeTab === 'expense' && (
          <div className="p-8 space-y-6">
            <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-[var(--surface-container-low)] p-4 rounded-2xl border border-[var(--outline-variant)]/40">
              <div>
                <label className="block text-xs font-label-md text-[var(--charcoal)] mb-1">Expense Title</label>
                <input
                  type="text"
                  placeholder="e.g. Modak Prasad"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--outline-variant)] text-xs font-body-md"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-label-md text-[var(--charcoal)] mb-1">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="12500"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--outline-variant)] text-xs font-body-md font-bold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-label-md text-[var(--charcoal)] mb-1">Vendor / Payee</label>
                <input
                  type="text"
                  placeholder="Kaka Sweets"
                  value={expenseVendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--outline-variant)] text-xs font-body-md"
                  required
                />
              </div>
              <button
                type="submit"
                className="py-2.5 rounded-xl font-label-md text-white text-xs shadow-sm"
                style={{ backgroundColor: 'var(--festival-orange)' }}
              >
                Log Expense Voucher
              </button>
            </form>

            <div className="space-y-3">
              <h4 className="font-headline-sm text-sm text-[var(--charcoal)]">Mandal Expense Audit Ledger</h4>
              <div className="bg-white rounded-2xl border border-[var(--outline-variant)]/40 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[var(--surface-container)]">
                    <tr>
                      <th className="p-3 font-label-md">Item Description</th>
                      <th className="p-3 font-label-md">Vendor</th>
                      <th className="p-3 font-label-md">Amount</th>
                      <th className="p-3 font-label-md">Audit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {expenses.map((exp, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="p-3 font-semibold text-[var(--charcoal)]">{exp.title}</td>
                        <td className="p-3 text-[var(--on-surface-variant)]">{exp.vendor}</td>
                        <td className="p-3 font-bold text-[var(--festival-deep)]">{exp.amount}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-label-sm bg-yellow-100 text-yellow-800">
                            {exp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Live Dashboard Tally */}
        {activeTab === 'stats' && (
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl card-warm border-t-4 border-[var(--festival-orange)]">
                <div className="text-xs font-label-sm text-[var(--on-surface-variant)]">Total Vargani Collected</div>
                <div className="text-3xl font-display-lg text-[var(--festival-orange)] mt-2">₹ 4,82,500</div>
                <div className="text-[11px] text-green-700 mt-1 font-label-md">↑ +18% vs Last Festival</div>
              </div>

              <div className="bg-white p-6 rounded-2xl card-warm border-t-4 border-[var(--marigold-deep)]">
                <div className="text-xs font-label-sm text-[var(--on-surface-variant)]">Receipt Slips Issued</div>
                <div className="text-3xl font-display-lg text-[var(--charcoal)] mt-2">842 Slips</div>
                <div className="text-[11px] text-[var(--on-surface-variant)] mt-1 font-label-md">Avg ₹573 / slip</div>
              </div>

              <div className="bg-white p-6 rounded-2xl card-warm border-t-4 border-[var(--secondary)]">
                <div className="text-xs font-label-sm text-[var(--on-surface-variant)]">Active Field Collectors</div>
                <div className="text-3xl font-display-lg text-[var(--charcoal)] mt-2">48 Volunteers</div>
                <div className="text-[11px] text-[var(--on-surface-variant)] mt-1 font-label-md">Peak speed: 42 slips/hr</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-6 bg-[var(--surface-container-low)] rounded-b-3xl border-t border-[var(--outline-variant)]/30 flex justify-between items-center text-xs">
          <span className="text-[var(--on-surface-variant)]">
            Digital Mandal Sandbox — Multi-tenant Audit Engine
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[var(--charcoal)] text-white font-label-md hover:bg-black transition-colors"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
};
