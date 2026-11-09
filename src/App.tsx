/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { PresentationView } from './components/presentation/PresentationView';
import { GameLabView } from './components/game/GameLabView';
import { TestSuiteModal } from './components/presentation/TestSuiteModal';
import { TeamEditorModal } from './components/presentation/TeamEditorModal';
import { loadTeamMembers } from './data/teamData';
import { TeamMember } from './types/automata';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'presentation' | 'game'>('presentation');
  const [gameInitialLevel, setGameInitialLevel] = useState(1);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => loadTeamMembers());
  const [showTestSuiteModal, setShowTestSuiteModal] = useState(false);
  const [showTeamEditorModal, setShowTeamEditorModal] = useState(false);

  const handleGoToGameLevel = (level: number) => {
    setGameInitialLevel(level);
    setCurrentTab('game');
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-[#E8F1F2] flex flex-col relative selection:bg-[#00FF9C]/30 selection:text-[#00FF9C]">
      {/* Decorative Non-blocking CRT Scanlines Overlay */}
      <div className="scanlines-overlay pointer-events-none" aria-hidden="true" />

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        onOpenTestSuite={() => setShowTestSuiteModal(true)}
        onOpenTeamEditor={() => setShowTeamEditorModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {currentTab === 'presentation' ? (
          <PresentationView
            teamMembers={teamMembers}
            onUpdateTeamMembers={(updated) => setTeamMembers(updated)}
            onGoToGameLevel={handleGoToGameLevel}
          />
        ) : (
          <GameLabView
            initialLevel={gameInitialLevel}
            onGoToPresentation={() => setCurrentTab('presentation')}
          />
        )}
      </main>

      {/* Global Modals */}
      {showTestSuiteModal && (
        <TestSuiteModal onClose={() => setShowTestSuiteModal(false)} />
      )}

      {showTeamEditorModal && (
        <TeamEditorModal
          members={teamMembers}
          onSave={(updated) => {
            setTeamMembers(updated);
            setShowTeamEditorModal(false);
          }}
          onClose={() => setShowTeamEditorModal(false)}
        />
      )}
    </div>
  );
}
