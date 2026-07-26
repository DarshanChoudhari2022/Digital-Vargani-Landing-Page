import React, { useState } from 'react';

export const LeaderboardSection: React.FC = () => {
  const [filter, setFilter] = useState<'overall' | 'daily'>('overall');

  const topCollectors = [
    { rank: 1, name: 'Amit Kulkarni', area: 'Shivaji Nagar', amount: '₹ 1,45,000', slips: 142, trend: '+12%' },
    { rank: 2, name: 'Rahul Deshmukh', area: 'Kothrud', amount: '₹ 98,500', slips: 89, trend: '+5%' },
    { rank: 3, name: 'Suresh Patil', area: 'Deccan', amount: '₹ 76,200', slips: 65, trend: '+18%' },
    { rank: 4, name: 'Vikram Joshi', area: 'Aundh', amount: '₹ 45,000', slips: 41, trend: '-2%' },
  ];

  const rankColors = ['#fef3c7', '#f1f5f9', '#ffedd5', 'transparent'];
  const rankText = ['#92400e', '#475569', '#c2410c', '#94a3b8'];

  return (
    <section className="section-padding" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container-main">
        <div className="leaderboard-grid" style={{ display: 'grid', gap: 64, alignItems: 'center' }}>

          {/* Copy */}
          <div>
            <h2 className="t-h2" style={{ marginBottom: 20 }}>
              See who's collecting, where, and how much — in real time.
            </h2>
            <p className="t-body-lg" style={{ marginBottom: 24, maxWidth: 460 }}>
              Motivate your team during peak collection days. The leaderboard ranks collectors by total amount and slip count. Automated WhatsApp reports go to the mandal president every evening.
            </p>
            <div className="t-caption" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--success)' }}>schedule_send</span>
              Daily report sent via WhatsApp at 9 PM automatically
            </div>
          </div>

          {/* Table */}
          <div>
            <div className="card" style={{ overflow: 'hidden' }}>
              {/* Header */}
              <div style={{
                padding: '18px 24px', borderBottom: '1px solid var(--border-light)',
                background: 'var(--cream)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>Top Collectors</div>
                  <div className="t-caption" style={{ marginTop: 2 }}>Live from the field</div>
                </div>
                <div style={{ display: 'flex', background: 'var(--white)', borderRadius: 8, border: '1px solid var(--border)', padding: 2 }}>
                  {(['overall', 'daily'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      style={{
                        padding: '6px 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
                        fontSize: 13, fontWeight: 500, transition: 'all 0.2s',
                        background: filter === f ? 'var(--ink)' : 'transparent',
                        color: filter === f ? 'white' : 'var(--body)',
                      }}
                    >
                      {f === 'overall' ? 'Overall' : 'Today'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table body */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-light)', textAlign: 'left' }}>
                      <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rank</th>
                      <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Collector</th>
                      <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Slips</th>
                      <th style={{ padding: '12px 24px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCollectors.map((c, i) => (
                      <tr key={c.rank} style={{ borderBottom: i < topCollectors.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                        <td style={{ padding: '14px 24px' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: 28, height: 28, borderRadius: '50%',
                            background: rankColors[i], color: rankText[i],
                            fontSize: 12, fontWeight: 700,
                          }}>#{c.rank}</span>
                        </td>
                        <td style={{ padding: '14px 24px' }}>
                          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{c.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.area}</div>
                        </td>
                        <td style={{ padding: '14px 24px', textAlign: 'right', fontWeight: 500, color: 'var(--body)' }}>{c.slips}</td>
                        <td style={{ padding: '14px 24px', textAlign: 'right' }}>
                          <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{c.amount}</div>
                          <div style={{ fontSize: 12, color: c.trend.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>{c.trend}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .leaderboard-grid { grid-template-columns: 5fr 7fr; }
        @media (max-width: 900px) {
          .leaderboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
