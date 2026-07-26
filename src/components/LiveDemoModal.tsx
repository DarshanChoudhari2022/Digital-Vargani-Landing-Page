import React, { useState } from 'react';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({ isOpen, onClose }) => {
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'Cash' | 'UPI' | 'Bank Transfer'>('Cash');
  const [generated, setGenerated] = useState(false);

  const slipNumber = `JGM-2026-${String(Math.floor(Math.random() * 900 + 100))}`;

  const handleGenerate = () => {
    if (donorName.trim() && amount.trim()) {
      setGenerated(true);
    }
  };

  const handleReset = () => {
    setDonorName('');
    setAmount('');
    setMode('Cash');
    setGenerated(false);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(26, 26, 46, 0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        className="anim-scale-in"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--white)', borderRadius: 20,
          width: '100%', maxWidth: 440,
          boxShadow: 'var(--shadow-elevated)',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border-light)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>Interactive Demo</div>
            <div className="t-caption">Generate a sample vargani slip</div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--cream)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 24 }}>
          {!generated ? (
            <>
              {/* Donor Name */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                  Donor Name
                </label>
                <input
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="e.g. Suresh Patil"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 'var(--r-input)',
                    border: '1px solid var(--border)', fontSize: 15,
                    fontFamily: 'var(--font-body)', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--saffron)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Amount */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>
                  Amount (₹)
                </label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 5001"
                  type="number"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 'var(--r-input)',
                    border: '1px solid var(--border)', fontSize: 15,
                    fontFamily: 'var(--font-body)', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--saffron)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Payment Mode */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                  Payment Mode
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(['Cash', 'UPI', 'Bank Transfer'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      style={{
                        flex: 1, padding: '10px 12px', borderRadius: 8, border: 'none',
                        cursor: 'pointer', fontSize: 13, fontWeight: 600,
                        transition: 'all 0.2s',
                        background: mode === m ? 'var(--saffron)' : 'var(--cream)',
                        color: mode === m ? 'white' : 'var(--body)',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: 15, opacity: donorName && amount ? 1 : 0.5 }}
                disabled={!donorName || !amount}
              >
                Generate Vargani Slip
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>receipt_long</span>
              </button>
            </>
          ) : (
            /* Generated Receipt */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: '#e8f5e9', color: 'var(--success)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '8px auto 16px',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>check_circle</span>
              </div>

              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                Slip Generated!
              </div>
              <div className="t-caption" style={{ marginBottom: 24 }}>
                Receipt sent via WhatsApp
              </div>

              {/* Receipt card */}
              <div style={{
                background: 'var(--cream)', border: '1px solid var(--border)',
                borderRadius: 14, padding: 20, textAlign: 'left', marginBottom: 24,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--saffron-dark)' }}>Jai Ganesh Mandal</div>
                  <div className="t-caption" style={{ fontSize: 11 }}>{slipNumber}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px', fontSize: 14 }}>
                  <div>
                    <div className="t-caption" style={{ fontSize: 11, marginBottom: 2 }}>Donor</div>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{donorName}</div>
                  </div>
                  <div>
                    <div className="t-caption" style={{ fontSize: 11, marginBottom: 2 }}>Amount</div>
                    <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 18, fontFamily: 'var(--font-display)' }}>₹ {Number(amount).toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="t-caption" style={{ fontSize: 11, marginBottom: 2 }}>Mode</div>
                    <div style={{ fontWeight: 500, color: 'var(--ink)' }}>{mode}</div>
                  </div>
                  <div>
                    <div className="t-caption" style={{ fontSize: 11, marginBottom: 2 }}>Date</div>
                    <div style={{ fontWeight: 500, color: 'var(--ink)' }}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="btn-secondary"
                style={{ width: '100%', padding: '12px' }}
              >
                Generate Another Slip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
