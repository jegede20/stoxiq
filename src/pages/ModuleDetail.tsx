import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  BookOpen,
  Landmark,
  TrendingUp,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Lock,
  Play,
  Brain,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { LESSONS, MODULES } from '@/data/curriculum'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/utils'

const MODULE_ICONS = {
  BookOpen,
  Landmark,
  TrendingUp,
  ShoppingBag,
}

export const ModuleDetail: React.FC = () => {
  const { moduleId = '' } = useParams()
  const navigate = useNavigate()
  const {
    getModuleProgress,
    getModuleCompletedCount,
    isModuleUnlocked,
    isLessonCompleted,
    isLessonUnlocked,
    isQuizUnlocked,
    isQuizTaken,
    progress,
  } = useProgress()

  const mod = MODULES.find((m) => m.id === moduleId)

  if (!mod) {
    return (
      <div className="p-8 text-center space-y-4">
        <h1 className="font-serif text-[32px] text-text-primary">Module not found</h1>
        <Button variant="primary" onClick={() => navigate('/learn')}>
          Back to Curriculum
        </Button>
      </div>
    )
  }

  const unlocked = isModuleUnlocked(mod.id)
  const doneCount = getModuleCompletedCount(mod.id)
  const pct = getModuleProgress(mod.id)
  const IconComp = MODULE_ICONS[mod.icon]

  const targetSlug =
    mod.lessons.find(
      (slug) => isLessonUnlocked(mod.id, slug) && !isLessonCompleted(`${mod.id}_${slug}`)
    ) || mod.lessons[0]

  const quizUnlocked = isQuizUnlocked(mod.quizId)
  const quizTaken = isQuizTaken(mod.quizId)
  const quizScore = progress.quizzes[mod.quizId]?.score

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      <Link
        to="/learn"
        className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-gold-base hover:text-gold-light transition-colors"
      >
        <ArrowLeft size={15} strokeWidth={1.5} /> Back to Curriculum
      </Link>

      {/* Module Hero (Full-Width Glass Panel) */}
      <GlassCard tier={2} goldEdge={unlocked} className="relative overflow-hidden p-7 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_70%)]"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="w-[80px] h-[80px] rounded-[20px] bg-gold-fill border border-gold-border flex items-center justify-center shrink-0">
            <IconComp size={42} strokeWidth={1.5} className="text-gold-base" />
          </div>

          <div className="flex-1 min-w-0">
            <Eyebrow className="mb-3">MODULE {mod.number}</Eyebrow>
            <h1 className="font-serif text-[36px] sm:text-[52px] font-bold text-text-primary leading-[1.12] mb-3">
              {mod.title}
            </h1>
            <p className="font-sans text-[16px] sm:text-[17px] leading-[1.8] text-text-secondary max-w-2xl mb-6">
              {mod.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex-1 max-w-sm">
                <div className="flex items-center justify-between text-[12px] font-sans text-text-secondary mb-2 tabular-nums">
                  <span>{doneCount} of 3 lessons complete</span>
                  <span className="text-gold-base font-semibold">{pct}%</span>
                </div>
                <ProgressBar value={pct} variant="standard" tone={doneCount === 3 ? 'green' : 'gold'} />
              </div>

              {unlocked ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(`/learn/${mod.id}/${targetSlug}`)}
                >
                  {doneCount === 0
                    ? 'Begin Module'
                    : doneCount === 3
                    ? 'Review Module'
                    : 'Continue Module'}{' '}
                  <ArrowRight size={17} strokeWidth={1.5} />
                </Button>
              ) : (
                <Button variant="secondary" size="md" onClick={() => navigate('/learn')}>
                  <Lock size={15} strokeWidth={1.5} /> Complete Previous Module First
                </Button>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Two-Column Layout Below Hero (60/40 split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 60% (7 cols): Lesson List Rows */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-2">
            MODULE LESSONS
          </h2>

          {mod.lessons.map((slug) => {
            const lesson = LESSONS[mod.id][slug]
            const completed = isLessonCompleted(lesson.id)
            const lessonUnlocked = isLessonUnlocked(mod.id, slug)

            return (
              <GlassCard
                key={lesson.id}
                tier={2}
                goldEdge={lessonUnlocked && !completed}
                interactive={lessonUnlocked}
                onClick={() => {
                  if (lessonUnlocked) navigate(`/learn/${mod.id}/${slug}`)
                }}
                className={cn(
                  'p-6 flex items-center justify-between gap-4',
                  !lessonUnlocked ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'
                )}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                      completed
                        ? 'bg-gold-base text-bg-base-0'
                        : lessonUnlocked
                        ? 'bg-gold-fill border border-gold-border text-gold-base'
                        : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-text-tertiary'
                    )}
                  >
                    {completed ? (
                      <Check size={18} strokeWidth={2.5} />
                    ) : lessonUnlocked ? (
                      <Play size={16} strokeWidth={1.5} className="ml-0.5" />
                    ) : (
                      <Lock size={16} strokeWidth={1.5} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[1.8px] text-gold-base">
                        LESSON {lesson.number}
                      </span>
                      <Badge variant="beginner">{lesson.level}</Badge>
                      {completed && <Badge variant="completed">COMPLETED</Badge>}
                    </div>
                    <h3 className="font-serif text-[21px] font-medium text-text-primary mb-1">
                      {lesson.title}
                    </h3>
                    <p className="font-sans text-[14px] text-text-secondary line-clamp-2">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="font-sans text-[12px] text-text-tertiary whitespace-nowrap">
                    {lesson.duration}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-gold-base inline-flex items-center gap-1">
                    {completed ? 'Review' : lessonUnlocked ? 'Read' : 'Locked'}{' '}
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </div>
              </GlassCard>
            )
          })}
        </div>

        {/* Right 40% (5 cols): Sticky "WHAT YOU'LL GAIN" Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-[88px]">
          <GlassCard tier={2} className="p-7 space-y-6">
            <div>
              <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-4">
                WHAT YOU&apos;LL GAIN
              </span>
              <ul className="space-y-3.5">
                {mod.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-positive-dim border border-[rgba(74,222,128,0.3)] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} strokeWidth={2.2} className="text-positive" />
                    </span>
                    <span className="font-sans text-[14px] leading-[1.7] text-text-secondary">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 border-t border-[rgba(255,255,255,0.08)] space-y-3 font-sans text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary inline-flex items-center gap-2">
                  <Clock size={15} strokeWidth={1.5} /> Estimated Time
                </span>
                <span className="text-text-primary font-semibold">{mod.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary inline-flex items-center gap-2">
                  <BookOpen size={15} strokeWidth={1.5} /> Lessons Included
                </span>
                <span className="text-text-primary font-semibold">3 Sequential Lessons</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-tertiary inline-flex items-center gap-2">
                  <Brain size={15} strokeWidth={1.5} /> Module Quiz
                </span>
                <span className="text-gold-light font-semibold">
                  {quizTaken
                    ? `Scored ${quizScore}%`
                    : quizUnlocked
                    ? 'Unlocked & Ready'
                    : 'Unlocks at 3/3'}
                </span>
              </div>
            </div>

            <Button
              variant={quizUnlocked ? 'primary' : 'secondary'}
              size="md"
              fullWidth
              disabled={!quizUnlocked}
              onClick={() => navigate(`/quiz/${mod.quizId}`)}
            >
              {quizUnlocked ? (
                <>
                  {quizTaken ? 'Retake Module Quiz' : 'Start Module Quiz'}{' '}
                  <ArrowRight size={15} strokeWidth={1.5} />
                </>
              ) : (
                <>
                  <Lock size={14} strokeWidth={1.5} /> Complete All 3 Lessons for Quiz
                </>
              )}
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

export default ModuleDetail
