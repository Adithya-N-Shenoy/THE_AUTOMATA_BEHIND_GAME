# BOSS LEVEL — The Automata Behind Game AI

> **"Learn the Theory. Play the Machine. Understand the Logic."**  
> **Course:** CS3703 — Theory of Computation  
> **Assessment:** CIE-3 Video Presentation & Educational Game Lab  
> **Institution:** RV University  

---

## 🎮 Project Overview

**BOSS LEVEL** is an interactive educational web platform demonstrating how core concepts from **Theory of Computation (TOC)** secretly drive real-time video game mechanics and AI behaviors. 

Rather than viewing automata theory as abstract mathematical notation, this project bridges formal language theory and game engine engineering into **two integrated modules**:

1. **Interactive 18-Slide Presentation:** A university-ready conference-grade slide deck featuring reactive SVG state diagrams, live step execution traces, presenter scripts, time budgets, and a team contribution matrix.
2. **Playable Game Lab:** A genuine 4-level retro arcade game where each level is authoritatively controlled by a mathematical machine (DFA, NFA, Moore/Mealy, and Regular Expressions).

---

## 👥 Meet the Team & Speaking Allocations

| Player | Team Member | USN | Assigned Role | Slides Handled | Theoretical & Practical Deliverables |
|:---:|:---|:---|:---|:---:|:---|
| **P1** | **Adithya N Shenoy** *(Lead/Host)* | `1RUA24CSE0018` | Project Coordinator & DFA Mechanics Lead | **Slides 01–06** | Problem definition, TOC fundamentals ($\Sigma, w, L$), formal DFA 5-tuple ($M = (Q, \Sigma, \delta, q_0, F)$), transition table, and deterministic Double-Tap Dash mechanics. |
| **P2** | **Abhishek** | `1RUA24CSE0008` | NFA, Output Machines & Verification Lead | **Slides 07–10** | Konami cheat-code NFA detector, subset construction ($\text{NFA} \equiv \text{DFA}$), Moore (Boss HP) & Mealy (Hit Sparks) machines, and live step-by-step String Acceptance Verification. |
| **P3** | **Arjun** | `1RUA24CSE0065` | Minimization & Regular Expression Lead | **Slides 11–14** | Table-filling algorithm (Myhill-Nerode), Level 3 Combo regular expression ($W^*A$), Pumping Lemma contradiction proof ($a^n b^n$), and full-stack software architecture. |
| **P4** | **Chetan Nidgundi** | `1RUA24CSE0106` | Industry Applications & Testing Matrix Lead | **Slides 15–18** | Commercial game engine analysis (Pac-Man 1980, Unity Mecanim, Unreal 5 State Trees), automated test suite with formal invariants, team speaking matrix, and conclusion. |

---

## 🧠 Theory of Computation Concepts & Implementations

### 1. Deterministic Finite Automaton (DFA) — Double-Tap Dash (Slides 05–06 & Game Level 1)
* **Game Mechanic:** Double-tapping the tap button `[T]` within a short window triggers an evasive dash with invulnerability frames. Any other input `[O]` breaks the rhythm and resets the player to Idle.
* **Formal 5-Tuple:** $M = (Q, \Sigma, \delta, q_0, F)$
  * $Q = \{S_0, S_1, S_2\}$ where $S_0$ is Idle, $S_1$ is First Tap Logged, and $S_2$ is Dash Fired.
  * Alphabet: $\Sigma = \{t, o\}$ ($t = \text{Tap}$, $o = \text{Other action}$).
  * Start State: $q_0 = S_0$.
  * Accepting Set: $F = \{S_2\}$.
  * Transition Function $\delta: Q \times \Sigma \to Q$:
    $$\delta(S_0, t) = S_1, \quad \delta(S_0, o) = S_0$$
    $$\delta(S_1, t) = S_2, \quad \delta(S_1, o) = S_0$$
    $$\delta(S_2, t) = S_2, \quad \delta(S_2, o) = S_0$$
* **Language Recognized:** $L(M) = \{ w \in \{t, o\}^* \mid w \text{ ends with } tt \}$
* **Code Implementation:** `src/automata/dfa.ts` executes $\delta(q, a)$ deterministically in $O(1)$ time per frame with zero ambiguity.

---

### 2. Nondeterministic Finite Automaton (NFA) — Cheat Code Recognizer (Slides 07–08 & Game Level 2)
* **Game Mechanic:** Secret Konami-style code (`↑ ↑ ↓ ↓`) unlocks "God Mode" and high-damage lasers. The detector catches the code embedded anywhere in continuous gameplay noise (e.g. `← ↑ ↑ ↓ ↓`).
* **Why Nondeterminism?** A scanner state $s$ must loop on all alphabet symbols while simultaneously spawning a match branch on `↑`.
* **Transition Set Mapping:** $\delta: Q \times \Sigma \to \mathcal{P}(Q)$
  * State $s$ (Scanner): $\delta(s, \text{any}) = \{s\}$, $\delta(s, \uparrow) = \{s, c_1\}$.
  * State $c_1$ (First Up): $\delta(c_1, \uparrow) = \{c_2\}$.
  * State $c_2$ (Second Up): $\delta(c_2, \downarrow) = \{c_3\}$.
  * State $c_3$ (First Down): $\delta(c_3, \downarrow) = \{c_4\}$.
  * State $c_4$ (Terminal Code): $c_4 \in F$.
* **Subset Construction ($\text{NFA} \equiv \text{DFA}$):** At every step, the active state set is tracked across the power set $\mathcal{P}(Q)$. The string is accepted if and only if $\hat{\delta}(\{q_0\}, w) \cap F \neq \emptyset$.
* **Code Implementation:** `src/automata/nfa.ts` manages parallel branch expansion and state subset pruning.

---

### 3. Output Automata — Moore & Mealy Machines (Slide 09 & Game Level 3)
* **Why Output Machines?** Standard recognizers only yield a binary accept/reject at string end. Video games demand rich, frame-by-frame visual and combat feedback.
* **Moore Machine (State-Driven Output):**
  * $\lambda: Q \to \Delta$ (Output depends strictly on the current state).
  * Applied to **Boss Health Phase & Aura**:
    * $\text{HEALTHY} \to \text{GREEN Aura } (100\%–67\% \text{ HP})$
    * $\text{INJURED} \to \text{AMBER Aura } (66\%–34\% \text{ HP})$
    * $\text{CRITICAL} \to \text{RED Aura } (33\%–1\% \text{ HP})$
    * $\text{DEFEATED} \to \text{BLACK Aura } (0\% \text{ HP})$
  * Code: `src/automata/moore.ts`.
* **Mealy Machine (Transition-Driven Output):**
  * $\lambda: Q \times \Sigma \to \Delta$ (Output depends on current state **AND** input symbol).
  * Applied to **Hit Sparks & Dynamic Combat Damage**:
    * $(\text{READY}, \text{attack}) \to \text{CRITICAL SPARK } (25 \text{ damage}) \implies \text{COOLDOWN}$
    * $(\text{COOLDOWN}, \text{attack}) \to \text{GLANCING BLOW } (10 \text{ damage}) \implies \text{COOLDOWN}$
    * $(\text{COOLDOWN}, \text{tick}) \to \text{RECHARGED READY } (0 \text{ damage}) \implies \text{READY}$
  * Code: `src/automata/mealy.ts`.

---

### 4. String Acceptance Verification (Slide 10)
* **Formal Invariant:** A string $w$ is accepted by a DFA if and only if $\hat{\delta}(q_0, w) \in F$.
* **Step-by-Step Trace Demonstration:**
  * String `t o t t`: $\delta(S_0, t) = S_1 \to \delta(S_1, o) = S_0 \to \delta(S_0, t) = S_1 \to \delta(S_1, t) = S_2 \in F$ $\implies$ **ACCEPTED ✔** *(Dash executes!)*
  * String `t o t`: Ends in $S_1 \notin F$ $\implies$ **REJECTED ✖** *(Normal move; no dash).*
  * String `↑ ↑ ↓ ↓`: NFA power set ends with $\{s, c_4\}$ intersecting $F = \{c_4\}$ $\implies$ **ACCEPTED ✔** *(God Mode unlocked!)*
* **Component:** `src/components/presentation/StringAcceptanceSlide.tsx` offers interactive single-stepping, auto-run playback, tape ribbon visualization, and formal invariants.

---

### 5. DFA Minimization & Myhill-Nerode Theorem (Slide 11)
* **Game Engine Need:** Redundant states waste memory and harm CPU cache locality.
* **Table-Filling Algorithm:**
  1. Base case: Mark pairs $(p, q)$ where $p \in F$ and $q \notin F$ (distinguishable by $\varepsilon$).
  2. Inductive step: For unmarked $(p, q)$ and symbol $a \in \Sigma$, if $(\delta(p, a), \delta(q, a))$ is marked, then mark $(p, q)$.
  3. All remaining unmarked pairs are merged into single canonical equivalence classes.
* **Concrete Example:** A 5-state patrol controller with twin guard states $S_2 \equiv S_3$ minimizes to a 3-state optimal DFA with zero gameplay loss.

---

### 6. Regular Expressions — Combo Recognition (Slide 12 & Game Level 4)
* **Language Formula:** $L = \mathcal{L}(W^*A)$ (Zero or more Walk frames $W$, followed strictly by a terminal Attack $A$).
* **Operators Explained:**
  * **Union ($\cup$):** Selection between alternative combat inputs.
  * **Concatenation ($\cdot$):** Sequence of moves executed in order.
  * **Kleene Star ($*$):** Unbounded iteration of movement frames.
* **Thompson's Construction:** Converts Regex $\to$ $\text{NFA}-\varepsilon$ $\to$ DFA $\to$ Minimal 3-State Recognizer.
* **Code Implementation:** `src/automata/regex.ts`.

---

### 7. The Theoretical Wall — Pumping Lemma for Regular Languages (Slide 13)
* **The Counting Boss Problem:** $L = \{ a^n b^n \mid n \ge 1 \}$ (Requires exactly $n$ charge frames followed by exactly $n$ releases).
* **Pumping Lemma Theorem:** If $L$ is regular, there exists a pumping length $p$ such that any string $s \in L$ with $|s| \ge p$ can be written $s = xyz$ satisfying:
  1. $|xy| \le p$
  2. $|y| \ge 1$
  3. $xy^i z \in L$ for all $i \ge 0$
* **Proof by Contradiction:**
  * Choose $s = a^p b^p \in L$. Since $|xy| \le p$, substring $y$ consists exclusively of $a$'s ($y = a^k, k \ge 1$).
  * Pumping with $i = 2$ gives $xy^2 z = a^{p+k} b^p$.
  * Since $p + k \neq p$, $xy^2 z \notin L$. Contradiction!
* **Architectural Conclusion:** Finite automata cannot count arbitrarily. Games requiring nested dialogue trees or infinite undo buffers must transition to **Pushdown Automata (PDA)** and **Context-Free Grammars (CFG)**.

---

### 8. Real-World Commercial Game Applications (Slide 15)
* **Pac-Man (1980):** 3-state ghost FSM (Chase, Scatter, Frightened) designed by Toru Iwatani.
* **Unity Mecanim & Unreal Engine 5 State Trees:** Direct visual representations of the $\delta$ transition function and state variables.
* **Fighting Games (Street Fighter / Tekken):** Input buffers execute sliding-window DFA pattern recognizers for motion specials (e.g. $\downarrow \searrow \to + P$).
* **Multiplayer Chat & Packet Filters:** Regex automata (Aho-Corasick, DFA lexers) filter profanity and validate network packets in real-time.

---

## 🛠️ Software Architecture & Tech Stack

```
                              [ Controller / Keyboard Events ]
                                            │
                                            ▼
                                   [ Input Processor ]
                                            │
                ┌───────────────────────────┼───────────────────────────┐
                ▼                           ▼                           ▼
        [ DFAMachine ]               [ NFAMachine ]          [ Moore/Mealy & Regex ]
      (Level 1: Double-Tap)       (Level 2: Cheat Code)       (Levels 3 & 4: Boss/Combo)
                │                           │                           │
                └───────────────────────────┼───────────────────────────┘
                                            │
                                            ▼
                               [ Unified Game Engine State ]
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
       [ Canvas / React Game Stage ]              [ Reactive SVG Automata Visualizer ]
        (Arcade Physics & HUD)                      (Live Glowing Active Nodes & Paths)
```

* **Frontend:** React 19 + TypeScript (strict mode enabled).
* **Styling:** Tailwind CSS with retro CRT scanline overlays and neon arcade palettes.
* **Animations:** Framer Motion for smooth slide transitions, state hops, and arcade feedback.
* **Vector Graphics:** Native reactive SVG graph renderer (`AutomataDiagramSVG.tsx`).
* **Sound Synthesizer:** Pure Web Audio API 8-bit chip synthesizer (`src/sound/audio.ts`) with zero external `.mp3` or `.wav` dependencies.
* **State Persistence:** LocalStorage support for team customization and mute preferences with automated versioning.

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher

### Installation & Execution
```bash
# 1. Clone the repository
git clone https://github.com/your-username/boss-level-automata.git
cd boss-level-automata

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

### Production Build
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Academic Verification Test Suite

This project includes a formal automated test runner (`src/automata/testSuite.ts`) that executes live in the browser. 

To open the live test runner:
* Click **"Test Matrix"** in the top navigation bar, or
* Navigate to **Slide 16** and click **"Open Live Test Runner"**.

The suite runs **6 verification categories**:
1. **DFA Double-Tap Invariants:** Total transition function completeness (6 pairs) and exact acceptance of $tt$.
2. **NFA Cheat Code Invariants:** Correctness of substring-anywhere matching and branch creation on `↑`.
3. **Moore Machine Output Mapping:** State-dependent aura outputs ($q \to \Delta$).
4. **Mealy Machine Dynamic Combat:** Transition-dependent damage and spark effects ($(q, a) \to \Delta$).
5. **Regular Expression Combo ($W^*A$):** Positive tests (`A`, `WA`, `WWWA`) and negative tests (`AW`, `WW`, `WAW`, $\varepsilon$).
6. **Pumping Lemma Invariant:** Formal verification of string length and decomposition constraints.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|:---|:---|
| <kbd>→</kbd> / <kbd>Space</kbd> / <kbd>PageDown</kbd> | Next Presentation Slide |
| <kbd>←</kbd> / <kbd>PageUp</kbd> | Previous Presentation Slide |
| <kbd>Home</kbd> / <kbd>End</kbd> | Jump to First / Last Slide |
| <kbd>N</kbd> | Toggle Presenter Notes & Script Run Sheet |
| <kbd>F</kbd> | Toggle Fullscreen 16:9 Presentation Mode |
| <kbd>Esc</kbd> | Close Modals / Close Notes Drawer |
| <kbd>T</kbd> | Tap Button in Level 1 DFA Dash |
| <kbd>O</kbd> | Other Button in Level 1 DFA Dash |
| <kbd>R</kbd> | Reset Active Level Machine |

---

## 📁 Repository Structure

```
├── public/                     # Static assets
├── src/
│   ├── automata/               # Pure mathematical automata models
│   │   ├── dfa.ts              # DFA engine for Double-Tap Dash
│   │   ├── nfa.ts              # NFA engine with subset construction
│   │   ├── moore.ts            # Moore machine for Boss HP aura
│   │   ├── mealy.ts            # Mealy machine for combat sparks
│   │   ├── regex.ts            # W*A Regular Expression analyzer
│   │   └── testSuite.ts        # Automated academic verification suite
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Navbar.tsx      # Top bar with tab navigation & audio toggle
│   │   │   └── AutomataDiagramSVG.tsx # Reactive SVG automata visualizer
│   │   ├── game/               # Playable Game Lab levels
│   │   │   ├── Level1DFA.tsx   # Level 1: Double-Tap Dash
│   │   │   ├── Level2NFA.tsx   # Level 2: Secret Cheat Code
│   │   │   ├── Level3BossBattle.tsx # Level 3: Moore & Mealy Boss Fight
│   │   │   ├── Level4RegexCombo.tsx # Level 4: Combo Arena
│   │   │   ├── GameResultsModal.tsx # Trophy & Victory fanfare modal
│   │   │   └── GameLabView.tsx # Game Lab container & level switcher
│   │   └── presentation/       # 18-Slide interactive presentation
│   │       ├── PresentationView.tsx    # Slide deck container & keyboard handler
│   │       ├── SlideRenderer.tsx       # Individual slide layout renderer
│   │       ├── StringAcceptanceSlide.tsx # Abhishek's Slide 10 interactive tracer
│   │       ├── SpeakerNotesDrawer.tsx  # Slide run sheet & spoken script
│   │       ├── TeamEditorModal.tsx     # Student profile & USN editor
│   │       └── TestSuiteModal.tsx      # Live in-browser test runner modal
│   ├── data/
│   │   ├── slidesData.ts       # All 18 slides with notes, timing, & speakers
│   │   └── teamData.ts         # Team member profiles & localStorage sync
│   ├── sound/
│   │   └── audio.ts            # Web Audio API 8-bit chip synthesizer
│   ├── types/
│   │   └── automata.ts         # TypeScript interfaces & domain types
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # React DOM entry point
│   └── index.css               # Tailwind CSS & retro arcade scanlines
├── index.html                  # HTML entry point with metadata & fonts
├── metadata.json               # AI Studio application metadata
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Comprehensive project documentation
```

---

## 📜 Academic Integrity & License

This project was developed for academic assessment in **CS3703 Theory of Computation** at **RV University**.
* **License:** Apache License 2.0.
* **All models execute live:** No hardcoded outcomes, no third-party APIs, and no mocked test results.
