import React from 'react';

export const FestivalGallerySection: React.FC = () => {
  const festivals = [
    {
      title: 'Ganesh Utsav',
      tagline: '10 Days Festival',
      mandalCount: '8,400+ Mandals',
      description: 'Streamlined vargani collection for the biggest festival in Maharashtra. Handles extreme peak load during the 15 days prior to Visarjan.',
      icon: 'temple_hindu',
      color: 'orange'
    },
    {
      title: 'Navratri',
      tagline: '9 Nights Festival',
      mandalCount: '3,200+ Mandals',
      description: 'Manage passes, sponsor collections, and daily expenses for Dandiya and Garba events with dedicated role-based access.',
      icon: 'celebration',
      color: 'rose'
    },
    {
      title: 'Dahi Handi',
      tagline: 'Gokulashtami',
      mandalCount: '1,500+ Pathaks',
      description: 'Track sponsor prize money, pathak (team) registrations, and event day logistics from a single mobile dashboard.',
      icon: 'sports_kabaddi',
      color: 'blue'
    },
    {
      title: 'Local Events',
      tagline: 'Year-round',
      mandalCount: 'Custom',
      description: 'Use the generic collection template for blood donation camps, local sports tournaments, or community welfare funds.',
      icon: 'event',
      color: 'emerald'
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-md text-[var(--charcoal-900)] mb-4">
            Built for every community celebration
          </h2>
          <p className="font-body-lg text-[var(--charcoal-600)]">
            While optimized for Ganesh Utsav, Digital Mandal’s flexible architecture adapts to any local festival or community fundraising event.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {festivals.map((fest, idx) => (
            <div 
              key={idx} 
              className={`bg-white border border-[var(--surface-200)] rounded-2xl p-8 saas-shadow saas-shadow-hover flex flex-col sm:flex-row gap-6 items-start`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-${fest.color}-50 text-${fest.color}-600 flex items-center justify-center flex-shrink-0`}>
                <span className="material-symbols-outlined text-[32px]">{fest.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="font-headline-sm text-[var(--charcoal-900)]">{fest.title}</h3>
                   <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-${fest.color}-100 text-${fest.color}-700`}>
                      {fest.mandalCount}
                   </span>
                </div>
                <div className="text-sm font-medium text-[var(--charcoal-500)] mb-3">{fest.tagline}</div>
                <p className="font-body-md text-[var(--charcoal-600)] leading-relaxed">
                  {fest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
