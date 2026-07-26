import React, { useState } from 'react';

export const RoleAccessSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('mandal-admin');

  const roles = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      icon: 'shield_person',
      scale: 'Platform Operators',
      description: 'Full system oversight across all onboarded mandals nationwide.',
      permissions: [
        'Global Mandal Onboarding & Suspension',
        'Festival Master Template Configuration',
        'Cross-Mandal Audit Log Inspection',
        'Subscription & Payment Gateway Rules',
      ],
    },
    {
      id: 'mandal-admin',
      name: 'Mandal Admin',
      icon: 'account_balance',
      scale: '1-5 per Mandal',
      description: 'Mandal office bearers (President, Treasurer, Secretary).',
      permissions: [
        'Member Account Creation & Credentials',
        'Receipt Book Series Allocation',
        'Bank Account & Dynamic UPI Setup',
        'Expense Approvals & Daily Reconciliation',
      ],
    },
    {
      id: 'field-member',
      name: 'Field Member / Collector',
      icon: 'badge',
      scale: '50-300 per Mandal',
      description: 'Active volunteers collecting vargani door-to-door.',
      permissions: [
        'Mobile Slip Issuance (Cash / UPI)',
        'WhatsApp Receipt Link Triggering',
        'Donor Mobile Search & Quick Select',
        'Personal Daily Collection History',
      ],
    },
    {
      id: 'donor',
      name: 'Resident / Sponsor / Donor',
      icon: 'favorite',
      scale: 'Lakhs nationwide',
      description: 'Local residents, shops, and corporate sponsors.',
      permissions: [
        'Digital PDF Receipt Download',
        'QR Code Authenticity Verification',
        'Opt-in Digital Wall of Honor',
        'WhatsApp Festive Greetings & Updates',
      ],
    },
  ];

  const current = roles.find((r) => r.id === selectedRole)!;

  return (
    <section className="py-16 md:py-24 bg-[var(--surface-container-low)]">
      <div className="container-max">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--marigold-light)] text-[var(--marigold-deep)] font-label-sm">
            <span className="material-symbols-outlined text-sm">lock_open</span>
            <span>Granular Security Model</span>
          </div>
          <h2 className="font-headline-md text-[var(--charcoal)]">Role-Based Access Control</h2>
          <p className="font-body-md text-[var(--on-surface-variant)]">
            Tailored interfaces for every stakeholder from national platform managers to festival volunteers.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {roles.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRole(r.id)}
              className={`p-6 rounded-2xl text-left transition-all card-warm ${
                selectedRole === r.id
                  ? 'bg-white border-2 border-[var(--festival-orange)] shadow-md scale-105'
                  : 'bg-[var(--surface-container)] hover:bg-white border border-transparent'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  selectedRole === r.id
                    ? 'bg-[var(--festival-orange)] text-white'
                    : 'bg-[var(--surface-container-high)] text-[var(--charcoal)]'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">{r.icon}</span>
              </div>
              <div className="font-headline-sm text-[var(--charcoal)]" style={{ fontSize: '18px' }}>
                {r.name}
              </div>
              <div className="font-label-sm text-[var(--on-surface-variant)] mt-1">{r.scale}</div>
            </button>
          ))}
        </div>

        {/* Selected Role Detail Box */}
        <div className="bg-white rounded-3xl p-8 md:p-10 card-warm border border-[var(--outline-variant)]/40">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 mb-6 border-b border-[var(--outline-variant)]/30">
            <div>
              <span className="font-label-sm text-[var(--festival-deep)] uppercase tracking-wider">
                {current.scale}
              </span>
              <h3 className="font-headline-md text-[var(--charcoal)]">{current.name} Permissions</h3>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[var(--surface-container)] text-[var(--charcoal)] font-label-md">
              Scoped Permissions Matrix
            </span>
          </div>

          <p className="font-body-md text-[var(--on-surface-variant)] mb-6">{current.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.permissions.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)]/30"
              >
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="font-label-md text-[var(--charcoal)]">{p}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
