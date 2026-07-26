import React from 'react';

export const ProductShowcases: React.FC = () => {
  return (
    <div id="product">
      {/* Showcase 1: Instant Digital Receipts */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-main">
          <div className="showcase-grid" style={{ display: 'grid', gap: 64, alignItems: 'center' }}>
            {/* Copy */}
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>VARGANI COLLECTION</div>
              <h2 className="t-h2" style={{ marginBottom: 20 }}>
                One tap. One receipt.<br />Sent via WhatsApp in 10 seconds.
              </h2>
              <p className="t-body-lg" style={{ marginBottom: 28, maxWidth: 480 }}>
                Your collector enters the donor's name, amount, and payment mode. The system generates a numbered digital receipt with your mandal's logo and sends it directly to the donor's WhatsApp — instantly.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Custom receipt template with mandal branding',
                  'Auto-incrementing serial numbers',
                  'Supports UPI, Cash, and Bank Transfer',
                  'Full Marathi language support',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--body)', fontSize: 15 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--saffron)' }}>done</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 320, borderRadius: 16, overflow: 'hidden',
                boxShadow: 'var(--shadow-elevated)', border: '1px solid var(--border)',
              }}>
                {/* WA Header */}
                <div style={{
                  background: '#075E54', color: 'white', padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>temple_hindu</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Jai Ganesh Mandal</div>
                    <div style={{ fontSize: 11, opacity: 0.7 }}>Verified Business</div>
                  </div>
                </div>
                {/* WA Body */}
                <div style={{ background: '#EFEAE2', padding: '20px 16px', minHeight: 200 }}>
                  <div style={{
                    background: 'white', padding: '14px 16px', borderRadius: '12px 12px 12px 0',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)', maxWidth: '90%',
                  }}>
                    <div style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.6, marginBottom: 10 }}>
                      🙏 Thank you for your generous vargani of <strong>₹5,001</strong>!
                    </div>
                    <div style={{ fontSize: 12, color: '#4a4a68', marginBottom: 10, lineHeight: 1.5 }}>
                      <strong>Slip #</strong> JGM-2026-0342<br />
                      <strong>Donor:</strong> Suresh Patil<br />
                      <strong>Mode:</strong> UPI<br />
                      <strong>Date:</strong> 26 Jul 2026
                    </div>
                    <div style={{
                      background: 'var(--cream)', border: '1px solid var(--border)',
                      borderRadius: 8, padding: '10px 12px', textAlign: 'center',
                      fontSize: 13, fontWeight: 600, color: 'var(--saffron-dark)', cursor: 'pointer',
                    }}>
                      📄 View Digital Receipt
                    </div>
                    <div style={{ fontSize: 10, color: '#8c8ca1', textAlign: 'right', marginTop: 8 }}>
                      3:42 PM ✓✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase 2: Admin Dashboard */}
      <section className="section-padding" style={{ background: 'var(--white)' }}>
        <div className="container-main">
          <div className="showcase-grid showcase-reverse" style={{ display: 'grid', gap: 64, alignItems: 'center' }}>
            {/* Dashboard Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%', maxWidth: 460, borderRadius: 16, overflow: 'hidden',
                boxShadow: 'var(--shadow-elevated)', border: '1px solid var(--border)', background: 'var(--white)',
              }}>
                <div style={{
                  padding: '20px 24px', borderBottom: '1px solid var(--border-light)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: 'var(--saffron-light)', color: 'var(--saffron)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 12,
                    }}>J</div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Jai Ganesh Mandal</span>
                  </div>
                  <span className="t-caption">Today</span>
                </div>

                {/* Stats grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', borderRight: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Collected</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--success)' }}>₹ 12.5L</div>
                  </div>
                  <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Spent</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--danger)' }}>₹ 4.0L</div>
                  </div>
                </div>

                <div style={{ padding: '20px 24px', background: 'var(--saffron-bg)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--saffron-dark)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Net Balance</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--saffron-dark)', fontFamily: 'var(--font-display)' }}>₹ 8,50,000</div>
                </div>

                {/* Member tally */}
                <div style={{ padding: '16px 24px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>Top Collectors Today</div>
                  {[
                    { name: 'Amit K.', area: 'Shivaji Nagar', amount: '₹ 32,000' },
                    { name: 'Rahul D.', area: 'Kothrud', amount: '₹ 24,500' },
                  ].map((m, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '10px 0', borderBottom: i === 0 ? '1px solid var(--border-light)' : 'none',
                    }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{m.area}</div>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>{m.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>REAL-TIME DASHBOARD</div>
              <h2 className="t-h2" style={{ marginBottom: 20 }}>
                Your president sees every collection the moment it happens.
              </h2>
              <p className="t-body-lg" style={{ marginBottom: 28, maxWidth: 480 }}>
                The admin dashboard shows total collection, member-wise tally, area-wise breakdown, and recent transactions — updated in real time. No more waiting for collectors to bring back their books.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Live total with collection vs. expense balance',
                  'Member-wise and area-wise drill-down',
                  'Day-over-day and year-over-year trends',
                  'Export to PDF or Excel for committee meetings',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--body)', fontSize: 15 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--saffron)' }}>done</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase 3: Expense Tracking */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div className="container-main">
          <div className="showcase-grid" style={{ display: 'grid', gap: 64, alignItems: 'center' }}>
            {/* Copy */}
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 12 }}>EXPENSE MANAGEMENT</div>
              <h2 className="t-h2" style={{ marginBottom: 20 }}>
                Track every spend. Know your balance at any moment.
              </h2>
              <p className="t-body-lg" style={{ marginBottom: 28, maxWidth: 480 }}>
                Log mandap decoration, DJ booking, prasad supplies, electricity — every expense, the moment it happens. Your dashboard always shows the live balance: what you've collected minus what you've spent.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Category-wise expense logging',
                  'Receipt photo attachment for each expense',
                  'Instant balance calculation',
                  'Exportable expense report for audit',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--body)', fontSize: 15 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--saffron)' }}>done</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Expense Log Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '100%', maxWidth: 380, borderRadius: 16, overflow: 'hidden',
                boxShadow: 'var(--shadow-elevated)', border: '1px solid var(--border)', background: 'var(--white)',
              }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Expense Log</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>Ganesh Utsav 2026</div>
                </div>
                {[
                  { item: 'Mandap Decoration', amount: '₹ 45,000', icon: 'home_work', category: 'Infrastructure' },
                  { item: 'DJ & Sound System', amount: '₹ 18,000', icon: 'speaker', category: 'Entertainment' },
                  { item: 'Prasad & Flowers', amount: '₹ 12,500', icon: 'local_florist', category: 'Puja' },
                  { item: 'Electricity & Lights', amount: '₹ 8,500', icon: 'bolt', category: 'Utilities' },
                ].map((exp, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 24px',
                    borderBottom: i < 3 ? '1px solid var(--border-light)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: '#fef2f2', color: 'var(--danger)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{exp.icon}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{exp.item}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{exp.category}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--danger)' }}>- {exp.amount}</div>
                  </div>
                ))}
                <div style={{
                  padding: '16px 24px', background: 'var(--cream)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Total Expenses</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--danger)', fontFamily: 'var(--font-display)' }}>₹ 84,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .showcase-grid { grid-template-columns: 1fr 1fr; }
        .showcase-reverse { direction: rtl; }
        .showcase-reverse > * { direction: ltr; }
        @media (max-width: 900px) {
          .showcase-grid { grid-template-columns: 1fr !important; }
          .showcase-reverse { direction: ltr !important; }
        }
      `}</style>
    </div>
  );
};
