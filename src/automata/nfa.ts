import { DirectionSymbol, NFADefinition, StepLogEntry } from '../types/automata';

/**
 * Level 2 Cheat Code NFA definition
 * Sequence: UP UP DOWN DOWN anywhere in the stream
 * Scanner state 's' loops on all inputs, branching non-deterministically into 'c1' on UP.
 */
export const CHEAT_CODE_NFA: NFADefinition = {
  states: ['s', 'c1', 'c2', 'c3', 'accept'],
  alphabet: ['UP', 'DOWN', 'LEFT', 'RIGHT', 'B', 'A'],
  startState: 's',
  acceptStates: ['accept'],
  transitions: {
    s: {
      UP: ['s', 'c1'],
      DOWN: ['s'],
      LEFT: ['s'],
      RIGHT: ['s'],
      B: ['s'],
      A: ['s'],
    },
    c1: {
      UP: ['c2'],
    },
    c2: {
      DOWN: ['c3'],
    },
    c3: {
      DOWN: ['accept'],
    },
    accept: {
      UP: ['accept'],
      DOWN: ['accept'],
      LEFT: ['accept'],
      RIGHT: ['accept'],
      B: ['accept'],
      A: ['accept'],
    },
  },
};

export class NFAMachine {
  public activeStates: Set<string>;
  public inputHistory: DirectionSymbol[] = [];
  public logs: StepLogEntry[] = [];
  private stepCount = 0;

  constructor(public definition: NFADefinition = CHEAT_CODE_NFA) {
    this.activeStates = new Set([definition.startState]);
  }

  public reset(): void {
    this.activeStates = new Set([this.definition.startState]);
    this.inputHistory = [];
    this.logs = [];
    this.stepCount = 0;
  }

  public step(symbol: DirectionSymbol): {
    previousStates: string[];
    currentStates: string[];
    symbol: DirectionSymbol;
    accepted: boolean;
    branchOccurred: boolean;
  } {
    const previous = Array.from(this.activeStates).sort();
    const nextStates = new Set<string>();
    let branchOccurred = false;

    // Transition each currently active state
    for (const state of this.activeStates) {
      const targets = this.definition.transitions[state]?.[symbol] ?? [];
      if (targets.length > 1) {
        branchOccurred = true;
      }
      for (const target of targets) {
        nextStates.add(target);
      }
    }

    this.activeStates = nextStates;
    this.inputHistory.push(symbol);
    this.stepCount++;

    const current = Array.from(this.activeStates).sort();
    const accepted = current.some((st) => this.definition.acceptStates.includes(st));

    let msg = `Input '${symbol}' processed. Active subset: {${current.join(', ')}}.`;
    if (branchOccurred) {
      msg = `Nondeterministic branch triggered! Scanner stayed in 's' while branch entered 'c1'. Active: {${current.join(', ')}}.`;
    }
    if (accepted) {
      msg = `Cheat code accepted! Target state 'accept' reached in active state set!`;
    }

    this.logs.push({
      step: this.stepCount,
      input: symbol,
      previousState: previous,
      currentState: current,
      accepted,
      message: msg,
      timestamp: Date.now(),
    });

    return {
      previousStates: previous,
      currentStates: current,
      symbol,
      accepted,
      branchOccurred,
    };
  }

  public isAccepted(): boolean {
    return Array.from(this.activeStates).some((st) =>
      this.definition.acceptStates.includes(st)
    );
  }

  public static simulate(
    inputs: DirectionSymbol[],
    definition: NFADefinition = CHEAT_CODE_NFA
  ): {
    finalActiveStates: string[];
    accepted: boolean;
    trace: { step: number; activeStates: string[]; symbol?: DirectionSymbol }[];
  } {
    let current = new Set<string>([definition.startState]);
    const trace: { step: number; activeStates: string[]; symbol?: DirectionSymbol }[] = [
      { step: 0, activeStates: Array.from(current).sort() },
    ];

    for (let i = 0; i < inputs.length; i++) {
      const sym = inputs[i];
      const next = new Set<string>();

      for (const st of current) {
        const targets = definition.transitions[st]?.[sym] ?? [];
        for (const target of targets) {
          next.add(target);
        }
      }

      current = next;
      trace.push({
        step: i + 1,
        activeStates: Array.from(current).sort(),
        symbol: sym,
      });
    }

    const finalActiveStates = Array.from(current).sort();
    const accepted = finalActiveStates.some((st) => definition.acceptStates.includes(st));

    return {
      finalActiveStates,
      accepted,
      trace,
    };
  }
}
