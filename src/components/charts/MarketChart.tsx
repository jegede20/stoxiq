import React, { useId } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { ChartPoint } from '@/services/marketApi'

interface MarketChartProps {
  data: ChartPoint[]
  mode?: 'line' | 'candle'
  height?: number
  showAxes?: boolean
  className?: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ payload: ChartPoint }>
}

const GlassChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null
  const pt = payload[0].payload
  const positive = pt.pctFromOpen >= 0

  return (
    <div className="glass-overlay-surface rounded-[14px] px-4 py-3 !border-[rgba(201,168,76,0.32)] shadow-glass-3">
      <div className="font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-text-accent mb-1">
        {pt.date}
      </div>
      <div className="font-serif text-[20px] font-semibold text-text-primary leading-tight">
        {pt.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </div>
      <div
        className={`mt-1 font-sans text-[12px] font-semibold ${
          positive ? 'text-positive' : 'text-negative'
        }`}
      >
        {positive ? '▲ +' : '▼ '}
        {pt.pctFromOpen.toFixed(2)}% from period open
      </div>
    </div>
  )
}

export const MarketChart: React.FC<MarketChartProps> = ({
  data,
  mode = 'line',
  height = 290,
  showAxes = true,
  className,
}) => {
  const gradId = useId().replace(/:/g, '')

  if (!data || data.length === 0) return null

  if (mode === 'candle') {
    const candleData = data.map((d) => ({
      ...d,
      range: [Math.min(d.open, d.close), Math.max(d.open, d.close)],
      bullish: d.close >= d.open,
    }))

    return (
      <div style={{ height }} className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={candleData} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            {showAxes && (
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#5C5C54', fontSize: 11, fontFamily: 'Inter' }}
                minTickGap={22}
              />
            )}
            <YAxis
              domain={['auto', 'auto']}
              hide={!showAxes}
              axisLine={false}
              tickLine={false}
              width={54}
              tick={{ fill: '#5C5C54', fontSize: 11, fontFamily: 'Inter' }}
              tickFormatter={(v: number) => v.toFixed(0)}
            />
            <Tooltip content={<GlassChartTooltip />} cursor={{ fill: 'rgba(201,168,76,0.05)' }} />
            <Bar
              dataKey="range"
              radius={[3, 3, 3, 3]}
              isAnimationActive={true}
              animationDuration={1200}
            >
              {candleData.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={entry.bullish ? '#C9A84C' : '#F87171'}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div style={{ height }} className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id={`mkt-${gradId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#C9A84C" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
          {showAxes && (
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5C5C54', fontSize: 11, fontFamily: 'Inter' }}
              minTickGap={22}
            />
          )}
          <YAxis
            domain={['dataMin - 12', 'dataMax + 12']}
            hide={!showAxes}
            axisLine={false}
            tickLine={false}
            width={54}
            tick={{ fill: '#5C5C54', fontSize: 11, fontFamily: 'Inter' }}
            tickFormatter={(v: number) => v.toFixed(0)}
          />
          <Tooltip
            content={<GlassChartTooltip />}
            cursor={{ stroke: 'rgba(201,168,76,0.30)', strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#C9A84C"
            strokeWidth={2.2}
            fill={`url(#mkt-${gradId})`}
            dot={false}
            activeDot={{ r: 5, fill: '#E8D08A', stroke: '#0A0A0F', strokeWidth: 2 }}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MarketChart
