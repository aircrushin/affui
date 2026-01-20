import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Slider({ className, ...props }: SliderProps) {
  return (
    <input
      type="range"
      className={cn(
        'w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary/80 transition-all duration-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110',
        className
      )}
      {...props}
    />
  )
}
