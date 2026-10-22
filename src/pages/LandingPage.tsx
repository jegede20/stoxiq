import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Landmark,
  TrendingUp,
  AlertTriangle,
  Globe,
  ShoppingBag,
  Menu,
  X,
  Check,
  BarChart3,
  Sparkles,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { lessonKeyToRoute } from '@/data/curriculum'
import { ALL_BROKERS_FLAT, REGIONS_META } from '@/data/brokers'
import { fetchMarketSnapshot, getFallbackMarketData, type MarketSnapshotPayload } from '@/services/marketApi'
import { StoxLogo } from '@/components/ui/StoxLogo'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { TickerRow } from '@/components/ui/TickerRow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { RegionEmblem, RegionWatermark } from '@/components/ui/RegionWatermark'
import { MarketChart } from '@/components/charts/MarketChart'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const {
    isLoaded,
    hasReturningProgress,
    meta,
    region,
    preferences,
    setRegion,
    getModuleProgress,
    progress,
  } = useProgress()

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [marketData, setMarketData] = useState<MarketSnapshotPayload>(() => getFallbackMarketData())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let active = true
    fetchMarketSnapshot(preferences.marketDataEnabled).then((payload) => {
      if (active) setMarketData(payload)
    })
    return () => {
      active = false
    }
  }, [preferences.marketDataEnabled])

  const risksVisitedPct = Math.round(
    (Object.values(progress.risks).filter((r) => r.visited).length / 4) * 100
  )
  const regionProgressPct = region ? 100 : 0

  const learningCards = [
    {
      title: 'What Is a Stock?',
      desc: 'Understand ownership, shares, capital gains, dividends, and why ETFs simplify your start.',
      Icon: BookOpen,
      pct: getModuleProgress('module1'),
      to: '/learn/module1',
    },
    {
      title: 'How the Market Works',
      desc: 'Explore NYSE, NASDAQ, LSE & JSE, market hours, indices, and bull vs bear cycles.',
      Icon: Landmark,
      pct: getModuleProgress('module2'),
      to: '/learn/module2',
    },
    {
      title: 'Reading Charts & Data',
      desc: 'Decode ticker symbols, market cap, long-term price trends, and portfolio diversification.',
      Icon: TrendingUp,
      pct: getModuleProgress('module3'),
      to: '/learn/module3',
    },
    {
      title: 'Risks & What to Watch For',
      desc: 'Protect your savings against panic selling, FOMO hype, pump-and-dumps, and fake brokers.',
      Icon: AlertTriangle,
      pct: risksVisitedPct,
      to: '/risks',
    },
    {
      title: 'Choosing Your Platform',
      desc: 'Compare regulated beginner apps tailored specifically to the US, UK, and Africa.',
      Icon: Globe,
      pct: regionProgressPct,
      to: '/platforms',
    },
    {
      title: 'Buying Your First Stock',
      desc: 'Master market vs limit orders and walk through our 6-point Pre-Buy Checklist.',
      Icon: ShoppingBag,
      pct: getModuleProgress('module4'),
      to: '/learn/module4',
    },
  ]

  const resumeRoute = lessonKeyToRoute(meta.lastLesson)

  return (
    <div className="min-h-screen bg-bg-base-0 text-text-secondary overflow-x-hidden">
      {/* SECTION A: FIXED NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? 'glass-tier-2 !rounded-none border-t-0 border-x-0 border-b border-[rgba(255,255,255,0.08)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between">
          <StoxLogo to="/" size="md" showTagline />

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Learn', to: '/learn' },
              { label: 'Platforms', to: '/platforms' },
              { label: 'Market', to: '/market' },
              { label: 'Quiz', to: '/quiz' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-sans text-[14px] text-text-secondary hover:text-gold-base transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="!px-5 !py-2.5"
            >
              Get Started <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden w-10 h-10 rounded-[12px] border border-[rgba(255,255,255,0.10)] flex items-center justify-center text-text-primary hover:border-gold-border transition-colors"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Glass Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 glass-tier-3 !rounded-none p-6 flex flex-col justify-between md:hidden animate-page-in">
          <div className="flex items-center justify-between">
            <StoxLogo to="/" size="md" showTagline onClick={() => setMobileMenuOpen(false)} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="w-10 h-10 rounded-[12px] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-text-primary"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col gap-4 my-auto">
            {[
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'Learn Curriculum', to: '/learn' },
              { label: 'Watch Out For', to: '/risks' },
              { label: 'Platforms Directory', to: '/platforms' },
              { label: 'Live Market', to: '/market' },
              { label: 'Knowledge Quiz', to: '/quiz' },
              { label: 'Settings', to: '/settings' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-[26px] text-text-primary hover:text-gold-base transition-colors py-1.5 border-b border-[rgba(255,255,255,0.06)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              setMobileMenuOpen(false)
              navigate('/learn')
            }}
          >
            Start Learning Free <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </div>
      )}

      {/* SECTION B: HERO (100vh, two-column 60/40 split) */}
      <section className="hero-layered-bg relative min-h-screen flex flex-col justify-center pt-[96px] pb-16 overflow-hidden">
        <div className="noise-overlay absolute inset-0" />

        {/* Returning User Banner */}
        {isLoaded && hasReturningProgress && (
          <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 mb-6">
            <div className="glass-tier-2 glass-gold-edge px-5 py-3.5 rounded-[14px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Sparkles size={18} strokeWidth={1.5} className="text-gold-base shrink-0" />
                <span className="font-sans text-[14px] text-text-primary">
                  Welcome back! Resume where you left off.
                </span>
              </div>
              <Link
                to={resumeRoute}
                className="inline-flex items-center gap-1.5 font-sans text-[13px] font-bold text-gold-base hover:text-gold-light transition-colors"
              >
                Resume Learning <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        )}

        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT COLUMN (60% -> 7 of 12 cols) */}
          <div className="lg:col-span-7">
            <div className="animate-hero-fade-up" style={{ animationDelay: '0s' }}>
              <Eyebrow className="mb-6">FREE STOCK MARKET EDUCATION</Eyebrow>
            </div>

            <h1 className="font-serif font-bold text-[42px] sm:text-[54px] xl:text-[64px] leading-[1.15] tracking-[-1px] mb-6">
              <span
                className="block text-text-primary animate-hero-fade-up"
                style={{ animationDelay: '0s' }}
              >
                Knowledge Is the
              </span>
              <span
                className="block text-text-primary animate-hero-fade-up"
                style={{ animationDelay: '0.2s' }}
              >
                First Stock You
              </span>
              <span
                className="block text-gold-base animate-gold-bloom"
                style={{ animationDelay: '0.45s' }}
              >
                Should Ever Buy.
              </span>
            </h1>

            <p
              className="font-sans text-[17px] sm:text-[18px] leading-[1.8] text-text-secondary max-w-[590px] mb-8 animate-hero-fade-up"
              style={{ animationDelay: '0.7s' }}
            >
              StoxIQ is your complete beginner-friendly guide to understanding stocks, the market,
              and where to start — built for the US, UK, and Africa.
            </p>

            <div
              className="flex flex-wrap items-center gap-[16px] animate-hero-fade-up"
              style={{ animationDelay: '0.9s' }}
            >
              <Button variant="primary" size="lg" onClick={() => navigate('/learn')}>
                Start Learning Free <ArrowRight size={18} strokeWidth={1.5} />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/platforms')}>
                Explore Platforms
              </Button>
            </div>

            <div
              className="mt-6 flex items-center gap-2 font-sans text-[12px] animate-hero-fade-up"
              style={{ animationDelay: '1.1s' }}
            >
              <Check size={14} strokeWidth={2} className="text-positive" />
              <span className="text-text-tertiary">
                No account needed · Progress saved automatically
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: HERO VISUAL (40% -> 5 of 12 cols) */}
          <div className="lg:col-span-5 relative py-6">
            {/* Large Radial Gold Glow (8%) Behind Chart */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -m-10 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_68%)]"
            />

            {/* Decorative barely-visible Playfair ticker watermark (6% opacity) */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute -bottom-6 left-0 right-0 text-center font-serif font-bold text-[22px] sm:text-[26px] tracking-[6px] text-text-primary opacity-[0.06]"
            >
              AAPL TSLA AMZN NVDA MSFT
            </div>

            {/* Main Glass Card (Tier 3, radius 24px, gold edge) */}
            <GlassCard tier={3} goldEdge className="relative p-6 sm:p-7">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-gold-base">
                    S&P 500 BENCHMARK
                  </span>
                  <span className="font-serif text-[26px] font-semibold text-text-primary">
                    5,784.15
                  </span>
                </div>
              </div>

              <div className="relative">
                {/* Floating Tooltip Inside Chart Area */}
                <div className="glass-tier-3 !rounded-[12px] px-3 py-1.5 border border-[rgba(201,168,76,0.35)] absolute top-3 right-6 z-10 pointer-events-none">
                  <span className="font-sans text-[12px] font-semibold text-gold-light">
                    AAPL +2.4% ↑
                  </span>
                </div>

                <MarketChart
                  data={marketData.chartSeries['1M']}
                  height={230}
                  showAxes={true}
                />
              </div>

              <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] font-sans text-text-tertiary">
                <span>1M Upward Trend</span>
                <span>15-min delayed snapshot</span>
              </div>
            </GlassCard>

            {/* Floating Hero Card 1 (top-left) */}
            <div className="hidden sm:flex items-center gap-2.5 glass-tier-3 !rounded-[12px] px-3.5 py-2.5 absolute -top-2 -left-4 animate-float-1 z-20">
              <div className="w-6 h-6 rounded-full bg-[rgba(74,222,128,0.14)] border border-[rgba(74,222,128,0.3)] flex items-center justify-center text-[10px] font-bold text-positive">
                A
              </div>
              <span className="font-sans text-[12px] font-semibold text-text-primary">
                AAPL $189.40 <span className="text-positive">▲ 2.4%</span>
              </span>
            </div>

            {/* Floating Hero Card 2 (bottom-right) */}
            <div className="hidden sm:flex items-center gap-2.5 glass-tier-3 !rounded-[12px] px-3.5 py-2.5 absolute -bottom-2 -right-3 animate-float-2 z-20">
              <div className="w-6 h-6 rounded-full bg-[rgba(248,113,113,0.14)] border border-[rgba(248,113,113,0.3)] flex items-center justify-center text-[10px] font-bold text-negative">
                T
              </div>
              <span className="font-sans text-[12px] font-semibold text-text-primary">
                TSLA $242.10 <span className="text-negative">▼ 1.2%</span>
              </span>
            </div>

            {/* Floating Hero Card 3 (top-right) */}
            <div className="hidden sm:flex items-center gap-2 glass-tier-3 glass-gold-edge !rounded-[12px] px-3.5 py-2 absolute -top-2 -right-3 animate-float-3 z-20">
              <BarChart3 size={15} strokeWidth={1.5} className="text-gold-base" />
              <span className="font-sans text-[12px] font-semibold text-gold-light">
                S&P 500 ▲ 0.8%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: STATS TRUST BAR */}
      <section className="glass-tier-1 !rounded-none border-x-0 border-b border-[rgba(255,255,255,0.06)] border-t border-t-[rgba(201,168,76,0.32)]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[rgba(201,168,76,0.22)]">
          {[
            { num: '4 Modules', label: 'COMPLETE BEGINNER CURRICULUM' },
            { num: '3 Regions', label: 'US, UK & AFRICA COVERED' },
            { num: '9 Platforms', label: 'CURATED BROKER DIRECTORY' },
            { num: 'No Account', label: 'PROGRESS SAVED LOCALLY' },
          ].map((stat) => (
            <div key={stat.num} className="lg:px-8 first:lg:pl-0 last:lg:pr-0 text-center sm:text-left">
              <div className="font-serif text-[28px] sm:text-[32px] font-semibold text-gold-base mb-1.5">
                {stat.num}
              </div>
              <div className="font-sans text-[11px] font-bold uppercase tracking-[1.8px] text-text-tertiary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION D: WHAT YOU'LL LEARN */}
      <section className="relative py-24 px-5 sm:px-8 max-w-[1440px] mx-auto">
        <ScrollReveal className="text-center mb-14">
          <Eyebrow align="center" className="mb-4">
            CURRICULUM OVERVIEW
          </Eyebrow>
          <h2 className="font-serif text-[36px] sm:text-[48px] font-bold text-text-primary mb-3">
            Everything a Beginner Needs
          </h2>
          <p className="font-sans text-[16px] text-text-secondary max-w-[600px] mx-auto">
            Plain-English lessons structured sequentially so you never feel lost in Wall Street jargon.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningCards.map((card, i) => (
            <ScrollReveal key={card.title} delayMs={i * 70}>
              <Link to={card.to} className="block h-full">
                <GlassCard tier={2} interactive className="p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-11 h-11 rounded-[12px] bg-gold-fill border border-[rgba(201,168,76,0.25)] flex items-center justify-center mb-5">
                      <card.Icon size={22} strokeWidth={1.5} className="text-gold-base" />
                    </div>
                    <h3 className="font-serif text-[20px] font-medium text-text-primary mb-2.5">
                      {card.title}
                    </h3>
                    <p className="font-sans text-[14px] leading-[1.75] text-text-secondary mb-6">
                      {card.desc}
                    </p>
                  </div>

                  <div>
                    <ProgressBar value={card.pct} variant="thin" className="mb-3.5" />
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-[12px] font-semibold text-gold-base inline-flex items-center gap-1.5">
                        Start <ArrowRight size={13} strokeWidth={1.5} />
                      </span>
                      {card.pct > 0 && (
                        <span className="font-sans text-[11px] text-text-tertiary tabular-nums">
                          {card.pct}%
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SECTION E: REGION SELECTOR */}
      <section className="relative py-24 px-5 sm:px-8 max-w-[1440px] mx-auto">
        <ScrollReveal className="text-center mb-14">
          <Eyebrow align="center" className="mb-4">
            GLOBAL ACCESS
          </Eyebrow>
          <h2 className="font-serif text-[36px] sm:text-[48px] font-bold text-text-primary mb-3">
            Built for Where You Are
          </h2>
          <p className="font-sans text-[16px] text-text-secondary max-w-[600px] mx-auto">
            Regulations, currencies, and beginner apps differ by country. Choose your region for step-by-step platform guides.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REGIONS_META.map((reg, idx) => {
            const isUserRegion = region === reg.id
            return (
              <ScrollReveal key={reg.id} delayMs={idx * 90}>
                <div
                  onClick={() => {
                    setRegion(reg.id)
                    navigate(`/platforms/${reg.id}`)
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setRegion(reg.id)
                      navigate(`/platforms/${reg.id}`)
                    }
                  }}
                  style={
                    {
                      '--region-ambient': reg.ambientHover,
                    } as React.CSSProperties
                  }
                  className="group cursor-pointer h-full"
                >
                  <GlassCard
                    tier={2}
                    goldEdge={isUserRegion}
                    interactive
                    className="relative overflow-hidden p-7 min-h-[260px] h-full flex flex-col justify-between"
                  >
                    {/* Region-specific hover glow */}
                    <div
                      aria-hidden="true"
                      style={{ background: `radial-gradient(circle at top right, ${reg.ambientHover}, transparent 70%)` }}
                      className="pointer-events-none absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* 15% Watermark */}
                    <div className="absolute -bottom-3 -right-3">
                      <RegionWatermark region={reg.id} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-5">
                        <RegionEmblem region={reg.id} size="md" />
                        {isUserRegion && <Badge variant="your-region">YOUR REGION</Badge>}
                      </div>

                      <h3 className="font-serif text-[24px] font-semibold text-text-primary mb-2">
                        {reg.name}
                      </h3>
                      <p className="font-sans text-[14px] text-text-secondary mb-2">
                        {reg.brokerPreview}
                      </p>
                      {reg.countriesSubtext && (
                        <p className="font-sans text-[12px] text-text-tertiary">
                          {reg.countriesSubtext}
                        </p>
                      )}
                    </div>

                    <div className="relative z-10 pt-5 mt-5 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                      <span className="font-sans text-[11px] font-bold uppercase tracking-[1.6px] text-gold-base">
                        {reg.platformCountLabel}
                      </span>
                      <span className="font-sans text-[13px] text-text-primary group-hover:text-gold-light inline-flex items-center gap-1 transition-colors">
                        Explore <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </div>
                  </GlassCard>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Broker Logo Marquee Strip */}
        <div className="mt-12 marquee-mask overflow-hidden py-2">
          <div className="flex items-center gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...ALL_BROKERS_FLAT, ...ALL_BROKERS_FLAT].map((broker, idx) => (
              <Link
                key={`${broker.id}-${idx}`}
                to={`/platforms/${broker.region}/${broker.id}`}
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-tier-2 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 hover:border-gold-border transition-all duration-200"
              >
                <span
                  style={{ backgroundColor: `${broker.accentColor}22`, color: broker.accentColor }}
                  className="w-6 h-6 rounded-full flex items-center justify-center font-sans text-[10px] font-bold border border-[rgba(255,255,255,0.12)]"
                >
                  {broker.shortCode}
                </span>
                <span className="font-sans text-[13px] font-medium text-text-primary">
                  {broker.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION F: LIVE MARKET SNAPSHOT */}
      <section className="relative py-24 px-5 sm:px-8 max-w-[1440px] mx-auto">
        <ScrollReveal className="text-center mb-12">
          <Eyebrow align="center" className="mb-4">
            MARKET PULSE
          </Eyebrow>
          <h2 className="font-serif text-[36px] sm:text-[48px] font-bold text-text-primary mb-2">
            The Market, Right Now
          </h2>
          <p className="font-sans text-[15px] text-text-secondary">
            Real-world prices move on supply, demand, and company earnings — explore how major benchmarks behave.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <GlassCard tier={1} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
                      S&P 500 INDEX
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="font-serif text-[30px] font-semibold text-text-primary">
                        {marketData.indices[0]?.value.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                      <span className="font-sans text-[13px] font-semibold text-positive">
                        ▲ +{marketData.indices[0]?.changePct.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/market"
                    className="font-sans text-[13px] font-semibold text-gold-base hover:text-gold-light inline-flex items-center gap-1"
                  >
                    Full Market View <ArrowRight size={14} strokeWidth={1.5} />
                  </Link>
                </div>

                <MarketChart data={marketData.chartSeries['1D']} height={250} />
              </div>

              <div className="lg:col-span-5 space-y-1.5">
                <div className="px-4 pb-2 font-sans text-[10px] font-bold uppercase tracking-[2px] text-text-tertiary">
                  WATCHED BENCHMARK EQUITIES
                </div>
                {marketData.stocks.slice(0, 5).map((st) => (
                  <TickerRow
                    key={st.ticker}
                    ticker={st.ticker}
                    name={st.name}
                    price={st.price}
                    changePct={st.changePct}
                    onClick={() => navigate('/market')}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center justify-between gap-2 font-sans text-[11px] text-text-tertiary">
              <span>15-min delayed · Educational purposes only</span>
              {marketData.statusNotice && <span>{marketData.statusNotice}</span>}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* SECTION G: HOW IT WORKS */}
      <section className="relative py-24 px-5 sm:px-8 max-w-[1440px] mx-auto">
        <ScrollReveal className="text-center mb-16">
          <Eyebrow align="center" className="mb-4">
            YOUR ROADMAP
          </Eyebrow>
          <h2 className="font-serif text-[36px] sm:text-[48px] font-bold text-text-primary">
            How StoxIQ Works
          </h2>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connecting Gold Dashed Line on Desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 left-10 right-10 -translate-y-1/2 border-t border-dashed border-[rgba(201,168,76,0.35)] z-0"
          />

          {[
            {
              step: '01',
              title: 'Pick Your Region',
              desc: 'Select the US, UK, or Africa so platform rules, currencies, and regulators match where you live.',
            },
            {
              step: '02',
              title: 'Learn the Modules',
              desc: 'Read 12 bite-sized lessons covering ownership, exchanges, charts, ETFs, and order types.',
            },
            {
              step: '03',
              title: 'Test Your Knowledge',
              desc: 'Unlock module quizzes and the 20-question StoxIQ Challenge with instant explanations.',
            },
            {
              step: '04',
              title: 'Buy Your First Stock',
              desc: 'Follow our interactive broker step-by-step checklist when you feel calm and ready.',
            },
          ].map((item, idx) => (
            <ScrollReveal key={item.step} delayMs={idx * 90} className="relative z-10">
              <GlassCard
                tier={2}
                interactive
                className="relative overflow-hidden p-7 h-full bg-[#13131F]/85"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -top-3 right-4 font-serif font-bold text-[72px] leading-none text-gold-base opacity-[0.10]"
                >
                  {item.step}
                </span>
                <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-4">
                  STEP {item.step}
                </span>
                <h3 className="font-serif text-[21px] font-medium text-text-primary mb-2.5">
                  {item.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.75] text-text-secondary">
                  {item.desc}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SECTION H: FOOTER */}
      <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#0A0A0F] pt-16 pb-12 px-5 sm:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
            {/* Left */}
            <div>
              <StoxLogo to="/" size="lg" showTagline className="mb-4" />
              <p className="font-sans text-[14px] leading-[1.8] text-text-secondary max-w-sm mt-3">
                Zero accounts, zero paywalls, zero tracking servers. Built to give beginners
                institutional-grade clarity before risking a single dollar, pound, rand, or naira.
              </p>
            </div>

            {/* Center */}
            <div>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-4">
                QUICK NAVIGATION
              </h4>
              <div className="grid grid-cols-2 gap-2.5 font-sans text-[14px]">
                <Link to="/dashboard" className="text-text-secondary hover:text-gold-light transition-colors">
                  Dashboard
                </Link>
                <Link to="/learn" className="text-text-secondary hover:text-gold-light transition-colors">
                  Curriculum
                </Link>
                <Link to="/risks" className="text-text-secondary hover:text-gold-light transition-colors">
                  Watch Out For
                </Link>
                <Link to="/platforms" className="text-text-secondary hover:text-gold-light transition-colors">
                  Platforms
                </Link>
                <Link to="/market" className="text-text-secondary hover:text-gold-light transition-colors">
                  Market Snapshot
                </Link>
                <Link to="/quiz" className="text-text-secondary hover:text-gold-light transition-colors">
                  Knowledge Quiz
                </Link>
                <Link to="/settings" className="text-text-secondary hover:text-gold-light transition-colors">
                  Settings
                </Link>
              </div>
            </div>

            {/* Right */}
            <div>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-4">
                LOCAL AUTO-SAVE & DISCLAIMER
              </h4>
              <p className="font-sans text-[13px] leading-[1.75] text-text-secondary mb-3">
                Your lesson completions, quiz scores, and broker checklists save automatically inside
                your browser’s <code className="text-text-accent">localStorage</code>.
              </p>
              <p className="font-sans text-[12px] leading-[1.7] text-text-tertiary">
                StoxIQ is strictly for educational purposes only and does not constitute financial,
                investment, or tax advice. Past performance never guarantees future results.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[rgba(201,168,76,0.22)] flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-[12px] text-text-tertiary">
            <span>© {new Date().getFullYear()} StoxIQ · Version 1.0.0</span>
            <span>US · UK · Africa Stock Market Education</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
