import React, { useState } from 'react';
import { Level1DFA } from './Level1DFA';
import { Level2NFA } from './Level2NFA';
import { Level3BossBattle } from './Level3BossBattle';
import { Level4RegexCombo } from './Level4RegexCombo';
import { GameResultsModal } from './GameResultsModal';
import { Trophy, CheckCircle, ChevronRight, Gamepad2 } from 'lucide-react';

interface GameLabViewProps {
  onGoToPresentation: () => void;
  initialLevel?: number;
}

export const GameLabView: React.FC<GameLabViewProps> = ({
  onGoToPresentation,
  initialLevel = 1,
}) => {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const markLevelComplete = (lvl: number) => {
    if (!completedLevels.includes(lvl)) {
      setCompletedLevels((prev) => [...prev, lvl]);
    }
  };

  const levels = [
    { num: 1, title: 'Level 1: DFA', subtitle: 'Double-Tap Dash', color: '#00FF9C' },
    { num: 2, title: 'Level 2: NFA', subtitle: 'Secret Cheat Code', color: '#FF2E88' },
    { num: 3, title: 'Level 3: Moore & Mealy', subtitle: 'Boss Battle', color: '#38BDF8' },
    { num: 4, title: 'Level 4: Regex', subtitle: 'Combo Challenge', color: '#F5A623' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 py-6">
      {/* Level Selection Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-[#10182B] border border-[#1E293B]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A0E1A] text-xs font-mono font-bold text-[#8FA3B8] mr-2 shrink-0">
            <Gamepad2 className="w-4 h-4 text-[#00FF9C]" />
            <span>GAME LAB:</span>
          </div>

          {levels.map((lvl) => {
            const isCurrent = currentLevel === lvl.num;
            const isDone = completedLevels.includes(lvl.num);

            return (
              <button
                key={lvl.num}
                onClick={() => setCurrentLevel(lvl.num)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0A0E1A] text-white border-2 shadow-lg'
                    : 'bg-[#10182B] hover:bg-[#152038] text-[#8FA3B8] border border-transparent'
                }`}
                style={{
                  borderColor: isCurrent ? lvl.color : undefined,
                  boxShadow: isCurrent ? `0 0 15px ${lvl.color}33` : undefined,
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px]"
                  style={{
                    backgroundColor: `${lvl.color}22`,
                    color: lvl.color,
                  }}
                >
                  {isDone ? '✓' : lvl.num}
                </span>
                <span>{lvl.title}</span>
                {isDone && <CheckCircle className="w-3.5 h-3.5 text-[#00FF9C]" />}
              </button>
            );
          })}
        </div>

        {/* View Results / Summary Button */}
        <button
          onClick={() => setShowResultsModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A0E1A] hover:bg-[#1E293B] border border-[#00FF9C]/30 text-xs font-mono font-bold text-[#00FF9C] transition-all shrink-0 cursor-pointer"
        >
          <Trophy className="w-4 h-4" />
          <span>Results &amp; Badges</span>
        </button>
      </div>

      {/* Active Level Render */}
      <div>
        {currentLevel === 1 && (
          <Level1DFA
            onLevelComplete={() => markLevelComplete(1)}
            onGoToNextLevel={() => setCurrentLevel(2)}
          />
        )}
        {currentLevel === 2 && (
          <Level2NFA
            onLevelComplete={() => markLevelComplete(2)}
            onGoToNextLevel={() => setCurrentLevel(3)}
          />
        )}
        {currentLevel === 3 && (
          <Level3BossBattle
            onLevelComplete={() => markLevelComplete(3)}
            onGoToNextLevel={() => setCurrentLevel(4)}
          />
        )}
        {currentLevel === 4 && (
          <Level4RegexCombo
            onLevelComplete={() => markLevelComplete(4)}
            onGoToResults={() => setShowResultsModal(true)}
          />
        )}
      </div>

      {/* Victory Results Modal */}
      {showResultsModal && (
        <GameResultsModal
          onClose={() => setShowResultsModal(false)}
          onReplay={() => {
            setCurrentLevel(1);
            setShowResultsModal(false);
          }}
          onGoToPresentation={() => {
            setShowResultsModal(false);
            onGoToPresentation();
          }}
        />
      )}
    </div>
  );
};
