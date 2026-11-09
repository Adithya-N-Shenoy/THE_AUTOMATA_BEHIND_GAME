import { TeamMember } from '../types/automata';

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Adithya N Shenoy',
    usn: '1RUA24CSE0018',
    role: 'Project Coordinator & DFA Game Lead (Host)',
    contributions: [
      'Defined game-design problem, storyline, and architectural pipeline',
      'Designed Level 1 Double-Tap Dash DFA formal 5-tuple and state diagram',
      'Implemented input recognizer and deterministic state trace mechanics',
      'Presents TOC fundamentals, formal DFA model, and project intro',
    ],
    topics: 'TOC Fundamentals, Architecture, DFA Double-Tap Dash & Deterministic Trace',
    slidesHandled: 'Slides 3–6 (Intro: 1–2)',
    color: '#00FF9C',
    avatarIcon: 'Crown',
  },
  {
    id: 'member-2',
    name: 'Abhishek',
    usn: '1RUA24CSE0008',
    role: 'NFA, Output Machines & String Acceptance Lead',
    contributions: [
      'Designed Konami cheat-code NFA detector and state subset tracking',
      'Engineered Moore (Boss HP) and Mealy (Hit Spark/Damage) machines',
      'Developed interactive step-by-step String Acceptance Verification demo',
      'Presents NFA branching, subset construction, outputs & acceptance traces',
    ],
    topics: 'NFA Cheat Code, Subset Construction, Moore & Mealy, String Acceptance Traces',
    slidesHandled: 'Slides 7–10',
    color: '#38BDF8',
    avatarIcon: 'Cpu',
  },
  {
    id: 'member-3',
    name: 'Arjun',
    usn: '1RUA24CSE0065',
    role: 'DFA Minimization & Regular Expression Lead',
    contributions: [
      'Implemented table-filling algorithm and Myhill-Nerode minimization',
      'Designed Level 4 Combo Challenge regular expression (W*A)',
      'Constructed formal Pumping Lemma contradiction proof for counting limits',
      'Engineered game engine architecture and pipeline integration',
    ],
    topics: 'DFA Minimization, Regular Expressions (W*A), Pumping Lemma Proof, Architecture',
    slidesHandled: 'Slides 11–14',
    color: '#FF2E88',
    avatarIcon: 'Brain',
  },
  {
    id: 'member-4',
    name: 'Chetan Nidgundi',
    usn: '1RUA24CSE0106',
    role: 'Industry Applications & Verification Matrix Lead',
    contributions: [
      'Researched commercial automata applications in Unity & Unreal Engine 5',
      'Engineered comprehensive automated test suite and invariant validation',
      'Coordinated team speaking matrix and CIE-3 rubric compliance',
      'Presents industry applications, test matrix, and grand finale',
    ],
    topics: 'Real-World Game Engines, Automated Test Suite, Speaking Matrix, Conclusion & Game Lab',
    slidesHandled: 'Slides 15–18',
    color: '#F5A623',
    avatarIcon: 'Search',
  },
];

const LOCAL_STORAGE_KEY = 'bosslevel_team_members_data_v2';

export function loadTeamMembers(): TeamMember[] {
  if (typeof window === 'undefined') return DEFAULT_TEAM_MEMBERS;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      saveTeamMembers(DEFAULT_TEAM_MEMBERS);
      return DEFAULT_TEAM_MEMBERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length >= 4) {
      // If cached data contains old placeholders, refresh to new team members
      if (parsed.some((m) => m.name.includes('[') || m.name.includes('Member 1'))) {
        saveTeamMembers(DEFAULT_TEAM_MEMBERS);
        return DEFAULT_TEAM_MEMBERS;
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse team members from localStorage:', e);
  }
  return DEFAULT_TEAM_MEMBERS;
}

export function saveTeamMembers(members: TeamMember[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(members));
  } catch (e) {
    console.error('Failed to save team members to localStorage:', e);
  }
}

export function resetTeamMembers(): TeamMember[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
  return DEFAULT_TEAM_MEMBERS;
}

export function exportTeamJSON(members: TeamMember[]): string {
  return JSON.stringify(members, null, 2);
}
