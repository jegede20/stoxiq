import React from 'react'
import { cn } from '@/lib/utils'

interface RegionBadgeIconProps {
  region: 'us' | 'uk' | 'africa'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const RegionEmblem: React.FC<RegionBadgeIconProps> = ({
  region,
  size = 'md',
  className,
}) => {
  const dims =
    size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10'

  if (region === 'us') {
    return (
      <div
        className={cn(
          'rounded-full overflow-hidden border border-[rgba(255,255,255,0.14)] shrink-0 shadow-glass-1',
          dims,
          className
        )}
        aria-label="United States"
      >
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect width="48" height="48" fill="#1E293B" />
          {[0, 8, 16, 24, 32, 40].map((y, idx) => (
            <rect key={idx} x="0" y={y} width="48" height="4" fill="#DC2626" opacity="0.88" />
          ))}
          {[4, 12, 20, 28, 36, 44].map((y, idx) => (
            <rect key={idx} x="0" y={y} width="48" height="4" fill="#F5F4EF" opacity="0.9" />
          ))}
          <rect x="0" y="0" width="24" height="24" fill="#1D4ED8" />
          <circle cx="6" cy="6" r="1.5" fill="#F5F4EF" />
          <circle cx="12" cy="6" r="1.5" fill="#F5F4EF" />
          <circle cx="18" cy="6" r="1.5" fill="#F5F4EF" />
          <circle cx="9" cy="12" r="1.5" fill="#F5F4EF" />
          <circle cx="15" cy="12" r="1.5" fill="#F5F4EF" />
          <circle cx="6" cy="18" r="1.5" fill="#F5F4EF" />
          <circle cx="12" cy="18" r="1.5" fill="#F5F4EF" />
          <circle cx="18" cy="18" r="1.5" fill="#F5F4EF" />
        </svg>
      </div>
    )
  }

  if (region === 'uk') {
    return (
      <div
        className={cn(
          'rounded-full overflow-hidden border border-[rgba(255,255,255,0.14)] shrink-0 shadow-glass-1',
          dims,
          className
        )}
        aria-label="United Kingdom"
      >
        <svg viewBox="0 0 48 48" className="w-full h-full">
          <rect width="48" height="48" fill="#1E3A8A" />
          <path d="M0 0 L48 48 M48 0 L0 48" stroke="#F5F4EF" strokeWidth="7" />
          <path d="M0 0 L48 48 M48 0 L0 48" stroke="#DC2626" strokeWidth="3.5" />
          <path d="M24 0 V48 M0 24 H48" stroke="#F5F4EF" strokeWidth="10" />
          <path d="M24 0 V48 M0 24 H48" stroke="#DC2626" strokeWidth="6" />
        </svg>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-full overflow-hidden border border-[rgba(201,168,76,0.32)] bg-[#13131F] shrink-0 shadow-glass-1',
        dims,
        className
      )}
      aria-label="Africa"
    >
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" fill="#13131F" />
        <circle cx="24" cy="24" r="19" fill="rgba(74,222,128,0.08)" stroke="#C9A84C" strokeOpacity="0.4" strokeWidth="1" />
        <path
          d="M19 10 C24 9, 30 11, 32 15 C34 18, 37 21, 35 25 C33 29, 31 34, 28 38 C26 40, 23 40, 22 36 C21 32, 20 28, 17 25 C13 23, 12 18, 14 14 C15 11, 17 10, 19 10 Z"
          fill="#C9A84C"
          fillOpacity="0.88"
        />
      </svg>
    </div>
  )
}

export const RegionWatermark: React.FC<{ region: 'us' | 'uk' | 'africa' }> = ({ region }) => {
  if (region === 'africa') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-36 h-36 opacity-[0.15] pointer-events-none select-none text-gold-base"
      >
        <path
          d="M46 14 C60 12, 77 17, 83 29 C89 38, 98 46, 92 58 C86 69, 80 84, 72 96 C66 102, 58 101, 55 90 C52 79, 49 67, 40 59 C29 53, 26 39, 31 28 C35 19, 40 15, 46 14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    )
  }

  if (region === 'uk') {
    return (
      <svg viewBox="0 0 120 80" className="w-36 h-24 opacity-[0.15] pointer-events-none select-none">
        <rect width="120" height="80" rx="8" fill="none" stroke="#F5F4EF" strokeWidth="2" />
        <path d="M0 0 L120 80 M120 0 L0 80" stroke="#F5F4EF" strokeWidth="8" />
        <path d="M60 0 V80 M0 40 H120" stroke="#F5F4EF" strokeWidth="14" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 80" className="w-36 h-24 opacity-[0.15] pointer-events-none select-none">
      <rect width="120" height="80" rx="8" fill="none" stroke="#F5F4EF" strokeWidth="2" />
      {[12, 24, 36, 48, 60, 72].map((y) => (
        <line key={y} x1="0" y1={y} x2="120" y2={y} stroke="#F5F4EF" strokeWidth="4" />
      ))}
      <rect x="0" y="0" width="54" height="42" fill="#1E293B" />
      <circle cx="14" cy="14" r="3" fill="#F5F4EF" />
      <circle cx="28" cy="14" r="3" fill="#F5F4EF" />
      <circle cx="42" cy="14" r="3" fill="#F5F4EF" />
      <circle cx="21" cy="28" r="3" fill="#F5F4EF" />
      <circle cx="35" cy="28" r="3" fill="#F5F4EF" />
    </svg>
  )
}
