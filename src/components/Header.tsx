import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Home, Menu, Palette, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4 flex items-center justify-between bg-white/60 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 text-slate-700 hover:scale-105"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-black tracking-tight">
            <Link
              to="/"
              className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent font-bold hover:opacity-80 transition-opacity"
            >
              affui
            </Link>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 font-medium transition-all duration-200"
            activeProps={{ className: 'text-amber-600 font-semibold bg-amber-50/50' }}
          >
            首页
          </Link>
          <Link
            to="/gradient"
            className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 font-medium transition-all duration-200"
            activeProps={{ className: 'text-amber-600 font-semibold bg-amber-50/50' }}
          >
            渐变
          </Link>
        </nav>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white/90 backdrop-blur-xl text-slate-800 shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col border-r border-white/30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-500">
            导航
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all duration-200 text-slate-600 hover:scale-105"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-all duration-200 mb-2 group"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 transition-all duration-200 mb-2 shadow-md',
            }}
          >
            <Home size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">首页</span>
          </Link>

          <Link
            to="/gradient"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-all duration-200 mb-2 group"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 transition-all duration-200 mb-2 shadow-md',
            }}
          >
            <Palette size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">渐变</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
