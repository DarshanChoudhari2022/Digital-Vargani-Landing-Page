import React from 'react';
import { Server, Activity } from 'lucide-react';

export const ScaleStatsSection: React.FC = () => {
  const stats = [
    { label: 'Target Mandal Scale', value: '10,000+', desc: 'Mandals onboarded across India' },
    { label: 'Peak Form Latency', value: '< 500ms', desc: 'Field slip creation API response' },
    { label: 'Dashboard Latency', value: '< 1.0s', desc: 'Aggregated financial query response' },
    { label: 'Slip Volume Capacity', value: 'Crores', desc: 'Immutable collection slips stored' },
  ];

  const techSpecs = [
    { title: 'Multi-Tenant Mandal Isolation', desc: 'Strict tenant-level security barriers on every database query and storage bucket.' },
    { title: 'Asynchronous Receipt Rendering', desc: 'Background queueing system for PDF generation prevents peak festival traffic slowdowns.' },
    { title: 'Idempotent Slip Creation', desc: 'Guarantees zero duplicate slip numbers even under weak field mobile network connectivity.' },
    { title: 'Read Replicas & Aggregates', desc: 'Cached aggregates and dedicated reporting nodes for instant dashboard loads during peak hours.' },
  ];

  return (
    <section id="scale" className="py-20 bg-[#0A0A0E] text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>High-Scale Technical Performance</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Engineered For Peak <br />
            <span className="gradient-orange-text">Festival Traffic Scaling</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Built to handle lakhs of simultaneous vargani collections during Ganpati, Dahi Handi, & Navratri collection windows.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((st, i) => (
            <div key={i} className="bg-[#12121A] p-6 rounded-3xl border border-white/10 text-center hover:border-orange-500/50 transition-colors">
              <div className="font-heading font-extrabold text-3xl sm:text-5xl text-orange-400 mb-2">
                {st.value}
              </div>
              <div className="font-bold text-sm text-white mb-1">{st.label}</div>
              <div className="text-xs text-gray-400">{st.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#14141E] rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h3 className="font-heading font-bold text-xl text-white mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-orange-400" /> Non-Functional Reliability & Architecture
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {techSpecs.map((spec, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#1C1C28] border border-white/5">
                <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  0{i + 1}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">{spec.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
