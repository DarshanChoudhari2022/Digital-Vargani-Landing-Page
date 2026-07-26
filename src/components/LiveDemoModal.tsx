import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'collect' | 'expense'>('collect');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'upi' | 'cash'>('upi');
  
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const [tally, setTally] = useState(145000);
  const [recent, setRecent] = useState([
    { name: 'Rahul Deshmukh', amount: 5001, type: 'in', time: 'Just now' }
  ]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f97316', '#fb923c', '#fdba74']
    });
  };

  const handleCollectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !name) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTally(prev => prev + parseInt(amount));
      setRecent(prev => [{ name, amount: parseInt(amount), type: 'in', time: 'Just now' }, ...prev].slice(0, 3));
      fireConfetti();
      setSuccessMsg(`Successfully collected ₹${amount} from ${name}`);
      setAmount('');
      setName('');
      setPhone('');
      
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 800);
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseAmount || !expenseTitle) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTally(prev => prev - parseInt(expenseAmount));
      setRecent(prev => [{ name: expenseTitle, amount: parseInt(expenseAmount), type: 'out', time: 'Just now' }, ...prev].slice(0, 3));
      setSuccessMsg(`Logged expense: ${expenseTitle} for ₹${expenseAmount}`);
      setExpenseAmount('');
      setExpenseTitle('');
      
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 800);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-up"
      onClick={handleBackdropClick}
    >
      <div className="bg-[var(--surface-50)] rounded-3xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden shadow-2xl relative my-auto animate-scale-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[var(--charcoal-500)] hover:text-[var(--charcoal-900)] saas-shadow transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Left Side: Real-time Dashboard */}
        <div className="md:w-5/12 bg-[var(--charcoal-900)] p-8 text-white flex flex-col justify-center relative overflow-hidden">
           {/* Abstract Glow */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--festival-orange)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

           <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white mb-8 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Live Demo Environment
              </div>

              <div className="mb-10">
                <div className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Total Mandal Balance</div>
                <div className="font-display-lg text-white tabular-nums tracking-tight">
                  ₹ {tally.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                <div className="text-sm font-medium text-slate-300 mb-4">Recent Activity</div>
                <div className="space-y-4">
                  {recent.map((item, i) => (
                    <div key={i} className="flex justify-between items-center animate-fade-up">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'in' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          <span className="material-symbols-outlined text-[16px]">
                            {item.type === 'in' ? 'arrow_downward' : 'arrow_upward'}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-400">{item.time}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-semibold tabular-nums ${item.type === 'in' ? 'text-green-400' : 'text-red-400'}`}>
                        {item.type === 'in' ? '+' : '-'} ₹{item.amount.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>

        {/* Right Side: Interactive Forms */}
        <div className="md:w-7/12 bg-white p-8 sm:p-12">
          
          <div className="flex gap-2 mb-8 bg-[var(--surface-100)] p-1.5 rounded-xl">
            <button 
              onClick={() => setActiveTab('collect')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'collect' 
                  ? 'bg-white text-[var(--charcoal-900)] saas-shadow' 
                  : 'text-[var(--charcoal-500)] hover:text-[var(--charcoal-900)]'
              }`}
            >
              Collect Vargani
            </button>
            <button 
              onClick={() => setActiveTab('expense')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'expense' 
                  ? 'bg-white text-[var(--charcoal-900)] saas-shadow' 
                  : 'text-[var(--charcoal-500)] hover:text-[var(--charcoal-900)]'
              }`}
            >
              Log Expense
            </button>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl flex items-center gap-3 animate-scale-in">
              <span className="material-symbols-outlined text-green-500">check_circle</span>
              <span className="text-sm font-medium">{successMsg}</span>
            </div>
          )}

          {activeTab === 'collect' ? (
            <form onSubmit={handleCollectSubmit} className="space-y-5 animate-fade-up">
              <div>
                <label className="block text-sm font-semibold text-[var(--charcoal-700)] mb-2">Contribution Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 5001"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full bg-[var(--surface-50)] border border-[var(--surface-200)] px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--festival-orange)] focus:ring-2 focus:ring-[var(--festival-orange)]/20 transition-all font-body-md text-[var(--charcoal-900)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--charcoal-700)] mb-2">Donor Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[var(--surface-50)] border border-[var(--surface-200)] px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--festival-orange)] focus:ring-2 focus:ring-[var(--festival-orange)]/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--charcoal-700)] mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="For WhatsApp receipt"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-[var(--surface-50)] border border-[var(--surface-200)] px-4 py-3 rounded-xl focus:outline-none focus:border-[var(--festival-orange)] focus:ring-2 focus:ring-[var(--festival-orange)]/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--charcoal-700)] mb-2">Payment Mode</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    mode === 'upi' ? 'border-[var(--festival-orange)] bg-[var(--festival-orange-subtle)] text-[var(--festival-orange-hover)]' : 'border-[var(--surface-200)] text-[var(--charcoal-600)] hover:bg-[var(--surface-50)]'
                  }`}>
                    <input type="radio" name="mode" className="hidden" checked={mode === 'upi'} onChange={() => setMode('upi')} />
                    <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                    <span className="font-medium text-sm">UPI</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                    mode === 'cash' ? 'border-[var(--festival-orange)] bg-[var(--festival-orange-subtle)] text-[var(--festival-orange-hover)]' : 'border-[var(--surface-200)] text-[var(--charcoal-600)] hover:bg-[var(--surface-50)]'
                  }`}>
                    <input type="radio" name="mode" className="hidden" checked={mode === 'cash'} onChange={() => setMode('cash')} />
                    <span className="material-symbols-outlined text-[20px]">payments</span>
                    <span className="font-medium text-sm">Cash</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[var(--festival-orange)] hover:bg-[var(--festival-orange-hover)] text-white py-4 rounded-xl font-semibold text-base transition-colors saas-shadow mt-4 disabled:opacity-70 flex justify-center items-center h-[56px]"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Generate Vargani Slip'}
              </button>
              <p className="text-center text-[11px] text-[var(--charcoal-500)] mt-3 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Demo mode: No actual data is saved.
              </p>
            </form>
          ) : (
            <form onSubmit={handleExpenseSubmit} className="space-y-5 animate-fade-up">
               <div>
                <label className="block text-sm font-semibold text-[var(--charcoal-700)] mb-2">Expense Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 15000"
                  value={expenseAmount}
                  onChange={e => setExpenseAmount(e.target.value)}
                  className="w-full bg-[var(--surface-50)] border border-[var(--surface-200)] px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all font-body-md text-[var(--charcoal-900)]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--charcoal-700)] mb-2">Expense Description</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mandap Decoration Advance"
                  value={expenseTitle}
                  onChange={e => setExpenseTitle(e.target.value)}
                  className="w-full bg-[var(--surface-50)] border border-[var(--surface-200)] px-4 py-3 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-semibold text-base transition-colors saas-shadow mt-4 disabled:opacity-70 flex justify-center items-center h-[56px]"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Log Expense & Update Tally'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
