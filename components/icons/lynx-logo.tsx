import React from 'react';

interface LynxLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function LynxLogo({ className = "", width = 120, height = 40 }: LynxLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lynx head silhouette with pointed ears */}
      <path
        d="M8 32C8 32 6 28 6 24C6 20 8 16 12 14C14 13 16 12 18 12C20 12 22 13 24 14C28 16 30 20 30 24C30 28 28 32 28 32"
        fill="url(#gradient1)"
      />
      
      {/* Left ear tuft */}
      <path
        d="M12 14L10 8L14 10L12 14Z"
        fill="url(#gradient2)"
      />
      
      {/* Right ear tuft */}
      <path
        d="M24 14L26 8L22 10L24 14Z"
        fill="url(#gradient2)"
      />
      
      {/* Eyes */}
      <circle cx="15" cy="20" r="1.5" fill="#60A5FA" />
      <circle cx="21" cy="20" r="1.5" fill="#60A5FA" />
      
      {/* Text "LYNX" */}
      <text
        x="40"
        y="26"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="url(#textGradient)"
        letterSpacing="0.5px"
      >
        LYNX
      </text>
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
    </svg>
  );
}