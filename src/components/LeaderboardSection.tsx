import React, { useState } from 'react';

export const LeaderboardSection: React.FC = () => {
  const [filter, setFilter] = useState<'overall' | 'daily'>('overall');

  const topCollectors = [
    {
      rank: 1,
      name: 'Amit Kulkarni',
      location: 'Girgaon Hub',
      receipts: 142,
      amount: '₹ 72,400',
      avatar: 'AK',
      badge: 'Mandal Guardian',
      bg: 'var(--marigold-light)',
      text: 'var(--marigold-deep)',
    },
    {
      rank: 2,
      name: 'Sneha Rao',
      location: 'Dadar West',
      receipts: 118,
      amount: '₹ 54,100',
      avatar: 'SR',
      badge: 'Gold Driver',
      bg: 'var(--secondary-container)',
      text: 'var(--secondary)',
    },
    {
      rank: 3,
      name: 'Vijay Jha',
      location: 'Thane Central',
      receipts: 94,
      amount: '₹ 38,900',
      avatar: 'VJ',
      badge: 'Silver Driver',
      bg: 'var(--festival-light)',
      text: 'var(--festival-deep)',
    },
    {
      rank: 4,
      name: 'Rahul Deshmukh',
      location: 'Pune Camp',
      receipts: 81,
      amount: '₹ 32,500',
      avatar: 'RD',
      badge: 'Active Member',
      bg: 'var(--surface-container-high)',
      text: 'var(--charcoal)',
    },
    {
      rank: 5,
      name: 'Priya Joshi',
      location: 'Nashik Road',
      receipts: 67,
      amount: '₹ 28,000',
      avatar: 'PJ',
      badge: 'Active Member',
      bg: 'var(--surface-container-high)',
      text: 'var(--charcoal)',
    },
  ];

  return (
    <section id="leaderboard" className="py-16 md:py-24 bg-[var(--surface-container-low)]">
      <div className="container-max">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--festival-light)] text-[var(--festival-deep)] font-label-sm mb-3">
              <span className="material-symbols-outlined text-sm">emoji_events</span>
              <span>Volunteer Engagement</span>
            </div>
            <h2 className="font-headline-md text-[var(--charcoal)]">Collector Leaderboard</h2>
            <p className="font-body-md text-[var(--on-surface-variant)]">
              Celebrating top volunteers driving maximum vargani collections across sectors.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-[var(--outline-variant)]/40 shadow-sm">
            <button
              onClick={() => setFilter('overall')}
              className={`px-5 py-2 rounded-lg font-label-md transition-all ${
                filter === 'overall'
                  ? 'bg-[var(--festival-orange)] text-white shadow-sm'
                  : 'text-[var(--on-surface-variant)] hover:text-[var(--charcoal)]'
              }`}
            >
              Overall Festival
            </button>
            <button
              onClick={() => setFilter('daily')}
              className={`px-5 py-2 rounded-lg font-label-md transition-all ${
                filter === 'daily'
                  ? 'bg-[var(--festival-orange)] text-white shadow-sm'
                  : 'text-[var(--on-surface-variant)] hover:text-[var(--charcoal)]'
              }`}
            >
              Today's Speed
            </button>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Table Container */}
          <div className="lg:col-span-8 bg-white rounded-2xl overflow-hidden card-warm border border-[var(--outline-variant)]/40">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[var(--surface-container)] border-b border-[var(--outline-variant)]/40">
                    <th className="p-5 font-label-md text-[var(--charcoal)]">Rank</th>
                    <th className="p-5 font-label-md text-[var(--charcoal)]">Collector</th>
                    <th className="p-5 font-label-md text-[var(--charcoal)]">Slips Issued</th>
                    <th className="p-5 font-label-md text-[var(--charcoal)] text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--outline-variant)]/30">
                  {topCollectors.map((c) => (
                    <tr key={c.rank} className="hover:bg-[var(--surface-container-low)] transition-colors">
                      <td className="p-5 font-headline-sm text-[var(--festival-orange)]" style={{ fontSize: '18px' }}>
                        #{c.rank}
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-label-md"
                            style={{ backgroundColor: c.bg, color: c.text }}
                          >
                            {c.avatar}
                          </div>
                          <div>
                            <div className="font-label-md text-[var(--charcoal)] flex items-center gap-2">
                              {c.name}
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-container)] text-[var(--on-surface-variant)] font-normal">
                                {c.badge}
                              </span>
                            </div>
                            <div className="text-xs text-[var(--on-surface-variant)]">{c.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 font-body-md text-[var(--charcoal)]">
                        <span className="font-semibold">{c.receipts}</span> Receipts
                      </td>
                      <td className="p-5 font-headline-sm text-[var(--charcoal)] text-right" style={{ fontSize: '18px' }}>
                        {c.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reward Feature Card */}
          <div className="lg:col-span-4 bg-[var(--charcoal)] text-white rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden card-warm">
            <span
              className="material-symbols-outlined absolute -top-6 -right-6 text-9xl opacity-10 rotate-12 pointer-events-none"
              style={{ fontSize: '180px', color: 'var(--marigold-dim)' }}
            >
              emoji_events
            </span>

            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 rounded-full bg-[var(--marigold-deep)] text-[var(--marigold-dim)] font-label-sm inline-block">
                Festive Motivation
              </span>
              <h3 className="font-headline-md text-white">Gamified Volunteer Rewards</h3>
              <p className="font-body-md text-white/80">
                Recognize top performing field members with automatic "Mandal Guardian" digital certificates &amp; preferred seating at festival Aarti events.
              </p>
            </div>

            <div className="relative z-10 pt-8">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md space-y-2 mb-6">
                <div className="flex justify-between text-xs text-white/80">
                  <span>Target Festival Vargani</span>
                  <span className="font-semibold text-[var(--marigold-dim)]">78% Reached</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full progress-marigold w-[78%] rounded-full" />
                </div>
              </div>

              <button className="w-full py-3.5 rounded-xl bg-[var(--festival-orange)] hover:bg-[var(--festival-deep)] font-label-md text-white transition-all text-center">
                Onboard Volunteer Team
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
