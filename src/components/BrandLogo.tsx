import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number | string;
  withBackground?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = "w-10 h-10", 
  size,
  withBackground = true 
}) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Eduardo Contreras Logo <E/>"
    >
      {withBackground && (
        <rect width="100" height="100" rx="22" fill="#080809" stroke="#1d1e26" strokeWidth="2" />
      )}
      {/* Left Bracket < in Volt Neon */}
      <path 
        d="M28 32 L16 50 L28 68" 
        stroke="#D2F532" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Central E in Pure White */}
      <path 
        d="M38 34 H60 M38 50 H54 M38 66 H60 M38 34 V66" 
        stroke="#FFFFFF" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Right Slash / in Volt Neon */}
      <path 
        d="M72 32 L84 68" 
        stroke="#D2F532" 
        strokeWidth="11" 
        strokeLinecap="round" 
      />
    </svg>
  );
};
