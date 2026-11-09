import React, { useState } from 'react';
import { Volume2, VolumeX, Gamepad2, Presentation, Cpu, Users } from 'lucide-react';
import { sound } from '../../sound/audio';

interface NavbarProps {
  currentTab: 'presentation' | 'game';
  onSelectTab: (tab: 'presentation' | 'game') => void;
  onOpenTestSuite: () => void;
  onOpenTeamEditor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenTestSuite,
  onOpenTeamEditor,
}) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) {
      sound.playTap();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0E1A]/95 border-b border-[#1E293B] backdrop-blur-md px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('presentation')}
            className="text-left cursor-pointer"
          >
            <span className="text-lg md:text-xl font-arcade text-[#00FF9C] glow-green whitespace-nowrap tracking-wider block">
              BOSS LEVEL
            </span>
            <span className="text-[10px] font-mono text-[#8FA3B8] tracking-widest block -mt-0.5">
              THE AUTOMATA BEHIND GAME AI
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean) */}
        <nav className="flex items-center gap-2 md:gap-4 text-xs font-mono font-bold">
          <button
            onClick={() => onSelectTab('presentation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'presentation'
                ? 'bg-[#00FF9C]/15 text-[#00FF9C] border border-[#00FF9C]/40 shadow-[0_0_10px_rgba(0,255,156,0.2)]'
                : 'text-[#8FA3B8] hover:text-white border border-transparent'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Presentation</span>
          </button>

          <button
            onClick={() => onSelectTab('game')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'game'
                ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                : 'text-[#8FA3B8] hover:text-white border border-transparent'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Game Lab</span>
          </button>

          <button
            onClick={onOpenTestSuite}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#8FA3B8] hover:text-[#00FF9C] hover:bg-[#10182B] transition-all whitespace-nowrap cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Test Matrix</span>
          </button>

          <button
            onClick={onOpenTeamEditor}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[#8FA3B8] hover:text-white hover:bg-[#10182B] transition-all whitespace-nowrap cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team Info</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Audio Toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
              isMuted
                ? 'bg-[#1E293B] text-[#8FA3B8] border-[#1E293B]'
                : 'bg-[#00FF9C]/10 text-[#00FF9C] border-[#00FF9C]/30 shadow-[0_0_10px_rgba(0,255,156,0.15)]'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#FF2E88]" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound ON'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
