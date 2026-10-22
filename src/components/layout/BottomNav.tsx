import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  BookOpen,
  BarChart3,
  Brain,
  MoreHorizontal,
  AlertTriangle,
  Globe,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const BottomNav: React.FC = () => {
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)

  const pathname = location.pathname
  const isMoreRoute =
    pathname.startsWith('/risks') ||
    pathname.startsWith('/platforms') ||
    pathname.startsWith('/settings')

  const mainItems = [
    { label: 'Home', to: '/dashboard', Icon: Home, active: pathname.startsWith('/dashboard') },
    { label: 'Learn', to: '/learn', Icon: BookOpen, active: pathname.startsWith('/learn') },
    { label: 'Market', to: '/market', Icon: BarChart3, active: pathname.startsWith('/market') },
    { label: 'Quiz', to: '/quiz', Icon: Brain, active: pathname.startsWith('/quiz') },
  ]

  return (
    <>
      {moreOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0A0A0F]/85 backdrop-blur-sm md:hidden flex items-end"
          onClick={() => setMoreOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full glass-overlay-surface rounded-t-[24px] p-6 pb-24 border-b-0 space-y-3 animate-page-in"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-bold uppercase tracking-[2px] text-gold-base">
                MORE SECTIONS
              </span>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="p-1 text-text-secondary hover:text-text-primary"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {[
              {
                label: 'Watch Out For',
                sub: 'Emotional trading, beginner traps & scam red flags',
                to: '/risks',
                Icon: AlertTriangle,
                accent: 'text-warning',
              },
              {
                label: 'Platforms Directory',
                sub: 'Curated brokers & step-by-step guides for US, UK & Africa',
                to: '/platforms',
                Icon: Globe,
                accent: 'text-gold-base',
              },
              {
                label: 'Settings & Data',
                sub: 'Region preferences, JSON export & progress reset',
                to: '/settings',
                Icon: Settings,
                accent: 'text-text-primary',
              },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3.5 p-3.5 rounded-[14px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(201,168,76,0.30)] transition-colors"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,255,255,0.04)] flex items-center justify-center shrink-0">
                  <item.Icon size={20} strokeWidth={1.5} className={item.accent} />
                </div>
                <div className="min-w-0">
                  <div className="font-serif text-[16px] text-text-primary">{item.label}</div>
                  <div className="font-sans text-[12px] text-text-secondary truncate">{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-0 left-0 right-0 z-50 min-h-[64px] pb-[env(safe-area-inset-bottom)] glass-chrome-bar border-t border-[rgba(255,255,255,0.10)] md:hidden grid grid-cols-5 items-center px-2"
      >
        {mainItems.map(({ label, to, Icon, active }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setMoreOpen(false)}
            className={cn(
              'flex flex-col items-center justify-center h-[64px] gap-1 transition-colors',
              active ? 'text-gold-base' : 'text-text-tertiary hover:text-text-secondary'
            )}
          >
            <Icon size={20} strokeWidth={1.5} />
            <span className="font-sans text-[10px] font-medium leading-none">{label}</span>
            <span
              className={cn(
                'w-1 h-1 rounded-full transition-opacity',
                active ? 'bg-gold-base opacity-100' : 'opacity-0'
              )}
            />
          </Link>
        ))}

        <button
          type="button"
          onClick={() => setMoreOpen((o) => !o)}
          className={cn(
            'flex flex-col items-center justify-center h-[64px] gap-1 transition-colors',
            isMoreRoute || moreOpen
              ? 'text-gold-base'
              : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          <MoreHorizontal size={20} strokeWidth={1.5} />
          <span className="font-sans text-[10px] font-medium leading-none">More</span>
          <span
            className={cn(
              'w-1 h-1 rounded-full transition-opacity',
              isMoreRoute || moreOpen ? 'bg-gold-base opacity-100' : 'opacity-0'
            )}
          />
        </button>
      </nav>
    </>
  )
}

export default BottomNav
