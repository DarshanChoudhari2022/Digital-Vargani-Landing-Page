import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureOverview } from './components/FeatureOverview';
import { PRDModulesSection } from './components/PRDModulesSection';
import { RoleAccessSection } from './components/RoleAccessSection';
import { ScaleStatsSection } from './components/ScaleStatsSection';
import { FestivalGallerySection } from './components/FestivalGallerySection';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LiveDemoModal } from './components/LiveDemoModal';

export function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Floating Header */}
      <Header onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Hero Section matching attached image visual layout */}
      <HeroSection onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Feature Overview with live interactive generator */}
      <FeatureOverview />

      {/* PRD Functional Modules Showcase */}
      <PRDModulesSection />

      {/* Role-Based Access Control Section */}
      <RoleAccessSection />

      {/* Multi-Festival Gallery & Gemini AI Visual Assets */}
      <FestivalGallerySection />

      {/* Scale & Technical Specs */}
      <ScaleStatsSection />

      {/* Mandal Pricing License Plans */}
      <PricingSection onOpenDemo={() => setDemoModalOpen(true)} />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Modal Simulator */}
      <LiveDemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}

export default App;
