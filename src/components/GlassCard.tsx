import { cn } from '../lib/utils'

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hoverEffect?: boolean
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-md bg-white/30 border border-white/20 shadow-lg rounded-2xl p-6 transition-all duration-300',
        hoverEffect && 'hover:bg-white/40 hover:scale-[1.02] hover:shadow-xl cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
