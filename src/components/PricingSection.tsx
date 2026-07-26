import React from 'react';
import { Check, Flame } from 'lucide-react';

interface PricingSectionProps {
  onOpenDemo: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenDemo }) => {
  const plans = [
    {
      name: 'Utsav Starter',
      badge: 'Free Mandal Trial',
      price: '₹0',
      period: 'For single festival',
      desc: 'Ideal for small local mandals testing digital vargani collection.',
      popular: false,
      features: [
        '1 Active Festival (e.g. Ganpati Utsav)',
        'Up to 25 Field Collectors',
        'Standard Digital Vargani Form',
        'Auto Slip Number Generation',
        'Standard PDF Receipts',
        'Basic Cash & UPI Totals',
      ],
      buttonText: 'Start Free Trial',
    },
    {
      name: 'Mahotsav Mandal Pro',
      badge: 'Most Popular',
      price: '₹2,999',
      period: 'per mandal / year',
      desc: 'Complete digitization for active mandals with multiple festivals & large member teams.',
      popular: true,
      features: [
        'Unlimited Festivals (Ganpati, Navratri, Dahi Handi)',
        'Up to 300 Field Collectors & Group Leaders',
        'Configurable Custom Slip Fields & Font Placement',
        'Upload Custom Slip Background Image',
        'Member-wise, Group-wise & Area-wise Dashboards',
        'Mandal Expense Tracker & Vendor Bill Uploads',
        'Cash vs UPI Reconciliation & Audit Logs',
        'Data Export to Excel / CSV',
      ],
      buttonText: 'Get Started Pro',
    },
    {
      name: 'Federation Enterprise',
      badge: 'Super Admin Scale',
      price: 'Custom',
      period: 'Multi-mandal trust federation',
      desc: 'For central trusts managing 50+ regional mandals or city-wide festival committees.',
      popular: false,
      features: [
        'Unlimited Mandals & Admin User Accounts',
        'Custom Domain & White-labeled Branding',
        'Global Super Admin Analytics & Multi-tenant Isolation',
        'Dedicated Database Read Replica for Instant Querying',
        'Custom API Integrations & Webhooks',
        'Priority 24/7 Festival Support',
      ],
      buttonText: 'Contact Enterprise',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#FF5722] text-xs font-bold mb-4">
            <Flame className="w-3.5 h-3.5 fill-[#FF5722]" />
            <span>Simple Transparent Pricing</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Plans Designed For <br />
            <span className="gradient-orange-text">Mandals Of All Sizes</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4">
            No hidden transaction fees. Simple annual mandal license.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                p.popular
                  ? 'bg-slate-900 text-white shadow-2xl border-2 border-orange-500 scale-105'
                  : 'bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-orange-bg text-white text-xs font-bold shadow-md">
                  ★ MOST POPULAR MANDAL CHOICE
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    p.popular ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {p.badge}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl mb-1">{p.name}</h3>
                <p className={`text-xs mb-6 ${p.popular ? 'text-gray-400' : 'text-slate-500'}`}>{p.desc}</p>

                <div className="mb-6 pb-6 border-b border-slate-200/40">
                  <span className="font-heading font-extrabold text-4xl sm:text-5xl tracking-tight">{p.price}</span>
                  <span className={`text-xs font-medium ml-2 ${p.popular ? 'text-gray-400' : 'text-slate-500'}`}>{p.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {p.features.map((f, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-medium">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        p.popular ? 'bg-orange-500 text-white' : 'bg-orange-100 text-[#FF5722]'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={p.popular ? 'text-gray-200' : 'text-slate-700'}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenDemo}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 ${
                  p.popular
                    ? 'gradient-orange-bg text-white gradient-orange-glow hover:opacity-95'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                {p.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
