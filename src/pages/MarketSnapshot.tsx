import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  ArrowUpDown,
  ArrowRight,
  Info,
  X,
  Clock,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import {
  fetchMarketSnapshot,
  getFallbackMarketData,
  type MarketSnapshotPayload,
  type StockQuoteItem,
} from '@/services/marketApi'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { TickerRow } from '@/components/ui/TickerRow'
import { Sparkline } from '@/components/charts/Sparkline'
import { MarketChart } from '@/components/charts/MarketChart'
import { cn } from '@/lib/utils'

type SortField = 'ticker' | 'name' | 'price' | 'change' | 'changePct' | 'volume'

export const MarketSnapshot: React.FC = () => {
  const { preferences } = useProgress()

  const [market, setMarket] = useState<MarketSnapshotPayload>(() => getFallbackMarketData())
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '3M'>(preferences.defaultTimeRange)
  const [chartMode, setChartMode] = useState<'line' | 'candle'>(preferences.defaultChartView)
  const [moversTab, setMoversTab] = useState<'gainers' | 'losers' | 'active'>('gainers')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<SortField>('volume')
  const [sortAsc, setSortAsc] = useState(false)
  const [hoveredIndexId, setHoveredIndexId] = useState<string | null>(null)
  const [selectedStock, setSelectedStock] = useState<StockQuoteItem | null>(null)
  const [tickPulse, setTickPulse] = useState(false)

  useEffect(() => {
    setTimeRange(preferences.defaultTimeRange)
    setChartMode(preferences.defaultChartView)
  }, [preferences.defaultTimeRange, preferences.defaultChartView])

  useEffect(() => {
    let active = true
    fetchMarketSnapshot(preferences.marketDataEnabled).then((payload) => {
      if (active) setMarket(payload)
    })
    return () => {
      active = false
    }
  }, [preferences.marketDataEnabled])

  // Subtle delayed quote micro-pulse every 9s when marketDataEnabled is ON so TickerRow flash is visible
  useEffect(() => {
    if (!preferences.marketDataEnabled) return
    const timer = setInterval(() => {
      setMarket((prev) => ({
        ...prev,
        stocks: prev.stocks.map((st, idx) => {
          if (idx % 3 !== Math.floor(Date.now() / 1000) % 3) return st
          const delta = Number(((Math.random() - 0.48) * 0.28).toFixed(2))
          const nextPrice = Math.max(1, Number((st.price + delta).toFixed(2)))
          const nextChange = Number((st.change + delta).toFixed(2))
          const baseOpen = Math.max(1, nextPrice - nextChange)
          const nextPct = Number((((nextPrice - baseOpen) / baseOpen) * 100).toFixed(2))
          return { ...st, price: nextPrice, change: nextChange, changePct: nextPct }
        }),
      }))
      setTickPulse(true)
    }, 9000)
    return () => clearInterval(timer)
  }, [preferences.marketDataEnabled])

  const moversList = useMemo(() => {
    const copy = [...market.stocks]
    if (moversTab === 'gainers') {
      return copy.sort((a, b) => b.changePct - a.changePct).slice(0, 3)
    }
    if (moversTab === 'losers') {
      return copy.sort((a, b) => a.changePct - b.changePct).slice(0, 3)
    }
    return copy.sort((a, b) => b.volume - a.volume).slice(0, 3)
  }, [market.stocks, moversTab])

  const filteredAndSortedStocks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    const filtered = market.stocks.filter(
      (s) =>
        !q ||
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
    )

    filtered.sort((a, b) => {
      const mul = sortAsc ? 1 : -1
      if (sortField === 'ticker' || sortField === 'name') {
        return a[sortField].localeCompare(b[sortField]) * mul
      }
      return (a[sortField] - b[sortField]) * mul
    })

    return filtered
  }, [market.stocks, searchQuery, sortField, sortAsc])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev)
    } else {
      setSortField(field)
      setSortAsc(field === 'ticker' || field === 'name')
    }
  }

  const sp500 = market.indices[0]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header + Disclaimer Strip */}
      <div className="space-y-4">
        <Eyebrow className="mb-2">GLOBAL BENCHMARKS</Eyebrow>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h1 className="font-serif text-[36px] sm:text-[48px] font-bold text-text-primary leading-tight">
            The Market, Right Now
          </h1>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] font-sans text-[11px] text-text-tertiary">
            <Clock size={13} strokeWidth={1.5} className="text-gold-base" />
            <span>15-min delayed · Educational use only</span>
          </div>
        </div>

        {market.statusNotice && (
          <div className="font-sans text-[12px] text-text-tertiary flex items-center gap-2">
            <Info size={14} strokeWidth={1.5} className="text-gold-base shrink-0" />
            <span>{market.statusNotice}</span>
          </div>
        )}
      </div>

      {/* INDICES ROW (4 Compact Cards with Hover Plain-English Tooltip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {market.indices.map((idx) => {
          const positive = idx.changePct >= 0
          const showTip = hoveredIndexId === idx.id

          return (
            <div
              key={idx.id}
              className="relative"
              onMouseEnter={() => setHoveredIndexId(idx.id)}
              onMouseLeave={() => setHoveredIndexId(null)}
            >
              <GlassCard tier={2} interactive className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setHoveredIndexId(showTip ? null : idx.id)}
                    className="inline-flex items-center gap-1.5 font-sans text-[12px] font-bold uppercase tracking-[1.8px] text-gold-base cursor-help"
                  >
                    <span>{idx.name}</span>
                    <Info size={13} strokeWidth={1.5} className="text-text-tertiary" />
                  </button>
                  <span
                    className={cn(
                      'font-sans text-[12px] font-semibold tabular-nums',
                      positive ? 'text-positive' : 'text-negative'
                    )}
                  >
                    {positive ? '▲ +' : '▼ '}
                    {idx.changePct.toFixed(2)}%
                  </span>
                </div>

                <div className="font-serif text-[28px] font-semibold text-text-primary tabular-nums leading-none">
                  {idx.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>

                <Sparkline
                  data={idx.sparkline}
                  height={60}
                  color={positive ? 'gold' : 'red'}
                />
              </GlassCard>

              {/* Plain-English Index Explanation Tooltip */}
              {showTip && (
                <div className="absolute z-40 left-0 right-0 top-full mt-2 glass-tier-3 !rounded-[14px] p-4 border border-[rgba(201,168,76,0.32)] shadow-glass-3 pointer-events-none">
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.8px] text-gold-base mb-1">
                    WHAT IS {idx.name}?
                  </span>
                  <p className="font-sans text-[12.5px] leading-[1.6] text-text-secondary">
                    {idx.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* MAIN CHART PANEL (60%) + MARKET MOVERS (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Chart Panel (60% -> 7 cols) */}
        <GlassCard tier={2} className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-1">
                  S&amp;P 500 PERFORMANCE
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-[32px] font-semibold text-text-primary tabular-nums">
                    {sp500.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span
                    className={cn(
                      'font-sans text-[13px] font-semibold tabular-nums',
                      sp500.changePct >= 0 ? 'text-positive' : 'text-negative'
                    )}
                  >
                    {sp500.changePct >= 0 ? '▲ +' : '▼ '}
                    {sp500.changePct.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Line / Candle Segmented Control */}
                <div className="inline-flex p-1 rounded-[10px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
                  {(['line', 'candle'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setChartMode(mode)}
                      className={cn(
                        'px-2.5 py-1 rounded-[7px] font-sans text-[11px] font-bold uppercase tracking-[1px] transition-colors',
                        chartMode === mode
                          ? 'bg-gold-base text-bg-base-0'
                          : 'text-text-secondary hover:text-text-primary'
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* [1D] [1W] [1M] [3M] Segmented Control */}
                <div className="inline-flex p-1 rounded-[10px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
                  {(['1D', '1W', '1M', '3M'] as const).map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setTimeRange(range)}
                      className={cn(
                        'px-3 py-1 rounded-[7px] font-sans text-[12px] font-semibold transition-colors',
                        timeRange === range
                          ? 'bg-gold-base text-bg-base-0'
                          : 'text-text-secondary hover:text-text-primary'
                      )}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <MarketChart
              key={`${timeRange}-${chartMode}`}
              data={market.chartSeries[timeRange]}
              mode={chartMode}
              height={290}
            />
          </div>

          <p className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)] font-sans text-[12px] text-text-tertiary">
            Beginner tip: Notice how zooming out from 1D to 3M smooths out noisy intraday dips into a clearer trend.
          </p>
        </GlassCard>

        {/* Market Movers Panel (40% -> 5 cols) */}
        <GlassCard tier={2} className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-4">
              MARKET MOVERS
            </span>

            {/* Tabs: [Top Gainers] [Top Losers] [Most Active] */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] mb-5">
              {[
                { id: 'gainers' as const, label: 'Top Gainers' },
                { id: 'losers' as const, label: 'Top Losers' },
                { id: 'active' as const, label: 'Most Active' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setMoversTab(t.id)}
                  className={cn(
                    'py-2 px-2 rounded-[9px] font-sans text-[12px] font-semibold transition-all text-center',
                    moversTab === t.id
                      ? 'bg-gold-fill text-gold-base border border-gold-border'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {moversList.map((stock) => (
                <TickerRow
                  key={stock.ticker}
                  ticker={stock.ticker}
                  name={stock.name}
                  price={stock.price}
                  changePct={stock.changePct}
                  flashTick={tickPulse}
                  onClick={() => setSelectedStock(stock)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-[12px] bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.18)] font-sans text-[12.5px] leading-[1.6] text-text-secondary">
            <span className="text-warning font-semibold">Remember:</span> Never buy a stock solely because it appears on a daily Top Gainers list — click any ticker to read what the business actually does.
          </div>
        </GlassCard>
      </div>

      {/* STOCK EXPLORER TABLE */}
      <GlassCard tier={2} className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-[26px] font-semibold text-text-primary">
              Stock &amp; ETF Explorer
            </h2>
            <p className="font-sans text-[13.5px] text-text-secondary mt-0.5">
              Click any company row for an educational plain-English breakdown.
            </p>
          </div>
          <span className="font-sans text-[11px] font-bold uppercase tracking-[1.8px] text-text-tertiary">
            {filteredAndSortedStocks.length} SECURITIES SHOWN
          </span>
        </div>

        {/* Full-Width Glass Search Bar */}
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by ticker (AAPL, SPY), company name, or sector..."
          leftIcon={<Search size={18} strokeWidth={1.5} />}
        />

        {/* Selected Educational Tooltip / Card */}
        {selectedStock && (
          <GlassCard
            tier={3}
            goldEdge
            className="p-6 !rounded-[18px] animate-page-in space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gold-fill border border-gold-border flex items-center justify-center font-sans text-[13px] font-bold text-gold-light">
                  {selectedStock.ticker.slice(0, 3)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-[22px] font-semibold text-text-primary">
                      {selectedStock.name} ({selectedStock.ticker})
                    </h3>
                    <Badge variant="neutral-gold">{selectedStock.sector}</Badge>
                  </div>
                  <span className="font-sans text-[12px] text-text-tertiary">
                    Market Cap: {selectedStock.marketCap} · Current Price: ${selectedStock.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStock(null)}
                aria-label="Close educational card"
                className="p-1.5 rounded-full hover:bg-[rgba(255,255,255,0.06)] text-text-secondary hover:text-text-primary"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-[14px] leading-[1.75]">
              <div className="p-4 rounded-[12px] bg-[rgba(10,10,15,0.45)] border border-[rgba(255,255,255,0.06)]">
                <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-gold-base mb-1">
                  WHAT THEY DO
                </span>
                <p className="text-text-secondary">{selectedStock.whatTheyDo}</p>
              </div>
              <div className="p-4 rounded-[12px] bg-[rgba(10,10,15,0.45)] border border-[rgba(255,255,255,0.06)]">
                <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-gold-base mb-1">
                  EDUCATIONAL LENS
                </span>
                <p className="text-text-secondary">{selectedStock.beginnerNote}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-sans text-[12px] text-text-tertiary">
                Educational company profile · Not a buy/sell recommendation
              </span>
              <Link
                to={selectedStock.lessonRoute}
                className="font-sans text-[13px] font-semibold text-gold-base hover:text-gold-light inline-flex items-center gap-1.5"
              >
                Learn more: {selectedStock.lessonLabel} <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </GlassCard>
        )}

        {/* Sortable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.08)]">
                <th className="py-3.5 px-3 font-sans text-[11px] font-bold uppercase tracking-[1px] text-gold-base w-12">
                  Logo
                </th>
                {[
                  { key: 'ticker' as const, label: 'Ticker' },
                  { key: 'name' as const, label: 'Company' },
                  { key: 'price' as const, label: 'Price' },
                  { key: 'change' as const, label: 'Change' },
                  { key: 'changePct' as const, label: '% Change' },
                  { key: 'volume' as const, label: 'Volume' },
                ].map((col) => (
                  <th key={col.key} className="py-3.5 px-3">
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-[1px] text-gold-base hover:text-gold-light transition-colors"
                    >
                      <span>{col.label}</span>
                      <ArrowUpDown size={12} strokeWidth={1.5} className="opacity-70" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.06)]">
              {filteredAndSortedStocks.map((st) => {
                const pos = st.changePct >= 0
                const isSelected = selectedStock?.ticker === st.ticker
                return (
                  <tr
                    key={st.ticker}
                    onClick={() => setSelectedStock(isSelected ? null : st)}
                    className={cn(
                      'cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.06)]',
                      isSelected && 'bg-[rgba(201,168,76,0.08)]'
                    )}
                  >
                    <td className="py-3.5 px-3">
                      <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.10)] border border-[rgba(201,168,76,0.28)] flex items-center justify-center font-sans text-[10px] font-bold text-gold-light">
                        {st.ticker.slice(0, 2)}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-sans text-[13.5px] font-semibold text-gold-base">
                      {st.ticker}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="font-sans text-[14px] text-text-primary">{st.name}</div>
                      <div className="font-sans text-[11.5px] text-text-tertiary">{st.sector}</div>
                    </td>
                    <td className="py-3.5 px-3 font-sans text-[14px] font-semibold text-text-primary tabular-nums">
                      ${st.price.toFixed(2)}
                    </td>
                    <td
                      className={cn(
                        'py-3.5 px-3 font-sans text-[13.5px] font-semibold tabular-nums',
                        pos ? 'text-positive' : 'text-negative'
                      )}
                    >
                      {pos ? '+' : '-'}${Math.abs(st.change).toFixed(2)}
                    </td>
                    <td
                      className={cn(
                        'py-3.5 px-3 font-sans text-[13.5px] font-semibold tabular-nums',
                        pos ? 'text-positive' : 'text-negative'
                      )}
                    >
                      {pos ? '▲ ' : '▼ '}
                      {Math.abs(st.changePct).toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-3 font-sans text-[13px] text-text-secondary tabular-nums">
                      {st.volumeFormatted}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

export default MarketSnapshot
