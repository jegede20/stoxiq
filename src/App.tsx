import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ProgressProvider } from '@/contexts/ProgressContext'
import { AppShell } from '@/components/layout/AppShell'
import { LandingPage } from '@/pages/LandingPage'
import { Dashboard } from '@/pages/Dashboard'
import { LearnHub } from '@/pages/LearnHub'
import { ModuleDetail } from '@/pages/ModuleDetail'
import { LessonReader } from '@/pages/LessonReader'
import { RisksHub } from '@/pages/RisksHub'
import { RiskDetail } from '@/pages/RiskDetail'
import { PlatformsHub } from '@/pages/PlatformsHub'
import { RegionPage } from '@/pages/RegionPage'
import { BrokerDetail } from '@/pages/BrokerDetail'
import { MarketSnapshot } from '@/pages/MarketSnapshot'
import { QuizHub } from '@/pages/QuizHub'
import { QuizActive } from '@/pages/QuizActive'
import { QuizResults } from '@/pages/QuizResults'
import { Settings } from '@/pages/Settings'
import { NotFound } from '@/pages/NotFound'

const RouteScrollReset: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <RouteScrollReset />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <AppShell>
                <Dashboard />
              </AppShell>
            }
          />
          <Route
            path="/learn"
            element={
              <AppShell>
                <LearnHub />
              </AppShell>
            }
          />
          <Route
            path="/learn/:moduleId"
            element={
              <AppShell>
                <ModuleDetail />
              </AppShell>
            }
          />
          {/* Screen 05: Lesson Reader — Sidebar hidden, lesson-specific top bar + 3-col layout */}
          <Route path="/learn/:moduleId/:lessonId" element={<LessonReader />} />

          {/* Screen 06 & 07: Watch Out For — Amber/Red subtle ambient tone shift */}
          <Route
            path="/risks"
            element={
              <AppShell ambientTone="risks">
                <RisksHub />
              </AppShell>
            }
          />
          <Route
            path="/risks/:riskId"
            element={
              <AppShell ambientTone="risks">
                <RiskDetail />
              </AppShell>
            }
          />

          <Route
            path="/platforms"
            element={
              <AppShell>
                <PlatformsHub />
              </AppShell>
            }
          />
          <Route
            path="/platforms/:region"
            element={
              <AppShell>
                <RegionPage />
              </AppShell>
            }
          />
          <Route
            path="/platforms/:region/:brokerId"
            element={
              <AppShell>
                <BrokerDetail />
              </AppShell>
            }
          />

          <Route
            path="/market"
            element={
              <AppShell>
                <MarketSnapshot />
              </AppShell>
            }
          />

          <Route
            path="/quiz"
            element={
              <AppShell>
                <QuizHub />
              </AppShell>
            }
          />
          {/* Screen 13 & 14: Focused Quiz Layouts */}
          <Route path="/quiz/:quizId" element={<QuizActive />} />
          <Route path="/quiz/:quizId/results" element={<QuizResults />} />

          <Route
            path="/settings"
            element={
              <AppShell>
                <Settings />
              </AppShell>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  )
}
