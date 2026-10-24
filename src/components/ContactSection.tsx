import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 600);
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative pt-28 pb-16 bg-[#030712] border-t border-slate-900/80 overflow-hidden"
    >
      {/* Background glow with smooth scroll reveal opacity */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Contact Details & Heading */}
          <div className="lg:col-span-6">
            <div
              className={`text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              Initiate Dialogue · Future Collaboration
            </div>
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-display mb-6 leading-tight reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              LET'S BUILD SOMETHING INTELLIGENT.
            </h2>
            <p
              className={`text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8 reveal-init ${
                isVisible ? 'is-revealed' : ''
              }`}
              style={{ transitionDelay: '180ms' }}
            >
              "Have an idea, a project, or an interesting challenge? Let's connect and explore what's possible."
            </p>

            {/* Direct Channels with Staggered Entrance */}
            <div className="space-y-4">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={`flex items-center gap-4 p-4 rounded-xl bg-[#090e1a]/80 border border-slate-800 hover:border-cyan-500/40 card-hover-gleam transition-colors group reveal-scale-init ${
                  isVisible ? 'is-revealed' : ''
                }`}
                style={{ transitionDelay: '250ms' }}
              >
                <div className="p-3 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Direct Email</div>
                  <div className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl bg-[#090e1a]/80 border border-slate-800 hover:border-cyan-500/40 card-hover-gleam transition-colors group reveal-scale-init ${
                    isVisible ? 'is-revealed' : ''
                  }`}
                  style={{ transitionDelay: '320ms' }}
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                    <div>
                      <div className="text-xs font-mono text-slate-400">Repositories</div>
                      <div className="text-sm font-semibold text-white">GitHub</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-xl bg-[#090e1a]/80 border border-slate-800 hover:border-cyan-500/40 card-hover-gleam transition-colors group reveal-scale-init ${
                    isVisible ? 'is-revealed' : ''
                  }`}
                  style={{ transitionDelay: '380ms' }}
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-cyan-400 transition-colors" />
                    <div>
                      <div className="text-xs font-mono text-slate-400">Network</div>
                      <div className="text-sm font-semibold text-white">LinkedIn</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Message Dispatcher Form with Smooth Reveal */}
          <div
            className={`lg:col-span-6 bg-[#090e1a]/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl reveal-init ${
              isVisible ? 'is-revealed' : ''
            }`}
            style={{ transitionDelay: '280ms' }}
          >
            <h3 className="text-lg font-bold text-white font-display mb-1.5">
              Send a Transmission
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Reach out regarding AI collaborations, open-source projects, or engineering queries.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="name">
                  YOUR NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Maya Sharma"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="email">
                  YOUR EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5" htmlFor="message">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell Guru Kiran about your idea or question..."
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full py-3 px-6 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-60 hover:scale-[1.01] active:scale-[0.99]"
              >
                {status === 'sending' ? (
                  <span>DISPATCHING...</span>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                    <span>MESSAGE TRANSMITTED!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT MESSAGE</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs text-center font-mono">
                  Thank you! Your message has been logged. Guru Kiran will review your note shortly.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          className={`pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 reveal-init ${
            isVisible ? 'is-revealed' : ''
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          <div className="flex items-center gap-2.5">
            {/* Small tasteful animated AI symbol */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping opacity-30" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <span className="font-medium text-slate-300">
              Designed and built by Guru Kiran.
            </span>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            KNS Institute of Technology · Artificial Intelligence & Machine Learning
          </div>
        </div>
      </div>
    </footer>
  );
};
