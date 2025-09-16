'use client'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }

const Button = React.forwardRef<HTMLButtonElement, Props>(({ children, className, disabled, ...props }, ref) => {
  const isDisabled = Boolean(disabled)
  return (
    <button
      ref={ref}
      {...props}
      disabled={isDisabled}
      className={`${isDisabled ? 'opacity-60 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white focus-visible:ring-2 focus-visible:ring-offset-1 ${className ?? ''}`}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'
export { Button }
export default Button
