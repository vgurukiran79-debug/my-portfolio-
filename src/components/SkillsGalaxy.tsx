import React, { useState } from 'react';
import { SKILLS, SkillItem } from '../data/portfolioData.ts';
import { Network } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export const SkillsGalaxy: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Programming' | 'Artificial Intelligence' | 'Development'>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS[0]); // Defaults to Python
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const categories = ['All', 'Programming', 'Artificial Intelligence', 'Development'] as const;

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === selectedCategory);

  const getTierColor = (tier: SkillItem['tier']) => {
    switch (tier) {
      case 'BUILDING WITH':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30';
      case 'PRACTICING':
        return 'text-indigo-400 border-indigo-500/40 bg-indigo-950/30';
      case 'LEARNING':
        return 'text-sky-300 border-sky-500/30 bg-sky-950/20';
    }
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 bg-[#050814] border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background Constellation Radiance with scroll reveal opacity */}
      <div
        className={`absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Staggered Entrance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div
              className={`text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              Constellation Graph · Honest Competencies
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-4 reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              SKILLS GALAXY
            </h2>
            <p
              className={`text-base text-slate-300 font-light leading-relaxed reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '180ms' }}
            >
              An interactive neural network of programming languages, artificial intelligence methodologies, and modern development tools categorized by real engineering application.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl shrink-0 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '220ms' }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Constellation Grid & Skill Inspection Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Constellation Nodes Grid - Staggered Card Revelations */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredSkills.map((skill, idx) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  className={`text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 relative group overflow-hidden card-hover-gleam reveal-scale-init ${
                    isVisible ? 'is-revealed' : ''
                  } ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/50'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                  style={{ transitionDelay: `${150 + idx * 55}ms` }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-cyan-400 scale-125 shadow-[0_0_8px_#38bdf8]'
                            : 'bg-slate-700 group-hover:bg-cyan-400/60'
                        }`}
                      />
                      <span>{skill.name}</span>
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border transition-colors ${getTierColor(
                        skill.tier
                      )}`}
                    >
                      {skill.tier}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 line-clamp-1 mb-2 font-mono">
                    {skill.category}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 group-hover:text-slate-400 transition-colors">
                    <Network className="w-3 h-3 text-cyan-400/80" />
                    <span>Links to {skill.related.length} nodes</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Skill Inspection Node Panel with Smooth Reveal */}
          <div
            className={`lg:col-span-5 bg-[#090e1a]/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative sticky top-24 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-4 pb-3 border-b border-slate-800">
              <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Node Inspector</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {activeSkill.category}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3">
              {activeSkill.name}
            </h3>

            {/* Honest Status Categorization */}
            <div className="mb-6">
              <span
                className={`inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded border ${getTierColor(
                  activeSkill.tier
                )}`}
              >
                LEVEL: {activeSkill.tier}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeSkill.description}
            </p>

            {/* Neural Connection Links with Progressive Glow */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interconnected Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                {activeSkill.related.map((rel) => (
                  <span
                    key={rel}
                    className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/60 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-200 transition-colors"
                  >
                    {rel}
                  </span>
                ))}
              </div>
            </div>

            {/* Honesty Philosophy Notice */}
            <div className="mt-8 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <div className="text-cyan-400 font-semibold mb-0.5">Factual Discipline</div>
              Skill competencies are represented honestly by practical engagement level (Building With, Practicing, Learning) rather than arbitrary percentage scores.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
