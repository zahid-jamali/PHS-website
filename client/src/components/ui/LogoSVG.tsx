import React from 'react';

interface LogoSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function LogoSVG({ 
  variant = 'default',
  className = ''
}: LogoSVGProps) {
  // Colors based on variant
  const colors = {
    default: {
      primaryStroke: '#FF6B6B',
      primaryFill: '#FFEEEE',
      crystalGradient1: '#FFCACA',
      crystalGradient2: '#FF8585',
      textColor: '#333333',
      accentColor: '#FF6B6B',
      taglineColor: '#666666',
      shadowColor: 'rgba(255, 107, 107, 0.3)'
    },
    light: {
      primaryStroke: '#FFFFFF',
      primaryFill: 'rgba(255,255,255,0.15)',
      crystalGradient1: 'rgba(255,255,255,0.9)',
      crystalGradient2: 'rgba(255,255,255,0.7)',
      textColor: '#FFFFFF',
      accentColor: '#FFB3B3',
      taglineColor: '#EEEEEE',
      shadowColor: 'rgba(255, 255, 255, 0.2)'
    },
    dark: {
      primaryStroke: '#FF5252',
      primaryFill: '#FFEEEE',
      crystalGradient1: '#FFCACA',
      crystalGradient2: '#FF8585',
      textColor: '#111111',
      accentColor: '#FF5252',
      taglineColor: '#444444',
      shadowColor: 'rgba(255, 82, 82, 0.3)'
    }
  };

  const color = colors[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 100"
      className={className}
      fill="none"
    >
      {/* Define Gradients */}
      <defs>
        <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.crystalGradient1} />
          <stop offset="100%" stopColor={color.crystalGradient2} />
        </linearGradient>
        
        {/* Shadow filter */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color.shadowColor} />
        </filter>
      </defs>
      
      {/* Background Glow */}
      <ellipse 
        cx="40" 
        cy="40" 
        rx="35" 
        ry="30" 
        fill={color.shadowColor} 
        filter="blur(15px)"
        transform="translate(20, 10)"
      />
      
      {/* Salt Crystal Shape */}
      <g transform="translate(20, 10)" filter="url(#shadow)">
        {/* Main Crystal */}
        <path
          d="M40 8L8 30V80H72V30L40 8Z"
          stroke={color.primaryStroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#crystalGradient)"
        />
        
        {/* Crystal Facets */}
        <path
          d="M30 45L40 55L50 45L40 35L30 45Z"
          fill={color.primaryStroke}
          stroke={color.primaryStroke}
          strokeWidth="1"
        />
        <path
          d="M25 58L35 68L45 58L35 48L25 58Z"
          fill={color.primaryStroke}
          stroke={color.primaryStroke}
          strokeWidth="1"
          opacity={variant === 'light' ? "0.8" : "1"}
        />
        <path
          d="M45 60L55 70L65 60L55 50L45 60Z"
          fill={color.primaryStroke}
          stroke={color.primaryStroke}
          strokeWidth="1"
          opacity={variant === 'light' ? "0.6" : "1"}
        />
        
        {/* Light Reflections */}
        <path
          d="M20 30L30 40"
          stroke={variant === 'light' ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.9)"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M60 35L50 45"
          stroke={variant === 'light' ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.9)"}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Logo Text */}
      <g transform="translate(105, 45)" filter="url(#shadow)">
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="800"
          fontSize="28"
          fill={color.textColor}
          letterSpacing="0.5"
        >
          Dr. Abdul <tspan fill={color.accentColor}>PHS</tspan>
        </text>
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="500"
          fontSize="13"
          fill={color.taglineColor}
          y="22"
          letterSpacing="0.5"
        >
          Premium Pink Himalayan Salt
        </text>
      </g>
    </svg>
  );
}