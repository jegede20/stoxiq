import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { ALL_BROKERS_FLAT, REGIONS_META } from '@/data/brokers'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Badge } from '@/components/ui/Badge'
import { BrokerLogo } from '@/components/ui/BrokerLogo'
import { RegionEmblem, RegionWatermark } from '@/components/ui/RegionWatermark'

export const PlatformsHub: React.FC = () => {
  const navigate = useNavigate()
  const { region, setRegion } = useProgress()

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
      {/* Hero */}
      <div className="max-w-3xl">
        <Eyebrow className="mb-4">CURATED BROKER DIRECTORY</Eyebrow>
        <h1 className="font-serif text-[38px] sm:text-[52px] font-bold text-text-primary leading-[1.12] mb-3">
          Find Your Platform
        </h1>
        <p className="font-sans text-[17px] sm:text-[18px] leading-[1.8] text-text-secondary">
          Choose your region to see the best platforms.
        </p>
      </div>

      {/* 3 Large Region Cards (equal width, min-height 320px) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {REGIONS_META.map((reg) => {
          const isSelected = region === reg.id

          return (
            <div
              key={reg.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setRegion(reg.id)
                navigate(`/platforms/${reg.id}`)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setRegion(reg.id)
                  navigate(`/platforms/${reg.id}`)
                }
              }}
              className="group cursor-pointer h-full"
            >
              <GlassCard
                tier={2}
                goldEdge={isSelected}
                interactive
                className="relative overflow-hidden min-h-[320px] h-full p-7 sm:p-8 flex flex-col justify-between"
              >
                {/* Region-specific Hover Ambient Glow */}
                <div
                  aria-hidden="true"
                  style={{
                    background: `radial-gradient(circle at top right, ${reg.ambientHover}, transparent 72%)`,
                  }}
                  className="pointer-events-none absolute inset-0 opacity-65 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* 15% Flag / Continent Watermark */}
                <div className="absolute -bottom-3 -right-3">
                  <RegionWatermark region={reg.id} />
                </div>

                {/* Top */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-6">
                    <RegionEmblem region={reg.id} size="md" />
                    {isSelected && <Badge variant="your-region">YOUR REGION</Badge>}
                  </div>

                  <h2 className="font-serif text-[28px] font-semibold text-text-primary mb-2">
                    {reg.name}
                  </h2>

                  <p className="font-sans text-[15px] text-text-secondary mb-2">
                    {reg.brokerPreview}
                  </p>

                  {reg.countriesSubtext && (
                    <p className="font-sans text-[12.5px] text-text-tertiary mb-4">
                      {reg.countriesSubtext}
                    </p>
                  )}

                  <div className="mt-4">
                    <Badge variant="neutral-gold">{reg.highlightTag}</Badge>
                  </div>
                </div>

                {/* Bottom */}
                <div className="relative z-10 pt-5 mt-6 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
                  <span className="font-sans text-[12px] font-bold uppercase tracking-[1.6px] text-gold-base">
                    {reg.platformCountLabel}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-text-primary group-hover:text-gold-light inline-flex items-center gap-1.5 transition-colors">
                    View Guides <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </div>
              </GlassCard>
            </div>
          )
        })}
      </div>

      {/* Seamless Auto-Scroll Logo Strip */}
      <div className="space-y-4">
        <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-text-tertiary text-center">
          REGULATED PLATFORMS COVERED IN STOXIQ
        </span>

        <div className="marquee-mask overflow-hidden py-2">
          <div className="flex items-center gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...ALL_BROKERS_FLAT, ...ALL_BROKERS_FLAT].map((broker, idx) => (
              <Link
                key={`${broker.id}-${idx}`}
                to={`/platforms/${broker.region}/${broker.id}`}
                className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-full glass-tier-2 opacity-90 hover:opacity-100 hover:border-gold-border transition-all duration-200"
              >
                <BrokerLogo brokerId={broker.id} name={broker.name} size="sm" />
                <span className="font-sans text-[13px] font-medium text-text-primary group-hover:text-gold-light transition-colors">
                  {broker.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformsHub
