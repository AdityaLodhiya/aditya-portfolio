import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/missions', label: 'MISSIONS' },
    { path: '/skills', label: 'SKILLS' },
    { path: '/lab', label: 'LAB' },
    { path: '/journey', label: 'JOURNEY' },
    { path: '/thinking', label: 'THINKING' },
    { path: '/contact', label: 'CONTACT' },
  ]

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 py-2">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text2 hover:text-text focus:outline-none transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} className="text-accent" /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-[#111111] shadow-2xl">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded font-mono text-xs sm:text-sm transition-colors ${
                    isActive
                      ? 'bg-[#1a1a1a] text-accent font-medium border-l-2 border-accent'
                      : 'text-text2 hover:text-text hover:bg-[#1a1a1a]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-[10px] text-accent font-mono tracking-wider">[ACTIVE]</span>
                  )}
                </Link>
              )
            })}

            <div className="flex items-center justify-between px-3 pt-3 mt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs text-text2">ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
