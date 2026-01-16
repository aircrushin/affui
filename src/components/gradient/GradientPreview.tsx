import { Shuffle, Download } from 'lucide-react'
import { useRef } from 'react'
import { ColorBlob } from './types'

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

  return (
    <div className="lg:col-span-2">
      <div
        ref={canvasRef}
        data-preview="true"
        className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: background }}
      >
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className="absolute rounded-full"
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
      <div className="flex gap-3 mt-4">
        <button
          onClick={onRandomize}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Shuffle size={18} />
          随机生成
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          <Download size={18} />
          下载图片
        </button>
      </div>
    </div>
  )
}
