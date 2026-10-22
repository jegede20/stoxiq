import React, { useState } from 'react'
import { Lightbulb, HelpCircle, Bookmark, AlertTriangle } from 'lucide-react'
import { KEY_TERMS } from '@/data/curriculum'
import { cn } from '@/lib/utils'

interface CalloutProps {
  variant: 'key-concept' | 'did-you-know' | 'real-example' | 'warning'
  title?: string
  children: React.ReactNode
  className?: string
}

export const Callout: React.FC<CalloutProps> = ({ variant, title, children, className }) => {
  const configs = {
    'key-concept': {
      defaultLabel: 'KEY CONCEPT',
      container: 'bg-[rgba(201,168,76,0.06)] border-l-[3px] border-l-gold-base border border-[rgba(201,168,76,0.16)]',
      labelColor: 'text-gold-base',
      Icon: Lightbulb,
      iconColor: 'text-gold-base',
    },
    'did-you-know': {
      defaultLabel: 'DID YOU KNOW?',
      container: 'bg-[rgba(255,255,255,0.03)] border border-dashed border-[rgba(201,168,76,0.28)]',
      labelColor: 'text-gold-base',
      Icon: HelpCircle,
      iconColor: 'text-gold-light',
    },
    'real-example': {
      defaultLabel: 'REAL EXAMPLE',
      container: 'bg-[rgba(99,102,241,0.06)] border-l-[3px] border-l-[#6366F1] border border-[rgba(99,102,241,0.18)]',
      labelColor: 'text-[#818CF8]',
      Icon: Bookmark,
      iconColor: 'text-[#818CF8]',
    },
    warning: {
      defaultLabel: 'WATCH OUT',
      container: 'bg-[rgba(245,158,11,0.06)] border-l-[3px] border-l-warning border border-[rgba(245,158,11,0.18)]',
      labelColor: 'text-warning',
      Icon: AlertTriangle,
      iconColor: 'text-warning',
    },
  }

  const cfg = configs[variant]
  const IconComp = cfg.Icon

  return (
    <div className={cn('rounded-[12px] p-[20px] flex items-start gap-3.5', cfg.container, className)}>
      <div className="mt-0.5 shrink-0">
        <IconComp size={20} strokeWidth={1.5} className={cfg.iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <span className={cn('block font-sans text-[10px] font-bold uppercase tracking-[1.8px] mb-1.5', cfg.labelColor)}>
          {title || cfg.defaultLabel}
        </span>
        <div className="font-sans text-[15px] leading-[1.85] text-text-secondary whitespace-pre-line">
          {children}
        </div>
      </div>
    </div>
  )
}

interface KeyTermPillProps {
  term: string
  definition: string
  children: React.ReactNode
}

export const KeyTermPill: React.FC<KeyTermPillProps> = ({ term, definition, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.30)] font-sans text-[14px] text-text-accent hover:border-gold-base hover:text-gold-light transition-colors cursor-help leading-[1.4]"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 w-[260px] glass-tier-3 !rounded-[14px] p-3.5 text-left pointer-events-none shadow-glass-3 border border-[rgba(201,168,76,0.30)]"
        >
          <span className="block font-sans text-[10px] font-bold uppercase tracking-[1.6px] text-gold-base mb-1">
            {term}
          </span>
          <span className="block font-sans text-[12.5px] leading-[1.55] text-text-secondary">
            {definition}
          </span>
        </span>
      )}
    </span>
  )
}

const SORTED_TERM_KEYS = Object.keys(KEY_TERMS).sort((a, b) => b.length - a.length)

/**
 * Highlights first occurrence of up to 2 key financial terms in a paragraph
 * as interactive KeyTermPills with Glass Tier 3 definitions.
 */
export const RichLessonParagraph: React.FC<{ text: string }> = ({ text }) => {
  const paragraphs = text.split(/\n\n+/)

  return (
    <div className="space-y-4">
      {paragraphs.map((para, pIdx) => {
        const used = new Set<string>()
        let segments: React.ReactNode[] = [para]

        for (const key of SORTED_TERM_KEYS) {
          if (used.size >= 2) break
          const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const regex = new RegExp(`\\b(${escaped})\\b`, 'i')
          const nextSegments: React.ReactNode[] = []
          let matchedHere = false

          for (const seg of segments) {
            if (typeof seg !== 'string' || matchedHere) {
              nextSegments.push(seg)
              continue
            }
            const match = regex.exec(seg)
            if (match && match.index !== undefined) {
              const before = seg.slice(0, match.index)
              const word = match[0]
              const after = seg.slice(match.index + word.length)
              if (before) nextSegments.push(before)
              nextSegments.push(
                <KeyTermPill key={`${pIdx}-${key}`} term={key} definition={KEY_TERMS[key]}>
                  {word}
                </KeyTermPill>
              )
              if (after) nextSegments.push(after)
              matchedHere = true
              used.add(key)
            } else {
              nextSegments.push(seg)
            }
          }
          segments = nextSegments
        }

        return (
          <p
            key={pIdx}
            className="font-sans text-[16px] leading-[1.9] text-text-secondary max-w-[720px] whitespace-pre-line"
          >
            {segments}
          </p>
        )
      })}
    </div>
  )
}

export default Callout
