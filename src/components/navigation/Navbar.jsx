import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/missions', label: 'MISSIONS', num: '01' },
    { path: '/skills', label: 'SKILLS', num: '02' },
    { path: '/lab', label: 'LAB', num: '03' },
    { path: '/journey', label: 'JOURNEY', num: '04' },
    { path: '/thinking', label: 'THINKING', num: '05' },
    { path: '/contact', label: 'CONTACT', num: '06' },
  ]

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 py-2">
            <span className="font-mono text-text text-xs sm:text-sm font-semibold tracking-wider">
              ADITYA <span className="text-accent">//</span> SYSTEM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-mono text-xs transition-colors py-2 ${
                  location.pathname === item.path
                    ? 'text-accent font-semibold'
                    : 'text-text2 hover:text-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-text2 tracking-wider">ONLINE</span>
            </div>
          </div>

          {/* Mobile Menu Button - 44x44 minimum touch target */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-text2 hover:text-text rounded-md focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} className="text-accent" /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer & Backdrop */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 sm:top-16 bottom-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl border-t border-border animate-in fade-in duration-200">
          <div className="px-4 py-4 space-y-1 overflow-y-auto flex-1">
            <div className="text-[10px] font-mono tracking-widest text-text3 uppercase px-3 py-2">
              System Modules
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded border font-mono text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-surface2 border-accent/40 text-accent font-medium'
                      : 'border-transparent text-text2 hover:text-text hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${isActive ? 'text-accent' : 'text-text3'}`}>
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ArrowRight
                    size={16}
                    className={isActive ? 'text-accent' : 'text-text3 opacity-40'}
                  />
                </Link>
              )
            })}

            {/* Quick Status Bar inside drawer */}
            <div className="pt-4 mt-4 border-t border-border px-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs text-text2">CORE SYSTEMS ONLINE</span>
              </div>
              <span className="font-mono text-[10px] text-text3">v2.4.0</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
