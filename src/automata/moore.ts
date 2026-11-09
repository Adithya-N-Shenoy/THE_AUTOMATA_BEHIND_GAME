import { MooreDefinition, MooreInput, MooreOutput, MooreState } from '../types/automata';

/**
 * Boss Health Indicator Moore Machine
 * Output depends strictly on the current state: λ(q) ∈ {GREEN, AMBER, RED, BLACK}
 */
export const BOSS_MOORE_MACHINE: MooreDefinition = {
  states: ['HEALTHY', 'INJURED', 'CRITICAL', 'DEFEATED'],
  inputs: ['hit', 'heal', 'wait'],
  outputs: ['GREEN', 'AMBER', 'RED', 'BLACK'],
  startState: 'HEALTHY',
  transitions: {
    HEALTHY: {
      hit: 'INJURED',
      heal: 'HEALTHY',
      wait: 'HEALTHY',
    },
    INJURED: {
      hit: 'CRITICAL',
      heal: 'HEALTHY',
      wait: 'INJURED',
    },
    CRITICAL: {
      hit: 'DEFEATED',
      heal: 'INJURED',
      wait: 'CRITICAL',
    },
    DEFEATED: {
      hit: 'DEFEATED',
      heal: 'DEFEATED',
      wait: 'DEFEATED',
    },
  },
  outputMap: {
    HEALTHY: 'GREEN',
    INJURED: 'AMBER',
    CRITICAL: 'RED',
    DEFEATED: 'BLACK',
  },
};

export class MooreMachine {
  public currentState: MooreState;
  public hpPercentage: number = 100;

  constructor(public definition: MooreDefinition = BOSS_MOORE_MACHINE) {
    this.currentState = definition.startState;
  }

  public reset(): void {
    this.currentState = this.definition.startState;
    this.hpPercentage = 100;
  }

  public get currentOutput(): MooreOutput {
    return this.definition.outputMap[this.currentState];
  }

  public step(input: MooreInput): {
    previousState: MooreState;
    currentState: MooreState;
    input: MooreInput;
    output: MooreOutput;
  } {
    const prev = this.currentState;
    const next = this.definition.transitions[prev][input];
    this.currentState = next;

    return {
      previousState: prev,
      currentState: next,
      input,
      output: this.definition.outputMap[next],
    };
  }

  /**
   * Helper that maps continuous HP percentage directly to the discrete Moore state
   */
  public updateStateFromHp(hp: number): {
    state: MooreState;
    output: MooreOutput;
    changed: boolean;
  } {
    this.hpPercentage = Math.max(0, Math.min(100, hp));
    let nextState: MooreState = 'HEALTHY';
    if (this.hpPercentage === 0) {
      nextState = 'DEFEATED';
    } else if (this.hpPercentage <= 33) {
      nextState = 'CRITICAL';
    } else if (this.hpPercentage <= 66) {
      nextState = 'INJURED';
    } else {
      nextState = 'HEALTHY';
    }

    const changed = nextState !== this.currentState;
    this.currentState = nextState;

    return {
      state: nextState,
      output: this.definition.outputMap[nextState],
      changed,
    };
  }
}
