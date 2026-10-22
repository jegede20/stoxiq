import React, { useId } from 'react'
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts'

interface SparklineProps {
  data: { x: string; y: number }[]
  height?: number
  color?: 'gold' | 'red'
  className?: string
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  height = 60,
  color = 'gold',
  className,
}) => {
  const gradId = useId().replace(/:/g, '')
  const stroke = color === 'red' ? '#F87171' : '#C9A84C'

  if (!data || data.length === 0) return null

  return (
    <div style={{ height }} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 2 }}>
          <defs>
            <linearGradient id={`spark-${gradId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.22} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis domain={['dataMin - 2', 'dataMax + 2']} hide />
          <Area
            type="monotone"
            dataKey="y"
            stroke={stroke}
            strokeWidth={1.8}
            fill={`url(#spark-${gradId})`}
            dot={false}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Sparkline
