import React from 'react';

interface BrandLogoIconSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function BrandLogoIconSVG({ 
  variant = 'default',
  className = ''
}: BrandLogoIconSVGProps) {
  // Colors based on variant
  const colors = {
    default: {
      phsColor: '#8B572A', // Brown from the original logo
      phsGradient1: '#A06B3C', 
      phsGradient2: '#7A4920',
      mountainColor: '#FF7A5A', // Coral/salmon from original logo
      mountainGlow: 'rgba(255, 122, 90, 0.6)',
      borderColor: '#FF7A5A',
      backgroundColor: '#FFFFFF',
      shadowColor: 'rgba(255, 122, 90, 0.3)',
      certified: '#6B9E7C' // Green for certified text
    },
    light: {
      phsColor: '#FFFFFF',
      phsGradient1: '#FFFFFF', 
      phsGradient2: '#E0E0E0',
      mountainColor: '#FFB3A1',
      mountainGlow: 'rgba(255, 179, 161, 0.6)',
      borderColor: '#FFFFFF',
      backgroundColor: 'transparent',
      shadowColor: 'rgba(255, 255, 255, 0.2)',
      certified: '#A0E0B0'
    },
    dark: {
      phsColor: '#8B572A',
      phsGradient1: '#A06B3C', 
      phsGradient2: '#7A4920',
      mountainColor: '#FF7A5A',
      mountainGlow: 'rgba(255, 122, 90, 0.6)',
      borderColor: '#FF7A5A',
      backgroundColor: '#FFFFFF',
      shadowColor: 'rgba(255, 122, 90, 0.3)',
      certified: '#6B9E7C'
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
      {/* Define filters for effects */}
      <defs>
        <filter id="brandIconShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color.shadowColor} />
        </filter>
        
        <linearGradient id="mountainIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.mountainColor} />
          <stop offset="100%" stopColor={`${color.mountainColor}DD`} />
        </linearGradient>
        
        <linearGradient id="phsIconGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color.phsGradient1} />
          <stop offset="100%" stopColor={color.phsGradient2} />
        </linearGradient>
        
        <filter id="mountainIconGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
          <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor={color.mountainGlow} floodOpacity="0.7" />
        </filter>
        
        {/* 3D Effect for text */}
        <filter id="textIconEmboss" x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dx="1" dy="1" result="offsetBlur"/>
          <feSpecularLighting result="specOut" specularExponent="20" lightingColor="#FFFFFF">
            <fePointLight x="0" y="0" z="50" />
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
        </filter>
      </defs>
      
      {/* Background with rounded corners */}
      <rect 
        x="2" 
        y="2" 
        width="116" 
        height="116" 
        rx="12" 
        fill={color.backgroundColor} 
        stroke={color.borderColor}
        strokeWidth="4"
        filter="url(#brandIconShadow)"
      />
      
      {/* Main PHS text */}
      <g transform="translate(20, 35)" filter="url(#textIconEmboss)">
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="60"
          letterSpacing="-2"
          fill="url(#phsIconGradient)"
        >
          phs
        </text>
      </g>
      
      {/* Mountains with enhanced detail */}
      <g transform="translate(25, 75)" filter="url(#mountainIconGlow)">
        <path
          d="M0,15 L20,-10 L30,0 L40,-5 L50,0 L60,8 L70,-15 L80,15 Z"
          fill="url(#mountainIconGradient)"
          stroke={color.mountainColor}
          strokeWidth="1.5"
        />
        
        {/* Snow caps on mountains */}
        <path
          d="M19,-8 L20,-10 L21,-8 M39,-3 L40,-5 L41,-3 M69,-13 L70,-15 L71,-13"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      
      {/* Certified Badge (smaller version) */}
      <g transform="translate(90, 90)">
        <circle 
          cx="8" 
          cy="8" 
          r="8" 
          fill={variant === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(107,158,124,0.2)'} 
        />
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="5"
          fill={color.certified}
          textAnchor="middle"
          x="8"
          y="10"
        >
          PREMIUM
        </text>
      </g>
    </svg>
  );
}