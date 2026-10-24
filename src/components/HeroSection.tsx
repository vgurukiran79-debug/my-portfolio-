import React from 'react';
import { ArrowDown, Code2, Compass, Sparkles, Terminal } from 'lucide-react';
import { NeuralCoreCanvas } from './NeuralCoreCanvas.tsx';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onExploreAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onExploreAbout,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-[#02040a]">
      {/* 3D AI Portal Canvas Background */}
      <div className="absolute inset-0 z-0">
        <NeuralCoreCanvas interactive={true} />
        {/* Cinematic deep midnight-blue vignette scrim for pristine text contrast */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#02040a]/50 to-[#02040a] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#02040a] to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02040a] to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 flex-1 flex flex-col justify-center text-center items-center">
        {/* Academic Anchor Kicker */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300 mb-8 tracking-wider uppercase shadow-lg shadow-cyan-950/20 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>KNS Institute of Technology</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Bengaluru, Karnataka</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Undergraduate AI & ML</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-display leading-[1.04] mb-5 select-none">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-sm">
            {PERSONAL_INFO.name}
          </span>
        </h1>

        {/* Professional Title */}
        <h2 className="text-sm sm:text-base md:text-xl font-mono tracking-widest text-cyan-400 uppercase font-semibold mb-8 max-w-2xl drop-shadow">
          {PERSONAL_INFO.title}
        </h2>


        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreAbout}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] border border-cyan-300/40"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE MY UNIVERSE</span>
          </button>

          <button
            onClick={onExploreProjects}
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>DISCOVER MY PROJECTS</span>
          </button>
        </div>
      </div>

      {/* Hero Bottom Strip: Academic Foundation & Scroll Cue */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/60 pt-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-300 font-mono">Curious</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-300 font-mono">Technical</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-slate-300 font-mono">Future-focused</span>
          </div>

          <a
            href="#about"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
            aria-label="Scroll down to About section"
          >
            <span className="font-mono text-[11px] tracking-wider uppercase">Scroll to explore</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
