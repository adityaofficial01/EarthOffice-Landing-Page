import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import LandingBuilderSection from './components/LandingBuilderSection';
import EmailBuilderSection from './components/EmailBuilderSection';
import AddonsSection from './components/AddonsSection';
import RoleBasedSection from './components/RoleBasedSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      className="min-h-screen font-sans antialiased"
      style={{ fontFamily: "'Inter', 'Geist', system-ui, -apple-system, sans-serif" }}
    >
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <LandingBuilderSection />
        <EmailBuilderSection />
        <AddonsSection />
        <RoleBasedSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
}

export default LandingPage;
