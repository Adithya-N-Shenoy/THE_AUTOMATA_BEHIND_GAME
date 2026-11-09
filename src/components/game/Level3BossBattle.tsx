import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MooreMachine } from '../../automata/moore';
import { MealyMachine } from '../../automata/mealy';
import { MealyInput, MealyTransitionResult } from '../../types/automata';
import { AutomataDiagramSVG } from '../common/AutomataDiagramSVG';
import { sound } from '../../sound/audio';
import { RotateCcw, Swords, Shield, Clock, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level3BossBattleProps {
  onLevelComplete?: () => void;
  onGoToNextLevel?: () => void;
}

export const Level3BossBattle: React.FC<Level3BossBattleProps> = ({
  onLevelComplete,
  onGoToNextLevel,
}) => {
  const [moore] = useState(() => new MooreMachine());
  const [mealy] = useState(() => new MealyMachine());

  const [bossHp, setBossHp] = useState(100);
  const [mooreState, setMooreState] = useState(moore.currentState);
  const [mooreOutput, setMooreOutput] = useState(moore.currentOutput);

  const [mealyState, setMealyState] = useState(mealy.currentState);
  const [lastMealyResult, setLastMealyResult] = useState<MealyTransitionResult | null>(null);
  const [actionLog, setActionLog] = useState<
    { input: string; mealyOut: string; damage: number; bossState: string }[]
  >([]);

  const [isHit, setIsHit] = useState(false);
  const [levelWon, setLevelWon] = useState(false);

  const handleAction = (input: MealyInput) => {
    if (levelWon) return;

    // Step the Mealy Machine (combat action & effect)
    const mealyRes = mealy.step(input);
    setMealyState(mealy.currentState);
    setLastMealyResult(mealyRes.result);

    // Apply sounds & damage
    if (mealyRes.result.effect === 'spark') {
      sound.playHitSpark();
      setIsHit(true);
      setTimeout(() => setIsHit(false), 300);
    } else if (mealyRes.result.effect === 'glance') {
      sound.playGlance();
      setIsHit(true);
      setTimeout(() => setIsHit(false), 200);
    } else {
      sound.playTap();
    }

    const damage = mealyRes.result.damage;
    const newHp = Math.max(0, bossHp - damage);
    setBossHp(newHp);

    // Update Moore Machine state from new Boss HP
    const mooreRes = moore.updateStateFromHp(newHp);
    setMooreState(mooreRes.state);
    setMooreOutput(mooreRes.output);

    // Append to action log
    setActionLog((prev) => [
      {
        input: input.toUpperCase(),
        mealyOut: mealyRes.result.output,
        damage,
        bossState: mooreRes.state,
      },
      ...prev.slice(0, 5),
    ]);

    // Check defeat
    if (newHp === 0 && !levelWon) {
      setLevelWon(true);
      sound.playFanfare();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00FF9C', '#38BDF8', '#F5A623'],
      });
      onLevelComplete?.();
    }
  };

  const handleReset = () => {
    moore.reset();
    mealy.reset();
    setBossHp(100);
    setMooreState(moore.currentState);
    setMooreOutput(moore.currentOutput);
    setMealyState(mealy.currentState);
    setLastMealyResult(null);
    setActionLog([]);
    setLevelWon(false);
    setIsHit(false);
  };

  // Color mapping from Moore machine output
  const getMooreColorClass = () => {
    switch (mooreOutput) {
      case 'GREEN':
        return 'bg-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.6)]';
      case 'AMBER':
        return 'bg-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.6)]';
      case 'RED':
        return 'bg-[#FF2E88] shadow-[0_0_15px_rgba(255,46,136,0.6)] animate-pulse';
      case 'BLACK':
        return 'bg-[#475569]';
      default:
        return 'bg-[#00FF9C]';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Header briefing */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-[#10182B] border border-[#38BDF8]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
              LEVEL 3 OF 4 · MOORE &amp; MEALY
            </span>
            <span className="text-xs text-[#8FA3B8] font-mono">FINITE STATE MACHINES WITH OUTPUT</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-tech text-[#E8F1F2] mt-1">
            BOSS BATTLE — TWO OUTPUT ARCHITECTURES
          </h2>
          <p className="text-sm text-[#8FA3B8]">
            <strong className="text-[#00FF9C]">Moore Machine:</strong> Boss HP bar color depends only on state. <strong className="text-[#38BDF8]">Mealy Machine:</strong> Attack hit sparks depend on state and input.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#8FA3B8] bg-[#0A0E1A] hover:text-white hover:border-[#38BDF8]/40 border border-[#8FA3B8]/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          {levelWon && onGoToNextLevel && (
            <button
              onClick={onGoToNextLevel}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-black bg-[#38BDF8] hover:bg-[#38BDF8]/90 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all cursor-pointer"
            >
              Next Level: Regex Combo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Battle Arena and Output Displays */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Boss Arena & Player Actions (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative h-72 md:h-80 w-full rounded-xl bg-[#070A12] border-2 border-[#1E293B] overflow-hidden flex flex-col justify-between p-4 arcade-grid">
            {/* Top HUD: Moore Boss Health Indicator */}
            <div className="flex flex-col gap-2 z-10">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#8FA3B8]">BOSS STATUS (MOORE):</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      mooreState === 'HEALTHY'
                        ? 'text-[#00FF9C] bg-[#00FF9C]/10 border border-[#00FF9C]/30'
                        : mooreState === 'INJURED'
                        ? 'text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/30'
                        : mooreState === 'CRITICAL'
                        ? 'text-[#FF2E88] bg-[#FF2E88]/10 border border-[#FF2E88]/30'
                        : 'text-gray-400 bg-gray-800'
                    }`}
                  >
                    {mooreState} ({mooreOutput})
                  </span>
                </div>
                <div className="text-white font-mono font-bold">{bossHp} / 100 HP</div>
              </div>

              {/* Dynamic Health Bar */}
              <div className="w-full h-3.5 rounded-full bg-[#1E293B] overflow-hidden p-0.5 border border-[#8FA3B8]/20">
                <motion.div
                  className={`h-full rounded-full transition-all duration-300 ${getMooreColorClass()}`}
                  style={{ width: `${bossHp}%` }}
                />
              </div>
            </div>

            {/* Battle Stage Center */}
            <div className="relative flex-1 flex items-center justify-around my-2">
              {/* Player side */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-16 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                    mealyState === 'READY'
                      ? 'border-[#00FF9C] bg-[#00FF9C]/20 text-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.3)]'
                      : mealyState === 'COOLDOWN'
                      ? 'border-[#F5A623] bg-[#F5A623]/20 text-[#F5A623]'
                      : 'border-[#38BDF8] bg-[#38BDF8]/20 text-[#38BDF8]'
                  }`}
                >
                  <div className="text-center">
                    <div>HERO</div>
                    <div className="text-[9px] text-[#8FA3B8] mt-0.5">{mealyState}</div>
                  </div>
                </div>
              </div>

              {/* Spark effect burst when hit */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <AnimatePresence>
                  {isHit && lastMealyResult && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: [1, 1.8, 0], opacity: [1, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute flex items-center justify-center"
                    >
                      {lastMealyResult.effect === 'spark' ? (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#FF2E88] to-[#F5A623] blur-sm flex items-center justify-center shadow-[0_0_25px_rgba(255,46,136,0.9)]">
                          <Zap className="w-8 h-8 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#38BDF8]/40 blur-xs flex items-center justify-center">
                          <span className="text-xs font-mono font-bold text-[#38BDF8]">-10</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Boss Entity */}
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    x: isHit ? [0, -10, 10, -5, 5, 0] : 0,
                    scale: levelWon ? 0.8 : 1,
                    opacity: levelWon ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-20 h-24 rounded-2xl border-2 flex flex-col items-center justify-center relative shadow-2xl transition-all ${
                    levelWon
                      ? 'border-gray-700 bg-gray-900 text-gray-500'
                      : mooreState === 'CRITICAL'
                      ? 'border-[#FF2E88] bg-[#FF2E88]/20 shadow-[0_0_30px_rgba(255,46,136,0.6)]'
                      : mooreState === 'INJURED'
                      ? 'border-[#F5A623] bg-[#F5A623]/20 shadow-[0_0_20px_rgba(245,166,35,0.4)]'
                      : 'border-[#00FF9C] bg-[#00FF9C]/20 shadow-[0_0_20px_rgba(0,255,156,0.4)]'
                  }`}
                >
                  <div className="text-center font-mono">
                    <div className="text-2xl">👾</div>
                    <div className="text-xs font-bold text-white mt-1">NEXUS BOSS</div>
                    <div className="text-[9px] text-[#8FA3B8]">{mooreState}</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom HUD: Last Mealy Transition Output */}
            <div className="flex items-center justify-between text-xs font-mono z-10 pt-2 border-t border-[#1E293B]">
              <div className="text-[#8FA3B8]">
                MEALY OUTPUT:{' '}
                <strong className={lastMealyResult?.effect === 'spark' ? 'text-[#FF2E88]' : 'text-[#38BDF8]'}>
                  {lastMealyResult ? lastMealyResult.output : 'Awaiting player action...'}
                </strong>
              </div>
              <div>
                {levelWon ? (
                  <span className="flex items-center gap-1 text-[#00FF9C] font-bold font-arcade text-[10px]">
                    <CheckCircle2 className="w-3 h-3" /> BOSS DEFEATED!
                  </span>
                ) : (
                  <span className="text-[#8FA3B8]">Player weapon: {mealyState}</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons for Player */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleAction('attack')}
              disabled={levelWon}
              className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-[#FF2E88]/15 hover:bg-[#FF2E88]/25 border-2 border-[#FF2E88] text-[#FF2E88] shadow-[0_0_15px_rgba(255,46,136,0.2)] active:scale-95 transition-all cursor-pointer font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Swords className="w-5 h-5 mb-1" />
              <span>ATTACK</span>
              <span className="text-[10px] text-[#8FA3B8] font-normal">
                {mealyState === 'READY' ? '⚡ 25 DMG (Spark)' : '💨 10 DMG (Glance)'}
              </span>
            </button>

            <button
              onClick={() => handleAction('tick')}
              disabled={levelWon}
              className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 border-2 border-[#38BDF8] text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.2)] active:scale-95 transition-all cursor-pointer font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Clock className="w-5 h-5 mb-1" />
              <span>WAIT / RECHARGE</span>
              <span className="text-[10px] text-[#8FA3B8] font-normal">Resets cooldown</span>
            </button>

            <button
              onClick={() => handleAction('defend')}
              disabled={levelWon}
              className="flex flex-col items-center justify-center py-3 px-2 rounded-xl bg-[#00FF9C]/15 hover:bg-[#00FF9C]/25 border-2 border-[#00FF9C] text-[#00FF9C] shadow-[0_0_15px_rgba(0,255,156,0.2)] active:scale-95 transition-all cursor-pointer font-mono font-bold disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Shield className="w-5 h-5 mb-1" />
              <span>DEFEND</span>
              <span className="text-[10px] text-[#8FA3B8] font-normal">Enters Shielded stance</span>
            </button>
          </div>

          {/* Academic distinction box */}
          <div className="p-3.5 rounded-lg bg-[#0D1424] border border-[#1E293B] text-xs text-[#8FA3B8] leading-relaxed">
            <strong className="text-[#38BDF8]">Moore vs. Mealy Core Difference:</strong>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li><strong className="text-white">Moore Machine:</strong> Output depends strictly on current state: <span className="font-mono text-[#00FF9C]">λ(q)</span>. (Boss HP bar is Green, Amber, Red, or Black based only on which health state it is in).</li>
              <li><strong className="text-white">Mealy Machine:</strong> Output depends on state AND input: <span className="font-mono text-[#38BDF8]">λ(q, a)</span>. (Pressing attack while Ready produces a 25-dmg Critical Spark; pressing attack during Cooldown produces a 10-dmg Glancing Blow).</li>
            </ul>
          </div>
        </div>

        {/* Right: Dual Automata Visualizer (Moore & Mealy) (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <AutomataDiagramSVG type="MOORE" activeStates={[mooreState]} />
          <AutomataDiagramSVG type="MEALY" activeStates={[mealyState]} />

          {/* Action Log History */}
          <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#1E293B] max-h-40 overflow-y-auto">
            <span className="text-xs font-mono text-[#8FA3B8] block mb-2">COMBAT ACTION AUDIT:</span>
            {actionLog.length === 0 ? (
              <span className="text-xs text-[#8FA3B8]/60 font-mono italic">
                Awaiting player attack or recharge...
              </span>
            ) : (
              <div className="flex flex-col gap-1 text-[11px] font-mono">
                {actionLog.map((log, i) => (
                  <div key={i} className="flex items-center justify-between text-[#8FA3B8]">
                    <span>
                      [{log.input}] <strong className="text-white">{log.mealyOut}</strong>
                    </span>
                    <span className="text-[#FF2E88]">-{log.damage} HP</span>
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
