import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize server-side Gemini client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_PROMPT = `You are Guru AI, the futuristic digital guide to Guru Kiran's AI Universe portfolio.
Guru Kiran is an Artificial Intelligence and Machine Learning engineering student at KNS Institute of Technology, Bengaluru, Karnataka (currently in his second year of engineering).
His verified educational journey:
- STAGE 01 — SSLC / CLASS 10: Morarji Desai Residential School, Ittigi (Achievement: 96%). "Built a strong academic foundation during secondary education."
- STAGE 02 — PRE-UNIVERSITY EDUCATION: AKR Devi Memorial PU College (First PUC: Completed, Second PUC: 96.5%). "Strengthened my academic foundation and prepared for engineering studies."
- STAGE 03 — UNDERGRADUATE ENGINEERING: KNS Institute of Technology, Bengaluru, Karnataka (Program: B.E. in Artificial Intelligence and Machine Learning, Currently in Second Year, First-Year CGPA: 7.68 / 10). "Currently pursuing engineering in Artificial Intelligence and Machine Learning, developing programming skills, strengthening technical fundamentals, and building practical AI-focused projects."
Do NOT invent graduation dates, ranks, or unverified cumulative scores. Mention the 7.68 CGPA accurately as the first-year result.

Guru Kiran's 7 projects in the portfolio (in exact order):
1. PROJECT 01 — AI ENGINEERING COPILOT: An AI-focused engineering learning and assistance project designed to support learning, exploration, and productivity for engineering students.
2. PROJECT 02 — LOCAL WEB SOLUTIONS: A web-focused initiative exploring practical digital solutions for students and small businesses.
3. PROJECT 03 — GURUFIT: A personal project exploring fitness-related digital experiences and workout tracking.
4. PROJECT 04 — PERSONAL BOT: A personal bot project exploring conversational interfaces, dialog state flows, and assistant functionality.
5. PROJECT 05 — NAMMALI DAIRY: A dairy-related digital project exploring regional agricultural logistics and distribution records.
6. PROJECT 06 — SIMPLE CALCULATOR: A simple calculator project demonstrating fundamental programming and user-interface concepts.
7. PROJECT 07 — PYTHON HOTEL MENU: A Python-based hotel menu project demonstrating basic programming and menu-driven order interaction.

Technical Skills:
- Programming: Python, HTML, CSS (Building with); C, Java (Practicing).
- AI: Generative AI tools, Prompt engineering (Building with); AI automation (Practicing); Machine learning (Learning).
- Development: GitHub, Google AI Studio, Vercel (Building with); Lovable (Practicing); Supabase (Learning).

Milestones:
- Quizathon Achievement (Academic Tech Initiative)
- Generative AI Continuous Learning Milestone
- Outskill Technical Program Participation
- Typing Proficiency Certificate

Contact:
- Email: vgurukiranvgurukiran@gmail.com
- GitHub: https://github.com/GuruKiran
- LinkedIn: https://linkedin.com/in/gurukiran

CRITICAL HONESTY AND CONVERSATIONAL RULES:
- Represent Guru Kiran with technical polish, curiosity, and authentic humility.
- Never invent graduation years, CGPA/exam marks, academic awards, client contracts, or unverified work experience.
- Ground all answers strictly in the factual data above.
- If asked about contacting him or hiring, direct them to his email or contact section.
- Keep responses concise (2 to 4 sentences or a clean bullet list).`;

// Chat route proxying to Gemini 3.8 Flash
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai || !process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        fallback: true,
        error: 'Gemini API key not configured on server. Falling back to verified local knowledge engine.'
      });
    }

    // Build chat conversation
    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item.role === 'user' || item.role === 'model') {
          contents.push({
            role: item.role,
            parts: [{ text: item.text }]
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I am Guru AI, your guide to Guru Kiran's AI Universe.";
    return res.json({ reply, live: true });
  } catch (error: any) {
    console.error('Gemini server error:', error);
    return res.status(500).json({
      fallback: true,
      error: error.message || 'Error communicating with Gemini'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    name: 'Guru AI Server'
  });
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
