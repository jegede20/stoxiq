import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

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

  const inner = (
    <span className={cn('inline-flex flex-col items-start select-none', className)}>
      <span className={cn('font-serif font-bold leading-none tracking-[-0.5px]', sizeClass)}>
        <span className="text-text-primary">Stox</span>
        <span className="text-gold-base">IQ</span>
      </span>
      {showTagline && (
        <span className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[2px] text-text-tertiary">
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
