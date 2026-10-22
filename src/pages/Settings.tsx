import React, { useState } from 'react'
import {
  Globe,
  Sliders,
  Database,
  Info,
  Download,
  Trash2,
  AlertTriangle,
  Share2,
  MessageSquareWarning,
  Check,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { REGIONS_META } from '@/data/brokers'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { RegionEmblem } from '@/components/ui/RegionWatermark'
import { cn } from '@/lib/utils'

export const Settings: React.FC = () => {
  const {
    region,
    preferences,
    setRegion,
    setPreference,
    getCompletedLessonsCount,
    getTakenQuizzesCount,
    exportProgress,
    resetAllProgress,
  } = useProgress()

  const [resetModalOpen, setResetModalOpen] = useState(false)
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null)

  const completedLessons = getCompletedLessonsCount()
  const quizzesTaken = getTakenQuizzesCount()
  const activeRegionMeta = REGIONS_META.find((r) => r.id === region)

  const showToast = (msg: string) => {
    setFeedbackBanner(msg)
    setTimeout(() => setFeedbackBanner(null), 3500)
  }

  const handleShare = async () => {
    const shareUrl = window.location.origin
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'StoxIQ — Free Stock Market Education',
          text: 'Knowledge Is the First Stock You Should Ever Buy.',
          url: shareUrl,
        })
        return
      } catch {
        // fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      showToast('StoxIQ link copied to your clipboard!')
    } catch {
      showToast(`Share link: ${shareUrl}`)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <Eyebrow className="mb-3">BROWSER PREFERENCES</Eyebrow>
        <h1 className="font-serif text-[36px] sm:text-[40px] font-semibold text-text-primary mb-2">
          Settings
        </h1>
        <p className="font-sans text-[16px] text-text-secondary">
          Your preferences are saved locally in your browser.
        </p>
      </div>

      {feedbackBanner && (
        <div className="rounded-[12px] bg-positive-dim border border-[rgba(74,222,128,0.3)] px-4 py-3 flex items-center gap-2.5 font-sans text-[14px] text-positive animate-page-in">
          <Check size={16} strokeWidth={2} />
          <span>{feedbackBanner}</span>
        </div>
      )}

      {/* 1. YOUR REGION */}
      <GlassCard tier={2} className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-gold-fill border border-gold-border flex items-center justify-center shrink-0">
              <Globe size={20} strokeWidth={1.5} className="text-gold-base" />
            </div>
            <div>
              <h2 className="font-serif text-[22px] font-medium text-text-primary">Your Region</h2>
              <p className="font-sans text-[13px] text-text-tertiary">
                Currently selected:{' '}
                <span className="text-text-primary font-semibold">
                  {activeRegionMeta ? activeRegionMeta.name : 'Not selected yet'}
                </span>
              </p>
            </div>
          </div>

          {region && <RegionEmblem region={region} size="md" />}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {REGIONS_META.map((reg) => {
            const isSelected = region === reg.id
            return (
              <button
                key={reg.id}
                type="button"
                onClick={() => {
                  setRegion(reg.id)
                  showToast(`Region updated to ${reg.name}.`)
                }}
                className={cn(
                  'p-4 rounded-[12px] border flex items-center gap-3 text-left transition-all duration-200',
                  isSelected
                    ? 'bg-gold-fill border-gold-border text-text-primary shadow-glass-gold'
                    : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-text-secondary hover:border-[rgba(255,255,255,0.16)] hover:text-text-primary'
                )}
              >
                <RegionEmblem region={reg.id} size="sm" />
                <div>
                  <span className="block font-sans text-[14px] font-semibold text-text-primary">
                    {reg.name}
                  </span>
                  <span className="block font-sans text-[11px] text-text-tertiary">
                    {reg.platformCountLabel}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </GlassCard>

      {/* 2. DATA PREFERENCES */}
      <GlassCard tier={2} className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-gold-fill border border-gold-border flex items-center justify-center shrink-0">
            <Sliders size={20} strokeWidth={1.5} className="text-gold-base" />
          </div>
          <div>
            <h2 className="font-serif text-[22px] font-medium text-text-primary">
              Data Preferences
            </h2>
            <p className="font-sans text-[13px] text-text-tertiary">
              Control delayed Alpha Vantage market feeds and default chart appearance.
            </p>
          </div>
        </div>

        <div className="space-y-5 divide-y divide-[rgba(255,255,255,0.06)]">
          {/* Show Delayed Market Data Toggle */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div>
              <span className="block font-sans text-[15px] text-text-primary font-medium">
                Show delayed market data
              </span>
              <span className="block font-sans text-[12.5px] text-text-tertiary">
                Fetch 15-min delayed quotes with automatic educational fallback
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={preferences.marketDataEnabled}
              onClick={() => setPreference('marketDataEnabled', !preferences.marketDataEnabled)}
              className={cn(
                'relative w-12 h-7 rounded-full transition-colors duration-200 border shrink-0',
                preferences.marketDataEnabled
                  ? 'bg-gold-base border-gold-light'
                  : 'bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.14)]'
              )}
            >
              <span
                className={cn(
                  'absolute left-[3px] top-[3px] w-5 h-5 rounded-full transition-transform duration-200',
                  preferences.marketDataEnabled
                    ? 'translate-x-5 bg-bg-base-0'
                    : 'translate-x-0 bg-text-secondary'
                )}
              />
            </button>
          </div>

          {/* Default Chart View: [Line] [Candle] */}
          <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="block font-sans text-[15px] text-text-primary font-medium">
                Default chart view
              </span>
              <span className="block font-sans text-[12.5px] text-text-tertiary">
                Applies to the Market Snapshot benchmark chart
              </span>
            </div>

            <div className="inline-flex p-1 rounded-[10px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] self-start">
              {(['line', 'candle'] as const).map((view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setPreference('defaultChartView', view)}
                  className={cn(
                    'px-4 py-1.5 rounded-[7px] font-sans text-[13px] font-semibold capitalize transition-colors',
                    preferences.defaultChartView === view
                      ? 'bg-gold-base text-bg-base-0'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Default Time Range: [1D] [1W] [1M] [3M] */}
          <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="block font-sans text-[15px] text-text-primary font-medium">
                Default time range
              </span>
              <span className="block font-sans text-[12.5px] text-text-tertiary">
                Initial timeframe loaded on Market Snapshot
              </span>
            </div>

            <div className="inline-flex p-1 rounded-[10px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] self-start">
              {(['1D', '1W', '1M', '3M'] as const).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setPreference('defaultTimeRange', range)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-[7px] font-sans text-[13px] font-semibold transition-colors',
                    preferences.defaultTimeRange === range
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
      </GlassCard>

      {/* 3. YOUR SAVED PROGRESS */}
      <GlassCard tier={2} className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-gold-fill border border-gold-border flex items-center justify-center shrink-0">
            <Database size={20} strokeWidth={1.5} className="text-gold-base" />
          </div>
          <div>
            <h2 className="font-serif text-[22px] font-medium text-text-primary">
              Your Saved Progress
            </h2>
            <p className="font-sans text-[13px] text-text-tertiary">
              Zero cloud databases — your learning record stays 100% on your device.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-[12px] bg-[rgba(10,10,15,0.45)] border border-[rgba(255,255,255,0.06)]">
          <div>
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-text-tertiary mb-1">
              LESSONS COMPLETED
            </span>
            <span className="font-serif text-[22px] font-semibold text-text-primary">
              {completedLessons} of 12
            </span>
          </div>
          <div>
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-text-tertiary mb-1">
              QUIZZES TAKEN
            </span>
            <span className="font-serif text-[22px] font-semibold text-text-primary">
              {quizzesTaken} of 5
            </span>
          </div>
          <div>
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-text-tertiary mb-1">
              DATA STORED IN
            </span>
            <span className="font-sans text-[14px] font-semibold text-gold-base">
              Browser (localStorage)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={() => {
              exportProgress()
              showToast('Downloaded stoxiq_progress JSON backup.')
            }}
            className="!text-gold-base !border-gold-border hover:!bg-gold-fill"
          >
            <Download size={16} strokeWidth={1.5} /> Export Progress as JSON
          </Button>

          <Button variant="danger" size="md" onClick={() => setResetModalOpen(true)}>
            <Trash2 size={16} strokeWidth={1.5} /> Reset All Progress
          </Button>
        </div>
      </GlassCard>

      {/* 4. ABOUT STOXIQ */}
      <GlassCard tier={2} className="p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-gold-fill border border-gold-border flex items-center justify-center shrink-0">
            <Info size={20} strokeWidth={1.5} className="text-gold-base" />
          </div>
          <div>
            <h2 className="font-serif text-[22px] font-medium text-text-primary">About StoxIQ</h2>
            <span className="font-sans text-[12px] text-gold-base font-semibold">
              Version 1.0.0
            </span>
          </div>
        </div>

        <p className="font-sans text-[15px] leading-[1.8] text-text-secondary">
          StoxIQ is free educational content. Not financial advice. Built for first-time stock
          market learners across the United States, United Kingdom, and Africa.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Share2 size={14} strokeWidth={1.5} /> Share StoxIQ
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              showToast(
                'Thank you — note saved! Since StoxIQ runs 100% client-side with zero tracking, no personal data is transmitted.'
              )
            }
          >
            <MessageSquareWarning size={14} strokeWidth={1.5} /> Report an Issue
          </Button>
        </div>
      </GlassCard>

      {/* RESET CONFIRMATION MODAL */}
      {resetModalOpen && (
        <div
          onClick={() => setResetModalOpen(false)}
          className="fixed inset-0 z-50 bg-[#0A0A0F]/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-overlay-surface rounded-[24px] max-w-md w-full p-7 sm:p-8 space-y-5 animate-page-in"
          >
            <div className="w-12 h-12 rounded-full bg-warning-dim border border-[rgba(245,158,11,0.35)] flex items-center justify-center">
              <AlertTriangle size={24} strokeWidth={1.5} className="text-warning" />
            </div>

            <h3 className="font-serif text-[28px] font-semibold text-text-primary">
              Reset All Progress?
            </h3>

            <p className="font-sans text-[14.5px] leading-[1.75] text-text-secondary">
              This permanently clears all completed lessons, quiz scores, broker step checklists,
              region selection, and preferences from your browser&apos;s{' '}
              <code className="text-text-accent">localStorage</code>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
              <Button variant="ghost" size="md" onClick={() => setResetModalOpen(false)}>
                Cancel
              </Button>
              <button
                type="button"
                onClick={() => {
                  resetAllProgress()
                  setResetModalOpen(false)
                  showToast('All StoxIQ progress and preferences have been reset.')
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-negative text-bg-base-0 font-sans text-[14px] font-bold hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
