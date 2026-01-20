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
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
      <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
        <Palette size={18} className="text-primary" />
        风格预设
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {(expanded ? presets : presets.slice(0, 4)).map((preset) => (
          <button
            key={preset.name}
            onClick={() => onSelectPreset(preset)}
            className={`relative p-3 rounded-lg border-2 transition-all duration-200 group hover:scale-[1.02] ${
              activePreset === preset.name
                ? 'border-primary shadow-md bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div
              className="w-full h-12 rounded-md mb-2 overflow-hidden shadow-inner"
              style={{ backgroundColor: preset.background }}
            >
              <div className="flex h-full">
                {preset.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1 blur-md transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm font-medium">{preset.name}</span>
            {activePreset === preset.name && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </button>
        ))}
      </div>
      {presets.length > 4 && (
        <button
          onClick={onToggleExpanded}
          className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200 flex items-center justify-center gap-1"
        >
          {expanded ? '收起' : `展开更多 (${presets.length - 4})`}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  )
}
