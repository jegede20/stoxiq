import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  ambientTone?: 'default' | 'risks'
}

export const AppShell: React.FC<AppShellProps> = ({ children, ambientTone = 'default' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div
      className={cn(
        'min-h-screen app-shell-bg text-text-secondary',
        ambientTone === 'risks' && 'risks-ambient-bg'
      )}
    >
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <TopBar onToggleSidebar={() => setSidebarOpen((o) => !o)} />

      <main className="lg:pl-[260px] pt-[64px] pb-[84px] md:pb-12">
        <div key={location.pathname} className="max-w-[1440px] mx-auto animate-page-in">
          {children}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default AppShell
