import React from 'react';
import { Link } from 'wouter';
import SimpleLogoSVG from './SimpleLogoSVG';
import SimpleLogoIconSVG from './SimpleLogoIconSVG';

interface LogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
}

export default function Logo({ 
  variant = 'default', 
  size = 'md',
  iconOnly = false
}: LogoProps) {
  // Simple size classes that should work reliably
  const sizeClasses = {
    sm: iconOnly ? 'h-8 w-8' : 'h-8 w-32',
    md: iconOnly ? 'h-10 w-10' : 'h-10 w-40',
    lg: iconOnly ? 'h-12 w-12' : 'h-12 w-48',
  };

  return (
    <Link href="/">
      <div className="cursor-pointer transition-opacity hover:opacity-80">
        {iconOnly ? (
          <SimpleLogoIconSVG variant={variant} className={`${sizeClasses[size]}`} />
        ) : (
          <SimpleLogoSVG variant={variant} className={`${sizeClasses[size]}`} />
        )}
      </div>
    </Link>
  );
}