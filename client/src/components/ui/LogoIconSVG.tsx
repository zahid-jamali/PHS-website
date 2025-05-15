import React from 'react';

interface LogoIconSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function LogoIconSVG({ 
  variant = 'default',
  className = ''
}: LogoIconSVGProps) {
  // Colors based on variant
  const colors = {
    default: {
      primaryStroke: '#FF6B6B',
      primaryFill: '#FFEEEE',
      crystalGradient1: '#FFCACA',
      crystalGradient2: '#FF8585',
      textColor: '#FF6B6B',
      shadowColor: 'rgba(255, 107, 107, 0.3)'
    },
    light: {
      primaryStroke: '#FFFFFF',
      primaryFill: 'rgba(255,255,255,0.15)',
      crystalGradient1: 'rgba(255,255,255,0.9)',
      crystalGradient2: 'rgba(255,255,255,0.7)',
      textColor: '#FFFFFF',
      shadowColor: 'rgba(255, 255, 255, 0.2)'
    },
    dark: {
      primaryStroke: '#FF5252',
      primaryFill: '#FFEEEE',
      crystalGradient1: '#FFCACA',
      crystalGradient2: '#FF8585',
      textColor: '#FF5252',
      shadowColor: 'rgba(255, 82, 82, 0.3)'
    }
  };

  const color = colors[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
    >
      {/* Define Gradients */}
      <defs>
        <linearGradient id="crystalGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.crystalGradient1} />
          <stop offset="100%" stopColor={color.crystalGradient2} />
        </linearGradient>
        
        {/* Shadow filter */}
        <filter id="shadowIcon" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={color.shadowColor} />
        </filter>
      </defs>
      
      {/* Background Glow */}
      <ellipse 
        cx="50" 
        cy="45" 
        rx="40" 
        ry="35" 
        fill={color.shadowColor} 
        filter="blur(15px)"
      />
      
      {/* Salt Crystal Shape */}
      <g transform="translate(15, 10)" filter="url(#shadowIcon)">
        <path
          d="M40 10L10 30V75H70V30L40 10Z"
          stroke={color.primaryStroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#crystalGradientIcon)"
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

      {/* Text PHS */}
      <text
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="18"
        fill={color.textColor}
        textAnchor="middle"
        x="50"
        y="95"
        filter="url(#shadowIcon)"
        letterSpacing="0.5"
      >
        PHS
      </text>
    </svg>
  );
}