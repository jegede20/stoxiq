import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  BookOpen,
  AlertTriangle,
  Globe,
  BarChart3,
  Brain,
  Settings,
  X,
} from 'lucide-react'
import { useProgress } from '@/contexts/ProgressContext'
import { StoxLogo } from '@/components/ui/StoxLogo'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', Icon: Home },
  { label: 'Learn', to: '/learn', Icon: BookOpen },
  { label: 'Watch Out For', to: '/risks', Icon: AlertTriangle },
  { label: 'Platforms', to: '/platforms', Icon: Globe },
  { label: 'Market', to: '/market', Icon: BarChart3 },
  { label: 'Quiz', to: '/quiz', Icon: Brain },
  { label: 'Settings', to: '/settings', Icon: Settings },
]

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { getOverallProgress, getCompletedLessonsCount } = useProgress()
  const overall = getOverallProgress()
  const completedLessons = getCompletedLessonsCount()

  return (
    <>
      {/* Tablet overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#0A0A0F]/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-[#0D0D16]/[0.98] lg:bg-[rgba(15,15,26,0.92)] backdrop-blur-[20px] border-r border-[rgba(255,255,255,0.08)] flex flex-col overflow-hidden transition-transform duration-300 ease-out',
          'hidden md:flex',
          isOpen ? 'md:translate-x-0' : 'md:-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Sticky Gold Ambient Glow on Left Edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-1/4 w-48 h-80 rounded-full bg-[rgba(201,168,76,0.11)] blur-3xl"
        />

        {/* Brand Header */}
        <div className="relative z-10 h-[76px] px-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.06)]">
          <StoxLogo to="/" size="md" showTagline />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="lg:hidden text-text-secondary hover:text-text-primary p-1"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="relative z-10 flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map(({ label, to, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'h-[48px] px-[20px] rounded-[12px] flex items-center gap-3.5 font-sans text-[14px] transition-all duration-200 border border-transparent',
                  isActive
                    ? 'bg-[rgba(255,255,255,0.06)] text-gold-base font-semibold border-l-[3px] border-l-gold-base border-[rgba(255,255,255,0.08)] pl-[17px]'
                    : 'text-text-secondary hover:bg-[rgba(255,255,255,0.06)] hover:text-text-primary'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className={isActive ? 'text-gold-base shrink-0' : 'text-text-tertiary shrink-0'}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Progress Widget */}
        <div className="relative z-10 p-5 m-3 rounded-[14px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[2px] text-text-tertiary">
              OVERALL PROGRESS
            </span>
          </div>
          <ProgressBar value={overall} variant="standard" className="mb-2.5" />
          <div className="font-sans text-[12px] text-text-secondary tabular-nums">
            <span className="text-gold-light font-semibold">{overall}%</span> · {completedLessons} of 12 lessons
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
