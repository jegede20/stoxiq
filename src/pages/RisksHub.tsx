import React from 'react'
import { Link } from 'react-router-dom'
import {
  Flame,
  AlertOctagon,
  ShieldAlert,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { RISKS } from '@/data/risks'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Badge } from '@/components/ui/Badge'

const RISK_ICONS = {
  Flame,
  AlertOctagon,
  ShieldAlert,
  TrendingDown,
}

export const RisksHub: React.FC = () => {
  const { progress, setRiskVisited } = useProgress()
  const visitedCount = Object.values(progress.risks).filter((r) => r.visited).length

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden glass-tier-1 p-7 sm:p-10 border border-[rgba(245,158,11,0.18)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.14)_0%,transparent_70%)]"
        />

        <div className="relative z-10 max-w-3xl">
          <Eyebrow tone="amber" className="mb-4">
            INVESTOR PROTECTION
          </Eyebrow>
          <h1 className="font-serif text-[36px] sm:text-[52px] font-bold text-text-primary leading-[1.12] mb-3">
            What to Watch Out For
          </h1>
          <p className="font-sans text-[17px] sm:text-[18px] leading-[1.8] text-text-secondary mb-6">
            Knowledge is your best protection in the market.
          </p>

          {/* Decorative Warning Icon Strip with Faded Amber Glow */}
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.22)]">
            <AlertTriangle size={16} strokeWidth={1.5} className="text-warning" />
            <ShieldAlert size={16} strokeWidth={1.5} className="text-warning/80" />
            <TrendingDown size={16} strokeWidth={1.5} className="text-warning/70" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[1.6px] text-warning">
              {visitedCount} of 4 Risk Briefings Reviewed
            </span>
          </div>
        </div>
      </div>

      {/* Educational Disclaimer Warning Banner (Full-Width, Amber Left Border 4px) */}
      <div className="rounded-[12px] bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.20)] border-l-[4px] border-l-warning p-5 flex items-center gap-3.5">
        <AlertTriangle size={20} strokeWidth={1.5} className="text-warning shrink-0" />
        <p className="font-sans text-[14px] sm:text-[15px] text-text-primary">
          StoxIQ is for educational purposes only. Not financial advice.
        </p>
      </div>

      {/* 4 Risk Category Cards (3-column grid desktop, 2 on tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RISKS.map((risk) => {
          const IconComp = RISK_ICONS[risk.iconName]
          const visited = Boolean(progress.risks[risk.id]?.visited)

          return (
            <Link
              key={risk.id}
              to={risk.route}
              onClick={() => setRiskVisited(risk.id)}
              className="block h-full"
            >
              <GlassCard
                tier={2}
                interactiveAmber
                className="p-7 h-full flex flex-col justify-between border border-[rgba(245,158,11,0.16)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-[12px] bg-[rgba(245,158,11,0.10)] border border-[rgba(245,158,11,0.28)] flex items-center justify-center">
                      <IconComp size={28} strokeWidth={1.5} className="text-warning" />
                    </div>

                    <div className="flex items-center gap-2">
                      {visited && (
                        <span className="inline-flex items-center gap-1 font-sans text-[10px] font-bold uppercase tracking-[1px] text-positive">
                          <CheckCircle2 size={13} strokeWidth={1.8} /> Read
                        </span>
                      )}
                      <Badge variant={risk.tagVariant}>{risk.tagLabel}</Badge>
                    </div>
                  </div>

                  <h2 className="font-serif text-[21px] font-medium text-text-primary mb-2.5">
                    {risk.title}
                  </h2>
                  <p className="font-sans text-[14px] leading-[1.75] text-text-secondary line-clamp-2 mb-6">
                    {risk.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(245,158,11,0.14)] flex items-center justify-between">
                  <span className="font-sans text-[12px] text-text-tertiary">{risk.duration}</span>
                  <span className="font-sans text-[13px] font-semibold text-warning inline-flex items-center gap-1.5">
                    Learn More <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </div>
              </GlassCard>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default RisksHub
