import { Trash2 } from 'lucide-react'
import { ColorBlob } from './types'
import { Slider } from '../ui/Slider'
import { Button } from '../ui/Button'

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
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group">
      <div className="relative">
        <input
          type="color"
          value={blob.color}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-10 h-10 rounded-lg cursor-pointer border-2 border-border overflow-hidden"
          title={`颜色 ${index + 1}`}
        />
        <div className="absolute inset-0 rounded-lg ring-2 ring-border ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">颜色 {index + 1}</span>
          <span className="text-xs text-muted-foreground font-mono">{Math.round(blob.size)}%</span>
        </div>
        <Slider
          min="20"
          max="80"
          value={blob.size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      {showRemove && (
        <Button
          onClick={onRemove}
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          title="移除颜色"
        >
          <Trash2 size={16} />
        </Button>
      )}
    </div>
  )
}
