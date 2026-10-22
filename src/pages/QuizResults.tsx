import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  Trophy,
  Check,
  X,
  ArrowRight,
  RotateCcw,
  Home,
} from 'lucide-react'
import { useProgress, type LastQuizAttemptDetail } from '@/contexts/ProgressContext'
import { QUIZZES } from '@/data/quizzes'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins === 0) return `${secs}s`
  return `${mins}m ${secs}s`
}

export const QuizResults: React.FC = () => {
  const { quizId = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { progress, getLastQuizAttemptDetail, setQuizScore } = useProgress()

  const quiz = QUIZZES[quizId]
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const stateDetail = (location.state as LastQuizAttemptDetail | null) || null
  const cachedDetail = quiz ? getLastQuizAttemptDetail(quiz.id) : null
  const detail = stateDetail || cachedDetail

  const storedScore = quiz ? progress.quizzes[quiz.id]?.score ?? 0 : 0
  const finalScore = detail ? detail.score : storedScore
  const totalQuestions = quiz ? quiz.questions.length : 0
  const correctCount = detail
    ? detail.correctCount
    : Math.round((finalScore / 100) * totalQuestions)
  const wrongCount = Math.max(0, totalQuestions - correctCount)
  const elapsedSeconds = detail?.elapsedSeconds ?? 65
  const passed = finalScore >= 70

  const [displayScore, setDisplayScore] = useState(0)

  // Save score on load if navigated with state
  useEffect(() => {
    if (quiz && stateDetail) {
      setQuizScore(quiz.id, stateDetail.score, stateDetail)
    }
  }, [quiz, stateDetail, setQuizScore])

  // Score count-up from 0 on load
  useEffect(() => {
    let frameId = 0
    const duration = 900
    const start = performance.now()

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayScore(Math.round(eased * finalScore))
      if (t < 1) frameId = requestAnimationFrame(step)
    }
    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [finalScore])

  // Subtle 2-second Gold Confetti Burst on Canvas if >= 70%
  useEffect(() => {
    if (!passed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#C9A84C', '#E8D08A', '#D4C99A', '#4ADE80']
    const particles = Array.from({ length: 70 }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 260,
      y: 160 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 6.5,
      vy: Math.random() * -5 - 1.5,
      size: Math.random() * 6 + 3,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    const start = performance.now()
    let animId = 0

    const render = (now: number) => {
      const elapsed = now - start
      if (elapsed > 2100) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        return
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const alpha = Math.max(0, 1 - elapsed / 2100)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.14
        p.rot += p.vRot

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65)
        ctx.restore()
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [passed])

  if (!quiz) {
    return (
      <div className="min-h-screen app-shell-bg flex items-center justify-center p-6">
        <GlassCard tier={2} className="p-8 text-center space-y-4">
          <h1 className="font-serif text-[28px] text-text-primary">Quiz results unavailable</h1>
          <Button variant="primary" onClick={() => navigate('/quiz')}>
            Back to Quiz Hub
          </Button>
        </GlassCard>
      </div>
    )
  }

  const radius = 56
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (finalScore / 100) * circumference

  return (
    <div className="min-h-screen app-shell-bg text-text-secondary relative py-12 px-4 sm:px-8">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50"
      />

      <div className="max-w-[1080px] mx-auto space-y-10 animate-page-in">
        {/* RESULTS HERO (Centered) */}
        <GlassCard tier={2} goldEdge={passed} className="p-8 sm:p-12 text-center space-y-4">
          <div className="w-[80px] h-[80px] mx-auto rounded-full bg-gold-fill border border-gold-border flex items-center justify-center animate-bounce-check">
            <Trophy size={44} strokeWidth={1.5} className="text-gold-base" />
          </div>

          <p className="font-sans text-[18px] text-text-secondary">You scored</p>

          <div className="font-serif text-[72px] sm:text-[96px] font-bold text-gold-base leading-none tabular-nums">
            {displayScore}%
          </div>

          <p className="font-sans text-[18px] text-text-primary">
            {correctCount} correct out of {totalQuestions} questions
          </p>

          <div className="pt-2">
            {passed ? (
              <Badge variant="in-progress" className="!text-[11px] !px-4 !py-1.5">
                PASS · EXCELLENT MASTERY
              </Badge>
            ) : (
              <Badge variant="intermediate" className="!text-[11px] !px-4 !py-1.5">
                KEEP PRACTICING · 70% TO PASS
              </Badge>
            )}
          </div>
        </GlassCard>

        {/* TWO-COLUMN LAYOUT: Left 35% Breakdown + Circular SVG Ring | Right 65% Answer Review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 35% (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <GlassCard tier={2} className="p-7 flex flex-col items-center text-center space-y-6">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
                SCORE BREAKDOWN
              </span>

              {/* Circular Score Ring SVG */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-serif text-[28px] font-bold text-text-primary">
                    {finalScore}%
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[1.5px] text-text-tertiary">
                    ACCURACY
                  </span>
                </div>
              </div>

              <div className="w-full space-y-3 pt-2 border-t border-[rgba(255,255,255,0.08)] font-sans text-[14px]">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Correct Answers</span>
                  <span className="font-semibold text-positive">{correctCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Incorrect Answers</span>
                  <span className="font-semibold text-negative">{wrongCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Time Taken</span>
                  <span className="font-semibold text-text-primary">
                    {formatDuration(elapsedSeconds)}
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right 65% (8 cols): Full Answer Review List */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-serif text-[26px] font-semibold text-text-primary mb-2">
              Answer Review
            </h2>

            {quiz.questions.map((q, idx) => {
              const correctOpt = q.options.find((o) => o.correct)!
              const pickedId = detail?.answers?.[q.id]
              const pickedOpt = q.options.find((o) => o.id === pickedId)
              const wasRight = pickedId ? pickedId === correctOpt.id : finalScore === 100

              return (
                <GlassCard
                  key={q.id}
                  tier={2}
                  className="p-6 space-y-3 border-l-[3px]"
                  style={{
                    borderLeftColor: wasRight ? '#4ADE80' : '#F87171',
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          wasRight
                            ? 'bg-positive-dim text-positive'
                            : 'bg-negative-dim text-negative'
                        }`}
                      >
                        {wasRight ? (
                          <Check size={14} strokeWidth={2.5} />
                        ) : (
                          <X size={14} strokeWidth={2.5} />
                        )}
                      </span>
                      <div>
                        <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.8px] text-text-tertiary mb-1">
                          QUESTION {idx + 1}
                        </span>
                        <h3 className="font-serif text-[19px] text-text-primary">{q.question}</h3>
                      </div>
                    </div>
                  </div>

                  {!wasRight && pickedOpt && (
                    <div className="pl-9 font-sans text-[13.5px] text-negative">
                      Your answer: {pickedOpt.id.toUpperCase()}) {pickedOpt.text}
                    </div>
                  )}

                  <div className="pl-9 font-sans text-[14px] text-positive">
                    Correct answer: {correctOpt.id.toUpperCase()}) {correctOpt.text}
                  </div>

                  <p className="pl-9 font-sans text-[13.5px] leading-[1.7] text-text-secondary">
                    {q.explanation}
                  </p>

                  {!wasRight && (
                    <div className="pl-9 pt-1">
                      <Link
                        to={q.lessonLink.route}
                        className="inline-flex items-center gap-1 font-sans text-[13px] font-semibold text-gold-base hover:text-gold-light"
                      >
                        Review lesson <ArrowRight size={13} strokeWidth={1.5} />
                      </Link>
                    </div>
                  )}
                </GlassCard>
              )
            })}
          </div>
        </div>

        {/* BOTTOM CTA ROW */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(`/quiz/${quiz.id}`)}
          >
            <RotateCcw size={16} strokeWidth={1.5} /> Retake Quiz
          </Button>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate(quiz.nextModuleRoute)}
          >
            {quiz.id === 'quiz_final' || quiz.id === 'quiz_module4'
              ? 'Explore Platforms'
              : 'Next Module'}{' '}
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>

          <Button variant="ghost" size="lg" onClick={() => navigate('/dashboard')}>
            <Home size={16} strokeWidth={1.5} /> Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuizResults
