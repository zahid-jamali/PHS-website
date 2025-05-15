import React from 'react';

interface ProfessionalLogoIconSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function ProfessionalLogoIconSVG({ 
  variant = 'default',
  className = ''
}: ProfessionalLogoIconSVGProps) {
  // Colors based on variant
  const colors = {
    default: {
      primaryColor: '#8B572A', // Rich brown
      secondaryColor: '#FF7A5A', // Coral accent
      accentColor: '#D4AF37', // Gold accent for premium look
      textColor: '#333333',
      backgroundColor: '#FFFFFF',
      outlineColor: 'rgba(139, 87, 42, 0.2)',
      shadowColor: 'rgba(0, 0, 0, 0.25)'
    },
    light: {
      primaryColor: '#FFFFFF',
      secondaryColor: '#FFB3A1', 
      accentColor: '#FFDF7F', // Light gold
      textColor: '#FFFFFF',
      backgroundColor: 'transparent',
      outlineColor: 'rgba(255, 255, 255, 0.3)',
      shadowColor: 'rgba(255, 255, 255, 0.15)'
    },
    dark: {
      primaryColor: '#8B572A',
      secondaryColor: '#FF7A5A',
      accentColor: '#D4AF37',
      textColor: '#F8F8F8',
      backgroundColor: '#171717',
      outlineColor: 'rgba(139, 87, 42, 0.2)',
      shadowColor: 'rgba(0, 0, 0, 0.3)'
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
        {/* Text gradient */}
        <linearGradient id="textIconGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color.primaryColor} />
          <stop offset="100%" stopColor={`${color.primaryColor}DD`} />
        </linearGradient>
        
        {/* Gold gradient for accents */}
        <linearGradient id="goldIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.accentColor} />
          <stop offset="50%" stopColor={`${color.accentColor}EE`} />
          <stop offset="100%" stopColor={color.accentColor} />
        </linearGradient>
        
        {/* Mountain gradient */}
        <linearGradient id="mountainIconProGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.secondaryColor} />
          <stop offset="100%" stopColor={`${color.secondaryColor}DD`} />
        </linearGradient>
        
        {/* Shadow effects */}
        <filter id="dropIconShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Text emboss effect */}
        <filter id="professionalIconEmboss" x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dx="1" dy="1" result="offsetBlur"/>
          <feSpecularLighting result="specOut" specularExponent="20" lightingColor="#FFFFFF">
            <fePointLight x="60" y="60" z="100" />
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
        </filter>
      </defs>
      
      {/* Circle Background */}
      <circle 
        cx="60" 
        cy="60" 
        r="55" 
        fill={color.backgroundColor} 
        stroke="url(#goldIconGradient)"
        strokeWidth="2"
        filter="url(#dropIconShadow)"
      />
      
      {/* Decorative Circular Border */}
      <circle 
        cx="60" 
        cy="60" 
        r="50" 
        fill="none" 
        stroke="url(#goldIconGradient)"
        strokeWidth="0.5"
        strokeDasharray="1 2"
        opacity="0.8"
      />
      
      {/* Main Letters PHS */}
      <g transform="translate(30, 70)" filter="url(#professionalIconEmboss)">
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="45"
          letterSpacing="-1"
          fill="url(#textIconGradient)"
        >
          PHS
        </text>
      </g>
      
      {/* Mountain Accent */}
      <g transform="translate(25, 85)">
        <path
          d="M0,10 L15,-15 L30,-5 L45,-20 L60,-10 L70,10"
          stroke={color.secondaryColor}
          strokeWidth="1.5"
          fill="url(#mountainIconProGradient)"
          opacity="0.8"
        />
        
        {/* Snow Caps */}
        <path
          d="M14,-13 L15,-15 L16,-13 M44,-18 L45,-20 L46,-18"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
      
      {/* DR. ABDUL Text */}
      <text
        x="60"
        y="35"
        fontFamily="Georgia, serif"
        fontWeight="500"
        fontSize="12"
        textAnchor="middle"
        fill={color.textColor}
      >
        DR. ABDUL
      </text>
      
      {/* Premium Quality Curved Text */}
      <path 
        id="premiumQualityPath" 
        d="M 60,105 m -40,0 a 40,40 0 1,1 80,0" 
        fill="none" 
      />
      <text>
        <textPath 
          href="#premiumQualityPath" 
          startOffset="22%" 
          fontFamily="Georgia, serif"
          fontSize="8"
          fill={color.textColor}
        >
          • PREMIUM QUALITY •
        </textPath>
      </text>
      
      {/* Gold Accent Line */}
      <line 
        x1="30" 
        y1="75" 
        x2="90" 
        y2="75" 
        stroke="url(#goldIconGradient)" 
        strokeWidth="0.5" 
      />
    </svg>
  );
}