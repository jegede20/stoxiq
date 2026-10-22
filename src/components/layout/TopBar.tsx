import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PanelLeft } from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { StoxLogo } from '@/components/ui/StoxLogo'
import { RegionEmblem } from '@/components/ui/RegionWatermark'

interface TopBarProps {
  onToggleSidebar?: () => void
}

function resolvePageTitle(pathname: string): string {
  if (pathname.startsWith('/dashboard')) return 'Dashboard'
  if (pathname.startsWith('/learn')) return 'Curriculum'
  if (pathname.startsWith('/risks')) return 'Watch Out For'
  if (pathname.startsWith('/platforms')) return 'Platforms'
  if (pathname.startsWith('/market')) return 'Market Snapshot'
  if (pathname.startsWith('/quiz')) return 'Knowledge Quiz'
  if (pathname.startsWith('/settings')) return 'Settings'
  return 'StoxIQ'
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const location = useLocation()
  const { region, getOverallProgress, getCompletedLessonsCount } = useProgress()
  const pageTitle = resolvePageTitle(location.pathname)
  const overall = getOverallProgress()
  const completedCount = getCompletedLessonsCount()

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-[260px] z-30 h-[64px] glass-tier-2 !rounded-none border-t-0 border-x-0 border-b border-[rgba(255,255,255,0.08)] px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile/Tablet Logo + Tablet Sidebar Toggle */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation sidebar"
            className="hidden md:inline-flex lg:hidden items-center justify-center w-9 h-9 rounded-[10px] border border-[rgba(255,255,255,0.10)] text-text-secondary hover:text-text-primary hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          >
            <PanelLeft size={18} strokeWidth={1.5} />
          </button>
        )}
        <div className="lg:hidden">
          <StoxLogo to="/dashboard" size="sm" />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-sans font-bold uppercase tracking-[2px] text-text-tertiary">
          <span>STOXIQ TERMINAL</span>
        </div>
      </div>

      {/* Center: Page Title */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none hidden sm:block">
        <span className="font-serif text-[18px] font-medium text-text-primary tracking-[-0.2px]">
          {pageTitle}
        </span>
      </div>

      {/* Right: Progress Pill + Region Flag */}
      <div className="flex items-center gap-2.5">
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(201,168,76,0.25)] hover:border-gold-base transition-colors"
          title={`${completedCount} of 12 lessons completed`}
        >
          <span className="w-2 h-2 rounded-full bg-gold-base" />
          <span className="font-sans text-[12px] font-semibold text-gold-light tabular-nums">
            {overall}%
          </span>
          <span className="hidden sm:inline font-sans text-[11px] text-text-secondary">
            · {completedCount}/12
          </span>
        </Link>

        <Link
          to={region ? `/platforms/${region}` : '/platforms'}
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.35)] transition-colors"
          title={region ? `Region: ${region.toUpperCase()}` : 'Pick Your Region'}
        >
          {region ? (
            <>
              <RegionEmblem region={region} size="sm" className="!w-5 !h-5" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-text-primary">
                {region}
              </span>
            </>
          ) : (
            <span className="font-sans text-[11px] font-bold uppercase tracking-[1.5px] text-gold-base px-1">
              Region
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}

export default TopBar
