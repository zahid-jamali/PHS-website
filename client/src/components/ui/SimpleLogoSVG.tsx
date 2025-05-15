import React from 'react';

interface SimpleLogoSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function SimpleLogoSVG({ 
  variant = 'default',
  className = ''
}: SimpleLogoSVGProps) {
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
      viewBox="0 0 240 80"
      className={className}
      fill="none"
    >
      {/* Logo Text */}
      <g>
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={color.textColor}
          x="10"
          y="45"
        >
          Dr. Abdul <tspan fill={color.accentColor}>PHS</tspan>
        </text>
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="400"
          fontSize="16"
          fill={color.taglineColor}
          x="10"
          y="65"
        >
          Premium Pink Himalayan Salt
        </text>
      </g>
    </svg>
  );
}