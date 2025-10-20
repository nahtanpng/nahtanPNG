'use client';

import HeroSection from './components/hero';
import HighlightsSection from './components/highlights';
import ProfilesSection from './components/profiles';

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto py-12 px-4 mt-20">
      <HeroSection />
      <ProfilesSection />
      <HighlightsSection />
    </main>
  );
}
