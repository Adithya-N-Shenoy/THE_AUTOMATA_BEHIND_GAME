import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NFAMachine } from '../../automata/nfa';
import { DirectionSymbol } from '../../types/automata';
import { AutomataDiagramSVG } from '../common/AutomataDiagramSVG';
import { sound } from '../../sound/audio';
import { RotateCcw, ShieldCheck, Lock, Unlock, ArrowRight, CheckCircle2, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level2NFAProps {
  onLevelComplete?: () => void;
  onGoToNextLevel?: () => void;
}

export const Level2NFA: React.FC<Level2NFAProps> = ({
  onLevelComplete,
  onGoToNextLevel,
}) => {
  const [machine] = useState(() => new NFAMachine());
  const [activeStates, setActiveStates] = useState<string[]>(
    Array.from(machine.activeStates).sort()
  );
  const [history, setHistory] = useState<DirectionSymbol[]>([]);
  const [logs, setLogs] = useState(machine.logs);
  const [levelWon, setLevelWon] = useState(false);
  const [lastBranch, setLastBranch] = useState(false);
  const [lastInput, setLastInput] = useState<DirectionSymbol | null>(null);

  const handleInput = (sym: DirectionSymbol) => {
    sound.playTap();
    setLastInput(sym);

    const res = machine.step(sym);
    setActiveStates([...res.currentStates]);
    setHistory([...machine.inputHistory]);
    setLogs([...machine.logs]);
    setLastBranch(res.branchOccurred);

    if (res.accepted) {
      sound.playCheatSuccess();
      setLevelWon(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#FF2E88', '#F5A623', '#00FF9C'],
      });
      onLevelComplete?.();
    }
  };

  const handleReset = () => {
    machine.reset();
    setActiveStates(Array.from(machine.activeStates).sort());
    setHistory([]);
    setLogs([]);
    setLevelWon(false);
    setLastBranch(false);
    setLastInput(null);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleInput('UP');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleInput('DOWN');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleInput('LEFT');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleInput('RIGHT');
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        handleInput('B');
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleInput('A');
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [machine]);

  // Compute cheat code progress (0 to 4 steps)
  const getCheatProgress = () => {
    if (activeStates.includes('accept')) return 4;
    if (activeStates.includes('c3')) return 3;
    if (activeStates.includes('c2')) return 2;
    if (activeStates.includes('c1')) return 1;
    return 0;
  };

  const progress = getCheatProgress();

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Header briefing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#10182B] border border-[#FF2E88]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#FF2E88]/10 text-[#FF2E88] border border-[#FF2E88]/30">
              LEVEL 2 OF 4 · NFA
            </span>
            <span className="text-xs text-[#8FA3B8] font-mono">NONDETERMINISTIC FINITE AUTOMATON</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-tech text-[#E8F1F2] mt-1">
            SECRET CHEAT CODE DETECTOR
          </h2>
          <p className="text-sm text-[#8FA3B8]">
            Enter <strong className="text-[#00FF9C]">UP → UP → DOWN → DOWN</strong>. NFA tracks parallel active states and discovers the code even after noise inputs!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#8FA3B8] bg-[#0A0E1A] hover:text-white hover:border-[#FF2E88]/40 border border-[#8FA3B8]/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset (R)
          </button>
          {levelWon && onGoToNextLevel && (
            <button
              onClick={onGoToNextLevel}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-black bg-[#FF2E88] hover:bg-[#FF2E88]/90 shadow-[0_0_15px_rgba(255,46,136,0.4)] transition-all cursor-pointer"
            >
              Next Level: Moore & Mealy
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Arcade Power-up Chest & NFA Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Power-Up Vault & D-Pad (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative h-64 md:h-72 w-full rounded-xl bg-[#070A12] border-2 border-[#1E293B] overflow-hidden flex flex-col justify-between p-4 arcade-grid">
            {/* Top HUD */}
            <div className="flex items-center justify-between text-xs font-mono z-10">
              <div className="flex items-center gap-2">
                <span className="text-[#8FA3B8]">ACTIVE SUBSET:</span>
                <span className="px-2.5 py-0.5 rounded font-bold bg-[#FF2E88]/20 text-[#FF2E88] border border-[#FF2E88]/40">
                  &#123;{activeStates.join(', ')}&#125;
                </span>
              </div>
              <div className="text-[#8FA3B8]">
                BRANCHING: {lastBranch ? <span className="text-[#00FF9C] font-bold">YES (FORKED)</span> : '1:1'}
              </div>
            </div>

            {/* Central Power-up Chest / Reactor */}
            <div className="relative flex-1 flex flex-col items-center justify-center my-2">
              <AnimatePresence mode="wait">
                {levelWon ? (
                  <motion.div
                    key="unlocked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.1, opacity: 1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF2E88] to-[#F5A623] p-1 shadow-[0_0_40px_rgba(255,46,136,0.7)] flex items-center justify-center">
                      <Unlock className="w-10 h-10 text-white" />
                    </div>
                    <div className="mt-2 text-sm font-arcade text-[#00FF9C] glow-green">
                      GOD-MODE UNLOCKED!
                    </div>
                    <span className="text-xs text-[#8FA3B8] font-mono">
                      Target state &apos;accept&apos; reached in active set!
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="locked"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-[#10182B] border-2 border-[#FF2E88]/50 shadow-[0_0_20px_rgba(255,46,136,0.3)] flex items-center justify-center">
                      <Lock className="w-10 h-10 text-[#FF2E88]" />
                    </div>
                    <div className="mt-2 text-xs font-mono text-[#8FA3B8]">
                      POWER-UP CONTAINER LOCKED
                    </div>

                    {/* 4-step progress dots */}
                    <div className="flex items-center gap-2 mt-2">
                      {['UP', 'UP', 'DOWN', 'DOWN'].map((req, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono border ${
                            progress > idx
                              ? 'bg-[#00FF9C]/20 border-[#00FF9C] text-[#00FF9C] font-bold'
                              : 'bg-[#1E293B] border-[#1E293B] text-[#8FA3B8]'
                          }`}
                        >
                          <span>{req}</span>
                          {progress > idx && <CheckCircle2 className="w-2.5 h-2.5" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Input tape */}
            <div className="flex items-center justify-between text-xs font-mono z-10 pt-2 border-t border-[#1E293B]">
              <div className="truncate max-w-[400px]">
                STREAM:{' '}
                <span className="text-white">
                  {history.length > 0 ? history.slice(-8).join(' → ') : '(enter inputs)'}
                </span>
              </div>
              <div>
                {lastInput && (
                  <span className="text-[#38BDF8]">
                    Last: <strong>{lastInput}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* D-Pad & Controller Arcade Buttons */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Directional Pad */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono text-[#8FA3B8] mb-1">D-PAD (ARROW KEYS)</span>
              <button
                onClick={() => handleInput('UP')}
                className="w-12 h-10 rounded-t bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#8FA3B8]/30 hover:border-[#38BDF8] text-white flex items-center justify-center font-bold font-mono active:scale-95 transition-all cursor-pointer"
              >
                ▲
              </button>
              <div className="flex">
                <button
                  onClick={() => handleInput('LEFT')}
                  className="w-10 h-10 rounded-l bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#8FA3B8]/30 hover:border-[#38BDF8] text-white flex items-center justify-center font-bold font-mono active:scale-95 transition-all cursor-pointer"
                >
                  ◀
                </button>
                <div className="w-12 h-10 bg-[#0A0E1A] border-y border-[#8FA3B8]/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#8FA3B8]/40" />
                </div>
                <button
                  onClick={() => handleInput('RIGHT')}
                  className="w-10 h-10 rounded-r bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#8FA3B8]/30 hover:border-[#38BDF8] text-white flex items-center justify-center font-bold font-mono active:scale-95 transition-all cursor-pointer"
                >
                  ▶
                </button>
              </div>
              <button
                onClick={() => handleInput('DOWN')}
                className="w-12 h-10 rounded-b bg-[#1E293B] hover:bg-[#38BDF8]/20 border border-[#8FA3B8]/30 hover:border-[#38BDF8] text-white flex items-center justify-center font-bold font-mono active:scale-95 transition-all cursor-pointer"
              >
                ▼
              </button>
            </div>

            {/* Quick Cheat Button & Action Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleInput('B')}
                  className="w-12 h-12 rounded-full bg-[#10182B] hover:bg-[#FF2E88]/20 border-2 border-[#FF2E88] text-[#FF2E88] font-bold font-mono shadow-[0_0_10px_rgba(255,46,136,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                >
                  B
                </button>
                <button
                  onClick={() => handleInput('A')}
                  className="w-12 h-12 rounded-full bg-[#10182B] hover:bg-[#00FF9C]/20 border-2 border-[#00FF9C] text-[#00FF9C] font-bold font-mono shadow-[0_0_10px_rgba(0,255,156,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                >
                  A
                </button>
              </div>

              {/* Quick sequence helper */}
              <button
                onClick={() => {
                  ['UP', 'UP', 'DOWN', 'DOWN'].forEach((sym, i) => {
                    setTimeout(() => handleInput(sym as DirectionSymbol), i * 160);
                  });
                }}
                className="px-3 py-1.5 rounded-lg bg-[#FF2E88]/15 hover:bg-[#FF2E88]/25 border border-[#FF2E88]/40 text-xs font-mono text-[#FF2E88] transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Flame className="w-3.5 h-3.5" /> Auto-Execute Sequence
              </button>
            </div>
          </div>

          {/* Academic explanation card */}
          <div className="p-3.5 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-[#8FA3B8] leading-relaxed">
            <strong className="text-[#FF2E88]">Nondeterminism in Practice:</strong> Notice that when you press <span className="font-mono text-white">UP</span>, the machine stays in scanner state <span className="font-mono text-white">&apos;s&apos;</span> AND concurrently spawns <span className="font-mono text-white">&apos;c1&apos;</span>. This subset tracking means the player does not have to pause or reset: they can type any sequence of moves and the NFA will catch the cheat code inside the stream.
          </div>
        </div>

        {/* Right: Live NFA Diagram & Active Set Inspector (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <AutomataDiagramSVG type="NFA" activeStates={activeStates} />

          {/* Active Subset Inspector */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] mb-3">
              <span>ACTIVE SUBSET (POWERTREE)</span>
              <span className="text-[#FF2E88]">S ⊆ Q</span>
            </div>

            <div className="grid grid-cols-5 gap-2 text-center text-xs font-mono">
              {[
                { st: 's', label: 'Scanner' },
                { st: 'c1', label: 'Saw UP' },
                { st: 'c2', label: 'Saw UP UP' },
                { st: 'c3', label: 'Saw UP UP DN' },
                { st: 'accept', label: 'UNLOCKED' },
              ].map((item) => {
                const isActive = activeStates.includes(item.st);
                return (
                  <div
                    key={item.st}
                    className={`p-2 rounded-lg border transition-all ${
                      isActive
                        ? item.st === 'accept'
                          ? 'bg-[#00FF9C]/20 border-[#00FF9C] text-[#00FF9C] font-bold shadow-[0_0_10px_rgba(0,255,156,0.3)]'
                          : 'bg-[#FF2E88]/20 border-[#FF2E88] text-[#FF2E88] font-bold'
                        : 'bg-[#0A0E1A] border-[#1E293B] text-[#8FA3B8]/50'
                    }`}
                  >
                    <div className="text-sm">{item.st}</div>
                    <div className="text-[9px] mt-1 truncate">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Log History */}
          <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#1E293B] max-h-44 overflow-y-auto">
            <span className="text-xs font-mono text-[#8FA3B8] block mb-2">TRANSITION LOG:</span>
            {logs.length === 0 ? (
              <span className="text-xs text-[#8FA3B8]/60 font-mono italic">
                Awaiting input... Press D-Pad or Arrow keys.
              </span>
            ) : (
              <div className="flex flex-col gap-1 text-[11px] font-mono">
                {logs.slice(-5).reverse().map((lg, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[#8FA3B8]">
                    <span className="text-[#FF2E88]">#{lg.step}</span>
                    <span>[{lg.input}]</span>
                    <span>
                      Active: &#123;
                      <strong className="text-white">
                        {Array.isArray(lg.currentState) ? lg.currentState.join(', ') : lg.currentState}
                      </strong>
                      &#125;
                    </span>
                    {lg.accepted && <span className="text-[#00FF9C] font-bold">(ACCEPTED!)</span>}
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
