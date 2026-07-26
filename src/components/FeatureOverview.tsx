import React from 'react';

export const FeatureOverview: React.FC = () => {
  const features = [
    {
      icon: 'person_search',
      title: 'Donor Profiles & History',
      desc: 'Instant donor lookup by mobile number or name. Access multi-year giving trends and festive donor status.',
      accent: 'var(--festival-orange)',
      bg: 'var(--festival-light)',
      border: 'border-t-4 border-[var(--festival-orange)]',
    },
    {
      icon: 'qr_code_2',
      title: 'Instant UPI Integration',
      desc: 'Dynamic QR codes mapping vargani directly into your mandal bank account with zero intermediary delay.',
      accent: 'var(--marigold-deep)',
      bg: 'var(--marigold-light)',
      border: 'border-t-4 border-[var(--marigold-deep)]',
    },
    {
      icon: 'receipt_long',
      title: 'Digital Receipts on WhatsApp',
      desc: 'Instant digital slip delivery via WhatsApp & SMS with custom mandal headers and tax exemption notices.',
      accent: 'var(--secondary)',
      bg: 'var(--secondary-container)',
      border: 'border-t-4 border-[var(--secondary)]',
    },
    {
      icon: 'account_balance_wallet',
      title: 'Mandal Expense Auditing',
      desc: 'Track idol costs, pandal setup, prasad distribution, and sound system permits with photo receipts.',
      accent: 'var(--festival-deep)',
      bg: 'var(--festival-light)',
      border: 'border-t-4 border-[var(--festival-deep)]',
    },
    {
      icon: 'group_work',
      title: 'Member Field Permissions',
      desc: 'Assign collection targets to 50-300 volunteers with granular permission rules and location tags.',
      accent: 'var(--marigold)',
      bg: 'var(--marigold-light)',
      border: 'border-t-4 border-[var(--marigold)]',
    },
    {
      icon: 'analytics',
      title: 'Real-time Daily Dashboard',
      desc: 'Live collection speed tracking, category-wise breakdowns (Shops vs Residents vs Sponsors), and export to Excel.',
      accent: 'var(--charcoal)',
      bg: 'var(--surface-container-high)',
      border: 'border-t-4 border-[var(--charcoal)]',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="container-max">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--marigold-light)] text-[var(--marigold-deep)] font-label-sm">
            <span className="material-symbols-outlined text-sm">handcrafted</span>
            <span>Purpose-Built for Indian Mandals</span>
          </div>
          <h2 className="font-headline-md text-[var(--charcoal)]">The Vargani Experience</h2>
          <p className="font-body-md text-[var(--on-surface-variant)]">
            Replacing paper receipt books with transparent, instant, and spiritually fulfilling digital workflows.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white p-8 rounded-2xl card-warm hover-lift ${item.border}`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: item.bg, color: item.accent }}
              >
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="font-headline-sm text-[var(--charcoal)] mb-3">{item.title}</h3>
              <p className="font-body-md text-[var(--on-surface-variant)]">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
