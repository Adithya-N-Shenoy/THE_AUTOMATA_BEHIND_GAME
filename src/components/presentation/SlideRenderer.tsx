import React from 'react';
import { SlideData, TeamMember } from '../../types/automata';
import { AutomataDiagramSVG } from '../common/AutomataDiagramSVG';
import { StringAcceptanceSlide } from './StringAcceptanceSlide';
import {
  Gamepad2,
  Users,
  Cpu,
  Layers,
  ArrowRight,
  Code,
  ShieldAlert,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
  CheckCircle,
  FileText,
  Workflow,
  Target,
  Edit3,
} from 'lucide-react';

interface SlideRendererProps {
  slide: SlideData;
  teamMembers: TeamMember[];
  onGoToSlide: (slideNumber: number) => void;
  onGoToGameLevel: (level: number) => void;
  onOpenTeamEditor: () => void;
  onOpenTestSuite: () => void;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  teamMembers,
  onGoToSlide,
  onGoToGameLevel,
  onOpenTeamEditor,
  onOpenTestSuite,
}) => {
  // SLIDE 1: Title Screen
  if (slide.id === 1) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 md:p-12 arcade-grid">
        {/* Course Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10182B] border border-[#00FF9C]/30 text-xs font-mono text-[#8FA3B8] mb-6">
          <Gamepad2 className="w-4 h-4 text-[#00FF9C]" />
          <span>CS3703 · THEORY OF COMPUTATION · CIE-3 VIDEO PRESENTATION</span>
          <span className="text-[#00FF9C]">· RV UNIVERSITY</span>
        </div>

        {/* Decorative Title Line */}
        <div className="flex items-center gap-3 my-2 opacity-80">
          <span className="w-20 md:w-32 h-0.5 bg-gradient-to-r from-transparent to-[#00FF9C]" />
          <span className="w-2 h-2 rounded-full bg-[#00FF9C] shadow-[0_0_10px_#00FF9C]" />
          <span className="w-2 h-2 rounded-full bg-[#FF2E88] shadow-[0_0_10px_#FF2E88]" />
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
          <span className="w-20 md:w-32 h-0.5 bg-gradient-to-l from-transparent to-[#00FF9C]" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-arcade text-[#00FF9C] glow-green tracking-wider mt-4">
          BOSS LEVEL
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-tech font-bold text-white tracking-widest mt-4">
          THE <span className="text-[#FF2E88] glow-pink">AUTOMATA</span> BEHIND GAME AI
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#8FA3B8] font-tech max-w-2xl mt-4 leading-relaxed">
          Learn the Theory. Play the Machine. Understand the Logic.
          <br />
          How DFA, NFA, Moore, Mealy, and Regular Expressions secretly run video-game mechanics.
        </p>

        {/* Start Presentation Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onGoToSlide(2)}
            className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-arcade text-xs md:text-sm font-bold shadow-[0_0_30px_rgba(0,255,156,0.5)] active:scale-95 transition-all cursor-pointer"
          >
            <span>▶ START PRESENTATION</span>
          </button>

          <button
            onClick={() => onGoToGameLevel(1)}
            className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#10182B] hover:bg-[#152038] border-2 border-[#38BDF8] text-[#38BDF8] font-mono text-xs md:text-sm font-bold shadow-[0_0_20px_rgba(56,189,248,0.2)] active:scale-95 transition-all cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>JUMP TO GAME LAB</span>
          </button>
        </div>

        {/* Bottom HUD metadata */}
        <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between text-xs font-mono text-[#8FA3B8]">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">TEAM: 4 MEMBERS</span>
            <span>TIMING: ~11:45 RUN (18 SLIDES)</span>
            <span>RV UNIVERSITY · CIE-3</span>
          </div>
          <div className="text-[#FF2E88] font-bold font-mono animate-pulse">
            ★ INSERT COIN TO PLAY
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 2: Meet the Team Profile
  if (slide.id === 2) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#00FF9C] tracking-widest">
              MISSION BRIEFING · 01
            </div>
            <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
              PLAYERS READY — TEAM PROFILE
            </h2>
          </div>
          <button
            onClick={onOpenTeamEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#00FF9C] bg-[#00FF9C]/10 border border-[#00FF9C]/30 hover:bg-[#00FF9C]/20 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Team Details
          </button>
        </div>

        {/* 4 Player Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
          {teamMembers.map((m, idx) => (
            <div
              key={m.id}
              className="rounded-xl p-5 bg-[#10182B] border flex flex-col justify-between relative shadow-lg hover:border-opacity-80 transition-all"
              style={{ borderColor: `${m.color}55` }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${m.color}15`, color: m.color }}
                  >
                    PLAYER {idx + 1}
                  </span>
                  <span className="text-[10px] text-[#8FA3B8] font-mono">{m.slidesHandled}</span>
                </div>

                <div className="text-base font-bold text-white font-tech truncate">{m.name}</div>
                <div className="text-xs font-mono text-[#8FA3B8] mt-0.5">USN: {m.usn}</div>

                <div className="mt-3 text-xs font-semibold text-[#E8F1F2]" style={{ color: m.color }}>
                  {m.role}
                </div>

                <div className="mt-3 text-xs text-[#8FA3B8] leading-relaxed">
                  <span className="block font-bold text-white text-[11px] mb-1">Key Focus:</span>
                  {m.topics}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] text-[#8FA3B8]">
                <span className="block text-[#00FF9C] font-mono text-[10px] mb-0.5">CONTRIBUTIONS:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {m.contributions.slice(0, 2).map((c, i) => (
                    <li key={i} className="truncate">{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Every team member presents on camera and contributes to the codebase.</span>
          <span className="text-[#00FF9C]">RV University · CS3703 CIE-3</span>
        </div>
      </div>
    );
  }

  // SLIDE 3: The Mission — What Are We Building?
  if (slide.id === 3) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="text-xs font-mono text-[#00FF9C] tracking-widest">
            MISSION BRIEFING · 02
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            THE MISSION — BUILD A BOSS AI IN 3 LEVELS
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            Every game you love runs on machines you can prove things about. Today we design one boss enemy — level by level — and back every design decision with formal Theory of Computation.
          </p>
        </div>

        {/* 3 Level Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#00FF9C]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00FF9C] font-bold">STAGE 1</span>
                <span className="text-3xl font-mono text-[#00FF9C] font-bold">01</span>
              </div>
              <h3 className="text-lg font-bold font-tech text-white mt-2">PATROL PROTOCOL</h3>
              <p className="text-xs text-[#8FA3B8] mt-2 leading-relaxed">
                Deterministic Finite Automaton (DFA) controlling discrete player movement and the double-tap dash mechanic. One exact transition per symbol.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] font-mono text-[#00FF9C]">
              MODULE 1 · DFA &amp; STRINGS
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#10182B] border border-[#FF2E88]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#FF2E88] font-bold">STAGE 2</span>
                <span className="text-3xl font-mono text-[#FF2E88] font-bold">02</span>
              </div>
              <h3 className="text-lg font-bold font-tech text-white mt-2">BOSS BRAIN &amp; OUTPUTS</h3>
              <p className="text-xs text-[#8FA3B8] mt-2 leading-relaxed">
                NFA recognizing cheat codes (UP UP DOWN DOWN) via parallel active state sets. Moore &amp; Mealy machines generating health status and critical hit sparks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] font-mono text-[#FF2E88]">
              MODULES 1–2 · NFA &amp; MOORE/MEALY
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#10182B] border border-[#38BDF8]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#38BDF8] font-bold">STAGE 3</span>
                <span className="text-3xl font-mono text-[#38BDF8] font-bold">03</span>
              </div>
              <h3 className="text-lg font-bold font-tech text-white mt-2">COMBO MODE &amp; LIMITS</h3>
              <p className="text-xs text-[#8FA3B8] mt-2 leading-relaxed">
                Regular Expression (W*A) combo recognition compiled into an optimal DFA. Mathematical proof of finite automata limits via the Pumping Lemma.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] font-mono text-[#38BDF8]">
              MODULE 2 · REGEX &amp; PUMPING LEMMA
            </div>
          </div>
        </div>

        {/* System Architecture Diagram */}
        <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B]">
          <span className="text-xs font-mono text-[#8FA3B8] block mb-2">SYSTEM ARCHITECTURE PIPELINE:</span>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-center">
            <div className="p-2.5 rounded bg-[#10182B] border border-[#00FF9C]/30 text-[#00FF9C] flex-1 min-w-[120px]">
              1. PLAYER INPUT<br /><span className="text-[10px] text-[#8FA3B8]">(Keyboard / D-Pad)</span>
            </div>
            <span className="text-[#8FA3B8]">➔</span>
            <div className="p-2.5 rounded bg-[#10182B] border border-[#38BDF8]/30 text-[#38BDF8] flex-1 min-w-[120px]">
              2. INPUT PROCESSOR<br /><span className="text-[10px] text-[#8FA3B8]">(Alphabet Σ mapping)</span>
            </div>
            <span className="text-[#8FA3B8]">➔</span>
            <div className="p-2.5 rounded bg-[#10182B] border border-[#FF2E88]/30 text-[#FF2E88] flex-1 min-w-[120px]">
              3. AUTOMATA ENGINE<br /><span className="text-[10px] text-[#8FA3B8]">(δ Transition Logic)</span>
            </div>
            <span className="text-[#8FA3B8]">➔</span>
            <div className="p-2.5 rounded bg-[#10182B] border border-[#F5A623]/30 text-[#F5A623] flex-1 min-w-[120px]">
              4. GAME STATE<br /><span className="text-[10px] text-[#8FA3B8]">(Positions / HP / Combos)</span>
            </div>
            <span className="text-[#8FA3B8]">➔</span>
            <div className="p-2.5 rounded bg-[#10182B] border border-[#00FF9C]/30 text-[#00FF9C] flex-1 min-w-[120px]">
              5. SVG VISUALIZER<br /><span className="text-[10px] text-[#8FA3B8]">(Live State Feedback)</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 4: TOC Fundamentals
  if (slide.id === 4) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="text-xs font-mono text-[#00FF9C] tracking-widest">
            STAGE SELECT · MODULE 1
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            THEORY OF COMPUTATION FUNDAMENTALS
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-2xl leading-relaxed">
            Every character action, combo string, and game loop maps cleanly to formal language theory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#00FF9C]/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#00FF9C] font-bold">ALPHABET (Σ)</span>
                <p className="text-xs text-[#8FA3B8] mt-0.5">A finite, non-empty set of symbols.</p>
              </div>
              <div className="text-xs font-mono font-bold text-white bg-[#0A0E1A] px-3 py-1.5 rounded border border-[#1E293B]">
                Σ = &#123; t, o &#125; (Tap / Other)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#38BDF8]/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#38BDF8] font-bold">STRING (w)</span>
                <p className="text-xs text-[#8FA3B8] mt-0.5">A finite sequence of symbols chosen from Σ.</p>
              </div>
              <div className="text-xs font-mono font-bold text-white bg-[#0A0E1A] px-3 py-1.5 rounded border border-[#1E293B]">
                w = &quot;t o t t&quot; (|w| = 4)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#FF2E88]/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#FF2E88] font-bold">LANGUAGE (L)</span>
                <p className="text-xs text-[#8FA3B8] mt-0.5">A set of strings over Σ (subset of Σ*).</p>
              </div>
              <div className="text-xs font-mono font-bold text-white bg-[#0A0E1A] px-3 py-1.5 rounded border border-[#1E293B]">
                L = &#123; w | w ends in &quot;tt&quot; &#125;
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-2">
                GAME MECHANICS AS COMPUTATIONAL OBJECTS
              </span>
              <p className="text-xs text-[#8FA3B8] leading-relaxed">
                When a player executes a double-tap dash in a platformer, the game engine does not need complex neural networks. It executes a discrete finite state machine:
              </p>
              <ul className="mt-3 space-y-2 text-xs font-mono text-[#E8F1F2]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C]" />
                  <span>Controller Buttons = Symbols (Σ)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  <span>Input History = String of Symbols</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E88]" />
                  <span>Valid Combo Set = Regular Language</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
                  <span>Dash Trigger = Accepting State (F)</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-xs font-mono">
              <span className="text-[#8FA3B8]">Handover to Player 2</span>
              <span className="text-[#00FF9C] font-bold">Level 1: DFA Engine ▶</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-center text-[#8FA3B8]">
          Kleene Star Σ* denotes the set of all possible strings of all lengths over alphabet Σ, including empty string ε.
        </div>
      </div>
    );
  }

  // SLIDE 5: Level 1 DFA Formal Definition
  if (slide.id === 5) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="text-xs font-mono text-[#00FF9C] tracking-widest">
            LEVEL 1 · DOUBLE-TAP DASH
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            THE DETERMINISTIC FINITE AUTOMATON (DFA)
          </h2>
          <div className="mt-2 p-2 rounded-lg bg-[#10182B] border border-[#00FF9C]/30 text-center font-mono text-sm md:text-base font-bold text-[#00FF9C] tracking-widest">
            M = (Q, Σ, δ, q₀, F)
          </div>
        </div>

        {/* 5-Tuple Definition Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 my-4">
          <div className="p-3 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <span className="text-xs font-mono text-[#00FF9C] font-bold">Q — STATES</span>
            <div className="text-xs font-mono text-white mt-1">&#123;S0, S1, S2&#125;</div>
            <p className="text-[11px] text-[#8FA3B8] mt-1">S0: Idle, S1: Tap 1, S2: Dash</p>
          </div>

          <div className="p-3 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <span className="text-xs font-mono text-[#00FF9C] font-bold">Σ — ALPHABET</span>
            <div className="text-xs font-mono text-white mt-1">&#123;t, o&#125;</div>
            <p className="text-[11px] text-[#8FA3B8] mt-1">t = tap symbol, o = other input</p>
          </div>

          <div className="p-3 rounded-xl bg-[#10182B] border border-[#00FF9C]/40 bg-[#00FF9C]/5">
            <span className="text-xs font-mono text-[#00FF9C] font-bold">δ — TRANSITIONS</span>
            <div className="text-xs font-mono text-white mt-1">Q × Σ → Q</div>
            <p className="text-[11px] text-[#8FA3B8] mt-1">Exactly ONE move per (state, symbol)</p>
          </div>

          <div className="p-3 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <span className="text-xs font-mono text-[#00FF9C] font-bold">q₀ — START</span>
            <div className="text-xs font-mono text-white mt-1">q₀ = S0</div>
            <p className="text-[11px] text-[#8FA3B8] mt-1">The initial spawn state</p>
          </div>

          <div className="p-3 rounded-xl bg-[#10182B] border border-[#FF2E88]/40 bg-[#FF2E88]/5">
            <span className="text-xs font-mono text-[#FF2E88] font-bold">F — ACCEPTING</span>
            <div className="text-xs font-mono text-white mt-1">F = &#123;S2&#125;</div>
            <p className="text-[11px] text-[#8FA3B8] mt-1">Dash activation frame</p>
          </div>
        </div>

        {/* Live SVG Diagram */}
        <AutomataDiagramSVG type="DFA" activeStates={['S2']} />

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Determinism guarantee: one memory lookup per game frame.</span>
          <span className="text-[#00FF9C]">Next: Transition Table &amp; Execution Trace ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 6: DFA Transition Trace & Table
  if (slide.id === 6) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#00FF9C] tracking-widest">
              LEVEL 1 · WORKED TRACE
            </div>
            <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
              DFA TRANSITION TABLE &amp; STEP EXECUTION
            </h2>
          </div>
          <button
            onClick={() => onGoToGameLevel(1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,255,156,0.3)] transition-all cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            Try This in Game Lab
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4">
          {/* Table (5 cols) */}
          <div className="md:col-span-5 p-5 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-3">
              TRANSITION TABLE δ(q, a)
            </span>
            <table className="w-full text-xs font-mono text-center border-collapse">
              <thead>
                <tr className="bg-[#0A0E1A] text-[#00FF9C] border-b border-[#1E293B]">
                  <th className="py-2.5 px-3 text-left">State</th>
                  <th className="py-2.5 px-3">t (Tap)</th>
                  <th className="py-2.5 px-3">o (Other)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                <tr>
                  <td className="py-2.5 px-3 text-left font-bold text-white">→ S0 (Idle)</td>
                  <td className="py-2.5 px-3 text-[#00FF9C]">S1</td>
                  <td className="py-2.5 px-3 text-[#8FA3B8]">S0</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-left font-bold text-white">S1 (Tap 1)</td>
                  <td className="py-2.5 px-3 text-[#FF2E88] font-bold">S2 ★</td>
                  <td className="py-2.5 px-3 text-[#8FA3B8]">S0</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-left font-bold text-[#FF2E88]">* S2 (Dash)</td>
                  <td className="py-2.5 px-3 text-[#00FF9C]">S2</td>
                  <td className="py-2.5 px-3 text-[#8FA3B8]">S0</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 text-[11px] text-[#8FA3B8] leading-relaxed">
              Every row has exactly one entry per alphabet column. No missing transitions (no partial functions), no multiple targets.
            </div>
          </div>

          {/* Worked Trace Comparison (7 cols) */}
          <div className="md:col-span-7 p-5 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-3">
                STEP-BY-STEP TRACE: ACCEPTED VS. REJECTED
              </span>

              {/* Accepted trace */}
              <div className="p-3.5 rounded-lg bg-[#00FF9C]/10 border border-[#00FF9C]/30 mb-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#00FF9C] font-bold">
                  <span>INPUT: &quot;t o t t&quot;</span>
                  <span>✔ ACCEPTED (DASH FIRES)</span>
                </div>
                <div className="mt-2 text-xs font-mono text-[#E8F1F2] space-y-1">
                  <div>Step 1: δ(S0, t) = S1 <span className="text-[#8FA3B8]">(first tap recorded)</span></div>
                  <div>Step 2: δ(S1, o) = S0 <span className="text-[#FF2E88]">(reset: wrong rhythm)</span></div>
                  <div>Step 3: δ(S0, t) = S1 <span className="text-[#8FA3B8]">(new tap recorded)</span></div>
                  <div className="font-bold text-[#00FF9C]">Step 4: δ(S1, t) = S2 ∈ F (accepting dash frame!)</div>
                </div>
              </div>

              {/* Rejected trace */}
              <div className="p-3.5 rounded-lg bg-[#FF2E88]/10 border border-[#FF2E88]/30">
                <div className="flex items-center justify-between text-xs font-mono text-[#FF2E88] font-bold">
                  <span>INPUT: &quot;t o&quot;</span>
                  <span>✖ REJECTED (NO DASH)</span>
                </div>
                <div className="mt-2 text-xs font-mono text-[#E8F1F2] space-y-1">
                  <div>Step 1: δ(S0, t) = S1</div>
                  <div>Step 2: δ(S1, o) = S0 ∉ F <span className="text-[#FF2E88]">(ends in idle state S0)</span></div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-[11px] font-mono text-[#8FA3B8]">
              Language recognized: <code className="text-[#00FF9C]">L = &#123; w | w ends with &quot;tt&quot; &#125;</code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Completed Slides 3–6 (Adithya N Shenoy · 1RUA24CSE0018)</span>
          <span className="text-[#38BDF8]">Handover to Abhishek (1RUA24CSE0008): Boss Brain, NFA &amp; Output Machines (Slide 7) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 7: Level 2 NFA Cheat Code Detector
  if (slide.id === 7) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="text-xs font-mono text-[#FF2E88] tracking-widest">
            LEVEL 2 · BOSS BRAIN
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            THE NONDETERMINISTIC FINITE AUTOMATON (NFA)
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            Real enemies must handle uncertainty: the same input may deserve different reactions depending on context. Our cheat code detector searches for <strong className="text-white">UP UP DOWN DOWN</strong> embedded anywhere in an ongoing input stream.
          </p>
        </div>

        {/* NFA Mechanics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#FF2E88]/30">
            <span className="text-xs font-mono text-[#FF2E88] font-bold block mb-1">
              1. MULTIPLE POSSIBLE TARGETS
            </span>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              Transition function <span className="font-mono text-white">δ(q, a) ⊆ Q</span> yields a set of states. When the player enters UP, scanner <span className="font-mono text-white">&apos;s&apos;</span> forks into both <span className="font-mono text-white">&#123;s, c1&#125;</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#38BDF8]/30">
            <span className="text-xs font-mono text-[#38BDF8] font-bold block mb-1">
              2. SUB-STRING ANYWHERE MATCHING
            </span>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              Scanner state loops on every controller symbol. Even after 50 noise inputs (e.g. LEFT, B, RIGHT), the NFA retains the scanner and catches the code.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#00FF9C]/30">
            <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-1">
              3. PARALLEL EXPLORATION
            </span>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              The machine explores every computational branch concurrently. If at least ONE branch reaches an accepting state, the entire input is accepted!
            </p>
          </div>
        </div>

        {/* Live SVG NFA */}
        <AutomataDiagramSVG type="NFA" activeStates={['s', 'c1']} />

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Note: Nondeterminism is a mathematical recognition model, not random RNG.</span>
          <span className="text-[#FF2E88]">Next: Subset Construction &amp; Power Set ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 8: NFA Active States & Subset Construction
  if (slide.id === 8) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="text-xs font-mono text-[#FF2E88] tracking-widest">
            THEORY FOCUS · EQUIVALENCE
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            SUBSET CONSTRUCTION: NFA ≡ DFA
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            How does deterministic hardware simulate an NFA? By tracking the subset of all currently active states — like fog-of-war tracking in RTS games.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B] space-y-3">
            <span className="text-xs font-mono text-[#FF2E88] font-bold block mb-1">
              THE POWER SET CONSTRUCTION
            </span>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              Given NFA <span className="font-mono text-white">N = (Q_N, Σ, δ_N, q₀, F_N)</span>, we construct DFA <span className="font-mono text-white">D = (Q_D, Σ, δ_D, q_D0, F_D)</span> where:
            </p>
            <ul className="text-xs font-mono space-y-1.5 text-[#E8F1F2]">
              <li>• States <span className="text-[#38BDF8]">Q_D = P(Q_N)</span> (Power set of NFA states)</li>
              <li>• Start state <span className="text-[#00FF9C]">q_D0 = ε-closure(q₀)</span></li>
              <li>• Transitions <span className="text-[#FF2E88]">δ_D(S, a) = ⋃_(q ∈ S) ε-closure(δ_N(q, a))</span></li>
              <li>• Accepting states <span className="text-[#F5A623]">F_D = &#123; S ∈ Q_D | S ∩ F_N ≠ ∅ &#125;</span></li>
            </ul>

            <div className="p-3 rounded-lg bg-[#0A0E1A] border border-[#1E293B] text-[11px] text-[#8FA3B8] mt-2">
              <strong className="text-white">Core Theorem:</strong> NFAs and DFAs recognize the EXACT same class of regular languages. Nondeterminism buys convenience, never extra computational power!
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-2">
                WORKED SUBSET TRACE FOR &quot;UP UP&quot;
              </span>
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#0A0E1A] text-[#00FF9C] border-b border-[#1E293B]">
                    <th className="py-2 px-3 text-left">Step</th>
                    <th className="py-2 px-3">Symbol</th>
                    <th className="py-2 px-3 text-right">Active Subset (DFA State)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]">
                  <tr>
                    <td className="py-2 px-3 text-left text-white">0</td>
                    <td className="py-2 px-3 text-[#8FA3B8]">(Start)</td>
                    <td className="py-2 px-3 text-right text-[#38BDF8]">&#123;s&#125;</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-left text-white">1</td>
                    <td className="py-2 px-3 text-[#00FF9C]">UP</td>
                    <td className="py-2 px-3 text-right text-[#00FF9C] font-bold">&#123;s, c1&#125; (Branch!)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-left text-white">2</td>
                    <td className="py-2 px-3 text-[#00FF9C]">UP</td>
                    <td className="py-2 px-3 text-right text-[#FF2E88] font-bold">&#123;s, c1, c2&#125;</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-[11px] text-[#8FA3B8] mt-3 leading-relaxed">
                Worst case state explosion is <span className="font-mono text-white">2^n</span>, but for typical gaming patterns, reachable subsets are very small and can be precomputed.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1E293B] text-[11px] text-[#8FA3B8]">
              ε-transitions allow jumping without consuming any input symbol.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Handover continues: Output machines</span>
          <span className="text-[#38BDF8]">Moore &amp; Mealy Machines ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 9: Moore & Mealy Machines
  if (slide.id === 9) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="text-xs font-mono text-[#00FF9C] tracking-widest">
            MACHINES WITH OUTPUT
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            MOORE &amp; MEALY: HOW GAMES PRODUCE OUTPUTS
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            Standard DFAs only produce a binary Accept/Reject output at string end. Video games need continuous audio-visual feedback: hit sparks, health color shifts, and combat effects.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          {/* Moore panel */}
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#00FF9C]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#00FF9C]">MOORE MACHINE</span>
                <span className="text-[10px] font-mono text-[#8FA3B8]">OUTPUT ON STATE</span>
              </div>
              <h3 className="text-base font-bold font-tech text-white">Boss Health Indicator</h3>
              <p className="text-xs text-[#8FA3B8] mt-1 leading-relaxed">
                Output depends <strong>only on current state</strong>: <span className="font-mono text-[#00FF9C]">λ(q)</span>.
              </p>

              <div className="mt-3 space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-[#0A0E1A]">
                  <span>HEALTHY</span>
                  <span className="text-[#00FF9C] font-bold">Output: GREEN (100%–67%)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0A0E1A]">
                  <span>INJURED</span>
                  <span className="text-[#F5A623] font-bold">Output: AMBER (66%–34%)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0A0E1A]">
                  <span>CRITICAL</span>
                  <span className="text-[#FF2E88] font-bold">Output: RED (33%–1%)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0A0E1A]">
                  <span>DEFEATED</span>
                  <span className="text-gray-400 font-bold">Output: BLACK (0% HP)</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[#1E293B] text-[11px] text-[#8FA3B8]">
              Format: <code className="text-white">State / Output</code>
            </div>
          </div>

          {/* Mealy panel */}
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#38BDF8]/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#38BDF8]">MEALY MACHINE</span>
                <span className="text-[10px] font-mono text-[#8FA3B8]">OUTPUT ON TRANSITION</span>
              </div>
              <h3 className="text-base font-bold font-tech text-white">Hit Spark &amp; Action Effects</h3>
              <p className="text-xs text-[#8FA3B8] mt-1 leading-relaxed">
                Output depends on <strong>state AND input symbol</strong>: <span className="font-mono text-[#38BDF8]">λ(q, a)</span>.
              </p>

              <div className="mt-3 space-y-1.5 text-xs font-mono">
                <div className="p-2 rounded bg-[#0A0E1A]">
                  <div className="text-white font-bold">READY + attack:</div>
                  <div className="text-[#00FF9C]">⚡ CRITICAL SPARK (25 DMG) ➔ COOLDOWN</div>
                </div>
                <div className="p-2 rounded bg-[#0A0E1A]">
                  <div className="text-white font-bold">COOLDOWN + attack:</div>
                  <div className="text-[#F5A623]">💨 GLANCING BLOW (10 DMG) ➔ COOLDOWN</div>
                </div>
                <div className="p-2 rounded bg-[#0A0E1A]">
                  <div className="text-white font-bold">READY / COOLDOWN + tick:</div>
                  <div className="text-[#38BDF8]">🔄 RECHARGED &amp; READY (0 DMG) ➔ READY</div>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-[#1E293B] text-[11px] text-[#8FA3B8]">
              Format: <code className="text-white">Input / Output (Damage)</code>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Equivalence: Any Moore machine can be converted to an equivalent Mealy machine and vice versa.</span>
          <span className="text-[#38BDF8]">Next: String Acceptance Walkthrough (Abhishek · Slide 10) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 10: String Acceptance Walkthrough (Abhishek - 1RUA24CSE0008)
  if (slide.id === 10) {
    return <StringAcceptanceSlide />;
  }

  // SLIDE 11: DFA Minimization (Arjun - 1RUA24CSE0065)
  if (slide.id === 11) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00FF9C] tracking-widest">
            <span className="px-2 py-0.5 rounded bg-[#00FF9C]/10 border border-[#00FF9C]/30 font-bold">
              PRESENTER: ARJUN (1RUA24CSE0065)
            </span>
            <span>· ENGINE OPTIMIZATION · MYHILL-NERODE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            DFA MINIMIZATION — MERGING TWIN GUARDS
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            In game engines, memory cache locality is critical. Two states that produce identical answers for every conceivable future input sequence are indistinguishable and must be merged.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B] space-y-3">
            <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-1">
              THE TABLE-FILLING ALGORITHM (MYHILL-NERODE)
            </span>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              1. Mark all pairs <span className="font-mono text-white">(p, q)</span> where one is accepting and the other is non-accepting (trivially distinguishable by empty string ε).
            </p>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              2. For each unmarked pair and symbol <span className="font-mono text-white">a ∈ Σ</span>, if <span className="font-mono text-white">(δ(p, a), δ(q, a))</span> is marked, then mark <span className="font-mono text-white">(p, q)</span>.
            </p>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              3. Repeat until no new pairs can be marked. Remaining unmarked pairs are merged into single canonical equivalence classes!
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#38BDF8] font-bold block mb-2">
                CONCRETE GAME CONTROLLER REDUCTION
              </span>
              <div className="p-4 rounded-lg bg-[#0A0E1A] border border-[#1E293B] text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-[#8FA3B8]">
                  <span>Original Controller:</span>
                  <span className="text-[#FF2E88] font-bold">5 States &#123;S0, S1, S2, S3, S4&#125;</span>
                </div>
                <div className="text-[11px] text-[#8FA3B8]">
                  States S2 and S3 behave identically on all inputs (twin guards patrol).
                </div>
                <div className="flex items-center justify-center my-2 text-[#00FF9C]">
                  <span>➔ Table-Filling Algorithm Merges S2 ≡ S3 ➔</span>
                </div>
                <div className="flex items-center justify-between text-[#8FA3B8]">
                  <span>Minimized Canonical DFA:</span>
                  <span className="text-[#00FF9C] font-bold">3 States (Zero gameplay lost)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1E293B] text-xs font-mono text-[#8FA3B8]">
              Myhill-Nerode theorem: A language L is regular if and only if the number of equivalence classes of its indistinguishability relation is finite.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Presented by Arjun (1RUA24CSE0065)</span>
          <span className="text-[#F5A623]">Level 3: Combo Mode (Slide 12) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 12: Level 3 Combo Mode & Regular Expressions (Arjun - 1RUA24CSE0065)
  if (slide.id === 12) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623] tracking-widest">
              <span className="px-2 py-0.5 rounded bg-[#F5A623]/10 border border-[#F5A623]/30 font-bold">
                PRESENTER: ARJUN (1RUA24CSE0065)
              </span>
              <span>· LEVEL 3 · COMBO MODE</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
              REGULAR EXPRESSIONS — THE COMBO LANGUAGE
            </h2>
          </div>
          <button
            onClick={() => onGoToGameLevel(4)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F5A623] hover:bg-[#F5A623]/90 text-black font-mono font-bold text-xs shadow-[0_0_15px_rgba(245,166,35,0.3)] transition-all cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            Play Combo Challenge
          </button>
        </div>

        {/* 3 Operators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#00FF9C]/30">
            <span className="text-2xl font-mono font-bold text-[#00FF9C]">∪ (UNION)</span>
            <div className="text-sm font-tech font-bold text-white mt-1">OR (Alternation)</div>
            <p className="text-xs text-[#8FA3B8] mt-1">
              <code className="text-white">(a ∪ b)</code> accepts either symbol &apos;a&apos; or symbol &apos;b&apos;.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#38BDF8]/30">
            <span className="text-2xl font-mono font-bold text-[#38BDF8]">· (CONCAT)</span>
            <div className="text-sm font-tech font-bold text-white mt-1">THEN (Sequence)</div>
            <p className="text-xs text-[#8FA3B8] mt-1">
              <code className="text-white">a b</code> means &apos;a&apos; immediately followed by &apos;b&apos;.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#FF2E88]/30">
            <span className="text-2xl font-mono font-bold text-[#FF2E88]">* (KLEENE STAR)</span>
            <div className="text-sm font-tech font-bold text-white mt-1">REPEAT (0 or More)</div>
            <p className="text-xs text-[#8FA3B8] mt-1">
              <code className="text-white">a* = &#123;ε, a, aa, aaa, ...&#125;</code> (infinite set).
            </p>
          </div>
        </div>

        {/* Target Regex W*A Diagram */}
        <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-[#F5A623] font-bold">GAME COMBO PATTERN: W*A</span>
            <span className="text-xs font-mono text-[#00FF9C]">Zero or more Walk (W), then Attack (A)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[#0A0E1A] border border-[#00FF9C]/30 text-xs font-mono">
              <span className="text-[#00FF9C] font-bold block mb-1">✔ VALID COMBO EXAMPLES:</span>
              <ul className="text-[#8FA3B8] space-y-1">
                <li>• <strong className="text-white">A</strong> (0 walk frames, 1 attack slash)</li>
                <li>• <strong className="text-white">WA</strong> (1 walk frame, 1 attack slash)</li>
                <li>• <strong className="text-white">WWA</strong> (2 walk frames, 1 attack slash)</li>
                <li>• <strong className="text-white">WWWA</strong> (3 walk frames, 1 attack slash)</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-[#0A0E1A] border border-[#FF2E88]/30 text-xs font-mono">
              <span className="text-[#FF2E88] font-bold block mb-1">✖ REJECTED COMBO EXAMPLES:</span>
              <ul className="text-[#8FA3B8] space-y-1">
                <li>• <strong className="text-white">AW</strong> (Attack executed before walk completed)</li>
                <li>• <strong className="text-white">WW</strong> (Walk completed without terminating attack)</li>
                <li>• <strong className="text-white">WAW</strong> (Extraneous walk after terminal attack)</li>
                <li>• <strong className="text-white">ε</strong> (Empty input string)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Presented by Arjun (1RUA24CSE0065)</span>
          <span className="text-[#FF2E88]">The Wall — Pumping Lemma (Slide 13) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 13: Pumping Lemma and Limitations (Arjun - 1RUA24CSE0065)
  if (slide.id === 13) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF2E88] tracking-widest">
            <span className="px-2 py-0.5 rounded bg-[#FF2E88]/10 border border-[#FF2E88]/30 font-bold">
              PRESENTER: ARJUN (1RUA24CSE0065)
            </span>
            <span>· THEORETICAL LIMITS · PROOF</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            THE WALL — WHY FINITE MEMORY IS NOT ENOUGH
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            Every power-up has a limitation. Can a finite state machine count arbitrary numbers? Consider the counting boss:
            <strong className="text-white font-mono ml-1">L = &#123; aⁿbⁿ | n ≥ 1 &#125;</strong> (n jump-charges, then exactly n releases).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          {/* Pumping Lemma Statement */}
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B] space-y-3">
            <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-1">
              THE PUMPING LEMMA THEOREM
            </span>
            <p className="text-xs text-[#8FA3B8] leading-relaxed">
              If a language L is regular, there exists a pumping length <span className="font-mono text-white">p</span> such that any string <span className="font-mono text-white">s ∈ L</span> with <span className="font-mono text-white">|s| ≥ p</span> can be divided into three parts <span className="font-mono text-white">s = xyz</span> satisfying:
            </p>
            <div className="space-y-1.5 text-xs font-mono text-white">
              <div className="p-2 rounded bg-[#0A0E1A] border border-[#1E293B]">
                1. <span className="text-[#00FF9C] font-bold">|xy| ≤ p</span> (Pumping occurs within the first p characters)
              </div>
              <div className="p-2 rounded bg-[#0A0E1A] border border-[#1E293B]">
                2. <span className="text-[#38BDF8] font-bold">|y| ≥ 1</span> (y is strictly non-empty)
              </div>
              <div className="p-2 rounded bg-[#0A0E1A] border border-[#1E293B]">
                3. <span className="text-[#FF2E88] font-bold">xyⁱz ∈ L</span> for every integer <span className="text-white">i ≥ 0</span>
              </div>
            </div>
          </div>

          {/* Proof by Contradiction */}
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#FF2E88]/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#FF2E88] font-bold block mb-2">
                PROOF BY CONTRADICTION
              </span>
              <ol className="text-xs font-mono space-y-2 text-[#8FA3B8]">
                <li>1. Assume L is regular with pumping length <span className="text-white">p</span>.</li>
                <li>2. Choose string <span className="text-[#00FF9C]">s = aᵖbᵖ ∈ L</span>. Note that <span className="text-white">|s| = 2p ≥ p</span>.</li>
                <li>3. Since <span className="text-white">|xy| ≤ p</span>, <span className="text-[#FF2E88]">y must consist entirely of &apos;a&apos; symbols</span>: <span className="text-white">y = aᵏ</span> (k ≥ 1).</li>
                <li>4. Pump with <span className="text-white">i = 2</span>: <span className="text-white">xy²z = aᵖ⁺ᵏ bᵖ</span>.</li>
                <li>5. The number of &apos;a&apos;s (<span className="text-white">p + k</span>) does not equal the number of &apos;b&apos;s (<span className="text-white">p</span>).</li>
                <li className="font-bold text-[#FF2E88]">6. Thus, xy²z ∉ L. Contradiction!</li>
              </ol>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1E293B] text-xs font-mono">
              <span className="text-white font-bold">Verdict:</span> L is NOT regular. Finite automata cannot count arbitrary n. Games require a <strong className="text-[#38BDF8]">STACK</strong> (Pushdown Automata).
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Completed Slides 11–13 (Arjun · 1RUA24CSE0065)</span>
          <span className="text-[#00FF9C]">Game Lab Software Architecture (Slide 14) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 14: Game Lab Architecture (Arjun - 1RUA24CSE0065)
  if (slide.id === 14) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00FF9C] tracking-widest">
            <span className="px-2 py-0.5 rounded bg-[#00FF9C]/10 border border-[#00FF9C]/30 font-bold">
              PRESENTER: ARJUN (1RUA24CSE0065)
            </span>
            <span>· TECHNICAL IMPLEMENTATION · ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            GAME LAB SOFTWARE ARCHITECTURE
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            The website is implemented in React with TypeScript, Tailwind CSS, and Framer Motion. Every visual diagram is bound directly to the underlying transition engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#00FF9C] font-bold block mb-2">
                UNIFIED STATE FLOW PIPELINE
              </span>
              <div className="space-y-2 text-xs font-mono text-[#8FA3B8]">
                <div className="p-2.5 rounded bg-[#0A0E1A] border border-[#1E293B]">
                  <strong className="text-white">1. DOM Event Listeners:</strong> Captures physical keyboard clicks and arcade on-screen buttons.
                </div>
                <div className="p-2.5 rounded bg-[#0A0E1A] border border-[#1E293B]">
                  <strong className="text-white">2. Pure Automata Transition:</strong> Machine evaluates <code className="text-[#00FF9C]">machine.step(symbol)</code> using pure deterministic / power set math.
                </div>
                <div className="p-2.5 rounded bg-[#0A0E1A] border border-[#1E293B]">
                  <strong className="text-white">3. React State Update:</strong> Active states update without external server round-trips.
                </div>
                <div className="p-2.5 rounded bg-[#0A0E1A] border border-[#1E293B]">
                  <strong className="text-white">4. SVG Visualizer Sync:</strong> SVG graph updates glowing nodes, arrows, and double-rings instantaneously.
                </div>
              </div>
            </div>
            <div className="mt-3 text-[11px] font-mono text-[#00FF9C]">
              Zero Mock Data: The game and the diagram share a single source of truth.
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <span className="text-xs font-mono text-[#38BDF8] font-bold block mb-2">
              TYPESCRIPT DELTA FUNCTION SNIPPET
            </span>
            <pre className="p-3 rounded-lg bg-[#0A0E1A] border border-[#1E293B] text-[11px] font-mono text-[#E8F1F2] overflow-x-auto leading-relaxed">
{`// src/automata/dfa.ts
public step(symbol: DFASymbol): StepResult {
  const prev = this.currentState;
  // Deterministic transition lookup: δ(q, a)
  const next = this.definition.transitions[prev][symbol];
  this.currentState = next;
  
  const accepted = this.definition
    .acceptStates.includes(next);
    
  return { previousState: prev, currentState: next, accepted };
}`}
            </pre>
            <p className="text-[11px] text-[#8FA3B8] mt-3">
              Total runtime complexity: O(1) time per input frame. Memory consumption: O(|Q|) states.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>Completed Slides 11–14 (Arjun · 1RUA24CSE0065)</span>
          <span className="text-[#F5A623]">Handover to Chetan Nidgundi (1RUA24CSE0106): Industry Applications (Slide 15) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 15: Real-World Applications (Chetan Nidgundi - 1RUA24CSE0106)
  if (slide.id === 15) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#F5A623] tracking-widest">
            <span className="px-2 py-0.5 rounded bg-[#F5A623]/10 border border-[#F5A623]/30 font-bold">
              PRESENTER: CHETAN NIDGUNDI (1RUA24CSE0106)
            </span>
            <span>· INDUSTRY PERSPECTIVE · REAL ENGINES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            IT&apos;S EVERYWHERE — REAL-WORLD GAME ENGINES
          </h2>
          <p className="text-sm text-[#8FA3B8] mt-2 max-w-3xl leading-relaxed">
            Automata and formal languages are not abstract homework problems — they form the backbone of modern interactive systems and commercial gaming engines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#00FF9C]/30 flex flex-col justify-between">
            <div>
              <span className="text-2xl mb-1 block">👻</span>
              <h3 className="text-sm font-bold font-tech text-white">PAC-MAN GHOST FSM</h3>
              <p className="text-xs text-[#8FA3B8] mt-2 leading-relaxed">
                Classic 3-state FSM (Chase, Scatter, Frightened) running in arcade cabinets since 1980. Simple deterministic rules producing emergent AI.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#00FF9C]">FSM AI (Toru Iwatani)</div>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#38BDF8]/30 flex flex-col justify-between">
            <div>
              <span className="text-2xl mb-1 block">🎮</span>
              <h3 className="text-sm font-bold font-tech text-white">UNITY &amp; UNREAL</h3>
              <p className="text-xs text-[#8FA3B8] mt-2 leading-relaxed">
                Unity Mecanim Animator and Unreal State Trees visually configure states, transitions, and boolean conditions corresponding to the δ function.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#38BDF8]">Animation Controllers</div>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#FF2E88]/30 flex flex-col justify-between">
            <div>
              <span className="text-2xl mb-1 block">🥊</span>
              <h3 className="text-sm font-bold font-tech text-white">FIGHTING GAME BUFFERS</h3>
              <p className="text-xs text-[#8FA3B8] mt-2 leading-relaxed">
                Street Fighter &amp; Tekken buffer directional inputs into a sliding window. A DFA recognizer checks for special motions (↓ ↘ → + P).
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#FF2E88]">Combo Engines</div>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#F5A623]/30 flex flex-col justify-between">
            <div>
              <span className="text-2xl mb-1 block">🛡️</span>
              <h3 className="text-sm font-bold font-tech text-white">CHAT &amp; CHEAT FILTERS</h3>
              <p className="text-xs text-[#8FA3B8] mt-2 leading-relaxed">
                Multiplayer titles scan packet streams and text using regular expression automata (Aho-Corasick, DFA lexers) for real-time validation.
              </p>
            </div>
            <div className="mt-3 text-[10px] font-mono text-[#F5A623]">Security &amp; Lexing</div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#8FA3B8] flex items-center justify-between">
          <span>Boundary: When games need nested quest dialog or inventory counters, they hand over to PDA/Grammars.</span>
          <span className="text-[#00FF9C]">Next: Verification Test Matrix (Slide 16) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 16: Testing and Academic Verification Matrix (Chetan Nidgundi - 1RUA24CSE0106)
  if (slide.id === 16) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FF9C] tracking-widest">
              <span className="px-2 py-0.5 rounded bg-[#00FF9C]/10 border border-[#00FF9C]/30 font-bold">
                PRESENTER: CHETAN NIDGUNDI (1RUA24CSE0106)
              </span>
              <span>· ACADEMIC RIGOR · EMPIRICAL VERIFICATION</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
              TESTING &amp; VERIFICATION MATRIX
            </h2>
          </div>
          <button
            onClick={onOpenTestSuite}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,255,156,0.3)] transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            Open Live Test Runner
          </button>
        </div>

        {/* Verification Matrix Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#00FF9C]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#00FF9C] font-bold">DFA VERIFICATION</span>
              <CheckCircle className="w-4 h-4 text-[#00FF9C]" />
            </div>
            <ul className="text-xs font-mono text-[#8FA3B8] space-y-1">
              <li>• Total function: 6 transitions verified</li>
              <li>• &quot;t o t t&quot; accepted in state S2</li>
              <li>• &quot;t o&quot; rejected in state S0</li>
              <li>• Determinism: exactly 1 next-state</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#FF2E88]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#FF2E88] font-bold">NFA VERIFICATION</span>
              <CheckCircle className="w-4 h-4 text-[#00FF9C]" />
            </div>
            <ul className="text-xs font-mono text-[#8FA3B8] space-y-1">
              <li>• Exact cheat: UP UP DOWN DOWN accepted</li>
              <li>• Substring anywhere matching verified</li>
              <li>• Branch on UP forks into &#123;s, c1&#125;</li>
              <li>• Power set tracking: NFA ≡ DFA</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[#10182B] border border-[#38BDF8]/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#38BDF8] font-bold">OUTPUT &amp; REGEX</span>
              <CheckCircle className="w-4 h-4 text-[#00FF9C]" />
            </div>
            <ul className="text-xs font-mono text-[#8FA3B8] space-y-1">
              <li>• Moore: Green ➔ Amber ➔ Red ➔ Black</li>
              <li>• Mealy: Critical Spark vs Glancing strike</li>
              <li>• Regex: W*A full-string anchored match</li>
              <li>• Pumping lemma contradiction verified</li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#0D1424] border border-[#1E293B] text-xs font-mono text-[#8FA3B8] flex items-center justify-between">
          <span>All test cases execute directly against the mathematical engine in TypeScript. Zero fabricated numbers.</span>
          <span className="text-[#00FF9C]">Next: Team Contribution Matrix (Slide 17) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 17: Team Contributions Matrix (Chetan Nidgundi - 1RUA24CSE0106)
  if (slide.id === 17) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00FF9C] tracking-widest">
              <span className="px-2 py-0.5 rounded bg-[#00FF9C]/10 border border-[#00FF9C]/30 font-bold">
                PRESENTER: CHETAN NIDGUNDI (1RUA24CSE0106)
              </span>
              <span>· ASSESSMENT COMPLIANCE · CIE-3</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
              TEAM CONTRIBUTIONS &amp; SPEAKING MATRIX
            </h2>
          </div>
          <button
            onClick={onOpenTeamEditor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#00FF9C] bg-[#00FF9C]/10 border border-[#00FF9C]/30 hover:bg-[#00FF9C]/20 transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Names &amp; USNs
          </button>
        </div>

        {/* Matrix Table */}
        <div className="my-4 overflow-x-auto rounded-xl border border-[#1E293B] bg-[#10182B]">
          <table className="w-full text-xs font-mono border-collapse text-left">
            <thead>
              <tr className="bg-[#0A0E1A] text-[#00FF9C] border-b border-[#1E293B]">
                <th className="py-3 px-4">Member / USN</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Work Completed</th>
                <th className="py-3 px-4">Concepts Explained</th>
                <th className="py-3 px-4">Demo Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] text-[#8FA3B8]">
              {teamMembers.map((m, idx) => (
                <tr key={m.id} className="hover:bg-[#152038] transition-colors">
                  <td className="py-3 px-4 font-bold text-white">
                    <span style={{ color: m.color }} className="mr-1">P{idx + 1}:</span>
                    {m.name}
                    <div className="text-[10px] text-[#8FA3B8] font-normal">{m.usn}</div>
                  </td>
                  <td className="py-3 px-4 text-[#E8F1F2]">{m.role}</td>
                  <td className="py-3 px-4 text-[11px]">{m.contributions[0]}</td>
                  <td className="py-3 px-4 text-[11px] text-[#38BDF8]">{m.topics}</td>
                  <td className="py-3 px-4 text-[#00FF9C]">{m.slidesHandled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
          <span>All four members present their assigned sections on camera and answer rubric criteria.</span>
          <span className="text-[#00FF9C]">Next: Conclusion &amp; Game On (Slide 18) ▶</span>
        </div>
      </div>
    );
  }

  // SLIDE 18: Conclusion — Game Over? No — Game On! (Chetan & All Players)
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 md:p-12 arcade-grid">
      <div className="text-xs font-mono text-[#00FF9C] tracking-widest mb-3">
        STAGE CLEAR · LEVEL COMPLETE · RV UNIVERSITY
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-arcade text-[#00FF9C] glow-green tracking-wider">
        GAME OVER? NO — GAME ON!
      </h1>

      <p className="text-sm md:text-base text-[#8FA3B8] font-tech max-w-2xl mt-4 leading-relaxed">
        Every jump, patrol, cheat code, and combo you have ever played ran on machines we can prove things about.
      </p>

      {/* Summary Pills of all 5 TOC pillars */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl my-8 text-xs font-mono">
        <div className="p-3 rounded-xl bg-[#10182B] border border-[#00FF9C]/30 text-[#00FF9C]">
          <span className="block font-bold">1. DFA (Adithya)</span>
          <span className="text-[10px] text-[#8FA3B8]">Slides 3–6 · Double-Tap Dash</span>
        </div>
        <div className="p-3 rounded-xl bg-[#10182B] border border-[#38BDF8]/30 text-[#38BDF8]">
          <span className="block font-bold">2. NFA (Abhishek)</span>
          <span className="text-[10px] text-[#8FA3B8]">Slides 7–10 · Cheat &amp; Traces</span>
        </div>
        <div className="p-3 rounded-xl bg-[#10182B] border border-[#FF2E88]/30 text-[#FF2E88]">
          <span className="block font-bold">3. REGEX (Arjun)</span>
          <span className="text-[10px] text-[#8FA3B8]">Slides 11–14 · W*A &amp; Limits</span>
        </div>
        <div className="p-3 rounded-xl bg-[#10182B] border border-[#F5A623]/30 text-[#F5A623]">
          <span className="block font-bold">4. INDUSTRY (Chetan)</span>
          <span className="text-[10px] text-[#8FA3B8]">Slides 15–18 · Engines &amp; Tests</span>
        </div>
        <div className="p-3 rounded-xl bg-[#10182B] border border-[#00FF9C]/30 text-[#00FF9C]">
          <span className="block font-bold">5. GAME LAB</span>
          <span className="text-[10px] text-[#8FA3B8]">Playable Interactive Lab</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onGoToGameLevel(1)}
        className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-arcade text-xs md:text-sm font-bold shadow-[0_0_30px_rgba(0,255,156,0.6)] active:scale-95 transition-all cursor-pointer"
      >
        <Gamepad2 className="w-5 h-5" />
        <span>PLAY THE GAME NOW!</span>
      </button>

      {/* Course credits */}
      <div className="absolute bottom-6 text-xs font-mono text-[#8FA3B8]">
        CS3703 Theory of Computation · CIE-3 Presentation · RV University
      </div>
    </div>
  );
};
