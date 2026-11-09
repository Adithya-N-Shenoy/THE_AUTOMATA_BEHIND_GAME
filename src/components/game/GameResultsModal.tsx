import React from 'react';
import { motion } from 'motion/react';
import { Trophy, CheckCircle2, RotateCcw, Presentation, Sparkles, X } from 'lucide-react';

interface GameResultsModalProps {
  onClose: () => void;
  onReplay: () => void;
  onGoToPresentation: () => void;
}

export const GameResultsModal: React.FC<GameResultsModalProps> = ({
  onClose,
  onReplay,
  onGoToPresentation,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="relative w-full max-w-xl rounded-2xl bg-[#10182B] border-2 border-[#00FF9C] p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,156,0.4)] flex flex-col items-center text-center arcade-grid"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8FA3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Victory Trophy Badge */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FF9C] to-[#38BDF8] p-1 shadow-[0_0_30px_rgba(0,255,156,0.6)] flex items-center justify-center">
          <Trophy className="w-10 h-10 text-black" />
        </div>

        <h2 className="text-2xl md:text-3xl font-arcade text-[#00FF9C] glow-green mt-4">
          BOSS DEFEATED!
        </h2>
        <div className="text-xs font-mono text-[#8FA3B8] mt-1">
          THE AUTOMATA BEHIND GAME AI · ALL 4 LEVELS CONQUERED
        </div>

        {/* Badges of Academic Mastery */}
        <div className="grid grid-cols-2 gap-3 w-full my-6 text-left">
          <div className="p-3 rounded-xl bg-[#0A0E1A] border border-[#00FF9C]/30 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#00FF9C] shrink-0" />
            <div>
              <div className="text-xs font-bold font-mono text-white">DFA Verified</div>
              <div className="text-[10px] text-[#8FA3B8]">Double-tap dash mechanic</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0A0E1A] border border-[#FF2E88]/30 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#FF2E88] shrink-0" />
            <div>
              <div className="text-xs font-bold font-mono text-white">NFA Mastered</div>
              <div className="text-[10px] text-[#8FA3B8]">Parallel cheat code tracking</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0A0E1A] border border-[#38BDF8]/30 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#38BDF8] shrink-0" />
            <div>
              <div className="text-xs font-bold font-mono text-white">Output Machines</div>
              <div className="text-[10px] text-[#8FA3B8]">Moore HP &amp; Mealy hit sparks</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0A0E1A] border border-[#F5A623]/30 flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#F5A623] shrink-0" />
            <div>
              <div className="text-xs font-bold font-mono text-white">Regex Pipeline</div>
              <div className="text-[10px] text-[#8FA3B8]">W*A combo language validated</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#8FA3B8] leading-relaxed max-w-md">
          You have successfully connected formal automata concepts to practical video-game controls, output systems, and combat mechanics!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-6">
          <button
            onClick={onReplay}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1E293B] hover:bg-[#1E293B]/80 border border-[#8FA3B8]/30 text-white font-mono text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>PLAY AGAIN</span>
          </button>

          <button
            onClick={onGoToPresentation}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,255,156,0.4)] transition-all cursor-pointer"
          >
            <Presentation className="w-4 h-4" />
            <span>GO TO PRESENTATION</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
