import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TickerRowProps {
  ticker: string
  name: string
  price: number
  changePct: number
  onClick?: () => void
  compact?: boolean
  flashTick?: boolean
}

export const TickerRow: React.FC<TickerRowProps> = ({
  ticker,
  name,
  price,
  changePct,
  onClick,
  compact = false,
  flashTick = false,
}) => {
  const [flashClass, setFlashClass] = useState('')
  const positive = changePct >= 0

  useEffect(() => {
    if (!flashTick) return
    setFlashClass(positive ? 'flash-up' : 'flash-down')
    const t = setTimeout(() => setFlashClass(''), 260)
    return () => clearTimeout(t)
  }, [price, changePct, flashTick, positive])

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick()
            }
          : undefined
      }
      className={cn(
        'group flex items-center justify-between rounded-[12px] border border-transparent border-l-2 border-l-transparent transition-all duration-200',
        compact ? 'px-3 py-2.5' : 'px-4 py-3',
        'hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.08)] hover:border-l-gold-base',
        onClick && 'cursor-pointer',
        flashClass
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-[24px] h-[24px] rounded-full bg-[rgba(201,168,76,0.10)] border border-[rgba(201,168,76,0.28)] flex items-center justify-center shrink-0">
          <span className="font-sans text-[10px] font-bold text-gold-light">
            {ticker.slice(0, 2)}
          </span>
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-sans text-[13px] font-semibold text-gold-base tracking-[0.4px]">
            {ticker}
          </span>
          <span className="font-sans text-[13px] text-text-secondary truncate">
            {name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-3">
        <span className="font-sans text-[14px] font-semibold text-text-primary tabular-nums">
          ${price.toFixed(2)}
        </span>
        <span
          className={cn(
            'font-sans text-[13px] font-semibold tabular-nums min-w-[68px] text-right',
            positive ? 'text-positive' : 'text-negative'
          )}
        >
          {positive ? '▲' : '▼'} {Math.abs(changePct).toFixed(2)}%
        </span>
      </div>
    </div>
  )
}

export default TickerRow
