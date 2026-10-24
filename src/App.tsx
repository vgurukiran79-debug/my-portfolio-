import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { SkillsGalaxy } from './components/SkillsGalaxy.tsx';
import { MilestonesSection } from './components/MilestonesSection.tsx';
import { EducationSection } from './components/EducationSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { GuruAssistant } from './components/GuruAssistant.tsx';
import { UniverseBackdrop } from './components/UniverseBackdrop.tsx';
import { SectionConnector } from './components/SectionConnector.tsx';

export default function App() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Continuous AI Universe Particle & Constellation Backdrop */}
      <UniverseBackdrop />

      {/* Primary Navigation */}
      <Navbar onOpenAssistant={() => setIsAssistantOpen(true)} />

      {/* Main Experience Stream with Visual Continuity Threads */}
      <main className="relative z-10 flex-1">
        {/* Stage 1: The AI Portal Hero (Preserved Exactly) */}
        <HeroSection
          onExploreAbout={() => scrollToSection('about')}
          onExploreProjects={() => scrollToSection('projects')}
        />

        {/* Visual Continuity Bridge: Hero -> About */}
        <SectionConnector label="NEURAL · NARRATIVE" />

        {/* Stage 2: About Me - The Human Behind the Intelligence */}
        <AboutSection />

        {/* Visual Continuity Bridge: About -> Projects */}
        <SectionConnector label="PROJECTS · LAYER" />

        {/* Stage 3: Project Universe (7 Featured Projects in Exact Order) */}
        <ProjectsSection />

        {/* Visual Continuity Bridge: Projects -> Skills */}
        <SectionConnector label="SKILLS · CONSTELLATION" />

        {/* Stage 4: Skills Galaxy (Neural Constellation Graph) */}
        <SkillsGalaxy />

        {/* Visual Continuity Bridge: Skills -> Milestones */}
        <SectionConnector label="VERIFICATION · TRACK" />

        {/* Stage 5: Milestones & Continuous Learning */}
        <MilestonesSection />

        {/* Visual Continuity Bridge: Milestones -> Education */}
        <SectionConnector label="ACADEMIC · GENESIS" />

        {/* Stage 6: Education Journey (Class 10 to 2nd Year Engineering at KNS) */}
        <EducationSection />

        {/* Visual Continuity Bridge: Education -> Contact */}
        <SectionConnector label="TRANSMISSION · HUB" />

        {/* Stage 7: Contact & Connect */}
        <ContactSection />
      </main>

      {/* Floating Guru AI Digital Assistant */}
      <GuruAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(!isAssistantOpen)}
        onNavigateSection={scrollToSection}
      />
    </div>
  );
}
