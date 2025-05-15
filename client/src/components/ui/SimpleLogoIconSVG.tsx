import React from 'react';

interface SimpleLogoIconSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function SimpleLogoIconSVG({ 
  variant = 'default',
  className = ''
}: SimpleLogoIconSVGProps) {
  const colors = {
    default: {
      textColor: '#333333',
      accentColor: '#FF6B6B',
      taglineColor: '#666666'
    },
    light: {
      textColor: '#FFFFFF',
      accentColor: '#FFFFFF',
      taglineColor: '#EEEEEE'
    },
    dark: {
      textColor: '#333333',
      accentColor: '#FF6B6B',
      taglineColor: '#666666'
    }
  };

  const color = colors[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className={className}
      fill="none"
    >
      {/* Logo Text */}
      <g>
        <circle
          cx="40"
          cy="40"
          r="35"
          fill={color.accentColor}
          opacity="0.1"
        />
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={color.accentColor}
          textAnchor="middle"
          x="40"
          y="50"
        >
          PHS
        </text>
      </g>
    </svg>
  );
}