import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  leftIcon?: React.ReactNode
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, leftIcon, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-sans text-[11px] font-bold uppercase tracking-[1.8px] text-text-tertiary">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-[48px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[12px] text-text-primary font-sans text-[15px] placeholder:text-text-tertiary px-4 transition-all duration-200 focus:outline-none focus:border-[rgba(201,168,76,0.50)] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.10)]',
              leftIcon && 'pl-11',
              error && 'border-[rgba(248,113,113,0.50)]',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-[12px] font-sans text-negative">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
