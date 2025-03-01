
import { useEffect } from 'react';
import { ThemeProvider } from '@/utils/themeContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EducationSection from '@/components/EducationSection';
import ExperienceSection from '@/components/ExperienceSection';
import ResearchSection from '@/components/ResearchSection';
import ContactSection from '@/components/ContactSection';
import ThemeSelector from '@/components/ThemeSelector';

const Index = () => {
  // Preload audio for theme switcher
  useEffect(() => {
    const audio = new Audio('/whoosh.mp3');
    audio.load();
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        
        <div className="pt-16">
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <ExperienceSection />
          <ResearchSection />
          <ContactSection />
        </div>
        
        <ThemeSelector />
      </div>
    </ThemeProvider>
  );
};

export default Index;
