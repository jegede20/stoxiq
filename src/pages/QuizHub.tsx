import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Landmark,
  TrendingUp,
  ShoppingBag,
  Trophy,
  Lock,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { QUIZZES } from '@/data/quizzes'
import { GlassCard } from '@/components/ui/GlassCard'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

const QUIZ_MODULE_META = [
  { id: 'quiz_module1', Icon: BookOpen, modName: 'Module 01: What Is a Stock?' },
  { id: 'quiz_module2', Icon: Landmark, modName: 'Module 02: How the Market Works' },
  { id: 'quiz_module3', Icon: TrendingUp, modName: 'Module 03: Reading Charts & Data' },
  { id: 'quiz_module4', Icon: ShoppingBag, modName: 'Module 04: Buying Your First Stock' },
]

export const QuizHub: React.FC = () => {
  const navigate = useNavigate()
  const {
    progress,
    getQuizAverage,
    getTakenQuizzesCount,
    isQuizUnlocked,
    isQuizTaken,
  } = useProgress()

  const quizAvg = getQuizAverage()
  const takenCount = getTakenQuizzesCount()

  const finalQuiz = QUIZZES.quiz_final
  const finalUnlocked = isQuizUnlocked('quiz_final')
  const finalTaken = isQuizTaken('quiz_final')
  const finalScore = progress.quizzes.quiz_final?.score ?? 0

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* Hero */}
      <div className="max-w-3xl">
        <Eyebrow className="mb-4">KNOWLEDGE VERIFICATION</Eyebrow>
        <h1 className="font-serif text-[38px] sm:text-[48px] font-bold text-text-primary leading-tight mb-3">
          Test Your Knowledge
        </h1>
        <p className="font-sans text-[17px] text-text-secondary">
          Reinforce every concept before risking real capital. Complete all 3 lessons in a module to unlock its quiz.
        </p>
      </div>

      {/* Overall Quiz Average Banner */}
      <GlassCard tier={2} goldEdge className="p-7 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-text-tertiary mb-2">
            OVERALL PERFORMANCE ({takenCount} OF 5 QUIZZES TAKEN)
          </span>
          <div className="font-serif text-[36px] sm:text-[48px] font-bold text-gold-base leading-none">
            Your Quiz Average: {takenCount > 0 ? `${quizAvg}%` : '—'}
          </div>
        </div>

        <div className="sm:text-right">
          <Badge variant={quizAvg >= 70 && takenCount > 0 ? 'completed' : 'neutral-gold'}>
            {takenCount === 0
              ? 'COMPLETE MODULE 1 TO START'
              : quizAvg >= 70
              ? 'PASSING AVERAGE (≥70%)'
              : 'KEEP PRACTICING'}
          </Badge>
        </div>
      </GlassCard>

      {/* 5 Quiz Cards (2-Column Grid + Full-Width Special Final Challenge Card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {QUIZ_MODULE_META.map(({ id, Icon, modName }) => {
          const quiz = QUIZZES[id]
          const unlocked = isQuizUnlocked(id)
          const taken = isQuizTaken(id)
          const lastScore = progress.quizzes[id]?.score ?? 0

          return (
            <GlassCard
              key={id}
              tier={2}
              goldEdge={unlocked && !taken}
              interactive={unlocked}
              className={`p-7 flex flex-col justify-between ${!unlocked ? 'opacity-60' : ''}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-11 h-11 rounded-[12px] bg-gold-fill border border-gold-border flex items-center justify-center">
                    <Icon size={22} strokeWidth={1.5} className="text-gold-base" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {taken && <Badge variant="in-progress">LAST SCORE: {lastScore}%</Badge>}
                    <Badge
                      variant={
                        quiz.difficulty === 'BEGINNER'
                          ? 'beginner'
                          : quiz.difficulty === 'INTERMEDIATE'
                          ? 'intermediate'
                          : 'advanced'
                      }
                    >
                      {quiz.difficulty}
                    </Badge>
                  </div>
                </div>

                <span className="block font-sans text-[10px] font-bold uppercase tracking-[2px] text-gold-base mb-1">
                  {quiz.eyebrow}
                </span>
                <h2 className="font-serif text-[22px] font-medium text-text-primary mb-2">
                  {quiz.title}
                </h2>
                <p className="font-sans text-[13px] text-text-tertiary mb-6">
                  {quiz.questionCount} Questions · {quiz.time} · {quiz.type}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-sans text-text-tertiary mb-1.5">
                    <span>{unlocked ? 'Best / Latest Score' : `Complete ${modName} to unlock`}</span>
                    <span className="tabular-nums">{taken ? `${lastScore}%` : '0%'}</span>
                  </div>
                  <ProgressBar
                    value={taken ? lastScore : 0}
                    variant="thin"
                    tone={lastScore >= 70 ? 'green' : 'gold'}
                  />
                </div>

                {!unlocked ? (
                  <Button variant="ghost" size="md" fullWidth disabled>
                    <Lock size={15} strokeWidth={1.5} /> Locked — Complete Module to Unlock
                  </Button>
                ) : taken ? (
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={() => navigate(`/quiz/${id}`)}
                  >
                    <RotateCcw size={15} strokeWidth={1.5} /> Retake Quiz
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => navigate(`/quiz/${id}`)}
                  >
                    Start Quiz <ArrowRight size={15} strokeWidth={1.5} />
                  </Button>
                )}
              </div>
            </GlassCard>
          )
        })}

        {/* Final Mega Quiz Card (Full-Width, Gold Shimmer Border) */}
        <GlassCard
          tier={2}
          className="md:col-span-2 relative overflow-hidden p-7 sm:p-9 border-2 border-[rgba(201,168,76,0.35)] animate-shimmer-border"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.16)_0%,transparent_70%)]"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-12 h-12 rounded-[14px] bg-gold-fill border border-gold-border flex items-center justify-center">
                  <Trophy size={24} strokeWidth={1.5} className="text-gold-base" />
                </div>
                <div>
                  <span className="block font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
                    CAPSTONE ASSESSMENT
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="advanced">ADVANCED</Badge>
                    {finalTaken && (
                      <Badge variant="in-progress">LAST SCORE: {finalScore}%</Badge>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="font-serif text-[26px] sm:text-[30px] font-bold text-text-primary tracking-[-0.3px]">
                THE FULL STOXIQ CHALLENGE
              </h2>
              <p className="font-sans text-[15px] text-text-secondary">
                20 Questions · All Modules · {finalUnlocked ? 'Unlocked and ready!' : 'Complete all 4 module quizzes to unlock'}
              </p>

              <div className="max-w-md pt-1">
                <ProgressBar
                  value={finalTaken ? finalScore : 0}
                  variant="thin"
                  tone={finalScore >= 70 ? 'green' : 'gold'}
                />
              </div>
            </div>

            <div className="shrink-0">
              {!finalUnlocked ? (
                <Button variant="ghost" size="lg" disabled>
                  <Lock size={16} strokeWidth={1.5} /> Locked ({Math.min(takenCount, 4)}/4 Module Quizzes Done)
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate(`/quiz/${finalQuiz.id}`)}
                >
                  {finalTaken ? 'Retake Final Challenge' : 'Start Final Challenge'}{' '}
                  <ArrowRight size={17} strokeWidth={1.5} />
                </Button>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default QuizHub
