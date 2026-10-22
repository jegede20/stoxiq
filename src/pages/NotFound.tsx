import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen app-shell-bg flex flex-col items-center justify-center px-6 py-16 text-center relative overflow-hidden">
      {/* 404 Playfair 120px Gold 6% Opacity Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none font-serif font-bold text-[120px] sm:text-[160px] leading-none text-gold-base opacity-[0.06] mb-2"
      >
        404
      </div>

      {/* Amber Down-Arrow Chart SVG Illustration */}
      <div className="w-24 h-24 rounded-[22px] bg-warning-dim border border-[rgba(245,158,11,0.28)] flex items-center justify-center mb-7 -mt-12 relative z-10">
        <svg viewBox="0 0 64 64" className="w-14 h-14 text-warning" fill="none">
          <path
            d="M8 18 L24 30 L34 23 L54 44"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 44 H54 V32"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="8"
            y1="52"
            x2="56"
            y2="52"
            stroke="rgba(245,158,11,0.3)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <h1 className="font-serif text-[32px] sm:text-[40px] font-semibold text-text-primary mb-3 relative z-10">
        This page took a dip.
      </h1>

      <p className="font-sans text-[16px] leading-[1.8] text-text-secondary max-w-md mb-8 relative z-10">
        The route you entered doesn&apos;t exist on StoxIQ — but unlike a realised loss, getting back
        on track takes just one click.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
        <Button variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} strokeWidth={1.5} /> Go to Dashboard
        </Button>
        <Button variant="secondary" size="lg" onClick={() => navigate('/learn')}>
          <BookOpen size={16} strokeWidth={1.5} /> Start Learning
        </Button>
      </div>
    </div>
  )
}

export default NotFound
