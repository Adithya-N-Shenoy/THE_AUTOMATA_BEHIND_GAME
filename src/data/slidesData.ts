import { SlideData } from '../types/automata';

export const PRESENTATION_SLIDES: SlideData[] = [
  {
    id: 1,
    slideNumber: '01',
    title: 'BOSS LEVEL — The Automata Behind Game AI',
    subtitle: 'Learn the Theory. Play the Machine. Understand the Logic.',
    player: 'Adithya N Shenoy (Host)',
    timing: '0:00 - 0:25',
    category: 'Overview',
    speakerNotes:
      "Hey everyone, welcome! I'm Adithya N Shenoy (USN: 1RUA24CSE0018), and this is BOSS LEVEL — The Automata Behind Game AI, our CS3703 CIE-3 video presentation for RV University. Together with Abhishek, Arjun, and Chetan Nidgundi, we're demonstrating how Theory of Computation directly drives modern video-game AI. Every jump, combo, and boss behavior is backed by formal machines we can mathematically prove. Let's press start!",
  },
  {
    id: 2,
    slideNumber: '02',
    title: 'Players Ready — Team Profile',
    subtitle: 'Meet the Engineering & Theory Squad · RV University',
    player: 'Adithya N Shenoy',
    timing: '0:25 - 0:55',
    category: 'Overview',
    speakerNotes:
      'Here is our squad roll-call. I am Adithya N Shenoy (1RUA24CSE0018), handling the mission overview, TOC fundamentals, and the DFA Double-Tap Dash in Slides 3 to 6. Next, Abhishek (1RUA24CSE0008) presents the NFA Cheat Code recognizer, Moore and Mealy output machines, and live String Acceptance Verification in Slides 7 to 10. Arjun (1RUA24CSE0065) presents DFA minimization, Regular Expressions, the Pumping Lemma proof, and system architecture in Slides 11 to 14. Finally, Chetan Nidgundi (1RUA24CSE0106) presents real-world commercial game engines, our automated verification test matrix, team allocations, and our conclusion in Slides 15 to 18.',
  },
  {
    id: 3,
    slideNumber: '03',
    title: 'The Mission — What Are We Building?',
    subtitle: 'Bridging Formal Language Theory and Real-Time Game Mechanics',
    player: 'Adithya N Shenoy (1RUA24CSE0018)',
    timing: '0:55 - 1:30',
    category: 'Overview',
    speakerNotes:
      'Here is our core problem statement: How can mathematical models of computation control player actions, recognize cheat codes, generate dynamic visual outputs, and validate game commands? Today we build one complete boss encounter, level by level, backed by Theory of Computation. Level 1: Double-Tap Dash via DFA. Level 2: Boss Brain via NFA with Moore and Mealy feedback. Level 3: Combo Recognition via Regular Expressions and the Pumping Lemma. And we connect it all to a fully playable interactive Game Lab.',
  },
  {
    id: 4,
    slideNumber: '04',
    title: 'Theory of Computation Fundamentals',
    subtitle: 'From Controller Inputs to Formal Languages',
    player: 'Adithya N Shenoy (1RUA24CSE0018)',
    timing: '1:30 - 2:05',
    category: 'Overview',
    speakerNotes:
      "Let's ground our game in formal theory. The buttons on your controller form the Alphabet Sigma = {t, o}, where 't' represents a tap and 'o' represents any other action. A sequence of inputs over time forms a String 'w'. The set of all valid action sequences forms a Language 'L', which is a subset of Sigma star. A game state machine tracks these inputs: States represent physical enemy stances, and the transition function delta dictates the exact next state for each received symbol.",
  },
  {
    id: 5,
    slideNumber: '05',
    title: 'Level 1: Double-Tap Dash — The Deterministic Finite Automaton',
    subtitle: 'M = (Q, Σ, δ, q₀, F) — One Exact Next State Per Input',
    player: 'Adithya N Shenoy (1RUA24CSE0018)',
    timing: '2:05 - 2:50',
    category: 'DFA',
    speakerNotes:
      'Formally, our Double-Tap Dash is a Deterministic Finite Automaton: M = (Q, Sigma, delta, q0, F). Q consists of three states: S0 (Idle), S1 (First Tap Logged), and S2 (Dash Fired). Sigma is {t, o}. The transition function delta is completely deterministic: every (state, symbol) pair maps to exactly one next state—zero ambiguity, zero lag. q0 is S0, and F is {S2}. When the automaton reaches S2, the game engine fires the dash physics!',
  },
  {
    id: 6,
    slideNumber: '06',
    title: 'DFA Transition Table & Step-by-Step Trace',
    subtitle: 'Reading the Rulebook: Deterministic Execution in Real-Time',
    player: 'Adithya N Shenoy (1RUA24CSE0018)',
    timing: '2:50 - 3:35',
    category: 'DFA',
    speakerNotes:
      "Here is the rulebook as a transition table. Notice every cell contains exactly one state: delta(S0, t)=S1, delta(S1, t)=S2, while any 'o' resets back to S0. In game engines, this runs in O(1) time per frame. I will now hand over to Abhishek (1RUA24CSE0008), who will introduce nondeterminism in the Boss Brain, output machines, and demonstrate our live string acceptance verification.",
  },
  {
    id: 7,
    slideNumber: '07',
    title: 'Level 2: Boss Brain — The Nondeterministic Finite Automaton',
    subtitle: 'Handling Uncertainty: Multiple Concurrent Paths & Exploration',
    player: 'Abhishek (1RUA24CSE0008)',
    timing: '3:35 - 4:20',
    category: 'NFA',
    speakerNotes:
      "Thanks, Adithya! Abhishek here, taking over Level 2: the Boss Brain. Real enemies in games face uncertain player input: while patrolling, the boss must continuously scan the environment while simultaneously listening for a secret cheat code—UP UP DOWN DOWN. In an NFA, delta(q, a) maps to a subset of states rather than a single state. On receiving UP, our scanner state 's' remains in 's' while simultaneously spawning a branch into 'c1'!",
  },
  {
    id: 8,
    slideNumber: '08',
    title: 'NFA Active States & Subset Construction',
    subtitle: 'Proof of Equivalence: NFA ≡ DFA via Power Set Tracking',
    player: 'Abhishek (1RUA24CSE0008)',
    timing: '4:20 - 5:10',
    category: 'NFA',
    speakerNotes:
      'How does a game engine run an NFA? Through Subset Construction. At every frame, the engine tracks an active set of states. For an NFA with n states, there are at most 2^n possible subsets, forming the states of an equivalent DFA. Both machines recognize the exact same regular language. This proves NFAs have no greater computational power than DFAs, but allow game developers to write exponential patterns with linear clarity.',
  },
  {
    id: 9,
    slideNumber: '09',
    title: 'Machines With Output — Moore & Mealy Machines',
    subtitle: 'Generating Visual Feedback: Boss Health (Moore) vs Hit Sparks (Mealy)',
    player: 'Abhishek (1RUA24CSE0008)',
    timing: '5:10 - 5:55',
    category: 'Output',
    speakerNotes:
      'Standard automata only produce binary accept or reject decisions. Games require rich dynamic feedback. In a Moore machine, output depends strictly on the current state: our Boss Health bar turns Green, Amber, Red, or Black based entirely on which state the boss is in. In a Mealy machine, output depends on both current state and input symbol: attacking a Ready boss sparks 25 critical damage, whereas attacking during Cooldown yields a glancing blow. Any Moore machine can be converted into an equivalent Mealy machine.',
  },
  {
    id: 10,
    slideNumber: '10',
    title: 'String Acceptance Walkthrough — Verified Automata Traces',
    subtitle: 'Testing Valid vs. Invalid Sequences: Execution Paths & Acceptance Invariants',
    player: 'Abhishek (1RUA24CSE0008)',
    timing: '5:55 - 6:45',
    category: 'Verification',
    speakerNotes:
      "Now, let's step through formal string acceptance verification! A string 'w' is accepted by a DFA if and only if the extended transition function hat-delta(q0, w) lands in an accepting state F. Let's trace 't-o-t-t': S0 with 't' goes to S1; S1 with 'o' resets to S0; S0 with 't' goes to S1; and S1 with 't' lands in S2. Since S2 is in F, this string is formally ACCEPTED and the dash executes! Conversely, for string 't-o-t', execution terminates in state S1. Because S1 is NOT in F, the string is REJECTED and no action fires. For our NFA cheat code, acceptance requires that the active state set intersects F. Now, Arjun (1RUA24CSE0065) will explain how we optimize these machines via minimization.",
  },
  {
    id: 11,
    slideNumber: '11',
    title: 'DFA Minimization & State Equivalence',
    subtitle: 'Merging Redundant Guards via Table-Filling & Myhill-Nerode',
    player: 'Arjun (1RUA24CSE0065)',
    timing: '6:45 - 7:30',
    category: 'DFA',
    speakerNotes:
      'Thanks, Abhishek! Arjun here. In production game engines, memory and cache locality matter. DFA minimization removes duplicate behaviour: two states are equivalent if for every possible future string, they both accept or both reject. Using the table-filling algorithm and the Myhill-Nerode theorem, any finite automaton can be reduced to its unique minimal canonical DFA. Here, a 5-state patrol controller simplifies to 3 states with zero loss of game logic.',
  },
  {
    id: 12,
    slideNumber: '12',
    title: 'Level 3: Combo Recognition — Regular Expressions',
    subtitle: 'The Combo Language: Union, Concatenation, and Kleene Star',
    player: 'Arjun (1RUA24CSE0065)',
    timing: '7:30 - 8:20',
    category: 'Regex',
    speakerNotes:
      "Welcome to Level 3: Combo Mode. Special fighting game moves are regular expressions over the controller alphabet. Regular expressions use three atomic operations: Union (or), Concatenation (then), and Kleene star (repeat zero or more times). In our game, the combo is W*A: zero or more Walk frames followed by an Attack. Thompson's construction converts this regex into an epsilon-NFA, subset construction converts it to a DFA, and minimization yields the optimal 3-state combo recognizer.",
  },
  {
    id: 13,
    slideNumber: '13',
    title: 'The Wall — Why Finite Memory Is Not Enough',
    subtitle: 'The Pumping Lemma for Regular Languages: Defeating the Counting Boss',
    player: 'Arjun (1RUA24CSE0065)',
    timing: '8:20 - 9:05',
    category: 'Proof',
    speakerNotes:
      "Every computational model has theoretical boundaries. Suppose a boss mechanic requires counting: L = {a^n b^n | n >= 1}, requiring exactly n charge frames followed by n releases. Can a finite automaton recognize this? No! By the Pumping Lemma, any regular language has a pumping length p. For string s = a^p b^p, any decomposition s = xyz with |xy| <= p forces y to consist solely of 'a's. Pumping y with i = 2 produces a^(p+k) b^p, with unequal counts—a direct contradiction! Finite automata cannot count arbitrarily without a stack.",
  },
  {
    id: 14,
    slideNumber: '14',
    title: 'Game Lab Architecture & Technical Implementation',
    subtitle: 'Unified Pipeline: From DOM Input Events to Live SVG Visualizer',
    player: 'Arjun (1RUA24CSE0065)',
    timing: '9:05 - 9:45',
    category: 'Architecture',
    speakerNotes:
      'Here is our complete software architecture. DOM keyboard and button events enter the Input Processor, which dispatches symbols to our formal automata engines: DFAMachine, NFAMachine, MooreMachine, MealyMachine, and RegexComboRecognizer. The engine updates internal state, which authoritatively drives both game physics and our live SVG Automata Visualizer. Next, Chetan Nidgundi (1RUA24CSE0106) will present commercial game engine applications and our test verification matrix.',
  },
  {
    id: 15,
    slideNumber: '15',
    title: "It's Everywhere — Real-World Game Industry Applications",
    subtitle: 'From Pac-Man to Unreal Engine 5: Automata in Modern Software',
    player: 'Chetan Nidgundi (1RUA24CSE0106)',
    timing: '9:45 - 10:20',
    category: 'Overview',
    speakerNotes:
      "Thanks, Arjun! Chetan Nidgundi here. Finite automata are not just textbook exercises—they are the bedrock of the global gaming industry. Pac-Man's iconic ghost AI has run on a 3-state FSM (Chase, Scatter, Frightened) since 1980. Modern animation tools like Unity Animator and Unreal Engine 5 State Trees are direct visual implementations of the delta transition function. Street Fighter and Tekken use buffered DFA combo recognizers, and MMO chat moderation relies on regex automata.",
  },
  {
    id: 16,
    slideNumber: '16',
    title: 'Testing & Verification Matrix',
    subtitle: 'Empirical Verification of Formal Mathematical Models',
    player: 'Chetan Nidgundi (1RUA24CSE0106)',
    timing: '10:20 - 10:50',
    category: 'Matrix',
    speakerNotes:
      'To ensure academic rigor, we implemented an automated test suite verifying each machine against formal invariants. We verify total transition function completeness on our DFA, exact and noise-tolerant cheat code acceptance in our NFA, state-determined outputs in the Moore machine, transition-dependent outputs in the Mealy machine, and complete string validation on W*A. All tests execute live in-browser with zero mocked results.',
  },
  {
    id: 17,
    slideNumber: '17',
    title: 'Team Contributions & Speaking Allocations',
    subtitle: 'CIE-3 Role Matrix & Individual Deliverables · RV University',
    player: 'Chetan Nidgundi (1RUA24CSE0106)',
    timing: '10:50 - 11:20',
    category: 'Matrix',
    speakerNotes:
      'Here is our complete team breakdown. Adithya N Shenoy (1RUA24CSE0018) led project coordination, game design, and DFA implementation in Slides 3 to 6. Abhishek (1RUA24CSE0008) developed the NFA detector, Moore and Mealy machines, and string acceptance verification in Slides 7 to 10. Arjun (1RUA24CSE0065) engineered DFA minimization, regular expression combo matching, and the pumping lemma proof in Slides 11 to 14. I, Chetan Nidgundi (1RUA24CSE0106), led real-world engine analysis, automated testing, and presentation synthesis in Slides 15 to 18.',
  },
  {
    id: 18,
    slideNumber: '18',
    title: 'GAME OVER? NO — GAME ON!',
    subtitle: 'Conclusion & Invitation to the Interactive Game Lab',
    player: 'All Team Members (Led by Chetan Nidgundi)',
    timing: '11:20 - 11:45',
    category: 'Conclusion',
    speakerNotes:
      'Final screen—all four players! Chetan: from commercial engines to verified test matrices, our theory is proven. Arjun: regular expressions and the pumping lemma show both the power and limits of finite memory. Abhishek: NFA cheat codes and Moore/Mealy machines create reactive enemy behaviors. Adithya: every jump, dash, and combo runs on machines we can prove things about. Thank you for watching our CS3703 CIE-3 presentation at RV University. Now, let us play the machine in the Game Lab!',
  },
];
