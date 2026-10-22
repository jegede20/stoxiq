import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant =
  | 'completed'
  | 'in-progress'
  | 'not-started'
  | 'locked'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'high-risk'
  | 'fraud-alert'
  | 'very-common'
  | 'your-region'
  | 'next-up'
  | 'neutral-gold'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  completed: 'bg-positive-dim text-positive border border-[rgba(74,222,128,0.28)]',
  'in-progress': 'bg-gold-fill text-gold-base border border-gold-border',
  'not-started': 'bg-[rgba(255,255,255,0.04)] text-text-secondary border border-[rgba(255,255,255,0.08)]',
  locked: 'bg-[rgba(255,255,255,0.02)] text-text-tertiary border border-[rgba(255,255,255,0.05)] opacity-75',
  beginner: 'bg-positive-dim text-positive border border-[rgba(74,222,128,0.25)]',
  intermediate: 'bg-warning-dim text-warning border border-[rgba(245,158,11,0.28)]',
  advanced: 'bg-negative-dim text-negative border border-[rgba(248,113,113,0.28)]',
  'high-risk': 'bg-negative-dim text-negative border border-[rgba(248,113,113,0.32)]',
  'fraud-alert': 'bg-negative-dim text-negative border border-warning',
  'very-common': 'bg-warning-dim text-warning border border-[rgba(245,158,11,0.32)]',
  'your-region': 'bg-gold-fill text-gold-base border border-gold-border',
  'next-up': 'bg-gold-fill text-gold-light border border-gold-border animate-pulse-gold',
  'neutral-gold': 'bg-[rgba(201,168,76,0.06)] text-text-accent border border-[rgba(201,168,76,0.22)]',
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'not-started', className, children }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-[1px] px-[10px] py-[4px] rounded-full whitespace-nowrap leading-none',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
