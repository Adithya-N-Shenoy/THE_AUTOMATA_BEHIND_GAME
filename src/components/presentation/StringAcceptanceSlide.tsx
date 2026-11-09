import React, { useState, useEffect } from 'react';
import { sound } from '../../sound/audio';
import { Play, Pause, RotateCcw, ChevronRight, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

interface TraceStep {
  symbol: string;
  fromState: string;
  toState: string;
  description: string;
}

interface TestSequence {
  id: string;
  label: string;
  machineType: 'DFA' | 'NFA';
  inputSymbols: string[];
  initialState: string;
  steps: TraceStep[];
  finalState: string;
  isAccepted: boolean;
  explanation: string;
  gameOutcome: string;
}

const TEST_SEQUENCES: TestSequence[] = [
  {
    id: 'dfa-tott',
    label: '"t o t t" (Interrupted Double-Tap)',
    machineType: 'DFA',
    inputSymbols: ['t', 'o', 't', 't'],
    initialState: 'S0',
    steps: [
      { symbol: 't', fromState: 'S0', toState: 'S1', description: 'First tap registered. Timer begins.' },
      { symbol: 'o', fromState: 'S1', toState: 'S0', description: 'Other action detected! Rhythm broken, resets to Idle.' },
      { symbol: 't', fromState: 'S0', toState: 'S1', description: 'New tap registered. Waiting for consecutive tap.' },
      { symbol: 't', fromState: 'S1', toState: 'S2', description: 'Second consecutive tap detected! Reached accepting state S2.' },
    ],
    finalState: 'S2',
    isAccepted: true,
    explanation: 'Final state S2 ∈ F = {S2}. Extended transition δ̂(S0, "tott") = S2.',
    gameOutcome: '⚡ SUCCESS: Double-Tap Dash Fired! Player surges forward with invulnerability.',
  },
  {
    id: 'dfa-tt',
    label: '"t t" (Rapid Consecutive Double-Tap)',
    machineType: 'DFA',
    inputSymbols: ['t', 't'],
    initialState: 'S0',
    steps: [
      { symbol: 't', fromState: 'S0', toState: 'S1', description: 'First tap logged into input buffer.' },
      { symbol: 't', fromState: 'S1', toState: 'S2', description: 'Immediate second tap! Direct transition to S2 ∈ F.' },
    ],
    finalState: 'S2',
    isAccepted: true,
    explanation: 'Minimal string satisfying suffix "tt". Final state S2 ∈ F.',
    gameOutcome: '⚡ SUCCESS: Instant Double-Tap Dash executed in minimum 2 frames.',
  },
  {
    id: 'dfa-tot',
    label: '"t o t" (Broken Rhythm / Incomplete)',
    machineType: 'DFA',
    inputSymbols: ['t', 'o', 't'],
    initialState: 'S0',
    steps: [
      { symbol: 't', fromState: 'S0', toState: 'S1', description: 'First tap logged.' },
      { symbol: 'o', fromState: 'S1', toState: 'S0', description: 'Other action entered. Reset to S0.' },
      { symbol: 't', fromState: 'S0', toState: 'S1', description: 'Single tap logged. No follow-up tap arrives.' },
    ],
    finalState: 'S1',
    isAccepted: false,
    explanation: 'Final state S1 ∉ F. String does NOT end in two consecutive taps.',
    gameOutcome: '✖ REJECTED: No dash. Character performs standard single-tap punch/step.',
  },
  {
    id: 'dfa-oot',
    label: '"o o t" (Noise Prefix + 1 Tap)',
    machineType: 'DFA',
    inputSymbols: ['o', 'o', 't'],
    initialState: 'S0',
    steps: [
      { symbol: 'o', fromState: 'S0', toState: 'S0', description: 'Idle loop: δ(S0, o) = S0.' },
      { symbol: 'o', fromState: 'S0', toState: 'S0', description: 'Idle loop continues.' },
      { symbol: 't', fromState: 'S0', toState: 'S1', description: 'First tap only. S1 ∉ F.' },
    ],
    finalState: 'S1',
    isAccepted: false,
    explanation: 'Final state S1 ∉ F. Only 1 tap detected before string termination.',
    gameOutcome: '✖ REJECTED: Normal move executed; dash criteria not met.',
  },
  {
    id: 'nfa-cheat',
    label: '"↑ ↑ ↓ ↓" (Exact Secret Cheat Code)',
    machineType: 'NFA',
    inputSymbols: ['↑', '↑', '↓', '↓'],
    initialState: '{s}',
    steps: [
      { symbol: '↑', fromState: '{s}', toState: '{s, c1}', description: 'Scanner loops {s} AND branches into match chain {c1}.' },
      { symbol: '↑', fromState: '{s, c1}', toState: '{s, c1, c2}', description: 'Progresses to c2 while scanner can start new match.' },
      { symbol: '↓', fromState: '{s, c1, c2}', toState: '{s, c3}', description: 'Third symbol matched! Branch reaches c3.' },
      { symbol: '↓', fromState: '{s, c3}', toState: '{s, c4}', description: 'Fourth symbol matched! State c4 ∈ F reached!' },
    ],
    finalState: '{s, c4}',
    isAccepted: true,
    explanation: 'Active subset {s, c4} intersects accepting set F = {c4}.',
    gameOutcome: '🌟 SUCCESS: Cheat Code Activated! God Mode & Laser unlocked for Player.',
  },
  {
    id: 'nfa-noise-cheat',
    label: '"→ ↑ ↑ ↓ ↓" (Noise Prefix + Code)',
    machineType: 'NFA',
    inputSymbols: ['→', '↑', '↑', '↓', '↓'],
    initialState: '{s}',
    steps: [
      { symbol: '→', fromState: '{s}', toState: '{s}', description: 'Noise symbol ignored by scanner loop: δ(s, →) = {s}.' },
      { symbol: '↑', fromState: '{s}', toState: '{s, c1}', description: 'Code sequence starts.' },
      { symbol: '↑', fromState: '{s, c1}', toState: '{s, c1, c2}', description: 'Second UP matches.' },
      { symbol: '↓', fromState: '{s, c1, c2}', toState: '{s, c3}', description: 'First DOWN matches.' },
      { symbol: '↓', fromState: '{s, c3}', toState: '{s, c4}', description: 'Second DOWN matches! c4 ∈ F is active.' },
    ],
    finalState: '{s, c4}',
    isAccepted: true,
    explanation: 'Scanner handles prefix noise; parallel branch hits accepting state c4.',
    gameOutcome: '🌟 SUCCESS: Noise-tolerant cheat recognized! Game triggers bonus.',
  },
  {
    id: 'nfa-wrong',
    label: '"↑ ↑ ↓ →" (Wrong Final Symbol)',
    machineType: 'NFA',
    inputSymbols: ['↑', '↑', '↓', '→'],
    initialState: '{s}',
    steps: [
      { symbol: '↑', fromState: '{s}', toState: '{s, c1}', description: 'Branch spawned at c1.' },
      { symbol: '↑', fromState: '{s, c1}', toState: '{s, c1, c2}', description: 'Branch advanced to c2.' },
      { symbol: '↓', fromState: '{s, c1, c2}', toState: '{s, c3}', description: 'Branch advanced to c3.' },
      { symbol: '→', fromState: '{s, c3}', toState: '{s}', description: 'Wrong symbol! Branch dies. Only scanner {s} survives.' },
    ],
    finalState: '{s}',
    isAccepted: false,
    explanation: 'Active set {s} has no intersection with F = {c4}.',
    gameOutcome: '✖ REJECTED: Sequence aborted. Enemy remains in standard combat mode.',
  },
];

export const StringAcceptanceSlide: React.FC = () => {
  const [selectedSeqId, setSelectedSeqId] = useState(TEST_SEQUENCES[0].id);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSeq = TEST_SEQUENCES.find((s) => s.id === selectedSeqId) || TEST_SEQUENCES[0];
  const totalSteps = currentSeq.steps.length;
  const isFinished = currentStepIndex >= totalSteps;

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && currentStepIndex < totalSteps) {
      timer = setTimeout(() => {
        sound.playTap();
        setCurrentStepIndex((prev) => prev + 1);
      }, 900);
    } else if (isPlaying && currentStepIndex >= totalSteps) {
      setIsPlaying(false);
      if (currentSeq.isAccepted) {
        sound.playCheatSuccess();
      } else {
        sound.playError();
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, totalSteps, currentSeq.isAccepted]);

  const handleSelectSequence = (seqId: string) => {
    sound.playTap();
    setSelectedSeqId(seqId);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStepIndex < totalSteps) {
      sound.playTap();
      const next = currentStepIndex + 1;
      setCurrentStepIndex(next);
      if (next === totalSteps) {
        if (currentSeq.isAccepted) sound.playCheatSuccess();
        else sound.playError();
      }
    }
  };

  const handleReset = () => {
    sound.playTap();
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    sound.playTap();
    if (currentStepIndex >= totalSteps) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  // Determine current state based on steps executed so far
  const currentStateDisplay =
    currentStepIndex === 0
      ? currentSeq.initialState
      : currentSeq.steps[currentStepIndex - 1].toState;

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 md:p-10 arcade-grid">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-widest">
            <span className="px-2 py-0.5 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30 font-bold">
              PRESENTER: ABHISHEK (1RUA24CSE0008)
            </span>
            <span>· FORMAL VERIFICATION · WORKED TRACES</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-tech font-bold text-white mt-1">
            STRING ACCEPTANCE WALKTHROUGH — STEP-BY-STEP TRACES
          </h2>
          <p className="text-xs text-[#8FA3B8] mt-1">
            Testing Valid vs. Invalid Sequences: <span className="text-[#00FF9C] font-mono">w ∈ L(M) ⟺ δ̂(q₀, w) ∈ F</span>
          </p>
        </div>

        {/* Live Controller Playback Buttons */}
        <div className="flex items-center gap-2 bg-[#10182B] p-1.5 rounded-xl border border-[#1E293B]">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black text-xs font-mono font-bold transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-black" />}
            <span>{isPlaying ? 'PAUSE' : currentStepIndex >= totalSteps ? 'REPLAY' : 'AUTO RUN'}</span>
          </button>

          <button
            onClick={handleStepForward}
            disabled={currentStepIndex >= totalSteps || isPlaying}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0A0E1A] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>STEP</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-[#0A0E1A] hover:bg-[#1E293B] border border-[#1E293B] text-[#8FA3B8] hover:text-white transition-all cursor-pointer"
            title="Reset to Step 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left Column: Preset Test Strings (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#00FF9C] font-bold">SELECT TEST INPUT STRING</span>
              <span className="text-[10px] font-mono text-[#8FA3B8]">7 SPEC CASES</span>
            </div>

            <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
              {TEST_SEQUENCES.map((seq) => {
                const isSelected = seq.id === selectedSeqId;
                return (
                  <button
                    key={seq.id}
                    onClick={() => handleSelectSequence(seq.id)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-mono border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? seq.isAccepted
                          ? 'bg-[#00FF9C]/15 border-[#00FF9C] text-[#00FF9C] shadow-[0_0_12px_rgba(0,255,156,0.2)]'
                          : 'bg-[#FF2E88]/15 border-[#FF2E88] text-[#FF2E88] shadow-[0_0_12px_rgba(255,46,136,0.2)]'
                        : 'bg-[#0A0E1A] border-[#1E293B] text-[#8FA3B8] hover:text-white hover:border-[#38BDF8]/40'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded mr-1.5 font-bold uppercase"
                        style={{
                          backgroundColor: seq.machineType === 'DFA' ? 'rgba(0,255,156,0.15)' : 'rgba(255,46,136,0.15)',
                          color: seq.machineType === 'DFA' ? '#00FF9C' : '#FF2E88',
                        }}
                      >
                        {seq.machineType}
                      </span>
                      <span className="font-bold">{seq.label}</span>
                    </div>
                    <span className="text-[11px] font-bold shrink-0 ml-2">
                      {seq.isAccepted ? '✔ ACCEPT' : '✖ REJECT'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#1E293B] text-[11px] font-mono text-[#8FA3B8]">
            <span className="text-white font-bold block mb-0.5">Formal Invariant:</span>
            DFA accepts iff <code className="text-[#00FF9C]">δ̂(q₀, w) ∈ F</code>.<br />
            NFA accepts iff <code className="text-[#FF2E88]">δ̂(q₀, w) ∩ F ≠ ∅</code>.
          </div>
        </div>

        {/* Right Column: Execution Tape & Live State Machine (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Input Tape & State Trace Header */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <div className="flex items-center justify-between mb-2 text-xs font-mono">
              <span className="text-[#38BDF8] font-bold">INPUT TAPE EXECUTION RIBBON</span>
              <span className="text-[#8FA3B8]">
                Step {currentStepIndex} / {totalSteps} {isFinished ? '(COMPLETE)' : ''}
              </span>
            </div>

            {/* Tape Cells */}
            <div className="flex items-center gap-2 overflow-x-auto py-2">
              <div className="px-3 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] text-xs font-mono text-[#8FA3B8] shrink-0">
                START: {currentSeq.initialState}
              </div>

              {currentSeq.inputSymbols.map((sym, idx) => {
                const isPast = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex && !isFinished;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl text-sm font-mono font-bold transition-all border shrink-0 ${
                      isCurrent
                        ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8] scale-110 shadow-[0_0_15px_rgba(56,189,248,0.4)] animate-pulse'
                        : isPast
                        ? 'bg-[#00FF9C]/10 border-[#00FF9C]/40 text-[#00FF9C]'
                        : 'bg-[#0A0E1A] border-[#1E293B] text-[#8FA3B8]'
                    }`}
                  >
                    <span>{sym}</span>
                    <span className="text-[8px] font-normal text-[#8FA3B8]">#{idx + 1}</span>
                  </div>
                );
              })}

              <div className="text-xs font-mono text-[#8FA3B8] shrink-0">➔</div>

              <div
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold border transition-all shrink-0 ${
                  isFinished
                    ? currentSeq.isAccepted
                      ? 'bg-[#00FF9C]/20 border-[#00FF9C] text-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.3)]'
                      : 'bg-[#FF2E88]/20 border-[#FF2E88] text-[#FF2E88] shadow-[0_0_15px_rgba(255,46,136,0.3)]'
                    : 'bg-[#0A0E1A] border-[#1E293B] text-[#8FA3B8]'
                }`}
              >
                CURRENT STATE: <span className="text-white">{currentStateDisplay}</span>
              </div>
            </div>

            {/* Active Transition Description */}
            <div className="mt-3 p-3 rounded-lg bg-[#0A0E1A] border border-[#1E293B] text-xs font-mono">
              {currentStepIndex === 0 ? (
                <div className="text-[#8FA3B8]">
                  Automaton positioned at start state <span className="text-white font-bold">{currentSeq.initialState}</span>. Press <strong className="text-[#00FF9C]">STEP</strong> or <strong className="text-[#00FF9C]">AUTO RUN</strong> to begin reading symbols.
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#38BDF8] font-bold">
                    <span>Step {currentStepIndex}:</span>
                    <span>δ({currentSeq.steps[currentStepIndex - 1].fromState}, &apos;{currentSeq.steps[currentStepIndex - 1].symbol}&apos;)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span className="text-[#00FF9C]">{currentSeq.steps[currentStepIndex - 1].toState}</span>
                  </div>
                  <div className="text-[#8FA3B8]">
                    {currentSeq.steps[currentStepIndex - 1].description}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Final Acceptance Verdict Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
              isFinished
                ? currentSeq.isAccepted
                  ? 'bg-[#00FF9C]/10 border-[#00FF9C] shadow-[0_0_25px_rgba(0,255,156,0.25)]'
                  : 'bg-[#FF2E88]/10 border-[#FF2E88] shadow-[0_0_25px_rgba(255,46,136,0.25)]'
                : 'bg-[#10182B] border-[#1E293B]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                {isFinished ? (
                  currentSeq.isAccepted ? (
                    <CheckCircle2 className="w-6 h-6 text-[#00FF9C] shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#FF2E88] shrink-0" />
                  )
                ) : (
                  <Sparkles className="w-5 h-5 text-[#38BDF8] shrink-0 animate-spin" />
                )}
                <div>
                  <h3
                    className="text-base font-bold font-tech"
                    style={{
                      color: isFinished
                        ? currentSeq.isAccepted
                          ? '#00FF9C'
                          : '#FF2E88'
                        : '#38BDF8',
                    }}
                  >
                    {isFinished
                      ? currentSeq.isAccepted
                        ? 'STRING ACCEPTED BY AUTOMATON ✔'
                        : 'STRING REJECTED BY AUTOMATON ✖'
                      : 'AUTOMATON EVALUATION IN PROGRESS...'}
                  </h3>
                  <p className="text-xs font-mono text-[#8FA3B8] mt-0.5">
                    {isFinished ? currentSeq.explanation : `Processed ${currentStepIndex} of ${totalSteps} symbols. Keep stepping to see terminal status.`}
                  </p>
                </div>
              </div>

              {isFinished && (
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase shrink-0"
                  style={{
                    backgroundColor: currentSeq.isAccepted ? 'rgba(0,255,156,0.2)' : 'rgba(255,46,136,0.2)',
                    color: currentSeq.isAccepted ? '#00FF9C' : '#FF2E88',
                  }}
                >
                  {currentSeq.isAccepted ? 'IN LANGUAGE L' : 'NOT IN LANGUAGE'}
                </span>
              )}
            </div>

            {/* Game Consequence */}
            <div className="mt-3 pt-2.5 border-t border-[#1E293B]/70 flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold">GAME MECHANIC OUTCOME:</span>
              <span
                className="font-bold"
                style={{ color: currentSeq.isAccepted ? '#00FF9C' : '#FF2E88' }}
              >
                {isFinished ? currentSeq.gameOutcome : 'Waiting for string termination...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Handover */}
      <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] pt-2 border-t border-[#1E293B]">
        <span>Completed Slides 7–10 (Abhishek · 1RUA24CSE0008)</span>
        <span className="text-[#FF2E88]">
          Handover to Arjun (1RUA24CSE0065): DFA Minimization &amp; Regular Expressions (Slide 11) ▶
        </span>
      </div>
    </div>
  );
};
