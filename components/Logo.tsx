import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", light = false }) => {
  const primaryColor = light ? "#FDFBF7" : "#022c22"; // Cream or Green
  const accentColor = "#d97706"; // Gold

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Outer Shield/Compass Shape */}
      <path 
        d="M50 5 C25 5 10 25 10 45 C10 75 50 95 50 95 C50 95 90 75 90 45 C90 25 75 5 50 5 Z" 
        stroke={primaryColor} 
        strokeWidth="3"
        fill="none"
      />
      
      {/* The Mountain (Adventure) */}
      <path 
        d="M20 70 L40 40 L60 70" 
        fill={accentColor} 
        opacity="0.8"
      />
      <path 
        d="M50 70 L70 45 L90 70" 
        fill={primaryColor} 
        opacity="0.2"
      />

      {/* The Cross (Faith) - Negative space or overlay */}
      <rect x="46" y="25" width="8" height="50" rx="1" fill={primaryColor} />
      <rect x="35" y="38" width="30" height="8" rx="1" fill={primaryColor} />

      {/* Connection Nodes */}
      <circle cx="50" cy="20" r="3" fill={accentColor} />
      <circle cx="50" cy="80" r="3" fill={accentColor} />
      <circle cx="20" cy="45" r="3" fill={accentColor} />
      <circle cx="80" cy="45" r="3" fill={accentColor} />
    </svg>
  );
};

export default Logo;