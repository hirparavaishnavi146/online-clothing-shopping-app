interface FashionShakeLogoProps {
  className?: string;
  animated?: boolean;
}

export function FashionShakeLogo({ className = 'w-12 h-12', animated = false }: FashionShakeLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        {animated && (
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        )}
      </defs>

      {/* Outer circle/border */}
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="url(#logoGradient)"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />

      {/* Merged F+S Logo */}
      <g transform="translate(20, 20)" filter={animated ? 'url(#glow)' : undefined}>
        {/* The "F" letter - left side */}
        <path
          d="M 5 10 L 5 50 M 5 10 L 30 10 M 5 28 L 25 28"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* The merged middle section - where F and S connect */}
        <path
          d="M 25 10 Q 35 15, 35 25 Q 35 32, 30 35 Q 35 38, 35 45 Q 35 55, 25 60"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* The "S" letter - right side completing the S curve */}
        <path
          d="M 35 25 L 50 25 M 30 35 L 50 35 M 35 45 L 50 45"
          stroke="url(#logoGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Decorative sparkles */}
      <circle cx="75" cy="25" r="2" fill="url(#logoGradient)" opacity="0.8">
        {animated && (
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <circle cx="85" cy="35" r="1.5" fill="url(#logoGradient)" opacity="0.6">
        {animated && (
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2.5s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <circle cx="80" cy="75" r="2" fill="url(#logoGradient)" opacity="0.8">
        {animated && (
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="1.8s"
            repeatCount="indefinite"
          />
        )}
      </circle>
      <circle cx="20" cy="75" r="1.5" fill="url(#logoGradient)" opacity="0.6">
        {animated && (
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2.2s"
            repeatCount="indefinite"
          />
        )}
      </circle>
    </svg>
  );
}
