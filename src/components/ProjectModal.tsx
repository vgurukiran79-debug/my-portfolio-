import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project } from '../data/portfolioData.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#090e1a] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 p-6 sm:p-8 z-10 my-8 overflow-hidden">
        {/* Subtle top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.number}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">{project.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              {project.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status & Verification Pill */}
        <div className="flex items-center gap-2 mb-6 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{project.status}</span>
          </span>
          <span className="text-slate-400 text-xs">
            Student Engineering Initiative
          </span>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-sm text-slate-300">
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Project Architecture & Overview
            </h4>
            <p className="leading-relaxed text-slate-200">
              {project.fullDesc}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Engineering Highlights & Focus Areas
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Stack */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Verified Technology Exploration
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-slate-800/60 border border-slate-700/50 text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Notice on Factual Grounding */}
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
            <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              This project is part of Guru Kiran's active undergraduate coursework and practical AI experimentation at KNS Institute of Technology. No commercial client claims or unverified metrics are asserted.
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
};
