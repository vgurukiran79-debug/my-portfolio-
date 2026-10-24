import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, ChevronDown, Check, ArrowRight, CornerDownLeft } from 'lucide-react';
import { GURU_AI_INTENTS, PERSONAL_INFO, PROJECTS } from '../data/portfolioData.ts';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  mode?: 'live-gemini' | 'verified-local';
}

interface GuruAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const GuruAssistant: React.FC<GuruAssistantProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      sender: 'assistant',
      text: "Hey! Welcome to Guru Kiran's AI Universe. I'm Guru AI, your guide to his projects, skills, and journey into artificial intelligence. What would you like to explore?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: 'verified-local',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [engineStatus, setEngineStatus] = useState<'checking' | 'live' | 'local'>('checking');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check backend server availability
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data?.hasGeminiKey) {
          setEngineStatus('live');
        } else {
          setEngineStatus('local');
        }
      })
      .catch(() => {
        setEngineStatus('local');
      });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Suggested prompts
  const suggestedQuestions = [
    'Who is Guru Kiran?',
    'What projects has he built?',
    'What AI technologies does he use?',
    'What is AI Engineering Copilot?',
    'How can I contact him?',
  ];

  // Local knowledge lookup engine
  const findLocalAnswer = (query: string): string => {
    const qLower = query.toLowerCase().trim();

    // Check specific navigation requests
    if (qLower.includes('projects') && onNavigateSection) {
      onNavigateSection('projects');
    } else if ((qLower.includes('skills') || qLower.includes('technology')) && onNavigateSection) {
      onNavigateSection('skills');
    } else if (qLower.includes('contact') && onNavigateSection) {
      onNavigateSection('contact');
    }

    // Match against verified intents
    for (const intent of GURU_AI_INTENTS) {
      for (const keyword of intent.keywords) {
        if (qLower.includes(keyword)) {
          return intent.response;
        }
      }
    }

    // Default verified response
    return `Guru Kiran is an engineering student specializing in Artificial Intelligence & Machine Learning at KNS Institute of Technology, Bengaluru. He develops projects such as AI Engineering Copilot, Local Web Solutions, and GuruFit. Feel free to ask about his education, technical skills, or 7 portfolio projects!`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Attempt server-side Gemini request
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-5).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.live && data.reply) {
          setEngineStatus('live');
          setMessages((prev) => [
            ...prev,
            {
              id: `asst-${Date.now()}`,
              sender: 'assistant',
              text: data.reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              mode: 'live-gemini',
            },
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch (e) {
      // Network failure or fallback
    }

    // Fallback: Verified local knowledge engine with realistic response pacing
    setEngineStatus('local');
    setTimeout(() => {
      const localReply = findLocalAnswer(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: localReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mode: 'verified-local',
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'greeting',
        sender: 'assistant',
        text: "Hey! Welcome to Guru Kiran's AI Universe. I'm Guru AI, your guide to his projects, skills, and journey into artificial intelligence. What would you like to explore?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: 'verified-local',
      },
    ]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onClose}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-2xl shadow-cyan-500/40 transition-all duration-300 hover:scale-110 flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        aria-label="Open Guru AI Assistant"
      >
        <span className="absolute -inset-1 rounded-full bg-cyan-400/30 animate-ping opacity-40" />
        <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#090e1a]/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Assistant Header */}
      <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/60 flex items-center justify-center text-cyan-300">
            <Bot className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white font-display">
                GURU AI
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-400">
                {engineStatus === 'live' ? 'Live Gemini AI' : 'Verified Knowledge'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Portfolio Guide & Assistant
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={resetChat}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                  isUser
                    ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none shadow-md shadow-cyan-950/20'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
              </div>
              <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-500 font-mono">
                <span>{msg.timestamp}</span>
                {!isUser && msg.mode && (
                  <>
                    <span>·</span>
                    <span className="text-slate-400">
                      {msg.mode === 'live-gemini' ? 'Gemini 3.8 Flash' : 'Grounded'}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 max-w-[120px]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40">
        <div className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase">
          Suggested Explorations
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="text-[11px] font-mono whitespace-nowrap px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Guru AI about projects, skills, education..."
          className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-cyan-400 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-slate-950 transition-colors flex items-center justify-center shrink-0"
          aria-label="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
