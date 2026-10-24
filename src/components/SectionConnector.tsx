import React from 'react';

interface SectionConnectorProps {
  label?: string;
}

export const SectionConnector: React.FC<SectionConnectorProps> = ({ label }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center py-4 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {/* Top energy thread */}
      <div className="w-[1.5px] h-10 sm:h-14 bg-gradient-to-b from-transparent via-cyan-500/50 to-cyan-400" />

      {/* Neural Energy Junction Node */}
      <div className="relative my-1 flex items-center justify-center">
        {/* Subtle breathing aura */}
        <span className="absolute w-5 h-5 rounded-full bg-cyan-400/20 blur-[3px]" />
        {/* Core Node Bead */}
        <span className="w-2 h-2 rounded-full bg-cyan-300 border border-slate-900 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
        {label && (
          <span className="absolute left-6 font-mono text-[10px] text-cyan-400/70 tracking-widest uppercase whitespace-nowrap">
            {label}
          </span>
        )}
      </div>

      {/* Bottom energy thread extending into next section */}
      <div className="w-[1.5px] h-10 sm:h-14 bg-gradient-to-b from-cyan-400 via-sky-500/40 to-transparent" />
    </div>
  );
};
