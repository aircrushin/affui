import { Plus } from 'lucide-react'
import { ColorBlob, Preset } from './types'
import { PresetSelector } from './PresetSelector'
import { ColorControl } from './ColorControl'

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
      <div className="bg-card rounded-xl p-4 border border-border">
        <h2 className="font-semibold mb-3">模糊度: {blurAmount}px</h2>
        <input
          type="range"
          min="20"
          max="150"
          value={blurAmount}
          onChange={(e) => onBlurAmountChange(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      {/* 背景色 */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h2 className="font-semibold mb-3">背景颜色</h2>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={background}
            onChange={(e) => onBackgroundChange(e.target.value)}
            className="w-12 h-10 rounded cursor-pointer border-0"
          />
          <input
            type="text"
            value={background}
            onChange={(e) => onBackgroundChange(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
          />
        </div>
      </div>

      {/* 自定义颜色 */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">自定义颜色</h2>
          <button
            onClick={onAddBlob}
            className="p-1.5 rounded-lg bg-secondary hover:bg-accent transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="space-y-3 max-h-64 overflow-y-auto">
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
