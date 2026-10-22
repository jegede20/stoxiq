import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export type QuizSegmentStatus = 'unanswered' | 'correct' | 'wrong' | 'current'

interface ProgressBarProps {
  value?: number
  variant?: 'standard' | 'thin' | 'segmented'
  tone?: 'gold' | 'green' | 'amber'
  segments?: QuizSegmentStatus[]
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  variant = 'standard',
  tone = 'gold',
  segments = [],
  className,
}) => {
  const [mountedWidth, setMountedWidth] = useState(0)
  const clamped = Math.max(0, Math.min(100, value))

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMountedWidth(clamped)
    })
    return () => cancelAnimationFrame(id)
  }, [clamped])

  if (variant === 'segmented') {
    return (
      <div className={cn('flex items-center gap-[2px] w-full', className)}>
        {segments.map((st, idx) => {
          const segClass =
            st === 'correct'
              ? 'bg-gold-base border border-gold-light/40'
              : st === 'wrong'
              ? 'bg-negative border border-negative/50'
              : st === 'current'
              ? 'bg-[rgba(201,168,76,0.20)] border border-gold-base animate-pulse-gold'
              : 'bg-[rgba(255,255,255,0.08)] border border-transparent'
          return (
            <div
              key={idx}
              className={cn(
                'h-[8px] flex-1 min-w-[10px] rounded-full transition-all duration-300',
                segClass
              )}
            />
          )
        })}
      </div>
    )
  }

  const fillColor =
    tone === 'green'
      ? 'bg-positive'
      : tone === 'amber'
      ? 'bg-warning'
      : 'bg-gradient-to-r from-gold-dim via-gold-base to-gold-light'

  return (
    <div
      className={cn(
        'w-full bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden',
        variant === 'thin' ? 'h-[2px]' : 'h-[6px]',
        className
      )}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-[800ms] ease-out', fillColor)}
        style={{ width: `${mountedWidth}%` }}
      />
    </div>
  )
}

export default ProgressBar
