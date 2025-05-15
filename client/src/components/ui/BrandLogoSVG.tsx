import React from 'react';

interface BrandLogoSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function BrandLogoSVG({ 
  variant = 'default',
  className = ''
}: BrandLogoSVGProps) {
  // Colors based on variant
  const colors = {
    default: {
      phsColor: '#8B572A', // Brown from the original logo
      phsGradient1: '#A06B3C', 
      phsGradient2: '#7A4920',
      textColor: '#333333',
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
      textColor: '#FFFFFF',
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
      textColor: '#111111',
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
      viewBox="0 0 320 120"
      className={className}
      fill="none"
    >
      {/* Define filters for effects */}
      <defs>
        <filter id="brandShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={color.shadowColor} />
        </filter>
        
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.mountainColor} />
          <stop offset="100%" stopColor={`${color.mountainColor}DD`} />
        </linearGradient>
        
        <linearGradient id="phsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color.phsGradient1} />
          <stop offset="100%" stopColor={color.phsGradient2} />
        </linearGradient>
        
        <filter id="mountainGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
          <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor={color.mountainGlow} floodOpacity="0.7" />
        </filter>
        
        {/* 3D Effect for text */}
        <filter id="textEmboss" x="-10%" y="-10%" width="120%" height="120%">
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
        width="316" 
        height="116" 
        rx="12" 
        fill={color.backgroundColor} 
        stroke={color.borderColor}
        strokeWidth="4"
        filter="url(#brandShadow)"
      />
      
      {/* Registered trademark symbol */}
      <circle 
        cx="300" 
        cy="15" 
        r="8" 
        fill="none" 
        stroke={color.textColor} 
        strokeWidth="1" 
      />
      <text 
        x="300" 
        y="18" 
        textAnchor="middle" 
        fontFamily="Arial, sans-serif" 
        fontSize="10" 
        fontWeight="bold" 
        fill={color.textColor}
      >
        ®
      </text>
      
      {/* Main PHS text */}
      <g transform="translate(65, 20)" filter="url(#textEmboss)">
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="80"
          letterSpacing="-2"
          fill="url(#phsGradient)"
        >
          phs
        </text>
      </g>
      
      {/* Mountains with enhanced detail */}
      <g transform="translate(90, 80)" filter="url(#mountainGlow)">
        <path
          d="M0,20 L25,-10 L40,5 L50,-5 L60,0 L75,10 L90,-15 L110,20 Z"
          fill="url(#mountainGradient)"
          stroke={color.mountainColor}
          strokeWidth="1.5"
        />
        
        {/* Snow caps on mountains */}
        <path
          d="M24,-8 L26,-10 L28,-8 M49,-3 L50,-5 L51,-3 M89,-13 L90,-15 L91,-13"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      
      {/* Dr. Abdul text */}
      <g transform="translate(190, 30)">
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="14"
          fill={color.textColor}
        >
          Dr. Abdul
        </text>
      </g>
      
      {/* Himalayan Salt text */}
      <g transform="translate(35, 105)">
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="500"
          fontSize="12"
          fill={color.textColor}
          textAnchor="start"
        >
          Pink Himalayan Salt Collection
        </text>
      </g>
      
      {/* Certified Organic badge */}
      <g transform="translate(260, 80)">
        <circle 
          cx="12" 
          cy="12" 
          r="12" 
          fill={variant === 'light' ? 'rgba(255,255,255,0.2)' : 'rgba(107,158,124,0.2)'} 
        />
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="7"
          fill={color.certified}
          textAnchor="middle"
          x="12"
          y="10"
        >
          CERTIFIED
        </text>
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="7"
          fill={color.certified}
          textAnchor="middle"
          x="12"
          y="18"
        >
          PREMIUM
        </text>
      </g>
    </svg>
  );
}