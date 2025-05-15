import React from 'react';

interface ProfessionalLogoSVGProps {
  variant?: 'default' | 'light' | 'dark';
  className?: string;
}

export default function ProfessionalLogoSVG({ 
  variant = 'default',
  className = ''
}: ProfessionalLogoSVGProps) {
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
      viewBox="0 0 400 120"
      className={className}
      fill="none"
    >
      {/* Define filters and gradients */}
      <defs>
        {/* Text gradient */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color.primaryColor} />
          <stop offset="100%" stopColor={`${color.primaryColor}CC`} />
        </linearGradient>
        
        {/* Gold gradient for accents */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.accentColor} />
          <stop offset="50%" stopColor={`${color.accentColor}EE`} />
          <stop offset="100%" stopColor={color.accentColor} />
        </linearGradient>
        
        {/* Mountain gradient */}
        <linearGradient id="mountainProGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.secondaryColor} />
          <stop offset="100%" stopColor={`${color.secondaryColor}DD`} />
        </linearGradient>
        
        {/* Shadow effects */}
        <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="140%">
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
        <filter id="professionalEmboss" x="-10%" y="-10%" width="120%" height="120%">
          <feOffset dx="1" dy="1" result="offsetBlur"/>
          <feSpecularLighting result="specOut" specularExponent="20" lightingColor="#FFFFFF">
            <fePointLight x="200" y="60" z="100" />
          </feSpecularLighting>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
        </filter>
        
        {/* Glow effect */}
        <filter id="professionalGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Logo Background for better visibility */}
      {variant === 'default' && (
        <rect 
          x="5" 
          y="5" 
          width="390" 
          height="110" 
          rx="10" 
          fill={color.backgroundColor} 
          stroke={color.outlineColor}
          strokeWidth="1"
        />
      )}
      
      {/* Premium Gold Border Accent */}
      <rect 
        x="10" 
        y="10" 
        width="380" 
        height="100" 
        rx="6" 
        fill="none" 
        stroke="url(#goldGradient)"
        strokeWidth="1.5"
        strokeDasharray="1 4"
        opacity="0.8"
      />
      
      {/* Main Logo Text Group */}
      <g transform="translate(20, 60)" filter="url(#professionalEmboss)">
        {/* "Dr. Abdul" Text */}
        <text
          fontFamily="Georgia, serif"
          fontWeight="500"
          fontSize="22"
          letterSpacing="0"
          fill={color.textColor}
          y="-25"
        >
          DR. ABDUL
        </text>
        
        {/* Main PHS Text */}
        <text
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="70"
          letterSpacing="-1"
          fill="url(#textGradient)"
        >
          PHS
        </text>
      </g>
      
      {/* Tagline */}
      <text
        x="20"
        y="100"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="14"
        fill={color.textColor}
        opacity="0.9"
      >
        Premium Pink Himalayan Salt
      </text>
      
      {/* Decorative Mountain Range */}
      <g transform="translate(240, 65)" filter="url(#professionalGlow)">
        <path
          d="M0,15 L20,-25 L40,-10 L60,-35 L80,-15 L100,-40 L120,0 L140,-20 L160,15"
          stroke={color.secondaryColor}
          strokeWidth="2"
          fill="url(#mountainProGradient)"
          opacity="0.8"
        />
        
        {/* Snow Caps */}
        <path
          d="M19,-23 L20,-25 L21,-23 M59,-33 L60,-35 L61,-33 M99,-38 L100,-40 L101,-38 M139,-18 L140,-20 L141,-18"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Crystal Icon */}
        <g transform="translate(80, -55)">
          <polygon 
            points="0,20 15,0 30,20" 
            fill="none" 
            stroke="url(#goldGradient)" 
            strokeWidth="1.5"
          />
          <polygon 
            points="7,16 15,5 23,16" 
            fill="none" 
            stroke="url(#goldGradient)" 
            strokeWidth="1"
          />
          <line 
            x1="15" 
            y1="0" 
            x2="15" 
            y2="20" 
            stroke="url(#goldGradient)" 
            strokeWidth="1" 
          />
        </g>
      </g>
      
      {/* Premium Badge */}
      <g transform="translate(355, 20)">
        <circle 
          cx="15" 
          cy="15" 
          r="15" 
          fill="url(#goldGradient)" 
          opacity="0.8"
        />
        <text
          x="15"
          y="13"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="6"
          textAnchor="middle"
          fill={variant === 'light' ? color.backgroundColor : '#FFFFFF'}
        >
          PREMIUM
        </text>
        <text
          x="15"
          y="21"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="6"
          textAnchor="middle"
          fill={variant === 'light' ? color.backgroundColor : '#FFFFFF'}
        >
          QUALITY
        </text>
      </g>
      
      {/* Established Text */}
      <g transform="translate(355, 85)">
        <circle 
          cx="15" 
          cy="15" 
          r="15" 
          fill="none" 
          stroke="url(#goldGradient)"
          strokeWidth="1"
        />
        <text
          x="15"
          y="13"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="6"
          textAnchor="middle"
          fill={color.textColor}
        >
          ESTD.
        </text>
        <text
          x="15"
          y="21"
          fontFamily="Georgia, serif"
          fontWeight="700"
          fontSize="8"
          textAnchor="middle"
          fill={color.textColor}
        >
          2019
        </text>
      </g>
      
      {/* Registered Trademark */}
      <text
        x="113"
        y="40"
        fontFamily="Arial, sans-serif"
        fontSize="10"
        fill={color.textColor}
      >
        ®
      </text>
      
      {/* Gold Accent Lines */}
      <line 
        x1="20" 
        y1="68" 
        x2="220" 
        y2="68" 
        stroke="url(#goldGradient)" 
        strokeWidth="0.5" 
      />
      <line 
        x1="20" 
        y1="72" 
        x2="150" 
        y2="72" 
        stroke="url(#goldGradient)" 
        strokeWidth="0.5" 
      />
    </svg>
  );
}