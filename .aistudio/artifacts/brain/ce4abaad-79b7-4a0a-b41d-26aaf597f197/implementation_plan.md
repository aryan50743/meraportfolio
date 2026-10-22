# Aryan Gothwal — Creative Developer Portfolio & Experimental Lab

An interactive, high-retention personal developer portfolio and web laboratory for Aryan Gothwal (BCA Data Science graduate from JECRC University, Jaipur). Combines technical data science credentials with playable arcade games, a simulated UNIX CLI terminal, real-time CSS/data experiments, dynamic project sandboxes, and an interactive command palette.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions were skipped, so the following recommended default enhancements will be implemented to deliver a comprehensive, production-grade experience:
> 
> - **Arcade & Lab Depth**: In addition to faithful 1:1 visual fidelity with the reference mockup and prototype, each game (Snake, Reaction Test, Memory Match, Typing Challenge) and lab module will be fully playable with persistent high scores (localStorage) and real XP gains that update the live profile badge.
> - **Interactive Developer CLI**: The terminal will support a full set of simulated UNIX commands (`help`, `about`, `skills`, `projects`, `education`, `contact`, `clear`, `date`, `cat resume`, `sudo`, `matrix`, `neofetch`, `theme`, `play`, `echo`) with keyboard arrow history (Up/Down) and tab autocompletion.
> - **Interactive Project Sandboxes**: Clicking "Live Demo" or "View Notebook" will open interactive preview modals allowing visitors to test sample certificate generators and dataset EDA insights directly inside the site.
> - **Web Audio Synthesizer**: Subtle retro sound effects generated procedurally via the browser's native Web Audio API (keystrokes, game score chimes, reaction buzzers) with an intuitive global mute/unmute toggle.

---

## 1. Overview & Core Concept

- **What It Does**: A complete developer portfolio that doubles as an experimental playground. Visitors can explore Aryan's data science and engineering credentials, play arcade games, run terminal commands, customize interface accents dynamically, and inspect bulk automation and predictive analytics projects.
- **Target Audience / Persona**: Tech recruiters, engineering managers, data science teams, and collaborating developers seeking evidence of both technical data rigor and creative frontend craftsmanship.
- **Key Value**: Replaces flat, static portfolio resumes with high-engagement interactive proofs-of-work that demonstrate real coding skill, algorithms, state management, and aesthetic discipline.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero & Discovery**: Visitor lands on the dark cyberpunk-clean interface with live grain overlay and grid background. The live clock ticks Jaipur time (`Asia/Kolkata`), displaying current XP and academic credentials.
2. **Arcade Playground**: Visitor switches between Snake (WASD/Arrow canvas game), Reaction Test (dynamic color change timer with millisecond readout), Memory Match (card flip pairing), and Typing Challenge (real-time WPM & accuracy calculation). Earning points increments Aryan's XP counter.
3. **Developer Terminal**: Visitor types commands into the bash-like CLI (`help`, `neofetch`, `projects`, `cat resume.txt`) with live response streaming and keyboard history.
4. **Experimental Lab**:
   - *3D Tilt Card*: Interactive card reflecting mouse cursor coordinates with realistic 3D perspective transforms.
   - *Accent Color Switcher*: Live CSS variable updates switching the primary highlight across the whole application (Volt Lime `#ccff00`, Emerald `#22c55e`, Electric Blue `#3b82f6`, Hot Pink `#ec4899`).
   - *Parameter Model Visualizer*: Interactive slider dynamically rendering data multipliers and animated fill bars.
5. **Project Showcase & Interactive Modals**: Categorized portfolio filterable by `All`, `Data Science`, `Web Apps`, and `Tools`. Clicking cards or live demos launches full-screen detail modals with live demo sandboxes.
6. **Command Palette (`Cmd+K` / `Ctrl+K`)**: Global search modal enabling instant keyboard jump to any section, theme switch, or resume viewer.
7. **Resume & Contact**: Modal view of Aryan's complete CV with simulated PDF export; validated contact form with direct email copy toast (`aryangothwal6@gmail.com`).

### Visual Identity & Theme
- **Aesthetic Direction**: High-tech developer console, dark aesthetic with electric neo-brutalist accents, fine hairline borders (`border-white/10`), and subtle texture grain.
- **Color Palette**:
  - Neutral Canvas: Deep Obsidian (`#0a0a0c`, 60%)
  - Structural Surfaces: Charcoal Surface (`#121216`) & Elevated Card (`#1a1a20`, 30%)
  - Primary Highlight Accent: Electric Volt Lime (`#ccff00`, default 10%) with runtime switcher supporting Emerald (`#22c55e`), Cobalt Blue (`#3b82f6`), and Vivid Magenta (`#ec4899`).
  - Text: Stark White (`#f4f4f5`) and Muted Zinc (`#a1a1aa`).
- **Typography**:
  - Headings: `Space Grotesk` (geometric, bold display)
  - Body: `Geist` / `Plus Jakarta Sans`
  - Code & Telemetry: `JetBrains Mono` / monospace tabular numerals (`tabular-nums`)
- **Interactive Feedback & Motion**:
  - Micro-transitions ($\le 180\text{ms}$) on all buttons and cards.
  - Custom glowing cursor (with mouse movement tracking and link hover enlargement).
  - Web Audio synthesized audio blips for game events, toggleable via a sound icon in the navbar.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native Canvas & Procedural Games vs External Libraries**
  - *Chosen Approach*: Implement lightweight, zero-dependency HTML5 Canvas and React state machines for Snake, Reaction, Memory, and Typing games.
  - *Why*: Ultra-fast load times, zero bundle bloat, 60fps performance, and complete control over scoring, XP integration, and styling.
- **Decision 2: Web Audio API Synthesizer vs External Sound Files**
  - *Chosen Approach*: Procedurally synthesize retro 8-bit sound frequencies using the Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`).
  - *Why*: Eliminates broken audio asset URLs, requires zero network requests, works hermetically, and includes an explicit master mute control.
- **Decision 3: Single-Page Architecture with React & Tailwind CSS**
  - *Chosen Approach*: Single-page modular React application structured with clean sectional components, synchronized command palette, and modal portals.
  - *Why*: Enables seamless state sharing (e.g. global XP counter updated by games and terminal commands; global accent theme applied across all components).

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (src/App.tsx)                          │
│   ├── Global State: AccentColor, SoundMuted, TotalXP, ActiveModals     │
│   ├── Custom Cursor Tracker & Keyboard Shortcut Listener (Cmd+K)       │
└───────┬────────────────────────────────────────────────────────┬───────┘
        │                                                        │
┌───────▼──────────────────────────┐    ┌────────────────────────▼───────┐
│     Sticky Header / Navbar       │    │     Global Overlay Modals      │
│  - Brand AG Wordmark             │    │  - Command Palette (Cmd+K)     │
│  - Section Anchor Navigation     │    │  - Interactive Resume Modal    │
│  - Sound Toggle & Search Button  │    │  - Project Sandbox Modal       │
│  - Resume CTA Button             │    └────────────────────────────────┘
└───────┬──────────────────────────┘
        │
┌───────▼────────────────────────────────────────────────────────────────┐
│                          Main Page Sections                            │
│  ├── Hero Section                                                      │
│  │     - Status Indicator & Typographic Headline                       │
│  │     - Jaipur Real-time Clock & Live XP Badge                        │
│  │     - Quick Action Buttons                                          │
│  ├── Playground Arcade (src/components/Playground.tsx)                 │
│  │     - Snake Game (Canvas 2D, high-score, WASD controls)             │
│  │     - Reaction Test (Color-phase timer, millisecond precision)      │
│  │     - Memory Match (Emoji grid, flip pair matching)                 │
│  │     - Typing Challenge (Data Science snippet WPM/accuracy test)     │
│  ├── Developer Terminal (src/components/Terminal.tsx)                  │
│  │     - Bash CLI emulation with auto-scroll and history               │
│  │     - Built-in commands, neofetch, easter eggs, clear               │
│  ├── Experimental Web Lab (src/components/Lab.tsx)                     │
│  │     - 3D CSS Tilt card (perspective transform math)                 │
│  │     - Theme Accent Switcher (CSS root variables)                    │
│  │     - Data Parameter Slider & Dynamic Progress Graph                │
│  ├── Featured Work (src/components/Projects.tsx)                       │
│  │     - Category filtering: All, Data Science, Web Apps, Tools        │
│  │     - Project cards with tech stacks and demo/github links          │
│  ├── About Me & Timeline (src/components/About.tsx)                    │
│  │     - Bio, Degree details, chronological university milestones      │
│  ├── Skills Matrix (src/components/Skills.tsx)                         │
│  │     - Interactive expandable cards with proficiencies & tooling     │
│  ├── Contact Section (src/components/Contact.tsx)                      │
│  │     - Direct email copy with animated toast                         │
│  │     - Interactive validated contact form                            │
│  └── Footer with copyright, back-to-top smooth scroll                  │
└────────────────────────────────────────────────────────────────────────┘
```

### Component State & User Interaction Flow
1. **XP State**: Initialized at `0`, saved in `localStorage`. Playing any game or executing terminal commands awards XP with a floating notification and audio feedback.
2. **Accent Color System**: Managed via standard CSS custom properties `--color-primary` and applied via Tailwind utility classes, defaulting to `#ccff00`.
3. **Sound Synthesizer Helper**: Exposes methods `playBeep()`, `playSuccess()`, `playError()`, `playClick()`, and `playGameOver()`. Checks `isMuted` before triggering audio nodes.
4. **Interactive Validation**: Contact form fields are validated with instant inline feedback; submission triggers a confirmation toast and simulates email dispatch.
