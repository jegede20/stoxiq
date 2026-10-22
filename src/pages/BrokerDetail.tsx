import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Check,
  AlertTriangle,
  ChevronDown,
  Circle,
} from 'lucide-react'
import { useProgress, type RegionKey } from '@/contexts/ProgressContext'
import { BROKERS } from '@/data/brokers'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Callout } from '@/components/ui/Callout'
import { cn } from '@/lib/utils'

export const BrokerDetail: React.FC = () => {
  const { region = '', brokerId = '' } = useParams()
  const navigate = useNavigate()
  const { progress, setStepComplete } = useProgress()
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0)

  const validRegion =
    region === 'us' || region === 'uk' || region === 'africa'
      ? (region as RegionKey)
      : null

  const broker = validRegion
    ? BROKERS[validRegion].find((b) => b.id === brokerId)
    : undefined

  if (!validRegion || !broker) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="font-serif text-[32px] text-text-primary">Platform guide not found</h1>
        <Button variant="primary" onClick={() => navigate('/platforms')}>
          Back to Platforms
        </Button>
      </div>
    )
  }

  const brokerStepsMap = progress.steps[broker.storageKey] || {}
  const completedStepsCount = broker.steps.reduce(
    (acc, _, idx) => acc + (brokerStepsMap[`step${idx + 1}`] ? 1 : 0),
    0
  )
  const stepPct = Math.round((completedStepsCount / broker.stepsCount) * 100)

  // First incomplete step index is the "Active" step
  const activeStepIdx = broker.steps.findIndex((_, idx) => !brokerStepsMap[`step${idx + 1}`])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <Link
        to={`/platforms/${validRegion}`}
        className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-gold-base hover:text-gold-light transition-colors"
      >
        <ArrowLeft size={16} strokeWidth={1.5} /> Back to {validRegion.toUpperCase()} Platforms
      </Link>

      {/* BROKER HERO (Full-Width) */}
      <GlassCard tier={2} goldEdge className="p-7 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div
              style={{
                backgroundColor: `${broker.accentColor}20`,
                color: broker.accentColor,
              }}
              className="w-[64px] h-[64px] rounded-[18px] border border-[rgba(255,255,255,0.14)] flex items-center justify-center font-serif text-[24px] font-bold shrink-0"
            >
              {broker.shortCode}
            </div>
            <div>
              <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-1">
                {broker.country} · {broker.regulated} REGULATED
              </span>
              <h1 className="font-serif text-[34px] sm:text-[48px] font-bold text-text-primary leading-[1.12] mb-2">
                {broker.name}
              </h1>
              <p className="font-sans text-[16px] text-text-secondary max-w-2xl">
                {broker.tagline}
              </p>
            </div>
          </div>

          <a
            href={broker.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="primary" size="lg">
              Visit Official Website <ExternalLink size={16} strokeWidth={1.5} />
            </Button>
          </a>
        </div>

        <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap gap-2">
          {broker.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-gold-fill border border-gold-border font-sans text-[11px] font-semibold text-gold-light"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* Critical Warning / Special Regional Note Banner if applicable */}
      {broker.criticalWarning && (
        <Callout variant="warning" title="CRITICAL PLATFORM WARNING">
          {broker.criticalWarning}
        </Callout>
      )}
      {broker.specialNote && (
        <Callout variant="key-concept" title="REGIONAL TRADING NOTE">
          {broker.specialNote}
        </Callout>
      )}

      {/* TWO-COLUMN LAYOUT (65/35 split -> 8 / 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT CONTENT AREA (65%) */}
        <div className="lg:col-span-8 space-y-10">
          {/* About This Platform */}
          <section className="space-y-3.5">
            <h2 className="font-serif text-[26px] font-semibold text-text-primary">
              About This Platform
            </h2>
            {broker.about.map((para, idx) => (
              <p key={idx} className="font-sans text-[15.5px] leading-[1.85] text-text-secondary">
                {para}
              </p>
            ))}
          </section>

          {/* Who Is It Best For? */}
          <section className="space-y-4">
            <h2 className="font-serif text-[26px] font-semibold text-text-primary">
              Who Is It Best For?
            </h2>
            <GlassCard tier={1} className="p-6 space-y-3">
              {broker.bestFor.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gold-fill border border-gold-border flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={2.2} className="text-gold-base" />
                  </span>
                  <span className="font-sans text-[15px] leading-[1.7] text-text-secondary">
                    {item}
                  </span>
                </div>
              ))}
            </GlassCard>
          </section>

          {/* Pros & Cons Two-Column Table */}
          <section className="space-y-4">
            <h2 className="font-serif text-[26px] font-semibold text-text-primary">
              Pros &amp; Cons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <GlassCard
                tier={2}
                className="p-6 border-t-2 border-t-positive space-y-3"
              >
                <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-positive">
                  STRENGTHS (PROS)
                </span>
                <ul className="space-y-2.5">
                  {broker.pros.map((pro, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 font-sans text-[14px] leading-[1.65] text-text-secondary"
                    >
                      <Check size={15} strokeWidth={2.2} className="text-positive shrink-0 mt-1" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard
                tier={2}
                className="p-6 border-t-2 border-t-warning space-y-3"
              >
                <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-warning">
                  LIMITATIONS (CONS)
                </span>
                <ul className="space-y-2.5">
                  {broker.cons.map((con, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 font-sans text-[14px] leading-[1.65] text-text-secondary"
                    >
                      <AlertTriangle
                        size={15}
                        strokeWidth={1.8}
                        className="text-warning shrink-0 mt-1"
                      />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </section>

          {/* MAIN FEATURE: YOUR STEP-BY-STEP GUIDE */}
          <section className="space-y-6">
            <div>
              <Eyebrow showLines={false} className="mb-2">
                INTERACTIVE ONBOARDING WALKTHROUGH
              </Eyebrow>
              <h2 className="font-serif text-[30px] font-semibold text-text-primary mb-4">
                Your Step-by-Step Guide
              </h2>

              <GlassCard tier={1} className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
                    STEP PROGRESS: {completedStepsCount} OF {broker.stepsCount} STEPS COMPLETE
                  </span>
                  <span className="font-sans text-[12px] font-semibold text-text-primary tabular-nums">
                    {stepPct}%
                  </span>
                </div>
                <ProgressBar
                  value={stepPct}
                  variant="thin"
                  tone={completedStepsCount === broker.stepsCount ? 'green' : 'gold'}
                />
              </GlassCard>
            </div>

            <div className="space-y-4">
              {broker.steps.map((step, idx) => {
                const stepNum = idx + 1
                const stepKey = `step${stepNum}`
                const isDone = Boolean(brokerStepsMap[stepKey])
                const isActive = idx === activeStepIdx
                const paddedNum = stepNum < 10 ? `0${stepNum}` : `${stepNum}`

                return (
                  <GlassCard
                    key={stepKey}
                    tier={2}
                    goldEdge={isActive}
                    className={cn(
                      'p-6 sm:p-7 transition-all duration-200',
                      isDone &&
                        'bg-[rgba(74,222,128,0.04)] border-[rgba(74,222,128,0.22)]'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Status Circle: ○ incomplete | → active | ● complete (gold) */}
                      <div
                        className={cn(
                          'w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all',
                          isDone
                            ? 'bg-gold-base text-bg-base-0'
                            : isActive
                            ? 'bg-gold-fill border border-gold-base text-gold-base'
                            : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] text-text-tertiary'
                        )}
                      >
                        {isDone ? (
                          <Check size={17} strokeWidth={2.5} />
                        ) : isActive ? (
                          <ArrowRight size={16} strokeWidth={1.8} />
                        ) : (
                          <Circle size={15} strokeWidth={1.5} />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <div>
                          <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-gold-base mb-1">
                            STEP {paddedNum}
                          </span>
                          <h3 className="font-serif text-[22px] font-medium text-text-primary">
                            {step.title}
                          </h3>
                        </div>

                        <p className="font-sans text-[15px] leading-[1.8] text-text-secondary">
                          {step.instruction}
                        </p>

                        {step.proTip && (
                          <Callout variant="key-concept" title="PRO TIP" className="!p-4">
                            {step.proTip}
                          </Callout>
                        )}

                        {step.warning && (
                          <Callout variant="warning" title="WATCH OUT" className="!p-4">
                            {step.warning}
                          </Callout>
                        )}

                        <div className="pt-1">
                          <Button
                            variant={isDone ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() =>
                              setStepComplete(broker.storageKey, stepKey, !isDone)
                            }
                          >
                            <Check size={14} strokeWidth={2} />
                            {isDone ? 'Step Completed (Undo)' : 'Mark Step Complete'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          </section>

          {/* What to Watch Out For on This Platform */}
          <section className="space-y-4">
            <h2 className="font-serif text-[26px] font-semibold text-text-primary">
              What to Watch Out For on This Platform
            </h2>
            <div className="space-y-3">
              {broker.watchOutFor.map((note, idx) => (
                <Callout key={idx} variant="warning" title={`PLATFORM CHECK #${idx + 1}`}>
                  {note}
                </Callout>
              ))}
            </div>
          </section>

          {/* FAQs Accordion */}
          <section className="space-y-4">
            <h2 className="font-serif text-[26px] font-semibold text-text-primary">FAQs</h2>
            <div className="space-y-3">
              {broker.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx
                return (
                  <GlassCard key={idx} tier={2} className="overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[rgba(255,255,255,0.03)] transition-colors"
                    >
                      <span className="font-serif text-[18px] text-text-primary">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        strokeWidth={1.5}
                        className={cn(
                          'text-gold-base shrink-0 transition-transform duration-200',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 font-sans text-[14.5px] leading-[1.8] text-text-secondary border-t border-[rgba(255,255,255,0.06)]">
                        {faq.answer}
                      </div>
                    )}
                  </GlassCard>
                )
              })}
            </div>
          </section>
        </div>

        {/* RIGHT STICKY PANEL (35% -> 4 cols) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-[88px]">
          <GlassCard tier={2} className="p-7 space-y-6">
            <div>
              <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-4">
                QUICK FACTS
              </span>

              <div className="space-y-3.5 font-sans text-[13.5px]">
                {[
                  { label: 'Min Deposit', value: broker.minDeposit },
                  { label: 'Commission', value: broker.commission },
                  { label: 'Mobile App', value: broker.mobile },
                  { label: 'Fractional Shares', value: broker.fractional },
                  { label: 'Regulator', value: broker.regulated },
                  { label: 'Protection', value: broker.insurance },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start justify-between gap-3 pb-3 border-b border-[rgba(255,255,255,0.06)] last:border-0 last:pb-0"
                  >
                    <span className="text-text-tertiary">{fact.label}</span>
                    <span className="text-text-primary font-semibold text-right">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Beginner Score Rating Bar */}
            <div className="p-4 rounded-[12px] bg-[rgba(10,10,15,0.45)] border border-[rgba(201,168,76,0.20)]">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[1.8px] text-text-tertiary">
                  BEGINNER SCORE
                </span>
                <span className="font-serif text-[26px] font-bold text-gold-base">
                  {broker.beginnerScore}/10
                </span>
              </div>
              <ProgressBar value={broker.beginnerScore * 10} variant="standard" />
            </div>

            <a
              href={broker.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="primary" size="md" fullWidth>
                Visit {broker.name} <ExternalLink size={15} strokeWidth={1.5} />
              </Button>
            </a>

            <p className="font-sans text-[11px] leading-[1.6] text-text-tertiary text-center">
              StoxIQ has zero affiliate ties. Verify current fee schedules directly on {broker.name}&apos;s official website.
            </p>
          </GlassCard>
        </aside>
      </div>
    </div>
  )
}

export default BrokerDetail
