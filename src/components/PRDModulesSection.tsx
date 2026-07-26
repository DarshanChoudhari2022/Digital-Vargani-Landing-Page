import React, { useState } from 'react';

export const PRDModulesSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'superadmin' | 'mandaladmin' | 'member' | 'donor'>('superadmin');

  const modules = [
    {
      id: 'superadmin',
      title: 'Platform Super Admin',
      icon: 'admin_panel_settings',
      desc: 'Global overview across thousands of mandals.',
      features: [
        'Global metrics (Total Mandals, Total GTV)',
        'Mandal onboarding & verification',
        'Platform fee configuration & billing',
        'Global broadcast messaging'
      ],
      mockup: (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-2xl h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
             <span className="material-symbols-outlined text-slate-400">monitoring</span>
             <span className="text-sm font-semibold text-white">Global Dashboard</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
               <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Active Mandals</div>
               <div className="text-xl font-bold text-white">12,450</div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
               <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Total GTV</div>
               <div className="text-xl font-bold text-emerald-400">₹45.2 Cr</div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 flex-1">
             <div className="text-xs font-medium text-slate-300 mb-2">Recent Approvals</div>
             <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                   <span className="text-slate-400">Jai Ganesh Mandal</span>
                   <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Verified</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                   <span className="text-slate-400">Shivaji Tarun Mandal</span>
                   <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Verified</span>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'mandaladmin',
      title: 'Mandal Admin Panel',
      icon: 'dashboard',
      desc: 'Command center for individual mandal committees.',
      features: [
        'Real-time collection tally & expense tracking',
        'Member management & role assignments',
        'Receipt template configuration',
        'Data export (PDF/Excel) for local authorities'
      ],
      mockup: (
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xl h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">J</div>
               <span className="text-sm font-semibold text-slate-900">Jai Ganesh Mandal</span>
             </div>
             <span className="material-symbols-outlined text-slate-400 text-sm">settings</span>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-100">
             <div className="text-[10px] text-orange-600 uppercase tracking-wider font-semibold mb-1">Net Balance</div>
             <div className="text-2xl font-bold text-orange-700">₹ 8,45,000</div>
             <div className="flex items-center gap-4 mt-2 text-xs">
               <div><span className="text-slate-500">In:</span> <span className="font-medium text-slate-700">12.5L</span></div>
               <div><span className="text-slate-500">Out:</span> <span className="font-medium text-slate-700">4.0L</span></div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'member',
      title: 'Member Mobile App',
      icon: 'smartphone',
      desc: 'Optimized for fast, on-the-ground vargani collection.',
      features: [
        'Rapid slip generation (under 10 seconds)',
        'Automatic WhatsApp receipt sharing',
        'Offline mode with auto-sync',
        'Personal collection history & leaderboard rank'
      ],
      mockup: (
        <div className="bg-slate-50 rounded-[2rem] p-3 border-4 border-slate-200 shadow-xl h-full max-w-[280px] mx-auto flex flex-col relative overflow-hidden">
          <div className="bg-white rounded-[1.5rem] p-4 flex-1 border border-slate-100 flex flex-col">
             <div className="text-center mb-6 mt-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center mb-3">
                   <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div className="text-lg font-bold text-slate-900">Slip Generated!</div>
                <div className="text-xs text-slate-500">Sent to 98xxxxxx45 via WhatsApp</div>
             </div>
             <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center mb-auto">
               <div className="text-xs text-slate-500 mb-1">Amount Collected</div>
               <div className="text-2xl font-bold text-slate-900">₹ 5,001</div>
             </div>
             <button className="w-full bg-[var(--festival-orange)] text-white py-3 rounded-xl text-sm font-semibold shadow-sm mt-4">
               New Collection
             </button>
          </div>
        </div>
      )
    },
    {
      id: 'donor',
      title: 'Donor Transparency',
      icon: 'visibility',
      desc: 'Building trust with local residents and businesses.',
      features: [
        'Instant digital receipts via WhatsApp/SMS',
        'Public dashboard for total mandal collections',
        'Expense visibility (optional by admin)',
        'Easy past-receipt lookup'
      ],
      mockup: (
         <div className="bg-[#EFEAE2] rounded-xl p-4 border border-slate-200 shadow-xl h-full flex flex-col relative overflow-hidden">
           {/* WhatsApp Chat Simulation */}
           <div className="bg-[#075E54] text-white p-3 flex items-center gap-3 rounded-t-lg">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                 <span className="material-symbols-outlined text-sm">temple_hindu</span>
              </div>
              <div>
                 <div className="text-sm font-semibold">Jai Ganesh Mandal</div>
                 <div className="text-[10px] text-white/70">Verified Business</div>
              </div>
           </div>
           <div className="bg-[#EFEAE2] p-4 flex-1 flex flex-col gap-3">
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start relative">
                 <div className="text-sm text-slate-800 mb-2">
                   Thank you for your generous vargani of <b>₹5,001</b>! 🙏
                 </div>
                 <div className="bg-slate-50 border border-slate-200 rounded p-2 text-center text-xs text-slate-600 font-medium cursor-pointer hover:bg-slate-100">
                    📄 View Digital Receipt
                 </div>
              </div>
           </div>
         </div>
      )
    }
  ];

  return (
    <section id="specs" className="py-24 bg-[var(--surface-50)]">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-md text-[var(--charcoal-900)] mb-4">
            A specialized module for every user
          </h2>
          <p className="font-body-lg text-[var(--charcoal-600)]">
            From the collector on the street to the president managing funds, Digital Mandal provides tailored interfaces.
          </p>
        </div>

        <div className="bg-white rounded-3xl saas-shadow border border-[var(--surface-200)] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Navigation Sidebar */}
          <div className="lg:w-1/3 bg-[var(--surface-50)] border-r border-[var(--surface-200)] p-4 sm:p-6 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id as any)}
                className={`flex items-start text-left gap-4 p-4 rounded-xl transition-all min-w-[240px] lg:min-w-0 flex-shrink-0 ${
                  activeModule === mod.id 
                    ? 'bg-white shadow-sm border border-[var(--surface-200)]' 
                    : 'hover:bg-black/5 border border-transparent'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activeModule === mod.id ? 'bg-[var(--festival-orange-subtle)] text-[var(--festival-orange-hover)]' : 'bg-slate-200 text-slate-500'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">{mod.icon}</span>
                </div>
                <div>
                  <div className={`font-headline-sm text-base mb-1 ${
                    activeModule === mod.id ? 'text-[var(--charcoal-900)]' : 'text-[var(--charcoal-700)]'
                  }`}>
                    {mod.title}
                  </div>
                  <div className="font-body-sm text-sm text-[var(--charcoal-500)] hidden sm:block">
                    {mod.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:w-2/3 p-6 sm:p-10">
            {modules.map((mod) => (
              <div 
                key={mod.id}
                className={`transition-opacity duration-300 h-full ${activeModule === mod.id ? 'opacity-100 block' : 'opacity-0 hidden'}`}
              >
                <div className="grid sm:grid-cols-2 gap-8 h-full">
                   <div>
                     <h3 className="font-headline-sm text-[var(--charcoal-900)] mb-6">{mod.title} Features</h3>
                     <ul className="space-y-4">
                        {mod.features.map((feat, i) => (
                           <li key={i} className="flex items-start gap-3">
                              <span className="material-symbols-outlined text-[var(--festival-orange)] text-[20px] mt-0.5">done</span>
                              <span className="font-body-md text-[var(--charcoal-700)]">{feat}</span>
                           </li>
                        ))}
                     </ul>
                   </div>
                   <div className="bg-slate-100 rounded-2xl p-6 flex items-center justify-center min-h-[300px]">
                      {mod.mockup}
                   </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
