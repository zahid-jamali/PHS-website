import React from 'react';

interface PremiumLogoSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function PremiumLogoSVG({ 
  variant = 'default',
  className = ''
}: PremiumLogoSVGProps) {
  // Colors based on variant with bold, vibrant tones
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
      viewBox="0 0 380 120"
      className={className}
      fill="none"
    >
      {/* Define filters and gradients */}
      <defs>
        {/* Crystal/Salt gradient - more vibrant */}
        <linearGradient id="saltGradient" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={color.primaryLight} />
          <stop offset="50%" stopColor={color.primaryMid} />
          <stop offset="100%" stopColor={color.primaryDark} />
        </linearGradient>
        
        {/* Gold accent gradient - richer */}
        <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.goldLight} />
          <stop offset="100%" stopColor={color.goldDark} />
        </linearGradient>
        
        {/* Text gradient for PHS */}
        <linearGradient id="boldTextGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.primaryDark} />
          <stop offset="100%" stopColor="#761C1C" />
        </linearGradient>
        
        {/* Stronger shadow effect */}
        <filter id="strongShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.4" floodColor={color.shadowColor} />
        </filter>
        
        {/* Dramatic glow for crystal elements */}
        <filter id="dramaticGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={color.primaryMid} floodOpacity="0.5"/>
        </filter>
        
        {/* PHS text effect */}
        <filter id="textEffect" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="2" stdDeviation="1" floodColor={color.shadowColor} />
        </filter>
      </defs>
      
      {/* Bold Background */}
      <rect 
        x="2" 
        y="2" 
        width="376" 
        height="116" 
        rx="10" 
        fill={color.bgColor}
        stroke={color.borderColor}
        strokeWidth="4"
        filter="url(#strongShadow)"
      />
      
      {/* Large Dramatic Himalayan Salt Crystal */}
      <g transform="translate(15, 15)" filter="url(#dramaticGlow)">
        {/* Main large crystal cluster */}
        <path 
          d="M0,60 L20,0 L40,60 Z" 
          fill="url(#saltGradient)"
          stroke={color.primaryDark}
          strokeWidth="1"
        />
        
        <path 
          d="M35,70 L50,15 L70,70 Z" 
          fill="url(#saltGradient)"
          stroke={color.primaryDark}
          strokeWidth="1"
        />
        
        <path 
          d="M65,55 L80,10 L95,55 Z" 
          fill="url(#saltGradient)"
          stroke={color.primaryDark}
          strokeWidth="1"
        />
        
        {/* Light reflections - brighter */}
        <path 
          d="M20,25 L25,20 M50,35 L55,30 M80,25 L85,20" 
          stroke="white" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </g>
      
      {/* Dr. Abdul text - bolder */}
      <text
        x="125"
        y="45"
        fontFamily="Georgia, serif"
        fontSize="20"
        fontWeight="600"
        fill={color.textDark}
        filter="url(#textEffect)"
      >
        DR. ABDUL
      </text>
      
      {/* Main PHS text - much bolder */}
      <text
        x="125"
        y="85"
        fontFamily="Arial, sans-serif"
        fontSize="55"
        fontWeight="900"
        letterSpacing="-1"
        fill="url(#boldTextGradient)"
        filter="url(#strongShadow)"
      >
        PHS
      </text>
      
      {/* Tagline - more prominent */}
      <text
        x="235"
        y="85"
        fontFamily="Georgia, serif"
        fontSize="16"
        fontWeight="500"
        fontStyle="italic"
        fill={color.textDark}
      >
        Pink Himalayan Salt
      </text>
      
      {/* Gold accents */}
      <rect
        x="120"
        y="52"
        width="100"
        height="3"
        fill="url(#goldAccent)"
        rx="1.5"
      />
      
      <rect
        x="230"
        y="92"
        width="120"
        height="2"
        fill="url(#goldAccent)"
        rx="1"
      />
      
      {/* Premium Quality Badge */}
      <g transform="translate(315, 25)">
        <circle 
          cx="25" 
          cy="25" 
          r="25" 
          fill="url(#goldAccent)" 
          filter="url(#strongShadow)"
        />
        
        <text
          x="25"
          y="22"
          fontFamily="Arial, sans-serif"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          fill="#FFFFFF"
        >
          PREMIUM
        </text>
        
        <text
          x="25"
          y="35"
          fontFamily="Arial, sans-serif"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          fill="#FFFFFF"
        >
          QUALITY
        </text>
      </g>
      
      {/* Established & Origin */}
      <g transform="translate(215, 102)">
        <rect
          x="0"
          y="0"
          width="140"
          height="16"
          rx="8"
          fill="url(#goldAccent)"
          opacity="0.2"
        />
        
        <text
          x="70"
          y="12"
          fontFamily="Arial, sans-serif"
          fontSize="10"
          fontWeight="bold"
          textAnchor="middle"
          fill={color.goldDark}
        >
          EST. 2019 • PAKISTAN-USA
        </text>
      </g>
      
      {/* Registered Trademark */}
      <circle
        cx="225"
        y="70"
        r="8"
        fill="none"
        stroke={color.goldDark}
        strokeWidth="1"
      />
      
      <text
        x="225"
        y="73"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        fontWeight="bold"
        textAnchor="middle"
        fill={color.goldDark}
      >
        ®
      </text>
    </svg>
  );
}