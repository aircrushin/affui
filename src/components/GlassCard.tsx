import { cn } from '../lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverEffect?: boolean
  variant?: 'default' | 'subtle' | 'strong'
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  variant = 'default',
  ...props
}: GlassCardProps) {
  const variants = {
    default: 'backdrop-blur-md bg-white/20 border border-white/30 shadow-lg',
    subtle: 'backdrop-blur-sm bg-white/10 border border-white/20 shadow-md',
    strong: 'backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl',
  }

  return (
    <div
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variants[variant],
        hoverEffect && 'hover:bg-white/30 hover:scale-[1.02] hover:shadow-2xl cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
