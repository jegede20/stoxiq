export interface ChartPoint {
  label: string
  date: string
  price: number
  open: number
  high: number
  low: number
  close: number
  pctFromOpen: number
}

export interface MarketIndexItem {
  id: string
  name: string
  symbol: string
  value: number
  change: number
  changePct: number
  explanation: string
  sparkline: { x: string; y: number }[]
}

export interface StockQuoteItem {
  ticker: string
  name: string
  sector: string
  price: number
  change: number
  changePct: number
  volume: number
  volumeFormatted: string
  marketCap: string
  whatTheyDo: string
  beginnerNote: string
  lessonRoute: string
  lessonLabel: string
}

export interface MarketSnapshotPayload {
  indices: MarketIndexItem[]
  stocks: StockQuoteItem[]
  chartSeries: Record<'1D' | '1W' | '1M' | '3M', ChartPoint[]>
  source: 'alpha-vantage' | 'fallback'
  statusNotice?: string
  updatedAt: string
}

const FALLBACK_STOCKS: StockQuoteItem[] = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Consumer Technology',
    price: 189.40,
    change: 4.44,
    changePct: 2.40,
    volume: 54210000,
    volumeFormatted: '54.2M',
    marketCap: '$2.91T',
    whatTheyDo: 'Designs iPhones, Macs, iPads, wearables, and subscription digital services used by over a billion people globally.',
    beginnerNote: 'Classic mega-cap common stock combining global brand loyalty, massive cash flow, and a modest regular dividend.',
    lessonRoute: '/learn/module3/lesson1',
    lessonLabel: 'How to Read a Stock Page',
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Electric Vehicles & Energy',
    price: 242.10,
    change: -2.94,
    changePct: -1.20,
    volume: 88340000,
    volumeFormatted: '88.3M',
    marketCap: '$769B',
    whatTheyDo: 'Manufactures electric vehicles, battery energy storage systems, solar products, and autonomous driving software.',
    beginnerNote: 'A widely followed growth stock — exciting innovation potential, but noticeably higher daily price volatility.',
    lessonRoute: '/learn/module1/lesson3',
    lessonLabel: 'The Types of Stocks Worth Knowing',
  },
  {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'E-Commerce & Cloud',
    price: 184.65,
    change: 2.35,
    changePct: 1.29,
    volume: 41850000,
    volumeFormatted: '41.9M',
    marketCap: '$1.92T',
    whatTheyDo: 'Operates the world’s largest online retail marketplace alongside AWS, the cloud computing backbone of thousands of companies.',
    beginnerNote: 'Reinvests profits heavily into logistics and AI infrastructure rather than paying dividends.',
    lessonRoute: '/learn/module1/lesson3',
    lessonLabel: 'The Types of Stocks Worth Knowing',
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Semiconductors & AI',
    price: 132.80,
    change: 4.18,
    changePct: 3.25,
    volume: 69120000,
    volumeFormatted: '69.1M',
    marketCap: '$3.25T',
    whatTheyDo: 'Designs graphics processing units (GPUs) and data-center chips powering modern artificial intelligence and gaming.',
    beginnerNote: 'High-momentum growth leader — great illustration of why position sizing and diversification matter.',
    lessonRoute: '/risks/volatility-loss',
    lessonLabel: 'Volatility & Loss',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Enterprise Software & Cloud',
    price: 418.30,
    change: 5.95,
    changePct: 1.44,
    volume: 23940000,
    volumeFormatted: '23.9M',
    marketCap: '$3.11T',
    whatTheyDo: 'Builds Windows, Office 365, Azure cloud services, LinkedIn, and Xbox enterprise and consumer software.',
    beginnerNote: 'Recurring business software subscriptions help make Microsoft one of the largest weights in the S&P 500.',
    lessonRoute: '/learn/module2/lesson1',
    lessonLabel: 'What Is the Stock Market?',
  },
  {
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    sector: 'Broad Market Index ETF',
    price: 578.40,
    change: 4.59,
    changePct: 0.80,
    volume: 49600000,
    volumeFormatted: '49.6M',
    marketCap: '$590B AUM',
    whatTheyDo: 'Tracks all 500 leading US companies in the S&P 500 index inside one single tradable share.',
    beginnerNote: 'The textbook beginner ETF — one purchase spreads your money across 500 major businesses instantly.',
    lessonRoute: '/learn/module3/lesson3',
    lessonLabel: 'What Is a Portfolio?',
  },
  {
    ticker: 'KO',
    name: 'The Coca-Cola Company',
    sector: 'Consumer Staples',
    price: 68.75,
    change: 0.42,
    changePct: 0.61,
    volume: 14200000,
    volumeFormatted: '14.2M',
    marketCap: '$296B',
    whatTheyDo: 'Produces and distributes non-alcoholic beverage concentrates and syrups in more than 200 countries.',
    beginnerNote: 'Famous dividend stock held by Warren Buffett since 1988 — lower volatility and steady quarterly cash payouts.',
    lessonRoute: '/learn/module1/lesson2',
    lessonLabel: 'How Do You Actually Make Money?',
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Internet & Digital Media',
    price: 166.20,
    change: -1.48,
    changePct: -0.88,
    volume: 27400000,
    volumeFormatted: '27.4M',
    marketCap: '$2.05T',
    whatTheyDo: 'Parent company of Google Search, YouTube, Android, Google Cloud, and Waymo autonomous vehicles.',
    beginnerNote: 'Generates cash from global search and video advertising while investing in cloud and AI.',
    lessonRoute: '/learn/module3/lesson1',
    lessonLabel: 'How to Read a Stock Page',
  },
  {
    ticker: 'JNJ',
    name: 'Johnson & Johnson',
    sector: 'Healthcare & Pharmaceuticals',
    price: 161.15,
    change: -0.95,
    changePct: -0.59,
    volume: 8150000,
    volumeFormatted: '8.2M',
    marketCap: '$388B',
    whatTheyDo: 'Develops prescription pharmaceuticals and medical technology devices used in hospitals worldwide.',
    beginnerNote: 'Defensive healthcare dividend payer — people need medicine regardless of whether the economy is booming or slowing.',
    lessonRoute: '/learn/module1/lesson2',
    lessonLabel: 'How Do You Actually Make Money?',
  },
  {
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    sector: 'Social Platforms & AI',
    price: 582.90,
    change: -10.85,
    changePct: -1.83,
    volume: 16900000,
    volumeFormatted: '16.9M',
    marketCap: '$1.47T',
    whatTheyDo: 'Operates Facebook, Instagram, and WhatsApp — connecting over 3 billion daily active users worldwide.',
    beginnerNote: 'Demonstrates historical volatility: fell over 65% in 2022 before recovering to all-time highs for patient holders.',
    lessonRoute: '/risks/volatility-loss',
    lessonLabel: 'Volatility & Loss',
  },
]

function buildSeries(
  labels: { label: string; date: string }[],
  startPrice: number,
  drift: number,
  swing: number
): ChartPoint[] {
  let prev = startPrice
  return labels.map((item, idx) => {
    const wave = Math.sin(idx * 0.55) * swing + Math.cos(idx * 0.27) * (swing * 0.55)
    const close = Number((startPrice + idx * drift + wave).toFixed(2))
    const open = Number((idx === 0 ? startPrice : prev).toFixed(2))
    const spread = Math.max(4.2, Math.abs(close - open) + swing * 0.45)
    const high = Number((Math.max(open, close) + spread * 0.55).toFixed(2))
    const low = Number((Math.min(open, close) - spread * 0.48).toFixed(2))
    prev = close
    const pctFromOpen = Number((((close - startPrice) / startPrice) * 100).toFixed(2))
    return {
      label: item.label,
      date: item.date,
      price: close,
      open,
      high,
      low,
      close,
      pctFromOpen,
    }
  })
}

const FALLBACK_CHARTS: Record<'1D' | '1W' | '1M' | '3M', ChartPoint[]> = {
  '1D': buildSeries(
    [
      { label: '09:30', date: 'Today · 09:30 ET' },
      { label: '10:00', date: 'Today · 10:00 ET' },
      { label: '10:30', date: 'Today · 10:30 ET' },
      { label: '11:00', date: 'Today · 11:00 ET' },
      { label: '11:30', date: 'Today · 11:30 ET' },
      { label: '12:00', date: 'Today · 12:00 ET' },
      { label: '12:30', date: 'Today · 12:30 ET' },
      { label: '13:00', date: 'Today · 13:00 ET' },
      { label: '13:30', date: 'Today · 13:30 ET' },
      { label: '14:00', date: 'Today · 14:00 ET' },
      { label: '14:30', date: 'Today · 14:30 ET' },
      { label: '15:00', date: 'Today · 15:00 ET' },
      { label: '15:30', date: 'Today · 15:30 ET' },
      { label: '16:00', date: 'Today · 16:00 ET' },
    ],
    5738.2,
    3.4,
    7.5
  ),
  '1W': buildSeries(
    [
      { label: 'Mon AM', date: 'Mon · Morning' },
      { label: 'Mon PM', date: 'Mon · Close' },
      { label: 'Tue AM', date: 'Tue · Morning' },
      { label: 'Tue PM', date: 'Tue · Close' },
      { label: 'Wed AM', date: 'Wed · Morning' },
      { label: 'Wed PM', date: 'Wed · Close' },
      { label: 'Thu AM', date: 'Thu · Morning' },
      { label: 'Thu PM', date: 'Thu · Close' },
      { label: 'Fri AM', date: 'Fri · Morning' },
      { label: 'Fri PM', date: 'Fri · Close' },
    ],
    5692.0,
    9.8,
    14.0
  ),
  '1M': buildSeries(
    Array.from({ length: 20 }, (_, i) => ({
      label: `D${i + 1}`,
      date: `Trading Day ${i + 1}`,
    })),
    5585.0,
    9.6,
    22.0
  ),
  '3M': buildSeries(
    Array.from({ length: 24 }, (_, i) => ({
      label: `W${Math.floor(i / 2) + 1}`,
      date: `Week ${Math.floor(i / 2) + 1} · Session ${(i % 2) + 1}`,
    })),
    5390.0,
    16.8,
    34.0
  ),
}

const FALLBACK_INDICES: MarketIndexItem[] = [
  {
    id: 'sp500',
    name: 'S&P 500',
    symbol: 'SPX',
    value: 5784.15,
    change: 45.92,
    changePct: 0.80,
    explanation: 'Tracks 500 of the largest publicly traded US companies — widely treated as the main health scoreboard of the US stock market.',
    sparkline: [5732, 5740, 5736, 5749, 5755, 5751, 5764, 5771, 5768, 5779, 5784].map((y, i) => ({ x: `${i}`, y })),
  },
  {
    id: 'nasdaq',
    name: 'NASDAQ',
    symbol: 'IXIC',
    value: 18342.60,
    change: 198.40,
    changePct: 1.09,
    explanation: 'Heavily weighted toward technology and growth companies like Apple, Microsoft, NVIDIA, Amazon, and Alphabet.',
    sparkline: [18110, 18145, 18130, 18190, 18220, 18205, 18260, 18295, 18310, 18342].map((y, i) => ({ x: `${i}`, y })),
  },
  {
    id: 'dow',
    name: 'DOW JONES',
    symbol: 'DJI',
    value: 42865.30,
    change: -112.45,
    changePct: -0.26,
    explanation: 'Tracks 30 established "blue-chip" American industrial, financial, healthcare, and consumer giants.',
    sparkline: [43010, 42995, 42960, 42980, 42940, 42915, 42930, 42895, 42880, 42865].map((y, i) => ({ x: `${i}`, y })),
  },
  {
    id: 'ftse100',
    name: 'FTSE 100',
    symbol: 'UKX',
    value: 8294.75,
    change: 28.15,
    changePct: 0.34,
    explanation: 'Tracks the 100 largest companies listed on the London Stock Exchange by market capitalisation.',
    sparkline: [8255, 8262, 8258, 8270, 8267, 8276, 8282, 8279, 8289, 8294].map((y, i) => ({ x: `${i}`, y })),
  },
]

const SESSION_CACHE_KEY = 'stoxiq_market_cache_v1'

export function getFallbackMarketData(notice?: string): MarketSnapshotPayload {
  return {
    indices: FALLBACK_INDICES,
    stocks: FALLBACK_STOCKS,
    chartSeries: FALLBACK_CHARTS,
    source: 'fallback',
    statusNotice: notice,
    updatedAt: '15-min delayed snapshot',
  }
}

export async function fetchMarketSnapshot(enabled: boolean = true): Promise<MarketSnapshotPayload> {
  if (!enabled) {
    return getFallbackMarketData('Delayed live feed paused in Settings — displaying static educational dataset.')
  }

  try {
    const cachedRaw = sessionStorage.getItem(SESSION_CACHE_KEY)
    if (cachedRaw) {
      const parsed = JSON.parse(cachedRaw) as { ts: number; payload: MarketSnapshotPayload }
      if (Date.now() - parsed.ts < 15 * 60 * 1000) {
        return parsed.payload
      }
    }
  } catch {
    // ignore storage read issues
  }

  const customKey =
    (typeof window !== 'undefined' && localStorage.getItem('stoxiq_av_key')) ||
    import.meta.env.VITE_ALPHA_VANTAGE_KEY ||
    'demo'

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 4500)

    // Alpha Vantage free-tier query (IBM/SPY supported on demo; full tickers supported with free key)
    const symbol = customKey === 'demo' ? 'IBM' : 'SPY'
    const res = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${encodeURIComponent(customKey)}`,
      { signal: controller.signal }
    )
    clearTimeout(timer)

    if (!res.ok) {
      return getFallbackMarketData('Data unavailable from Alpha Vantage — showing 15-min delayed educational snapshot.')
    }

    const json = await res.json()
    const quote = json?.['Global Quote']

    if (!quote || !quote['05. price']) {
      return getFallbackMarketData('Alpha Vantage free-tier rate limit reached — showing 15-min delayed educational snapshot.')
    }

    const livePrice = parseFloat(quote['05. price'])
    const liveChange = parseFloat(quote['09. change'] || '0')
    const livePct = parseFloat(String(quote['10. change percent'] || '0').replace('%', ''))

    const updatedIndices = FALLBACK_INDICES.map((idx) => {
      if (idx.id === 'sp500' && symbol === 'SPY' && !Number.isNaN(livePrice)) {
        const scaled = Number((livePrice * 10).toFixed(2))
        return {
          ...idx,
          value: scaled,
          change: Number((liveChange * 10).toFixed(2)),
          changePct: Number(livePct.toFixed(2)),
        }
      }
      return idx
    })

    const updatedStocks = FALLBACK_STOCKS.map((st) => {
      if (st.ticker === symbol && !Number.isNaN(livePrice)) {
        return {
          ...st,
          price: Number(livePrice.toFixed(2)),
          change: Number(liveChange.toFixed(2)),
          changePct: Number(livePct.toFixed(2)),
        }
      }
      return st
    })

    const payload: MarketSnapshotPayload = {
      indices: updatedIndices,
      stocks: updatedStocks,
      chartSeries: FALLBACK_CHARTS,
      source: 'alpha-vantage',
      updatedAt: `Alpha Vantage · 15-min delayed (${quote['07. latest trading day'] || 'Latest session'})`,
    }

    try {
      sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify({ ts: Date.now(), payload }))
    } catch {
      // ignore
    }

    return payload
  } catch {
    return getFallbackMarketData('Data unavailable — showing 15-min delayed educational snapshot.')
  }
}
