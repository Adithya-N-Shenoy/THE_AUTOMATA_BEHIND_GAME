import React from 'react';
import { motion } from 'motion/react';

interface AutomataDiagramProps {
  type: 'DFA' | 'NFA' | 'MOORE' | 'MEALY' | 'REGEX';
  activeStates: string[]; // Can be single state or subset
  lastTransition?: { from?: string; symbol?: string; to?: string };
  interactive?: boolean;
  onStateClick?: (state: string) => void;
  className?: string;
}

export const AutomataDiagramSVG: React.FC<AutomataDiagramProps> = ({
  type,
  activeStates,
  lastTransition,
  interactive = false,
  onStateClick,
  className = '',
}) => {
  // Arrowhead marker definitions for crisp directional indicators
  const renderDefs = () => (
    <defs>
      <marker
        id="arrow-green"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#00FF9C" />
      </marker>
      <marker
        id="arrow-pink"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#FF2E88" />
      </marker>
      <marker
        id="arrow-blue"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#38BDF8" />
      </marker>
      <marker
        id="arrow-muted"
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#8FA3B8" />
      </marker>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );

  // 1. DFA (Double-Tap Dash)
  if (type === 'DFA') {
    const isS0 = activeStates.includes('S0');
    const isS1 = activeStates.includes('S1');
    const isS2 = activeStates.includes('S2');

    return (
      <div className={`relative w-full overflow-hidden rounded-xl bg-[#0A0E1A]/80 border border-[#00FF9C]/20 p-4 ${className}`}>
        <div className="flex items-center justify-between text-xs text-[#8FA3B8] font-mono mb-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
            DFA: Double-Tap Recognizer · M = (Q, Σ, δ, q₀, F)
          </span>
          <span className="text-[#00FF9C]">
            Active: <strong className="text-white">{activeStates.join(', ') || 'None'}</strong>
          </span>
        </div>

        <svg viewBox="0 0 740 260" className="w-full h-auto select-none">
          {renderDefs()}

          {/* Start Arrow into S0 */}
          <path d="M 30 130 L 75 130" stroke="#00FF9C" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <text x="35" y="120" fill="#00FF9C" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold">START</text>

          {/* S0 Self-loop for 'o' */}
          <path d="M 100 95 C 70 30, 150 30, 120 95" fill="none" stroke="#8FA3B8" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-muted)" />
          <rect x="96" y="22" width="28" height="18" rx="4" fill="#10182B" stroke="#8FA3B8" strokeWidth="1" />
          <text x="110" y="35" fill="#8FA3B8" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">o</text>

          {/* S0 -> S1 (on 't') */}
          <path
            d="M 145 120 C 220 90, 280 90, 355 120"
            fill="none"
            stroke={lastTransition?.symbol === 't' && isS1 ? '#00FF9C' : '#8FA3B8'}
            strokeWidth={lastTransition?.symbol === 't' && isS1 ? '3' : '2'}
            markerEnd={lastTransition?.symbol === 't' && isS1 ? 'url(#arrow-green)' : 'url(#arrow-muted)'}
          />
          <rect x="240" y="86" width="28" height="18" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
          <text x="254" y="99" fill="#00FF9C" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">t</text>

          {/* S1 -> S0 (on 'o') */}
          <path
            d="M 355 140 C 280 170, 220 170, 145 140"
            fill="none"
            stroke={lastTransition?.symbol === 'o' && isS0 ? '#FF2E88' : '#8FA3B8'}
            strokeWidth={lastTransition?.symbol === 'o' && isS0 ? '3' : '2'}
            strokeDasharray="4 2"
            markerEnd={lastTransition?.symbol === 'o' && isS0 ? 'url(#arrow-pink)' : 'url(#arrow-muted)'}
          />
          <rect x="240" y="152" width="28" height="18" rx="4" fill="#10182B" stroke="#FF2E88" strokeWidth="1" />
          <text x="254" y="165" fill="#FF2E88" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">o</text>

          {/* S1 -> S2 (on 't') */}
          <path
            d="M 425 120 C 500 90, 560 90, 635 120"
            fill="none"
            stroke={lastTransition?.symbol === 't' && isS2 ? '#00FF9C' : '#8FA3B8'}
            strokeWidth={lastTransition?.symbol === 't' && isS2 ? '3.5' : '2'}
            markerEnd={lastTransition?.symbol === 't' && isS2 ? 'url(#arrow-green)' : 'url(#arrow-muted)'}
          />
          <rect x="520" y="86" width="28" height="18" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
          <text x="534" y="99" fill="#00FF9C" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">t</text>

          {/* S2 -> S0 (on 'o' reset) */}
          <path
            d="M 645 160 C 520 250, 240 250, 125 160"
            fill="none"
            stroke={lastTransition?.symbol === 'o' && isS0 ? '#FF2E88' : '#8FA3B8'}
            strokeWidth="1.8"
            strokeDasharray="5 3"
            markerEnd={lastTransition?.symbol === 'o' && isS0 ? 'url(#arrow-pink)' : 'url(#arrow-muted)'}
          />
          <rect x="375" y="222" width="45" height="18" rx="4" fill="#10182B" stroke="#FF2E88" strokeWidth="1" />
          <text x="397" y="235" fill="#FF2E88" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">o (reset)</text>

          {/* S2 Self-loop on 't' */}
          <path d="M 665 95 C 635 30, 715 30, 685 95" fill="none" stroke="#00FF9C" strokeWidth="2" markerEnd="url(#arrow-green)" />
          <rect x="661" y="22" width="28" height="18" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
          <text x="675" y="35" fill="#00FF9C" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">t</text>

          {/* NODE S0 */}
          <g
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => onStateClick?.('S0')}
            filter={isS0 ? 'url(#glow)' : undefined}
          >
            <circle
              cx="110"
              cy="130"
              r="34"
              fill={isS0 ? '#00FF9C22' : '#10182B'}
              stroke={isS0 ? '#00FF9C' : '#8FA3B8'}
              strokeWidth={isS0 ? '3.5' : '2'}
            />
            <text x="110" y="135" fill={isS0 ? '#00FF9C' : '#E8F1F2'} fontSize="16" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
              S0
            </text>
            <text x="110" y="180" fill="#8FA3B8" fontSize="11" fontFamily="Chakra Petch" textAnchor="middle">
              IDLE
            </text>
          </g>

          {/* NODE S1 */}
          <g
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => onStateClick?.('S1')}
            filter={isS1 ? 'url(#glow)' : undefined}
          >
            <circle
              cx="390"
              cy="130"
              r="34"
              fill={isS1 ? '#38BDF822' : '#10182B'}
              stroke={isS1 ? '#38BDF8' : '#8FA3B8'}
              strokeWidth={isS1 ? '3.5' : '2'}
            />
            <text x="390" y="135" fill={isS1 ? '#38BDF8' : '#E8F1F2'} fontSize="16" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
              S1
            </text>
            <text x="390" y="180" fill="#8FA3B8" fontSize="11" fontFamily="Chakra Petch" textAnchor="middle">
              TAP 1
            </text>
          </g>

          {/* NODE S2 (ACCEPTING - DOUBLE CIRCLE) */}
          <g
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => onStateClick?.('S2')}
            filter={isS2 ? 'url(#glow)' : undefined}
          >
            {/* Outer accepting ring */}
            <circle
              cx="670"
              cy="130"
              r="38"
              fill="none"
              stroke={isS2 ? '#FF2E88' : '#FF2E8899'}
              strokeWidth={isS2 ? '3.5' : '2'}
            />
            {/* Inner circle */}
            <circle
              cx="670"
              cy="130"
              r="30"
              fill={isS2 ? '#FF2E8833' : '#10182B'}
              stroke={isS2 ? '#FF2E88' : '#FF2E8899'}
              strokeWidth="2"
            />
            <text x="670" y="135" fill={isS2 ? '#FF2E88' : '#E8F1F2'} fontSize="16" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">
              S2
            </text>
            <text x="670" y="186" fill="#FF2E88" fontSize="12" fontFamily="Chakra Petch" fontWeight="bold" textAnchor="middle">
              ★ DASH!
            </text>
          </g>
        </svg>

        <div className="mt-2 text-center text-xs text-[#8FA3B8]">
          Language Recognized: <span className="font-mono text-[#00FF9C]">L = &#123; w ∈ &#123;t, o&#125;* | w ends with &quot;tt&quot; &#125;</span>
        </div>
      </div>
    );
  }

  // 2. NFA (Cheat Code Detector: UP UP DOWN DOWN)
  if (type === 'NFA') {
    const isS = activeStates.includes('s');
    const isC1 = activeStates.includes('c1');
    const isC2 = activeStates.includes('c2');
    const isC3 = activeStates.includes('c3');
    const isAccept = activeStates.includes('accept');

    return (
      <div className={`relative w-full overflow-hidden rounded-xl bg-[#0A0E1A]/80 border border-[#FF2E88]/20 p-4 ${className}`}>
        <div className="flex items-center justify-between text-xs text-[#8FA3B8] font-mono mb-2">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF2E88] animate-pulse" />
            NFA: Cheat Code Sequence (UP UP DOWN DOWN)
          </span>
          <span className="text-[#FF2E88]">
            Active Subset: <strong className="text-white">&#123;{activeStates.join(', ') || '∅'}&#125;</strong>
          </span>
        </div>

        <svg viewBox="0 0 780 260" className="w-full h-auto select-none">
          {renderDefs()}

          {/* Start arrow into scanner s */}
          <path d="M 20 130 L 60 130" stroke="#FF2E88" strokeWidth="2.5" markerEnd="url(#arrow-pink)" />
          <text x="22" y="120" fill="#FF2E88" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">START</text>

          {/* Scanner s self-loop on ANY input */}
          <path d="M 80 95 C 45 25, 145 25, 110 95" fill="none" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow-blue)" />
          <rect x="75" y="18" width="45" height="18" rx="4" fill="#10182B" stroke="#38BDF8" strokeWidth="1" />
          <text x="97" y="31" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">ANY (Σ)</text>

          {/* s -> c1 on UP (NONDETERMINISTIC BRANCH!) */}
          <path
            d="M 125 120 C 175 80, 205 80, 255 120"
            fill="none"
            stroke={isC1 ? '#00FF9C' : '#FF2E88'}
            strokeWidth={isC1 ? '3' : '2'}
            strokeDasharray="4 2"
            markerEnd={isC1 ? 'url(#arrow-green)' : 'url(#arrow-pink)'}
          />
          <rect x="180" y="80" width="30" height="18" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
          <text x="195" y="93" fill="#00FF9C" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">UP</text>

          {/* c1 -> c2 on UP */}
          <path
            d="M 315 130 L 375 130"
            fill="none"
            stroke={isC2 ? '#00FF9C' : '#8FA3B8'}
            strokeWidth={isC2 ? '3' : '2'}
            markerEnd={isC2 ? 'url(#arrow-green)' : 'url(#arrow-muted)'}
          />
          <rect x="333" y="112" width="30" height="18" rx="4" fill="#10182B" stroke="#8FA3B8" strokeWidth="1" />
          <text x="348" y="125" fill="#E8F1F2" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">UP</text>

          {/* c2 -> c3 on DOWN */}
          <path
            d="M 435 130 L 495 130"
            fill="none"
            stroke={isC3 ? '#00FF9C' : '#8FA3B8'}
            strokeWidth={isC3 ? '3' : '2'}
            markerEnd={isC3 ? 'url(#arrow-green)' : 'url(#arrow-muted)'}
          />
          <rect x="447" y="112" width="36" height="18" rx="4" fill="#10182B" stroke="#8FA3B8" strokeWidth="1" />
          <text x="465" y="125" fill="#E8F1F2" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">DOWN</text>

          {/* c3 -> accept on DOWN */}
          <path
            d="M 555 130 L 635 130"
            fill="none"
            stroke={isAccept ? '#00FF9C' : '#8FA3B8'}
            strokeWidth={isAccept ? '3.5' : '2'}
            markerEnd={isAccept ? 'url(#arrow-green)' : 'url(#arrow-muted)'}
          />
          <rect x="578" y="112" width="36" height="18" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
          <text x="596" y="125" fill="#00FF9C" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">DOWN</text>

          {/* Accept Self loop on ANY */}
          <path d="M 680 95 C 650 25, 740 25, 710 95" fill="none" stroke="#00FF9C" strokeWidth="2" markerEnd="url(#arrow-green)" />
          <rect x="675" y="18" width="45" height="18" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
          <text x="697" y="31" fill="#00FF9C" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">ANY (Σ)</text>

          {/* NODE s (Scanner) */}
          <g filter={isS ? 'url(#glow)' : undefined}>
            <circle cx="95" cy="130" r="30" fill={isS ? '#38BDF822' : '#10182B'} stroke={isS ? '#38BDF8' : '#8FA3B8'} strokeWidth={isS ? '3.5' : '2'} />
            <text x="95" y="135" fill={isS ? '#38BDF8' : '#E8F1F2'} fontSize="15" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">s</text>
            <text x="95" y="175" fill="#38BDF8" fontSize="10" fontFamily="Chakra Petch" textAnchor="middle">SCANNER</text>
          </g>

          {/* NODE c1 */}
          <g filter={isC1 ? 'url(#glow)' : undefined}>
            <circle cx="285" cy="130" r="28" fill={isC1 ? '#00FF9C22' : '#10182B'} stroke={isC1 ? '#00FF9C' : '#8FA3B8'} strokeWidth={isC1 ? '3.5' : '2'} />
            <text x="285" y="135" fill={isC1 ? '#00FF9C' : '#E8F1F2'} fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">c1</text>
            <text x="285" y="175" fill="#8FA3B8" fontSize="10" fontFamily="Chakra Petch" textAnchor="middle">UP</text>
          </g>

          {/* NODE c2 */}
          <g filter={isC2 ? 'url(#glow)' : undefined}>
            <circle cx="405" cy="130" r="28" fill={isC2 ? '#00FF9C22' : '#10182B'} stroke={isC2 ? '#00FF9C' : '#8FA3B8'} strokeWidth={isC2 ? '3.5' : '2'} />
            <text x="405" y="135" fill={isC2 ? '#00FF9C' : '#E8F1F2'} fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">c2</text>
            <text x="405" y="175" fill="#8FA3B8" fontSize="10" fontFamily="Chakra Petch" textAnchor="middle">UP UP</text>
          </g>

          {/* NODE c3 */}
          <g filter={isC3 ? 'url(#glow)' : undefined}>
            <circle cx="525" cy="130" r="28" fill={isC3 ? '#00FF9C22' : '#10182B'} stroke={isC3 ? '#00FF9C' : '#8FA3B8'} strokeWidth={isC3 ? '3.5' : '2'} />
            <text x="525" y="135" fill={isC3 ? '#00FF9C' : '#E8F1F2'} fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">c3</text>
            <text x="525" y="175" fill="#8FA3B8" fontSize="10" fontFamily="Chakra Petch" textAnchor="middle">UP UP DN</text>
          </g>

          {/* NODE accept (DOUBLE CIRCLE) */}
          <g filter={isAccept ? 'url(#glow)' : undefined}>
            <circle cx="695" cy="130" r="36" fill="none" stroke={isAccept ? '#FF2E88' : '#FF2E8888'} strokeWidth={isAccept ? '3.5' : '2'} />
            <circle cx="695" cy="130" r="28" fill={isAccept ? '#FF2E8833' : '#10182B'} stroke={isAccept ? '#FF2E88' : '#FF2E8888'} strokeWidth="2" />
            <text x="695" y="135" fill={isAccept ? '#FF2E88' : '#E8F1F2'} fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">HIT</text>
            <text x="695" y="180" fill="#FF2E88" fontSize="11" fontFamily="Chakra Petch" fontWeight="bold" textAnchor="middle">UNLOCKED</text>
          </g>
        </svg>

        <div className="mt-2 text-center text-xs text-[#8FA3B8]">
          Language Recognized: <span className="font-mono text-[#FF2E88]">L = &#123; w ∈ Σ* | w contains substring &quot;UP UP DOWN DOWN&quot; &#125;</span>
        </div>
      </div>
    );
  }

  // 3. MOORE MACHINE (Boss Health)
  if (type === 'MOORE') {
    const isHealthy = activeStates.includes('HEALTHY');
    const isInjured = activeStates.includes('INJURED');
    const isCritical = activeStates.includes('CRITICAL');
    const isDefeated = activeStates.includes('DEFEATED');

    return (
      <div className={`relative w-full overflow-hidden rounded-xl bg-[#0A0E1A]/80 border border-[#00FF9C]/20 p-4 ${className}`}>
        <div className="flex items-center justify-between text-xs text-[#8FA3B8] font-mono mb-2">
          <span>MOORE MACHINE: Output depends strictly on STATE — λ(q)</span>
          <span className="text-[#00FF9C]">Active State: <strong className="text-white">{activeStates[0] || 'HEALTHY'}</strong></span>
        </div>

        <svg viewBox="0 0 740 220" className="w-full h-auto select-none">
          {renderDefs()}

          {/* HEALTHY -> INJURED on hit */}
          <path d="M 155 100 L 255 100" stroke="#FF2E88" strokeWidth="2" markerEnd="url(#arrow-pink)" />
          <text x="205" y="90" fill="#FF2E88" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">hit</text>

          {/* INJURED -> HEALTHY on heal */}
          <path d="M 255 125 L 155 125" stroke="#00FF9C" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-green)" />
          <text x="205" y="145" fill="#00FF9C" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">heal</text>

          {/* INJURED -> CRITICAL on hit */}
          <path d="M 335 100 L 435 100" stroke="#FF2E88" strokeWidth="2" markerEnd="url(#arrow-pink)" />
          <text x="385" y="90" fill="#FF2E88" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">hit</text>

          {/* CRITICAL -> INJURED on heal */}
          <path d="M 435 125 L 335 125" stroke="#00FF9C" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-green)" />
          <text x="385" y="145" fill="#00FF9C" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">heal</text>

          {/* CRITICAL -> DEFEATED on hit */}
          <path d="M 515 110 L 605 110" stroke="#FF2E88" strokeWidth="2.5" markerEnd="url(#arrow-pink)" />
          <text x="560" y="100" fill="#FF2E88" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">hit (final)</text>

          {/* State 1: HEALTHY / GREEN */}
          <g filter={isHealthy ? 'url(#glow)' : undefined}>
            <circle cx="110" cy="110" r="42" fill={isHealthy ? '#00FF9C22' : '#10182B'} stroke={isHealthy ? '#00FF9C' : '#8FA3B8'} strokeWidth={isHealthy ? '3.5' : '2'} />
            <line x1="72" y1="110" x2="148" y2="110" stroke="#00FF9C" strokeWidth="1" strokeDasharray="2 2" />
            <text x="110" y="98" fill="#E8F1F2" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">HEALTHY</text>
            <text x="110" y="128" fill="#00FF9C" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">GREEN</text>
          </g>

          {/* State 2: INJURED / AMBER */}
          <g filter={isInjured ? 'url(#glow)' : undefined}>
            <circle cx="295" cy="110" r="42" fill={isInjured ? '#F5A62322' : '#10182B'} stroke={isInjured ? '#F5A623' : '#8FA3B8'} strokeWidth={isInjured ? '3.5' : '2'} />
            <line x1="257" y1="110" x2="333" y2="110" stroke="#F5A623" strokeWidth="1" strokeDasharray="2 2" />
            <text x="295" y="98" fill="#E8F1F2" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">INJURED</text>
            <text x="295" y="128" fill="#F5A623" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">AMBER</text>
          </g>

          {/* State 3: CRITICAL / RED */}
          <g filter={isCritical ? 'url(#glow)' : undefined}>
            <circle cx="475" cy="110" r="42" fill={isCritical ? '#FF2E8822' : '#10182B'} stroke={isCritical ? '#FF2E88' : '#8FA3B8'} strokeWidth={isCritical ? '3.5' : '2'} />
            <line x1="437" y1="110" x2="513" y2="110" stroke="#FF2E88" strokeWidth="1" strokeDasharray="2 2" />
            <text x="475" y="98" fill="#E8F1F2" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">CRITICAL</text>
            <text x="475" y="128" fill="#FF2E88" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">RED</text>
          </g>

          {/* State 4: DEFEATED / BLACK */}
          <g filter={isDefeated ? 'url(#glow)' : undefined}>
            <circle cx="650" cy="110" r="38" fill={isDefeated ? '#000000' : '#10182B'} stroke={isDefeated ? '#8FA3B8' : '#8FA3B866'} strokeWidth={isDefeated ? '3' : '2'} />
            <line x1="616" y1="110" x2="684" y2="110" stroke="#8FA3B8" strokeWidth="1" strokeDasharray="2 2" />
            <text x="650" y="98" fill="#E8F1F2" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">DEFEATED</text>
            <text x="650" y="128" fill="#8FA3B8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">BLACK</text>
          </g>
        </svg>

        <div className="mt-1 text-center text-xs text-[#8FA3B8]">
          Node format: <span className="font-mono text-white">State / Output</span>. Output color reflects the boss's HP bracket directly.
        </div>
      </div>
    );
  }

  // 4. MEALY MACHINE (Hit Sparks)
  if (type === 'MEALY') {
    const isReady = activeStates.includes('READY');
    const isCooldown = activeStates.includes('COOLDOWN');
    const isShielded = activeStates.includes('SHIELDED');

    return (
      <div className={`relative w-full overflow-hidden rounded-xl bg-[#0A0E1A]/80 border border-[#38BDF8]/20 p-4 ${className}`}>
        <div className="flex items-center justify-between text-xs text-[#8FA3B8] font-mono mb-2">
          <span>MEALY MACHINE: Output on TRANSITION — λ(q, a)</span>
          <span className="text-[#38BDF8]">Current State: <strong className="text-white">{activeStates[0] || 'READY'}</strong></span>
        </div>

        <svg viewBox="0 0 740 240" className="w-full h-auto select-none">
          {renderDefs()}

          {/* READY -> COOLDOWN on attack / SPARK */}
          <path d="M 235 90 C 330 40, 410 40, 505 90" fill="none" stroke="#00FF9C" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
          <rect x="300" y="32" width="140" height="20" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
          <text x="370" y="46" fill="#00FF9C" fontSize="10.5" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">attack / ⚡ SPARK (25)</text>

          {/* COOLDOWN -> READY on tick / RECHARGED */}
          <path d="M 505 130 C 410 180, 330 180, 235 130" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-blue)" />
          <rect x="305" y="166" width="130" height="20" rx="4" fill="#10182B" stroke="#38BDF8" strokeWidth="1" />
          <text x="370" y="180" fill="#38BDF8" fontSize="10.5" fontFamily="JetBrains Mono" textAnchor="middle">tick / 🔄 Recharged (0)</text>

          {/* COOLDOWN Self-loop on attack / GLANCE */}
          <path d="M 570 85 C 630 35, 630 165, 570 125" fill="none" stroke="#F5A623" strokeWidth="2" markerEnd="url(#arrow-muted)" />
          <rect x="600" y="90" width="130" height="20" rx="4" fill="#10182B" stroke="#F5A623" strokeWidth="1" />
          <text x="665" y="104" fill="#F5A623" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">attack / 💨 GLANCE (10)</text>

          {/* READY -> SHIELDED on defend / GUARD */}
          <path d="M 160 145 C 130 190, 80 190, 60 145" fill="none" stroke="#8FA3B8" strokeWidth="1.8" markerEnd="url(#arrow-muted)" />
          <rect x="40" y="185" width="115" height="20" rx="4" fill="#10182B" stroke="#8FA3B8" strokeWidth="1" />
          <text x="97" y="199" fill="#8FA3B8" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">defend / 🛡️ Guard (0)</text>

          {/* Node 1: READY */}
          <g filter={isReady ? 'url(#glow)' : undefined}>
            <circle cx="195" cy="110" r="42" fill={isReady ? '#00FF9C22' : '#10182B'} stroke={isReady ? '#00FF9C' : '#8FA3B8'} strokeWidth={isReady ? '3.5' : '2'} />
            <text x="195" y="115" fill={isReady ? '#00FF9C' : '#E8F1F2'} fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">READY</text>
          </g>

          {/* Node 2: COOLDOWN */}
          <g filter={isCooldown ? 'url(#glow)' : undefined}>
            <circle cx="545" cy="110" r="42" fill={isCooldown ? '#F5A62322' : '#10182B'} stroke={isCooldown ? '#F5A623' : '#8FA3B8'} strokeWidth={isCooldown ? '3.5' : '2'} />
            <text x="545" y="115" fill={isCooldown ? '#F5A623' : '#E8F1F2'} fontSize="13" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">COOLDOWN</text>
          </g>
        </svg>

        <div className="mt-1 text-center text-xs text-[#8FA3B8]">
          Transition label format: <span className="font-mono text-white">Input / Output (Damage)</span>. Same input &quot;attack&quot; produces different outputs in different states.
        </div>
      </div>
    );
  }

  // 5. REGEX COMBO (W*A Recognizer)
  const isQ0 = activeStates.includes('q0');
  const isQ1 = activeStates.includes('q1');
  const isTrap = activeStates.includes('trap');

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-[#0A0E1A]/80 border border-[#F5A623]/20 p-4 ${className}`}>
      <div className="flex items-center justify-between text-xs text-[#8FA3B8] font-mono mb-2">
        <span>REGEX: W*A Pipeline Automaton (Zero or more Walk, then Attack)</span>
        <span className="text-[#F5A623]">Active State: <strong className="text-white">{activeStates[0] || 'q0'}</strong></span>
      </div>

      <svg viewBox="0 0 740 220" className="w-full h-auto select-none">
        {renderDefs()}

        {/* Start into q0 */}
        <path d="M 40 110 L 95 110" stroke="#F5A623" strokeWidth="2.5" markerEnd="url(#arrow-muted)" />
        <text x="45" y="100" fill="#F5A623" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">START</text>

        {/* q0 Self-loop on 'W' (Kleene Star W*) */}
        <path d="M 125 75 C 95 15, 175 15, 145 75" fill="none" stroke="#38BDF8" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
        <rect x="121" y="8" width="28" height="18" rx="4" fill="#10182B" stroke="#38BDF8" strokeWidth="1" />
        <text x="135" y="21" fill="#38BDF8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">W</text>

        {/* q0 -> q1 on 'A' */}
        <path d="M 180 110 L 375 110" stroke={isQ1 ? '#00FF9C' : '#8FA3B8'} strokeWidth={isQ1 ? '3.5' : '2'} markerEnd={isQ1 ? 'url(#arrow-green)' : 'url(#arrow-muted)'} />
        <rect x="265" y="92" width="28" height="18" rx="4" fill="#10182B" stroke="#00FF9C" strokeWidth="1" />
        <text x="279" y="105" fill="#00FF9C" fontSize="12" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">A</text>

        {/* q1 -> trap on any further input */}
        <path d="M 460 110 L 595 110" stroke="#FF2E88" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#arrow-pink)" />
        <rect x="505" y="92" width="45" height="18" rx="4" fill="#10182B" stroke="#FF2E88" strokeWidth="1" />
        <text x="527" y="105" fill="#FF2E88" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">W, A (fail)</text>

        {/* Trap self-loop */}
        <path d="M 640 75 C 610 15, 690 15, 660 75" fill="none" stroke="#FF2E88" strokeWidth="1.8" markerEnd="url(#arrow-pink)" />
        <rect x="635" y="8" width="30" height="18" rx="4" fill="#10182B" stroke="#FF2E88" strokeWidth="1" />
        <text x="650" y="21" fill="#FF2E88" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">ANY</text>

        {/* Node q0 (Start) */}
        <g filter={isQ0 ? 'url(#glow)' : undefined}>
          <circle cx="135" cy="110" r="38" fill={isQ0 ? '#38BDF822' : '#10182B'} stroke={isQ0 ? '#38BDF8' : '#8FA3B8'} strokeWidth={isQ0 ? '3.5' : '2'} />
          <text x="135" y="115" fill={isQ0 ? '#38BDF8' : '#E8F1F2'} fontSize="15" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">q₀</text>
          <text x="135" y="165" fill="#8FA3B8" fontSize="10" fontFamily="Chakra Petch" textAnchor="middle">W* BUFFER</text>
        </g>

        {/* Node q1 (ACCEPTING - DOUBLE CIRCLE) */}
        <g filter={isQ1 ? 'url(#glow)' : undefined}>
          <circle cx="420" cy="110" r="42" fill="none" stroke={isQ1 ? '#00FF9C' : '#00FF9C88'} strokeWidth={isQ1 ? '3.5' : '2'} />
          <circle cx="420" cy="110" r="34" fill={isQ1 ? '#00FF9C33' : '#10182B'} stroke={isQ1 ? '#00FF9C' : '#00FF9C88'} strokeWidth="2" />
          <text x="420" y="115" fill={isQ1 ? '#00FF9C' : '#E8F1F2'} fontSize="15" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">q₁</text>
          <text x="420" y="170" fill="#00FF9C" fontSize="11" fontFamily="Chakra Petch" fontWeight="bold" textAnchor="middle">★ COMBO HIT!</text>
        </g>

        {/* Node trap (DEAD SINK) */}
        <g filter={isTrap ? 'url(#glow)' : undefined}>
          <circle cx="650" cy="110" r="34" fill={isTrap ? '#FF2E8822' : '#10182B'} stroke={isTrap ? '#FF2E88' : '#8FA3B8'} strokeWidth={isTrap ? '3' : '2'} strokeDasharray="3 2" />
          <text x="650" y="115" fill={isTrap ? '#FF2E88' : '#8FA3B8'} fontSize="13" fontFamily="JetBrains Mono" textAnchor="middle">trap</text>
          <text x="650" y="165" fill="#FF2E88" fontSize="10" fontFamily="Chakra Petch" textAnchor="middle">REJECT SINK</text>
        </g>
      </svg>
    </div>
  );
};
