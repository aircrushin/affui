import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback, useRef } from 'react'
import { Shuffle, Download, Plus, Trash2, Palette, ChevronDown } from 'lucide-react'

type ColorBlob = {
  id: string
  color: string
  x: number
  y: number
  size: number
}

type Preset = {
  name: string
  colors: string[]
  background: string
}

const presets: Preset[] = [
  { name: '极光', colors: ['#00ff87', '#60efff', '#ff00ea'], background: '#0a0a1a' },
  { name: '日落', colors: ['#ff6b6b', '#feca57', '#ff9ff3'], background: '#1a0a0a' },
  { name: '海洋', colors: ['#667eea', '#764ba2', '#6B8DD6'], background: '#0a0a2e' },
  { name: '森林', colors: ['#11998e', '#38ef7d', '#56ab2f'], background: '#0a1a0a' },
  { name: '薰衣草', colors: ['#a18cd1', '#fbc2eb', '#a6c1ee'], background: '#1a0a2e' },
  { name: '火焰', colors: ['#f12711', '#f5af19', '#eb3349'], background: '#1a0a0a' },
  { name: '糖果', colors: ['#ff6a88', '#ff99ac', '#ffb3c1'], background: '#fff0f3' },
  { name: '深空', colors: ['#2c3e50', '#4ca1af', '#2c3e50'], background: '#0d1117' },
  { name: '晨曦', colors: ['#ffecd2', '#fcb69f', '#fbc2eb'], background: '#fff5f5' },
  { name: '霓虹', colors: ['#00f5ff', '#ff00ff', '#ffff00'], background: '#0a0a0a' },
]

function generateRandomColor(): string {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 70 + Math.floor(Math.random() * 30)
  const lightness = 50 + Math.floor(Math.random() * 30)
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

function generateRandomBlobs(colors: string[]): ColorBlob[] {
  return colors.map((color, index) => ({
    id: `blob-${index}-${Date.now()}`,
    color,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    size: 40 + Math.random() * 30,
  }))
}

function GradientGenerator() {
  const [blobs, setBlobs] = useState<ColorBlob[]>(() =>
    generateRandomBlobs(presets[0].colors)
  )
  const [background, setBackground] = useState(presets[0].background)
  const [blurAmount, setBlurAmount] = useState(80)
  const [activePreset, setActivePreset] = useState<string | null>(presets[0].name)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [presetsExpanded, setPresetsExpanded] = useState(false)

  const applyPreset = useCallback((preset: Preset) => {
    setBlobs(generateRandomBlobs(preset.colors))
    setBackground(preset.background)
    setActivePreset(preset.name)
  }, [])

  const randomize = useCallback(() => {
    const numColors = 3 + Math.floor(Math.random() * 3)
    const colors = Array.from({ length: numColors }, () => generateRandomColor())
    const isDark = Math.random() > 0.5
    const bg = isDark
      ? `hsl(${Math.floor(Math.random() * 360)}, 20%, 8%)`
      : `hsl(${Math.floor(Math.random() * 360)}, 30%, 95%)`
    setBlobs(generateRandomBlobs(colors))
    setBackground(bg)
    setActivePreset(null)
  }, [])

  const addBlob = useCallback(() => {
    const newBlob: ColorBlob = {
      id: `blob-${Date.now()}`,
      color: generateRandomColor(),
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      size: 40 + Math.random() * 30,
    }
    setBlobs((prev) => [...prev, newBlob])
    setActivePreset(null)
  }, [])

  const removeBlob = useCallback((id: string) => {
    setBlobs((prev) => prev.filter((b) => b.id !== id))
    setActivePreset(null)
  }, [])

  const updateBlob = useCallback((id: string, updates: Partial<ColorBlob>) => {
    setBlobs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    )
    setActivePreset(null)
  }, [])

  const downloadImage = useCallback(async () => {
    if (!canvasRef.current) return
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: null,
      scale: 2,
    })
    const link = document.createElement('a')
    link.download = `gradient-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">弥散渐变生成器</h1>
        <p className="text-muted-foreground mb-6">
          创建柔和、梦幻的弥散渐变效果
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 预览区域 */}
          <div className="lg:col-span-2">
            <div
              ref={canvasRef}
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
                onClick={randomize}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Shuffle size={18} />
                随机生成
              </button>
              <button
                onClick={downloadImage}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <Download size={18} />
                下载图片
              </button>
            </div>
          </div>

          {/* 控制面板 */}
          <div className="space-y-6">
            {/* 风格预设 */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <Palette size={18} />
                风格预设
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {(presetsExpanded ? presets : presets.slice(0, 4)).map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
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
                onClick={() => setPresetsExpanded(!presetsExpanded)}
                className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 transition-colors"
              >
                {presetsExpanded ? '收起' : `展开更多 (${presets.length - 4})`}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${presetsExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* 模糊度 */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <h2 className="font-semibold mb-3">模糊度: {blurAmount}px</h2>
              <input
                type="range"
                min="20"
                max="150"
                value={blurAmount}
                onChange={(e) => setBlurAmount(Number(e.target.value))}
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
                  onChange={(e) => {
                    setBackground(e.target.value)
                    setActivePreset(null)
                  }}
                  className="w-12 h-10 rounded cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={background}
                  onChange={(e) => {
                    setBackground(e.target.value)
                    setActivePreset(null)
                  }}
                  className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                />
              </div>
            </div>

            {/* 自定义颜色 */}
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold">自定义颜色</h2>
                <button
                  onClick={addBlob}
                  className="p-1.5 rounded-lg bg-secondary hover:bg-accent transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {blobs.map((blob, index) => (
                  <div
                    key={blob.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50"
                  >
                    <input
                      type="color"
                      value={blob.color}
                      onChange={(e) =>
                        updateBlob(blob.id, { color: e.target.value })
                      }
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
                      onChange={(e) =>
                        updateBlob(blob.id, { size: Number(e.target.value) })
                      }
                      className="w-20 accent-primary"
                      title="大小"
                    />
                    {blobs.length > 2 && (
                      <button
                        onClick={() => removeBlob(blob.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/gradient')({
  component: GradientGenerator,
})
