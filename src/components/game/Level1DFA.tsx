import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DFAMachine } from '../../automata/dfa';
import { DFASymbol } from '../../types/automata';
import { AutomataDiagramSVG } from '../common/AutomataDiagramSVG';
import { sound } from '../../sound/audio';
import { Play, RotateCcw, Zap, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level1DFAProps {
  onLevelComplete?: () => void;
  onGoToNextLevel?: () => void;
}

export const Level1DFA: React.FC<Level1DFAProps> = ({
  onLevelComplete,
  onGoToNextLevel,
}) => {
  const [machine] = useState(() => new DFAMachine());
  const [currentState, setCurrentState] = useState(machine.currentState);
  const [history, setHistory] = useState<DFASymbol[]>([]);
  const [logs, setLogs] = useState(machine.logs);
  const [isDashing, setIsDashing] = useState(false);
  const [levelWon, setLevelWon] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(40); // px from left
  const [lastSymbol, setLastSymbol] = useState<DFASymbol | undefined>();
  const [dashCount, setDashCount] = useState(0);

  const handleInput = (symbol: DFASymbol) => {
    if (levelWon && !isDashing) {
      // allow continuing or re-triggering
    }

    if (symbol === 't') {
      sound.playTap();
    } else {
      sound.playOther();
    }

    const res = machine.step(symbol);
    setCurrentState(res.currentState);
    setHistory([...machine.inputHistory]);
    setLogs([...machine.logs]);
    setLastSymbol(symbol);

    // If reached accepting state S2 -> trigger character Dash!
    if (res.accepted) {
      sound.playDash();
      setIsDashing(true);
      setDashCount((prev) => prev + 1);

      // Animate player rushing through the obstacle
      setPlayerPosition(420);

      setTimeout(() => {
        setIsDashing(false);
        if (!levelWon) {
          setLevelWon(true);
          sound.playComboSuccess();
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#00FF9C', '#38BDF8', '#FF2E88'],
          });
          onLevelComplete?.();
        }
      }, 700);
    } else {
      // Reset position back if interrupted by 'o'
      if (res.currentState === 'S0') {
        setPlayerPosition(40);
      }
    }
  };

  const handleReset = () => {
    machine.reset();
    setCurrentState(machine.currentState);
    setHistory([]);
    setLogs([]);
    setIsDashing(false);
    setLevelWon(false);
    setPlayerPosition(40);
    setLastSymbol(undefined);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if inside an input or modal
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        handleInput('t');
      } else if (e.key === 'o' || e.key === 'O' || e.key === ' ') {
        e.preventDefault();
        handleInput('o');
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [machine, levelWon]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Header briefing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#10182B] border border-[#00FF9C]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/30">
              LEVEL 1 OF 4 · DFA
            </span>
            <span className="text-xs text-[#8FA3B8] font-mono">DETERMINISTIC FINITE AUTOMATON</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-tech text-[#E8F1F2] mt-1">
            DOUBLE-TAP DASH — THE EXACT RECOGNIZER
          </h2>
          <p className="text-sm text-[#8FA3B8]">
            Input <strong className="text-[#00FF9C]">T</strong> (Tap) consecutively to trigger the dash state <strong className="text-[#FF2E88]">S2</strong>. Any <strong className="text-[#38BDF8]">O</strong> (Other) resets to <strong className="text-white">S0</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#8FA3B8] bg-[#0A0E1A] hover:text-white hover:border-[#00FF9C]/40 border border-[#8FA3B8]/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset (R)
          </button>
          {levelWon && onGoToNextLevel && (
            <button
              onClick={onGoToNextLevel}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-black bg-[#00FF9C] hover:bg-[#00FF9C]/90 shadow-[0_0_15px_rgba(0,255,156,0.4)] transition-all cursor-pointer"
            >
              Next Level: NFA
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: 2D Arcade Arena & DFA Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 2D Playable Canvas / Arena (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative h-64 md:h-72 w-full rounded-xl bg-[#070A12] border-2 border-[#1E293B] overflow-hidden flex flex-col justify-between p-4 arcade-grid">
            {/* Top HUD inside arena */}
            <div className="flex items-center justify-between text-xs font-mono z-10">
              <div className="flex items-center gap-2">
                <span className="text-[#8FA3B8]">STATE:</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    currentState === 'S2'
                      ? 'bg-[#FF2E88]/20 text-[#FF2E88] border border-[#FF2E88]'
                      : currentState === 'S1'
                      ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]'
                      : 'bg-[#1E293B] text-[#8FA3B8]'
                  }`}
                >
                  {currentState} {currentState === 'S2' ? '★ DASH' : currentState === 'S1' ? 'TAP 1' : 'IDLE'}
                </span>
              </div>
              <div className="text-[#8FA3B8]">
                DASHES EXECUTED: <span className="text-[#00FF9C] font-bold">{dashCount}</span>
              </div>
            </div>

            {/* Arena Field with Character and Target */}
            <div className="relative flex-1 w-full my-4 flex items-center">
              {/* Floor grid line */}
              <div className="absolute left-0 right-0 bottom-6 h-0.5 bg-gradient-to-r from-transparent via-[#00FF9C]/40 to-transparent" />

              {/* Target Portal / Energy Core at right end */}
              <div className="absolute right-8 bottom-3 flex flex-col items-center">
                <div
                  className={`w-14 h-24 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                    levelWon
                      ? 'border-[#00FF9C] bg-[#00FF9C]/20 shadow-[0_0_25px_rgba(0,255,156,0.5)]'
                      : 'border-[#FF2E88]/60 bg-[#FF2E88]/10 shadow-[0_0_15px_rgba(255,46,136,0.3)] animate-pulse'
                  }`}
                >
                  <Zap className={`w-6 h-6 ${levelWon ? 'text-[#00FF9C]' : 'text-[#FF2E88]'}`} />
                </div>
                <span className="text-[10px] font-mono mt-1 text-[#8FA3B8]">
                  {levelWon ? 'CORE BREACHED!' : 'BARRIER GATE'}
                </span>
              </div>

              {/* Player Character */}
              <motion.div
                animate={{
                  x: playerPosition,
                  scale: isDashing ? 1.25 : 1,
                }}
                transition={
                  isDashing
                    ? { type: 'spring', stiffness: 260, damping: 18 }
                    : { type: 'tween', ease: 'easeOut', duration: 0.2 }
                }
                className="absolute bottom-5"
              >
                {/* Character sprite representation */}
                <div className="relative flex flex-col items-center">
                  {/* Trail ghost when dashing */}
                  {isDashing && (
                    <div className="absolute -left-6 top-0 w-12 h-14 bg-[#00FF9C]/30 rounded-lg blur-sm -z-10 animate-pulse" />
                  )}

                  <div
                    className={`w-12 h-14 rounded-lg border-2 flex flex-col items-center justify-center shadow-lg transition-colors ${
                      currentState === 'S2'
                        ? 'border-[#00FF9C] bg-[#00FF9C]/30 shadow-[0_0_20px_rgba(0,255,156,0.8)]'
                        : currentState === 'S1'
                        ? 'border-[#38BDF8] bg-[#38BDF8]/20 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                        : 'border-[#8FA3B8] bg-[#10182B]'
                    }`}
                  >
                    {/* Retro visor */}
                    <div
                      className={`w-8 h-3 rounded mt-1 ${
                        currentState === 'S2'
                          ? 'bg-[#00FF9C]'
                          : currentState === 'S1'
                          ? 'bg-[#38BDF8]'
                          : 'bg-[#8FA3B8]/60'
                      }`}
                    />
                    <div className="text-[10px] font-mono font-bold mt-1 text-white">
                      {currentState}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#8FA3B8] mt-1">HERO</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Status feedback */}
            <div className="flex items-center justify-between text-xs font-mono z-10 pt-2 border-t border-[#1E293B]">
              <div className="text-[#8FA3B8]">
                INPUT HISTORY:{' '}
                <span className="text-white font-bold">
                  {history.length > 0 ? history.slice(-10).join(' ') : '(none yet)'}
                </span>
              </div>
              <div>
                {levelWon ? (
                  <span className="flex items-center gap-1 text-[#00FF9C] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> WIN CONDITION ACHIEVED!
                  </span>
                ) : (
                  <span className="text-[#8FA3B8]">Double-tap T to Dash</span>
                )}
              </div>
            </div>
          </div>

          {/* Controls Bar: Clickable Arcade Buttons */}
          <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <button
              onClick={() => handleInput('t')}
              className="flex-1 max-w-[200px] flex flex-col items-center justify-center py-3 px-4 rounded-xl bg-[#00FF9C]/10 hover:bg-[#00FF9C]/20 border-2 border-[#00FF9C] text-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.2)] active:scale-95 transition-all cursor-pointer font-mono font-bold"
            >
              <span className="text-lg">PRESS [ T ]</span>
              <span className="text-[10px] text-[#8FA3B8] font-normal">Tap Symbol (t)</span>
            </button>

            <button
              onClick={() => handleInput('o')}
              className="flex-1 max-w-[200px] flex flex-col items-center justify-center py-3 px-4 rounded-xl bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border-2 border-[#38BDF8] text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.2)] active:scale-95 transition-all cursor-pointer font-mono font-bold"
            >
              <span className="text-lg">PRESS [ O ]</span>
              <span className="text-[10px] text-[#8FA3B8] font-normal">Other Symbol (o)</span>
            </button>
          </div>

          {/* Academic explanation card */}
          <div className="p-3.5 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-[#8FA3B8] leading-relaxed">
            <strong className="text-[#00FF9C]">Theory Connection:</strong> This level models a discrete sequence recognizer where alphabet <span className="font-mono text-white">Σ = &#123;t, o&#125;</span>. In a real-time game, a double-tap mechanic requires a timer window abstraction; here we model the foundational symbol automaton recognizing all strings ending in <span className="font-mono text-white">&quot;tt&quot;</span>.
          </div>
        </div>

        {/* Right: Live Automata Diagram & Transition Table (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <AutomataDiagramSVG
            type="DFA"
            activeStates={[currentState]}
            lastTransition={{ symbol: lastSymbol, to: currentState }}
          />

          {/* Transition Table */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] mb-3">
              <span>δ TRANSITION FUNCTION</span>
              <span className="text-[#00FF9C]">Deterministic: |Q × Σ| = 6</span>
            </div>

            <table className="w-full text-xs font-mono text-center border-collapse">
              <thead>
                <tr className="bg-[#0A0E1A] text-[#00FF9C] border-b border-[#1E293B]">
                  <th className="py-2 px-3 text-left">State</th>
                  <th className="py-2 px-3">t (Tap)</th>
                  <th className="py-2 px-3">o (Other)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                <tr className={currentState === 'S0' ? 'bg-[#00FF9C]/15 font-bold text-white' : 'text-[#8FA3B8]'}>
                  <td className="py-2 px-3 text-left">
                    {currentState === 'S0' && <span className="text-[#00FF9C] mr-1">▶</span>}
                    → S0 (Idle)
                  </td>
                  <td className="py-2 px-3 text-[#00FF9C]">S1</td>
                  <td className="py-2 px-3 text-[#8FA3B8]">S0</td>
                </tr>
                <tr className={currentState === 'S1' ? 'bg-[#38BDF8]/15 font-bold text-white' : 'text-[#8FA3B8]'}>
                  <td className="py-2 px-3 text-left">
                    {currentState === 'S1' && <span className="text-[#38BDF8] mr-1">▶</span>}
                    S1 (Tap 1)
                  </td>
                  <td className="py-2 px-3 text-[#FF2E88] font-bold">S2 ★</td>
                  <td className="py-2 px-3 text-[#8FA3B8]">S0</td>
                </tr>
                <tr className={currentState === 'S2' ? 'bg-[#FF2E88]/15 font-bold text-white' : 'text-[#8FA3B8]'}>
                  <td className="py-2 px-3 text-left">
                    {currentState === 'S2' && <span className="text-[#FF2E88] mr-1">▶</span>}
                    * S2 (Dash)
                  </td>
                  <td className="py-2 px-3 text-[#00FF9C]">S2</td>
                  <td className="py-2 px-3 text-[#8FA3B8]">S0</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Live Log History */}
          <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#1E293B] max-h-44 overflow-y-auto">
            <span className="text-xs font-mono text-[#8FA3B8] block mb-2">TRANSITION LOG:</span>
            {logs.length === 0 ? (
              <span className="text-xs text-[#8FA3B8]/60 font-mono italic">
                Awaiting input... Press T or O.
              </span>
            ) : (
              <div className="flex flex-col gap-1 text-[11px] font-mono">
                {logs.slice(-5).reverse().map((lg, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[#8FA3B8]">
                    <span className="text-[#00FF9C]">#{lg.step}</span>
                    <span>[{lg.input}]</span>
                    <span>
                      {lg.previousState} → <strong className="text-white">{lg.currentState}</strong>
                    </span>
                    {lg.accepted && <span className="text-[#FF2E88] font-bold">(DASH!)</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
