export type ColorTheme = {
  id: string
  name: string
  colors: string[]
  background: string
  textColor: string
  accentColor: string
  cardIconColors: string[]
}

export const colorThemes: ColorTheme[] = [
  {
    id: 'amber',
    name: '琥珀暖阳',
    colors: ['#d4a574', '#e8c4a0', '#c9a87c', '#b8956e', '#deb887'],
    background: '#f8f9fa',
    textColor: 'text-slate-800',
    accentColor: 'from-amber-600 to-orange-500',
    cardIconColors: ['from-amber-500 to-amber-300', 'from-orange-500 to-amber-400', 'from-stone-500 to-stone-400'],
  },
  {
    id: 'ocean',
    name: '深海蓝调',
    colors: ['#667eea', '#764ba2', '#6B8DD6', '#4facfe', '#00f2fe'],
    background: '#f0f4f8',
    textColor: 'text-slate-800',
    accentColor: 'from-blue-600 to-cyan-500',
    cardIconColors: ['from-blue-500 to-blue-300', 'from-cyan-500 to-blue-400', 'from-indigo-500 to-purple-400'],
  },
  {
    id: 'forest',
    name: '森林秘境',
    colors: ['#11998e', '#38ef7d', '#56ab2f', '#96e6a1', '#134e5e'],
    background: '#f0fdf4',
    textColor: 'text-slate-800',
    accentColor: 'from-green-600 to-emerald-500',
    cardIconColors: ['from-green-500 to-green-300', 'from-emerald-500 to-teal-400', 'from-lime-500 to-green-400'],
  },
  {
    id: 'sunset',
    name: '日落晚霞',
    colors: ['#ff6b6b', '#feca57', '#ff9ff3', '#ff9a56', '#fa709a'],
    background: '#fff5f5',
    textColor: 'text-slate-800',
    accentColor: 'from-pink-600 to-rose-500',
    cardIconColors: ['from-pink-500 to-rose-300', 'from-red-500 to-pink-400', 'from-orange-500 to-yellow-400'],
  },
  {
    id: 'aurora',
    name: '极光幻影',
    colors: ['#00ff87', '#60efff', '#ff00ea', '#a18cd1', '#fbc2eb'],
    background: '#f5f3ff',
    textColor: 'text-slate-800',
    accentColor: 'from-violet-600 to-fuchsia-500',
    cardIconColors: ['from-violet-500 to-purple-300', 'from-fuchsia-500 to-pink-400', 'from-indigo-500 to-violet-400'],
  },
  {
    id: 'lavender',
    name: '薰衣草田',
    colors: ['#a18cd1', '#fbc2eb', '#a6c1ee', '#c471ed', '#f64f59'],
    background: '#faf5ff',
    textColor: 'text-slate-800',
    accentColor: 'from-purple-600 to-pink-500',
    cardIconColors: ['from-purple-500 to-pink-300', 'from-fuchsia-500 to-purple-400', 'from-violet-500 to-indigo-400'],
  },
  {
    id: 'dark',
    name: '暗夜星空',
    colors: ['#2c3e50', '#4ca1af', '#1a1a2e', '#16213e', '#0f3460'],
    background: '#0a0a0a',
    textColor: 'text-slate-100',
    accentColor: 'from-slate-400 to-slate-600',
    cardIconColors: ['from-slate-600 to-slate-400', 'from-gray-600 to-gray-400', 'from-zinc-600 to-zinc-400'],
  },
  {
    id: 'neon',
    name: '霓虹之夜',
    colors: ['#00f5ff', '#ff00ff', '#ffff00', '#00ff00', '#ff0080'],
    background: '#0a0a0a',
    textColor: 'text-slate-100',
    accentColor: 'from-cyan-500 to-magenta-500',
    cardIconColors: ['from-cyan-500 to-cyan-300', 'from-fuchsia-500 to-pink-400', 'from-yellow-500 to-lime-400'],
  },
]

export function generateRandomTheme(): ColorTheme {
  const hue = Math.floor(Math.random() * 360)
  const colors = Array.from({ length: 5 }, (_, i) => {
    const h = (hue + i * 30) % 360
    const s = 60 + Math.random() * 30
    const l = 55 + Math.random() * 25
    return `hsl(${h}, ${s}%, ${l}%)`
  })

  const isDark = Math.random() > 0.7

  return {
    id: `custom-${Date.now()}`,
    name: '随机主题',
    colors,
    background: isDark ? '#0a0a0a' : '#f8f9fa',
    textColor: isDark ? 'text-slate-100' : 'text-slate-800',
    accentColor: isDark ? 'from-slate-400 to-slate-600' : `from-[hsl(${hue},70%,50%)] to-[hsl(${(hue + 40)%360},70%,50%)]`,
    cardIconColors: colors.slice(0, 3).map((c, i) => {
      const h = (hue + i * 20) % 360
      return `from-[hsl(${h},70%,50%)] to-[hsl(${(h + 20)%360},70%,60%)]`
    }),
  }
}
