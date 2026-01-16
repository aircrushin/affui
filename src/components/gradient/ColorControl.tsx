import { Trash2 } from 'lucide-react'
import { ColorBlob } from './types'

interface ColorControlProps {
  blob: ColorBlob
  index: number
  showRemove: boolean
  onColorChange: (color: string) => void
  onSizeChange: (size: number) => void
  onRemove: () => void
}

export function ColorControl({
  blob,
  index,
  showRemove,
  onColorChange,
  onSizeChange,
  onRemove,
}: ColorControlProps) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
      <input
        type="color"
        value={blob.color}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border-0"
      />
      <span className="text-sm text-muted-foreground flex-1">
        颜色 {index + 1}
      </span>
      <input
        type="range"
        min="20"
        max="80"
        value={blob.size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="w-20 accent-primary"
        title="大小"
      />
      {showRemove && (
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  )
}
