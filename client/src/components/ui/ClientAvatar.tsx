import React from 'react';

interface ClientAvatarProps {
  name: string;
  role: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

/**
 * Component for rendering a client avatar with initials when no actual photo is available
 */
export default function ClientAvatar({ name, role, variant = 'primary' }: ClientAvatarProps) {
  // Generate initials from the name
  const initials = name
    .split(' ')
    .map(part => part[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);

  // Define styles based on variant
  const variantStyles = {
    primary: {
      background: 'from-primary to-primary-dark',
      text: 'text-white',
    },
    secondary: {
      background: 'from-secondary to-secondary-dark',
      text: 'text-white',
    },
    accent: {
      background: 'from-accent to-accent-dark',
      text: 'text-white',
    },
  }[variant];

  return (
    <div className="flex items-center space-x-4">
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold 
                  ${variantStyles.text} bg-gradient-to-br ${variantStyles.background}`}
      >
        {initials}
      </div>
      <div>
        <h3 className="font-heading text-lg font-semibold">{name}</h3>
        <p className="text-sm text-neutral-brown">{role}</p>
      </div>
    </div>
  );
}