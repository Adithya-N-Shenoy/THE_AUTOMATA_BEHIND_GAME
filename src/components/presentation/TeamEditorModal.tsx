import React, { useState } from 'react';
import { TeamMember } from '../../types/automata';
import { saveTeamMembers, resetTeamMembers, exportTeamJSON } from '../../data/teamData';
import { X, Save, RotateCcw, Download, Check, User, Shield, BookOpen } from 'lucide-react';

interface TeamEditorModalProps {
  members: TeamMember[];
  onSave: (updated: TeamMember[]) => void;
  onClose: () => void;
}

export const TeamEditorModal: React.FC<TeamEditorModalProps> = ({
  members: initialMembers,
  onSave,
  onClose,
}) => {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [selectedId, setSelectedId] = useState<string>(members[0]?.id || '');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedMember = members.find((m) => m.id === selectedId) || members[0];

  const handleUpdateField = (field: keyof TeamMember, value: unknown) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === selectedId ? { ...m, [field]: value } : m))
    );
  };

  const handleContributionChange = (index: number, text: string) => {
    if (!selectedMember) return;
    const newContribs = [...selectedMember.contributions];
    newContribs[index] = text;
    handleUpdateField('contributions', newContribs);
  };

  const handleSave = () => {
    saveTeamMembers(members);
    onSave(members);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Reset team details to initial template placeholders?')) {
      const defs = resetTeamMembers();
      setMembers(defs);
      onSave(defs);
    }
  };

  const handleExport = () => {
    const jsonStr = exportTeamJSON(members);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'boss_level_team_details.json';
    a.click();
    URL.revokeObjectURL(url);

    navigator.clipboard?.writeText(jsonStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#10182B] border-2 border-[#00FF9C]/40 flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1E293B] bg-[#0A0E1A]">
          <div>
            <h3 className="text-lg font-bold font-tech text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#00FF9C]" />
              TEAM DETAILS &amp; CONTRIBUTION EDITOR
            </h3>
            <p className="text-xs text-[#8FA3B8]">
              Edit student names, USNs, speaking topics, and contributions. Saved to browser localStorage.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8FA3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two column selector and editor */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#1E293B]">
          {/* Member Picker List (4 cols) */}
          <div className="md:col-span-4 p-4 flex flex-col gap-2 bg-[#0C1222]">
            <span className="text-[11px] font-mono text-[#8FA3B8] mb-1">SELECT MEMBER TO EDIT:</span>
            {members.map((m, idx) => {
              const isSelected = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className={`flex flex-col p-3 rounded-xl text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#10182B] text-white shadow-lg'
                      : 'bg-[#0A0E1A] text-[#8FA3B8] hover:bg-[#152038] border-transparent'
                  }`}
                  style={{
                    borderColor: isSelected ? m.color : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold" style={{ color: m.color }}>
                      PLAYER {idx + 1}
                    </span>
                    <span className="text-[10px] text-[#8FA3B8] font-mono">{m.slidesHandled.split(',')[0]}...</span>
                  </div>
                  <div className="text-sm font-bold truncate mt-1">{m.name}</div>
                  <div className="text-[11px] font-mono text-[#8FA3B8] truncate">{m.usn}</div>
                </button>
              );
            })}
          </div>

          {/* Form Fields (8 cols) */}
          <div className="md:col-span-8 p-6 flex flex-col gap-4 overflow-y-auto">
            {selectedMember && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8FA3B8] mb-1">
                      Full Student Name:
                    </label>
                    <input
                      type="text"
                      value={selectedMember.name}
                      onChange={(e) => handleUpdateField('name', e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] focus:border-[#00FF9C] text-sm text-white font-tech outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8FA3B8] mb-1">
                      University USN:
                    </label>
                    <input
                      type="text"
                      value={selectedMember.usn}
                      onChange={(e) => handleUpdateField('usn', e.target.value)}
                      placeholder="e.g. 1RV23CS001"
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] focus:border-[#00FF9C] text-sm text-white font-mono outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8FA3B8] mb-1">
                    Project Role:
                  </label>
                  <input
                    type="text"
                    value={selectedMember.role}
                    onChange={(e) => handleUpdateField('role', e.target.value)}
                    placeholder="e.g. DFA & Game Mechanics Developer"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] focus:border-[#00FF9C] text-sm text-white font-tech outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#8FA3B8] mb-1">
                      Theory Topics Presented:
                    </label>
                    <input
                      type="text"
                      value={selectedMember.topics}
                      onChange={(e) => handleUpdateField('topics', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] focus:border-[#00FF9C] text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#8FA3B8] mb-1">
                      Slides Assigned:
                    </label>
                    <input
                      type="text"
                      value={selectedMember.slidesHandled}
                      onChange={(e) => handleUpdateField('slidesHandled', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0E1A] border border-[#1E293B] focus:border-[#00FF9C] text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#8FA3B8] mb-1.5">
                    Individual Contributions (Bullet points):
                  </label>
                  <div className="flex flex-col gap-2">
                    {selectedMember.contributions.map((c, i) => (
                      <input
                        key={i}
                        type="text"
                        value={c}
                        onChange={(e) => handleContributionChange(i, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0A0E1A] border border-[#1E293B] focus:border-[#00FF9C] text-xs text-white outline-none"
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1E293B] bg-[#0A0E1A] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#8FA3B8] hover:text-white hover:bg-[#1E293B] border border-[#1E293B] transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Template
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#38BDF8] bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {copied ? 'Downloaded & Copied JSON!' : 'Export JSON'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {savedSuccess && (
              <span className="text-xs font-mono text-[#00FF9C] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-mono font-bold text-xs shadow-[0_0_15px_rgba(0,255,156,0.3)] transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
