import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useProgress, type RegionKey } from '@/contexts/ProgressContext'
import { BROKERS, REGIONS_META, type BrokerData } from '@/data/brokers'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BrokerLogo } from '@/components/ui/BrokerLogo'
import { RegionEmblem } from '@/components/ui/RegionWatermark'
import { cn } from '@/lib/utils'

const FILTERS = [
  'All',
  'Commission-Free',
  'No Minimum',
  'Mobile App',
  'Fractional Shares',
] as const

type FilterValue = (typeof FILTERS)[number]

export const RegionPage: React.FC = () => {
  const { region = '' } = useParams()
  const navigate = useNavigate()
  const { setRegion } = useProgress()
  const [activeFilter, setActiveFilter] = useState<FilterValue>('All')

  const validRegion =
    region === 'us' || region === 'uk' || region === 'africa'
      ? (region as RegionKey)
      : null

  useEffect(() => {
    if (validRegion) {
      setRegion(validRegion)
    }
  }, [validRegion, setRegion])

  if (!validRegion) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="font-serif text-[32px] text-text-primary">Region not found</h1>
        <Button variant="primary" onClick={() => navigate('/platforms')}>
          Back to Platforms
        </Button>
      </div>
    )
  }

  const regionMeta = REGIONS_META.find((r) => r.id === validRegion)!
  const brokers = BROKERS[validRegion]

  const matchesFilter = (broker: BrokerData): boolean => {
    if (activeFilter === 'All') return true
    return broker.filterCategories.includes(activeFilter)
  }

  const visibleCount = brokers.filter(matchesFilter).length

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Region Hero */}
      <div className="space-y-5">
        <Link
          to="/platforms"
          className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-gold-base hover:text-gold-light transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Change Region
        </Link>

        <GlassCard tier={1} className="p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center gap-6">
          <RegionEmblem region={validRegion} size="lg" className="!w-[64px] !h-[64px]" />
          <div>
            <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-1">
              REGIONAL PLATFORM GUIDE
            </span>
            <h1 className="font-serif text-[34px] sm:text-[46px] font-bold text-text-primary leading-tight">
              {regionMeta.name}
            </h1>
            <p className="font-sans text-[15px] text-text-secondary mt-1">
              {regionMeta.countriesSubtext ||
                `Curated regulated beginner platforms with full step-by-step registration guides.`}
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Filter Bar (Glass Pills, Gold Active State) */}
      <div className="flex flex-wrap items-center gap-2.5">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-full font-sans text-[13px] transition-all duration-200 border',
                isActive
                  ? 'bg-gold-fill text-gold-base font-semibold border-gold-border shadow-glass-gold'
                  : 'bg-[rgba(255,255,255,0.04)] text-text-secondary border-[rgba(255,255,255,0.08)] hover:text-text-primary hover:border-[rgba(255,255,255,0.16)]'
              )}
            >
              {filter}
            </button>
          )
        })}
      </div>

      {/* Broker Cards 2-Column Grid */}
      {visibleCount === 0 ? (
        <GlassCard tier={2} className="p-8 text-center space-y-3">
          <p className="font-serif text-[22px] text-text-primary">
            No platforms in {regionMeta.name} match &ldquo;{activeFilter}&rdquo;
          </p>
          <p className="font-sans text-[14px] text-text-secondary">
            Some regional platforms require a small initial deposit (such as $10–$20) due to local FX settlement rules.
          </p>
          <Button variant="secondary" size="sm" onClick={() => setActiveFilter('All')}>
            Show All {regionMeta.name} Platforms
          </Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {brokers.map((broker) => {
            const visible = matchesFilter(broker)
            return (
              <div
                key={broker.id}
                className={cn(
                  'transition-opacity duration-300',
                  visible ? 'opacity-100' : 'hidden opacity-0'
                )}
              >
                <GlassCard tier={2} interactive className="p-7 h-full flex flex-col justify-between">
                  <div>
                    {/* TOP: logo pill (40px) + broker name (Playfair 20px) + country + founded + beginner tag */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3.5">
                        <BrokerLogo brokerId={broker.id} name={broker.name} size="md" />
                        <div>
                          <h2 className="font-serif text-[21px] font-semibold text-text-primary leading-tight">
                            {broker.name}
                          </h2>
                          <span className="font-sans text-[12px] text-text-tertiary">
                            {broker.country} · {broker.founded}
                          </span>
                        </div>
                      </div>

                      <Badge
                        variant={broker.beginnerTag === 'BEGINNER' ? 'beginner' : 'intermediate'}
                      >
                        {broker.beginnerTag}
                      </Badge>
                    </div>

                    {/* MID: Feature tag pills row + 3 key stats (Min Deposit | Stocks | Rating) in Playfair 20px gold */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {broker.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] font-sans text-[11px] text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3 p-4 rounded-[12px] bg-[rgba(10,10,15,0.45)] border border-[rgba(255,255,255,0.06)] mb-5">
                      <div>
                        <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.5px] text-text-tertiary mb-1">
                          MIN DEPOSIT
                        </span>
                        <span className="font-serif text-[19px] sm:text-[20px] font-semibold text-gold-base">
                          {broker.minDeposit.split('|')[0].trim()}
                        </span>
                      </div>
                      <div>
                        <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.5px] text-text-tertiary mb-1">
                          STOCKS
                        </span>
                        <span className="font-serif text-[19px] sm:text-[20px] font-semibold text-gold-base">
                          {broker.stocksStat}
                        </span>
                      </div>
                      <div>
                        <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.5px] text-text-tertiary mb-1">
                          RATING
                        </span>
                        <span className="font-serif text-[19px] sm:text-[20px] font-semibold text-gold-base">
                          {broker.beginnerScore}/10
                        </span>
                      </div>
                    </div>

                    {/* DESC: 2-line summary Inter 14px secondary */}
                    <p className="font-sans text-[14px] leading-[1.75] text-text-secondary line-clamp-2 mb-6">
                      {broker.summary}
                    </p>
                  </div>

                  {/* BOTTOM: Step-by-step guide available + View Platform Guide */}
                  <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 font-sans text-[12px] text-positive">
                      <Check size={14} strokeWidth={2} /> Step-by-step guide available ({broker.stepsCount} steps)
                    </span>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/platforms/${validRegion}/${broker.id}`)}
                    >
                      View Platform Guide <ArrowRight size={14} strokeWidth={1.5} />
                    </Button>
                  </div>
                </GlassCard>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RegionPage
