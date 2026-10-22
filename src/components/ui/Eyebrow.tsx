import React from 'react'
import { cn } from '@/lib/utils'

interface EyebrowProps {
  children: React.ReactNode
  align?: 'left' | 'center'
  tone?: 'gold' | 'amber'
  showLines?: boolean
  className?: string
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  align = 'left',
  tone = 'gold',
  showLines = true,
  className,
}) => {
  const lineColor =
    tone === 'amber' ? 'bg-[rgba(245,158,11,0.35)]' : 'bg-[rgba(201,168,76,0.30)]'
  const textColor = tone === 'amber' ? 'text-warning' : 'text-gold-base'

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 font-sans text-[11px] font-bold uppercase tracking-[2px]',
        align === 'center' && 'justify-center mx-auto',
        textColor,
        className
      )}
    >
      {showLines && <span className={cn('w-[24px] h-[1px] shrink-0', lineColor)} />}
      <span>{children}</span>
      {showLines && <span className={cn('w-[24px] h-[1px] shrink-0', lineColor)} />}
    </div>
  )
}

export default Eyebrow
