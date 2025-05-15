import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  aspectRatio?: string;
}

export default function ProductImage({ 
  src, 
  alt, 
  className = "w-full h-full object-cover transition-transform duration-500 hover:scale-105",
  fallback = "/images/logo.webp",
  aspectRatio 
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  // Handle image loading errors
  const handleError = () => {
    if (!error) {
      setImgSrc(fallback);
      setError(true);
    }
  };

  // Handle image source that might be a relative path without proper prefix
  const resolveImagePath = (imagePath: string): string => {
    // If it's already a full URL, imported image (blob:), or starts with paths, return as is
    if (
      typeof imagePath === 'string' && (
        imagePath.startsWith('http') || 
        imagePath.startsWith('blob:') || 
        imagePath.startsWith('data:') || 
        imagePath.startsWith('/images/') ||
        imagePath.startsWith('/assets/')
      )
    ) {
      return imagePath;
    }
    
    // If it doesn't start with any of these prefixes, add /images/
    if (typeof imagePath === 'string') {
      return `/images/${imagePath.replace(/^\//, '')}`;
    }
    
    // Fallback
    return fallback;
  };

  return (
    <img
      src={resolveImagePath(imgSrc)}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
}