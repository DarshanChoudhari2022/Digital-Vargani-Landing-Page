import React, { useState } from 'react';
import { Building2, Users, Receipt, Wallet, ShieldAlert, CheckCircle2, FileText, Sliders } from 'lucide-react';

export const PRDModulesSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState('vargani-engine');

  const modules = [
    {
      id: 'vargani-engine',
      title: 'Digital Vargani Engine',
      icon: Receipt,
      badge: 'Core Engine',
      description: 'Mobile-first contribution collection with instant slip number generation & PDF template rendering.',
      highlights: [
        'Required base fields + configurable custom fields',
        'Custom template placement (X/Y coordinates, fonts, visibility)',
        'Supports Cash, UPI, Cheque, Bank Transfer & Other modes',
        'Instant receipt preview, download & WhatsApp share',
      ],
      demoContent: {
        title: 'Custom Slip Field Configurator',
        fields: [
          { name: 'Contributor Name', type: 'Text (Required)', print: true, filter: true },
          { name: 'Mobile Number', type: 'Number (Optional)', print: false, filter: true },
          { name: 'Shop / Flat No.', type: 'Text (Custom Field)', print: true, filter: true },
          { name: 'Vargani Amount', type: 'Currency (Required)', print: true, filter: true },
          { name: 'Festival Event', type: 'Dropdown (Ganpati 2026)', print: true, filter: true },
        ]
      }
    },
    {
      id: 'super-admin',
      title: 'Super Admin Control',
      icon: Building2,
      badge: 'Platform Owner',
      description: 'Central platform hub to onboard mandals, manage subscription tiers, and monitor overall slip traffic.',
      highlights: [
        'Onboard 10,000+ mandals with custom branding',
        'Configure default template library & default fields',
        'Monitor platform health, slip volume & storage analytics',
        'Activate, suspend, or archive mandal accounts',
      ],
      demoContent: {
        title: 'Platform Super Admin Overview',
        metrics: [
          { label: 'Total Mandals Onboarded', val: '10,480 Mandals' },
          { label: 'Active Festivals Today', val: '1,240 Events' },
          { label: 'Total Slips Generated', val: '1.4 Crore Slips' },
          { label: 'System API P95 Latency', val: '240 ms' },
        ]
      }
    },
    {
      id: 'member-groups',
      title: 'Member & Group Hierarchy',
      icon: Users,
      badge: 'Field Ops',
      description: 'Structure 50 to 300+ mandal members into small 2-3 person collection teams assigned to specific areas.',
      highlights: [
        'Role-based permissions (Admin, Khajindar, Group Leader, Member)',
        'Group Leader area assignments & team progress tracking',
        'Member collection leaderboards & individual slip history',
        'Login access control (enable / disable field members)',
      ],
      demoContent: {
        title: 'Group Leader Area View (Sector 4 Team)',
        groups: [
          { team: 'Team A (Main Market)', leader: 'Siddhesh Shinde', collected: '₹1,84,500', slips: 240 },
          { team: 'Team B (Residential Towers)', leader: 'Vikram Salunkhe', collected: '₹2,40,000', slips: 180 },
          { team: 'Team C (Commercial Complex)', leader: 'Amit Kadam', collected: '₹3,10,000', slips: 95 },
        ]
      }
    },
    {
      id: 'expenses',
      title: 'Expenses & Reconciliation',
      icon: Wallet,
      badge: 'Finance',
      description: 'Comprehensive mandal finance tracker for pandal setup, sound system, catering, and vendor payments.',
      highlights: [
        'Add expense categories (Pandal, Sound, Prasadam, Lighting)',
        'Upload vendor bills & approval proof',
        'Live Net Mandal Balance (Total Vargani Collected - Approved Expenses)',
        'Reconcile Cash vs UPI collections with Khajindar approval',
      ],
      demoContent: {
        title: 'Mandal Financial Balance Sheet',
        financials: [
          { label: 'Total Vargani Collected', val: '₹12,45,000', type: 'income' },
          { label: 'Approved Pandal & Sound Expenses', val: '₹4,80,000', type: 'expense' },
          { label: 'Net Available Mandal Balance', val: '₹7,65,000', type: 'net' },
        ]
      }
    },
    {
      id: 'audit',
      title: 'Audit Trail & Compliance',
      icon: ShieldAlert,
      badge: 'Security',
      description: 'Immutable logging for slip creations, corrections, and cancellations with reason and device metadata.',
      highlights: [
        'Created by, created at timestamp, device metadata & IP',
        'Slip status management (Active, Cancelled, Corrected)',
        'Amount update creates correction record instead of silent mutation',
        'One-click export for Mandal Auditors & Committee Review',
      ],
      demoContent: {
        title: 'Mandal Security & Audit Log',
        audits: [
          { action: 'Slip #LRM-8490 Created', user: 'Rahul Sharma (Member)', detail: '₹2,100 via UPI', time: '2 mins ago' },
          { action: 'Slip #LRM-8412 Amount Corrected', user: 'Siddhesh (Khajindar)', detail: '₹500 → ₹501', time: '14 mins ago' },
          { action: 'Slip #LRM-8399 Cancelled', user: 'Mandal Admin', detail: 'Reason: Duplicate entry', time: '1 hour ago' },
        ]
      }
    }
  ];

  const currentMod = modules.find(m => m.id === activeModule) || modules[0];

  return (
    <section id="prd" className="py-20 bg-slate-50 relative border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#FF5722] text-xs font-bold mb-4">
            <Sliders className="w-3.5 h-3.5" />
            <span>PRD Functional Architecture</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Complete Enterprise Modules <br />
            <span className="gradient-orange-text">For Festival Digitization</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4">
            Built strictly according to product specifications for multi-tenant mandal scale.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isActive
                    ? 'gradient-orange-bg text-white shadow-lg gradient-orange-glow scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mod.title}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-[#FF5722] font-bold text-xs">
                {currentMod.badge}
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                {currentMod.title}
              </h3>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {currentMod.description}
            </p>

            <div className="space-y-3 pt-2">
              {currentMod.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 text-slate-800 text-xs sm:text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5722]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 sm:p-6 text-white border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4" /> {currentMod.demoContent.title}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                PRD Verified
              </span>
            </div>

            {activeModule === 'vargani-engine' && (
              <div className="space-y-2">
                <div className="text-[11px] text-gray-400 mb-2">Configured Custom Slip Fields:</div>
                {currentMod.demoContent.fields?.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 text-xs">
                    <div>
                      <span className="font-bold text-white">{f.name}</span>
                      <span className="text-[10px] text-gray-400 ml-2">({f.type})</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-medium">
                        Print: Yes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModule === 'super-admin' && (
              <div className="grid grid-cols-2 gap-3">
                {currentMod.demoContent.metrics?.map((m, i) => (
                  <div key={i} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-[10px] text-gray-400">{m.label}</div>
                    <div className="text-base font-extrabold text-amber-400 mt-1">{m.val}</div>
                  </div>
                ))}
              </div>
            )}

            {activeModule === 'member-groups' && (
              <div className="space-y-2">
                {currentMod.demoContent.groups?.map((g, i) => (
                  <div key={i} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{g.team}</div>
                      <div className="text-[10px] text-gray-400">Leader: {g.leader}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">{g.collected}</div>
                      <div className="text-[10px] text-gray-400">{g.slips} slips</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeModule === 'expenses' && (
              <div className="space-y-3">
                {currentMod.demoContent.financials?.map((fin, i) => (
                  <div key={i} className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    fin.type === 'net' ? 'bg-orange-500/20 border-orange-500/40' : 'bg-slate-800/80 border-slate-700'
                  }`}>
                    <span className="text-xs text-gray-300 font-semibold">{fin.label}</span>
                    <span className={`font-extrabold text-sm ${
                      fin.type === 'income' ? 'text-emerald-400' : fin.type === 'expense' ? 'text-rose-400' : 'text-orange-400 text-lg'
                    }`}>
                      {fin.val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeModule === 'audit' && (
              <div className="space-y-2">
                {currentMod.demoContent.audits?.map((a, i) => (
                  <div key={i} className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700 text-xs flex items-center justify-between">
                    <div>
                      <div className="font-bold text-orange-300">{a.action}</div>
                      <div className="text-[10px] text-gray-400">{a.user} • {a.detail}</div>
                    </div>
                    <span className="text-[10px] text-gray-500">{a.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
