import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, disabled, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-sans rounded-full transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-base/40 select-none'

    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary:
        'bg-gold-base text-bg-base-0 font-bold border border-transparent hover:bg-gold-light hover:scale-[1.02] active:bg-gold-dim active:scale-[0.98]',
      secondary:
        'bg-transparent text-gold-base font-medium border border-[rgba(201,168,76,0.50)] hover:bg-gold-fill active:scale-[0.98]',
      ghost:
        'bg-transparent text-text-secondary font-normal border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary active:scale-[0.98]',
      danger:
        'bg-transparent text-negative font-medium border border-[rgba(248,113,113,0.40)] hover:bg-negative-dim active:scale-[0.98]',
    }

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
      lg: 'px-[32px] py-[16px] text-[15px]',
      md: 'px-[24px] py-[12px] text-[15px]',
      sm: 'px-[16px] py-[8px] text-[13px]',
      xs: 'px-[12px] py-[5px] text-[12px]',
    }

    const disabledClasses = 'opacity-40 cursor-not-allowed pointer-events-none'

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          base,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          disabled && disabledClasses,
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
