import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm text-text2 tracking-wider">
              ADITYA <span className="text-accent">//</span> SYSTEM
            </span>
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-4 flex-wrap">
            <a
              href="https://github.com/AdityaLodhiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text2 hover:text-text transition-colors font-mono text-xs px-3 py-2 min-h-[44px] flex items-center"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aditya-lodhiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text2 hover:text-text transition-colors font-mono text-xs px-3 py-2 min-h-[44px] flex items-center"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="mailto:adityalodhiya111@gmail.com"
              className="text-text2 hover:text-text transition-colors px-3 py-2 min-h-[44px] flex items-center gap-1.5 font-mono text-xs"
              aria-label="Email"
            >
              <Mail size={16} />
              <span className="sm:hidden">Email</span>
            </a>
          </div>

          <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border2/60 w-full sm:w-auto justify-center">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[11px] sm:text-xs text-text3 tracking-wider">STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
