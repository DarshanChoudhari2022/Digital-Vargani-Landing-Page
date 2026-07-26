import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureOverview } from './components/FeatureOverview';
import { LeaderboardSection } from './components/LeaderboardSection';
import { PRDModulesSection } from './components/PRDModulesSection';
import { RoleAccessSection } from './components/RoleAccessSection';
import { ScaleStatsSection } from './components/ScaleStatsSection';
import { FestivalGallerySection } from './components/FestivalGallerySection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LiveDemoModal } from './components/LiveDemoModal';

export function App() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col mandala-bg antialiased">
      {/* Top Navbar */}
      <Header onOpenDemo={() => setDemoOpen(true)} />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection onOpenDemo={() => setDemoOpen(true)} />

        {/* Rangoli Divider */}
        <div className="rangoli-divider my-4" />

        {/* 2. Feature Overview (Vargani Experience) */}
        <FeatureOverview />

        {/* Garland Wave Divider */}
        <div className="garland-divider my-4" />

        {/* 3. Volunteer Collector Leaderboard */}
        <LeaderboardSection />

        {/* Rangoli Divider */}
        <div className="rangoli-divider my-4" />

        {/* 4. PRD Modules Showcase (Super Admin, Mandal Admin, Member, Donor) */}
        <PRDModulesSection />

        {/* 5. Role-Based Access Control */}
        <RoleAccessSection />

        {/* 6. Technical Scale & Concurrency Specifications */}
        <ScaleStatsSection />

        {/* 7. Multi-Festival Capabilities */}
        <FestivalGallerySection />

        {/* Rangoli Divider */}
        <div className="rangoli-divider my-4" />

        {/* 8. Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Demo Sandbox Modal */}
      <LiveDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

export default App;
