import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--white)' }}>
      <div className="container-main" style={{ maxWidth: 720, textAlign: 'center' }}>
        <h2 className="t-h2" style={{ marginBottom: 32 }}>
          Paper receipt books weren't built for this.
        </h2>
        <div className="t-body-lg" style={{ lineHeight: 1.8 }}>
          <p style={{ marginBottom: 20 }}>
            Every festival season, your committee juggles handwritten receipts, cash in multiple hands, WhatsApp groups that nobody reads, and a treasurer doing mental math at midnight.
          </p>
          <p style={{ marginBottom: 20 }}>
            Donors ask <em>"where's my receipt?"</em> and nobody has the answer. Collectors overlap areas. Expenses aren't tracked until after the festival. And last year's donor list? It's in a notebook someone misplaced.
          </p>
          <p style={{ fontWeight: 600, color: 'var(--ink)' }}>
            Your mandal handles lakhs of rupees. It deserves real tools.
          </p>
        </div>
      </div>
    </section>
  );
};
