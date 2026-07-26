import React from 'react';
import { Sparkles } from 'lucide-react';

export const FestivalGallerySection: React.FC = () => {
  const festivals = [
    {
      title: 'Ganesh Utsav',
      timing: '10 Days Festival',
      mandalCount: '8,400+ Mandals',
      image: '/ganpati_mandal_hero.png',
      desc: 'Peak collection window with doorstep vargani, shop contributions & corporate sponsorships.'
    },
    {
      title: 'Navratri Mahotsav',
      timing: '9 Nights Garba & Puja',
      mandalCount: '4,200+ Mandals',
      image: '/digital_vargani_card.png',
      desc: 'Pass-wise donor tracking, VIP passes & daily prasad contribution slips.'
    },
    {
      title: 'Dahi Handi Utsav',
      timing: 'Gokulashtami Celebration',
      mandalCount: '3,100+ Mandals',
      image: '/mobile_vargani_app_ui.png',
      desc: 'Fast-paced street collection, instant UPI QR slips, and group leader field tracking.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#FF5722] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 fill-[#FF5722]" />
            <span>Multi-Festival Support</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Digitizing Every Festival <br />
            <span className="gradient-orange-text">Across Indian Localities</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-4">
            One platform powering Ganpati, Navratri, Dahi Handi, Shiv Jayanti, & local cultural mandals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {festivals.map((fest, i) => (
            <div key={i} className="glow-card bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg flex flex-col group">
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img 
                  src={fest.image} 
                  alt={fest.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-orange-400 border border-white/10">
                  {fest.timing}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-2">{fest.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{fest.desc}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#FF5722]">
                  <span>Active Scale</span>
                  <span className="bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                    {fest.mandalCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
