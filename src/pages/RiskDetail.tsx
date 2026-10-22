import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Check,
  ShieldAlert,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { RISKS } from '@/data/risks'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'

export const RiskDetail: React.FC = () => {
  const { riskId = '' } = useParams()
  const navigate = useNavigate()
  const { setRiskVisited } = useProgress()

  const riskIdx = RISKS.findIndex((r) => r.id === riskId)
  const risk = riskIdx >= 0 ? RISKS[riskIdx] : undefined

  useEffect(() => {
    if (risk) {
      setRiskVisited(risk.id)
    }
  }, [risk, setRiskVisited])

  if (!risk) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="font-serif text-[30px] text-text-primary">Risk briefing not found</h1>
        <Button variant="primary" onClick={() => navigate('/risks')}>
          Back to Watch Out For
        </Button>
      </div>
    )
  }

  const prevRisk = riskIdx > 0 ? RISKS[riskIdx - 1] : null
  const nextRisk = riskIdx < RISKS.length - 1 ? RISKS[riskIdx + 1] : null

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="max-w-[760px] mx-auto space-y-8">
        <Link
          to="/risks"
          className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-warning hover:text-gold-light transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Back to Watch Out For
        </Link>

        {/* Risk Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow tone="amber" showLines={false}>
              RISK BRIEFING {risk.number}
            </Eyebrow>
            <Badge variant={risk.tagVariant}>{risk.tagLabel}</Badge>
          </div>

          <h1 className="font-serif text-[34px] sm:text-[44px] font-semibold text-text-primary leading-[1.16]">
            {risk.headline}
          </h1>

          <p className="font-sans text-[17px] sm:text-[18px] leading-[1.8] text-text-secondary">
            {risk.subtitle}
          </p>

          <div className="font-sans text-[12px] text-text-tertiary">
            {risk.duration} · Educational Investor Protection
          </div>

          <hr className="border-0 h-[1px] bg-gradient-to-r from-[rgba(245,158,11,0.45)] via-[rgba(248,113,113,0.22)] to-transparent" />
        </header>

        {/* Risk Content Sections */}
        <div className="space-y-8">
          {risk.sections.map((sec, idx) => {
            if (sec.type === 'section') {
              return (
                <section key={idx} className="space-y-3.5">
                  <h2 className="font-serif text-[25px] sm:text-[26px] font-semibold text-text-primary">
                    {sec.title}
                  </h2>
                  {sec.body && (
                    <p className="font-sans text-[16px] leading-[1.9] text-text-secondary whitespace-pre-line">
                      {sec.body}
                    </p>
                  )}
                </section>
              )
            }

            if (sec.type === 'cautionary-stat') {
              return (
                <GlassCard
                  key={idx}
                  tier={2}
                  className="p-6 sm:p-7 border border-[rgba(248,113,113,0.26)] bg-[rgba(248,113,113,0.05)]"
                >
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-negative mb-2">
                    {sec.title}
                  </span>
                  <div className="font-serif text-[38px] sm:text-[46px] font-bold text-negative leading-tight mb-2">
                    {sec.statValue}
                  </div>
                  <p className="font-sans text-[14px] leading-[1.7] text-text-secondary">
                    {sec.statLabel}
                  </p>
                </GlassCard>
              )
            }

            if (sec.type === 'warning') {
              return (
                <Callout key={idx} variant="warning" title={sec.title}>
                  {sec.body}
                </Callout>
              )
            }

            if (sec.type === 'mistake-list') {
              return (
                <section key={idx} className="space-y-4">
                  <h2 className="font-serif text-[26px] font-semibold text-text-primary">
                    {sec.title}
                  </h2>
                  <div className="space-y-4">
                    {(sec.mistakes || []).map((m) => (
                      <GlassCard
                        key={m.num}
                        tier={2}
                        className="p-6 border border-[rgba(245,158,11,0.20)]"
                      >
                        <div className="flex items-baseline gap-3 mb-2.5">
                          <span className="font-serif text-[24px] font-bold text-warning">
                            MISTAKE {m.num}:
                          </span>
                          <h3 className="font-serif text-[20px] font-medium text-text-primary">
                            {m.title}
                          </h3>
                        </div>
                        <p className="font-sans text-[14px] text-text-secondary mb-2">
                          <span className="text-negative font-semibold">What happens:</span> {m.what}
                        </p>
                        <p className="font-sans text-[14px] text-text-primary">
                          <span className="text-positive font-semibold">The fix:</span> {m.fix}
                        </p>
                      </GlassCard>
                    ))}
                  </div>
                </section>
              )
            }

            if (sec.type === 'red-flag') {
              return (
                <div
                  key={idx}
                  className="rounded-[16px] bg-[rgba(248,113,113,0.06)] border border-[rgba(248,113,113,0.28)] border-l-[4px] border-l-negative p-6 sm:p-7 space-y-4"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert size={20} strokeWidth={1.5} className="text-negative" />
                    <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-negative">
                      {sec.title}
                    </span>
                  </div>

                  {sec.body && (
                    <p className="font-sans text-[14px] text-text-primary font-medium">{sec.body}</p>
                  )}

                  <ul className="space-y-2.5">
                    {(sec.flags || []).map((flag, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-3 font-sans text-[15px] leading-[1.7] text-text-secondary"
                      >
                        <AlertTriangle
                          size={16}
                          strokeWidth={1.8}
                          className="text-warning shrink-0 mt-1"
                        />
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>

                  {sec.note && (
                    <p className="pt-3 border-t border-[rgba(248,113,113,0.18)] font-sans text-[13.5px] font-medium text-warning">
                      {sec.note}
                    </p>
                  )}
                </div>
              )
            }

            if (sec.type === 'protect') {
              return (
                <div
                  key={idx}
                  className="rounded-[16px] bg-[rgba(74,222,128,0.06)] border border-[rgba(74,222,128,0.25)] border-t-2 border-t-positive p-6 sm:p-7 space-y-4"
                >
                  <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-positive">
                    {sec.title}
                  </span>

                  <ul className="space-y-3">
                    {(sec.tips || []).map((tip, tIdx) => (
                      <li
                        key={tIdx}
                        className="flex items-start gap-3 font-sans text-[15px] leading-[1.75] text-text-secondary"
                      >
                        <span className="w-5 h-5 rounded-full bg-positive-dim border border-[rgba(74,222,128,0.35)] flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={2.3} className="text-positive" />
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }

            return null
          })}
        </div>

        {/* Navigation Footer */}
        <footer className="pt-8 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {prevRisk ? (
            <Button variant="ghost" onClick={() => navigate(prevRisk.route)}>
              <ArrowLeft size={15} strokeWidth={1.5} /> {prevRisk.title}
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => navigate('/risks')}>
              <ArrowLeft size={15} strokeWidth={1.5} /> All Risk Topics
            </Button>
          )}

          {nextRisk ? (
            <Button
              variant="secondary"
              onClick={() => navigate(nextRisk.route)}
              className="!border-[rgba(245,158,11,0.5)] !text-warning hover:!bg-[rgba(245,158,11,0.08)]"
            >
              Next: {nextRisk.title} <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
          ) : (
            <Button variant="primary" onClick={() => navigate('/platforms')}>
              Explore Regulated Platforms <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
          )}
        </footer>
      </div>
    </div>
  )
}

export default RiskDetail
