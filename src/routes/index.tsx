import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Palette, Sparkles, Zap } from 'lucide-react'
import { DiffusedBackground } from '../components/DiffusedBackground'
import { GlassCard } from '../components/GlassCard'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <DiffusedBackground className="text-slate-800">
      <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-slate-700 pb-2">
            让色彩
            <span className="italic bg-linear-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent px-2">
              呼吸
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            探索极简主义与现代美学的完美融合，体验弥散渐变带来的视觉盛宴。
            每一次交互，都是光影的律动。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              to="/gradient"
              className="group relative px-8 py-4 bg-slate-900 text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                立即体验 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-amber-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            
            <button className="px-8 py-4 rounded-full font-semibold bg-white/50 backdrop-blur-sm border border-white/40 hover:bg-white/70 transition-all text-slate-700 hover:scale-105">
              了解更多
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <GlassCard className="group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-amber-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Palette className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">极致柔和</h3>
            <p className="text-slate-600 leading-relaxed">
              采用高斯模糊与多层混合模式，创造出如梦似幻的弥散背景，为您的界面增添独特的艺术质感。
            </p>
          </GlassCard>

          <GlassCard className="group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">灵动交互</h3>
            <p className="text-slate-600 leading-relaxed">
              每一个元素都经过精心调教，流畅的微交互动画让用户体验更加自然、愉悦，充满生命力。
            </p>
          </GlassCard>

          <GlassCard className="group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-stone-500 to-stone-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">深度定制</h3>
            <p className="text-slate-600 leading-relaxed">
              提供丰富的预设方案，支持自定义颜色、模糊度及动态效果，轻松打造属于您的独特视觉风格。
            </p>
          </GlassCard>
        </div>
      </div>
    </DiffusedBackground>
  )
}
