/**
 * Theory of Computation (CS3703) Type Definitions
 */

export type DFASymbol = 't' | 'o'; // Tap or Other

export interface DFATransition {
  from: string;
  symbol: DFASymbol;
  to: string;
}

export interface DFADefinition {
  states: string[];
  alphabet: DFASymbol[];
  startState: string;
  acceptStates: string[];
  transitions: Record<string, Record<DFASymbol, string>>;
}

export type DirectionSymbol = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'B' | 'A';

export interface NFATransition {
  from: string;
  symbol: DirectionSymbol | 'ε';
  to: string[];
}

export interface NFADefinition {
  states: string[];
  alphabet: DirectionSymbol[];
  startState: string;
  acceptStates: string[];
  transitions: Record<string, Partial<Record<DirectionSymbol | 'ε', string[]>>>;
}

export type MooreInput = 'hit' | 'heal' | 'wait';
export type MooreState = 'HEALTHY' | 'INJURED' | 'CRITICAL' | 'DEFEATED';
export type MooreOutput = 'GREEN' | 'AMBER' | 'RED' | 'BLACK';

export interface MooreDefinition {
  states: MooreState[];
  inputs: MooreInput[];
  outputs: MooreOutput[];
  startState: MooreState;
  transitions: Record<MooreState, Record<MooreInput, MooreState>>;
  outputMap: Record<MooreState, MooreOutput>;
}

export type MealyInput = 'attack' | 'tick' | 'defend';
export type MealyState = 'READY' | 'COOLDOWN' | 'SHIELDED';
export interface MealyTransitionResult {
  nextState: MealyState;
  output: string;
  damage: number;
  effect: 'spark' | 'glance' | 'block' | 'none';
}

export interface MealyDefinition {
  states: MealyState[];
  inputs: MealyInput[];
  startState: MealyState;
  transitions: Record<MealyState, Record<MealyInput, MealyTransitionResult>>;
}

export type RegexSymbol = 'W' | 'A';

export interface StepLogEntry {
  step: number;
  input: string;
  previousState: string | string[];
  currentState: string | string[];
  accepted: boolean;
  message?: string;
  timestamp: number;
}

export interface TestResult {
  id: string;
  category: 'DFA' | 'NFA' | 'Moore' | 'Mealy' | 'Regex' | 'PumpingLemma';
  name: string;
  input: string;
  expected: string | boolean;
  actual: string | boolean;
  passed: boolean;
  details: string;
}

export interface TeamMember {
  id: string;
  name: string;
  usn: string;
  role: string;
  contributions: string[];
  topics: string;
  slidesHandled: string;
  color: string;
  avatarIcon: string;
}

export interface SlideData {
  id: number;
  slideNumber: string;
  title: string;
  subtitle?: string;
  player: string;
  timing: string;
  speakerNotes: string;
  category: 'Overview' | 'DFA' | 'NFA' | 'Output' | 'Regex' | 'Proof' | 'Architecture' | 'Matrix' | 'Conclusion' | 'Verification';
}
