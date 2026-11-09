import React from 'react';
import { SlideData } from '../../types/automata';
import { X, Mic, Clock, FileText, User } from 'lucide-react';

interface SpeakerNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  slide: SlideData;
}

export const SpeakerNotesDrawer: React.FC<SpeakerNotesDrawerProps> = ({
  isOpen,
  onClose,
  slide,
}) => {
  if (!isOpen) return null;

  const wordCount = slide.speakerNotes.trim().split(/\s+/).length;
  const estimatedSeconds = Math.round((wordCount / 148) * 60);

  const getPlayerBadgeColor = () => {
    const p = slide.player.toLowerCase();
    if (p.includes('adithya') || p.includes('player 1')) return '#00FF9C';
    if (p.includes('abhishek') || p.includes('player 2')) return '#38BDF8';
    if (p.includes('arjun') || p.includes('player 3')) return '#FF2E88';
    if (p.includes('chetan') || p.includes('player 4')) return '#F5A623';
    return '#00FF9C';
  };

  const badgeColor = getPlayerBadgeColor();

  return (
    <aside
      className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] max-w-[95vw] z-50 bg-[#0D1424]/98 border-l border-[#00FF9C]/30 shadow-2xl flex flex-col backdrop-blur-md animate-in slide-in-from-right duration-300"
    >
      {/* Header */}
      <div className="p-5 border-b border-[#1E293B] bg-[#0A0E1A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-[#00FF9C]" />
            <span className="text-xs font-mono font-bold text-[#00FF9C] tracking-wider">
              SPEAKER SCRIPT &amp; RUN SHEET
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8FA3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm font-bold text-white font-tech mt-2 truncate">
          SLIDE {slide.slideNumber} · {slide.title}
        </div>

        {/* Metadata chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-mono">
          <span
            className="px-2.5 py-0.5 rounded-full font-bold border flex items-center gap-1"
            style={{
              backgroundColor: `${badgeColor}18`,
              borderColor: `${badgeColor}55`,
              color: badgeColor,
            }}
          >
            <User className="w-3 h-3" />
            {slide.player}
          </span>

          <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-[#38BDF8] border border-[#38BDF8]/20 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {slide.timing}
          </span>

          <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-[#8FA3B8] border border-[#1E293B] flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {wordCount} words (~{estimatedSeconds}s)
          </span>
        </div>
      </div>

      {/* Script Body */}
      <div className="flex-1 overflow-y-auto p-6 font-tech text-base leading-relaxed text-[#E8F1F2] space-y-4">
        <div className="p-3.5 rounded-xl bg-[#10182B] border border-[#1E293B] text-xs font-mono text-[#8FA3B8]">
          <strong className="text-white block mb-0.5">Spoken Delivery Script:</strong>
          Speak clearly at a conversational pace (~148 words/min). The timing window is a budget, not a strict limit.
        </div>

        <div className="text-sm md:text-base leading-loose whitespace-pre-line text-[#E8F1F2]">
          &quot;{slide.speakerNotes}&quot;
        </div>
      </div>

      {/* Footer guideline */}
      <div className="p-4 border-t border-[#1E293B] bg-[#0A0E1A] text-[11px] font-mono text-[#8FA3B8] flex items-center justify-between">
        <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[#1E293B] text-white">N</kbd> to toggle notes</span>
        <span className="text-[#00FF9C]">CS3703 CIE-3</span>
      </div>
    </aside>
  );
};
