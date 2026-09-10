import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: { icon: 20, text: 'text-sm' },
    md: { icon: 32, text: 'text-lg' },
    lg: { icon: 48, text: 'text-2xl' },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Stylized visa/passport with checkmark */}
      <svg
        width={sizes[size].icon}
        height={sizes[size].icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Passport/Visa shape */}
        <rect x="6" y="4" width="28" height="32" rx="3" fill="#1A2332" />
        <rect x="9" y="7" width="22" height="26" rx="2" fill="#FAF8F5" />
        {/* Checkmark */}
        <path d="M14 20L18 24L26 16" stroke="#D4762C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Decorative dots (Indian motif) */}
        <circle cx="12" cy="12" r="1.5" fill="#2D7D46" />
        <circle cx="28" cy="12" r="1.5" fill="#2D7D46" />
      </svg>
      <span className={`font-bold ${sizes[size].text} text-navy-500`}>
        Visa India<span className="text-saffron-500"> Expert</span>
      </span>
    </div>
  );
};
