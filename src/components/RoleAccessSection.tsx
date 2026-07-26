import React, { useState } from 'react';
import { UserCheck, Shield, Crown, Wallet, Smartphone } from 'lucide-react';

export const RoleAccessSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('mandal-admin');

  const roles = [
    {
      id: 'super-admin',
      title: 'Super Admin',
      subtitle: 'Platform Owner / Operator',
      icon: Crown,
      badge: 'System Tier',
      responsibilities: [
        'Create & manage mandal accounts & subscription tiers',
        'Upload default template library & assign mandal templates',
        'Define global default fields and mandal custom fields',
        'Monitor usage, collection volume, slip metrics & platform health',
      ]
    },
    {
      id: 'mandal-admin',
      title: 'Mandal Admin',
      subtitle: 'Committee Lead / Mandal Owner',
      icon: Shield,
      badge: 'Mandal Lead',
      responsibilities: [
        'Manage mandal profile, active festivals, members, groups & areas',
        'Configure vargani slip template & field visibility',
        'View live collections, expenses, and PDF reports',
        'Approve slip corrections, cancellations & expense entries',
      ]
    },
    {
      id: 'khajindar',
      title: 'Khajindar / Treasurer',
      subtitle: 'Finance & Reconciler Lead',
      icon: Wallet,
      badge: 'Finance Lead',
      responsibilities: [
        'Track cash, UPI, cheque, and bank transfer collection modes',
        'Reconcile member-wise & group-wise collections',
        'Manage mandal expenses & vendor receipt uploads',
        'Export audit-ready financial ledgers & summary sheets',
      ]
    },
    {
      id: 'group-leader',
      title: 'Group Leader',
      subtitle: 'Area Collection Lead',
      icon: UserCheck,
      badge: 'Field Lead',
      responsibilities: [
        'Assign target streets & areas to 2-3 person collector teams',
        'Track real-time team collection progress and slip counts',
        'Review member-wise slips & verify cash handovers',
        'Report area completion metrics to Mandal Admin',
      ]
    },
    {
      id: 'member',
      title: 'Member / Collector',
      subtitle: 'Field Vargani Collector',
      icon: Smartphone,
      badge: 'Mobile Field',
      responsibilities: [
        'Login from mobile browser/app in field areas',
        'Fill donor vargani generator form in under 30 seconds',
        'Generate numbered digital slip with instant PDF/image',
        'Share slip directly via WhatsApp or bluetooth print receipt',
      ]
    }
  ];

  const currentRole = roles.find(r => r.id === selectedRole) || roles[1];

  return (
    <section id="roles" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#FF5722] text-xs font-bold mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Role-Based Access Control</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Tailored Roles For <br />
            <span className="gradient-orange-text">Every Mandal Stakeholder</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4">
            Granular permissions strictly enforcing tenant isolation and field accountability.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = selectedRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 ${
                  isActive
                    ? 'border-orange-500 bg-orange-50/50 shadow-md ring-2 ring-orange-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                  isActive ? 'gradient-orange-bg text-white shadow-md' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-heading font-bold text-sm text-slate-900 leading-tight">
                  {r.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {r.badge}
                </div>
              </button>
            );
          })}
        </div>

        <div className="glass-card-light rounded-3xl p-8 border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-orange-bg text-white flex items-center justify-center shadow-md">
                <currentRole.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#FF5722] uppercase tracking-wider">
                  {currentRole.badge}
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
                  {currentRole.title}
                </h3>
                <p className="text-xs text-slate-500">{currentRole.subtitle}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Responsibilities:
              </div>
              {currentRole.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-medium shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 bg-[#0F0F14] rounded-2xl p-6 text-white border border-white/10 shadow-2xl">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>{currentRole.title} Dashboard Access</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#1A1A24] p-3 rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-gray-400">Security Scope</span>
                <span className="text-emerald-400 font-bold">Mandal Tenant Isolated</span>
              </div>

              <div className="bg-[#1A1A24] p-3 rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-gray-400">Slip Action Rights</span>
                <span className="text-amber-400 font-bold">Role Authorized</span>
              </div>

              <div className="bg-[#1A1A24] p-3 rounded-xl border border-white/10 flex justify-between items-center">
                <span className="text-gray-400">Audit Trail Logging</span>
                <span className="text-white font-mono text-[11px]">Enabled (IP & Device)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
