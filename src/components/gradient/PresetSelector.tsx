import { Palette, ChevronDown } from 'lucide-react'
import { Preset } from './types'

interface PresetSelectorProps {
  presets: Preset[]
  activePreset: string | null
  onSelectPreset: (preset: Preset) => void
  expanded: boolean
  onToggleExpanded: () => void
}

export function PresetSelector({
  presets,
  activePreset,
  onSelectPreset,
  expanded,
  onToggleExpanded,
}: PresetSelectorProps) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border">
      <h2 className="font-semibold mb-3 flex items-center gap-2">
        <Palette size={18} />
        风格预设
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {(expanded ? presets : presets.slice(0, 4)).map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelectPreset(preset)}
            className={`relative p-3 rounded-lg border-2 transition-all ${
              activePreset === preset.name
                ? 'border-primary'
                : 'border-transparent hover:border-muted'
            }`}
          >
            <div
              className="w-full h-8 rounded-md mb-2 overflow-hidden"
              style={{ backgroundColor: preset.background }}
            >
              <div className="flex h-full">
                {preset.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 blur-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm">{preset.name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onToggleExpanded}
        className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 transition-colors"
      >
        {expanded ? '收起' : `展开更多 (${presets.length - 4})`}
        <ChevronDown
          size={16}
          className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  )
}
