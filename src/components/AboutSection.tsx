import React, { useState } from 'react';
import { JOURNEY_STAGES, PERSONAL_INFO } from '../data/portfolioData.ts';
import { BookOpen, Cpu, Sparkles, Rocket } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export const AboutSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(1); // Defaults to Engineering
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const stageIcons = [
    <BookOpen className="w-5 h-5 text-sky-400" />,
    <Cpu className="w-5 h-5 text-indigo-400" />,
    <Sparkles className="w-5 h-5 text-cyan-400" />,
    <Rocket className="w-5 h-5 text-purple-400" />,
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 bg-[#050814] border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background ambient lighting with subtle scroll-depth radial glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-3xl mb-20">
          <div
            className={`text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            About Me · Evolution of Curiosity
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-6 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            THE HUMAN BEHIND THE INTELLIGENCE
          </h2>
          <p
            className={`text-base sm:text-lg text-slate-300 font-light leading-relaxed reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            "An engineering student exploring the intersection of artificial intelligence, software development, automation, and creative technology."
          </p>
        </div>

        {/* Interactive Narrative Journey Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stage Selection Navigation - Staggered Card Reveals */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {JOURNEY_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              return (
                <button
                  key={stage.number}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden group reveal-scale-init ${
                    isVisible ? 'is-revealed' : ''
                  } ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-900/60 hover:border-slate-700/60'
                  }`}
                  style={{ transitionDelay: `${250 + idx * 80}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${
                          isActive ? 'bg-cyan-400 shadow-[0_0_6px_#38bdf8]' : 'bg-slate-700'
                        }`}
                      />
                      <span>STAGE {stage.number}</span>
                    </span>
                    <span className="opacity-80 group-hover:scale-110 transition-transform">
                      {stageIcons[idx]}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5 font-display">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {stage.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Deep-Dive Card with Smooth Transition */}
          <div
            className={`lg:col-span-7 bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-800/80 p-8 sm:p-10 shadow-2xl relative reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-6">
              <span className="text-cyan-400 font-bold">
                {JOURNEY_STAGES[activeStageIndex].number}
              </span>
              <span aria-hidden="true">/</span>
              <span>JOURNEY ROADMAP</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-200 font-sans">
                {PERSONAL_INFO.institution}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-4">
              {JOURNEY_STAGES[activeStageIndex].title}
            </h3>

            <p className="text-sm sm:text-base text-cyan-300/90 font-mono mb-6 leading-relaxed">
              {JOURNEY_STAGES[activeStageIndex].summary}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {JOURNEY_STAGES[activeStageIndex].narrative}
            </p>

            <div className="border-t border-slate-800 pt-6">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Key Technical Exploration
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                {JOURNEY_STAGES[activeStageIndex].focus.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/70 border border-slate-700/60 rounded-md px-3 py-1 font-mono hover:border-cyan-500/40 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Academic & Cultural Context Banner */}
        <div
          className={`mt-16 p-6 sm:p-8 rounded-xl bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/80 border border-slate-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal-init ${
            isVisible ? 'is-revealed' : ''
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase mb-1">
              Current Academic Standing
            </div>
            <div className="text-lg font-semibold text-white font-display">
              B.E. in Artificial Intelligence & Machine Learning (2nd Year)
            </div>
            <div className="text-xs text-slate-400 mt-1">
              KNS Institute of Technology · Bengaluru, Karnataka
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            {PERSONAL_INFO.personality.map((trait) => (
              <span
                key={trait}
                className="px-2.5 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-slate-300 font-mono hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
