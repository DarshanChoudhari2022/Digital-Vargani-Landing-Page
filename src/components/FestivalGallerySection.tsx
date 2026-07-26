import React from 'react';

export const FestivalGallerySection: React.FC = () => {
  const festivals = [
    {
      title: 'Ganesh Utsav',
      tagline: '10 Days Festival',
      mandalCount: '8,400+ Mandals',
      description: 'Streamlined vargani slips, modak distribution accounting, and grand Visarjan procession logistics.',
      icon: 'temple_hindu',
      bg: 'var(--festival-light)',
      border: 'border-[var(--festival-orange)]',
    },
    {
      title: 'Dahi Handi',
      tagline: 'Gokulashtami',
      mandalCount: '3,200+ Govinda Squads',
      description: 'Sponsor pledge management, prize money tracking, and team insurance documentation.',
      icon: 'sports_gymnastics',
      bg: 'var(--marigold-light)',
      border: 'border-[var(--marigold-deep)]',
    },
    {
      title: 'Navratri Mahotsav',
      tagline: '9 Nights Garba & Dandiya',
      mandalCount: '4,600+ Mandals',
      description: 'Pass issuance, daily VIP sponsor billing, daily Aarti vargani slips, and prasad accounting.',
      icon: 'auto_awesome',
      bg: 'var(--secondary-container)',
      border: 'border-[var(--secondary)]',
    },
    {
      title: 'Local Shiv Jayanti & Utsavs',
      tagline: 'Year-Round Events',
      mandalCount: '6,100+ Committees',
      description: 'Configurable receipt books for Hanuman Jayanti, Chhatrapati Shivaji Maharaj Jayanti, and sports leagues.',
      icon: 'flag',
      bg: 'var(--surface-container-high)',
      border: 'border-[var(--charcoal)]',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container-max">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--marigold-light)] text-[var(--marigold-deep)] font-label-sm">
            <span className="material-symbols-outlined text-sm">festival</span>
            <span>Multi-Festival Ready</span>
          </div>
          <h2 className="font-headline-md text-[var(--charcoal)]">Empowering All Indian Celebrations</h2>
          <p className="font-body-md text-[var(--on-surface-variant)]">
            Configurable templates tailored to the unique collection rules and rituals of each festival.
          </p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {festivals.map((f, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl card-warm hover-lift border-l-8 ${f.border} bg-white flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: f.bg }}>
                    <span className="material-symbols-outlined text-2xl text-[var(--charcoal)]">{f.icon}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-label-md bg-[var(--surface-container)] text-[var(--charcoal)]">
                    {f.mandalCount}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-label-sm text-[var(--festival-deep)] uppercase tracking-wider">{f.tagline}</span>
                  <h3 className="font-headline-md text-[var(--charcoal)]">{f.title}</h3>
                </div>

                <p className="font-body-md text-[var(--on-surface-variant)]">{f.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--outline-variant)]/30 flex items-center justify-between text-xs font-label-md text-[var(--charcoal)]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-green-700">check_circle</span>
                  Custom Slip Templates
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-green-700">check_circle</span>
                  WhatsApp Ready
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
