import { Shuffle, X, Sparkles, Check } from 'lucide-react'
import { ColorTheme, colorThemes } from './types'

interface ThemeControlProps {
  currentTheme: ColorTheme
  onThemeChange: (theme: ColorTheme) => void
  onRandomTheme: () => void
  isOpen: boolean
  onToggle: () => void
  triggerButton?: React.ReactNode
}

export function ThemeControl({
  currentTheme,
  onThemeChange,
  onRandomTheme,
  isOpen,
  onToggle,
}: ThemeControlProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      {/* Theme Panel */}
      <div
        className={`fixed top-1/2 right-6 -translate-y-1/2 z-40 bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)] border border-white/60 p-5 transition-all duration-500 ease-out ${
          isOpen
            ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-x-8 scale-95 pointer-events-none'
        }`}
        style={{ width: '320px' }}
      >
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-slate-800">色彩主题</h3>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-xl hover:bg-slate-100/80 transition-all duration-200 group"
              title="关闭"
            >
              <X size={18} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>
          </div>

          {/* Current Theme Display */}
          <div className="relative p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-medium mb-2.5 uppercase tracking-wider">当前主题</p>
            <div className="flex gap-2">
              {currentTheme.colors.map((color, i) => (
                <div
                  key={i}
                  className="flex-1 h-10 rounded-xl shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 4px 12px -2px ${color}40`
                  }}
                  title={color}
                />
              ))}
            </div>
            <p className="text-sm text-slate-700 font-semibold mt-3 text-center">{currentTheme.name}</p>
          </div>

          {/* Random Theme Button */}
          <button
            onClick={onRandomTheme}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Shuffle size={18} className="animate-pulse" />
            随机生成主题
          </button>

          {/* Theme Grid */}
          <div className="space-y-3">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">预设主题</p>
            <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {colorThemes.map((theme) => {
                const isSelected = currentTheme.id === theme.id
                return (
                  <button
                    key={theme.id}
                    onClick={() => onThemeChange(theme)}
                    className={`relative p-3 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.03] group ${
                      isSelected
                        ? 'border-violet-500 bg-violet-50/50 shadow-lg shadow-violet-500/20'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                    }`}
                    title={theme.name}
                  >
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center shadow-md">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                    <div className="flex gap-1 mb-2">
                      {theme.colors.slice(0, 4).map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-7 rounded-lg first:rounded-l-xl last:rounded-r-xl transition-transform group-hover:scale-y-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className={`text-xs font-medium truncate transition-colors ${
                      isSelected ? 'text-violet-700' : 'text-slate-600 group-hover:text-slate-800'
                    }`}>
                      {theme.name}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
