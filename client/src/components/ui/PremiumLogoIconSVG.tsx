import React from 'react';

interface PremiumLogoIconSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function PremiumLogoIconSVG({ 
  variant = 'default',
  className = ''
}: PremiumLogoIconSVGProps) {
  // Colors based on variant with bold, vibrant tones to match the main logo
  const colors = {
    default: {
      // Primary colors - bolder hues
      primaryDark: '#B02A2A',    // Bold red
      primaryMid: '#E05858',     // Vibrant pink/red
      primaryLight: '#FFC4C4',   // Light pink
      // Accent colors - richer gold
      goldDark: '#D4A017',       // Rich gold
      goldLight: '#FFDF73',      // Bright gold
      // Text colors - stronger contrast
      textDark: '#111111',       // Near black
      textLight: '#FFFFFF',      // White
      // Background
      bgColor: '#FFFFFF',        // White
      // Border and shadow
      borderColor: '#B02A2A',    // Bold red
      shadowColor: 'rgba(176, 42, 42, 0.4)'  // Bold red shadow
    },
    light: {
      // Primary colors
      primaryDark: '#FFFFFF',    // White
      primaryMid: '#F2F2F2',     // Light gray
      primaryLight: '#FFFFFF',   // White
      // Accent colors
      goldDark: '#FFD54F',       // Brighter gold for light theme
      goldLight: '#FFECB3',      // Very light gold
      // Text colors
      textDark: '#FFFFFF',       // White
      textLight: '#FFFFFF',      // White
      // Background
      bgColor: 'transparent',    // Transparent
      // Border and shadow
      borderColor: '#FFFFFF',    // White
      shadowColor: 'rgba(255, 255, 255, 0.5)'  // White shadow
    },
    dark: {
      // Primary colors - darker and richer
      primaryDark: '#D93636',    // Bright red 
      primaryMid: '#E05858',     // Vibrant pink/red
      primaryLight: '#FFC4C4',   // Light pink
      // Accent colors
      goldDark: '#D4A017',       // Rich gold
      goldLight: '#FFDF73',      // Bright gold
      // Text colors
      textDark: '#F8F8F8',       // Light gray
      textLight: '#FFFFFF',      // White
      // Background
      bgColor: '#171717',        // Dark gray
      // Border and shadow
      borderColor: '#E05858',    // Vibrant pink/red
      shadowColor: 'rgba(224, 88, 88, 0.5)'   // Pink shadow
    }
  };

  const color = colors[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className={className}
      fill="none"
    >
      {/* Define filters and gradients */}
      <defs>
        {/* Crystal/Salt gradient - more vibrant */}
        <linearGradient id="saltIconGradient" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={color.primaryLight} />
          <stop offset="50%" stopColor={color.primaryMid} />
          <stop offset="100%" stopColor={color.primaryDark} />
        </linearGradient>
        
        {/* Gold accent gradient - richer */}
        <linearGradient id="goldIconAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.goldLight} />
          <stop offset="100%" stopColor={color.goldDark} />
        </linearGradient>
        
        {/* Bold shadow effect */}
        <filter id="iconStrongShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.5" floodColor={color.shadowColor} />
        </filter>
        
        {/* Dramatic glow for crystal elements */}
        <filter id="iconDramaticGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={color.primaryMid} floodOpacity="0.6"/>
        </filter>
        
        {/* Text emboss */}
        <filter id="iconTextEmboss" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      
      {/* Bold circular background */}
      <circle 
        cx="60" 
        cy="60" 
        r="57" 
        fill={color.bgColor}
        stroke={color.borderColor}
        strokeWidth="3"
        filter="url(#iconStrongShadow)"
      />
      
      {/* Gold accent ring */}
      <circle 
        cx="60" 
        cy="60" 
        r="52" 
        fill="none"
        stroke="url(#goldIconAccent)"
        strokeWidth="2"
      />
      
      {/* Large dramatic salt crystal */}
      <g transform="translate(35, 25)" filter="url(#iconDramaticGlow)">
        {/* Main large crystal */}
        <path 
          d="M0,50 L25,0 L50,50 Z" 
          fill="url(#saltIconGradient)"
          stroke={color.primaryDark}
          strokeWidth="1"
        />
        
        {/* Light reflections - brighter */}
        <path 
          d="M15,15 L20,10 M30,15 L35,10" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        
        {/* Crystal facet highlights */}
        <path 
          d="M20,35 L25,20 L30,35 Z" 
          stroke="white"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
        />
      </g>
      
      {/* Bold PHS Text */}
      <text
        x="60"
        y="92"
        fontFamily="Arial, sans-serif"
        fontSize="28"
        fontWeight="900"
        textAnchor="middle"
        fill={color.primaryDark}
        filter="url(#iconTextEmboss)"
      >
        PHS
      </text>
      
      {/* Premium badge */}
      <g transform="translate(37, 97)">
        <rect
          x="0"
          y="0"
          width="46"
          height="13"
          rx="6.5"
          fill="url(#goldIconAccent)"
        />
        
        <text
          x="23"
          y="10"
          fontFamily="Arial, sans-serif"
          fontSize="7"
          fontWeight="bold"
          textAnchor="middle"
          fill="#FFFFFF"
        >
          PREMIUM
        </text>
      </g>
      
      {/* Decorative elements */}
      <circle 
        cx="60" 
        cy="60" 
        r="45" 
        stroke="url(#goldIconAccent)" 
        strokeWidth="0.5"
        strokeDasharray="1 3"
        fill="none"
      />
      
      {/* Small accent at top */}
      <path
        d="M45,23 C50,19 70,19 75,23"
        stroke={color.goldDark}
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Small accent at bottom */}
      <path
        d="M45,97 C50,101 70,101 75,97"
        stroke={color.goldDark}
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}