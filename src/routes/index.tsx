import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Palette, Sparkles, Zap, ChevronDown } from 'lucide-react'
import { useState, useCallback } from 'react'
import { DiffusedBackground } from '../components/DiffusedBackground'
import { GlassCard } from '../components/GlassCard'
import { Button } from '../components/ui/Button'
import { ThemeControl, colorThemes, generateRandomTheme, type ColorTheme } from '../components/landing'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(colorThemes[0])
  const [isThemeControlOpen, setIsThemeControlOpen] = useState(false)

  const handleThemeChange = useCallback((theme: ColorTheme) => {
    setCurrentTheme(theme)
  }, [])

  const handleRandomTheme = useCallback(() => {
    setCurrentTheme(generateRandomTheme())
  }, [])

  return (
    <DiffusedBackground
      blobColors={currentTheme.colors}
      backgroundColor={currentTheme.background}
      className={currentTheme.textColor}
    >
      {/* Theme Control */}
      <ThemeControl
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onRandomTheme={handleRandomTheme}
        isOpen={isThemeControlOpen}
        onToggle={() => setIsThemeControlOpen(!isThemeControlOpen)}
      />

      <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-4">
            <Sparkles size={16} className="animate-pulse" />
            <span>探索现代 UI 设计美学</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-700 pb-2">
            让色彩
            <span className={`italic bg-linear-to-r ${currentTheme.accentColor} bg-clip-text text-transparent px-2`}>
              呼吸
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            探索极简主义与现代美学的完美融合，体验弥散渐变带来的视觉盛宴。
            每一次交互，都是光影的律动。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              to="/gradient"
              size="xl"
              className="group relative overflow-hidden shadow-2xl hover:shadow-3xl"
              style={{ boxShadow: `0 0 30px -10px ${currentTheme.colors[0]}` }}
            >
              <span className="relative z-10 flex items-center gap-2">
                立即体验 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className={`absolute inset-0 bg-linear-to-r ${currentTheme.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </Button>

            <Button
              onClick={() => setIsThemeControlOpen(!isThemeControlOpen)}
              variant="outline"
              size="xl"
              className="bg-white/50 backdrop-blur-sm border-white/40 hover:bg-white/70"
            >
              <Palette size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
              {isThemeControlOpen ? '关闭主题' : '切换主题'}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <GlassCard className="group" variant="strong">
            <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${currentTheme.cardIconColors[0]} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
              <Palette className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">极致柔和</h3>
            <p className="text-slate-600 leading-relaxed">
              采用高斯模糊与多层混合模式，创造出如梦似幻的弥散背景，为您的界面增添独特的艺术质感。
            </p>
          </GlassCard>

          <GlassCard className="group" variant="strong">
            <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${currentTheme.cardIconColors[1]} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
              <Zap className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">灵动交互</h3>
            <p className="text-slate-600 leading-relaxed">
              每一个元素都经过精心调教，流畅的微交互动画让用户体验更加自然、愉悦，充满生命力。
            </p>
          </GlassCard>

          <GlassCard className="group" variant="strong">
            <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${currentTheme.cardIconColors[2]} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
              <Sparkles className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-800">深度定制</h3>
            <p className="text-slate-600 leading-relaxed">
              提供丰富的预设方案，支持自定义颜色、模糊度及动态效果，轻松打造属于您的独特视觉风格。
            </p>
          </GlassCard>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-slate-400" />
        </div>
      </div>
    </DiffusedBackground>
  )
}
