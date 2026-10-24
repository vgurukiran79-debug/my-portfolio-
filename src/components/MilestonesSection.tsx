import React, { useState } from 'react';
import { MILESTONES, MilestoneItem } from '../data/portfolioData.ts';
import { Award, CheckCircle2, FileText, X } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export const MilestonesSection: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState<MilestoneItem | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="milestones"
      ref={sectionRef}
      className="relative py-28 bg-[#030712] border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/2 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
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
            Milestones & Verification · Practical Growth
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-4 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            MILESTONES & CONTINUOUS LEARNING
          </h2>
          <p
            className={`text-base text-slate-300 font-light leading-relaxed reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '180ms' }}
          >
            Verified academic competition milestones, foundational skill certifications, and dedicated generative AI learning tracks.
          </p>
        </div>

        {/* Milestones Cards Grid with Staggered Cascaded Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((item, idx) => (
            <div
              key={item.id}
              className={`bg-[#090e1a]/80 backdrop-blur-sm border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between card-hover-gleam reveal-scale-init group shadow-lg ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: `${150 + idx * 90}ms` }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 group-hover:border-cyan-500/40 transition-colors">
                    {item.verificationStatus}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-1">
                  {item.organization}
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  {item.category}
                </span>
                <button
                  onClick={() => setActiveMilestone(item)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors group/btn"
                >
                  <FileText className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Modal */}
      {activeMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveMilestone(null)}
          />
          <div className="relative w-full max-w-lg bg-[#090e1a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 z-10 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-1">
                  {activeMilestone.organization} · {activeMilestone.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {activeMilestone.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMilestone(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Verification Record</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeMilestone.summary}
              </p>
            </div>

            <div className="text-[11px] font-mono text-slate-400 mb-6">
              Official verification assets and certificate records can be provided upon academic request or verified through direct institutional contact.
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveMilestone(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
