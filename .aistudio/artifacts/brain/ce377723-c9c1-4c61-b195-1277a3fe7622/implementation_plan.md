# Guru Kiran — AI Universe Portfolio

A production-grade, immersive personal portfolio website for **Guru Kiran**, an Artificial Intelligence and Machine Learning engineering student at KNS Institute of Technology, Bengaluru. The application transforms his technical journey, projects, skills, and aspirations into an interactive, cinematic AI Universe powered by Three.js procedural 3D graphics, an intelligent dual-mode assistant (Guru AI), and responsive editorial layouts.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed through interactive clarification and define the core technical and visual strategy:

- **Confirmed Decision 1 (3D Rendering & Visual Style)**: Procedural neural core with interactive particle constellation. Built using Three.js with custom procedural geometry, floating luminous data nodes, and cursor-reactive camera choreography with graceful Software WebGL / reduced-motion fallback.
- **Confirmed Decision 2 (Guru AI Assistant Intelligence)**: Dual mode operation. A server-side Express proxy connects to Google Gemini 3.8 Flash (`@google/genai`) for conversational Q&A when an API key is available, paired with an instant, verified local knowledge engine fallback for zero-downtime, hallucination-free answers.
- **Confirmed Decision 3 (Project Showcase Interaction)**: Interactive holographic 3D cards with comprehensive modal deep-dives for all 7 specified projects in exact order, featuring honest status indicators, tech stacks, and source links.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Guru Kiran's engineering background, AI projects, skills constellation, education path, and milestones in a cinematic 3D universe. Visitors can navigate the universe, inspect live project architectures, test interactive skill nodes, and chat with the embedded **Guru AI** guide.
- **Target Audience / Persona**: Tech recruiters, engineering peers, hackathon organizers, AI researchers, and academic mentors looking for genuine talent in AI/ML and software development.
- **Key Value**: Replaces conventional, generic static templates with an authentic, future-focused experience that demonstrates real engineering capability, aesthetic restraint, and absolute factual honesty (no fake CGPAs, fabricated clients, or inflated metrics).

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Arrival & AI Portal Initiation**: The visitor lands on a deep cosmic void (`#030712`) dominated by an animated 3D neural core. Luminous data pathways pulse gently while cursor movements create subtle parallax. Clean typography introduces Guru Kiran without layout shift.
2. **Universe Exploration**:
   - Clicking **"Explore My Universe"** initiates a smooth glide to the **About Me: The Human Behind the Intelligence** timeline.
   - Clicking **"Discover My Projects"** jumps directly to the **Project Universe** showcase.
3. **Project Deep-Dive**: Hovering over any of the 7 project cards triggers subtle holographic tilt and glow. Clicking **"Inspect Project"** opens an accessible modal with architecture highlights, learning goals, verification status, and GitHub/demo actions.
4. **Skills Constellation**: Visitors interact with the **Skills Galaxy**, toggling between *Programming*, *Artificial Intelligence*, and *Development Tools*. Selecting any technology highlights connected nodes and provides a contextual breakdown categorized as *Learning*, *Practicing*, or *Building With*.
5. **Guru AI Interaction**: Visitors can launch the floating **Guru AI** orb at any point. Quick prompts (e.g., *"What is AI Engineering Copilot?"*, *"Who is Guru Kiran?"*) instantly answer questions grounded strictly in verified data, either via live Gemini API streaming or the structured local knowledge engine.
6. **Milestones & Education Inspection**: Visitors review Guru Kiran's academic journey at KNS Institute of Technology, Bengaluru, and verifiable milestones (Quizathon, Generative AI learning, Outskill participation, typing certification).
7. **Connection**: The visitor reaches the **Contact & Connect** section with validated channels (GitHub, LinkedIn, Email) and an interactive contact inquiry form.

### Visual Identity & Theme

- **Aesthetic Direction**: Cinematic Science-Fiction & Advanced AI Laboratory. Minimalist dark atmosphere, glassmorphic HUD overlays, clean hairline borders, and balanced whitespace.
- **Color Palette & Mood (60-30-10 Rule)**:
  - **60% Neutral Canvas**: Obsidian dark (`#030712` to `#080D1A`), deep space navy (`#0B1120`).
  - **30% Structural Surfaces**: Subdued card containers (`rgba(15, 23, 42, 0.75)`), frosted borders (`rgba(56, 189, 248, 0.12)`), soft gray typography (`#94A3B8`, `#E2E8F0`).
  - **10% High-Intent Accents**: Electric Cobalt (`#3B82F6`), Luminous Cyan (`#06B6D4`), Deep Violet (`#8B5CF6`).
- **Typography & Hierarchy**:
  - *Display / Headings*: Bold architectural sans-serif (`Outfit` / `Plus Jakarta Sans`) with tight tracking and balanced word wrap (`text-wrap: balance`).
  - *Body Prose*: Crisp, readable geometric sans (`Plus Jakarta Sans` / `DM Sans`), 15px–16px, line-height 1.6.
  - *Data & Tech Markers*: Clean tabular numerals and monospace accents (`font-mono tabular-nums`).
  - *Zero-Pill Discipline*: Categories, tags, and dates use unboxed text with subtle typographic separators (`·` or `/`), reserving rounded buttons strictly for functional filters and triggers.
- **Top Bar Contract**:
  - **Zone 1 (Brand)**: Single-line wordmark `Guru Kiran`.
  - **Zone 2 (Links)**: 5 concise links (`About`, `Projects`, `Skills`, `Milestones`, `Education`) with subtle hover transitions.
  - **Zone 3 (Primary Action)**: `Let's Connect` button opening the contact anchor.
  - Mobile: Clean slide-out overlay drawer adhering to the $\le 15\%$ sticky height rule.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Procedural Three.js 3D Core with Fallback Guard**:
  - *Chosen Approach*: Procedural multi-part geometry (`THREE.IcosahedronGeometry`, wireframe outer lattice, floating particle points, and glowing data pathways) generated entirely in code without external `.glb` or texture dependencies. WebGL capability probe (`isSoftwareGl`) ensures fluid 60fps rendering or graceful static 2D constellation fallback on low-end hardware.
  - *Why*: Eliminates 404 network failures, avoids multi-megabyte model downloads, and guarantees instant first contentful paint.
- **Decision 2: Dual-Mode Architecture for Guru AI**:
  - *Chosen Approach*: Server-side route `/api/gemini/chat` utilizes `@google/genai` with model `gemini-3.8-flash` and strict system instructions grounded in Guru Kiran's verified biography. If `GEMINI_API_KEY` is absent or the network is offline, the client seamlessly falls back to a verified local intent matching engine.
  - *Why*: Ensures the assistant is 100% functional out of the box in local dev, offline demos, or live hosted environments, while protecting API credentials server-side.
- **Decision 3: Factual Grounding & Placeholder Transparency**:
  - *Chosen Approach*: All 7 projects appear in exact specified order with honest status indicators (`In Development`, `Prototype`, `Core Concept`). No fake graduation dates, unverified GPA numbers, or fabricated client statistics.
  - *Why*: Protects professional credibility and communicates authentic curiosity and engineering diligence.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER (Vite + React)                   │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Top Bar Contract: Brand | 5 Nav Links | Action)       │
├────────────────────────────────────────────────────────────────────────┤
│  [Hero AI Portal]                                                      │
│    ├── Three.js Canvas Container (Procedural Neural Core & Particles)  │
│    └── Typographic Hero Overlay (Title, Tagline, Primary/Secondary CTA)│
├────────────────────────────────────────────────────────────────────────┤
│  [About Me: The Human Behind the Intelligence] (4-Stage Timeline)      │
├────────────────────────────────────────────────────────────────────────┤
│  [Project Universe] (7 Holographic 3D Cards + Modal Deep-Dives)       │
├────────────────────────────────────────────────────────────────────────┤
│  [Skills Galaxy] (Constellation Graph: Learning/Practicing/Building)   │
├────────────────────────────────────────────────────────────────────────┤
│  [Milestones & Learning] (Quizathon, GenAI, Outskill, Typing)          │
├────────────────────────────────────────────────────────────────────────┤
│  [Education Journey] (Class 10 -> Pre-University -> KNS Institute)     │
├────────────────────────────────────────────────────────────────────────┤
│  [Contact & Connect] + Footer with Animated AI Emblem                  │
├────────────────────────────────────────────────────────────────────────┤
│  [Floating Guru AI Assistant Widget]                                   │
│    ├── Quick Suggestion Chips & Chat History                           │
│    └── Client Request Handler (Dual Mode: Server API or Local Engine)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP POST /api/gemini/chat
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SERVER-SIDE PROXY (Node.js Express)                  │
├────────────────────────────────────────────────────────────────────────┤
│  - Endpoint: POST /api/gemini/chat                                     │
│  - Google GenAI SDK: `@google/genai` (User-Agent: 'aistudio-build')     │
│  - Model: `gemini-3.8-flash` with strictly grounded system prompt       │
│  - Env: Reads `process.env.GEMINI_API_KEY` without browser exposure    │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping

1. **`App.tsx`**: Main orchestration component managing global state (active modal, assistant open/closed, current section intersection observer).
2. **`components/Navbar.tsx`**: Single-line sticky header implementing the Top Bar Contract with mobile sheet navigation.
3. **`components/HeroPortal.tsx` & `components/NeuralCoreCanvas.tsx`**: Three.js procedural scene featuring:
   - Nested pulsating icosahedron core with custom wireframe and point cloud.
   - Orbiting constellation nodes with dynamic connecting lines.
   - Interactive mouse-tracking parallax with smooth lerp damping.
   - Software WebGL detection (`isSoftwareGl`) for frame pacing.
4. **`components/AboutSection.tsx`**: 4-stage narrative timeline with scroll-triggered illumination.
5. **`components/ProjectsSection.tsx` & `ProjectModal.tsx`**:
   - Project 01: AI Engineering Copilot
   - Project 02: Local Web Solutions
   - Project 03: GuruFit
   - Project 04: Personal Bot
   - Project 05: Nammali Dairy
   - Project 06: Simple Calculator
   - Project 07: Python Hotel Menu
   - Interactive 3D tilt effects, tech tag lists (unboxed with separators), and modal deep-dives.
6. **`components/SkillsGalaxy.tsx`**: Interactive graph filtering between Programming, AI, and Development with honest tiering (*Learning*, *Practicing*, *Building With*).
7. **`components/MilestonesSection.tsx`**: Verifiable milestones with certificate placeholder modals.
8. **`components/EducationSection.tsx`**: Chronological academic journey connecting school foundations to KNS Institute of Technology AI/ML engineering studies.
9. **`components/ContactSection.tsx`**: Clean direct contact links and functional message dispatcher with validation and feedback toasts.
10. **`components/GuruAssistant.tsx`**: Interactive digital assistant with holographic orb toggle, suggested prompts, message history, typing animation, and dual-mode AI engine.
11. **`server.ts`**: Express backend handling `/api/gemini/chat` with `@google/genai` and health check.

---

## 5. Implementation Stages & Verification Plan

1. **Setup & Dependencies**:
   - Install `three` and `@types/three`.
   - Update `metadata.json` with app title and description.
   - Update `index.html` with title and SEO OpenGraph meta tags.
2. **Data Structure & Types (`src/data/portfolioData.ts`)**:
   - Model verified data for projects, skills, timeline stages, education, milestones, and predefined Guru AI Q&A intents.
3. **Server Backend (`server.ts`)**:
   - Implement Express server with `/api/gemini/chat` calling `gemini-3.8-flash`.
   - Configure Vite dev server proxy for `/api`.
4. **Three.js 3D AI Portal (`src/components/NeuralCoreCanvas.tsx`)**:
   - Procedural geometry, glowing materials, particle system, and mouse reaction.
5. **Section Components**:
   - Hero, About, Projects, Skills, Milestones, Education, Contact, and Footer.
6. **Guru AI Assistant Component**:
   - Chat window, floating orb, suggestions, markdown rendering, and server/local dual fallback.
7. **Quality Assurance & Verification**:
   - Run `compile_applet` and `lint_applet` to ensure zero compilation or type errors.
   - Test responsive behavior across desktop (1440px), tablet, and mobile (375px).
   - Test WebGL fallback and reduced-motion compatibility.
