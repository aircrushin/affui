import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import {
  GradientPreview,
  ControlPanel,
  type ColorBlob,
  type Preset,
} from '@/components/gradient'

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
    const previewElement = document.querySelector('[data-preview="true"]') as HTMLDivElement
    if (!previewElement) return
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(previewElement, {
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
          <GradientPreview
            blobs={blobs}
            background={background}
            blurAmount={blurAmount}
            onRandomize={randomize}
            onDownload={downloadImage}
          />

          <ControlPanel
            presets={presets}
            activePreset={activePreset}
            blurAmount={blurAmount}
            background={background}
            blobs={blobs}
            presetsExpanded={presetsExpanded}
            onSelectPreset={applyPreset}
            onTogglePresetsExpanded={() => setPresetsExpanded(!presetsExpanded)}
            onBlurAmountChange={setBlurAmount}
            onBackgroundChange={(color) => {
              setBackground(color)
              setActivePreset(null)
            }}
            onAddBlob={addBlob}
            onUpdateBlob={updateBlob}
            onRemoveBlob={removeBlob}
          />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/gradient')({
  component: GradientGenerator,
})
