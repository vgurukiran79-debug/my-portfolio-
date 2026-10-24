import React, { useState, useEffect, useRef } from 'react';
import { EDUCATION_JOURNEY, EducationItem } from '../data/portfolioData.ts';
import { GraduationCap, BookOpen, School } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export const EducationSection: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<EducationItem>(EDUCATION_JOURNEY[2]); // Default to Undergraduate
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedScores, setAnimatedScores] = useState<{ [key: string]: string }>({
    '01': '96%',
    '02': '96.5%',
    '03': '7.68 / 10',
  });
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);

      // Smooth one-time counter effect from 0 up to target score
      const duration = 1200;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // Ease out cubic

        const score1 = (96 * ease).toFixed(1) + '%';
        const score2 = (96.5 * ease).toFixed(1) + '%';
        const score3 = (7.68 * ease).toFixed(2) + ' / 10';

        setAnimatedScores({
          '01': progress === 1 ? '96%' : score1,
          '02': progress === 1 ? '96.5%' : score2,
          '03': progress === 1 ? '7.68 / 10' : score3,
        });

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }, [isVisible, hasAnimated]);

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case '01':
        return <School className="w-5 h-5 text-sky-400" />;
      case '02':
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case '03':
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      default:
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-28 bg-[#050814] border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background ambient lighting with depth parallax */}
      <div
        className={`absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Staggered Entrance */}
        <div className="max-w-3xl mb-16">
          <div
            className={`text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            Academic Track · Chronological Progression
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-4 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            EDUCATION JOURNEY
          </h2>
          <p
            className={`text-base text-slate-300 font-light leading-relaxed reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '180ms' }}
          >
            From foundational school education to specialized undergraduate engineering in Artificial Intelligence and Machine Learning at KNS Institute of Technology.
          </p>
        </div>

        {/* Timeline & Interactive Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Cards Column */}
          <div className="lg:col-span-7 space-y-6 relative">
            {/* Connecting Vertical Timeline Line with Dynamic Cyan Glow */}
            <div
              className={`absolute left-6 top-8 bottom-8 w-[2px] bg-gradient-to-b from-cyan-500 via-sky-400 to-indigo-500 transition-opacity duration-1000 ${
                hasAnimated ? 'opacity-70 shadow-[0_0_8px_rgba(56,189,248,0.5)]' : 'opacity-20'
              }`}
              aria-hidden="true"
            />

            {EDUCATION_JOURNEY.map((item, idx) => {
              const isSelected = selectedStage.stage === item.stage;
              const displayScore = animatedScores[item.stage] || item.score?.display;

              return (
                <div
                  key={item.stage}
                  onClick={() => setSelectedStage(item)}
                  className={`relative pl-14 cursor-pointer group transition-all duration-300 reveal-scale-init ${
                    isVisible ? 'is-revealed' : ''
                  }`}
                  style={{ transitionDelay: `${150 + idx * 110}ms` }}
                >
                  {/* Timeline Glowing Node */}
                  <div
                    className={`absolute left-4 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-400 shadow-lg shadow-cyan-400/50 scale-125'
                        : 'border-slate-600 bg-slate-900 group-hover:border-cyan-400 group-hover:scale-110'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur-md card-hover-gleam ${
                      isSelected
                        ? 'bg-[#0a1122]/90 border-cyan-500/50 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                        : 'bg-[#090e1a]/60 border-slate-800/80 hover:bg-[#090e1a]/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
                            {item.stageCode}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                            {item.status}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                        <div className="text-sm font-medium text-slate-300 mt-1 flex items-center gap-2">
                          {getStageIcon(item.stage)}
                          <span>{item.institution}</span>
                          {item.location && (
                            <span className="text-xs text-slate-400 font-normal">
                              · {item.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Prominent Academic Score Display with Animated Reveal */}
                      {item.score && (
                        <div className="shrink-0 flex flex-col items-start sm:items-end p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 shadow-md group-hover:border-cyan-500/60 transition-colors">
                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                            {item.score.label}
                          </span>
                          <span
                            className="text-2xl font-black font-mono text-cyan-300 tabular-nums drop-shadow"
                            aria-label={item.score.display}
                          >
                            {displayScore}
                          </span>
                          {item.score.breakdown && (
                            <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                              {item.score.breakdown}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Concise Narrative Description */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
                      "{item.description}"
                    </p>

                    {/* Unboxed Separator Metadata */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/80">
                      {item.keyLearnings.map((learning, lIdx) => (
                        <React.Fragment key={learning}>
                          <span className="text-slate-300">{learning}</span>
                          {lIdx < item.keyLearnings.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Milestone Inspection Panel */}
          <div
            className={`lg:col-span-5 bg-[#090e1a]/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative sticky top-24 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 pb-3 mb-4 border-b border-slate-800">
              <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Milestone Inspector</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedStage.timeline}
              </span>
            </div>

            <div className="mb-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">
                {selectedStage.stageCode}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white font-display mb-2">
              {selectedStage.title}
            </h3>

            <div className="text-sm font-semibold text-cyan-300 mb-6 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>{selectedStage.institution}</span>
            </div>

            {/* Prominent Score Box */}
            {selectedStage.score && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">
                    {selectedStage.score.label}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {selectedStage.score.breakdown || selectedStage.status}
                  </div>
                </div>
                <div className="text-3xl font-black font-mono text-cyan-300 tabular-nums">
                  {selectedStage.score.display}
                </div>
              </div>
            )}

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Academic Focus
                </div>
                <p className="text-slate-200">
                  {selectedStage.narrative}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Key Academic Disciplines
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {selectedStage.keyLearnings.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded bg-slate-800/70 border border-slate-700/60 text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Factual Integrity Card */}
            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <div className="text-cyan-400 font-semibold mb-0.5">Academic Verification</div>
              All scores (96% SSLC, 96.5% Second PUC, 7.68 First-Year CGPA) represent verified results. Current status is second-year engineering in AI & ML.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
