import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, Palette, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between bg-white/40 backdrop-blur-md border-b border-white/30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors text-slate-700"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-black tracking-tight">
            <Link
              to="/"
              className="text-gray-800 font-light hover:opacity-80 transition-opacity"
            >
              affui
            </Link>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            activeProps={{ className: 'text-amber-600 font-semibold' }}
          >
            首页
          </Link>
          <Link
            to="/gradient"
            className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
            activeProps={{ className: 'text-amber-600 font-semibold' }}
          >
            渐变
          </Link>
        </nav>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white/80 backdrop-blur-xl text-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-r border-white/30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200/50">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">
            导航
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">首页</span>
          </Link>

          <Link
            to="/gradient"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 transition-colors mb-2',
            }}
          >
            <Palette size={20} />
            <span className="font-medium">渐变</span>
          </Link>


        </nav>
      </aside>
    </>
  )
}
