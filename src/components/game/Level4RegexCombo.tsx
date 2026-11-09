import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RegexComboRecognizer } from '../../automata/regex';
import { AutomataDiagramSVG } from '../common/AutomataDiagramSVG';
import { sound } from '../../sound/audio';
import { RotateCcw, Swords, Footprints, Send, CheckCircle2, XCircle, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level4RegexComboProps {
  onLevelComplete?: () => void;
  onGoToResults?: () => void;
}

export const Level4RegexCombo: React.FC<Level4RegexComboProps> = ({
  onLevelComplete,
  onGoToResults,
}) => {
  const [comboInput, setComboInput] = useState('');
  const [completedCombos, setCompletedCombos] = useState<string[]>([]);
  const [lastSubmission, setLastSubmission] = useState<{
    string: string;
    accepted: boolean;
    reason: string;
  } | null>(null);
  const [isSlashing, setIsSlashing] = useState(false);
  const [levelWon, setLevelWon] = useState(false);

  // Compute live trace through DFA as user types
  const liveTrace = RegexComboRecognizer.traceDFA(comboInput);

  const handleAddSymbol = (sym: 'W' | 'A') => {
    sound.playTap();
    setComboInput((prev) => prev + sym);
  };

  const handleClear = () => {
    setComboInput('');
    setLastSubmission(null);
  };

  const handleSubmitCombo = () => {
    if (!comboInput) {
      sound.playError();
      setLastSubmission({
        string: '(empty)',
        accepted: false,
        reason: 'Empty sequence. Pattern W*A requires at least one terminating attack command "A".',
      });
      return;
    }

    const result = RegexComboRecognizer.traceDFA(comboInput);
    setLastSubmission({
      string: comboInput,
      accepted: result.accepted,
      reason: result.reason,
    });

    if (result.accepted) {
      sound.playComboSuccess();
      setIsSlashing(true);
      setTimeout(() => setIsSlashing(false), 500);

      if (!completedCombos.includes(comboInput)) {
        const nextCombos = [...completedCombos, comboInput];
        setCompletedCombos(nextCombos);

        if (nextCombos.length >= 3 && !levelWon) {
          setLevelWon(true);
          sound.playFanfare();
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#00FF9C', '#38BDF8', '#FF2E88', '#F5A623'],
          });
          onLevelComplete?.();
        }
      }
      setComboInput('');
    } else {
      sound.playError();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Header briefing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#10182B] border border-[#F5A623]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30">
              LEVEL 4 OF 4 · REGEX
            </span>
            <span className="text-xs text-[#8FA3B8] font-mono">REGULAR EXPRESSION COMBO RECOGNIZER</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-tech text-[#E8F1F2] mt-1">
            COMBO ARENA — TARGET PATTERN: <span className="text-[#00FF9C] font-mono">W*A</span>
          </h2>
          <p className="text-sm text-[#8FA3B8]">
            Construct and submit valid strings matching <strong className="text-white">zero or more Walk commands (W)</strong> followed by <strong className="text-white">one Attack command (A)</strong>. Submit 3 distinct valid combos to conquer the arena!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setComboInput('');
              setCompletedCombos([]);
              setLastSubmission(null);
              setLevelWon(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#8FA3B8] bg-[#0A0E1A] hover:text-white hover:border-[#F5A623]/40 border border-[#8FA3B8]/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Level
          </button>
          {levelWon && onGoToResults && (
            <button
              onClick={onGoToResults}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-black bg-[#00FF9C] hover:bg-[#00FF9C]/90 shadow-[0_0_15px_rgba(0,255,156,0.5)] transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              Victory Screen!
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Training Arena & Regex DFA Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Construction & Combat Dummy (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative h-64 md:h-72 w-full rounded-xl bg-[#070A12] border-2 border-[#1E293B] overflow-hidden flex flex-col justify-between p-4 arcade-grid">
            {/* Top HUD */}
            <div className="flex items-center justify-between text-xs font-mono z-10">
              <div className="flex items-center gap-2">
                <span className="text-[#8FA3B8]">PATTERN:</span>
                <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30">
                  ^W*A$ (Anchored Full-String)
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#00FF9C]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMBOS: {completedCombos.length} / 3</span>
              </div>
            </div>

            {/* Combat Dummy Arena Stage */}
            <div className="relative flex-1 flex items-center justify-around my-2">
              {/* Player Fighter */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    x: isSlashing ? 40 : 0,
                    scale: isSlashing ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-14 h-16 rounded-xl bg-[#10182B] border-2 border-[#00FF9C] flex items-center justify-center font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,255,156,0.3)]"
                >
                  <div className="text-center">
                    <div>🥋</div>
                    <div className="text-[10px] text-[#00FF9C]">HERO</div>
                  </div>
                </motion.div>
              </div>

              {/* Slash Energy Animation */}
              <div className="relative w-16 flex items-center justify-center">
                <AnimatePresence>
                  {isSlashing && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 1 }}
                      animate={{ scaleX: 1.5, opacity: [1, 1, 0] }}
                      exit={{ opacity: 0 }}
                      className="absolute w-24 h-2 bg-gradient-to-r from-[#00FF9C] via-white to-[#FF2E88] rounded-full blur-xs shadow-[0_0_20px_rgba(0,255,156,0.8)]"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Combat Training Dummy */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    x: isSlashing ? [0, 15, -10, 5, 0] : 0,
                    rotate: isSlashing ? [0, 8, -6, 0] : 0,
                  }}
                  transition={{ duration: 0.35 }}
                  className="w-16 h-20 rounded-xl bg-[#10182B] border-2 border-[#8FA3B8] flex items-center justify-center text-2xl relative shadow-lg"
                >
                  🤖
                </motion.div>
                <span className="text-[10px] font-mono text-[#8FA3B8] mt-1">TRAINING DUMMY</span>
              </div>
            </div>

            {/* Current String Builder Display */}
            <div className="z-10 p-2.5 rounded-lg bg-[#10182B] border border-[#1E293B] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#8FA3B8]">CURRENT INPUT:</span>
                <span className="text-base font-bold text-[#00FF9C] tracking-widest">
                  {comboInput || <span className="text-[#8FA3B8]/40 font-normal italic">&lt;empty&gt;</span>}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    liveTrace.accepted
                      ? 'bg-[#00FF9C]/20 text-[#00FF9C] border border-[#00FF9C]'
                      : liveTrace.finalState === 'q0'
                      ? 'bg-[#38BDF8]/20 text-[#38BDF8]'
                      : 'bg-[#FF2E88]/20 text-[#FF2E88]'
                  }`}
                >
                  DFA STATE: {liveTrace.finalState}
                </span>
              </div>
            </div>
          </div>

          {/* Controls Bar: Add W, Add A, Clear, Submit */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleAddSymbol('W')}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 border-2 border-[#38BDF8] text-[#38BDF8] font-bold font-mono active:scale-95 transition-all cursor-pointer shadow-[0_0_10px_rgba(56,189,248,0.2)]"
              >
                <Footprints className="w-4 h-4" />
                <span>+ WALK [ W ]</span>
              </button>

              <button
                onClick={() => handleAddSymbol('A')}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#FF2E88]/15 hover:bg-[#FF2E88]/25 border-2 border-[#FF2E88] text-[#FF2E88] font-bold font-mono active:scale-95 transition-all cursor-pointer shadow-[0_0_10px_rgba(255,46,136,0.2)]"
              >
                <Swords className="w-4 h-4" />
                <span>+ ATTACK [ A ]</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="px-3 py-3 rounded-xl bg-[#0A0E1A] border border-[#8FA3B8]/30 hover:border-[#8FA3B8] text-[#8FA3B8] text-xs font-mono transition-all cursor-pointer"
              >
                Clear
              </button>

              <button
                onClick={handleSubmitCombo}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-bold font-mono shadow-[0_0_20px_rgba(0,255,156,0.4)] active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT COMBO</span>
              </button>
            </div>
          </div>

          {/* Completed Combos Checklist */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <div className="flex items-center justify-between text-xs font-mono text-[#8FA3B8] mb-2">
              <span>ACCEPTED DISTINCT COMBOS COMPLETED:</span>
              <span className="text-[#00FF9C]">{completedCombos.length} / 3</span>
            </div>
            <div className="flex items-center gap-3">
              {['A (Pure Strike)', 'WA (Step & Slash)', 'WWA (Heavy Charge Attack)'].map((hint, idx) => {
                const target = hint.split(' ')[0];
                const isDone = completedCombos.includes(target);
                return (
                  <div
                    key={idx}
                    className={`flex-1 p-2 rounded-lg border text-xs font-mono flex items-center justify-between ${
                      isDone
                        ? 'bg-[#00FF9C]/15 border-[#00FF9C] text-[#00FF9C] font-bold'
                        : 'bg-[#0A0E1A] border-[#1E293B] text-[#8FA3B8]'
                    }`}
                  >
                    <span>{hint}</span>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-[10px]">Pending</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Automata Diagram & Validation Result (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <AutomataDiagramSVG type="REGEX" activeStates={[liveTrace.finalState]} />

          {/* Submission Feedback Card */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B]">
            <span className="text-xs font-mono text-[#8FA3B8] block mb-2">
              AUTOMATON VALIDATION RESULT:
            </span>

            {lastSubmission ? (
              <div
                className={`p-3 rounded-lg border flex items-start gap-2.5 text-xs font-mono leading-relaxed ${
                  lastSubmission.accepted
                    ? 'bg-[#00FF9C]/10 border-[#00FF9C]/40 text-[#00FF9C]'
                    : 'bg-[#FF2E88]/10 border-[#FF2E88]/40 text-[#FF2E88]'
                }`}
              >
                {lastSubmission.accepted ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">
                    String &quot;{lastSubmission.string}&quot; — {lastSubmission.accepted ? 'ACCEPTED' : 'REJECTED'}
                  </div>
                  <div className="text-[#8FA3B8] mt-1">{lastSubmission.reason}</div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-[#0A0E1A] border border-[#1E293B] text-xs font-mono text-[#8FA3B8]/60 italic">
                Build a combo above and click &quot;Submit Combo&quot; to test language membership.
              </div>
            )}
          </div>

          {/* Valid vs Invalid Reference Table */}
          <div className="p-4 rounded-xl bg-[#10182B] border border-[#1E293B] text-xs font-mono">
            <span className="text-[#8FA3B8] block mb-2">LANGUAGE MEMBERSHIP BENCHMARK:</span>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded bg-[#00FF9C]/5 border border-[#00FF9C]/20">
                <span className="text-[#00FF9C] font-bold block mb-1">✔ VALID (In L):</span>
                <ul className="text-[#8FA3B8] space-y-0.5 text-[11px]">
                  <li>• A (0 walks, 1 attack)</li>
                  <li>• WA (1 walk, 1 attack)</li>
                  <li>• WWA (2 walks, 1 attack)</li>
                  <li>• WWWA (3 walks, 1 attack)</li>
                </ul>
              </div>
              <div className="p-2.5 rounded bg-[#FF2E88]/5 border border-[#FF2E88]/20">
                <span className="text-[#FF2E88] font-bold block mb-1">✖ INVALID (Not in L):</span>
                <ul className="text-[#8FA3B8] space-y-0.5 text-[11px]">
                  <li>• AW (Attack before walk)</li>
                  <li>• WW (Missing attack)</li>
                  <li>• WAW (Input after attack)</li>
                  <li>• ε (Empty string)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
