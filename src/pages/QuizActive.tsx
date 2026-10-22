import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  X,
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { QUIZZES } from '@/data/quizzes'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { ProgressBar, type QuizSegmentStatus } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/utils'

export const QuizActive: React.FC = () => {
  const { quizId = '' } = useParams()
  const navigate = useNavigate()
  const { isQuizUnlocked, setQuizScore } = useProgress()

  const quiz = QUIZZES[quizId]
  const startedAtRef = useRef<number>(Date.now())

  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  if (!quiz) {
    return (
      <div className="min-h-screen app-shell-bg flex items-center justify-center p-6">
        <GlassCard tier={2} className="p-8 text-center max-w-md space-y-4">
          <h1 className="font-serif text-[28px] text-text-primary">Quiz not found</h1>
          <Button variant="primary" onClick={() => navigate('/quiz')}>
            Back to Quiz Hub
          </Button>
        </GlassCard>
      </div>
    )
  }

  const unlocked = isQuizUnlocked(quiz.id)

  if (!unlocked) {
    return (
      <div className="min-h-screen app-shell-bg flex items-center justify-center p-6">
        <GlassCard tier={2} className="p-8 text-center max-w-lg space-y-5">
          <div className="w-14 h-14 mx-auto rounded-full bg-gold-fill border border-gold-border flex items-center justify-center">
            <Lock size={24} strokeWidth={1.5} className="text-gold-base" />
          </div>
          <h1 className="font-serif text-[30px] text-text-primary">Quiz Locked</h1>
          <p className="font-sans text-[15px] text-text-secondary">
            {quiz.id === 'quiz_final'
              ? 'Complete all 4 module quizzes first to unlock The Full StoxIQ Challenge.'
              : 'Complete all 3 lessons in this module first to unlock its quiz.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" onClick={() => navigate('/learn')}>
              Go to Curriculum <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
            <Button variant="ghost" onClick={() => navigate('/quiz')}>
              Back to Quiz Hub
            </Button>
          </div>
        </GlassCard>
      </div>
    )
  }

  const question = quiz.questions[currentIdx]
  const selectedOptId = answers[question.id]
  const isAnswered = Boolean(selectedOptId)
  const correctOpt = question.options.find((o) => o.correct)!
  const isLastQuestion = currentIdx === quiz.questions.length - 1

  const segments: QuizSegmentStatus[] = quiz.questions.map((q, idx) => {
    const picked = answers[q.id]
    if (picked) {
      const right = q.options.find((o) => o.id === picked)?.correct
      return right ? 'correct' : 'wrong'
    }
    if (idx === currentIdx) return 'current'
    return 'unanswered'
  })

  const handleSelectOption = (optId: string) => {
    if (isAnswered) return
    setAnswers((prev) => ({ ...prev, [question.id]: optId }))
  }

  const handleNextOrFinish = () => {
    if (!isAnswered) return
    if (!isLastQuestion) {
      setCurrentIdx((i) => i + 1)
      return
    }

    const correctCount = quiz.questions.reduce((acc, q) => {
      const chosen = answers[q.id]
      const isRight = q.options.find((o) => o.id === chosen)?.correct
      return acc + (isRight ? 1 : 0)
    }, 0)

    const pctScore = Math.round((correctCount / quiz.questions.length) * 100)
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000))

    const detail = {
      quizId: quiz.id,
      score: pctScore,
      correctCount,
      totalQuestions: quiz.questions.length,
      elapsedSeconds,
      answers,
      completedAt: Date.now(),
    }

    setQuizScore(quiz.id, pctScore, detail)
    navigate(`/quiz/${quiz.id}/results`, { state: detail })
  }

  return (
    <div className="min-h-screen app-shell-bg relative flex flex-col">
      {/* Strong Vignette Overlay from Edges Inward */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,10,15,0.68)_100%)]"
      />

      {/* QUIZ TOP BAR */}
      <header className="relative z-20 h-[68px] glass-tier-2 !rounded-none border-t-0 border-x-0 border-b border-[rgba(255,255,255,0.08)] px-4 sm:px-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/quiz')}
          className="inline-flex items-center gap-2 font-sans text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors shrink-0"
        >
          <X size={17} strokeWidth={1.5} /> Exit Quiz
        </button>

        <div className="hidden md:block font-serif text-[18px] text-text-primary truncate">
          {quiz.title}
        </div>

        <div className="w-36 sm:w-56 md:w-64 shrink-0">
          <ProgressBar variant="segmented" segments={segments} />
        </div>
      </header>

      {/* CENTERED QUESTION CARD (max-width 700px) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <GlassCard tier={2} className="w-full max-w-[700px] p-6 sm:p-9 space-y-7 animate-page-in">
          <div>
            <Eyebrow showLines={false} className="mb-3">
              QUESTION {currentIdx + 1} OF {quiz.questions.length}
            </Eyebrow>
            <h1 className="font-serif text-[24px] sm:text-[28px] font-medium text-text-primary leading-[1.35]">
              {question.question}
            </h1>
          </div>

          {/* 4 Answer Option Cards */}
          <div className="space-y-3.5">
            {question.options.map((opt) => {
              const isSelected = selectedOptId === opt.id
              const isCorrectOption = Boolean(opt.correct)

              let cardClasses =
                'glass-tier-2 border border-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.10)] hover:border-gold-border hover:-translate-y-0.5'
              let circleClasses =
                'border border-[rgba(255,255,255,0.18)] text-text-secondary'

              if (isAnswered) {
                if (isSelected && isCorrectOption) {
                  cardClasses =
                    'bg-[rgba(74,222,128,0.06)] border border-positive text-text-primary'
                  circleClasses = 'bg-positive border-positive text-bg-base-0'
                } else if (isSelected && !isCorrectOption) {
                  cardClasses =
                    'bg-[rgba(248,113,113,0.06)] border border-negative text-text-primary'
                  circleClasses = 'bg-negative border-negative text-bg-base-0'
                } else if (isCorrectOption) {
                  cardClasses =
                    'bg-[rgba(74,222,128,0.04)] border border-positive/80 text-text-primary'
                  circleClasses = 'border border-positive text-positive'
                } else {
                  cardClasses =
                    'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] opacity-55'
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={cn(
                    'w-full rounded-[14px] p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-all duration-200',
                    cardClasses,
                    !isAnswered && 'cursor-pointer'
                  )}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={cn(
                        'w-[28px] h-[28px] rounded-full flex items-center justify-center font-sans text-[12px] font-bold uppercase shrink-0 transition-colors',
                        circleClasses
                      )}
                    >
                      {isAnswered && isSelected && isCorrectOption ? (
                        <Check size={14} strokeWidth={2.5} />
                      ) : isAnswered && isSelected && !isCorrectOption ? (
                        <X size={14} strokeWidth={2.5} />
                      ) : (
                        opt.id
                      )}
                    </span>

                    <span className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-text-primary">
                      {opt.text}
                    </span>
                  </div>

                  {isAnswered && isCorrectOption && (
                    <Check size={18} strokeWidth={2.2} className="text-positive shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Explanation Panel (Slides In After Answer, 200ms) */}
          {isAnswered && (
            <div className="glass-tier-2 !rounded-[12px] p-5 border-l-[3px] border-l-[#6366F1] animate-page-in space-y-2">
              <span className="block font-sans text-[11px] font-bold uppercase tracking-[1.8px] text-[#818CF8]">
                Why {correctOpt.id.toUpperCase()} is correct:
              </span>
              <p className="font-sans text-[14.5px] leading-[1.75] text-text-secondary">
                {question.explanation}
              </p>
              <Link
                to={question.lessonLink.route}
                className="inline-flex items-center gap-1 pt-1 font-sans text-[12.5px] font-semibold text-gold-base hover:text-gold-light"
              >
                Review {question.lessonLink.label} <ArrowRight size={13} strokeWidth={1.5} />
              </Link>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-3 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              size="md"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            >
              <ArrowLeft size={15} strokeWidth={1.5} /> Previous
            </Button>

            <Button
              variant={isLastQuestion && isAnswered ? 'primary' : 'secondary'}
              size="md"
              disabled={!isAnswered}
              onClick={handleNextOrFinish}
            >
              {isLastQuestion ? 'View Results' : 'Next Question'}{' '}
              <ArrowRight size={15} strokeWidth={1.5} />
            </Button>
          </div>
        </GlassCard>
      </main>
    </div>
  )
}

export default QuizActive
