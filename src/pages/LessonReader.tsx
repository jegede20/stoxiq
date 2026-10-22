import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Lock,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { LESSONS, MODULES } from '@/data/curriculum'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Callout, RichLessonParagraph } from '@/components/ui/Callout'
import { cn } from '@/lib/utils'

function slugifyHeading(text: string, idx: number): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `section-${idx}`
  )
}

export const LessonReader: React.FC = () => {
  const { moduleId = '', lessonId = '' } = useParams()
  const navigate = useNavigate()
  const {
    isLessonCompleted,
    isLessonUnlocked,
    setLessonComplete,
    setLastLesson,
    getModuleProgress,
    getContinueLesson,
  } = useProgress()

  const mod = MODULES.find((m) => m.id === moduleId)
  const lesson = mod ? LESSONS[moduleId]?.[lessonId] : undefined

  const [justCompletedBounce, setJustCompletedBounce] = useState(false)
  const [activeAnchor, setActiveAnchor] = useState<string>('')

  const sectionAnchors = useMemo(() => {
    if (!lesson) return []
    return lesson.content
      .map((block, idx) =>
        block.type === 'section' && block.title
          ? { id: slugifyHeading(block.title, idx), title: block.title, blockIdx: idx }
          : null
      )
      .filter((x): x is { id: string; title: string; blockIdx: number } => Boolean(x))
  }, [lesson])

  useEffect(() => {
    setJustCompletedBounce(false)
    if (lesson && isLessonUnlocked(moduleId, lessonId)) {
      setLastLesson(lesson.id)
    }
  }, [lesson, moduleId, lessonId, isLessonUnlocked, setLastLesson])

  useEffect(() => {
    if (!sectionAnchors.length) return
    setActiveAnchor(sectionAnchors[0].id)

    const onScroll = () => {
      let current = sectionAnchors[0].id
      for (const sec of sectionAnchors) {
        const el = document.getElementById(sec.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            current = sec.id
          }
        }
      }
      setActiveAnchor(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionAnchors])

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen app-shell-bg flex items-center justify-center p-6">
        <GlassCard tier={2} className="p-8 text-center max-w-md space-y-4">
          <h1 className="font-serif text-[28px] text-text-primary">Lesson not found</h1>
          <Button variant="primary" onClick={() => navigate('/learn')}>
            Back to Curriculum
          </Button>
        </GlassCard>
      </div>
    )
  }

  const unlocked = isLessonUnlocked(moduleId, lessonId)

  if (!unlocked) {
    const nextAllowed = getContinueLesson()
    return (
      <div className="min-h-screen app-shell-bg flex items-center justify-center p-6">
        <GlassCard tier={2} className="p-8 text-center max-w-lg space-y-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-gold-fill border border-gold-border flex items-center justify-center">
            <Lock size={24} strokeWidth={1.5} className="text-gold-base" />
          </div>
          <h1 className="font-serif text-[30px] text-text-primary">
            Complete Earlier Lessons First
          </h1>
          <p className="font-sans text-[15px] text-text-secondary">
            Lessons unlock sequentially so every concept builds naturally on the previous one.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={() =>
                navigate(`/learn/${nextAllowed.lesson.moduleId}/${nextAllowed.lesson.lessonSlug}`)
              }
            >
              Go to Next Unlocked Lesson <ArrowRight size={16} strokeWidth={1.5} />
            </Button>
            <Button variant="ghost" onClick={() => navigate(`/learn/${moduleId}`)}>
              Back to {mod.title}
            </Button>
          </div>
        </GlassCard>
      </div>
    )
  }

  const completed = isLessonCompleted(lesson.id)
  const lessonIdx = mod.lessons.indexOf(lessonId)
  const totalInMod = mod.lessons.length
  const prevSlug = lessonIdx > 0 ? mod.lessons[lessonIdx - 1] : null
  const nextSlug = lessonIdx < totalInMod - 1 ? mod.lessons[lessonIdx + 1] : null
  const modPct = getModuleProgress(mod.id)

  const handleMarkComplete = () => {
    setLessonComplete(lesson.id)
    setJustCompletedBounce(true)
  }

  const handleNext = () => {
    if (!completed) {
      setLessonComplete(lesson.id)
    }
    if (nextSlug) {
      navigate(`/learn/${mod.id}/${nextSlug}`)
    } else {
      navigate(`/quiz/${mod.quizId}`)
    }
  }

  return (
    <div className="min-h-screen app-shell-bg text-text-secondary">
      {/* LESSON TOP BAR (Sticky — Sidebar hidden in this view) */}
      <header className="sticky top-0 z-40 h-[64px] glass-tier-2 !rounded-none border-t-0 border-x-0 border-b border-[rgba(255,255,255,0.08)] px-4 sm:px-8 flex items-center justify-between gap-4">
        <Link
          to={`/learn/${mod.id}`}
          className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-gold-base hover:text-gold-light transition-colors shrink-0"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span className="truncate max-w-[160px] sm:max-w-none">{mod.title}</span>
        </Link>

        <div className="hidden md:block font-sans text-[13px] text-text-secondary truncate">
          Lesson {lessonIdx + 1} of {totalInMod} —{' '}
          <span className="text-text-primary font-medium">{lesson.title}</span>
        </div>

        <div className="flex items-center gap-3 w-28 sm:w-36 shrink-0">
          <ProgressBar value={modPct} variant="thin" />
          <span className="font-sans text-[11px] font-semibold text-gold-base tabular-nums">
            {modPct}%
          </span>
        </div>
      </header>

      {/* 3-COLUMN LAYOUT: empty left | content max-width 720px | sticky On This Page panel (>=1280px) */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 py-10 sm:py-14 xl:grid xl:grid-cols-[200px_minmax(0,720px)_200px] xl:justify-between xl:gap-10">
        {/* Column 1: Empty balanced left rail on >=1280px */}
        <div className="hidden xl:block" aria-hidden="true" />

        {/* Column 2: Main Lesson Content (max-width 720px) */}
        <article className="max-w-[720px] mx-auto w-full animate-page-in">
          {/* LESSON HEADER */}
          <header className="mb-10">
            <Eyebrow showLines={false} className="mb-3">
              MODULE {mod.number} · LESSON {lessonIdx + 1}
            </Eyebrow>

            <h1 className="font-serif text-[34px] sm:text-[44px] font-semibold text-text-primary leading-[1.18] mb-4">
              {lesson.title}
            </h1>

            <p className="font-sans text-[17px] sm:text-[18px] leading-[1.8] text-text-secondary mb-5">
              {lesson.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 font-sans text-[12px] text-text-tertiary">
              <span>{lesson.duration}</span>
              <span>·</span>
              <span>{lesson.level}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 text-text-accent">
                <BookOpen size={14} strokeWidth={1.5} /> {lesson.type}
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline text-text-tertiary">
                Hover highlighted terms for definitions
              </span>
            </div>

            {/* Gold horizontal rule divider */}
            <hr className="mt-7 border-0 h-[1px] bg-gradient-to-r from-[rgba(201,168,76,0.45)] via-[rgba(201,168,76,0.18)] to-transparent" />
          </header>

          {/* LESSON BODY BLOCKS */}
          <div className="space-y-8">
            {lesson.content.map((block, idx) => {
              if (block.type === 'section') {
                const anchorId = block.title ? slugifyHeading(block.title, idx) : `sec-${idx}`
                return (
                  <section key={idx} id={anchorId} className="scroll-mt-24 space-y-4">
                    {block.title && (
                      <h2 className="font-serif text-[25px] sm:text-[26px] font-semibold text-text-primary leading-[1.3]">
                        {block.title}
                      </h2>
                    )}
                    {block.body && <RichLessonParagraph text={block.body} />}
                  </section>
                )
              }

              if (
                block.type === 'key-concept' ||
                block.type === 'did-you-know' ||
                block.type === 'real-example' ||
                block.type === 'warning'
              ) {
                return (
                  <Callout key={idx} variant={block.type} title={block.title}>
                    {block.body}
                  </Callout>
                )
              }

              if (block.type === 'summary') {
                return (
                  <div
                    key={idx}
                    className="rounded-[14px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] border-t-2 border-t-gold-base p-6 sm:p-7 mt-10"
                  >
                    <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base mb-4">
                      {block.title || 'LESSON SUMMARY'}
                    </span>
                    <ul className="space-y-3">
                      {(block.bullets || []).map((b, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 font-sans text-[15px] leading-[1.75] text-text-secondary"
                        >
                          <span className="text-gold-base font-bold shrink-0">→</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }

              return null
            })}
          </div>

          {/* LESSON BOTTOM BAR */}
          <footer className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)] space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {prevSlug ? (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => navigate(`/learn/${mod.id}/${prevSlug}`)}
                >
                  <ArrowLeft size={15} strokeWidth={1.5} /> Previous Lesson
                </Button>
              ) : (
                <Button variant="ghost" size="md" disabled>
                  <ArrowLeft size={15} strokeWidth={1.5} /> Previous Lesson
                </Button>
              )}

              <Button
                variant="primary"
                size="md"
                onClick={handleMarkComplete}
                className={cn(
                  completed && 'bg-positive text-bg-base-0 hover:bg-positive/90',
                  justCompletedBounce && 'animate-bounce-check'
                )}
              >
                <Check size={16} strokeWidth={2.5} />
                {completed ? 'Completed' : 'Mark as Complete'}
              </Button>

              <Button variant="secondary" size="md" onClick={handleNext}>
                {nextSlug ? 'Next' : 'Module Quiz'}{' '}
                <ArrowRight size={15} strokeWidth={1.5} />
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[12px] font-sans">
              <div className="text-text-tertiary">
                <Link to="/dashboard" className="hover:text-text-primary transition-colors">
                  Dashboard
                </Link>{' '}
                / <Link to="/learn" className="hover:text-text-primary transition-colors">Learn</Link>{' '}
                / <Link to={`/learn/${mod.id}`} className="hover:text-text-primary transition-colors">{mod.title}</Link>{' '}
                / <span className="text-text-secondary">Lesson {lesson.number}</span>
              </div>

              <Link
                to={`/quiz/${mod.quizId}`}
                className="font-semibold text-gold-base hover:text-gold-light inline-flex items-center gap-1"
              >
                Skip to Module Quiz <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
            </div>
          </footer>
        </article>

        {/* Column 3: ON THIS PAGE Panel (Sticky Right, Desktop >=1280px only) */}
        <aside className="hidden xl:block w-[200px]">
          <div className="sticky top-[96px] space-y-3">
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-text-tertiary mb-3">
              ON THIS PAGE
            </span>
            <nav className="space-y-2 border-l border-[rgba(255,255,255,0.08)]">
              {sectionAnchors.map((sec) => {
                const isActive = activeAnchor === sec.id
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById(sec.id)
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      setActiveAnchor(sec.id)
                    }}
                    className={cn(
                      'block pl-3.5 py-1 font-sans text-[12.5px] leading-[1.45] -ml-[1px] border-l-2 transition-colors',
                      isActive
                        ? 'border-gold-base text-gold-base font-medium'
                        : 'border-transparent text-text-tertiary hover:text-text-secondary'
                    )}
                  >
                    {sec.title}
                  </a>
                )
              })}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default LessonReader
