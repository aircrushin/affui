import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'

interface DiffusedBackgroundProps {
  className?: string
  children?: React.ReactNode
}

type Blob = {
  id: string
  color: string
  x: number
  y: number
  size: number
  vx: number
  vy: number
  delay: number
  duration: number
}

const PRESET_COLORS = ['#d4a574', '#e8c4a0', '#c9a87c', '#b8956e', '#deb887']

export function DiffusedBackground({ className, children }: DiffusedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [blobs, setBlobs] = useState<Blob[]>([])

  useEffect(() => {
    // Initialize blobs
    const initialBlobs = Array.from({ length: 5 }).map((_, i) => ({
      id: `blob-${i}`,
      color: PRESET_COLORS[i % PRESET_COLORS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 5,
    }))
    setBlobs(initialBlobs)
  }, [])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      setBlobs((prevBlobs) =>
        prevBlobs.map((blob) => {
          let newX = blob.x + blob.vx
          let newY = blob.y + blob.vy

          // Bounce off edges
          if (newX <= -20 || newX >= 120) blob.vx *= -1
          if (newY <= -20 || newY >= 120) blob.vy *= -1

          return {
            ...blob,
            x: newX,
            y: newY,
          }
        })
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full min-h-screen overflow-hidden bg-[#f8f9fa] dark:bg-[#0a0a0a]',
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none">
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className="absolute rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-pulse"
            style={{
              backgroundColor: blob.color,
              width: `${blob.size}%`,
              height: `${blob.size}%`,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${blob.delay}s`,
              animationDuration: `${blob.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  )
}
