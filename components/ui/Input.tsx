'use client'
import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & { className?: string }

const Input = React.forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full rounded-md border px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${className ?? ''}`}
    />
  )
})

Input.displayName = 'Input'
export { Input }
export default Input
