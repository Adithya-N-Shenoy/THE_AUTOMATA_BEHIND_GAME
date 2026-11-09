import { DFADefinition, DFASymbol, StepLogEntry } from '../types/automata';

/**
 * Double-Tap Dash DFA definition
 * Formally: M = (Q, Σ, δ, q0, F)
 * Q = {S0, S1, S2}
 * Σ = {t, o}
 * q0 = S0
 * F = {S2}
 */
export const DOUBLE_TAP_DFA: DFADefinition = {
  states: ['S0', 'S1', 'S2'],
  alphabet: ['t', 'o'],
  startState: 'S0',
  acceptStates: ['S2'],
  transitions: {
    S0: { t: 'S1', o: 'S0' },
    S1: { t: 'S2', o: 'S0' },
    S2: { t: 'S2', o: 'S0' },
  },
};

export class DFAMachine {
  public currentState: string;
  public inputHistory: DFASymbol[] = [];
  public logs: StepLogEntry[] = [];
  private stepCount = 0;

  constructor(public definition: DFADefinition = DOUBLE_TAP_DFA) {
    this.currentState = definition.startState;
  }

  public reset(): void {
    this.currentState = this.definition.startState;
    this.inputHistory = [];
    this.logs = [];
    this.stepCount = 0;
  }

  public step(symbol: DFASymbol): {
    previousState: string;
    currentState: string;
    symbol: DFASymbol;
    accepted: boolean;
  } {
    const prev = this.currentState;
    const next = this.definition.transitions[prev]?.[symbol] ?? prev;
    this.currentState = next;
    this.inputHistory.push(symbol);
    this.stepCount++;

    const accepted = this.definition.acceptStates.includes(next);

    this.logs.push({
      step: this.stepCount,
      input: symbol,
      previousState: prev,
      currentState: next,
      accepted,
      message:
        symbol === 't'
          ? next === 'S2'
            ? 'Second consecutive tap detected! Dash trigger condition accepted!'
            : 'Tap registered. Advanced to S1 (first tap recorded).'
          : 'Non-tap symbol entered. Reset sequence back to idle state S0.',
      timestamp: Date.now(),
    });

    return {
      previousState: prev,
      currentState: next,
      symbol,
      accepted,
    };
  }

  public isAccepted(): boolean {
    return this.definition.acceptStates.includes(this.currentState);
  }

  public static simulate(
    inputString: DFASymbol[],
    definition: DFADefinition = DOUBLE_TAP_DFA
  ): {
    finalState: string;
    accepted: boolean;
    trace: { step: number; state: string; symbol?: DFASymbol }[];
  } {
    let state = definition.startState;
    const trace: { step: number; state: string; symbol?: DFASymbol }[] = [
      { step: 0, state },
    ];

    for (let i = 0; i < inputString.length; i++) {
      const sym = inputString[i];
      state = definition.transitions[state]?.[sym] ?? state;
      trace.push({ step: i + 1, state, symbol: sym });
    }

    return {
      finalState: state,
      accepted: definition.acceptStates.includes(state),
      trace,
    };
  }
}
