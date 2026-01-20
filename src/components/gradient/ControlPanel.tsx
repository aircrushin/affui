import { Plus } from 'lucide-react'
import { ColorBlob, Preset } from './types'
import { PresetSelector } from './PresetSelector'
import { ColorControl } from './ColorControl'
import { Slider } from '../ui/Slider'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

interface ControlPanelProps {
  presets: Preset[]
  activePreset: string | null
  blurAmount: number
  background: string
  blobs: ColorBlob[]
  presetsExpanded: boolean
  onSelectPreset: (preset: Preset) => void
  onTogglePresetsExpanded: () => void
  onBlurAmountChange: (amount: number) => void
  onBackgroundChange: (color: string) => void
  onAddBlob: () => void
  onUpdateBlob: (id: string, updates: Partial<ColorBlob>) => void
  onRemoveBlob: (id: string) => void
}

export function ControlPanel({
  presets,
  activePreset,
  blurAmount,
  background,
  blobs,
  presetsExpanded,
  onSelectPreset,
  onTogglePresetsExpanded,
  onBlurAmountChange,
  onBackgroundChange,
  onAddBlob,
  onUpdateBlob,
  onRemoveBlob,
}: ControlPanelProps) {
  return (
    <div className="space-y-6">
      {/* 风格预设 */}
      <PresetSelector
        presets={presets}
        activePreset={activePreset}
        onSelectPreset={onSelectPreset}
        expanded={presetsExpanded}
        onToggleExpanded={onTogglePresetsExpanded}
      />

      {/* 模糊度 */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">模糊度</h2>
          <span className="text-xs text-muted-foreground font-mono">{blurAmount}px</span>
        </div>
        <Slider
          min="20"
          max="150"
          value={blurAmount}
          onChange={(e) => onBlurAmountChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* 背景色 */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <h2 className="font-semibold text-sm mb-3">背景颜色</h2>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <input
              type="color"
              value={background}
              onChange={(e) => onBackgroundChange(e.target.value)}
              className="w-12 h-12 rounded-lg cursor-pointer border-2 border-border overflow-hidden"
            />
            <div className="absolute inset-0 rounded-lg ring-2 ring-border ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <Input
            type="text"
            value={background}
            onChange={(e) => onBackgroundChange(e.target.value)}
            className="flex-1 font-mono text-sm"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* 自定义颜色 */}
      <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-sm">自定义颜色</h2>
          <Button
            onClick={onAddBlob}
            variant="outline"
            size="sm"
          >
            <Plus size={16} className="mr-1" />
            添加
          </Button>
        </div>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {blobs.map((blob, index) => (
            <ColorControl
              key={blob.id}
              blob={blob}
              index={index}
              showRemove={blobs.length > 2}
              onColorChange={(color) => onUpdateBlob(blob.id, { color })}
              onSizeChange={(size) => onUpdateBlob(blob.id, { size })}
              onRemove={() => onRemoveBlob(blob.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
