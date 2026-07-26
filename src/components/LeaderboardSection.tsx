import React, { useState } from 'react';

export const LeaderboardSection: React.FC = () => {
  const [filter, setFilter] = useState<'overall' | 'daily'>('overall');

  const topCollectors = [
    {
      rank: 1,
      name: 'Amit Kulkarni',
      area: 'Shivaji Nagar',
      amount: '₹ 1,45,000',
      slips: 142,
      trend: '+12%',
      avatar: 'bg-blue-100 text-blue-700'
    },
    {
      rank: 2,
      name: 'Rahul Deshmukh',
      area: 'Kothrud',
      amount: '₹ 98,500',
      slips: 89,
      trend: '+5%',
      avatar: 'bg-emerald-100 text-emerald-700'
    },
    {
      rank: 3,
      name: 'Suresh Patil',
      area: 'Deccan',
      amount: '₹ 76,200',
      slips: 65,
      trend: '+18%',
      avatar: 'bg-purple-100 text-purple-700'
    },
    {
      rank: 4,
      name: 'Vikram Joshi',
      area: 'Aundh',
      amount: '₹ 45,000',
      slips: 41,
      trend: '-2%',
      avatar: 'bg-amber-100 text-amber-700'
    }
  ];

  return (
    <section id="leaderboard" className="py-24 bg-white border-y border-[var(--surface-200)] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--surface-50)] to-transparent pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Copy & Context */}
          <div className="lg:col-span-5">
            <h2 className="font-headline-md text-[var(--charcoal-900)] mb-6">
              Gamify collections with real-time leaderboards
            </h2>
            <p className="font-body-lg text-[var(--charcoal-600)] mb-8">
              Motivate your mandal members during peak festival days. Track who is collecting the most vargani and automatically generate daily top performer reports.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                'Member-wise collection tally',
                'Area-wise performance heatmaps',
                'Automated daily WhatsApp reports'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 font-body-md text-[var(--charcoal-700)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--festival-orange-subtle)] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-[var(--festival-orange-hover)]">check</span>
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Interactive Component Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl saas-shadow border border-[var(--surface-200)] overflow-hidden">
              
              {/* Card Header */}
              <div className="p-6 border-b border-[var(--surface-200)] bg-[var(--surface-50)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-headline-sm text-[var(--charcoal-900)]">Top Collectors</h3>
                  <p className="text-sm text-[var(--charcoal-500)] mt-1">Live updates from the field</p>
                </div>
                
                {/* Segmented Control */}
                <div className="flex bg-[var(--surface-200)] p-1 rounded-lg">
                  <button 
                    onClick={() => setFilter('overall')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      filter === 'overall' 
                        ? 'bg-white text-[var(--charcoal-900)] shadow-sm' 
                        : 'text-[var(--charcoal-600)] hover:text-[var(--charcoal-900)]'
                    }`}
                  >
                    Overall
                  </button>
                  <button 
                    onClick={() => setFilter('daily')}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      filter === 'daily' 
                        ? 'bg-white text-[var(--charcoal-900)] shadow-sm' 
                        : 'text-[var(--charcoal-600)] hover:text-[var(--charcoal-900)]'
                    }`}
                  >
                    Today
                  </button>
                </div>
              </div>

              {/* Table Body */}
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--surface-200)] bg-[var(--surface-50)]/50 text-xs font-semibold text-[var(--charcoal-500)] uppercase tracking-wider">
                      <th className="px-6 py-4">Rank</th>
                      <th className="px-6 py-4">Collector</th>
                      <th className="px-6 py-4 text-right">Slips</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--surface-100)]">
                    {topCollectors.map((collector) => (
                      <tr key={collector.rank} className="hover:bg-[var(--surface-50)] transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            collector.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                            collector.rank === 2 ? 'bg-slate-100 text-slate-700' :
                            collector.rank === 3 ? 'bg-orange-100 text-orange-700' :
                            'text-slate-400 font-medium'
                          }`}>
                            #{collector.rank}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${collector.avatar}`}>
                              {collector.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-[var(--charcoal-900)] group-hover:text-[var(--festival-orange)] transition-colors">
                                {collector.name}
                              </div>
                              <div className="text-xs text-[var(--charcoal-500)]">{collector.area}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-[var(--charcoal-700)]">{collector.slips}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="font-semibold text-[var(--charcoal-900)]">{collector.amount}</div>
                          <div className={`text-xs ${collector.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {collector.trend} today
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Card Footer */}
              <div className="p-4 border-t border-[var(--surface-200)] bg-[var(--surface-50)] text-center">
                <a href="#" className="text-sm font-medium text-[var(--festival-orange)] hover:text-[var(--festival-orange-hover)] inline-flex items-center gap-1 transition-colors">
                  View Full Report <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
