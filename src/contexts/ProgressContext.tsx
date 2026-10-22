import React, { createContext, useContext, useState, useCallback } from 'react'
import { ALL_LESSONS_ORDERED, LESSONS, MODULES, type LessonData } from '@/data/curriculum'

export type RegionKey = 'us' | 'uk' | 'africa'

export interface LessonStatus {
  completed: boolean
  completedAt: number | null
}

export interface QuizStatus {
  taken: boolean
  score: number | null
  lastTaken: number | null
}

export type BrokerSteps = Record<string, boolean>

export interface RiskVisit {
  visited: boolean
}

export interface ProgressData {
  lessons: Record<string, LessonStatus>
  quizzes: Record<string, QuizStatus>
  steps: Record<string, BrokerSteps>
  risks: Record<string, RiskVisit>
}

export interface Preferences {
  marketDataEnabled: boolean
  defaultChartView: 'line' | 'candle'
  defaultTimeRange: '1D' | '1W' | '1M' | '3M'
}

export interface MetaData {
  firstVisit: number
  lastVisit: number
  lastLesson: string | null
  appVersion: string
}

export interface LastQuizAttemptDetail {
  quizId: string
  score: number
  correctCount: number
  totalQuestions: number
  elapsedSeconds: number
  answers: Record<string, string>
  completedAt: number
}

function makeSteps(count: number): BrokerSteps {
  const obj: BrokerSteps = {}
  for (let i = 1; i <= count; i++) {
    obj[`step${i}`] = false
  }
  return obj
}

export function createInitialProgress(): ProgressData {
  return {
    lessons: {
      module1_lesson1: { completed: false, completedAt: null },
      module1_lesson2: { completed: false, completedAt: null },
      module1_lesson3: { completed: false, completedAt: null },
      module2_lesson1: { completed: false, completedAt: null },
      module2_lesson2: { completed: false, completedAt: null },
      module2_lesson3: { completed: false, completedAt: null },
      module3_lesson1: { completed: false, completedAt: null },
      module3_lesson2: { completed: false, completedAt: null },
      module3_lesson3: { completed: false, completedAt: null },
      module4_lesson1: { completed: false, completedAt: null },
      module4_lesson2: { completed: false, completedAt: null },
      module4_lesson3: { completed: false, completedAt: null },
    },
    quizzes: {
      quiz_module1: { taken: false, score: null, lastTaken: null },
      quiz_module2: { taken: false, score: null, lastTaken: null },
      quiz_module3: { taken: false, score: null, lastTaken: null },
      quiz_module4: { taken: false, score: null, lastTaken: null },
      quiz_final: { taken: false, score: null, lastTaken: null },
    },
    steps: {
      broker_robinhood: makeSteps(11),
      broker_fidelity: makeSteps(11),
      broker_webull: makeSteps(10),
      broker_freetrade: makeSteps(10),
      broker_trading212: makeSteps(10),
      broker_etoro_uk: makeSteps(10),
      broker_bamboo: makeSteps(9),
      broker_easyequities: makeSteps(10),
      broker_chaka: makeSteps(10),
    },
    risks: {
      'emotional-trading': { visited: false },
      'beginner-mistakes': { visited: false },
      'scams-red-flags': { visited: false },
      'volatility-loss': { visited: false },
    },
  }
}

const INITIAL_PREFERENCES: Preferences = {
  marketDataEnabled: true,
  defaultChartView: 'line',
  defaultTimeRange: '1D',
}

function readHydratedProgress(): ProgressData {
  const base = createInitialProgress()
  if (typeof window === 'undefined') return base
  try {
    const raw = localStorage.getItem('stoxiq_progress')
    if (!raw) return base
    const parsed = JSON.parse(raw) as Partial<ProgressData>
    return {
      lessons: { ...base.lessons, ...(parsed.lessons || {}) },
      quizzes: { ...base.quizzes, ...(parsed.quizzes || {}) },
      steps: Object.keys(base.steps).reduce((acc, key) => {
        acc[key] = { ...base.steps[key], ...(parsed.steps?.[key] || {}) }
        return acc
      }, {} as Record<string, BrokerSteps>),
      risks: { ...base.risks, ...(parsed.risks || {}) },
    }
  } catch {
    return base
  }
}

function readHydratedRegion(): RegionKey | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('stoxiq_region')
    if (!raw) return null
    let cleaned = raw
    try {
      cleaned = JSON.parse(raw)
    } catch {
      // plain string
    }
    if (cleaned === 'us' || cleaned === 'uk' || cleaned === 'africa') {
      return cleaned
    }
  } catch {
    // ignore
  }
  return null
}

function readHydratedPreferences(): Preferences {
  if (typeof window === 'undefined') return INITIAL_PREFERENCES
  try {
    const raw = localStorage.getItem('stoxiq_preferences')
    if (!raw) return INITIAL_PREFERENCES
    const parsed = JSON.parse(raw) as Partial<Preferences>
    return { ...INITIAL_PREFERENCES, ...parsed }
  } catch {
    return INITIAL_PREFERENCES
  }
}

function readHydratedMeta(): MetaData {
  const fallback: MetaData = {
    firstVisit: Date.now(),
    lastVisit: Date.now(),
    lastLesson: null,
    appVersion: '1.0.0',
  }
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem('stoxiq_meta')
    if (!raw) {
      localStorage.setItem('stoxiq_meta', JSON.stringify(fallback))
      return fallback
    }
    const parsed = JSON.parse(raw) as Partial<MetaData>
    const updated: MetaData = {
      firstVisit: parsed.firstVisit || Date.now(),
      lastVisit: Date.now(),
      lastLesson: parsed.lastLesson || null,
      appVersion: '1.0.0',
    }
    localStorage.setItem('stoxiq_meta', JSON.stringify(updated))
    return updated
  } catch {
    return fallback
  }
}

interface ProgressContextType {
  progress: ProgressData
  region: RegionKey | null
  preferences: Preferences
  meta: MetaData
  isLoaded: boolean
  hasReturningProgress: boolean
  setLessonComplete: (lessonKey: string) => void
  setLessonIncomplete: (lessonKey: string) => void
  setQuizScore: (quizId: string, score: number, detail?: LastQuizAttemptDetail) => void
  getLastQuizAttemptDetail: (quizId: string) => LastQuizAttemptDetail | null
  setStepComplete: (brokerStorageKey: string, stepKey: string, completed: boolean) => void
  setRiskVisited: (riskId: string) => void
  setRegion: (region: RegionKey | null) => void
  setPreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void
  setLastLesson: (lessonKey: string | null) => void
  getOverallProgress: () => number
  getCompletedLessonsCount: () => number
  getModuleProgress: (moduleId: string) => number
  getModuleCompletedCount: (moduleId: string) => number
  getQuizAverage: () => number
  getTakenQuizzesCount: () => number
  getLatestQuizScore: () => { quizId: string; score: number } | null
  getContinueLesson: () => { lesson: LessonData; moduleTitle: string; moduleProgress: number }
  isLessonCompleted: (lessonKey: string) => boolean
  isQuizTaken: (quizId: string) => boolean
  isModuleUnlocked: (moduleId: string) => boolean
  isQuizUnlocked: (quizId: string) => boolean
  isLessonUnlocked: (moduleId: string, lessonSlug: string) => boolean
  resetAllProgress: () => void
  exportProgress: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressData>(() => readHydratedProgress())
  const [region, setRegionState] = useState<RegionKey | null>(() => readHydratedRegion())
  const [preferences, setPreferencesState] = useState<Preferences>(() => readHydratedPreferences())
  const [meta, setMetaState] = useState<MetaData>(() => readHydratedMeta())

  const hasReturningProgress = Boolean(
    meta.lastLesson || Object.values(progress.lessons).some((l) => l.completed)
  )

  const persistProgress = useCallback((updater: (prev: ProgressData) => ProgressData) => {
    setProgress((prev) => {
      const next = updater(prev)
      try {
        localStorage.setItem('stoxiq_progress', JSON.stringify(next))
      } catch (e) {
        console.error('Failed to save stoxiq_progress:', e)
      }
      return next
    })
  }, [])

  const persistMeta = useCallback((updater: (prev: MetaData) => MetaData) => {
    setMetaState((prev) => {
      const next = updater(prev)
      try {
        localStorage.setItem('stoxiq_meta', JSON.stringify(next))
      } catch (e) {
        console.error('Failed to save stoxiq_meta:', e)
      }
      return next
    })
  }, [])

  const setLessonComplete = useCallback(
    (lessonKey: string) => {
      persistProgress((prev) => ({
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonKey]: { completed: true, completedAt: Date.now() },
        },
      }))
      persistMeta((prev) => ({
        ...prev,
        lastLesson: lessonKey,
        lastVisit: Date.now(),
      }))
    },
    [persistProgress, persistMeta]
  )

  const setLessonIncomplete = useCallback(
    (lessonKey: string) => {
      persistProgress((prev) => ({
        ...prev,
        lessons: {
          ...prev.lessons,
          [lessonKey]: { completed: false, completedAt: null },
        },
      }))
    },
    [persistProgress]
  )

  const setQuizScore = useCallback(
    (quizId: string, score: number, detail?: LastQuizAttemptDetail) => {
      persistProgress((prev) => ({
        ...prev,
        quizzes: {
          ...prev.quizzes,
          [quizId]: { taken: true, score, lastTaken: Date.now() },
        },
      }))
      if (detail) {
        try {
          sessionStorage.setItem(`stoxiq_quiz_attempt_${quizId}`, JSON.stringify(detail))
        } catch {
          // ignore
        }
      }
    },
    [persistProgress]
  )

  const getLastQuizAttemptDetail = useCallback((quizId: string): LastQuizAttemptDetail | null => {
    try {
      const raw = sessionStorage.getItem(`stoxiq_quiz_attempt_${quizId}`)
      return raw ? (JSON.parse(raw) as LastQuizAttemptDetail) : null
    } catch {
      return null
    }
  }, [])

  const setStepComplete = useCallback(
    (brokerStorageKey: string, stepKey: string, completed: boolean) => {
      persistProgress((prev) => ({
        ...prev,
        steps: {
          ...prev.steps,
          [brokerStorageKey]: {
            ...(prev.steps[brokerStorageKey] || {}),
            [stepKey]: completed,
          },
        },
      }))
    },
    [persistProgress]
  )

  const setRiskVisited = useCallback(
    (riskId: string) => {
      persistProgress((prev) => ({
        ...prev,
        risks: {
          ...prev.risks,
          [riskId]: { visited: true },
        },
      }))
    },
    [persistProgress]
  )

  const setRegion = useCallback((nextRegion: RegionKey | null) => {
    setRegionState(nextRegion)
    try {
      if (nextRegion) {
        localStorage.setItem('stoxiq_region', nextRegion)
      } else {
        localStorage.removeItem('stoxiq_region')
      }
    } catch {
      // ignore
    }
  }, [])

  const setPreference = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferencesState((prev) => {
      const next = { ...prev, [key]: value }
      try {
        localStorage.setItem('stoxiq_preferences', JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const setLastLesson = useCallback(
    (lessonKey: string | null) => {
      persistMeta((prev) => ({
        ...prev,
        lastLesson: lessonKey,
        lastVisit: Date.now(),
      }))
    },
    [persistMeta]
  )

  const getCompletedLessonsCount = useCallback((): number => {
    return Object.values(progress.lessons).filter((l) => l.completed).length
  }, [progress.lessons])

  const getOverallProgress = useCallback((): number => {
    const entries = Object.values(progress.lessons)
    if (entries.length === 0) return 0
    const completed = entries.filter((l) => l.completed).length
    return Math.round((completed / 12) * 100)
  }, [progress.lessons])

  const getModuleCompletedCount = useCallback(
    (moduleId: string): number => {
      return Object.entries(progress.lessons).filter(
        ([key, val]) => key.startsWith(`${moduleId}_`) && val.completed
      ).length
    },
    [progress.lessons]
  )

  const getModuleProgress = useCallback(
    (moduleId: string): number => {
      const count = getModuleCompletedCount(moduleId)
      return Math.round((count / 3) * 100)
    },
    [getModuleCompletedCount]
  )

  const getTakenQuizzesCount = useCallback((): number => {
    return Object.values(progress.quizzes).filter((q) => q.taken).length
  }, [progress.quizzes])

  const getQuizAverage = useCallback((): number => {
    const taken = Object.values(progress.quizzes).filter((q) => q.taken && q.score !== null)
    if (taken.length === 0) return 0
    const sum = taken.reduce((acc, q) => acc + (q.score ?? 0), 0)
    return Math.round(sum / taken.length)
  }, [progress.quizzes])

  const getLatestQuizScore = useCallback((): { quizId: string; score: number } | null => {
    const takenEntries = Object.entries(progress.quizzes).filter(
      ([, q]) => q.taken && q.score !== null && q.lastTaken !== null
    )
    if (takenEntries.length === 0) return null
    takenEntries.sort((a, b) => (b[1].lastTaken ?? 0) - (a[1].lastTaken ?? 0))
    return { quizId: takenEntries[0][0], score: takenEntries[0][1].score ?? 0 }
  }, [progress.quizzes])

  const isLessonCompleted = useCallback(
    (lessonKey: string): boolean => Boolean(progress.lessons[lessonKey]?.completed),
    [progress.lessons]
  )

  const isQuizTaken = useCallback(
    (quizId: string): boolean => Boolean(progress.quizzes[quizId]?.taken),
    [progress.quizzes]
  )

  const isModuleUnlocked = useCallback(
    (moduleId: string): boolean => {
      if (moduleId === 'module1') return true
      const modNum = parseInt(moduleId.replace('module', ''), 10)
      if (Number.isNaN(modNum) || modNum <= 1) return true
      const prevModuleId = `module${modNum - 1}`
      return getModuleCompletedCount(prevModuleId) === 3
    },
    [getModuleCompletedCount]
  )

  const isLessonUnlocked = useCallback(
    (moduleId: string, lessonSlug: string): boolean => {
      if (!isModuleUnlocked(moduleId)) return false
      const lessonNum = parseInt(lessonSlug.replace('lesson', ''), 10)
      if (Number.isNaN(lessonNum) || lessonNum <= 1) return true
      const prevLessonKey = `${moduleId}_lesson${lessonNum - 1}`
      return isLessonCompleted(prevLessonKey)
    },
    [isModuleUnlocked, isLessonCompleted]
  )

  const isQuizUnlocked = useCallback(
    (quizId: string): boolean => {
      if (quizId === 'quiz_final') {
        const modQuizzes = ['quiz_module1', 'quiz_module2', 'quiz_module3', 'quiz_module4']
        return modQuizzes.every((id) => Boolean(progress.quizzes[id]?.taken))
      }
      const moduleId = quizId.replace('quiz_', '')
      return getModuleCompletedCount(moduleId) === 3
    },
    [progress.quizzes, getModuleCompletedCount]
  )

  const getContinueLesson = useCallback(() => {
    const firstIncomplete = ALL_LESSONS_ORDERED.find((l) => !progress.lessons[l.id]?.completed)
    const targetLesson = firstIncomplete || LESSONS.module4.lesson3
    const mod = MODULES.find((m) => m.id === targetLesson.moduleId) || MODULES[0]
    return {
      lesson: targetLesson,
      moduleTitle: mod.title,
      moduleProgress: getModuleProgress(mod.id),
    }
  }, [progress.lessons, getModuleProgress])

  const resetAllProgress = useCallback(() => {
    try {
      localStorage.removeItem('stoxiq_progress')
      localStorage.removeItem('stoxiq_region')
      localStorage.removeItem('stoxiq_preferences')
      localStorage.removeItem('stoxiq_meta')
      sessionStorage.clear()
    } catch {
      // ignore
    }
    const fresh = createInitialProgress()
    setProgress(fresh)
    setRegionState(null)
    setPreferencesState(INITIAL_PREFERENCES)
    setMetaState({
      firstVisit: Date.now(),
      lastVisit: Date.now(),
      lastLesson: null,
      appVersion: '1.0.0',
    })
  }, [])

  const exportProgress = useCallback(() => {
    const json = JSON.stringify(progress, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stoxiq_progress_${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [progress])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        region,
        preferences,
        meta,
        isLoaded: true,
        hasReturningProgress,
        setLessonComplete,
        setLessonIncomplete,
        setQuizScore,
        getLastQuizAttemptDetail,
        setStepComplete,
        setRiskVisited,
        setRegion,
        setPreference,
        setLastLesson,
        getOverallProgress,
        getCompletedLessonsCount,
        getModuleProgress,
        getModuleCompletedCount,
        getQuizAverage,
        getTakenQuizzesCount,
        getLatestQuizScore,
        getContinueLesson,
        isLessonCompleted,
        isQuizTaken,
        isModuleUnlocked,
        isQuizUnlocked,
        isLessonUnlocked,
        resetAllProgress,
        exportProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = (): ProgressContextType => {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
