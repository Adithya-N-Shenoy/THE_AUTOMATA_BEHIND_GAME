import { MealyDefinition, MealyInput, MealyState, MealyTransitionResult } from '../types/automata';

/**
 * Combat Action & Hit Effect Mealy Machine
 * Output depends strictly on BOTH current state AND current input: λ(q, a)
 */
export const COMBAT_MEALY_MACHINE: MealyDefinition = {
  states: ['READY', 'COOLDOWN', 'SHIELDED'],
  inputs: ['attack', 'tick', 'defend'],
  startState: 'READY',
  transitions: {
    READY: {
      attack: {
        nextState: 'COOLDOWN',
        output: '⚡ CRITICAL SPARK (Direct Hit!)',
        damage: 25,
        effect: 'spark',
      },
      tick: {
        nextState: 'READY',
        output: 'Passive Scan (No Spark)',
        damage: 0,
        effect: 'none',
      },
      defend: {
        nextState: 'SHIELDED',
        output: '🛡️ Kinetic Barrier Raised',
        damage: 0,
        effect: 'block',
      },
    },
    COOLDOWN: {
      attack: {
        nextState: 'COOLDOWN',
        output: '💨 Glancing Strike (Weapon Cooling)',
        damage: 10,
        effect: 'glance',
      },
      tick: {
        nextState: 'READY',
        output: '🔄 Capacitor Recharged to Ready',
        damage: 0,
        effect: 'none',
      },
      defend: {
        nextState: 'SHIELDED',
        output: '🛡️ Emergency Guard',
        damage: 0,
        effect: 'block',
      },
    },
    SHIELDED: {
      attack: {
        nextState: 'READY',
        output: '⚔️ Shield-Breaker Counter (Heavy Spark)',
        damage: 20,
        effect: 'spark',
      },
      tick: {
        nextState: 'READY',
        output: 'Shield Depleted Naturally',
        damage: 0,
        effect: 'none',
      },
      defend: {
        nextState: 'SHIELDED',
        output: '🛡️ Reinforcing Barrier Matrix',
        damage: 0,
        effect: 'block',
      },
    },
  },
};

export class MealyMachine {
  public currentState: MealyState;
  public lastResult: MealyTransitionResult | null = null;

  constructor(public definition: MealyDefinition = COMBAT_MEALY_MACHINE) {
    this.currentState = definition.startState;
  }

  public reset(): void {
    this.currentState = this.definition.startState;
    this.lastResult = null;
  }

  public step(input: MealyInput): {
    previousState: MealyState;
    result: MealyTransitionResult;
  } {
    const prev = this.currentState;
    const transition = this.definition.transitions[prev][input];
    this.currentState = transition.nextState;
    this.lastResult = transition;

    return {
      previousState: prev,
      result: transition,
    };
  }
}
