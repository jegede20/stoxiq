import React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier?: 1 | 2 | 3
  goldEdge?: boolean
  amberEdge?: boolean
  interactive?: boolean
  interactiveAmber?: boolean
  children: React.ReactNode
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      tier = 2,
      goldEdge = false,
      amberEdge = false,
      interactive = false,
      interactiveAmber = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const tierClass =
      tier === 1
        ? 'glass-tier-1'
        : tier === 3
        ? 'glass-tier-3'
        : 'glass-tier-2'

    return (
      <div
        ref={ref}
        className={cn(
          tierClass,
          goldEdge && 'glass-gold-edge',
          amberEdge && 'glass-amber-edge',
          interactive && 'glass-hover-lift',
          interactiveAmber && 'glass-hover-lift-amber',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'
export default GlassCard
