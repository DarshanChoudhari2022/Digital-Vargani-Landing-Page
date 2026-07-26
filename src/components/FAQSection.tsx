import React, { useState } from 'react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Digital Vargani replace paper receipt books?',
      a: 'Volunteers use a mobile browser app to enter donor name, mobile number, and amount. Upon hitting submit, a verifiable digital receipt with custom mandal branding is generated instantly and sent to the donor via WhatsApp/SMS.',
    },
    {
      q: 'Does Vargani money go directly into our Mandal bank account?',
      a: 'Yes. Mandal admins link their official bank account details and UPI VPA ID. The dynamic QR generated on the receipt maps directly to your mandal account with 0% intermediary holding.',
    },
    {
      q: 'Can field members use the system under weak 3G or offline field conditions?',
      a: 'Absolutely. The field collector app is a light PWA designed to queue vargani slips locally when connection drops, automatically syncing with the server once connectivity is restored.',
    },
    {
      q: 'How are expenses logged and audited?',
      a: 'Mandal treasurers can log expenses (pandal setup, sound system, prasad, idol creation) by uploading photo vouchers. Super admins and committee members can inspect the real-time balance sheet at any point.',
    },
    {
      q: 'Can a single mandal run multiple festival years or events?',
      a: 'Yes. Digital Mandal supports multi-festival setups. You can maintain separate receipt series and financial balances for Ganesh Utsav 2026, Navratri 2026, Shiv Jayanti 2027, and local tournaments.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--surface-container-low)]">
      <div className="container-max">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--marigold-light)] text-[var(--marigold-deep)] font-label-sm">
            <span className="material-symbols-outlined text-sm">help_outline</span>
            <span>Clarifications</span>
          </div>
          <h2 className="font-headline-md text-[var(--charcoal)]">Frequently Asked Questions</h2>
          <p className="font-body-md text-[var(--on-surface-variant)]">
            Everything you need to know about digitizing your mandal operations.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[var(--outline-variant)]/40 overflow-hidden card-warm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 font-headline-sm text-[var(--charcoal)]"
                  style={{ fontSize: '18px' }}
                >
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-2xl text-[var(--festival-orange)] transition-transform duration-300">
                    {isOpen ? 'remove_circle' : 'add_circle'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 font-body-md text-[var(--on-surface-variant)] border-t border-[var(--outline-variant)]/20 animate-fade-up">
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
