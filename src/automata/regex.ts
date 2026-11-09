import { RegexSymbol } from '../types/automata';

/**
 * Combo Regex Recognizer
 * Pattern: W*A (anchored: ^W*A$)
 * Formally converted into a 3-state minimal DFA:
 * States:
 *   q0: start state, loops on 'W'
 *   q1: accept state, reached on 'A' from q0
 *   trap: sink/dead state, reached if invalid symbol or trailing input after 'A'
 */
export interface ComboDFAResult {
  state: 'q0' | 'q1' | 'trap';
  accepted: boolean;
  explanation: string;
}

export class RegexComboRecognizer {
  public static readonly REGEX_STRING = '^W*A$';
  public static readonly DISPLAY_REGEX = 'W*A';

  public static test(input: string): boolean {
    return /^W*A$/.test(input);
  }

  /**
   * Evaluates input step-by-step through the equivalent DFA
   */
  public static traceDFA(input: string): {
    steps: { char: string; from: string; to: string }[];
    finalState: 'q0' | 'q1' | 'trap';
    accepted: boolean;
    reason: string;
  } {
    let state: 'q0' | 'q1' | 'trap' = 'q0';
    const steps: { char: string; from: string; to: string }[] = [];

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const from = state;

      if (state === 'q0') {
        if (char === 'W') {
          state = 'q0';
        } else if (char === 'A') {
          state = 'q1';
        } else {
          state = 'trap';
        }
      } else if (state === 'q1') {
        // Any symbol after the terminal 'A' violates the regex ^W*A$
        state = 'trap';
      } else {
        state = 'trap';
      }

      steps.push({ char, from, to: state });
    }

    const accepted = state === 'q1';
    let reason = '';
    if (accepted) {
      reason = `Accepted! Matched ${input.length - 1} walk command(s) followed by final attack command 'A'.`;
    } else if (state === 'q0') {
      reason = input.length === 0
        ? "Empty input string. Regex 'W*A' requires at least one terminating 'A'."
        : "Missing terminating 'A' attack command.";
    } else {
      reason = "Pattern violated: unexpected sequence or input after 'A' attack.";
    }

    return {
      steps,
      finalState: state,
      accepted,
      reason,
    };
  }
}
