import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { ProblemSection } from './components/ProblemSection';
import { ProductShowcases } from './components/FeatureOverview';
import { HowItWorks } from './components/HowItWorks';
import { RoleWorkflow } from './components/PRDModulesSection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { TrustSection } from './components/TrustSection';
import { FestivalGallerySection } from './components/FestivalGallerySection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { LiveDemoModal } from './components/LiveDemoModal';

export function App() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenDemo={() => setDemoOpen(true)} />

      <main style={{ flexGrow: 1 }}>
        {/* 1. Hero */}
        <HeroSection onOpenDemo={() => setDemoOpen(true)} />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. Problem Statement */}
        <ProblemSection />

        {/* 4-6. Product Showcases (Receipts, Dashboard, Expenses) */}
        <ProductShowcases />

        {/* 7. How It Works */}
        <HowItWorks />

        {/* 8. Role-Based Workflow */}
        <RoleWorkflow />

        {/* 9. Collector Leaderboard */}
        <LeaderboardSection />

        {/* 10. Trust & Transparency */}
        <TrustSection />

        {/* 11. Festival Use Cases */}
        <FestivalGallerySection />

        {/* 12. FAQ */}
        <FAQSection />

        {/* 13. Final CTA */}
        <FinalCTA onOpenDemo={() => setDemoOpen(true)} />
      </main>

      <Footer />

      <LiveDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

export default App;
