import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESENTATION_SLIDES } from '../../data/slidesData';
import { SlideRenderer } from './SlideRenderer';
import { SpeakerNotesDrawer } from './SpeakerNotesDrawer';
import { TeamEditorModal } from './TeamEditorModal';
import { TestSuiteModal } from './TestSuiteModal';
import { TeamMember } from '../../types/automata';
import { sound } from '../../sound/audio';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  User,
  Cpu,
  Gamepad2,
  List,
} from 'lucide-react';

interface PresentationViewProps {
  teamMembers: TeamMember[];
  onUpdateTeamMembers: (members: TeamMember[]) => void;
  onGoToGameLevel: (level: number) => void;
  initialSlideIndex?: number;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  teamMembers,
  onUpdateTeamMembers,
  onGoToGameLevel,
  initialSlideIndex = 0,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [showTeamEditor, setShowTeamEditor] = useState(false);
  const [showTestSuite, setShowTestSuite] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSlideMenu, setShowSlideMenu] = useState(false);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  const goToSlide = (index: number) => {
    const next = Math.max(0, Math.min(totalSlides - 1, index));
    if (next !== currentSlideIndex) {
      sound.playTap();
      setCurrentSlideIndex(next);
      setShowSlideMenu(false);
    }
  };

  const handleNext = () => goToSlide(currentSlideIndex + 1);
  const handlePrev = () => goToSlide(currentSlideIndex - 1);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Escape') {
        setShowNotes(false);
        setShowSlideMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col gap-4 px-4 py-4 min-h-[calc(100vh-80px)]">
      {/* Presentation Top Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#10182B] border border-[#1E293B]">
        {/* Left: Slide selector dropdown & progress */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowSlideMenu((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0A0E1A] hover:bg-[#152038] border border-[#1E293B] text-xs font-mono font-bold text-white transition-all cursor-pointer"
            >
              <List className="w-3.5 h-3.5 text-[#00FF9C]" />
              <span>
                Slide {currentSlide.slideNumber} / {String(totalSlides).padStart(2, '0')}
              </span>
            </button>

            {/* Slide Picker Dropdown */}
            {showSlideMenu && (
              <div className="absolute top-full left-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-xl bg-[#0D1424] border border-[#00FF9C]/30 shadow-2xl z-50 p-2 divide-y divide-[#1E293B]">
                {PRESENTATION_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className={`w-full text-left p-2 rounded-lg text-xs font-mono flex items-center justify-between hover:bg-[#152038] transition-colors cursor-pointer ${
                      idx === currentSlideIndex ? 'bg-[#00FF9C]/15 text-[#00FF9C] font-bold' : 'text-[#8FA3B8]'
                    }`}
                  >
                    <span className="truncate mr-2">
                      {s.slideNumber}. {s.title}
                    </span>
                    <span className="text-[10px] shrink-0 text-[#8FA3B8]">{s.player.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Current Speaker Chip */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0E1A] border border-[#1E293B] text-xs font-mono text-[#8FA3B8]">
            <User className="w-3.5 h-3.5 text-[#00FF9C]" />
            <span>Speaker:</span>
            <span className="text-white font-bold">{currentSlide.player}</span>
            <span className="text-[#8FA3B8]">({currentSlide.timing})</span>
          </div>
        </div>

        {/* Right: Action Buttons (Speaker Notes, Team Editor, Test Suite, Fullscreen) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
              showNotes
                ? 'bg-[#00FF9C]/20 border-[#00FF9C] text-[#00FF9C] shadow-[0_0_10px_rgba(0,255,156,0.2)]'
                : 'bg-[#0A0E1A] border-[#1E293B] text-[#8FA3B8] hover:text-white'
            }`}
            title="Toggle Speaker Notes (N)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes (N)</span>
          </button>

          <button
            onClick={() => setShowTeamEditor(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A0E1A] border border-[#1E293B] text-xs font-mono text-[#8FA3B8] hover:text-white transition-all cursor-pointer"
            title="Edit Team Members"
          >
            <User className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="hidden md:inline">Team Info</span>
          </button>

          <button
            onClick={() => setShowTestSuite(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0A0E1A] border border-[#1E293B] text-xs font-mono text-[#8FA3B8] hover:text-[#00FF9C] transition-all cursor-pointer"
            title="Verification Test Matrix"
          >
            <Cpu className="w-3.5 h-3.5 text-[#00FF9C]" />
            <span className="hidden lg:inline">Test Matrix</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-[#0A0E1A] border border-[#1E293B] text-[#8FA3B8] hover:text-white transition-all cursor-pointer"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 16:9 Presentation Stage Container */}
      <div className="relative w-full aspect-[16/9] min-h-[440px] md:min-h-[580px] rounded-2xl bg-[#0A0E1A] border-2 border-[#00FF9C]/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between">
        {/* Animated Slide Content */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.015 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <SlideRenderer
                slide={currentSlide}
                teamMembers={teamMembers}
                onGoToSlide={(target) => {
                  const targetIndex = target >= 1 && target <= totalSlides ? target - 1 : target;
                  goToSlide(targetIndex);
                }}
                onGoToGameLevel={onGoToGameLevel}
                onOpenTeamEditor={() => setShowTeamEditor(true)}
                onOpenTestSuite={() => setShowTestSuite(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar at very bottom of stage */}
        <div className="w-full h-1 bg-[#10182B] relative">
          <div
            className="h-full bg-gradient-to-r from-[#00FF9C] via-[#38BDF8] to-[#FF2E88] transition-all duration-300"
            style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
          />
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#10182B] border border-[#1E293B]">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A0E1A] hover:bg-[#1E293B] border border-[#1E293B] text-xs font-mono text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#00FF9C]" />
          <span>Previous Slide</span>
        </button>

        {/* Slide Numbers Strip */}
        <div className="hidden sm:flex items-center gap-1 overflow-x-auto px-2">
          {PRESENTATION_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                idx === currentSlideIndex
                  ? 'bg-[#00FF9C] text-black shadow-[0_0_10px_rgba(0,255,156,0.4)]'
                  : 'bg-[#0A0E1A] text-[#8FA3B8] hover:text-white border border-[#1E293B]'
              }`}
            >
              {s.id}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === totalSlides - 1}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,255,156,0.3)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Speaker Notes Drawer */}
      <SpeakerNotesDrawer
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        slide={currentSlide}
      />

      {/* Team Details Editor Modal */}
      {showTeamEditor && (
        <TeamEditorModal
          members={teamMembers}
          onSave={(updated) => {
            onUpdateTeamMembers(updated);
            setShowTeamEditor(false);
          }}
          onClose={() => setShowTeamEditor(false)}
        />
      )}

      {/* Test Suite Verification Modal */}
      {showTestSuite && <TestSuiteModal onClose={() => setShowTestSuite(false)} />}
    </div>
  );
};
