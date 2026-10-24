import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { Github, ExternalLink, Sparkles, Terminal, Activity, Layers, Database, Calculator, UtensilsCrossed } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.08 });

  const filterTabs = [
    { id: 'all', label: 'All 7 Projects' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'web', label: 'Web & Applications' },
    { id: 'fundamentals', label: 'Computing Fundamentals' },
  ];

  const getFilteredProjects = () => {
    if (categoryFilter === 'ai') {
      return PROJECTS.filter((p) => p.tags.some((t) => t.includes('AI') || t.includes('NLP') || t.includes('Prompt')));
    }
    if (categoryFilter === 'web') {
      return PROJECTS.filter((p) => p.tags.some((t) => t.includes('Web') || t.includes('HTML') || t.includes('AgriTech') || t.includes('Fitness')));
    }
    if (categoryFilter === 'fundamentals') {
      return PROJECTS.filter((p) => p.status === 'Completed Fundamental' || p.category.includes('Procedural') || p.category.includes('Core'));
    }
    return PROJECTS; // Defaults to exact 7 projects in exact order
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'project-01':
        return <Terminal className="w-8 h-8 text-sky-400" />;
      case 'project-02':
        return <Layers className="w-8 h-8 text-indigo-400" />;
      case 'project-03':
        return <Activity className="w-8 h-8 text-emerald-400" />;
      case 'project-04':
        return <Sparkles className="w-8 h-8 text-purple-400" />;
      case 'project-05':
        return <Database className="w-8 h-8 text-amber-400" />;
      case 'project-06':
        return <Calculator className="w-8 h-8 text-pink-400" />;
      case 'project-07':
        return <UtensilsCrossed className="w-8 h-8 text-cyan-400" />;
      default:
        return <Terminal className="w-8 h-8 text-cyan-400" />;
    }
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 bg-[#030712] border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background ambient lighting with depth parallax */}
      <div
        className={`absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        className={`absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
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
              Engineering Lab · Practical Work
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-4 reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              PROJECT UNIVERSE
            </h2>
            <p
              className={`text-base text-slate-300 font-light leading-relaxed reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '180ms' }}
            >
              A curated continuum of practical software initiatives, student exploratory prototypes, and foundational engineering systems—presented in development sequence.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl shrink-0 reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '220ms' }}
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  categoryFilter === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid with Progressive Staggered Perspective Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-[1000px]">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx === 0;
            return (
              <div
                key={project.id}
                className={`relative group bg-[#090e1a]/80 backdrop-blur-md border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between card-hover-gleam reveal-scale-init ${
                  isVisible ? 'is-revealed' : ''
                } ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#0c1322] to-[#090e1a]' : ''
                }`}
                style={{
                  transitionDelay: `${150 + idx * 80}ms`,
                }}
              >
                <div>
                  {/* Card Top: Number, Category, and Status */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-xs font-semibold text-cyan-400 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-80" />
                      <span>{project.number}</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2.5 py-0.5 rounded border border-slate-800 group-hover:border-slate-700 transition-colors">
                      {project.status}
                    </span>
                  </div>

                  {/* Thumbnail / Visual Identity Abstract Artwork with Hover Zoom */}
                  <div className="mb-6 h-36 rounded-xl bg-slate-950/70 border border-slate-800/60 flex items-center justify-center relative overflow-hidden group-hover:border-cyan-500/30 transition-colors">
                    {/* Geometric Grid Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 group-hover:opacity-60 transition-opacity" />
                    {/* Glowing Aura */}
                    <div
                      className="absolute w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-300"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    {/* Icon Representation */}
                    <div className="relative z-10 p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-lg group-hover:scale-110 group-hover:border-cyan-500/30 transition-transform duration-300">
                      {getProjectIcon(project.id)}
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2.5 group-hover:text-cyan-300 transition-colors">
                    {project.name}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {project.shortDesc}
                  </p>

                  {/* Technology Tags (Unboxed Text with Typographic Separators) */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-mono mb-6">
                    {project.tags.map((tag, tagIdx) => (
                      <React.Fragment key={tag}>
                        <span className="text-slate-300 group-hover:text-slate-200 transition-colors">
                          {tag}
                        </span>
                        {tagIdx < project.tags.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 py-1.5 transition-colors focus:outline-none focus-visible:underline group/btn"
                  >
                    <span>Inspect Project</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
