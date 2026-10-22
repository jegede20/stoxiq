import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface StoxBrandMarkProps {
  size?: number
  className?: string
}

/**
 * Institutional Stankowski-lineage geometric brand mark:
 * Two point-symmetric architectural L-frames in warm ivory (#F5F4EF)
 * bisected by an ascending 45-degree 18k gold meridian blade (#C9A84C)
 * with exact optical stroke weight (3.5px) and parallel negative-space channels.
 */
export const StoxBrandMark: React.FC<StoxBrandMarkProps> = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={cn('shrink-0', className)}
  >
    <path
      d="M4.5 4.5H20.3L16.8 8H8V16.8L4.5 20.3V4.5Z"
      fill="#F5F4EF"
    />
    <path
      d="M27.5 27.5H11.7L15.2 24H24V15.2L27.5 11.7V27.5Z"
      fill="#F5F4EF"
    />
    <path
      d="M4.5 25L25 4.5H27.5V7L7 27.5H4.5V25Z"
      fill="#C9A84C"
    />
  </svg>
)

interface StoxLogoProps {
  to?: string
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  className?: string
  onClick?: () => void
}

export const StoxLogo: React.FC<StoxLogoProps> = ({
  to = '/',
  size = 'md',
  showTagline = false,
  className,
  onClick,
}) => {
  const sizeClass =
    size === 'lg'
      ? 'text-[30px]'
      : size === 'sm'
      ? 'text-[20px]'
      : 'text-[24px]'

  const markSize = size === 'lg' ? 30 : size === 'sm' ? 21 : 24
  const gapClass = size === 'lg' ? 'gap-3' : size === 'sm' ? 'gap-2' : 'gap-2.5'

  const inner = (
    <span className={cn('inline-flex flex-col items-start select-none', className)}>
      <span className={cn('inline-flex items-center', gapClass)}>
        <StoxBrandMark size={markSize} />
        <span className={cn('font-serif font-bold leading-none tracking-[-0.5px]', sizeClass)}>
          <span className="text-text-primary">Stox</span>
          <span className="text-gold-base">IQ</span>
        </span>
      </span>
      {showTagline && (
        <span className="mt-1.5 font-sans text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary">
          YOUR MARKET. YOUR KNOWLEDGE.
        </span>
      )}
    </span>
  )

  return (
    <Link to={to} onClick={onClick} className="inline-flex items-center focus:outline-none group">
      {inner}
    </Link>
  )
}

export default StoxLogo
