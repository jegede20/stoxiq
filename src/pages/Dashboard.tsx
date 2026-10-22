import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Landmark,
  TrendingUp,
  ShoppingBag,
  Lock,
  CheckCircle2,
  Brain,
  Globe,
  Layers,
  PieChart,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { MODULES } from '@/data/curriculum'
import { BROKERS, REGIONS_META } from '@/data/brokers'
import { fetchMarketSnapshot, getFallbackMarketData, type MarketSnapshotPayload } from '@/services/marketApi'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RegionEmblem } from '@/components/ui/RegionWatermark'
import { Sparkline } from '@/components/charts/Sparkline'

function getGreeting(): string {
  const hr = new Date().getHours()
  if (hr < 12) return 'Good Morning.'
  if (hr < 18) return 'Good Afternoon.'
  return 'Good Evening.'
}

const MODULE_ICONS = {
  BookOpen,
  Landmark,
  TrendingUp,
  ShoppingBag,
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const {
    region,
    preferences,
    getOverallProgress,
    getCompletedLessonsCount,
    getModuleProgress,
    getModuleCompletedCount,
    getContinueLesson,
    getLatestQuizScore,
    isModuleUnlocked,
  } = useProgress()

  const [market, setMarket] = useState<MarketSnapshotPayload>(() => getFallbackMarketData())

  useEffect(() => {
    let active = true
    fetchMarketSnapshot(preferences.marketDataEnabled).then((payload) => {
      if (active) setMarket(payload)
    })
    return () => {
      active = false
    }
  }, [preferences.marketDataEnabled])

  const overallPct = getOverallProgress()
  const completedLessons = getCompletedLessonsCount()
  const continueInfo = getContinueLesson()
  const latestQuiz = getLatestQuizScore()
  const anyModuleComplete = MODULES.some((m) => getModuleCompletedCount(m.id) === 3)
  const sp500 = market.indices[0]
  const spPositive = sp500.changePct >= 0

  // Identify "Next Up" module (first unlocked module that isn't complete yet)
  const nextUpModuleId = MODULES.find(
    (m) => isModuleUnlocked(m.id) && getModuleCompletedCount(m.id) < 3
  )?.id

  const currentRegionMeta = REGIONS_META.find((r) => r.id === region)
  const topRegionBrokers = region ? BROKERS[region].slice(0, 2) : []

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* WELCOME HERO STRIP */}
      <GlassCard tier={1} className="relative overflow-hidden p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.14)_0%,transparent_70%)]"
        />
        <div className="relative z-10">
          <h1 className="font-serif text-[32px] sm:text-[40px] font-semibold text-gold-base mb-1.5">
            {getGreeting()}
          </h1>
          <p className="font-sans text-[16px] text-text-secondary mb-7">
            Here&apos;s where you stand today.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
              CURRICULUM PROGRESS
            </span>
            <span className="font-sans text-[13px] font-medium text-text-primary tabular-nums">
              {overallPct}% Complete · {completedLessons} of 12 lessons
            </span>
          </div>
          <ProgressBar value={overallPct} variant="standard" />
        </div>
      </GlassCard>

      {/* TOP WIDGETS GRID: CONTINUE + DAILY MARKET + QUICK QUIZ & REGION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CONTINUE LEARNING CARD */}
        <GlassCard tier={2} goldEdge className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
                CONTINUE LEARNING
              </span>
              <Badge variant={completedLessons === 12 ? 'completed' : 'next-up'}>
                {completedLessons === 12 ? 'ALL COMPLETE' : `LESSON ${continueInfo.lesson.number}`}
              </Badge>
            </div>

            <h2 className="font-serif text-[22px] font-medium text-text-primary mb-1.5">
              {continueInfo.moduleTitle}
            </h2>
            <p className="font-sans text-[14px] text-text-secondary mb-5">
              {continueInfo.lesson.title}
            </p>

            <ProgressBar value={continueInfo.moduleProgress} variant="thin" className="mb-3" />
            <div className="flex items-center justify-between text-[12px] font-sans text-text-tertiary mb-6">
              <span>{continueInfo.lesson.duration}</span>
              <span>{continueInfo.moduleProgress}% of module</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() =>
              navigate(`/learn/${continueInfo.lesson.moduleId}/${continueInfo.lesson.lessonSlug}`)
            }
          >
            {completedLessons === 12 ? 'Review Lesson' : 'Continue'} <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </GlassCard>

        {/* DAILY MARKET CARD */}
        <GlassCard tier={2} className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-tertiary">
                TODAY&apos;S MARKET
              </span>
              <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[1.5px] text-gold-base">
                <span className="w-1.5 h-1.5 rounded-full bg-positive animate-pulse" />
                S&amp;P 500 · LIVE
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-serif text-[26px] font-semibold text-text-primary tabular-nums">
                {sp500.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`font-sans text-[13px] font-semibold tabular-nums ${
                  spPositive ? 'text-positive' : 'text-negative'
                }`}
              >
                {spPositive ? '▲ +' : '▼ '}
                {sp500.changePct.toFixed(2)}%
              </span>
            </div>

            <Sparkline
              data={sp500.sparkline}
              height={120}
              color={spPositive ? 'gold' : 'red'}
            />
          </div>

          <div className="pt-3 mt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <span className="font-sans text-[10px] text-text-tertiary">
              15-min delayed · Educational use
            </span>
            <Link
              to="/market"
              className="font-sans text-[12px] font-semibold text-gold-base hover:text-gold-light inline-flex items-center gap-1"
            >
              View Full Market <ArrowRight size={13} strokeWidth={1.5} />
            </Link>
          </div>
        </GlassCard>

        {/* RIGHT STACK: QUICK QUIZ WIDGET + YOUR REGION CARD */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* QUICK QUIZ WIDGET */}
          <GlassCard tier={2} className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-[18px] font-medium text-text-primary">
                  Test Yourself
                </h3>
                <Brain size={18} strokeWidth={1.5} className="text-gold-base" />
              </div>

              {latestQuiz ? (
                <div className="mb-4">
                  <Badge variant="in-progress">LAST SCORE: {latestQuiz.score}%</Badge>
                </div>
              ) : (
                <p className="font-sans text-[13px] text-text-tertiary mb-4">
                  {anyModuleComplete ? 'Not taken yet — module quiz ready!' : 'Not taken yet'}
                </p>
              )}
            </div>

            {anyModuleComplete ? (
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => navigate('/quiz')}
              >
                Take Quiz <ArrowRight size={14} strokeWidth={1.5} />
              </Button>
            ) : (
              <div>
                <Button variant="secondary" size="sm" fullWidth disabled>
                  <Lock size={13} strokeWidth={1.5} /> Complete Module 1
                </Button>
              </div>
            )}
          </GlassCard>

          {/* YOUR REGION CARD */}
          <GlassCard tier={2} className="p-5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[10px] font-bold uppercase tracking-[1.8px] text-text-tertiary">
                YOUR REGION
              </span>
              <Globe size={16} strokeWidth={1.5} className="text-gold-base" />
            </div>

            {region && currentRegionMeta ? (
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <RegionEmblem region={region} size="sm" />
                  <span className="font-serif text-[17px] text-text-primary">
                    {currentRegionMeta.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {topRegionBrokers.map((b) => (
                    <Link
                      key={b.id}
                      to={`/platforms/${region}/${b.id}`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] hover:border-gold-border text-[11px] font-sans text-text-primary transition-colors"
                    >
                      <span
                        style={{ color: b.accentColor }}
                        className="font-bold text-[10px]"
                      >
                        {b.shortCode}
                      </span>
                      {b.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to="/platforms"
                  className="font-sans text-[12px] font-semibold text-gold-base hover:text-gold-light"
                >
                  Change Region →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="font-sans text-[13px] text-text-secondary">
                  Personalise broker guides for US, UK, or Africa.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => navigate('/platforms')}
                >
                  Pick Your Region <ArrowRight size={14} strokeWidth={1.5} />
                </Button>
              </div>
            )}
          </GlassCard>
        </div>
      </div>

      {/* LEARNING PATH MODULE GRID */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
            YOUR LEARNING PATH
          </h2>
          <Link
            to="/learn"
            className="font-sans text-[13px] text-gold-base hover:text-gold-light inline-flex items-center gap-1"
          >
            Open Full Curriculum <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod) => {
            const unlocked = isModuleUnlocked(mod.id)
            const doneCount = getModuleCompletedCount(mod.id)
            const pct = getModuleProgress(mod.id)
            const isComplete = doneCount === 3
            const isInProgress = unlocked && doneCount > 0 && doneCount < 3
            const isNextUp = mod.id === nextUpModuleId && !isComplete
            const IconComp = MODULE_ICONS[mod.icon]

            return (
              <GlassCard
                key={mod.id}
                tier={2}
                goldEdge={isInProgress || isNextUp}
                interactive={unlocked}
                className={`p-6 flex flex-col justify-between transition-all ${
                  !unlocked ? 'opacity-50' : ''
                } ${isNextUp ? 'animate-pulse-gold' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-11 h-11 rounded-[12px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                      {!unlocked ? (
                        <Lock size={20} strokeWidth={1.5} className="text-text-tertiary" />
                      ) : isComplete ? (
                        <CheckCircle2 size={20} strokeWidth={1.5} className="text-gold-base animate-bounce-check" />
                      ) : (
                        <IconComp size={20} strokeWidth={1.5} className="text-gold-base" />
                      )}
                    </div>

                    {!unlocked ? (
                      <Badge variant="locked">LOCKED</Badge>
                    ) : isComplete ? (
                      <Badge variant="completed">COMPLETED</Badge>
                    ) : isNextUp ? (
                      <Badge variant="next-up">NEXT UP</Badge>
                    ) : isInProgress ? (
                      <Badge variant="in-progress">IN PROGRESS</Badge>
                    ) : (
                      <Badge variant="not-started">NOT STARTED</Badge>
                    )}
                  </div>

                  <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-text-tertiary mb-1">
                    MODULE {mod.number}
                  </span>
                  <h3 className="font-serif text-[21px] font-medium text-text-primary mb-2">
                    {mod.title}
                  </h3>
                  <p className="font-sans text-[14px] leading-[1.7] text-text-secondary mb-5">
                    {mod.description}
                  </p>
                </div>

                <div>
                  <ProgressBar
                    value={pct}
                    variant="thin"
                    tone={isComplete ? 'green' : 'gold'}
                    className="mb-4"
                  />

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[12px] text-text-tertiary tabular-nums">
                      {doneCount}/3 lessons · {mod.estimatedTime}
                    </span>

                    {unlocked && (
                      <Button
                        variant={isInProgress || isNextUp ? 'primary' : 'secondary'}
                        size="xs"
                        onClick={() => navigate(`/learn/${mod.id}`)}
                      >
                        {isComplete ? 'Review' : isInProgress ? 'Continue' : 'Start'}{' '}
                        <ArrowRight size={12} strokeWidth={1.5} />
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            )
          })}

          {/* 2 "Coming in v2" Locked Placeholder Cards */}
          {[
            {
              num: '05',
              title: 'Fundamental Valuation',
              desc: 'Balance sheets, earnings calls, free cash flow, and competitive moats.',
              Icon: Layers,
            },
            {
              num: '06',
              title: 'Dividends & Rebalancing',
              desc: 'Annual portfolio rebalancing, tax-advantaged wrappers, and dividend compounding.',
              Icon: PieChart,
            },
          ].map((v2) => (
            <GlassCard
              key={v2.num}
              tier={2}
              className="p-6 opacity-50 flex flex-col justify-between select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
                    <Lock size={18} strokeWidth={1.5} className="text-text-tertiary" />
                  </div>
                  <Badge variant="locked">COMING IN V2</Badge>
                </div>

                <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-text-tertiary mb-1">
                  MODULE {v2.num}
                </span>
                <h3 className="font-serif text-[21px] font-medium text-text-primary mb-2">
                  {v2.title}
                </h3>
                <p className="font-sans text-[14px] leading-[1.7] text-text-secondary mb-5">
                  {v2.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] font-sans text-[12px] text-text-tertiary">
                Unlocks in StoxIQ v2.0
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
