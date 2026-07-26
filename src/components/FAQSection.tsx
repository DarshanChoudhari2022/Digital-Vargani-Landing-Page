import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Digital Vargani eliminate duplicate slip numbers?',
      a: 'The platform generates unique sequential slip numbers partitioned per mandal and active festival ID using idempotent API locks. Even if a field collector loses mobile signal or clicks submit twice, zero duplicate slips are issued.'
    },
    {
      q: 'Can members print or share receipts without native app installation?',
      a: 'Yes! Digital Mandal is built mobile-first on web technologies. Field collectors can log in from any mobile browser, generate slips, and instantly share formatted PDF or image receipts via WhatsApp, SMS, or thermal Bluetooth print.'
    },
    {
      q: 'How are custom fields configured for specific mandals?',
      a: 'Mandal Admins can add text, date, dropdown, checkbox, and amount fields in settings. Admins choose whether each custom field appears on the printed slip and whether it can be filtered on the collection dashboard.'
    },
    {
      q: 'What payment modes are supported for reconciliation?',
      a: 'Collectors can log Cash, UPI (Google Pay, PhonePe, Paytm, BHIM), Cheque, Direct Bank Transfer, or Other modes. The Khajindar (Treasurer) dashboard aggregates cash vs digital totals for daily physical cash handover verification.'
    },
    {
      q: 'Is contribution data isolated between different mandals?',
      a: 'Yes. Every database query enforces strict multi-tenant isolation. Contributor records, slips, financial summaries, and member credentials of one mandal are strictly inaccessible to other mandals.'
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#FF5722] text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Everything you need to know about onboarding your mandal.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 text-left font-heading font-bold text-slate-900 flex items-center justify-between text-base sm:text-lg hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
