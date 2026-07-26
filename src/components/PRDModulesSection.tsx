import React, { useState } from 'react';

export const PRDModulesSection: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'superadmin' | 'mandaladmin' | 'member' | 'donor'>('superadmin');

  const modules = [
    {
      id: 'superadmin' as const,
      name: 'Super Admin Module',
      icon: 'admin_panel_settings',
      badge: 'Platform Control',
      title: 'Multi-Tenant Scale & Audit Control',
      desc: 'Onboard 10,000+ mandals, configure festival templates, manage subscriptions, and audit cross-mandal activity from a single pane of glass.',
      features: [
        'Mandal Onboarding & Verification',
        'Festival Template Engine (Ganpati, Navratri, etc.)',
        'Subscription & License Governance',
        'System-wide Audit Logs & Security Tracing',
        'Global Aggregated Analytics',
      ],
      codeSnippet: `// Multi-Tenant Isolation Audit Engine
const auditLog = await db.auditLogs.create({
  data: {
    mandalId: "mandal_lalbaug_2026",
    action: "RECEIPT_BATCH_EXPORT",
    actorId: "super_admin_01",
    ipAddress: "103.21.12.4",
    timestamp: new Date()
  }
});`,
    },
    {
      id: 'mandaladmin' as const,
      name: 'Mandal Admin Module',
      icon: 'temple_hindu',
      badge: 'Mandal Core',
      title: 'Complete Financial & Volunteer Control',
      desc: 'Create festival years, add 50-300 field members, assign receipt number series, dynamic UPI QR setup, and expense reconciliation.',
      features: [
        'Festival Year & Budget Planning',
        'Field Member Hierarchy & Role Assignments',
        'Receipt Series & Custom Mandal Header Setup',
        'Real-time Expense Logging & Voucher Receipts',
        'Daily Vargani Tally & Bank Settlement',
      ],
      codeSnippet: `// Mandal Expense Reconciliation Model
const expense = await mandal.expenses.create({
  amount: 45000,
  category: "PANDAL_DECORATION",
  vendor: "Shree Decorators",
  receiptUrl: "https://cdn.mandal/exp_9012.jpg",
  approvedBy: "President_Ramesh_P"
});`,
    },
    {
      id: 'member' as const,
      name: 'Field Member App',
      icon: 'smartphone',
      badge: 'Mobile First',
      title: 'Fast On-The-Field Vargani Slip Issuance',
      desc: 'Lightweight web app optimized for low latency mobile connectivity. Search donors, accept cash or UPI, print or send WhatsApp receipt instantly.',
      features: [
        'Instant Donor Name/Phone Search',
        'Cash & Dynamic UPI Payment Capture',
        'Thermal Bluetooth Printer Integration',
        'One-Click WhatsApp Receipt Sharing',
        'Member Daily Collection Counter',
      ],
      codeSnippet: `// Instant Receipt Generation API (<500ms)
const receipt = await api.vargani.issueReceipt({
  donorName: "Suresh Prabhu",
  amount: 1100,
  paymentMode: "UPI",
  memberId: "collector_amit_k",
  whatsappNotify: true
});`,
    },
    {
      id: 'donor' as const,
      name: 'Donor Transparency',
      icon: 'verified',
      badge: 'Public Trust',
      title: 'Verifiable Digital Receipts & Wall of Honor',
      desc: 'Donors receive branded WhatsApp PDF receipts with unique verification codes. Optional opt-in to the Mandal’s digital donor wall.',
      features: [
        'Branded WhatsApp PDF Receipts',
        'QR Code Verification for Authenticity',
        'Opt-in Mandal Digital Donor Wall',
        'Tax Exemption (80G) Certificate attachment',
        'Festive Greeting & Aarti Schedule Notifications',
      ],
      codeSnippet: `// Branded PDF Receipt Metadata
const donorReceipt = {
  receiptNo: "VG-2026-8891",
  mandal: "Chinchpokli Chintamani",
  amount: "₹ 11,000",
  verificationHash: "sha256_e89a71b..."
};`,
    },
  ];

  const current = modules.find((m) => m.id === activeModule)!;

  return (
    <section id="admin" className="py-16 md:py-24 bg-white relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--festival-light)] text-[var(--festival-deep)] font-label-sm">
            <span className="material-symbols-outlined text-sm">dashboard</span>
            <span>PRD Functional Requirements</span>
          </div>
          <h2 className="font-headline-md text-[var(--charcoal)]">Engineered For Every User Role</h2>
          <p className="font-body-md text-[var(--on-surface-variant)]">
            From Super Admins overseeing thousands of mandals to field volunteers collecting ₹100 on the street.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-label-md transition-all ${
                activeModule === m.id
                  ? 'bg-[var(--festival-orange)] text-white shadow-md scale-105'
                  : 'bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] hover:bg-[var(--surface-container)] hover:text-[var(--charcoal)]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{m.icon}</span>
              <span>{m.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Box */}
        <div className="bg-[var(--surface-container-lowest)] rounded-3xl p-8 md:p-12 card-warm border border-[var(--outline-variant)]/40 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-6 space-y-6">
            <span className="px-3 py-1 rounded-full bg-[var(--marigold-light)] text-[var(--marigold-deep)] font-label-sm inline-block">
              {current.badge}
            </span>
            <h3 className="font-headline-md text-[var(--charcoal)]">{current.title}</h3>
            <p className="font-body-md text-[var(--on-surface-variant)]">{current.desc}</p>

            <ul className="space-y-3 pt-2">
              {current.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-label-md text-[var(--charcoal)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--marigold-light)] text-[var(--marigold-deep)] flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Code / Technical Showcase */}
          <div className="lg:col-span-6 bg-[var(--charcoal)] text-white p-6 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner relative border border-white/10">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-white/50 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 font-mono text-white/60">{current.id}_spec.ts</span>
              </div>
              <span className="text-[var(--marigold-dim)] font-sans font-semibold">Strict Audit Schema</span>
            </div>
            <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
              <code>{current.codeSnippet}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
};
