import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Landmark,
  TrendingUp,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Lock,
  Check,
  Circle,
  Play,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { LESSONS, MODULES, type ModuleData } from '@/data/curriculum'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const MODULE_ICONS = {
  BookOpen,
  Landmark,
  TrendingUp,
  ShoppingBag,
}

export const LearnHub: React.FC = () => {
  const navigate = useNavigate()
  const {
    getOverallProgress,
    getCompletedLessonsCount,
    getModuleProgress,
    getModuleCompletedCount,
    isModuleUnlocked,
    isLessonCompleted,
    isLessonUnlocked,
  } = useProgress()

  const activeDefaultModule =
    MODULES.find((m) => isModuleUnlocked(m.id) && getModuleCompletedCount(m.id) < 3)?.id ||
    'module1'

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [activeDefaultModule]: true,
  })

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }))
  }

  const overallPct = getOverallProgress()
  const completedTotal = getCompletedLessonsCount()

  const handleModuleCTA = (e: React.MouseEvent, mod: ModuleData) => {
    e.stopPropagation()
    navigate(`/learn/${mod.id}`)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Page Header */}
      <div className="max-w-3xl">
        <Eyebrow className="mb-4">STOXIQ ACADEMY</Eyebrow>
        <h1 className="font-serif text-[40px] sm:text-[56px] font-bold text-text-primary leading-[1.12] tracking-[-1px] mb-3">
          The Curriculum
        </h1>
        <p className="font-sans text-[17px] sm:text-[18px] leading-[1.8] text-text-secondary mb-7">
          Your complete path from zero to first trade.
        </p>

        <GlassCard tier={1} className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
              OVERALL CURRICULUM PROGRESS
            </span>
            <span className="font-sans text-[13px] font-medium text-text-primary tabular-nums">
              {overallPct}% · {completedTotal} of 12 lessons
            </span>
          </div>
          <ProgressBar value={overallPct} variant="standard" />
        </GlassCard>
      </div>

      {/* Vertical Accordion List — 4 Modules */}
      <div className="space-y-4">
        {MODULES.map((mod) => {
          const unlocked = isModuleUnlocked(mod.id)
          const doneCount = getModuleCompletedCount(mod.id)
          const modPct = getModuleProgress(mod.id)
          const isComplete = doneCount === 3
          const isInProgress = unlocked && doneCount > 0 && doneCount < 3
          const isExpanded = Boolean(expandedModules[mod.id])
          const IconComp = MODULE_ICONS[mod.icon]

          // First unlocked & incomplete lesson inside this module
          const activeLessonSlug = mod.lessons.find(
            (slug) =>
              isLessonUnlocked(mod.id, slug) && !isLessonCompleted(`${mod.id}_${slug}`)
          )

          return (
            <GlassCard
              key={mod.id}
              tier={2}
              goldEdge={isInProgress}
              className={cn(
                'overflow-hidden transition-all duration-300',
                isInProgress && 'border-l-[3px] border-l-gold-base',
                !unlocked && 'opacity-55'
              )}
            >
              {/* Module Accordion Header Row */}
              <div
                onClick={() => toggleModule(mod.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') toggleModule(mod.id)
                }}
                className="relative overflow-hidden p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 cursor-pointer hover:bg-[rgba(255,255,255,0.03)] transition-colors"
              >
                {/* Module Number 64px 6% Watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute left-4 -bottom-3 font-serif font-bold text-[64px] leading-none text-text-primary opacity-[0.06]"
                >
                  {mod.number}
                </span>

                <div className="relative z-10 flex items-start sm:items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-[12px] bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.25)] flex items-center justify-center shrink-0">
                    {!unlocked ? (
                      <Lock size={22} strokeWidth={1.5} className="text-text-tertiary" />
                    ) : (
                      <IconComp size={22} strokeWidth={1.5} className="text-gold-base" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-gold-base">
                        MODULE {mod.number}
                      </span>
                      {!unlocked ? (
                        <Badge variant="locked">LOCKED</Badge>
                      ) : isComplete ? (
                        <Badge variant="completed">COMPLETED</Badge>
                      ) : isInProgress ? (
                        <Badge variant="in-progress">IN PROGRESS</Badge>
                      ) : (
                        <Badge variant="not-started">NOT STARTED</Badge>
                      )}
                    </div>
                    <h2 className="font-serif text-[22px] sm:text-[26px] font-semibold text-text-primary">
                      {mod.title}
                    </h2>
                    <p className="font-sans text-[14px] text-text-secondary mt-0.5 line-clamp-1">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-4 lg:gap-6 shrink-0">
                  <div className="w-36 sm:w-44">
                    <div className="flex items-center justify-between text-[11px] font-sans text-text-tertiary mb-1.5 tabular-nums">
                      <span>{doneCount} of 3 lessons</span>
                      <span>{modPct}%</span>
                    </div>
                    <ProgressBar
                      value={modPct}
                      variant="thin"
                      tone={isComplete ? 'green' : 'gold'}
                    />
                  </div>

                  <Button
                    variant={isInProgress ? 'primary' : 'secondary'}
                    size="sm"
                    disabled={!unlocked}
                    onClick={(e) => handleModuleCTA(e, mod)}
                  >
                    {!unlocked
                      ? 'Locked'
                      : isComplete
                      ? 'Review'
                      : isInProgress
                      ? 'Continue'
                      : 'Start'}
                  </Button>

                  <ChevronDown
                    size={20}
                    strokeWidth={1.5}
                    className={cn(
                      'text-text-tertiary transition-transform duration-200 ml-auto sm:ml-0',
                      isExpanded && 'rotate-180 text-gold-base'
                    )}
                  />
                </div>
              </div>

              {/* Expanded Lesson Rows */}
              {isExpanded && (
                <div className="border-t border-[rgba(255,255,255,0.07)] divide-y divide-[rgba(255,255,255,0.06)] bg-[rgba(10,10,15,0.35)]">
                  {mod.lessons.map((slug) => {
                    const lesson = LESSONS[mod.id][slug]
                    const completed = isLessonCompleted(lesson.id)
                    const lessonUnlocked = isLessonUnlocked(mod.id, slug)
                    const isActiveRow = slug === activeLessonSlug

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => {
                          if (lessonUnlocked) navigate(`/learn/${mod.id}/${slug}`)
                        }}
                        role={lessonUnlocked ? 'button' : undefined}
                        tabIndex={lessonUnlocked ? 0 : undefined}
                        onKeyDown={(e) => {
                          if (lessonUnlocked && (e.key === 'Enter' || e.key === ' ')) {
                            navigate(`/learn/${mod.id}/${slug}`)
                          }
                        }}
                        className={cn(
                          'px-6 sm:px-8 py-4 flex items-center justify-between gap-4 transition-all',
                          isActiveRow &&
                            'bg-[rgba(201,168,76,0.04)] border-l-[3px] border-l-gold-base',
                          !lessonUnlocked
                            ? 'opacity-40 cursor-not-allowed'
                            : 'cursor-pointer hover:bg-[rgba(255,255,255,0.04)]'
                        )}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {completed ? (
                            <span className="w-6 h-6 rounded-full bg-gold-base flex items-center justify-center shrink-0">
                              <Check size={14} strokeWidth={2.5} className="text-bg-base-0" />
                            </span>
                          ) : isActiveRow ? (
                            <span className="w-6 h-6 rounded-full bg-gold-fill border border-gold-base flex items-center justify-center shrink-0">
                              <Play size={12} strokeWidth={1.8} className="text-gold-base ml-0.5" />
                            </span>
                          ) : !lessonUnlocked ? (
                            <span className="w-6 h-6 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center shrink-0">
                              <Lock size={13} strokeWidth={1.5} className="text-text-tertiary" />
                            </span>
                          ) : (
                            <Circle size={20} strokeWidth={1.5} className="text-text-tertiary shrink-0" />
                          )}

                          <div className="min-w-0">
                            <span className="block font-sans text-[11px] font-bold uppercase tracking-[1.6px] text-text-tertiary">
                              LESSON {lesson.number}
                            </span>
                            <span
                              className={cn(
                                'block font-serif text-[18px] truncate',
                                completed ? 'text-text-secondary' : 'text-text-primary'
                              )}
                            >
                              {lesson.title}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-5 shrink-0">
                          <span className="hidden sm:inline font-sans text-[12px] text-text-tertiary">
                            {lesson.duration}
                          </span>
                          <span
                            className={cn(
                              'inline-flex items-center gap-1 font-sans text-[13px] font-semibold',
                              lessonUnlocked ? 'text-gold-base' : 'text-text-tertiary'
                            )}
                          >
                            {completed ? 'Review' : 'Go'} <ArrowRight size={14} strokeWidth={1.5} />
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}

export default LearnHub
