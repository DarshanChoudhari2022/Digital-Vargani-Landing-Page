import React from 'react';

interface EksutraLogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  className?: string;
}

export const EksutraLogo: React.FC<EksutraLogoProps> = ({
  size = 36,
  showText = true,
  textColor = '#0f172a',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      {/* Eksutra Interwoven Sutra Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="eksutra-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="eksutra-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
        {/* Background pill icon box */}
        <rect width="40" height="40" rx="12" fill="url(#eksutra-grad-1)" />
        {/* Stylized Interwoven 'E' + Sutra Knot Motif */}
        <path
          d="M12 12C12 10.8954 12.8954 10 14 10H26C27.1046 10 28 10.8954 28 12V14H17V18H25V22H17V26H28V28H14C12.8954 28 12 27.1046 12 26V12Z"
          fill="white"
          fillOpacity="0.95"
        />
        {/* Infinite Thread Arc overlay */}
        <path
          d="M20 14C23.3137 14 26 16.6863 26 20C26 23.3137 23.3137 26 20 26"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span
          style={{
            fontSize: size * 0.55,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            color: textColor,
            fontFamily: 'var(--font-body), sans-serif',
            lineHeight: 1,
          }}
        >
          Ek<span style={{ background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>sutra</span>
        </span>
      )}
    </div>
  );
};
