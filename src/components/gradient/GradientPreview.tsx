import { Shuffle, Download } from 'lucide-react'
import { useRef, useState } from 'react'
import { ColorBlob } from './types'
import { Button } from '../ui/Button'

interface GradientPreviewProps {
  blobs: ColorBlob[]
  background: string
  blurAmount: number
  onRandomize: () => void
  onDownload: () => void
}

export function GradientPreview({
  blobs,
  background,
  blurAmount,
  onRandomize,
  onDownload,
}: GradientPreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await onDownload()
    } finally {
      setTimeout(() => setIsDownloading(false), 500)
    }
  }

  return (
    <div className="lg:col-span-2 space-y-4">
      <div
        ref={canvasRef}
        data-preview="true"
        className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-border/50 group"
        style={{ backgroundColor: background }}
      >
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className="absolute rounded-full transition-all duration-500"
            style={{
              backgroundColor: blob.color,
              width: `${blob.size}%`,
              height: `${blob.size}%`,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              transform: 'translate(-50%, -50%)',
              filter: `blur(${blurAmount}px)`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={onRandomize}
          variant="secondary"
          size="lg"
          className="flex-1 sm:flex-none"
        >
          <Shuffle size={18} className="mr-2" />
          随机生成
        </Button>
        <Button
          onClick={handleDownload}
          variant="primary"
          size="lg"
          disabled={isDownloading}
          className="flex-1 sm:flex-none"
        >
          <Download size={18} className={`mr-2 ${isDownloading ? 'animate-bounce' : ''}`} />
          {isDownloading ? '下载中...' : '下载图片'}
        </Button>
      </div>
    </div>
  )
}
